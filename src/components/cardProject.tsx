import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

type project = {
  name: string;
  date: number;
  image: string;
  images?: string[];
  description: string;
  descriptionEs: string;
  technologies: string[];
};

const ImageSlider = ({ images }: { images: string[] }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const prevSlide = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <div className="relative w-full aspect-video rounded-2xl overflow-hidden  shadow-sm group/slider border border-white/5">
      <AnimatePresence mode="wait">
        <motion.img
          key={currentIndex}
          layoutId={currentIndex === 0 ? `image-container-${images[0]}` : undefined}
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
          src={images[currentIndex]}
          alt={`Project view ${currentIndex + 1}`}
          className="w-full h-full object-cover"
        />
      </AnimatePresence>

      {images.length > 1 && (
        <>
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/40 opacity-0 group-hover/slider:opacity-100 transition-opacity duration-300 pointer-events-none" />
          <button
            onClick={prevSlide}
            className="absolute left-3 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-black/50 text-white backdrop-blur-md opacity-0 group-hover/slider:opacity-100 transition-all hover:bg-black/70 hover:scale-110 active:scale-95 z-10 border border-white/10"
          >
            ←
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-3 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-black/50 text-white backdrop-blur-md opacity-0 group-hover/slider:opacity-100 transition-all hover:bg-black/70 hover:scale-110 active:scale-95 z-10 border border-white/10"
          >
            →
          </button>
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10">
            {images.map((_, i) => (
              <div
                key={i}
                className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${i === currentIndex ? "bg-white w-4" : "bg-white/40"
                  }`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export const CardProject = ({
  project,
  locale,
  children,
}: {
  project: project;
  locale: string;
  children: React.ReactNode;
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  // Lock scroll when expanded
  useEffect(() => {
    if (isExpanded) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isExpanded]);

  return (
    <motion.div
      className="relative group"
      animate={{ zIndex: isExpanded ? 50 : 0 }}
      transition={{ zIndex: { delay: isExpanded ? 0 : 0.6 } }}
    >
      {/* Grid State Placeholder */}
      <div className="h-[350px] w-full invisible pointer-events-none" />

      {/* Backdrop */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsExpanded(false)}
            className="fixed inset-0 bg-black/20 backdrop-blur-xs z-[100]"
          />
        )}
      </AnimatePresence>

      {/* Main Card */}
      <motion.div
        layoutId={`card-${project.name}`}
        onClick={!isExpanded ? () => setIsExpanded(true) : undefined}
        animate={{
          zIndex: isExpanded ? 100 : 0
        }}
        transition={{
          layout: { duration: 0.6, ease: [0.23, 1, 0.32, 1] },
          zIndex: { delay: isExpanded ? 0 : 0.6 }
        }}
        className={`
          ${isExpanded
            ? "fixed inset-4 sm:inset-auto sm:left-1/2 sm:top-1/2 sm:-translate-x-1/2 sm:-translate-y-1/2 z-[101] w-auto sm:w-[95vw] max-w-[800px] h-auto sm:h-[90vh] max-h-[850px] cursor-default p-8 pt-12 shadow-sm"
            : "absolute inset-x-0 top-0 h-[350px] cursor-pointer"
          }
          rounded-[2.5rem] flex flex-col overflow-hidden bg-gradient-to-tr from-white via-neutral-100 to-neutral-200/30 dark:border-t hover:border-t-4 border border-zinc-200 hover:border-t-zinc-700 dark:border-zinc-800 dark:hover:border-t-neutral-300 dark:from-zinc-950 dark:via-zinc-900 dark:to-zinc-800
        `}
      >
        {/* Helmet-style Design elements (Decor) */}
        {!isExpanded && (
          <motion.div
            layoutId={`decor-${project.name}`}
            className="absolute inset-0 border border-black/5 dark:border-white/5 rounded-[2.5rem] pointer-events-none m-1"
          />
        )}

        {/* Content Container */}
        <motion.div
          layout
          className={`flex-1 flex flex-col items-center justify-center relative ${isExpanded ? "mb-8 overflow-y-auto custom-scrollbar pr-2" : ""}`}
        >
          <div className={`w-full ${isExpanded ? "space-y-6" : "h-full flex flex-col items-center justify-center"}`}>
            {isExpanded ? (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1, duration: 0.5 }}
                className="w-full space-y-6"
              >
                <ImageSlider images={project.images || [project.image]} />
                <div className="space-y-4">
                  <div className="space-y-2">
                    <h2 className="text-4xl font-black text-white tracking-tight">{project.name}</h2>
                    <div className="flex items-center gap-4 text-zinc-500 font-bold uppercase tracking-widest text-xs">
                      <span>Year {project.date}</span>
                      <span className="w-1 h-1 rounded-full bg-zinc-800" />
                      <span>Interactive Experience</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-[1fr_auto] gap-12 pt-8 border-t border-zinc-900">
                    <div className="space-y-6">
                      <p className="text-zinc-400 text-lg leading-relaxed">
                        {locale === "en" ? project.description : project.descriptionEs}
                      </p>
                    </div>

                    <div className="space-y-6">
                      <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-600">Technologies</h4>
                      <div className="flex flex-wrap gap-2 max-w-[250px]">
                        {project.technologies.map((tech) => (
                          <span
                            key={tech}
                            className="px-4 py-2 bg-zinc-900 text-zinc-300 rounded-xl text-xs font-bold border border-zinc-800"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ) : (
              <div className="relative w-full h-full flex flex-col items-center">
                {/* Main Subject Image (The Helmet vibe) */}
                <div className="flex-1 w-full flex items-center justify-center px-4">
                  <motion.div
                    layoutId={`image-container-${project.image}`}
                    className="relative w-full h-full max-h-[210px] flex items-center justify-center pointer-events-none"
                  >
                    <motion.img
                      layoutId={`image-${project.image}`}
                      src={project.image}
                      alt={project.name}
                      className="w-full h-full rounded-t-3xl object-cover object-left filter drop-shadow-[0_20px_50px_rgba(255,255,255,0.05)] transition-transform group-hover:scale-110 duration-700"
                    />
                  </motion.div>
                </div>

                {/* Collapsed Description Section */}
                <motion.div
                  layoutId={`desc-${project.name}`}
                  className="w-full px-6 pb-2 text-center"
                >
                  <p className="text-zinc-500 text-sm line-clamp-2 leading-relaxed h-11">
                    {locale === "en" ? project.description : project.descriptionEs}
                  </p>
                </motion.div>
              </div>
            )}
          </div>
        </motion.div>

        {/* Footer (Custom Bottom Shape inspired by image) */}
        <motion.div
          layoutId={`footer-${project.name}`}
          className={`mt-auto w-full relative ${isExpanded ? "hidden" : "h-16"}`}
        >
          <div className="absolute inset-0 flex items-center justify-between px-6 pb-4">
            {/* Project Name (Left) */}
            <motion.span
              layoutId={`name-${project.name}`}
              className="font-bold text-primary text-xl capitalize"
            >
              {project.name}
            </motion.span>

            {/* Date Segment (Right) */}
            <motion.div
              layoutId={`date-${project.name}`}
              className="relative"
            >
              <div className="relative flex items-baseline gap-2">
                <span className="text-zinc-400 text-sm font-medium">Year</span>
                <span className="opacity-50 text-xl font-bold">{project.date}</span>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};
