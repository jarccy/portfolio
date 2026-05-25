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
      <img
        key={currentIndex}
        src={images[currentIndex]}
        alt={`Project view ${currentIndex + 1}`}
        loading="lazy"
        decoding="async"
        className="w-full h-full object-cover"
      />

      {images.length > 1 && (
        <>
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/40 opacity-0 group-hover/slider:opacity-100 transition-opacity duration-300 pointer-events-none" />
          <button
            onClick={prevSlide}
            className="absolute left-3 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-black/50 text-white opacity-0 group-hover/slider:opacity-100 transition-all hover:bg-black/70 hover:scale-110 active:scale-95 z-10 border border-white/10"
          >
            ←
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-3 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-black/50 text-white opacity-0 group-hover/slider:opacity-100 transition-all hover:bg-black/70 hover:scale-110 active:scale-95 z-10 border border-white/10"
          >
            →
          </button>
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10">
            {images.map((_, i) => (
              <div
                key={i}
                className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                  i === currentIndex ? "bg-white w-4" : "bg-white/40"
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
  projectId,
  locale,
  children,
}: {
  project: project;
  projectId: string;
  locale: string;
  children: React.ReactNode;
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const cardLayoutId = `project-card-${projectId}`;

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
    <div className="relative group">
      <div className="h-[350px] w-full invisible pointer-events-none" />

      {!isExpanded && (
        <motion.button
          layoutId={cardLayoutId}
          type="button"
          onClick={() => setIsExpanded(true)}
          transition={{
            layout: { duration: 0.4, ease: [0.22, 0.61, 0.36, 1] },
          }}
          className="absolute inset-0 h-[350px] w-full cursor-pointer rounded-[2.5rem] flex flex-col overflow-hidden bg-gradient-to-tr from-white via-neutral-100 to-neutral-200/30 dark:border-t border border-neutral-200 dark:border-neutral-800 dark:from-neutral-950 dark:via-neutral-900 dark:to-neutral-800 text-left transform-gpu [contain:layout_paint_style]"
        >
          <div className="absolute inset-0 border border-black/5 dark:border-white/5 rounded-[2.5rem] pointer-events-none m-1" />

          <div className="relative w-full h-full flex flex-col items-center">
            <div className="flex-1 w-full flex items-center justify-center px-4 pointer-events-none">
              <div className="relative w-full h-full max-h-[210px] flex items-center justify-center">
                {children}
              </div>
            </div>

            <div className="w-full px-6 pb-2 text-center">
              <p className="text-neutral-500 text-sm line-clamp-2 leading-relaxed h-11">
                {locale === "en" ? project.description : project.descriptionEs}
              </p>
            </div>
          </div>

          <div className="mt-auto w-full border-t border-neutral-200/70 dark:border-neutral-800/80">
            <div className="flex items-center justify-between px-6 py-3">
              <span className="font-medium text-sm capitalize text-primary">
                {project.name}
              </span>
              <div className="text-xs text-neutral-400 dark:text-neutral-500">
                {project.date}
              </div>
            </div>
          </div>
        </motion.button>
      )}

      <AnimatePresence mode="wait">
        {isExpanded && (
          <motion.div
            className="fixed inset-0 flex items-center justify-center z-[120] px-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.22, ease: "easeOut" }}
          >
            <button
              type="button"
              onClick={() => setIsExpanded(false)}
              className="absolute inset-0 bg-black/40 dark:bg-black/30"
              aria-label={locale === "en" ? "Close modal" : "Cerrar modal"}
            />

            <motion.div
              layoutId={cardLayoutId}
              initial={{ opacity: 0.95 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0.95 }}
              transition={{
                layout: { duration: 0.4, ease: [0.22, 0.61, 0.36, 1] },
                opacity: { duration: 0.16 },
              }}
              className="w-full max-w-[720px] max-h-[90vh] bg-white dark:bg-neutral-900 rounded-[40px] p-8 shadow-sm border border-gray-200 dark:border-stone-800 relative z-10 overflow-y-auto custom-scrollbar transform-gpu [contain:layout_paint_style]"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="mb-6 text-center">
                <h3 className="text-neutral-400 dark:text-neutral-500 text-[10px] font-black uppercase tracking-[0.2em]">
                  {locale === "en"
                    ? "Project Details"
                    : "Detalles del Proyecto"}
                </h3>
                <h2 className="mt-2 text-2xl sm:text-3xl font-black capitalize">
                  {project.name}
                </h2>
              </div>

              <div className="mb-8">
                <ImageSlider images={project.images || [project.image]} />
              </div>

              <p className="text-sm sm:text-base text-neutral-600 dark:text-neutral-400 leading-relaxed mb-8">
                {locale === "en" ? project.description : project.descriptionEs}
              </p>

              <div className="space-y-5 max-h-[200px] overflow-y-auto pr-2 custom-scrollbar">
                {project.technologies.map((tech, idx) => (
                  <div key={tech}>
                    <div className="flex items-center justify-between py-1 group transition-all duration-300">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-xl flex items-center justify-center shadow-sm dark:shadow-lg shrink-0 bg-neutral-100 dark:bg-neutral-800/80">
                          <span className="text-xs font-black text-neutral-500">
                            {(idx + 1).toString().padStart(2, "0")}
                          </span>
                        </div>
                        <div>
                          <h4 className="text-sm font-semibold text-foreground">
                            {tech}
                          </h4>
                          <p className="text-[10px] text-neutral-400 dark:text-neutral-500 font-medium">
                            {locale === "en" ? "Technology" : "Tecnologia"}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <span className="text-xs font-bold text-foreground/70">
                          #{idx + 1}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6 pt-4 border-t border-neutral-200 dark:border-neutral-800 flex justify-end">
                <button
                  type="button"
                  onClick={() => setIsExpanded(false)}
                  className="text-sm font-medium text-neutral-500 dark:text-neutral-400 hover:text-neutral-800 dark:hover:text-neutral-200 transition-colors"
                >
                  {locale === "en" ? "Close" : "Cerrar"}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
