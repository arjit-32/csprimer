import { defineCollection, z } from 'astro:content';

// Blog collection schema
const blogCollection = defineCollection({
  schema: z.object({
    id: z.string().optional(),
    title: z.string(),
    subtitle: z.string().optional(),         
    meta_title: z.string().optional(),         
    description: z.string().optional(),        
    image: z.string().optional(),
    author: z.string().optional(),
    series: z.array(z.string()).default(["others"]),
    categories: z.array(z.string()).default(["others"]),
    draft: z.boolean().optional(),
    year: z.number().optional(),
    featured: z.boolean().optional(),
  }),
});

// Pages collection schema
const pagesCollection = defineCollection({
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
  }),
});



// Export collections
export const collections = {
  articles: blogCollection,
  pages: pagesCollection,
};
