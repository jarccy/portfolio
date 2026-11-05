<script lang="ts">
  import type { Snippet } from "svelte";
  import { inview, itemProfile, reveal } from "@/lib/functions";

  interface ImageGalleryProps {
    mainImage: string;
    images: string[];
    name: string;
    description: string;
    technologies: string[];
  }

  interface GalleryProjectsProps extends ImageGalleryProps {
    children?: Snippet;
    locale?: string;
  }

  let { mainImage, images, name, description, technologies, children, locale = "en" }: GalleryProjectsProps =
    $props();

  // svelte-ignore state_referenced_locally
  let selectedImage = $state<string>(mainImage);
  let visible = $state(false);

  const setImagen = (image: string) => {
    selectedImage = image;
  };

  const goBack = () => {
    window.location.href = locale === "es" ? "/es/#projects" : "/#projects";
  };
</script>

<div use:inview={{ amount: 0.2, once: true, onenter: () => (visible = true) }}>
  <div class="flex items-center justify-between">
    <button onclick={() => goBack()} class="flex items-center gap-2 opacity-70 hover:opacity-100 cursor-pointer">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        fill="currentColor"
        class="bi bi-arrow-left"
        viewBox="0 0 16 16"
      >
        <path
          fill-rule="evenodd"
          d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z"
        ></path>
      </svg>
      {locale === "es" ? "Atrás" : "Back"}
    </button>

    <h1 class="text-2xl md:text-3xl font-bold capitalize">{name}</h1>
  </div>

  <article class="mt-6 mb-5">
    <p
      class="font-medium text-neutral-600 dark:text-neutral-400 text-sm transition-all duration-300 group-hover:-translate-y-10 group-hover:bg-neutral-100/20 group-hover:backdrop-blur group-hover:dark:bg-neutral-950/90"
    >
      {description}
      {#each technologies as tech, index (index)}
        <span class="text-neutral-700 font-bold dark:text-neutral-300">
          {tech}{index < technologies.length - 1 && index > 0 ? ", " : ""}<span
            class="font-normal text-neutral-600 dark:text-neutral-400"
            >{index === technologies.length - 2 ? " & " : ""}</span
          >
        </span>
      {/each}
    </p>
  </article>

  <div class="relative h-full overflow-hidden mb-4">
    {#if selectedImage === mainImage}
      {@render children?.()}
    {:else}
      <img src={selectedImage} alt={name} class="transition-transform duration-300 select-none hover:scale-105" />
    {/if}
  </div>

  <div
    style={reveal(visible, itemProfile)}
    class="flex gap-4 mt-4 items-center w-2/3 bg-neutral-200/80 dark:bg-neutral-800 rounded-lg overflow-hidden px-3 py-1"
  >
    {#each images as img (img)}
      <div
        role="button"
        tabindex="0"
        onclick={() => setImagen(img)}
        onkeydown={(e) => (e.key === "Enter" || e.key === " ") && setImagen(img)}
        class="flex-1 relative h-full overflow-hidden focus:outline-none cursor-pointer"
      >
        <img src={img} alt={name} class="transition-transform duration-300 select-none" />
      </div>
    {/each}
  </div>
</div>
