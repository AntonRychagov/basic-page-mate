import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import type { Project } from '@/types';
import { getCategoryLabel } from '@/data/projects';
import { cn } from '@/lib/utils';

interface ProjectCardProps {
  project: Project;
  aspectRatio?: 'portrait' | 'landscape' | 'square';
  showCategory?: boolean;
  index?: number;
}

export function ProjectCard({ project, aspectRatio, showCategory = true, index = 0 }: ProjectCardProps) {
  const [isLoaded, setIsLoaded] = React.useState(false);
  const ratio = aspectRatio || 'landscape';
  const fallbackSrc = project.coverImage.includes('maxresdefault')
    ? project.coverImage.replace('maxresdefault', 'hqdefault')
    : project.coverImage;
  const projectMeta = [project.client, project.camera].filter(Boolean).join(' · ');

  const aspectRatioClasses = {
    portrait: 'aspect-[3/4]',
    landscape: 'aspect-[3/2]',
    square: 'aspect-square',
  };

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: index * 0.1 }}>
      <Link to={`/project/${project.slug}`} className="group block h-full">
        <div className="editorial-panel h-full overflow-hidden">
          <div className={cn('relative overflow-hidden bg-muted', aspectRatioClasses[ratio])}>
            {!isLoaded && <div className="absolute inset-0 bg-muted" />}

            <motion.img
              src={project.coverImage}
              alt={project.title}
              className={cn(
                'absolute inset-0 h-full w-full object-cover transition-all duration-700',
                isLoaded ? 'opacity-100' : 'opacity-0',
                'group-hover:scale-[1.04]'
              )}
              loading={index < 6 ? 'eager' : 'lazy'}
              onLoad={() => setIsLoaded(true)}
              onError={(e) => {
                const img = e.currentTarget;
                if (img.src !== fallbackSrc) {
                  img.src = fallbackSrc;
                }
              }}
            />

            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/15 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 p-4 sm:p-5 md:p-6">
              <div className="space-y-3">
                {showCategory && (
                  <div className="flex flex-wrap items-center gap-2 font-micro text-[0.58rem] uppercase tracking-[0.2em] text-white/55 md:text-[0.62rem]">
                    <span>{getCategoryLabel(project.category)}</span>
                    <span className="text-primary/80">/</span>
                    <span>{project.year}</span>
                  </div>
                )}
                <div className="space-y-2">
                  <h3 className="card-title max-w-[18ch] break-words">{project.title}</h3>
                  {projectMeta ? (
                    <p className="max-w-[30ch] text-sm leading-6 break-words text-white/74 md:text-[0.96rem]">
                      {projectMeta}
                    </p>
                  ) : null}
                </div>
              </div>
            </div>

            <div className="absolute inset-0 border border-white/0 transition-colors duration-500 group-hover:border-white/10" />
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
