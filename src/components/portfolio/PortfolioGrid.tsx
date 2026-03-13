import { AnimatePresence, motion } from 'framer-motion';
import type { Project } from '@/types';
import { ProjectCard } from './ProjectCard';

interface PortfolioGridProps {
  projects: Project[];
}

const formatProjectCount = (count: number) => {
  if (count % 10 === 1 && count % 100 !== 11) {
    return `${count} проект`;
  }

  if ([2, 3, 4].includes(count % 10) && ![12, 13, 14].includes(count % 100)) {
    return `${count} проекта`;
  }

  return `${count} проектов`;
};

export function PortfolioGrid({ projects }: PortfolioGridProps) {
  const projectGroups = Object.entries(
    projects.reduce<Record<string, Project[]>>((groups, project) => {
      groups[project.year] ??= [];
      groups[project.year].push(project);
      return groups;
    }, {})
  ).sort(([left], [right]) => Number(right) - Number(left));

  return (
    <motion.div layout className="space-y-14 md:space-y-18">
      <AnimatePresence mode="popLayout">
        {projectGroups.map(([year, yearProjects], groupIndex) => (
          <motion.section
            key={year}
            layout
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{
              duration: 0.45,
              delay: groupIndex * 0.04,
              layout: { duration: 0.35 },
            }}
            className="space-y-6 md:space-y-8"
          >
            <div className="flex flex-col gap-3 border-b border-border/70 pb-4 md:flex-row md:items-end md:justify-between">
              <div className="space-y-1">
                <p className="section-eyebrow">Year</p>
                <h2 className="font-display text-[clamp(1.8rem,3vw,2.75rem)] leading-none text-foreground">{year}</h2>
              </div>
              <p className="font-micro text-[0.68rem] uppercase tracking-[0.24em] text-muted-foreground">
                {formatProjectCount(yearProjects.length)}
              </p>
            </div>

            <div className="grid grid-cols-1 gap-5 sm:gap-6 lg:grid-cols-2 lg:gap-8 2xl:grid-cols-3 2xl:gap-10">
              {yearProjects.map((project, index) => (
                <motion.div
                  key={project.id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  transition={{
                    duration: 0.5,
                    delay: index * 0.05,
                    layout: { duration: 0.4 },
                  }}
                  className="min-w-0"
                >
                  <ProjectCard project={project} aspectRatio="landscape" showCategory={true} index={index} />
                </motion.div>
              ))}
            </div>
          </motion.section>
        ))}
      </AnimatePresence>
    </motion.div>
  );
}
