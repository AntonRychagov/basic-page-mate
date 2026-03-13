import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Instagram, Linkedin, Mail } from 'lucide-react';
import { photographerInfo } from '@/data/photographer';
import { Separator } from '@/components/ui/separator';
import { SEOHead } from '@/components/seo/SEOHead';

const workflowSteps = [
  {
    number: '01',
    title: 'Сначала ищу ощущение',
    description:
      'До treatment и референсов важно понять, что должен почувствовать зритель в конце. От этой эмоции строится вся режиссерская логика проекта.',
  },
  {
    number: '02',
    title: 'Собираю цельный визуальный мир',
    description:
      'Сценарий, ритм, пластика кадра, интонация света и пространство работают не отдельно, а как один язык, который держит историю.',
  },
  {
    number: '03',
    title: 'Довожу идею до ясной формы',
    description:
      'Мне важны не только сильные образы, но и продакшн-дисциплина: прозрачный процесс, понятные решения и внятный результат на выходе.',
  },
];

const collaborationAreas = [
  'Музыкальные клипы и визуальные истории для артистов.',
  'Режиссура и сценарная разработка под релиз, кампанию или авторский проект.',
  'Имиджевые и креативные проекты для брендов, которым важен характер, а не шаблон.',
  'Коллаборации на этапе идеи, treatment, препродакшна или пересборки визуальной концепции.',
];

const profileFacts = [
  { label: 'Фокус', value: 'Сценарий, режиссура, визуальный сторителлинг' },
  { label: 'Форматы', value: 'Музыкальные видео, имиджевые проекты, авторские истории' },
  { label: 'Локация', value: photographerInfo.location },
  { label: 'Статус', value: photographerInfo.availability },
];

