import { getCollection } from 'astro:content';
import { markdownify } from '@/lib/utils/textConverter';

export async function GET() {
  const allQuestionFiles = await getCollection('interview-questions');
  const questions = allQuestionFiles.flatMap(file => 
    file.data.questions.map(q => ({
      id: q.id,
      question: q.question,
      tags: q.tags,
      answer: Array.isArray(q.answer) ? q.answer.map(a => markdownify(a)) : markdownify(q.answer),
      code: q.code || null,
      images: q.related_images || null
    }))
  );
  
  return new Response(JSON.stringify(questions), {
    status: 200,
    headers: {
      'Content-Type': 'application/json'
    }
  });
}
