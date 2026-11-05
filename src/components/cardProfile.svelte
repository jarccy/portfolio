<script lang="ts">
  import type { Snippet } from "svelte";
  import { onMount } from "svelte";
  import { Spring, Tween } from "svelte/motion";
  import { cn } from "@/lib/utils";

  let {
    rotateDepth = 17.5,
    translateDepth = 20,
    class: className,
    children,
  }: {
    rotateDepth?: number;
    translateDepth?: number;
    class?: string;
    children: Snippet;
  } = $props();

  let ref: HTMLDivElement;
  let isMobile = $state(false);
  let mounted = $state(false);

  onMount(() => {
    isMobile = window.innerWidth < 768;
    requestAnimationFrame(() => (mounted = true));
  });

  // Mouse position relative to the card, normalized to [-0.5, 0.5]
  const mouseX = new Spring(0, { stiffness: 0.1, damping: 0.35 });
  const mouseY = new Spring(0, { stiffness: 0.1, damping: 0.35 });

  // whileHover={{ scale: 1.05, z: 50 }}
  const hoverScale = new Tween(1, { duration: 200 });
  const hoverZ = new Tween(0, { duration: 200 });

  // useTransform([-0.5, 0.5] -> [a, b])
  const map = (v: number, a: number, b: number) => a + (v + 0.5) * (b - a);

  const transform = $derived.by(() => {
    if (isMobile) return "none";
    const rotateX = map(mouseY.current, -rotateDepth, rotateDepth);
    const rotateY = map(mouseX.current, rotateDepth, -rotateDepth);
    const translateX = map(mouseX.current, -translateDepth, translateDepth);
    const translateY = map(mouseY.current, translateDepth, -translateDepth);
    return `translateX(${translateX}px) translateY(${translateY}px) translateZ(${hoverZ.current}px) scale(${hoverScale.current}) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
  });

  const glareBackground = $derived.by(() => {
    const glareX = map(mouseX.current, 0, 100);
    const glareY = map(mouseY.current, 0, 100);
    return `radial-gradient(circle at ${glareX}% ${glareY}%, rgba(255,255,255,0.9) 10%, rgba(255,255,255,0.75) 20%, rgba(255,255,255,0) 80%)`;
  });

  const handleMouseMove = (e: MouseEvent) => {
    if (isMobile || !ref) return;
    const rect = ref.getBoundingClientRect();
    mouseX.target = (e.clientX - rect.left) / rect.width - 0.5;
    mouseY.target = (e.clientY - rect.top) / rect.height - 0.5;
  };

  const handleMouseEnter = () => {
    if (isMobile) return;
    hoverScale.target = 1.05;
    hoverZ.target = 50;
  };

  const handleMouseLeave = () => {
    if (isMobile) return;
    mouseX.target = 0;
    mouseY.target = 0;
    hoverScale.target = 1;
    hoverZ.target = 0;
  };
</script>

<div class={cn("perspective-distant transform-3d", className)}>
  <div
    bind:this={ref}
    role="presentation"
    onmousemove={handleMouseMove}
    onmouseenter={handleMouseEnter}
    onmouseleave={handleMouseLeave}
    style="transform: {transform}; opacity: {mounted ? 1 : 0}; transition: opacity 0.3s ease-out;"
    class="relative rounded-2xl shadow-2xl"
  >
    {@render children()}
    <div
      class="pointer-events-none absolute inset-0 z-50 h-full w-full rounded-[16px] mix-blend-overlay"
      style="background: {isMobile ? 'none' : glareBackground}; opacity: {isMobile ? 0 : 0.6};"
    ></div>
  </div>
</div>
