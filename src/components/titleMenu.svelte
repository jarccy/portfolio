<script lang="ts">
  import type { Snippet } from "svelte";
  import TypewriterEffectSmooth from "./textWrite.svelte";

  let {
    title,
    description,
    children,
  }: {
    title: string;
    description: string;
    children?: Snippet;
  } = $props();
</script>

<div class="flex items-center gap-3 mb-4 group">
  <div
    class="rounded-xl bg-gradient-to-r from-neutral-200 via-neutral-100 to-neutral-50  dark:from-neutral-800 dark:via-neutral-600 dark:to-neutral-500 group"
  >
    <div
      class="bg-neutral-100 dark:bg-neutral-800 rounded-xl p-2 backdrop-blur-sm flex items-center justify-center ml-1 border-[0.5px] border-neutral-300 dark:border-neutral-700"
    >
      {@render children?.()}
    </div>
  </div>

  <div class="flex flex-col -space-y-1">
    <div class="h-[35px]">
      <TypewriterEffectSmooth
        class="text-primary text-2xl font-bold font-vectra"
        words={[{ text: title }]}
        duration={0.5}
      />
    </div>

    <p class="text-neutral-500 dark:text-neutral-400 text-sm">
      {description}
    </p>
  </div>
</div>
