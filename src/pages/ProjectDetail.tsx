import { useState } from 'react';
import { Link, Navigate, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Calendar, Camera, ExternalLink, MapPin, Play, User } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { SEOHead } from '@/components/seo/SEOHead';
import { ScrollReveal } from '@/components/ui/ScrollReveal';
import { getAdjacentProjects, getCategoryLabel, getProjectBySlug } from '@/data/projects';
import { ImageWithLightbox } from '@/components/portfolio/ImageWithLightbox';
import { Lightbox } from '@/components/portfolio/Lightbox';
import { ProjectNavigation } from '@/components/portfolio/ProjectNavigation';

export default function ProjectDetail() {
  const { slug } = useParams<{ slug: string }>();
  const project = slug ? getProjectBySlug(slug) : undefined;

  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  if (!project) {
    return <Navigate to="/404" replace />;
  }

  const openLightbox = (index: number) => {
    setCurrentImageIndex(index);
    setLightboxOpen(true);
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
  };

  const getYouTubeEmbedUrl = (url: string): string | null => {
    try {
      const parsed = new URL(url);

      if (parsed.hostname.includes('youtube.com')) {
        const videoId = parsed.searchParams.get('v');
        if (videoId) return `https://www.youtube.com/embed/${videoId}`;

        const pathParts = parsed.pathname.split('/').filter(Boolean);
        const shortsIndex = pathParts.indexOf('shorts');
        if (shortsIndex >= 0 && pathParts[shortsIndex + 1]) {
          return `https://www.youtube.com/embed/${pathParts[shortsIndex + 1]}`;
        }

        const embedIndex = pathParts.indexOf('embed');
        if (embedIndex >= 0 && pathParts[embedIndex + 1]) {
          return `https://www.youtube.com/embed/${pathParts[embedIndex + 1]}`;
        }
      }

      if (parsed.hostname.includes('youtu.be')) {
        const id = parsed.pathname.replace('/', '');
        return id ? `https://www.youtube.com/embed/${id}` : null;
      }

      return null;
    } catch {
      return null;
    }
  };

  const embedUrl = project.videoUrl ? getYouTubeEmbedUrl(project.videoUrl) : null;
  const adjacentProjects = getAdjacentProjects(project.slug);
  const fallbackSrc = project.coverImage.includes('maxresdefault')
    ? project.coverImage.replace('maxresdefault', 'hqdefault')
    : project.coverImage;
  const hasEmbeddableVideo = Boolean(embedUrl) && project.embedEnabled !== false;
  const hasVideoLink = Boolean(project.videoUrl);

  const quickFacts = [
    { label: 'Год', value: project.year, icon: Calendar },
    { label: 'Категория', value: getCategoryLabel(project.category), icon: null },
    ...(project.location ? [{ label: 'Локация', value: project.location, icon: MapPin }] : []),
    ...(project.camera ? [{ label: 'Роль', value: project.camera, icon: Camera }] : []),
    ...(project.client ? [{ label: 'Клиент', value: project.client, icon: User }] : []),
  ];

  return (
    <>
      <SEOHead title={project.title} description={project.description} image={project.coverImage} type="article" />

      <div className="min-h-screen pb-16">
        <section className="section-shell pt-10 sm:pt-12 md:pt-16">
          <div className="section-frame max-w-7xl space-y-5 md:space-y-6">
            <Link
              to="/portfolio"
              className="editorial-link group inline-flex items-center text-foreground/78 hover:text-primary"
            >
              <ArrowLeft className="size-4 transition-transform group-hover:-translate-x-1" />
              <span>Назад к работам</span>
            </Link>

            <motion.div
              className="editorial-panel relative overflow-hidden"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="absolute inset-0">
                <img
                  src={project.coverImage}
                  alt={project.title}
                  className="h-full w-full object-cover object-center opacity-36 saturate-[0.82]"
                  loading="eager"
                  fetchPriority="high"
                  onError={(e) => {
                    const img = e.currentTarget;
                    if (img.src !== fallbackSrc) {
                      img.src = fallbackSrc;
                    }
                  }}
                />
                <div className="absolute inset-0 bg-[linear-gradient(90deg,hsl(220_20%_7%_/_0.95)_0%,hsl(220_20%_7%_/_0.83)_34%,hsl(220_20%_7%_/_0.78)_62%,hsl(220_20%_7%_/_0.74)_100%)]" />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,hsl(34_42%_67%_/_0.08),transparent_24%)]" />
              </div>

              <div className="relative grid min-h-[460px] gap-8 px-5 py-7 sm:min-h-[520px] sm:px-6 md:px-8 md:py-9 lg:min-h-[620px] lg:grid-cols-[minmax(0,0.44fr)_minmax(0,0.56fr)] lg:items-start lg:gap-12 lg:px-10 lg:py-12 xl:gap-14">
                <div className="space-y-4 lg:pr-4">
                  <p className="section-eyebrow">Project</p>
                  <h1 className="max-w-[9ch] font-display text-[clamp(2.4rem,5vw,5.15rem)] leading-[0.9] text-white break-words xl:max-w-[8.5ch]">
                    {project.title}
                  </h1>
                </div>

                <div className="space-y-5 md:space-y-7 lg:max-w-3xl">
                  <div className="max-w-3xl space-y-4 md:space-y-5">
                    <div className="flex flex-wrap gap-x-4 gap-y-3 text-[0.72rem] uppercase tracking-[0.24em] text-white/70">
                      <span className="inline-flex items-center gap-2">
                        <Calendar className="size-4 text-primary" />
                        {project.year}
                      </span>
                      <span>{getCategoryLabel(project.category)}</span>
                      {project.location && (
                        <span className="inline-flex items-center gap-2">
                          <MapPin className="size-4 text-primary" />
                          {project.location}
                        </span>
                      )}
                    </div>
                    <p className="max-w-2xl text-[clamp(1.02rem,1.8vw,1.38rem)] font-light leading-[1.55] text-white/94">
                      {project.description}
                    </p>
                  </div>

                  <div className="grid gap-3 sm:grid-cols-2 2xl:grid-cols-3">
                    {quickFacts.map((fact) => {
                      const Icon = fact.icon;

                      return (
                        <div
                          key={`${fact.label}-${fact.value}`}
                          className="min-w-0 rounded-[1.35rem] border border-white/12 bg-black/14 p-4 backdrop-blur-sm md:p-5"
                        >
                          <div className="mb-3 flex items-center gap-2 text-[0.66rem] uppercase tracking-[0.22em] text-white/58">
                            {Icon ? <Icon className="size-4 shrink-0 text-primary" /> : null}
                            <span>{fact.label}</span>
                          </div>
                          <p className="break-words text-sm leading-7 text-white/92 md:text-base">{fact.value}</p>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        <section className="section-shell py-12 md:py-16">
          <div className="section-frame grid gap-6 xl:grid-cols-[minmax(0,0.64fr)_minmax(18rem,0.36fr)] xl:items-start xl:gap-8 2xl:gap-12">
            <motion.div
              className="space-y-6 md:space-y-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              {hasEmbeddableVideo ? (
                <div className="editorial-panel overflow-hidden">
                  <div className="aspect-video w-full bg-black">
                    <iframe
                      src={embedUrl ?? undefined}
                      title="YouTube video player"
                      className="h-full w-full"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      referrerPolicy="strict-origin-when-cross-origin"
                      allowFullScreen
                    />
                  </div>
                </div>
              ) : hasVideoLink ? (
                <a
                  href={project.videoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group editorial-panel block overflow-hidden"
                >
                  <div className="relative aspect-video bg-muted">
                    <img
                      src={project.coverImage}
                      alt={project.title}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                      loading="lazy"
                      onError={(e) => {
                        const img = e.currentTarget;
                        if (img.src !== fallbackSrc) {
                          img.src = fallbackSrc;
                        }
                      }}
                    />
                    <div className="absolute inset-0 bg-[linear-gradient(180deg,hsl(220_20%_7%_/_0.18),hsl(220_20%_7%_/_0.52))]" />
                    <div className="absolute inset-x-0 bottom-0 p-5 md:p-6">
                      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
                        <div className="max-w-xl space-y-2">
                          <p className="section-eyebrow text-white/72">Video Preview</p>
                          <h2 className="font-display text-[clamp(1.35rem,2.8vw,2.15rem)] leading-[1.02] text-white">
                            Смотреть проект на YouTube
                          </h2>
                          <p className="text-sm leading-7 text-white/74 md:text-base">
                            Для этого проекта встраивание недоступно, поэтому открываем оригинальную страницу видео без пустого блока.
                          </p>
                        </div>
                        <span className="inline-flex items-center gap-3 self-start rounded-full border border-white/16 bg-black/24 px-4 py-2 font-micro text-[0.68rem] uppercase tracking-[0.22em] text-white/88 backdrop-blur-sm transition-colors group-hover:bg-black/34 sm:self-auto">
                          <Play className="size-4 fill-current" />
                          Открыть видео
                          <ExternalLink className="size-4" />
                        </span>
                      </div>
                    </div>
                  </div>
                </a>
              ) : null}

              {!project.videoUrl && (
                <div className="space-y-6 md:space-y-8">
                  {project.images.map((image, index) => (
                    <ScrollReveal key={image.id} delay={index * 0.1}>
                      <ImageWithLightbox
                        image={image}
                        onClick={() => openLightbox(index)}
                        priority={index === 0}
                        index={index}
                        className="w-full"
                      />
                    </ScrollReveal>
                  ))}
                </div>
              )}
            </motion.div>

            <motion.aside
              className="space-y-5 xl:sticky xl:top-24"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.28 }}
            >
              <div className="editorial-panel p-5 md:p-6 xl:p-8">
                <div className="space-y-5">
                  <div className="space-y-3">
                    <p className="section-eyebrow">Project Note</p>
                    <p className="text-[0.98rem] leading-8 text-muted-foreground">{project.description}</p>
                  </div>

                  {project.videoUrl && (
                    <a
                      href={project.videoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="editorial-link group"
                    >
                      <span>Смотреть на YouTube</span>
                      <ExternalLink className="size-4 transition-transform group-hover:translate-x-1" />
                    </a>
                  )}
                </div>
              </div>

              <div className="editorial-panel p-5 md:p-6 xl:p-8">
                <div className="space-y-5">
                  <div className="space-y-2">
                    <p className="section-eyebrow">Credits</p>
                    <h2 className="font-display text-[clamp(1.55rem,2.3vw,2.2rem)] leading-[1.05] text-foreground">Детали проекта</h2>
                  </div>

                  <Separator className="bg-border/70" />

                  <div className="space-y-5">
                    {project.camera && (
                      <div className="space-y-2">
                        <div className="flex items-center gap-2 text-[0.7rem] uppercase tracking-[0.22em] text-muted-foreground">
                          <Camera className="size-4 text-primary" />
                          <span>Роль</span>
                        </div>
                        <p className="text-base leading-7 text-foreground">{project.camera}</p>
                      </div>
                    )}
                    {project.client && (
                      <div className="space-y-2">
                        <div className="flex items-center gap-2 text-[0.7rem] uppercase tracking-[0.22em] text-muted-foreground">
                          <User className="size-4 text-primary" />
                          <span>Клиент</span>
                        </div>
                        <p className="text-base leading-7 text-foreground">{project.client}</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </motion.aside>
          </div>
        </section>

        <section className="section-shell pt-2 md:pt-4">
          <div className="section-frame max-w-6xl">
            <ProjectNavigation prev={adjacentProjects.prev} next={adjacentProjects.next} />
          </div>
        </section>

        <Lightbox
          images={project.images}
          currentIndex={currentImageIndex}
          isOpen={lightboxOpen}
          onClose={closeLightbox}
          onNavigate={setCurrentImageIndex}
        />
      </div>
    </>
  );
}
