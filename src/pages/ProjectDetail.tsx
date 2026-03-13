import { useState } from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Calendar, MapPin, Camera, User, ExternalLink } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { SEOHead } from '@/components/seo/SEOHead';
import { ScrollReveal } from '@/components/ui/ScrollReveal';
import { getProjectBySlug, getCategoryLabel } from '@/data/projects';
import { ImageWithLightbox } from '@/components/portfolio/ImageWithLightbox';
import { Lightbox } from '@/components/portfolio/Lightbox';

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
      const videoId = parsed.searchParams.get('v');
      if (videoId) return `https://www.youtube.com/embed/${videoId}`;

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
  const fallbackSrc = project.coverImage.includes('maxresdefault')
    ? project.coverImage.replace('maxresdefault', 'hqdefault')
    : project.coverImage;

  return (
    <>
      <SEOHead
        title={project.title}
        description={project.description}
        image={project.coverImage}
        type="article"
      />

      <div className="min-h-screen">
        <section className="px-6 lg:px-8 pt-10">
          <motion.div
            className="relative max-w-5xl mx-auto overflow-hidden rounded-sm bg-muted aspect-[16/8.8]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            <img
              src={project.coverImage}
              alt={project.title}
              className="w-full h-full object-cover"
              loading="eager"
              fetchPriority="high"
              onError={(e) => {
                const img = e.currentTarget;
                if (img.src !== fallbackSrc) {
                  img.src = fallbackSrc;
                }
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background/40 via-transparent to-transparent" />
          </motion.div>
        </section>

        <section className="max-w-4xl mx-auto px-6 lg:px-8 py-12 md:py-16">
          <motion.div
            className="space-y-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="space-y-4">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-light tracking-wide">{project.title}</h1>
              <div className="flex flex-wrap gap-6 text-sm text-muted-foreground font-light">
                <div className="flex items-center gap-2">
                  <Calendar className="size-4" />
                  <span>{project.year}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span>|</span>
                  <span>{getCategoryLabel(project.category)}</span>
                </div>
                {project.location && (
                  <>
                    <span>|</span>
                    <div className="flex items-center gap-2">
                      <MapPin className="size-4" />
                      <span>{project.location}</span>
                    </div>
                  </>
                )}
              </div>
            </div>

            <Separator />

            <div className="space-y-4">
              <p className="text-lg md:text-xl font-light leading-relaxed text-foreground">{project.description}</p>
            </div>
            {embedUrl && project.embedEnabled !== false && (
              <div className="pt-2">
                <div className="aspect-video w-full overflow-hidden rounded-sm border border-border bg-black">
                  <iframe
                    src={embedUrl}
                    title="YouTube video player"
                    className="h-full w-full"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    referrerPolicy="strict-origin-when-cross-origin"
                    allowFullScreen
                  />
                </div>
              </div>
            )}
            {project.videoUrl && (
              <div className="pt-2">
                <a
                  href={project.videoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm md:text-base font-light tracking-wide text-foreground hover:text-muted-foreground transition-colors"
                >
                  <span>Смотреть на YouTube</span>
                  <ExternalLink className="size-4" />
                </a>
              </div>
            )}

            <div className="grid md:grid-cols-2 gap-6 pt-4">
              {project.camera && (
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm font-light tracking-wide uppercase text-muted-foreground">
                    <Camera className="size-4" />
                    <span>Роль</span>
                  </div>
                  <p className="font-light text-foreground">{project.camera}</p>
                </div>
              )}
              {project.client && (
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm font-light tracking-wide uppercase text-muted-foreground">
                    <User className="size-4" />
                    <span>Клиент</span>
                  </div>
                  <p className="font-light text-foreground">{project.client}</p>
                </div>
              )}
            </div>
          </motion.div>
        </section>

        {!project.videoUrl && (
          <section className="py-12 md:py-16">
            <div className="space-y-8 md:space-y-12">
              {project.images.map((image, index) => (
                <ScrollReveal key={image.id} delay={index * 0.1}>
                  <ImageWithLightbox
                    image={image}
                    onClick={() => openLightbox(index)}
                    priority={index === 0}
                    index={0}
                    className="w-full"
                  />
                </ScrollReveal>
              ))}
            </div>
          </section>
        )}

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





