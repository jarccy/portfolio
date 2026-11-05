<script lang="ts" module>
  export type IconName =
    | "Rocket"
    | "Cube"
    | "LockClosed"
    | "Globe"
    | "Gear"
    | "MagicWand"
    | "Star"
    | "LightningBolt";
</script>

<script lang="ts">
  import type { SVGAttributes } from "svelte/elements";

  interface IconProps extends SVGAttributes<SVGSVGElement> {
    name: IconName;
  }

  let { name, ...props }: IconProps = $props();
</script>

{#if name === "Rocket"}
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" {...props}>
    <path d="M12 3c3 0 6 3.5 6 7.5S14 17 12 21c-2-4-6-6.5-6-10.5S9 3 12 3Z" stroke-width="1.5" />
    <path d="M9.5 9.5a2.5 2.5 0 1 0 5 0a2.5 2.5 0 0 0-5 0Z" stroke-width="1.5" />
    <path d="M7 14l-3 3m2-5l-2 2m8 2l2 3" stroke-width="1.5" stroke-linecap="round" />
  </svg>
{:else if name === "Cube"}
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" {...props}>
    <path d="M12 3l8 4.5v9L12 21l-8-4.5v-9L12 3Z" stroke-width="1.5" />
    <path d="M20 7.5L12 12M12 12L4 7.5M12 12v9" stroke-width="1.5" />
  </svg>
{:else if name === "LockClosed"}
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" {...props}>
    <rect x="4" y="10" width="16" height="10" rx="2" stroke-width="1.5" />
    <path d="M8 10V7a4 4 0 1 1 8 0v3" stroke-width="1.5" />
    <path d="M12 14v3" stroke-width="1.5" stroke-linecap="round" />
  </svg>
{:else if name === "Globe"}
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" {...props}>
    <circle cx="12" cy="12" r="9" stroke-width="1.5" />
    <path d="M3 12h18M12 3c3 3.5 3 14.5 0 18M12 3c-3 3.5-3 14.5 0 18" stroke-width="1.5" />
  </svg>
{:else if name === "Gear"}
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" {...props}>
    <circle cx="12" cy="12" r="3" stroke-width="1.5" />
    <path
      d="M12 2v3M12 19v3M4.9 4.9l2.1 2.1M17 17l2.1 2.1M2 12h3M19 12h3M4.9 19.1l2.1-2.1M17 7l2.1-2.1"
      stroke-width="1.5"
      stroke-linecap="round"
    />
  </svg>
{:else if name === "MagicWand"}
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" {...props}>
    <path d="M4 20l8-8" stroke-width="1.5" stroke-linecap="round" />
    <path d="M14 4l1.5 3L19 8l-3 1.5L14 13l-1.5-3L9 8l3.5-1L14 4Z" stroke-width="1.5" stroke-linejoin="round" />
  </svg>
{:else if name === "Star"}
  <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M12 2l2.9 6.2L22 9.3l-5 4.8 1.3 7.6L12 18.7 5.7 21.7 7 14.1 2 9.3l7.1-1.1L12 2Z" />
  </svg>
{:else if name === "LightningBolt"}
  <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M13 2L3 14h8l-2 8 12-14h-8l0-6Z" />
  </svg>
{/if}
