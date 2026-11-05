<script lang="ts" module>
  import type { Variant } from "@/lib/functions";

  /** Delay between staggered children (ms). Mirrors `staggerChildren: 0.1`. */
  const STAGGER = 100;

  export const itemVariants: Variant = { opacity: 0, y: 25, duration: 500 };

  const nameBlurVariants: Variant = { opacity: 0, blur: 12, y: 8, duration: 600, delay: 200 };

  const surnameBlurVariants: Variant = { opacity: 0, blur: 12, y: 8, duration: 600, delay: 550 };

  const descriptionBlurVariants: Variant = { opacity: 0, blur: 12, y: 14, duration: 600, delay: 1100 };

  const languagesBlurVariants: Variant = { opacity: 0, blur: 12, y: 14, duration: 600, delay: 1350 };
</script>

<script lang="ts">
  import { onMount } from "svelte";
  import Languages from "./Languages.svelte";
  import Stars from "./Stars.svelte";
  import SpotlightParticles from "./SpotlightParticles.svelte";
  import ShinyText from "@/components/shinyText.svelte";
  import { reveal } from "@/lib/functions";
  import { i18next } from "@/i18n/config";

  let { lang }: { lang: string } = $props();

  const localT = $derived(i18next.getFixedT(lang || "en"));
  let mounted = $state(false);

  onMount(() => {
    requestAnimationFrame(() => (mounted = true));
  });

  $effect(() => {
    if (lang) {
      import("../../i18n/config").then((module) => {
        module.default.changeLanguage(lang);
      });
    }
  });
</script>

<Stars>
  <section id="home" class="relative z-[2] flex justify-center items-center min-h-[calc(100vh-2px)] px-4">
    <SpotlightParticles />
    <div class="max-w-xl w-full text-center space-y-2">
      <h1
        style={reveal(mounted, itemVariants, 0)}
        class="text-4xl sm:text-5xl lg:text-6xl font-bold font-sans text-neutral-600 dark:text-neutral-200 leading-tight"
      >
        <span style={reveal(mounted, nameBlurVariants)} class="inline-block mr-2">
          {localT("home.name")}
        </span>
        <span style={reveal(mounted, surnameBlurVariants)} class="inline-block text-primary">Jarcy</span>
      </h1>

      <h2 style={reveal(mounted, itemVariants, STAGGER)} class="font-vectra text-4xl sm:text-5xl lg:text-6xl font-bold py-2">
        <ShinyText
          text="Software Developer"
          speed={2}
          color="var(--color-secondary)"
          shineColor="var(--color-primary)"
        />
      </h2>

      <article
        style={reveal(mounted, descriptionBlurVariants)}
        class="dark:text-neutral-400/90 px-4 md:px-0 text-sm sm:text-base"
      >
        {localT("home.description")}
      </article>

      <div style={reveal(mounted, languagesBlurVariants)}>
        <Languages />
      </div>
    </div>
  </section>
</Stars>
