import { createServer } from "node:http";
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StreamableHTTPServerTransport } from "@modelcontextprotocol/sdk/server/streamableHttp.js";
import { z } from "zod";
import { documents } from "./data.js";

const PORT = Number(process.env.PORT ?? 8787);
const MCP_PATH = "/mcp";
const MCP_METHODS = new Set(["POST", "GET", "DELETE"]);

function createAppServer() {
  const server = new McpServer({
    name: "knowledge-connector-app",
    version: "0.1.0"
  });

  server.registerTool(
    "search",
    {
      title: "Search knowledge",
      description:
        "Use this when you need to find relevant documents by query in the connected knowledge source.",
      inputSchema: {
        query: z.string().min(1)
      },
      annotations: {
        readOnlyHint: true,
        destructiveHint: false,
        openWorldHint: false,
        idempotentHint: true
      }
    },
    async ({ query }) => {
      const q = query.trim().toLowerCase();

      const results = documents
        .filter((doc) => {
          const haystack = `${doc.title} ${doc.text} ${(doc.metadata?.tags ?? []).join(" ")}`.toLowerCase();
          return haystack.includes(q);
        })
        .slice(0, 10)
        .map((doc) => ({
          id: doc.id,
          title: doc.title,
          url: doc.url
        }));

      return {
        content: [
          {
            type: "text",
            text: JSON.stringify({ results })
          }
        ]
      };
    }
  );

  server.registerTool(
    "fetch",
    {
      title: "Fetch document",
      description:
        "Use this when you need the full text and metadata for a document id returned by search.",
      inputSchema: {
        id: z.string().min(1)
      },
      annotations: {
        readOnlyHint: true,
        destructiveHint: false,
        openWorldHint: false,
        idempotentHint: true
      }
    },
    async ({ id }) => {
      const doc = documents.find((item) => item.id === id);

      if (!doc) {
        return {
          content: [
            {
              type: "text",
              text: JSON.stringify({
                id,
                title: "Not found",
                text: "No document found for the provided id.",
                url: "https://example.com/docs/not-found",
                metadata: { notFound: true }
              })
            }
          ]
        };
      }

      return {
        content: [
          {
            type: "text",
            text: JSON.stringify({
              id: doc.id,
              title: doc.title,
              text: doc.text,
              url: doc.url,
              metadata: doc.metadata
            })
          }
        ]
      };
    }
  );

  return server;
}

const httpServer = createServer(async (req, res) => {
  if (!req.url) {
    res.writeHead(400).end("Missing URL");
    return;
  }

  const url = new URL(req.url, `http://${req.headers.host ?? "localhost"}`);

  if (req.method === "OPTIONS" && url.pathname === MCP_PATH) {
    res.writeHead(204, {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, GET, DELETE, OPTIONS",
      "Access-Control-Allow-Headers": "content-type, mcp-session-id",
      "Access-Control-Expose-Headers": "Mcp-Session-Id"
    });
    res.end();
    return;
  }

  if (req.method === "GET" && url.pathname === "/") {
    res.writeHead(200, { "content-type": "text/plain" }).end("Knowledge connector MCP server");
    return;
  }

  if (url.pathname === MCP_PATH && req.method && MCP_METHODS.has(req.method)) {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Expose-Headers", "Mcp-Session-Id");

    const mcpServer = createAppServer();
    const transport = new StreamableHTTPServerTransport({
      sessionIdGenerator: undefined,
      enableJsonResponse: true
    });

    res.on("close", () => {
      transport.close();
      mcpServer.close();
    });

    try {
      await mcpServer.connect(transport);
      await transport.handleRequest(req, res);
    } catch (error) {
      console.error("Error handling MCP request", error);
      if (!res.headersSent) {
        res.writeHead(500).end("Internal server error");
      }
    }
    return;
  }

  res.writeHead(404).end("Not Found");
});

httpServer.listen(PORT, () => {
  console.log(`MCP server listening on http://localhost:${PORT}${MCP_PATH}`);
});