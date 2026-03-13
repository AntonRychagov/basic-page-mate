import { motion } from 'framer-motion';
import { photographerInfo } from '@/data/photographer';
import { getFeaturedProjects } from '@/data/projects';
import { ProjectCard } from '@/components/portfolio/ProjectCard';
import { ScrollIndicator } from '@/components/ui/ScrollIndicator';
import { ScrollReveal } from '@/components/ui/ScrollReveal';
import { SEOHead } from '@/components/seo/SEOHead';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Home() {
  const featuredProjects = getFeaturedProjects();

  return (
    <>
      <SEOHead />

      <div className="min-h-screen">
        <section className="relative flex min-h-screen w-full items-end overflow-hidden">
          <div className="absolute inset-0">
            <video
              autoPlay
              muted
              loop
              playsInline
              preload="metadata"
              poster="/IMG_1090.MP4"
              className="h-full w-full object-cover"
              onError={(e) => {
                const target = e.currentTarget;
                target.style.opacity = '0';
              }}
            >
              <source src="/copy_42D92889-E6C2-48C3-92CC-F2B7878190BE.mov" />
              <source src="/IMG_1090.MP4" type="video/mp4" />
            </video>
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,hsl(34_42%_67%_/_0.16),transparent_28%),linear-gradient(180deg,hsl(220_20%_6%_/_0.12),hsl(220_20%_6%_/_0.76)_52%,hsl(220_20%_6%_/_0.98))]" />
          </div>

          <div className="section-shell relative w-full pb-18 pt-24 sm:pb-20 sm:pt-28 md:pb-24 md:pt-32">
            <div className="section-frame max-w-7xl">
              <motion.div
                className="grid gap-10 md:gap-12 lg:grid-cols-[minmax(0,1.25fr)_minmax(18rem,0.75fr)] lg:items-end"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, ease: 'easeOut' }}
              >
                <div className="space-y-6 md:space-y-8">
                  <motion.p
                    className="font-micro text-[0.68rem] uppercase tracking-[0.3em] text-white/70 sm:text-[0.72rem] sm:tracking-[0.34em]"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, delay: 0.1 }}
                  >
                    cinematic direction / visual storytelling
                  </motion.p>

                  <motion.h1
                    className="hero-title max-w-5xl text-white"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, delay: 0.2 }}
                  >
                    {photographerInfo.name}
                  </motion.h1>

                  <motion.div
                    className="max-w-3xl space-y-4 md:space-y-6"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, delay: 0.35 }}
                  >
                    <p className="lead-copy max-w-2xl text-white/90">{photographerInfo.tagline}</p>
                    <p className="body-copy max-w-2xl text-white/74">{photographerInfo.heroIntroduction}</p>
                  </motion.div>

                  <motion.div
                    className="flex flex-col gap-3 pt-2 sm:items-start sm:gap-4 md:flex-row"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, delay: 0.5 }}
                  >
                    <Button asChild size="lg" className="w-full sm:w-auto sm:min-w-[240px]">
                      <Link to="/portfolio">
                        <span>Смотреть работы</span>
                        <ArrowRight className="size-4" />
                      </Link>
                    </Button>

                    <Button
                      asChild
                      size="lg"
                      variant="outline"
                      className="w-full border-white/20 bg-white/8 text-white hover:border-white/40 hover:bg-white/12 hover:text-white sm:w-auto sm:min-w-[240px]"
                    >
                      <Link to="/contact">Обсудить проект</Link>
                    </Button>
                  </motion.div>
                </div>

                <motion.div
                  className="editorial-panel p-5 text-white/84 sm:p-6 lg:self-end lg:p-8"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.9, delay: 0.55 }}
                >
                  <div className="space-y-4 sm:space-y-6">
                    <p className="font-micro text-[0.68rem] uppercase tracking-[0.26em] text-white/55 sm:text-[0.7rem] sm:tracking-[0.3em]">Chapter 01</p>
                    <div className="space-y-3 sm:space-y-4">
                      <p className="font-display text-[clamp(1.8rem,2.6vw,2.45rem)] leading-[1.02] text-white">История начинается с ощущения.</p>
                      <p className="text-sm leading-7 text-white/68">
                        От идеи и драматургии до последнего кадра каждый проект собирается как цельный визуальный мир.
                      </p>
                    </div>
                    <Link to="/about" className="editorial-link group text-white/88 hover:text-white">
                      <span>О методе работы</span>
                      <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                    </Link>
                  </div>
                </motion.div>
              </motion.div>

              <motion.div
                className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 md:bottom-10 md:block"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.2, duration: 0.8 }}
              >
                <ScrollIndicator />
              </motion.div>
            </div>
          </div>
        </section>

        <section className="section-shell border-t border-border/70 py-24 md:py-32">
          <div className="section-frame grid gap-10 lg:grid-cols-[0.34fr_0.66fr] lg:gap-16">
            <ScrollReveal>
              <div className="space-y-4">
                <p className="section-eyebrow">Chapter 02</p>
                <h2 className="section-title max-w-sm">О моей работе</h2>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.1}>
              <div className="space-y-8">
                <p className="section-copy max-w-3xl">{photographerInfo.biography.split('\n\n')[0]}</p>
                <Link to="/about" className="editorial-link group">
                  <span>Узнать больше обо мне</span>
                  <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
            </ScrollReveal>
          </div>
        </section>

        <section className="section-shell border-t border-border/70 py-24 md:py-32">
          <div className="section-frame space-y-14 md:space-y-16">
            <ScrollReveal>
              <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
                <div className="space-y-4">
                  <p className="section-eyebrow">Selected Works</p>
                  <h2 className="section-title max-w-3xl">Избранные проекты</h2>
                </div>
                <p className="max-w-xl text-sm leading-7 text-muted-foreground md:text-base">
                  Музыкальные видео, режиссёрские постановки и визуальные истории, собранные как ключевые главы портфолио.
                </p>
              </div>
            </ScrollReveal>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6">
              {featuredProjects.map((project, index) => (
                <ProjectCard key={project.id} project={project} aspectRatio="landscape" showCategory={true} index={index} />
              ))}
            </div>

            <ScrollReveal delay={0.2}>
              <div className="flex justify-center">
                <Link to="/portfolio" className="editorial-link group">
                  <span>Открыть все работы</span>
                  <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
            </ScrollReveal>
          </div>
        </section>
      </div>
    </>
  );
}
