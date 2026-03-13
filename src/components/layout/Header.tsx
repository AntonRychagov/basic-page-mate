import { Link, useLocation } from 'react-router-dom';
import { Menu } from 'lucide-react';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { useScrollPosition } from '@/hooks/useScrollPosition';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { photographerInfo } from '@/data/photographer';
import { cn } from '@/lib/utils';

const navLinks = [
  { name: 'Главная', path: '/' },
  { name: 'Работы', path: '/portfolio' },
  { name: 'Обо мне', path: '/about' },
  { name: 'Контакты', path: '/contact' },
];

export function Header() {
  const location = useLocation();
  const { isScrolled } = useScrollPosition();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const isTransparent = location.pathname === '/' && !isScrolled;

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className={cn(
        'fixed inset-x-0 top-0 z-50 transition-all duration-500',
        isTransparent ? 'bg-transparent' : 'border-b border-border/70 bg-background/80 backdrop-blur-xl'
      )}
    >
      <div className="section-shell">
        <div className="section-frame max-w-7xl">
          <div className="flex h-16 items-center justify-between gap-3 sm:h-18">
            <Link
              to="/"
              className={cn(
                'min-w-0 flex-1 transition-colors duration-300 md:flex-none',
                isTransparent ? 'text-white hover:text-white/80' : 'text-foreground hover:text-primary'
              )}
            >
              <span className="block truncate font-micro text-[0.65rem] uppercase tracking-[0.26em] sm:text-[0.72rem] sm:tracking-[0.34em]">
                {photographerInfo.name.toUpperCase()}
              </span>
              <span className="mt-1 block truncate font-micro text-[0.58rem] uppercase tracking-[0.18em] opacity-66 sm:text-[0.64rem] sm:tracking-[0.28em]">
                director / writer
              </span>
            </Link>

            <nav className="hidden items-center gap-6 lg:flex xl:gap-8">
              {navLinks.map((link, index) => (
                <motion.div
                  key={link.path}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.1 * index }}
                >
                  <Link
                    to={link.path}
                    className={cn(
                      'font-micro text-[0.68rem] uppercase tracking-[0.26em] transition-colors duration-300 xl:text-[0.72rem] xl:tracking-[0.3em]',
                      isTransparent ? 'text-white/84 hover:text-white' : 'text-foreground/72 hover:text-primary'
                    )}
                  >
                    <span className="relative inline-flex flex-col gap-2">
                      {link.name}
                      {location.pathname === link.path && (
                        <motion.span
                          layoutId="activeNav"
                          className={cn('h-px w-full', isTransparent ? 'bg-white/90' : 'bg-primary/80')}
                          transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                        />
                      )}
                    </span>
                  </Link>
                </motion.div>
              ))}
            </nav>

            <div className="flex items-center gap-2 lg:hidden">
              <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
                <SheetTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className={cn('size-10 shrink-0', isTransparent && 'text-white hover:bg-white/10')}
                    aria-label="Открыть меню"
                  >
                    <Menu className="size-5" />
                  </Button>
                </SheetTrigger>
                <SheetContent
                  side="right"
                  className="w-full max-w-[min(100vw,24rem)] border-l border-border/70 bg-background/96 px-5 pb-8 pt-14 sm:px-6"
                >
                  <div className="flex h-full flex-col overflow-y-auto">
                    <div className="space-y-2">
                      <p className="section-eyebrow">Навигация</p>
                      <p className="text-sm text-muted-foreground">Выберите следующий раздел и продолжите просмотр.</p>
                    </div>
                    <nav className="mt-8 flex flex-col gap-5 sm:mt-10 sm:gap-6">
                      {navLinks.map((link) => {
                        const isActive = location.pathname === link.path;

                        return (
                          <Link
                            key={link.path}
                            to={link.path}
                            onClick={() => setMobileMenuOpen(false)}
                            className={cn(
                              'font-ui text-[1.55rem] font-medium tracking-tight text-foreground transition-colors hover:text-primary sm:text-[1.9rem]',
                              isActive && 'text-primary'
                            )}
                          >
                            {link.name}
                          </Link>
                        );
                      })}
                    </nav>
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </div>
    </motion.header>
  );
}
