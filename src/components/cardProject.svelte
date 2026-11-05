<script lang="ts">
  import type { Snippet } from "svelte";
  import { crossfade, fade } from "svelte/transition";
  import { cubicOut } from "svelte/easing";

  type Project = {
    name: string;
    date: number;
    image: string;
    images?: string[];
    description: string;
    descriptionEs: string;
    technologies: string[];
  };

  let {
    project,
    projectId,
    locale,
    children,
  }: {
    project: Project;
    projectId: string;
    locale: string;
    children: Snippet;
  } = $props();

  let isExpanded = $state(false);
  let currentIndex = $state(0);
  const cardLayoutId = $derived(`project-card-${projectId}`);
  const images = $derived(project.images || [project.image]);

  // Shared-element transition between the card and the modal (replaces framer-motion `layoutId`).
  const [send, receive] = crossfade({ duration: 400, easing: cubicOut });

  // Lock scroll when expanded
  $effect(() => {
    document.body.style.overflow = isExpanded ? "hidden" : "unset";
    return () => {
      document.body.style.overflow = "unset";
    };
  });

  const nextSlide = (e: MouseEvent) => {
    e.stopPropagation();
    currentIndex = (currentIndex + 1) % images.length;
  };

  const prevSlide = (e: MouseEvent) => {
    e.stopPropagation();
    currentIndex = (currentIndex - 1 + images.length) % images.length;
  };
</script>

