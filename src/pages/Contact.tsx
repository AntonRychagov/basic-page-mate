import { motion } from 'framer-motion';
import { Mail, Phone, MapPin } from 'lucide-react';
import { photographerInfo } from '@/data/photographer';
import { Separator } from '@/components/ui/separator';
import { SEOHead } from '@/components/seo/SEOHead';

export default function Contact() {
  return (
    <>
      <SEOHead
        title="Контакты"
        description={`Свяжитесь с ${photographerInfo.name} по вопросам режиссуры, сценария, музыкальных клипов и коллабораций. ${photographerInfo.availability}`}
      />

      <div className="min-h-screen">
        <section className="py-24 md:py-32 px-6 lg:px-8 border-b border-border">
          <div className="max-w-4xl mx-auto text-center space-y-6">
            <motion.div
              initial={{ opacity: 0.8, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-light tracking-wide mb-4">Связаться</h1>
              <p className="text-lg md:text-xl text-muted-foreground font-light tracking-wide">Контакты для связи</p>
            </motion.div>
          </div>
        </section>

        <section className="py-16 md:py-24 px-6 lg:px-8">
          <div className="max-w-3xl mx-auto">
            <motion.div
              className="space-y-8"
              initial={{ opacity: 0.8, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              <div className="space-y-3 text-center">
                <h2 className="text-3xl md:text-4xl font-light tracking-wide">Контактная информация</h2>
                <p className="text-muted-foreground font-light">
                  Форма обратной связи временно отключена. Вы можете связаться напрямую по контактам ниже.
                </p>
              </div>

              <Separator />

              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-sm bg-accent">
                    <Mail className="size-5 text-muted-foreground" />
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm font-light tracking-wide text-muted-foreground">E-mail</p>
                    <a
                      href={`mailto:${photographerInfo.email}`}
                      className="text-base md:text-lg font-light hover:text-muted-foreground transition-colors"
                    >
                      {photographerInfo.email}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-sm bg-accent">
                    <Phone className="size-5 text-muted-foreground" />
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm font-light tracking-wide text-muted-foreground">Телефон</p>
                    <a
                      href={`tel:${photographerInfo.phone}`}
                      className="text-base md:text-lg font-light hover:text-muted-foreground transition-colors"
                    >
                      {photographerInfo.phone}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-sm bg-accent">
                    <MapPin className="size-5 text-muted-foreground" />
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm font-light tracking-wide text-muted-foreground">Локация</p>
                    <p className="text-base md:text-lg font-light">{photographerInfo.location}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        <div className="h-16" />
      </div>
    </>
  );
}

