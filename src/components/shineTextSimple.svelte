<script lang="ts">
  import type { Snippet } from "svelte";
  import type { HTMLAttributes } from "svelte/elements";
  import { cn } from "@/lib/utils";

  interface ShineTextSimpleProps extends HTMLAttributes<HTMLSpanElement> {
    shimmerWidth?: number;
    children?: Snippet;
  }

  let { children, class: className, shimmerWidth = 100, ...props }: ShineTextSimpleProps = $props();
</script>

<span
  style="--shiny-width: {shimmerWidth}px"
  class={cn(
    "mx-auto max-w-md text-neutral-600/70 dark:text-neutral-400/70",

    "animate-shiny-text bg-clip-text bg-no-repeat bg-position-[0_0] bg-size-[var(--shiny-width)_100%] [transition:background-position_1s_cubic-bezier(.6,.6,0,1)_infinite]",

    "bg-linear-to-r from-transparent via-black/80 via-50% to-transparent  dark:via-white/80",

    className as string,
  )}
  {...props}
>
  {@render children?.()}
</span>
