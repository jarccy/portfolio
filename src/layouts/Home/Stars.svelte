<script lang="ts">
  import type { Snippet } from "svelte";
  import { cn } from "@/lib/utils";
  import CollisionMechanism from "./CollisionMechanism.svelte";

  let {
    children,
    class: className,
  }: {
    children: Snippet;
    class?: string;
  } = $props();

  let containerRef = $state<HTMLDivElement | null>(null);
  let parentRef = $state<HTMLDivElement | null>(null);

  const beams = [
    {
      initialX: 10,
      translateX: 10,
      duration: 7,
      repeatDelay: 3,
      delay: 2,
    },
    {
      initialX: 600,
      translateX: 600,
      duration: 3,
      repeatDelay: 3,
      delay: 4,
    },
    {
      initialX: 100,
      translateX: 100,
      duration: 7,
      repeatDelay: 7,
      className: "h-6",
    },
    {
      initialX: 400,
      translateX: 400,
      duration: 5,
      repeatDelay: 14,
      delay: 4,
    },
    {
      initialX: 800,
      translateX: 800,
      duration: 11,
      repeatDelay: 2,
      className: "h-20",
    },
    {
      initialX: 1000,
      translateX: 1000,
      duration: 4,
      repeatDelay: 2,
      className: "h-12",
    },
    {
      initialX: 1200,
      translateX: 1200,
      duration: 6,
      repeatDelay: 4,
      delay: 2,
      className: "h-6",
    },
  ];
</script>

<div bind:this={parentRef} class={cn(" relative flex items-center w-full justify-center overflow-hidden", className)}>
  {#each beams as beam (beam.initialX + "beam-idx")}
    <CollisionMechanism beamOptions={beam} {containerRef} {parentRef} />
  {/each}

  {@render children()}
  <div
    bind:this={containerRef}
    class="absolute bottom-0 w-full inset-x-0 pointer-events-none"
    style="box-shadow: 0 0 24px rgba(34, 42, 53, 0.06), 0 1px 1px rgba(0, 0, 0, 0.05), 0 0 0 1px rgba(34, 42, 53, 0.04), 0 0 4px rgba(34, 42, 53, 0.08), 0 16px 68px rgba(47, 48, 55, 0.05), 0 1px 0 rgba(255, 255, 255, 0.1) inset;"
  ></div>
</div>
