import { defineConfig, envField } from "astro/config";
import react from "@astrojs/react";
import tailwind from "@tailwindcss/vite";

export default defineConfig({
  integrations: [react()],
  vite: {
    plugins: [tailwind()],
  },
  viewTransitions: true,
  // env: {
  //   schema: {
  //     BACKEND_URL: envField.string({ context: "server", access: "secret" }),
  //     BACKEND_API: envField.string({ context: "client", access: "secret" }),
  //   },
  // },
});
