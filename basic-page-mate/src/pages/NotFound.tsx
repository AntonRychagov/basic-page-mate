import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { SEOHead } from '@/components/seo/SEOHead';

const NotFound = () => {
  return (
    <>
      <SEOHead
        title="Страница не найдена"
        description="Страница, которую вы ищете, не существует. Вернитесь на главную, чтобы продолжить просмотр."
      />

      <main className="min-h-[calc(100vh-8rem)] flex items-center justify-center px-6">
        <motion.div
          className="max-w-2xl w-full text-center space-y-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <h1 className="text-[120px] md:text-[180px] font-extralight tracking-wider leading-none text-foreground/10">404</h1>
          </motion.div>

          <div className="space-y-4 -mt-8">
            <motion.h2
              className="text-3xl md:text-5xl font-light tracking-wide"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
            >
              Страница не найдена
            </motion.h2>

            <motion.p
              className="text-base md:text-lg text-muted-foreground font-light leading-relaxed max-w-md mx-auto"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.5 }}
            >
              Страница, которую вы ищете, не существует или была перемещена. Вернём вас к нужному разделу.
            </motion.p>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.5 }}
          >
            <Button asChild size="lg" className="px-8 py-6 text-base font-light tracking-wide group">
              <Link to="/">
                <ArrowLeft className="mr-2 size-5 transition-transform group-hover:-translate-x-1" />
                Вернуться на главную
              </Link>
            </Button>
          </motion.div>

          <motion.div
            className="pt-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7, duration: 0.8 }}
          >
            <div className="h-px w-24 mx-auto bg-border" />
          </motion.div>
        </motion.div>
      </main>
    </>
  );
};

export default NotFound;
