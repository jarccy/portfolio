<script lang="ts" module>
  export type Tab = {
    title: string;
    value: string;
    content?: any;
  };
</script>

<script lang="ts">
  import type { Snippet } from "svelte";
  import { crossfade, fly } from "svelte/transition";
  import { cn } from "@/lib/utils";

  let {
    tabs: propTabs,
    containerClassName,
    activeTabClassName,
    tabClassName,
    contentClassName,
    renderContent,
  }: {
    tabs: Tab[];
    containerClassName?: string;
    activeTabClassName?: string;
    tabClassName?: string;
    contentClassName?: string;
    /** Renders the content of the active tab. Falls back to `tab.content` as text. */
    renderContent?: Snippet<[Tab]>;
  } = $props();

  // svelte-ignore state_referenced_locally
  let active = $state<Tab>(propTabs[0]);

  // Mild overshoot, similar to `{ type: "spring", bounce: 0.22, duration: 0.5 }`.
  const softBackOut = (t: number) => {
    const s = 0.8;
    const p = t - 1;
    return p * p * ((s + 1) * p + s) + 1;
  };

  // Shared-element transition for the active indicator (replaces `layoutId="clickedbutton"`).
  const [send, receive] = crossfade({ duration: 500, easing: softBackOut });

  // Replaces framer-motion hover/focus animation controls.
  function hoverMotion(node: HTMLElement) {
    const animateIn = () => {
      node.animate(
        { transform: "translateX(7px) scale(1.006)" },
        { duration: 350, easing: "cubic-bezier(0.34, 1.56, 0.64, 1)", fill: "forwards" },
      );
    };

    const animateOut = () => {
      node.animate(
        [
          { transform: "translateX(6px) scale(1.006)", offset: 0 },
          { transform: "translateX(-3px) scale(0.996)", offset: 0.42 },
          { transform: "translateX(1.25px) scale(1.002)", offset: 0.72 },
          { transform: "translateX(0px) scale(1)", offset: 1 },
        ],
        { duration: 560, easing: "ease-out", fill: "forwards" },
      );
    };

    node.addEventListener("mouseenter", animateIn);
    node.addEventListener("mouseleave", animateOut);
    node.addEventListener("focus", animateIn);
    node.addEventListener("blur", animateOut);

    return {
      destroy() {
        node.removeEventListener("mouseenter", animateIn);
        node.removeEventListener("mouseleave", animateOut);
        node.removeEventListener("focus", animateIn);
        node.removeEventListener("blur", animateOut);
      },
    };
  }
</script>

<div
  class={cn(
    "flex flex-col md:flex-row items-start justify-start gap-4 perspective-[1000px] relative max-w-full w-full",
    containerClassName,
  )}
>
  <div
    class={cn(
      "flex flex-row md:flex-col mt-4 mb-6 md:mb-0 min-w-[80px] md:min-w-[150px]",
      "max-sm:overflow-x-auto max-sm:scrollbar-white max-sm:pr-2",
    )}
  >
    {#each propTabs as tab (tab.title)}
      {@const isActive = active.value === tab.value}
      <button
        use:hoverMotion
        onclick={() => (active = tab)}
        class={cn(
          "relative px-3 py-3 cursor-pointer text-sm text-left select-none shrink-0 transform-gpu active:scale-[0.985]",
          tabClassName,
        )}
        style="transform-style: preserve-3d;"
      >
        {#if isActive}
          <div
            in:receive={{ key: "clickedbutton" }}
            out:send={{ key: "clickedbutton" }}
            class={cn(
              "absolute inset-[3px] pointer-events-none bg-neutral-200/50 dark:bg-neutral-800 rounded-r-xl border-l-2 border-primary",
              activeTabClassName,
            )}
          ></div>
        {/if}
        <span
          class={cn(
            "relative block cursor-pointer truncate max-w-12 md:max-w-full text-neutral-500 dark:text-neutral-300 transition-colors duration-200 hover:text-neutral-700 dark:hover:text-neutral-100",
            isActive && "font-semibold text-primary",
          )}
        >
          {tab.title}
        </span>
      </button>
    {/each}
  </div>

  <div class="flex w-full items-center justify-center h-60 md:h-64 lg:h-64 relative">
    <div class={cn("w-full h-full relative", contentClassName)}>
      {#key active.value}
        <div
          in:fly={{ y: 10, duration: 200, delay: 200 }}
          out:fly={{ y: -10, duration: 200 }}
          class="absolute inset-0 w-full h-full"
        >
          {#if renderContent}
            {@render renderContent(active)}
          {:else}
            {active.content}
          {/if}
        </div>
      {/key}
    </div>
  </div>
</div>
