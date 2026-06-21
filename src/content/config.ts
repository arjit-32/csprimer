import { defineCollection, z } from 'astro:content';

// Blog collection schema
const blogCollection = defineCollection({
  schema: z.object({
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

// Shared status enum for courses and articles
const statusEnum = z.enum(['completed', 'in-progress', 'proofreading', 'planned', 'draft']).optional();

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
    status: statusEnum,
    time: z.string().optional(),
    weight: z.number().default(100),
    navbar: z.array(z.object({
      subheading: z.string(),
      link: z.array(z.object({
        type: z.enum(['articles', 'video', 'external', 'assignment', 'book', 'youtube', 'github']),
        url: z.string(),
        title: z.string(),
        status: statusEnum,
      })),
    })),
  }),
});

// Interview Questions collection schema
const interviewQuestionsCollection = defineCollection({
  type: 'data', // YAML based
  schema: z.object({
    questions: z.array(z.object({
      id: z.union([z.string(), z.number()]),
      question: z.string(),
      answer: z.array(z.string()), // Array of strings (paragraphs/bullets)
      code: z.string().optional(),
      tags: z.array(z.string()).default([]),
      date: z.date().optional(),
      related_images: z.array(z.string()).optional(),
    }))
  }),
});

// Shorts collection schema
const shortsCollection = defineCollection({
  schema: z.object({
    title: z.string(),
    youtubeId: z.string(),
    series: z.string(),
    seriesName: z.string(),
    order: z.number().default(0),
  }),
});



// Export collections
export const collections = {
  articles: blogCollection,
  pages: pagesCollection,
  series: seriesCollection,
  'interview-questions': interviewQuestionsCollection,
  shorts: shortsCollection,
};

