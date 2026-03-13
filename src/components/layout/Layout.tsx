import { ReactNode } from 'react';
import { useLocation } from 'react-router-dom';
import { Header } from './Header';
import { Footer } from './Footer';

interface LayoutProps {
  children: ReactNode;
}

export function Layout({ children }: LayoutProps) {
  const location = useLocation();
  const isHomepage = location.pathname === '/';

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main id="main-content" className={`flex-1 ${isHomepage ? '' : 'pt-16 sm:pt-18 md:pt-20'}`} tabIndex={-1}>
        {children}
      </main>
      <Footer />
    </div>
  );
}
