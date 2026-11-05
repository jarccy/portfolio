<script lang="ts">
  import { onMount } from "svelte";
  import { Tween } from "svelte/motion";
  import { cubicInOut } from "svelte/easing";

  const words = ["Hello", "Bonjour", "Ciao", "Olà", "やあ", "Hallå", "Привет", "안녕하세요"];

  // cubic-bezier(0.76, 0, 0.24, 1)
  const EASE = "cubic-bezier(0.76, 0, 0.24, 1)";

  interface PreloaderProps {
    onComplete?: () => void;
  }

  let { onComplete }: PreloaderProps = $props();

  let index = $state(0);
  let dimension = $state({ width: 0, height: 0 });
  let isExiting = $state(false);
  let textVisible = $state(false);

  // Extra depth of the bottom curve: 300 (initial) -> 0 (exit)
  const curveDepth = new Tween(300, { duration: 700, easing: cubicInOut });

  onMount(() => {
    dimension = { width: window.innerWidth, height: window.innerHeight };
    requestAnimationFrame(() => (textVisible = true));
  });

  $effect(() => {
    if (index === words.length - 1) {
      const exitTimer = setTimeout(() => {
        isExiting = true;
      }, 1000);
      return () => clearTimeout(exitTimer);
    }

    const timer = setTimeout(
      () => {
        index = index + 1;
      },
      index === 0 ? 700 : 150,
    );

    return () => clearTimeout(timer);
  });

  $effect(() => {
    if (isExiting) curveDepth.set(0, { delay: 300 });
  });

  const path = $derived(
    `M0 0 L${dimension.width} 0 L${dimension.width} ${dimension.height} Q${dimension.width / 2} ${dimension.height + curveDepth.current} 0 ${dimension.height} L0 0`,
  );

  const handleTransitionEnd = (e: TransitionEvent) => {
    if (e.target === e.currentTarget && e.propertyName === "top" && isExiting) {
      onComplete?.();
    }
  };
</script>

<div
  ontransitionend={handleTransitionEnd}
  class="fixed inset-0 w-screen h-screen flex items-center justify-center bg-neutral-50 dark:bg-neutral-950 z-[100] overflow-hidden"
  style="top: {isExiting ? '-100vh' : '0'}; transition: top 0.5s {EASE};"
>
  {#if dimension.width > 0}
    <p
      class="flex items-center text-neutral-900 dark:text-white text-4xl md:text-5xl lg:text-6xl absolute z-10 font-medium"
      style="opacity: {textVisible ? 0.75 : 0}; transition: opacity 1s cubic-bezier(0.42, 0, 0.58, 1);"
    >
      {words[index]}
    </p>
    <svg class="absolute top-0 w-full h-[calc(100%+300px)]">
      <path d={path} class="fill-neutral-50 dark:fill-neutral-950" />
    </svg>
  {/if}
</div>
