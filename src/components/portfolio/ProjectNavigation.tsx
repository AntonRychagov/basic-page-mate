import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import type { Project } from '@/types';
import { getCategoryLabel } from '@/data/projects';
import { cn } from '@/lib/utils';

interface ProjectNavigationProps {
  prev: Project | null;
  next: Project | null;
}

export function ProjectNavigation({ prev, next }: ProjectNavigationProps) {
  const cardBaseClassName = 'group block px-5 py-6 transition-colors duration-300 hover:bg-accent/40 sm:px-6 sm:py-7 md:px-8 md:py-10 xl:px-10 xl:py-12';
  const titleClassName = 'max-w-[18ch] text-[clamp(1.45rem,4vw,2.55rem)] leading-[1] text-foreground';
  const metaClassName = 'mt-3 text-sm font-light text-muted-foreground';
  const labelClassName = 'text-[0.68rem] uppercase tracking-[0.22em] text-muted-foreground transition-colors group-hover:text-foreground';

  return (
    <div className="grid grid-cols-1 overflow-hidden rounded-[1.5rem] border border-border/70 bg-card/20 md:grid-cols-2 md:rounded-[2rem]">
      <div className={cn('border-b border-border/70 md:border-b-0 md:border-r', !prev && 'opacity-50')}>
        {prev ? (
          <Link to={`/project/${prev.slug}`} className={cardBaseClassName}>
            <motion.div className="space-y-5" whileHover={{ x: -4 }} transition={{ duration: 0.25 }}>
              <div className="flex items-center gap-3 text-muted-foreground">
                <ArrowLeft className="size-4 shrink-0" />
                <span className={labelClassName}>Предыдущий проект</span>
              </div>
              <div>
                <h3 className={titleClassName}>{prev.title}</h3>
                <p className={metaClassName}>
                  {getCategoryLabel(prev.category)} | {prev.year}
                </p>
              </div>
            </motion.div>
          </Link>
        ) : (
          <div className="px-5 py-6 sm:px-6 sm:py-7 md:px-8 md:py-10 xl:px-10 xl:py-12">
            <div className="flex items-center gap-3 text-muted-foreground">
              <ArrowLeft className="size-4 shrink-0" />
              <span className="text-[0.68rem] uppercase tracking-[0.22em]">Нет предыдущего проекта</span>
            </div>
          </div>
        )}
      </div>

      <div className={cn(!next && 'opacity-50')}>
        {next ? (
          <Link to={`/project/${next.slug}`} className={cardBaseClassName}>
            <motion.div className="space-y-5" whileHover={{ x: 4 }} transition={{ duration: 0.25 }}>
              <div className="flex items-center gap-3 text-muted-foreground md:justify-end">
                <span className={cn(labelClassName, 'order-2 md:order-1')}>Следующий проект</span>
                <ArrowRight className="order-1 size-4 shrink-0 md:order-2" />
              </div>
              <div className="md:text-right">
                <h3 className={cn(titleClassName, 'md:ml-auto')}>{next.title}</h3>
                <p className={metaClassName}>
                  {getCategoryLabel(next.category)} | {next.year}
                </p>
              </div>
            </motion.div>
          </Link>
        ) : (
          <div className="px-5 py-6 sm:px-6 sm:py-7 md:px-8 md:py-10 xl:px-10 xl:py-12 md:text-right">
            <div className="flex items-center gap-3 text-muted-foreground md:justify-end">
              <span className="text-[0.68rem] uppercase tracking-[0.22em]">Нет следующего проекта</span>
              <ArrowRight className="size-4 shrink-0" />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
