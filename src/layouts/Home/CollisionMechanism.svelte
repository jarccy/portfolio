<script lang="ts">
  import { fade } from "svelte/transition";
  import { cubicOut } from "svelte/easing";
  import { cn } from "@/lib/utils";

  type BeamOptions = {
    initialX?: number;
    translateX?: number;
    initialY?: number;
    translateY?: number;
    rotate?: number;
    className?: string;
    duration?: number;
    delay?: number;
    repeatDelay?: number;
  };

  let {
    parentRef,
    containerRef,
    beamOptions = {},
  }: {
    containerRef: HTMLDivElement | null;
    parentRef: HTMLDivElement | null;
    beamOptions?: BeamOptions;
  } = $props();

  let beamRef = $state<HTMLDivElement | null>(null);
  let collision = $state<{ detected: boolean; coordinates: { x: number; y: number } | null }>({
    detected: false,
    coordinates: null,
  });
  let beamKey = $state(0);
  let cycleCollisionDetected = false;

  // Falling beam: translateY from -200px to 1800px, linear, infinite, with delay and repeatDelay.
  function beamAnimation(node: HTMLElement, options: BeamOptions) {
    const toPx = (v: number | string | undefined, fallback: string) =>
      v === undefined || v === 0 ? fallback : typeof v === "number" ? `${v}px` : v;

    const fromX = toPx(options.initialX, "0px");
    const toX = toPx(options.translateX, "0px");
    const fromY = toPx(options.initialY, "-200px");
    const toY = toPx(options.translateY, "1800px");
    const rotate = `${options.rotate || 0}deg`;

    const duration = (options.duration || 8) * 1000;
    const repeatDelay = (options.repeatDelay || 0) * 1000;
    const total = duration + repeatDelay;

    const animation = node.animate(
      [
        { transform: `translateX(${fromX}) translateY(${fromY}) rotate(${rotate})`, offset: 0 },
        { transform: `translateX(${toX}) translateY(${toY}) rotate(${rotate})`, offset: duration / total },
        { transform: `translateX(${toX}) translateY(${toY}) rotate(${rotate})`, offset: 1 },
      ],
      {
        duration: total,
        delay: (options.delay || 0) * 1000,
        iterations: Infinity,
        easing: "linear",
        fill: "both",
      },
    );

    return {
      destroy() {
        animation.cancel();
      },
    };
  }

  $effect(() => {
    let requestId: number;

    const checkCollision = () => {
      if (beamRef && containerRef && parentRef && !cycleCollisionDetected) {
        const beamRect = beamRef.getBoundingClientRect();
        const containerRect = containerRef.getBoundingClientRect();

        if (beamRect.bottom >= containerRect.top) {
          const parentRect = parentRef.getBoundingClientRect();
          const relativeX = beamRect.left - parentRect.left + beamRect.width / 2;
          const relativeY = beamRect.bottom - parentRect.top;

          collision = {
            detected: true,
            coordinates: { x: relativeX, y: relativeY },
          };
          cycleCollisionDetected = true;

          setTimeout(() => {
            collision = { detected: false, coordinates: null };
            cycleCollisionDetected = false;
            beamKey += 1;
          }, 2000);
        }
      }
      requestId = requestAnimationFrame(checkCollision);
    };

    requestId = requestAnimationFrame(checkCollision);
    return () => cancelAnimationFrame(requestId);
  });

  const createSpans = () =>
    Array.from({ length: 20 }, (_, index) => ({
      id: index,
      directionX: Math.floor(Math.random() * 80 - 40),
      directionY: Math.floor(Math.random() * -50 - 40),
      duration: Math.random() * 1.5 + 0.5,
    }));
</script>

{#key beamKey}
  <div
    bind:this={beamRef}
    use:beamAnimation={beamOptions}
    class={cn(
      "absolute z-10 left-0 top-20 m-auto h-14 w-px rounded-full bg-gradient-to-t from-neutral-300 via-neutral-800 to-transparent",
      beamOptions.className,
    )}
  ></div>
{/key}

{#if collision.detected && collision.coordinates}
    <!-- Explosion -->
    <div
      out:fade={{ duration: 1500, easing: cubicOut }}
      class="absolute z-50 h-2 w-2"
      style="left: {collision.coordinates.x}px; top: {collision.coordinates.y}px; transform: translate(-50%, -50%);"
    >
      <div
        in:fade={{ duration: 1500, easing: cubicOut }}
        class="absolute -inset-x-10 top-0 m-auto h-2 w-10 rounded-full bg-gradient-to-r from-transparent via-neutral-400 to-transparent blur-sm"
      ></div>
      {#each createSpans() as span (span.id)}
        <span
          class="explosion-particle absolute h-1 w-1 rounded-full bg-gradient-to-b from-neutral-300 to-neutral-800"
          style="--dx: {span.directionX}px; --dy: {span.directionY}px; animation-duration: {span.duration}s;"
        ></span>
      {/each}
    </div>
{/if}

<style>
  .explosion-particle {
    animation-name: explode;
    animation-timing-function: cubic-bezier(0, 0, 0.58, 1);
    animation-fill-mode: forwards;
  }

  @keyframes explode {
    from {
      transform: translate(0, 0);
      opacity: 1;
    }
    to {
      transform: translate(var(--dx), var(--dy));
      opacity: 0;
    }
  }
</style>
