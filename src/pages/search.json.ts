import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';
import { calculateReadingTime, formatReadingTime } from '../utils/readingTime';

export const GET: APIRoute = async () => {
  const now = new Date();
  const posts = await getCollection('blog');

  const searchData = await Promise.all(
    posts
      .filter((post) => {
        if (post.data.draft) return false;
        if (!post.data.publishDate) return true;

        const publishDate = new Date(post.data.publishDate);
        return publishDate <= now;
      })
      .sort((a, b) => new Date(b.data.date).getTime() - new Date(a.data.date).getTime())
      .map(async (post) => {
        const readingTime = calculateReadingTime(post.body);

        return {
          title: post.data.title,
          description: post.data.description || '',
          date: post.data.date,
          url: `/blog/${post.slug}`,
          tags: post.data.tags || [],
          readingTime: formatReadingTime(readingTime)
        };
      })
  );
  
  return new Response(JSON.stringify(searchData), {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
      'Cache-Control': 'public, max-age=3600' // Cache for 1 hour
    }
  });
};
