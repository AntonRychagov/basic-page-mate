# Connector-style ChatGPT App (MCP `search` + `fetch`)

Minimal Apps SDK-compatible MCP server that exposes the standard read-only `search` and `fetch` tools for connector-like/company-knowledge-style usage.

## Repo shape

- `src/server.js`: MCP HTTP server and tool registration
- `src/data.js`: sample document corpus
- `package.json`: scripts and dependencies
- `.env.example`: local port config

## Why this shape

- Archetype: `tool-only`
- Uses standard `search` and `fetch` tool names/signatures for connector/deep-research compatibility.
- No UI template is registered because this scaffold is data-only.

## Run locally

1. Install dependencies:
   ```bash
   npm install
   ```
2. Start server:
   ```bash
   npm start
   ```
3. Endpoint:
   - MCP: `http://localhost:8787/mcp`
   - Health: `http://localhost:8787/`

## Quick checks

- Syntax check:
  ```bash
  npm run check
  ```
- Inspector:
  ```bash
  npx @modelcontextprotocol/inspector@latest --server-url http://localhost:8787/mcp --transport http
  ```

## Connect in ChatGPT Developer Mode

1. Enable Developer Mode in ChatGPT: **Settings -> Apps & Connectors -> Advanced settings**.
2. Expose local server with HTTPS tunnel:
   ```bash
   ngrok http 8787
   ```
3. Add new app in ChatGPT with URL:
   - `https://<subdomain>.ngrok.app/mcp`
4. Refresh the app in ChatGPT after any tool/metadata change.

## Notes

- This scaffold uses in-memory sample documents (`src/data.js`).
- Replace data access with your real connector backend, keeping `search`/`fetch` shapes unchanged.