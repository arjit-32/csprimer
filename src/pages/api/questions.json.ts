import { getCollection } from 'astro:content';

export async function GET() {
  const allQuestionFiles = await getCollection('interview-questions');
  const questions = allQuestionFiles.flatMap(file => 
    file.data.questions.map(q => ({
      question: q.question,
      tags: q.tags,
      answer: q.answer,
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
