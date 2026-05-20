import { useEffect, useState } from "react";

type GoTopProps = {
  scrollContainerId?: string;
  showAfter?: number;
};

export default function GoTop({
  scrollContainerId = "app-scroll-container",
  showAfter = 300,
}: GoTopProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const scrollContainer = document.getElementById(scrollContainerId);
    if (!scrollContainer) return;

    let ticking = false;

    const updateVisibility = () => {
      setIsVisible(scrollContainer.scrollTop > showAfter);
      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        window.requestAnimationFrame(updateVisibility);
      }
    };

    onScroll();
    scrollContainer.addEventListener("scroll", onScroll, { passive: true });
    return () => scrollContainer.removeEventListener("scroll", onScroll);
  }, [scrollContainerId, showAfter]);

  const handleClick = () => {
    const scrollContainer = document.getElementById(scrollContainerId);
    if (!scrollContainer) return;
    scrollContainer.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <button
      type="button"
      aria-label="Back to top"
      onClick={handleClick}
      className={`group fixed right-4 cursor-pointer sm:right-6 bottom-4 sm:bottom-6 z-[70] h-8 w-8 sm:h-10 sm:w-10 rounded-full bg-white/0 dark:bg-neutral-900/0 text-neutral-500/45 dark:text-neutral-300/40 shadow-none transition-all duration-300 hover:scale-105 active:scale-95 hover:bg-white/95 dark:hover:bg-neutral-900/80 hover:text-neutral-700 dark:hover:text-neutral-100 hover:shadow-sm ${
        isVisible
          ? "opacity-100 translate-y-0 pointer-events-auto"
          : "opacity-0 translate-y-3 pointer-events-none"
      }`}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="1em"
        height="1em"
        viewBox="0 0 24 24"
        className="mx-auto h-7 w-7 transition-all duration-300 opacity-70 group-hover:opacity-100"
      >
        <path d="M0 0h24v24H0z" fill="none" />
        <path
          fill="currentColor"
          d="M8.53 10.53a.75.75 0 1 1-1.06-1.06l4-4a.75.75 0 0 1 1.06 0l4 4a.75.75 0 1 1-1.06 1.06l-2.72-2.72v9.69a.75.75 0 0 1-1.5 0V7.81z"
        />
      </svg>
    </button>
  );
}
