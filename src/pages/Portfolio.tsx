import { useState } from 'react';
import { motion } from 'framer-motion';
import { PortfolioGrid } from '@/components/portfolio/PortfolioGrid';
import { SEOHead } from '@/components/seo/SEOHead';
import { getProjectYears, getProjectsByYear } from '@/data/projects';
import { cn } from '@/lib/utils';

const formatWorksCount = (count: number) => {
  if (count % 10 === 1 && count % 100 !== 11) {
    return `${count} работа`;
  }

  if ([2, 3, 4].includes(count % 10) && ![12, 13, 14].includes(count % 100)) {
    return `${count} работы`;
  }

  return `${count} работ`;
};

export default function Portfolio() {
  const [activeYear, setActiveYear] = useState('all');
  const years = getProjectYears();
  const yearOptions = ['all', ...years];
  const filteredProjects = getProjectsByYear(activeYear);

  return (
    <>
      <SEOHead
        title="Работы"
        description="Подборка работ Лены Велиевой: музыкальные видео, режиссёрские проекты и визуальные истории."
      />

      <div className="min-h-screen">
        <section className="section-shell border-b border-border/70 py-24 md:py-32">
          <div className="section-frame grid items-start gap-10 lg:grid-cols-[0.34fr_0.66fr] lg:gap-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-4"
            >
              <p className="section-eyebrow">Selected Filmography</p>
              <h1 className="section-title max-w-sm">Работы</h1>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.08 }}
              className="max-w-2xl space-y-6"
            >
              <p className="lead-copy">
                Кураторская подборка музыкальных клипов, режиссёрских работ и визуальных историй.
              </p>
              <p className="section-copy max-w-2xl">
                Каждая работа показывает не только изображение, но и то, как через ритм, атмосферу и драматургию выстраивается отдельный мир проекта.
              </p>
            </motion.div>
          </div>
        </section>

        <section className="section-shell py-16 md:py-20">
          <div className="section-frame max-w-7xl space-y-8 md:space-y-10">
            <div className="sticky top-18 z-20 -mx-4 overflow-x-auto px-4 pb-2 sm:-mx-6 sm:px-6 md:top-20 lg:-mx-8 lg:px-8 xl:-mx-10 xl:px-10">
              <div className="inline-flex min-w-max gap-3 rounded-full border border-border/80 bg-background/75 p-2 shadow-sm backdrop-blur">
                {yearOptions.map((year) => {
                  const isActive = activeYear === year;
                  const label = year === 'all' ? 'Все годы' : year;

                  return (
                    <motion.button
                      key={year}
                      type="button"
                      onClick={() => setActiveYear(year)}
                      className={cn(
                        'relative shrink-0 rounded-full px-4 py-2.5 font-micro text-[0.68rem] uppercase tracking-[0.24em] transition-colors md:px-5',
                        isActive ? 'text-primary-foreground' : 'text-muted-foreground hover:text-foreground'
                      )}
                      whileTap={{ scale: 0.98 }}
                    >
                      {isActive ? (
                        <motion.span
                          layoutId="activeYear"
                          className="absolute inset-0 rounded-full bg-primary"
                          transition={{ type: 'spring', stiffness: 420, damping: 32 }}
                        />
                      ) : null}
                      <span className="relative z-10">{label}</span>
                    </motion.button>
                  );
                })}
              </div>
            </div>

            <div className="flex flex-col gap-3 border-b border-border/70 pb-5 md:flex-row md:items-end md:justify-between">
              <div className="space-y-2">
                <p className="section-eyebrow">Curated Selection</p>
                <p className="section-copy max-w-2xl">
                  {activeYear === 'all'
                    ? 'Портфолио собрано как хронология: от ранних клипов к более поздним проектам.'
                    : `Подборка работ за ${activeYear} год.`}
                </p>
              </div>
              <p className="font-micro text-[0.68rem] uppercase tracking-[0.24em] text-muted-foreground">
                {formatWorksCount(filteredProjects.length)}
              </p>
            </div>

            <PortfolioGrid projects={filteredProjects} />
          </div>
        </section>

        <div className="h-16" />
      </div>
    </>
  );
}
