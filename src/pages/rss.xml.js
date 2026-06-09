import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import config from '../config/config.json';

export async function GET(context) {
  const articles = await getCollection('articles');
  const publishedArticles = articles.filter(post => !post.data.draft);
  
  return rss({
    title: config.site.title,
    description: config.metadata.meta_description,
    site: context.site || config.site.base_url,
    items: publishedArticles.map((post) => ({
      title: post.data.title,
      pubDate: new Date(post.data.year || 2026, 0, 1),
      description: post.data.description || post.data.subtitle || '',
      link: `/articles/${post.slug}`,
    })),
    customData: `<language>en-us</language>`,
  });
}
