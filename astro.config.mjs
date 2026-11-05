import { defineConfig } from "astro/config";
import svelte from "@astrojs/svelte";
import tailwind from "@tailwindcss/vite";

export default defineConfig({
  i18n: {
    defaultLocale: "en",
    locales: ["en", "es"],
    routing: {
      prefixDefaultLocale: false,
    },
  },
  integrations: [svelte()],
  vite: {
    plugins: [tailwind()],
  },
  viewTransitions: true,
});
