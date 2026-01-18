import { useState } from "react";
import { motion } from "framer-motion";
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
  const [tabs, setTabs] = useState<Tab[]>(propTabs);

  const moveSelectedTabToTop = (idx: number) => {
    const newTabs = [...propTabs];
    const selectedTab = newTabs.splice(idx, 1);
    newTabs.unshift(selectedTab[0]);
    setTabs(newTabs);
    setActive(newTabs[0]);
  };

  const [hovering, setHovering] = useState(false);

  return (
    <div
      className={cn(
        "flex flex-col md:flex-row items-start justify-start gap-4 [perspective:1000px] relative max-w-full w-full",
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
        {propTabs.map((tab, idx) => (
          <button
            key={tab.title}
            onClick={() => moveSelectedTabToTop(idx)}
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
                  "absolute inset-0 bg-zinc-200/50 dark:bg-zinc-800 rounded-r-xl border-l-2 border-zinc-700 dark:border-zinc-200",
                  activeTabClassName
                )}
              />
            )}
            <span
              className={cn(
                "relative block text-zinc-400 hover:text-zinc-600 dark:text-zinc-400 dark:hover:text-zinc-200 transition-transform duration-200 hover:translate-x-1.5 truncate max-w-12 md:max-w-full",
                active.value === tab.value &&
                "font-semibold text-zinc-700 dark:text-zinc-200"
              )}
            >
              {tab.title}
            </span>
          </button>
        ))}
      </div>

      <div className="flex w-full items-center justify-center h-60 md:h-64 lg:h-64 relative">
        <FadeInDiv
          tabs={tabs}
          active={active}
          key={active.value}
          hovering={hovering}
          className={cn("w-full", contentClassName)}
        />
      </div>
    </div>
  );
};

export const FadeInDiv = ({
  className,
  tabs,
  hovering,
}: {
  className?: string;
  key?: string;
  tabs: Tab[];
  active: Tab;
  hovering?: boolean;
}) => {
  const isActive = (tab: Tab) => {
    return tab.value === tabs[0].value;
  };
  return (
    <div className="relative w-full h-full">
      {tabs.map((tab, idx) => (
        <motion.div
          key={tab.value}
          layoutId={tab.value}
          style={{
            scale: 1 - idx * 0.1,
            top: hovering ? idx * -27 : 0,
            zIndex: -idx,
            opacity: idx < 3 ? 1 - idx * 0.1 : 0,
          }}
          animate={{
            y: isActive(tab) ? [0, 40, 0] : 0,
          }}
          className={cn(
            "w-full h-full absolute top-0 left-0",
            className,
            hovering &&
            "border-t-2 border-zinc-700 dark:border-t-zinc-200 rounded-2xl"
          )}
        >
          {tab.content}
        </motion.div>
      ))}
    </div>
  );
};
