<script lang="ts">
  import { fly } from "svelte/transition";
  import { getPrimaryColor, onPrimaryColorChange, setPrimaryColor, type PrimaryColor } from "@/lib/theme";
  import { cn } from "@/lib/utils";
  import ThemeSwitch from "./themeSwitch.svelte";

  let { lang }: { lang?: string } = $props();

  const colors: { name: PrimaryColor; color: string }[] = [
    { name: "default", color: "#18181a" },
    { name: "blue", color: "#94bcfa" },
    { name: "green", color: "#86efac" },
    { name: "yellow", color: "#fde68a" },
    { name: "violet", color: "#c4b5fd" },
    { name: "pink", color: "#fb63b6" },
    { name: "orange", color: "#fca5a5" },
    { name: "rose", color: "#fb7086" },
  ];

  let primaryColor = $state<PrimaryColor>(getPrimaryColor());
  let isOpen = $state(false);
  let ref: HTMLDivElement;

  $effect(() => onPrimaryColorChange((color) => (primaryColor = color)));

  $effect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref && !ref.contains(event.target as Node)) {
        isOpen = false;
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  });
</script>

<div class="relative" bind:this={ref}>
  <button
    onclick={() => (isOpen = !isOpen)}
    aria-label={lang === "en" ? "Theme / Color" : "Tema / Color"}
    class="p-1 rounded-full cursor-pointer hover:bg-neutral-200/50 dark:hover:bg-neutral-800 text-neutral-200 hover:text-neutral-600 dark:text-neutral-200 dark:hover:text-neutral-200 transition-colors active:scale-95"
  >
    <svg xmlns="http://www.w3.org/2000/svg" class="size-5" viewBox="0 0 256 256"
      ><path
        fill="currentColor"
        d="M200.77 53.89A103.27 103.27 0 0 0 128 24h-1.07A104 104 0 0 0 24 128c0 43 26.58 79.06 69.36 94.17A32 32 0 0 0 136 192a16 16 0 0 1 16-16h46.21a31.81 31.81 0 0 0 31.2-24.88a104.4 104.4 0 0 0 2.59-24a103.28 103.28 0 0 0-31.23-73.23m13 93.71a15.89 15.89 0 0 1-15.56 12.4H152a32 32 0 0 0-32 32a16 16 0 0 1-21.31 15.07C62.49 194.3 40 164 40 128a88 88 0 0 1 87.09-88h.9a88.35 88.35 0 0 1 88 87.25a89 89 0 0 1-2.18 20.35ZM140 76a12 12 0 1 1-12-12a12 12 0 0 1 12 12m-44 24a12 12 0 1 1-12-12a12 12 0 0 1 12 12m0 56a12 12 0 1 1-12-12a12 12 0 0 1 12 12m88-56a12 12 0 1 1-12-12a12 12 0 0 1 12 12"
      ></path></svg
    >
  </button>

  {#if isOpen}
    <div
      transition:fly={{ x: -10, duration: 200 }}
      class="absolute bg-white dark:bg-neutral-900 right-0 top-full mt-3.5 p-3 border border-neutral-200 dark:border-neutral-800 rounded-xl shadow-lg min-w-[180px] z-50 origin-top-right"
    >
      <div class="flex items-center justify-between mb-3">
        <p class="text-xs font-bold text-muted-foreground px-1 uppercase tracking-wider">
          {lang === "en" ? "Theme / Color" : "Tema / Color"}
        </p>
        <ThemeSwitch
          variant="top-down"
          class="p-1 rounded-full cursor-pointer hover:bg-neutral-200/50 dark:hover:bg-neutral-800 text-neutral-400 hover:text-neutral-600 dark:text-neutral-400 dark:hover:text-neutral-200"
        />
      </div>
      <div class="grid grid-cols-4 gap-2">
        {#each colors as c (c.name)}
          <button
            onclick={() => {
              setPrimaryColor(c.name);
              isOpen = false;
            }}
            class={cn(
              "w-8 h-8 cursor-pointer rounded-full border-2 transition-all flex items-center justify-center",
              primaryColor === c.name
                ? "border-primary scale-110 shadow-sm"
                : "border-transparent opacity-80 hover:opacity-100 hover:scale-105",
            )}
            style="background-color: {c.color}"
            title={c.name}
          >
            {#if primaryColor === c.name}
              <div class="w-2 h-2 bg-white rounded-full shadow-sm"></div>
            {/if}
          </button>
        {/each}
      </div>
    </div>
  {/if}
</div>
