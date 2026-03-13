import { motion } from 'framer-motion';
import { ArrowRight, Instagram, Mail, MapPin, Phone, Sparkles } from 'lucide-react';
import { photographerInfo } from '@/data/photographer';
import { SEOHead } from '@/components/seo/SEOHead';
import { Button } from '@/components/ui/button';

const firstMessageChecklist = [
  'Что за проект, артист или бренд.',
  'Какая задача стоит перед релизом или коммуникацией.',
  'Референсы, музыка, мудборд или примеры настроения.',
  'Желаемые сроки, город и удобный способ связи.',
];

const contactItems = [
  {
    label: 'E-mail',
    value: photographerInfo.email,
    href: `mailto:${photographerInfo.email}`,
    icon: Mail,
  },
  {
    label: 'Телефон',
    value: photographerInfo.phone,
    href: `tel:${photographerInfo.phone}`,
    icon: Phone,
  },
  {
    label: 'Локация',
    value: photographerInfo.location,
    icon: MapPin,
  },
  {
    label: 'Статус',
    value: photographerInfo.availability,
    icon: Sparkles,
  },
];

export default function Contact() {
  const mailSubject = encodeURIComponent('Обсудить проект');
  const mailBody = encodeURIComponent(
    [
      'Здравствуйте!',
      '',
      'Хочу обсудить проект.',
      '',
      'Проект / артист / бренд:',
      'Задача:',
      'Референсы или музыка:',
      'Сроки:',
      'Город:',
      'Контакт для ответа:',
    ].join('\n')
  );

  const emailHref = `mailto:${photographerInfo.email}?subject=${mailSubject}&body=${mailBody}`;

  return (
    <>
      <SEOHead
        title="Контакты"
        description={`Свяжитесь с ${photographerInfo.name} по вопросам режиссуры, сценария, музыкальных видео и коллабораций. ${photographerInfo.availability}`}
      />

      <div className="min-h-screen">
        <section className="section-shell py-24 md:py-32">
          <motion.div
            className="section-frame max-w-6xl"
            initial={{ opacity: 0.8, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45 }}
          >
            <div className="editorial-panel p-6 sm:p-8 md:p-10 xl:p-12">
              <div className="grid gap-10 xl:grid-cols-[minmax(0,1.05fr)_minmax(18rem,0.95fr)] xl:gap-12">
                <div className="space-y-8">
                  <div className="space-y-4">
                    <p className="section-eyebrow">Contact</p>
                    <h1 className="max-w-[10ch] font-display text-[clamp(2.4rem,5vw,4.5rem)] leading-[0.94] text-foreground">
                      Обсудить проект
                    </h1>
                    <p className="lead-copy max-w-2xl">
                      Напишите с идеей, артистом или брендом, и дальше мы спокойно соберём следующий шаг по проекту.
                    </p>
                    <p className="section-copy max-w-2xl">
                      Лучше всего начать с короткого письма: задача, референсы, сроки и город. Этого достаточно, чтобы разговор сразу был предметным.
                    </p>
                  </div>

                  <div className="flex flex-col gap-3 sm:items-start">
                    <Button asChild size="lg" className="w-full sm:w-auto sm:min-w-[320px]">
                      <a href={emailHref}>
                        <Mail className="size-4" />
                        <span>Написать на email</span>
                      </a>
                    </Button>

                    <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                      <Button asChild size="lg" variant="outline" className="w-full bg-background/35 sm:w-auto">
                        <a href={`tel:${photographerInfo.phone}`}>
                          <Phone className="size-4" />
                          <span>Позвонить</span>
                        </a>
                      </Button>

                      {photographerInfo.socialLinks.instagram && (
                        <Button asChild size="lg" variant="outline" className="w-full bg-background/35 sm:w-auto">
                          <a href={photographerInfo.socialLinks.instagram} target="_blank" rel="noopener noreferrer">
                            <Instagram className="size-4" />
                            <span>Instagram</span>
                          </a>
                        </Button>
                      )}
                    </div>
                  </div>
                </div>

                <div className="space-y-6 border-t border-border/70 pt-6 xl:border-t-0 xl:border-l xl:pt-0 xl:pl-10">
                  <div className="space-y-3">
                    <p className="section-eyebrow">Контакты</p>
                    <div className="space-y-4">
                      {contactItems.map((item) => {
                        const Icon = item.icon;

                        return (
                          <div key={item.label} className="space-y-2">
                            <p className="font-micro text-[0.68rem] uppercase tracking-[0.24em] text-muted-foreground">
                              {item.label}
                            </p>
                            <div className="flex items-start gap-3 text-base text-foreground md:text-lg">
                              <Icon className="mt-1 size-4 shrink-0 text-primary" />
                              {item.href ? (
                                <a href={item.href} className="break-all transition-colors hover:text-primary">
                                  {item.value}
                                </a>
                              ) : (
                                <span>{item.value}</span>
                              )}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  <div className="space-y-3">
                    <p className="section-eyebrow">Что прислать</p>
                    <ul className="space-y-3 text-sm leading-7 text-foreground md:text-base">
                      {firstMessageChecklist.map((item) => (
                        <li key={item} className="flex items-start gap-3">
                          <ArrowRight className="mt-1 size-4 shrink-0 text-primary" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </section>
      </div>
    </>
  );
}
