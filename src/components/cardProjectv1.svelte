<script lang="ts">
  import type { Snippet } from "svelte";
  import { inview, itemUp, itemVariants, reveal } from "@/lib/functions";

  type Project = {
    name: string;
    date: number;
    image: string;
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

  let visible = $state(false);
</script>

<div use:inview={{ amount: 0.2, once: true, onenter: () => (visible = true) }}>
  <div
    style={reveal(visible, itemVariants, 0, "all 300ms cubic-bezier(0.4, 0, 0.2, 1)")}
    class="group h-64 px-3 pt-2 pb-3 rounded-2xl transition-all duration-300 hover:scale-105 bg-gradient-to-tr from-white via-neutral-100
      to-neutral-100 hover:border-t-4 border border-neutral-200 hover:border-t-neutral-700 dark:border-neutral-800 dark:hover:border-t-neutral-300 dark:from-neutral-950 dark:via-neutral-900 dark:to-neutral-800
      relative overflow-hidden flex flex-col justify-between"
  >
    <div class="flex items-center justify-between mb-2">
      <span class="font-semibold capitalize text-primary">
        {project.name}
      </span>
      <span class="font-vectra text-xs font-semibold opacity-50 mt-1">
        {project.date}
      </span>
    </div>

    <div class="relative h-full overflow-hidden">{@render children()}</div>

    <div style={reveal(visible, itemUp)} class="relative mt-1">
      <p
        class="font-medium text-neutral-600 dark:text-neutral-400 text-sm transition-all duration-300 group-hover:-translate-y-10 group-hover:bg-neutral-100/20 group-hover:backdrop-blur group-hover:dark:bg-neutral-950/80"
      >
        <span class="line-clamp-2">
          {locale === "en" ? project.description : project.descriptionEs}
        </span>
        {#each project.technologies as tech, index (index)}
          <span class="text-neutral-700 font-bold dark:text-neutral-300">
            {tech}{index < project.technologies.length - 1 && index > 0 ? ", " : ""}<span
              class="font-normal text-neutral-600 dark:text-neutral-400"
              >{index === project.technologies.length - 2 ? " & " : ""}</span
            >
          </span>
        {/each}
      </p>

      <a
        class="absolute group-hover:-translate-y-7 translate-y-4 select-none
        inline-flex items-center gap-2 px-3 py-1.5 text-xs font-medium rounded-full transition-all duration-300
         text-white dark:text-neutral-900 bg-primary cursor-pointer hover:scale-105 active:scale-95 active:brightness-90 group/svg"
        href={locale === "en" ? `/project/${project.name}` : `/es/project/${project.name}`}
      >
        {locale === "en" ? "Show more" : "Mostrar más"}
        <svg
          class="h-3.5 w-3.5 transition-transform duration-500 -translate-x-1 group-hover/svg:translate-x-0.5"
          viewBox="0 0 20 20"
          fill="currentColor"
          aria-hidden="true"
        >
          <path
            d="M7.5 5.5l5 4.5-5 4.5"
            stroke="currentColor"
            stroke-width="1.5"
            fill="none"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </a>
    </div>
  </div>
</div>
