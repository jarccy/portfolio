import { useState, useRef, useLayoutEffect } from "react";
import { motion } from "framer-motion";
import { containerVariants, itemVariants, itemUp } from "@/lib/functions";

type project = {
  name: string;
  date: number;
  image: string;
  images?: string[]; // Support for multiple images
  description: string;
  descriptionEs: string;
  technologies: string[];
};

interface Position {
  top: number;
  left: number;
  width: number;
  height: number;
}

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
    <div className="relative w-full aspect-video rounded-xl overflow-hidden bg-zinc-800 shadow-inner group/slider">
      <img
        src={images[currentIndex]}
        alt={`Project view ${currentIndex + 1}`}
        className="w-full h-full object-cover transition-all duration-500"
      />

      {images.length > 1 && (
        <>
          <button
            onClick={prevSlide}
            className="absolute left-2 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/40 text-white backdrop-blur-sm opacity-0 group-hover/slider:opacity-100 transition-opacity hover:bg-black/60 z-10"
          >
            ←
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/40 text-white backdrop-blur-sm opacity-0 group-hover/slider:opacity-100 transition-opacity hover:bg-black/60 z-10"
          >
            →
          </button>
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5 z-10">
            {images.map((_, i) => (
              <div
                key={i}
                className={`w-1.5 h-1.5 rounded-full transition-all ${i === currentIndex ? "bg-white w-4" : "bg-white/40"
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
  const [isAnimating, setIsAnimating] = useState(false);
  const [buttonPosition, setButtonPosition] = useState<Position | null>(null);
  const buttonRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (buttonRef.current && !isExpanded) {
      const rect = buttonRef.current.getBoundingClientRect();
      setButtonPosition({
        top: rect.top,
        left: rect.left,
        width: rect.width,
        height: rect.height,
      });
    }
  }, [isExpanded]);

  const handleOpen = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isAnimating || !buttonRef.current) return;

    const rect = buttonRef.current.getBoundingClientRect();
    setButtonPosition({
      top: rect.top,
      left: rect.left,
      width: rect.width,
      height: rect.height,
    });

    setIsAnimating(true);
    requestAnimationFrame(() => {
      setIsExpanded(true);
    });
  };

  const handleClose = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setIsExpanded(false);
  };

  const handleTransitionEnd = () => {
    setIsAnimating(false);
  };

  const getModalDimensions = () => {
    if (typeof window === "undefined") return { width: 512, height: 420, left: 0, top: 0 };
    const width = Math.min(window.innerWidth * 0.9, 600);
    const height = Math.min(window.innerHeight * 0.85, 700);
    const left = (window.innerWidth - width) / 2;
    const top = (window.innerHeight - height) / 2;
    return { width, height, left, top };
  };

  const modal = getModalDimensions();

  return (
    <>
      <motion.div
        variants={containerVariants}
        initial="offscreen"
        whileInView="onscreen"
        viewport={{ once: true, amount: 0.2 }}
      >
        <motion.div
          variants={itemVariants}
          className="group h-64 px-3 pt-2 pb-3 rounded-xl transition-all duration-300 hover:scale-105 bg-gradient-to-tr from-white via-neutral-100
            to-neutral-200/30 dark:border-t hover:border-t-4 border border-zinc-200 hover:border-t-zinc-700 dark:border-zinc-800 dark:hover:border-t-neutral-300 dark:from-zinc-950 dark:via-zinc-900 dark:to-zinc-800
            relative flex flex-col justify-between"
        >
          <div className="flex items-center justify-between mb-2">
            <span className="font-semibold capitalize text-primary">{project.name}</span>
            <span className="font-vectra text-xs font-semibold opacity-50 mt-1">
              {project.date}
            </span>
          </div>

          <div className="relative h-full overflow-hidden">{children}</div>

          <motion.div variants={itemUp} className="relative mt-1">
            <div
              ref={buttonRef}
              className="w-full"
            >
              <button
                onClick={handleOpen}
                className="w-full inline-flex items-center justify-center gap-2 px-3 py-1.5 text-xs font-medium rounded-full transition-all duration-300
                text-white dark:text-zinc-900 bg-primary cursor-pointer hover:scale-105 active:scale-95 group/svg"
              >
                {locale === "en" ? "Show more" : "Mostrar más"}
                <svg
                  className="h-3.5 w-3.5 transition-transform duration-500 -translate-x-1 group-hover/svg:translate-x-0.5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M7.5 5.5l5 4.5-5 4.5" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            </div>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Expansion Overlay & Interaction */}
      {buttonPosition && (
        <>
          {/* Backdrop */}
          <div
            className={`fixed inset-0 bg-black/60 backdrop-blur-md transition-opacity duration-500 z-[100] ${isExpanded ? "opacity-100" : "opacity-0 pointer-events-none"
              }`}
            onClick={handleClose}
          />

          {/* Expanded Modal */}
          <div
            onTransitionEnd={handleTransitionEnd}
            className={`
              fixed overflow-hidden z-[101]
              transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)]
              bg-zinc-100 dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100 shadow-2xl
              ${isExpanded ? "cursor-default" : "pointer-events-none"}
            `}
            style={{
              top: isExpanded ? modal.top : buttonPosition.top,
              left: isExpanded ? modal.left : buttonPosition.left,
              width: isExpanded ? modal.width : buttonPosition.width,
              height: isExpanded ? modal.height : buttonPosition.height,
              borderRadius: isExpanded ? 24 : buttonPosition.height / 2,
            }}
          >
            {/* Trigger Copy - Fades out */}
            <div
              className={`
                absolute inset-0 flex items-center justify-center
                transition-all duration-200
                ${isExpanded ? "opacity-0 scale-110 blur-md" : "opacity-100 duration-500 scale-100 blur-none"}
              `}
            >
              <div className="px-6 py-2 bg-primary text-primary-foreground rounded-full font-medium">
                {locale === "en" ? "Show more" : "Mostrar más"}
              </div>
            </div>

            {/* Modal Content - Fades in */}
            <div
              className={`
                absolute inset-0 p-6 flex flex-col gap-6
                transition-all duration-500
                ${isExpanded ? "opacity-100 blur-none scale-100" : "opacity-0 blur-md scale-95 pointer-events-none"}
              `}
            >
              {/* Header */}
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold tracking-tight">{project.name}</h2>
                <button
                  onClick={handleClose}
                  className="p-2 rounded-full hover:bg-zinc-200 dark:hover:bg-zinc-800 transition-colors"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {/* Body (Scrollable) */}
              <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar space-y-6">
                <ImageSlider images={project.images || [project.image]} />

                <div className="space-y-4">
                  <p className="text-zinc-600 dark:text-zinc-400 text-lg leading-relaxed">
                    {locale === "en" ? project.description : project.descriptionEs}
                  </p>

                  <div className="pt-6 border-t border-zinc-200 dark:border-zinc-800">
                    <h3 className="text-sm font-semibold uppercase tracking-wider opacity-60 mb-4">
                      {locale === "en" ? "Technologies" : "Tecnologías"}
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {project.technologies.map((tech) => (
                        <span
                          key={tech}
                          className="px-3 py-1 bg-zinc-200 dark:bg-zinc-800 rounded-full text-sm font-medium"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};
