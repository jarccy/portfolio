import { cn } from "@/lib/utils";
import { useState, useRef, useEffect } from "react";
import ReactDOM from "react-dom";
import { motion, useMotionValue, animate } from "framer-motion";

const languagesData = [
  {
    name: "JavaScript",
    stack: ["Vue, React, Svelte", "Next.js, Nuxt.js", "Nest.js, Prisma"],
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" className="w-4 h-4">
        <path fill="currentColor" d="M400 32H48C21.5 32 0 53.5 0 80v352c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48V80c0-26.5-21.5-48-48-48M243.8 381.4c0 43.6-25.6 63.5-62.9 63.5c-33.7 0-53.2-17.4-63.2-38.5l34.3-20.7c6.6 11.7 12.6 21.6 27.1 21.6c13.8 0 22.6-5.4 22.6-26.5V237.7h42.1zm99.6 63.5c-39.1 0-64.4-18.6-76.7-43l34.3-19.8c9 14.7 20.8 25.6 41.5 25.6c17.4 0 28.6-8.7 28.6-20.8c0-14.4-11.4-19.5-30.7-28l-10.5-4.5c-30.4-12.9-50.5-29.2-50.5-63.5c0-31.6 24.1-55.6 61.6-55.6c26.8 0 46 9.3 59.8 33.7L368 290c-7.2-12.9-15-18-27.1-18c-12.3 0-20.1 7.8-20.1 18c0 12.6 7.8 17.7 25.9 25.6l10.5 4.5c35.8 15.3 55.9 31 55.9 66.2c0 37.8-29.8 58.6-69.7 58.6" />
      </svg>
    ),
  },
  {
    name: "TypeScript",
    stack: ["Vue, React, Svelte", "Next.js, Nuxt.js", "Nest.js, Prisma"],
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="w-4.5 h-4.5" viewBox="0 0 24 24">
        <path fill="currentColor" d="M19.24 3H4.76A1.76 1.76 0 0 0 3 4.76v14.48A1.76 1.76 0 0 0 4.76 21h14.48A1.76 1.76 0 0 0 21 19.24V4.76A1.76 1.76 0 0 0 19.24 3m-5.8 10h-2.25v6.44H9.4V13H7.15v-1.46h6.29zm5.8 5.28a1.7 1.7 0 0 1-.67.74a3 3 0 0 1-1 .39a6 6 0 0 1-1.2.12a7 7 0 0 1-1.23-.11a4.5 4.5 0 0 1-1-.33v-1.71l-.06-.06h.06v.07a3.4 3.4 0 0 0 1 .54a3.1 3.1 0 0 0 1.13.2a2.6 2.6 0 0 0 .6-.06a1.5 1.5 0 0 0 .42-.17a.75.75 0 0 0 .25-.25a.69.69 0 0 0-.06-.74a1.2 1.2 0 0 0-.35-.33a3 3 0 0 0-.53-.3l-.67-.28a3.6 3.6 0 0 1-1.37-1a2 2 0 0 1-.46-1.33a2.16 2.16 0 0 1 .24-1.06a2.1 2.1 0 0 1 .66-.71a2.9 2.9 0 0 1 1-.42a5 5 0 0 1 1.19-.13a7 7 0 0 1 1.09.07a4.5 4.5 0 0 1 .88.23v1.65a2.4 2.4 0 0 0-.42-.24a4 4 0 0 0-.49-.17a3 3 0 0 0-.49-.1a2.5 2.5 0 0 0-.46 0a2.3 2.3 0 0 0-.56.06a1.5 1.5 0 0 0-.43.16a.8.8 0 0 0-.26.25a.63.63 0 0 0-.09.33a.6.6 0 0 0 .1.35a1.2 1.2 0 0 0 .3.29a2.2 2.2 0 0 0 .46.28l.63.28a7 7 0 0 1 .84.42a2.7 2.7 0 0 1 .64.49a1.8 1.8 0 0 1 .42.63a2.5 2.5 0 0 1 .14.85a2.7 2.7 0 0 1-.25 1.08z" />
      </svg>
    ),
  },
  {
    name: "Python",
    stack: ["Django", "Django REST", "FastAPI"],
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="w-4.5 h-4.5" viewBox="0 0 24 24">
        <path fill="currentColor" d="M9.585 11.692h4.328s2.432.039 2.432-2.35V5.391S16.714 3 11.936 3C7.362 3 7.647 4.983 7.647 4.983l.006 2.055h4.363v.617H5.92s-2.927-.332-2.927 4.282s2.555 4.45 2.555 4.45h1.524v-2.141s-.083-2.554 2.513-2.554m-.056-5.74a.784.784 0 1 1 0-1.57a.784.784 0 1 1 0 1.57" />
        <path fill="currentColor" d="M18.452 7.532h-1.524v2.141s.083 2.554-2.513 2.554h-4.328s-2.432-.04-2.432 2.35v3.951s-.369 2.391 4.409 2.391c4.573 0 4.288-1.983 4.288-1.983l-.006-2.054h-4.363v-.617h6.097s2.927.332 2.927-4.282s-2.555-4.451-2.555-4.451m-3.981 10.436a.784.784 0 1 1 0 1.57a.784.784 0 1 1 0-1.57" />
      </svg>
    ),
  },
  {
    name: "",
    stack: ["Gin", "Gorm", "Chanels"],
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="w-7 h-7" viewBox="0 0 24 24">
        <path fill="currentColor" d="M1.811 10.231c-.047 0-.058-.023-.035-.059l.246-.315c.023-.035.081-.058.128-.058h4.172c.046 0 .058.035.035.07l-.199.303c-.023.036-.082.07-.117.07zM.047 11.306c-.047 0-.059-.023-.035-.058l.245-.316c.023-.035.082-.058.129-.058h5.328c.047 0 .07.035.058.07l-.093.28c-.012.047-.058.07-.105.07zm2.828 1.075c-.047 0-.059-.035-.035-.07l.163-.292c.023-.035.07-.07.117-.07h2.337c.047 0 .07.035.07.082l-.023.28c0 .047-.047.082-.082.082zm12.129-2.36c-.736.187-1.239.327-1.963.514c-.176.046-.187.058-.34-.117c-.174-.199-.303-.327-.548-.444c-.737-.362-1.45-.257-2.115.175c-.795.514-1.204 1.274-1.192 2.22c.011.935.654 1.706 1.577 1.835c.795.105 1.46-.175 1.987-.77c.105-.13.198-.27.315-.434H10.47c-.245 0-.304-.152-.222-.35c.152-.362.432-.97.596-1.274a.32.32 0 0 1 .292-.187h4.253c-.023.316-.023.631-.07.947a5 5 0 0 1-.958 2.29c-.841 1.11-1.94 1.8-3.33 1.986c-1.145.152-2.209-.07-3.143-.77c-.865-.655-1.356-1.52-1.484-2.595c-.152-1.274.222-2.419.993-3.424c.83-1.086 1.928-1.776 3.272-2.02c1.098-.2 2.15-.07 3.096.571c.62.41 1.063.97 1.356 1.648c.07.105.023.164-.117.2m3.868 6.461c-1.064-.024-2.034-.328-2.852-1.029a3.67 3.67 0 0 1-1.262-2.255c-.21-1.32.152-2.489.947-3.529c.853-1.122 1.881-1.706 3.272-1.95c1.192-.21 2.314-.095 3.33.595c.923.63 1.496 1.484 1.648 2.605c.198 1.578-.257 2.863-1.344 3.962c-.771.783-1.718 1.273-2.805 1.495c-.315.06-.63.07-.934.106m2.78-4.72c-.011-.153-.011-.27-.034-.387c-.21-1.157-1.274-1.81-2.384-1.554c-1.087.245-1.788.935-2.045 2.033c-.21.912.234 1.835 1.075 2.21c.643.28 1.285.244 1.905-.07c.923-.48 1.425-1.228 1.484-2.233z" />
      </svg>
    ),
  },
  {
    name: "SQL",
    stack: ["SQL Server", "PostgreSQL", "MySQL"],
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" viewBox="0 0 24 24">
        <path fill="currentColor" d="M12 9.828c4.17 0 7.549-1.528 7.549-3.414C19.549 4.53 16.169 3 12 3S4.452 4.529 4.452 6.414S7.832 9.828 12 9.828" />
        <path fill="currentColor" d="M4.452 7.964v2.172c0 1.887 3.379 3.414 7.548 3.414s7.549-1.527 7.549-3.414V7.97h-.03c-.348 1.736-3.582 3.1-7.519 3.1S4.83 9.707 4.48 7.965z" />
        <path fill="currentColor" d="M4.452 11.692v2.172c0 1.881 3.379 3.414 7.548 3.414s7.549-1.533 7.549-3.414v-2.172h-.03c-.348 1.742-3.582 3.101-7.519 3.101s-7.17-1.364-7.52-3.1z" />
        <path fill="currentColor" d="M4.452 15.414v2.172C4.452 19.473 7.83 21 12 21s7.549-1.527 7.549-3.414v-2.172h-.03c-.348 1.742-3.582 3.1-7.519 3.1s-7.17-1.358-7.52-3.1z" />
      </svg>
    ),
  },
  {
    name: "Tailwind CSS",
    stack: ["Tailwind UI", "Tailwind Merge", "Tailwind Utils"],
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24">
        <path fill="currentColor" d="M12 6c-2.67 0-4.33 1.33-5 4c1-1.33 2.17-1.83 3.5-1.5c.76.19 1.31.74 1.91 1.35c.98 1 2.09 2.15 4.59 2.15c2.67 0 4.33-1.33 5-4c-1 1.33-2.17 1.83-3.5 1.5c-.76-.19-1.3-.74-1.91-1.35C15.61 7.15 14.5 6 12 6m-5 6c-2.67 0-4.33 1.33-5 4c1-1.33 2.17-1.83 3.5-1.5c.76.19 1.3.74 1.91 1.35C8.39 16.85 9.5 18 12 18c2.67 0 4.33-1.33 5-4c-1 1.33-2.17 1.83-3.5 1.5c-.76-.19-1.3-.74-1.91-1.35C10.61 13.15 9.5 12 7 12" />
      </svg>
    ),
  },
];

