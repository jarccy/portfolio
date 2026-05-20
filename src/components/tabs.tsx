import { useState } from "react";
import { motion, AnimatePresence, useAnimationControls } from "framer-motion";
import { cn } from "@/lib/utils";

type Tab = {
  title: string;
  value: string;
  content?: string | React.ReactNode | any;
};

type TabTriggerProps = {
  tab: Tab;
  isActive: boolean;
  onSelect: (tab: Tab) => void;
  activeTabClassName?: string;
  tabClassName?: string;
};

const TabTrigger = ({
  tab,
  isActive,
  onSelect,
  activeTabClassName,
  tabClassName,
}: TabTriggerProps) => {
  const controls = useAnimationControls();

  const animateIn = () => {
    controls.start({
      x: 7,
      scale: 1.006,
      transition: { type: "spring", stiffness: 520, damping: 28, mass: 0.62 },
    });
  };

  const animateOut = () => {
    controls.start({
      x: [6, -3, 1.25, 0],
      scale: [1.006, 0.996, 1.002, 1],
      transition: {
        duration: 0.56,
        times: [0, 0.42, 0.72, 1],
        ease: "easeOut",
      },
    });
  };

  return (
    <motion.button
      key={tab.title}
      animate={controls}
      initial={{ x: 0, scale: 1 }}
      onClick={() => onSelect(tab)}
      onHoverStart={animateIn}
      onHoverEnd={animateOut}
      onFocus={animateIn}
      onBlur={animateOut}
      whileTap={{ scale: 0.985 }}
      className={cn(
        "relative px-3 py-3 cursor-pointer text-sm text-left select-none shrink-0 transform-gpu",
        tabClassName,
      )}
      style={{ transformStyle: "preserve-3d" }}
    >
      {isActive && (
        <motion.div
          layoutId="clickedbutton"
          transition={{ type: "spring", bounce: 0.22, duration: 0.5 }}
          className={cn(
            "absolute inset-[3px] pointer-events-none bg-neutral-200/50 dark:bg-neutral-800 rounded-r-xl border-l-2 border-primary",
            activeTabClassName,
          )}
        />
      )}
      <span
        className={cn(
          "relative block cursor-pointer truncate max-w-12 md:max-w-full text-neutral-500 dark:text-neutral-300 transition-colors duration-200 hover:text-neutral-700 dark:hover:text-neutral-100",
          isActive && "font-semibold text-primary",
        )}
      >
        {tab.title}
      </span>
    </motion.button>
  );
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

  return (
    <div
      className={cn(
        "flex flex-col md:flex-row items-start justify-start gap-4 perspective-[1000px] relative max-w-full w-full",
        containerClassName,
      )}
    >
      <div
        className={cn(
          "flex flex-row md:flex-col mt-4 mb-6 md:mb-0 min-w-[80px] md:min-w-[150px]",
          "max-sm:overflow-x-auto max-sm:scrollbar-white max-sm:pr-2",
        )}
      >
        {propTabs.map((tab) => (
          <TabTrigger
            key={tab.title}
            tab={tab}
            isActive={active.value === tab.value}
            onSelect={setActive}
            activeTabClassName={activeTabClassName}
            tabClassName={tabClassName}
          />
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
    </div>
  );
};
