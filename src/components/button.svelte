<script lang="ts">
  import type { Snippet } from "svelte";
  import type { HTMLButtonAttributes } from "svelte/elements";
  import { cn } from "@/lib/utils";

  const defaultClassName =
    "inline-flex  select-none items-center gap-2 cursor-pointer rounded-2xl px-2 md:px-6 py-1.5 font-medium hover:scale-105 transition-transform duration-300 text-white dark:text-neutral-900 bg-primary active:scale-95 active:brightness-90";

  interface ButtonProps extends HTMLButtonAttributes {
    ref?: HTMLButtonElement | null;
    children?: Snippet;
  }

  let { class: className, ref = $bindable(null), children, ...props }: ButtonProps = $props();
</script>

<button bind:this={ref} class={cn(defaultClassName, className as string)} {...props}>
  {@render children?.()}
</button>
