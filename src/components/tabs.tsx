import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

type Tab = {
  title: string;
  value: string;
  content?: string | React.ReactNode | any;
};

export const Tabs = ({
  tabs: propTabs,
  containerClassName,
  activeTabClassName,
  tabClassName,
  contentClassName,
}: {
  tabs: Tab[];
  containerClassName?: string;
  activeTabClassName?: string;
  tabClassName?: string;
  contentClassName?: string;
}) => {
  const [active, setActive] = useState<Tab>(propTabs[0]);

  const [hovering, setHovering] = useState(false);

  return (
    <div
      className={cn(
        "flex flex-col md:flex-row items-start justify-start gap-4 perspective-[1000px] relative max-w-full w-full",
        containerClassName
      )}
    >
      <div
        className={cn(
          "flex flex-row md:flex-col gap-2 mt-4 mb-6 md:mb-0 min-w-[80px] md:min-w-[150px]",
          "max-sm:overflow-x-auto max-sm:scrollbar-white max-sm:pr-2"
        )}
        onMouseEnter={() => setHovering(true)}
        onMouseLeave={() => setHovering(false)}
      >
        {propTabs.map((tab) => (
          <button
            key={tab.title}
            onClick={() => setActive(tab)}
            className={cn(
              "relative px-2 py-2 cursor-pointer text-sm text-left select-none shrink-0",
              tabClassName
            )}
            style={{ transformStyle: "preserve-3d" }}
          >
            {active.value === tab.value && (
              <motion.div
                layoutId="clickedbutton"
                transition={{ type: "spring", bounce: 0.3, duration: 0.6 }}
                className={cn(
                  "absolute inset-0 bg-zinc-200/50 dark:bg-zinc-800 rounded-r-xl border-l-2 border-primary",
                  activeTabClassName
                )}
              />
            )}
            <span
              className={cn(
                "relative block text-zinc-400 dark:hover:text-zinc-200 transition-transform duration-200 hover:translate-x-1.5 truncate max-w-12 md:max-w-full",
                active.value === tab.value &&
                "font-semibold text-primary"
              )}
            >
              {tab.title}
            </span>
          </button>
        ))}
      </div>

      <div className="flex w-full items-center justify-center h-60 md:h-64 lg:h-64 relative">
        <div className={cn("w-full h-full", contentClassName)}>
          <AnimatePresence mode="wait">
            <motion.div
              key={active.value}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="w-full h-full"
            >
              {active.content}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div >
  );
};
