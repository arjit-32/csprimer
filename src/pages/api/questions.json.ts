import { getCollection } from 'astro:content';
import { markdownify } from '@/lib/utils/textConverter';
import { getImage } from 'astro:assets';

const allImages = import.meta.glob<{ default: ImageMetadata }>('/src/assets/images/**/*.{jpeg,jpg,png,gif,webp,svg}', { eager: true });

export async function GET() {
  const allQuestionFiles = await getCollection('interview-questions');
  const questions = await Promise.all(allQuestionFiles.flatMap(file => 
    file.data.questions.map(async q => {
      let optimizedImages = q.related_images || null;
      if (optimizedImages && optimizedImages.length > 0) {
        optimizedImages = await Promise.all(optimizedImages.map(async (img: string) => {
          const path = `/src/assets/${img}`;
          if (allImages[path]) {
            const resolved = await getImage({ src: allImages[path].default, format: 'webp' });
            return resolved.src;
          }
          return img;
        }));
      }

      return {
        id: q.id,
        question: q.question,
        tags: q.tags,
        answer: Array.isArray(q.answer) ? q.answer.map(a => markdownify(a)) : markdownify(q.answer),
        code: q.code || null,
        images: optimizedImages
      };
    })
  ));
  
  return new Response(JSON.stringify(questions), {
    status: 200,
    headers: {
      'Content-Type': 'application/json'
    }
  });
}
