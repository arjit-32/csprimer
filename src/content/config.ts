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

// Series collection schema
const seriesCollection = defineCollection({
  type: 'data', // JSON/YAML based
  schema: z.object({
    title: z.string(),
    subtitle: z.string().optional(),
    description: z.string(),
    image: z.string().optional(),
    category: z.string().default('Course'),
    ongoing: z.union([z.boolean(), z.string()]).transform(val => val === true || val === 'On-going' || val === 'true'), // Normalize legacy data
    time: z.string().optional(),
    navbar: z.array(z.object({
      subheading: z.string(),
      link: z.array(z.object({
        type: z.enum(['articles', 'video', 'external', 'assignment', 'book', 'youtube', 'github']),
        url: z.string(),
        title: z.string(),
      })),
    })),
  }),
});

// Interview Questions collection schema
const interviewQuestionsCollection = defineCollection({
  type: 'content', // Markdown/MDX based
  schema: z.object({
    question: z.string(),
    tags: z.array(z.string()),
    date: z.date().default(() => new Date()), // Useful for ordering
    related_images: z.array(z.string()).optional(),
  }),
});

// Export collections
export const collections = {
  articles: blogCollection,
  pages: pagesCollection,
  series: seriesCollection,
  'interview-questions': interviewQuestionsCollection,
};