interface TooltipParams {
  text: string;
  position: { top: number; left: number };
  stacks: string[];
  isVisible: boolean;
}

const Tooltip = ({ text, position, stacks, isVisible }: TooltipParams) => {
  if (!isVisible) return null;

  return ReactDOM.createPortal(
    <div
      className="fixed z-30 transition-all duration-300 pointer-events-none flex justify-center w-full px-4 md:px-0 md:w-auto"
      style={{
        top: position.top,
        left: typeof window !== "undefined" && window.innerWidth < 768 ? 0 : position.left,
        transform: typeof window !== "undefined" && window.innerWidth < 768 ? "none" : "translateX(-50%)",
      }}
    >
      <div className="hidden md:block absolute -top-2 left-1/2 -translate-x-1/2 w-0 h-0 border-l-8 border-r-8 border-b-8 border-l-transparent border-r-transparent border-b-white dark:border-b-zinc-800/80" />

      <div className="text-xs rounded-2xl py-2 px-3 w-full md:w-[180px] md:h-[80px] shadow-lg bg-white dark:bg-zinc-900">
        <div className="flex flex-col">
          <strong className="dark:text-white text-zinc-900">Stack in {text || "GO"}:</strong>

          <ul className="list-disc pl-5">
            {stacks.map((item) => (
              <li key={item} className="text-zinc-700 dark:text-zinc-200">
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>,
    document.body
  );
};

export default function Languages() {
  const [tooltip, setTooltip] = useState({
    show: false,
    text: "",
    position: { top: 0, left: 0 },
    stacks: [] as string[],
  });

  const [isPaused, setIsPaused] = useState(false);
  const x = useMotionValue("0%");
  const controlsRef = useRef<any>(null);

  const duplicatedLanguages = [...languagesData, ...languagesData];

  useEffect(() => {
    controlsRef.current = animate(x, ["0%", "-50%"], {
      duration: 25,
      ease: "linear",
      repeat: Infinity,
      repeatType: "loop",
    });

    return () => controlsRef.current?.stop();
  }, [x]);

  useEffect(() => {
    if (isPaused) {
      controlsRef.current?.pause();
    } else {
      controlsRef.current?.play();
    }
  }, [isPaused]);

  const handleInteraction = (item: (typeof languagesData)[0], event: React.MouseEvent | React.TouchEvent) => {
    const rect = (event.currentTarget as HTMLElement).getBoundingClientRect();
    setTooltip({
      show: true,
      text: item.name,
      stacks: item.stack,
      position: { top: rect.bottom + 12, left: rect.left + rect.width / 2 },
    });
  };

  const clearTooltip = () => {
    setTooltip((prev) => ({ ...prev, show: false }));
  };

  return (
    <div
      className={cn(
        "relative z-20 w-screen -translate-x-1/2 left-1/2 md:left-auto md:translate-x-0 md:w-full md:max-w-2xl md:mx-auto overflow-hidden mt-10 px-6 md:px-0",
        "mask-[linear-gradient(to_right,transparent,white_15%,white_85%,transparent)]"
      )}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => {
        setIsPaused(false);
        clearTooltip();
      }}
      onTouchStart={() => setIsPaused(true)}
      onClick={(e) => {
        if (e.target === e.currentTarget) clearTooltip();
      }}
    >
      <motion.div className="flex gap-8 md:gap-8 items-center w-max px-4" style={{ x }}>
        {duplicatedLanguages.map((item, idx) => (
          <div
            key={`${item.name}-${idx}`}
            onMouseEnter={(e) => handleInteraction(item, e)}
            onClick={(e) => handleInteraction(item, e)}
            className="flex items-center gap-2 cursor-pointer select-none group transition-all duration-300 hover:scale-105"
          >
            <div className="text-zinc-500 dark:text-zinc-400 group-hover:text-zinc-900 dark:group-hover:text-zinc-100">
              {item.icon}
            </div>
            <span className="text-sm font-medium text-zinc-600 dark:text-zinc-300 group-hover:text-zinc-900 dark:group-hover:text-zinc-100">
              {item.name}
            </span>
          </div>
        ))}
      </motion.div>

      <Tooltip
        isVisible={tooltip.show}
        text={tooltip.text}
        position={tooltip.position}
        stacks={tooltip.stacks}
      />
    </div>
  );
}
