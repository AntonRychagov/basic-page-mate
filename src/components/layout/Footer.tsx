import { Instagram } from 'lucide-react';
import { photographerInfo } from '@/data/photographer';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-border/70 bg-background/45">
      <div className="section-shell py-5 md:py-6">
        <div className="section-frame max-w-7xl">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <p className="font-micro text-[0.66rem] uppercase tracking-[0.24em] text-muted-foreground">
              © {currentYear} Все права защищены
            </p>

            {photographerInfo.socialLinks.instagram && (
              <a
                href={photographerInfo.socialLinks.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex size-8 items-center justify-center self-start text-muted-foreground transition-colors hover:text-primary sm:self-auto"
                aria-label="Instagram"
              >
                <Instagram className="size-4" />
              </a>
            )}
          </div>
        </div>
      </div>
    </footer>
  );
}