export default function About() {
  const biographyParagraphs = photographerInfo.biography.split('\n\n');
  const approachParagraphs = photographerInfo.approach.split('\n\n');

  return (
    <>
      <SEOHead
        title="Обо мне"
        description={`Узнайте больше о ${photographerInfo.name}: ${photographerInfo.tagline}. ${biographyParagraphs[0]}`}
        image={photographerInfo.portraitImage}
      />

      <div className="min-h-screen">
        <section className="section-shell border-b border-border/70 py-24 md:py-28">
          <div className="section-frame max-w-7xl">
            <div className="grid gap-8 lg:grid-cols-[minmax(0,1.15fr)_minmax(320px,0.85fr)] lg:items-start lg:gap-12">
              <motion.div
                className="order-2 space-y-8 lg:order-1 lg:pt-6"
                initial={{ opacity: 0.88, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45 }}
              >
                <div className="space-y-5">
                  <p className="section-eyebrow">About</p>
                  <h1 className="max-w-[11ch] font-display text-[clamp(2.9rem,6.5vw,5.2rem)] leading-[0.94] text-foreground">
                    Не просто кадр, а мир, который остается внутри.
                  </h1>
                </div>

                <div className="max-w-3xl space-y-5">
                  <p className="text-[clamp(1.1rem,1.8vw,1.5rem)] font-light leading-[1.5] text-foreground">
                    Я работаю на стыке сценария и режиссуры, где атмосфера, ритм и драматургия
                    собирают историю в цельное переживание.
                  </p>
                  <p className="max-w-2xl text-[clamp(0.98rem,1.02vw,1.06rem)] font-light leading-8 text-muted-foreground">
                    Для меня визуал не существует отдельно от смысла. Важно, чтобы проект не
                    только выглядел сильно, но и точно передавал состояние, интонацию и
                    внутреннюю логику истории.
                  </p>
                  <p className="max-w-2xl text-[clamp(0.98rem,1.02vw,1.06rem)] font-light leading-8 text-muted-foreground">
                    Поэтому в работе я соединяю авторский взгляд с продуманной структурой: от
                    первого ощущения и treatment до финального кадра и общей эмоциональной дуги
                    проекта.
                  </p>
                </div>

                <div className="flex flex-col gap-4 pt-2 sm:flex-row sm:items-center">
                  <Link to="/contact" className="editorial-link group">
                    <span>Обсудить идею проекта</span>
                    <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                  <a
                    href={`mailto:${photographerInfo.email}`}
                    className="inline-flex items-center gap-3 text-sm text-muted-foreground transition-colors hover:text-primary"
                  >
                    <Mail className="size-4" />
                    <span>{photographerInfo.email}</span>
                  </a>
                </div>
              </motion.div>

              <motion.div
                className="order-1 lg:order-2"
                initial={{ opacity: 0.88, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, delay: 0.06 }}
              >
                <div className="space-y-4">
                  <div className="editorial-panel overflow-hidden">
                    <div className="relative aspect-[4/5] sm:aspect-[5/6] lg:aspect-[4/5]">
                      <img
                        src={photographerInfo.portraitImage}
                        alt={photographerInfo.name}
                        className="absolute inset-0 h-full w-full object-cover"
                        loading="eager"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-background/88 via-transparent to-transparent" />

                      <div className="absolute inset-x-0 bottom-0 p-6 md:p-8">
                        <div className="rounded-[1.5rem] border border-white/12 bg-black/24 p-5 backdrop-blur-md">
                          <p className="font-micro text-[0.64rem] uppercase tracking-[0.24em] text-white/70">
                            {photographerInfo.tagline}
                          </p>
                          <p className="mt-3 text-[0.92rem] leading-7 text-white/78">
                            {photographerInfo.availability}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    {profileFacts.map((fact) => (
                      <div key={fact.label} className="editorial-panel p-5 md:p-6">
                        <p className="section-eyebrow text-primary/70">{fact.label}</p>
                        <p className="mt-3 text-[0.92rem] leading-7 text-foreground md:text-[0.98rem]">
                          {fact.value}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        <section className="section-shell py-16 md:py-24">
          <div className="section-frame max-w-7xl">
            <div className="grid gap-12 lg:grid-cols-[minmax(220px,0.36fr)_minmax(0,0.64fr)] lg:gap-14">
              <motion.div
                className="space-y-4 lg:sticky lg:top-28 lg:self-start"
                initial={{ opacity: 0.88, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4 }}
              >
                <p className="section-eyebrow">Profile</p>
                <h2 className="max-w-[9ch] font-display text-[clamp(2.2rem,4.3vw,3.7rem)] leading-[0.96] text-foreground">Авторский взгляд и рабочий метод.</h2>
              </motion.div>

              <motion.div
                className="space-y-10"
                initial={{ opacity: 0.88, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.06 }}
              >
                <div className="editorial-panel p-7 md:p-8">
                  <div className="space-y-4">
                    <h3 className="font-display text-[clamp(1.8rem,2.5vw,2.45rem)] leading-[1] text-foreground">
                      {photographerInfo.name}
                    </h3>
                    <p className="font-micro text-[0.72rem] uppercase tracking-[0.18em] text-muted-foreground">
                      {photographerInfo.tagline}
                    </p>
                    <Separator className="bg-border/70" />
                    <div className="space-y-5">
                      {biographyParagraphs.map((paragraph, index) => (
                        <p key={index} className="max-w-2xl text-[clamp(0.98rem,1.02vw,1.06rem)] font-light leading-8 text-muted-foreground">
                          {paragraph}
                        </p>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="editorial-panel p-7 md:p-8">
                  <div className="space-y-6">
                    <div className="space-y-3">
                      <p className="section-eyebrow">Method</p>
                      <h3 className="font-display text-[clamp(1.8rem,2.5vw,2.4rem)] leading-[1.02] text-foreground">
                        Как собирается проект
                      </h3>
                    </div>

                    <div className="grid gap-4">
                      {workflowSteps.map((step) => (
                        <div
                          key={step.number}
                          className="rounded-[1.6rem] border border-border/70 bg-background/30 p-5 md:p-6"
                        >
                          <div className="grid gap-3 md:grid-cols-[80px_minmax(0,1fr)] md:gap-5">
                            <p className="font-micro text-[0.68rem] uppercase tracking-[0.28em] text-primary/80">
                              Step {step.number}
                            </p>
                            <div className="space-y-2">
                              <h4 className="text-[1.02rem] leading-tight text-foreground md:text-[1.12rem]">
                                {step.title}
                              </h4>
                              <p className="text-[0.94rem] leading-7 text-muted-foreground">
                                {step.description}
                              </p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="space-y-4">
                      {approachParagraphs.map((paragraph, index) => (
                        <p key={index} className="text-[0.98rem] font-light leading-8 text-muted-foreground">
                          {paragraph}
                        </p>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="editorial-panel p-7 md:p-8">
                  <div className="space-y-4">
                    <p className="section-eyebrow">Contact</p>
                    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                      <a
                        href={`mailto:${photographerInfo.email}`}
                        className="inline-flex items-center gap-3 text-sm text-foreground transition-colors hover:text-primary"
                      >
                        <Mail className="size-4" />
                        <span>{photographerInfo.email}</span>
                      </a>
                      <div className="flex items-center gap-3">
                        {photographerInfo.socialLinks.instagram && (
                          <a
                            href={photographerInfo.socialLinks.instagram}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex size-10 items-center justify-center rounded-full border border-border/80 text-muted-foreground transition-colors hover:border-primary/60 hover:text-primary"
                            aria-label="Instagram"
                          >
                            <Instagram className="size-4" />
                          </a>
                        )}
                        {photographerInfo.socialLinks.linkedin && (
                          <a
                            href={photographerInfo.socialLinks.linkedin}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex size-10 items-center justify-center rounded-full border border-border/80 text-muted-foreground transition-colors hover:border-primary/60 hover:text-primary"
                            aria-label="LinkedIn"
                          >
                            <Linkedin className="size-4" />
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        <section className="section-shell border-t border-border/70 py-16 md:py-24">
          <div className="section-frame max-w-7xl">
            <div className="grid gap-10 lg:grid-cols-[minmax(220px,0.36fr)_minmax(0,0.64fr)] lg:gap-14">
              <motion.div
                className="space-y-4"
                initial={{ opacity: 0.88, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4 }}
              >
                <p className="section-eyebrow">Collaboration</p>
                <h2 className="max-w-[9ch] font-display text-[clamp(2.2rem,4.3vw,3.7rem)] leading-[0.96] text-foreground">Для кого и для каких задач</h2>
              </motion.div>

              <motion.div
                className="space-y-8"
                initial={{ opacity: 0.88, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.06 }}
              >
                <p className="section-copy max-w-3xl">
                  Мне интересны проекты, в которых есть характер, внутренняя энергия и готовность
                  искать неочевидное, но точное визуальное решение.
                </p>

                <div className="grid gap-4 md:grid-cols-2">
                  {collaborationAreas.map((item) => (
                    <div key={item} className="editorial-panel p-6">
                      <p className="text-[0.98rem] leading-7 text-foreground">{item}</p>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        <section className="section-shell border-t border-border/70 py-20 md:py-28">
          <motion.div
            className="section-frame max-w-7xl"
            initial={{ opacity: 0.88, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
          >
            <div className="editorial-panel overflow-hidden p-8 md:p-10 lg:p-12">
              <div className="grid gap-8 lg:grid-cols-[minmax(0,0.62fr)_minmax(260px,0.38fr)] lg:items-end">
                <div className="space-y-5">
                  <p className="section-eyebrow">Next Step</p>
                  <h2 className="max-w-[12ch] font-display text-[clamp(2.5rem,5.4vw,4.3rem)] leading-[0.95] text-foreground">
                    Если у вас есть трек, идея или ощущение, с этого уже можно начать.
                  </h2>
                  <p className="max-w-2xl text-[clamp(0.98rem,1.02vw,1.06rem)] font-light leading-8 text-muted-foreground">
                    Присылайте задачу, референсы, музыку или просто состояние, которое должен
                    оставить проект. Дальше я помогу собрать из этого ясную визуальную форму.
                  </p>
                </div>

                <div className="space-y-4 lg:justify-self-end">
                  <Link to="/contact" className="editorial-link group">
                    <span>Обсудить идею проекта</span>
                    <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                  <a
                    href={`mailto:${photographerInfo.email}`}
                    className="inline-flex items-center gap-3 rounded-full border border-border/80 px-5 py-3 text-sm text-foreground transition-colors hover:border-primary/60 hover:text-primary"
                  >
                    <Mail className="size-4" />
                    <span>{photographerInfo.email}</span>
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
        </section>
      </div>
    </>
  );
}
