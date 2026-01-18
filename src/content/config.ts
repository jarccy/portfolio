import { defineCollection, z } from "astro:content";

const projects = defineCollection({
    schema: z.object({
        name: z.string(),
        date: z.number(),
        image: z.string(),
        description: z.string(),
        descriptionEs: z.string(),
        technologies: z.array(z.string()),
        images: z.array(z.string()),
    }),
});

export const collections = { projects };