<div class="relative group">
  <div class="h-[350px] w-full invisible pointer-events-none"></div>

  {#if !isExpanded}
    <button
      in:receive={{ key: cardLayoutId }}
      out:send={{ key: cardLayoutId }}
      type="button"
      onclick={() => {
        currentIndex = 0;
        isExpanded = true;
      }}
      class="absolute inset-0 h-[350px] w-full cursor-pointer rounded-[2.5rem] flex flex-col overflow-hidden bg-gradient-to-tr from-white via-neutral-100 to-neutral-200/30 dark:border-t border border-neutral-200 dark:border-neutral-800 dark:from-neutral-950 dark:via-neutral-900 dark:to-neutral-800 text-left transform-gpu [contain:layout_paint_style]"
    >
      <div
        class="absolute inset-0 border border-black/5 dark:border-white/5 rounded-[2.5rem] pointer-events-none m-1"
      ></div>

      <div class="relative w-full h-full flex flex-col items-center">
        <div class="flex-1 w-full flex items-center justify-center px-4 pointer-events-none">
          <div class="relative w-full h-full max-h-[210px] flex items-center justify-center">
            {@render children()}
          </div>
        </div>

        <div class="w-full px-6 pb-2 text-center">
          <p class="text-neutral-500 text-sm line-clamp-2 leading-relaxed h-11">
            {locale === "en" ? project.description : project.descriptionEs}
          </p>
        </div>
      </div>

      <div class="mt-auto w-full border-t border-neutral-200/70 dark:border-neutral-800/80">
        <div class="flex items-center justify-between px-6 py-3">
          <span class="font-bold text-sm capitalize text-primary">
            {project.name}
          </span>
          <div class="text-xs text-neutral-400 dark:text-neutral-500">
            {project.date}
          </div>
        </div>
      </div>
    </button>
  {/if}

  {#if isExpanded}
    <div
      transition:fade={{ duration: 220, easing: cubicOut }}
      class="fixed inset-0 flex items-center justify-center z-[120] px-4"
    >
      <button
        type="button"
        onclick={() => (isExpanded = false)}
        class="absolute inset-0 bg-black/40 dark:bg-black/30"
        aria-label={locale === "en" ? "Close modal" : "Cerrar modal"}
      ></button>

      <div
        in:receive={{ key: cardLayoutId }}
        out:send={{ key: cardLayoutId }}
        class="w-full max-w-[720px] max-h-[90vh] bg-white dark:bg-neutral-900 rounded-[40px] p-8 shadow-sm border border-gray-200 dark:border-stone-800 relative z-10 overflow-y-auto custom-scrollbar transform-gpu [contain:layout_paint_style]"
      >
        <div class="mb-6 text-center">
          <h3 class="text-neutral-400 dark:text-neutral-500 text-[10px] font-black uppercase tracking-[0.2em]">
            {locale === "en" ? "Project Details" : "Detalles del Proyecto"}
          </h3>
          <h2 class="mt-2 text-2xl sm:text-3xl font-black capitalize">
            {project.name}
          </h2>
        </div>

        <div class="mb-8">
          <!-- Image slider -->
          <div
            class="relative w-full aspect-video rounded-2xl overflow-hidden  shadow-sm group/slider border border-white/5"
          >
            {#key currentIndex}
              <img
                src={images[currentIndex]}
                alt={`Project view ${currentIndex + 1}`}
                loading="lazy"
                decoding="async"
                class="w-full h-full object-cover"
              />
            {/key}

            {#if images.length > 1}
              <div
                class="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/40 opacity-0 group-hover/slider:opacity-100 transition-opacity duration-300 pointer-events-none"
              ></div>
              <button
                onclick={prevSlide}
                class="absolute left-3 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-black/50 text-white opacity-0 group-hover/slider:opacity-100 transition-all hover:bg-black/70 hover:scale-110 active:scale-95 z-10 border border-white/10"
              >
                ←
              </button>
              <button
                onclick={nextSlide}
                class="absolute right-3 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-black/50 text-white opacity-0 group-hover/slider:opacity-100 transition-all hover:bg-black/70 hover:scale-110 active:scale-95 z-10 border border-white/10"
              >
                →
              </button>
              <div class="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10">
                {#each images as _, i (i)}
                  <div
                    class="w-1.5 h-1.5 rounded-full transition-all duration-300 {i === currentIndex
                      ? 'bg-white w-4'
                      : 'bg-white/40'}"
                  ></div>
                {/each}
              </div>
            {/if}
          </div>
        </div>

        <p class="text-sm sm:text-base text-neutral-600 dark:text-neutral-400 leading-relaxed mb-8">
          {locale === "en" ? project.description : project.descriptionEs}
        </p>

        <div class="space-y-5 max-h-[200px] overflow-y-auto pr-2 custom-scrollbar">
          {#each project.technologies as tech, idx (tech)}
            <div>
              <div class="flex items-center justify-between py-1 group transition-all duration-300">
                <div class="flex items-center gap-4">
                  <div
                    class="w-10 h-10 rounded-xl flex items-center justify-center shadow-sm dark:shadow-lg shrink-0 bg-neutral-100 dark:bg-neutral-800/80"
                  >
                    <span class="text-xs font-black text-neutral-500">
                      {(idx + 1).toString().padStart(2, "0")}
                    </span>
                  </div>
                  <div>
                    <h4 class="text-sm font-semibold text-foreground">
                      {tech}
                    </h4>
                    <p class="text-[10px] text-neutral-400 dark:text-neutral-500 font-medium">
                      {locale === "en" ? "Technology" : "Tecnologia"}
                    </p>
                  </div>
                </div>
                <div class="text-right">
                  <span class="text-xs font-bold text-foreground/70">
                    #{idx + 1}
                  </span>
                </div>
              </div>
            </div>
          {/each}
        </div>

        <div class="mt-6 pt-4 border-t border-neutral-200 dark:border-neutral-800 flex justify-end">
          <button
            type="button"
            onclick={() => (isExpanded = false)}
            class="text-sm font-medium text-neutral-500 dark:text-neutral-400 hover:text-neutral-800 dark:hover:text-neutral-200 transition-colors"
          >
            {locale === "en" ? "Close" : "Cerrar"}
          </button>
        </div>
      </div>
    </div>
  {/if}
</div>
