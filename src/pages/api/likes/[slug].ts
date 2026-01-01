import type { APIRoute } from 'astro';
import { db, Likes, eq, sql } from 'astro:db';

export const prerender = false;

export const GET: APIRoute = async ({ params }) => {
  const slug = params.slug;

  if (!slug) {
    return new Response(JSON.stringify({ error: 'Slug is required' }), { status: 400 });
  }

  let likeData = await db.select().from(Likes).where(eq(Likes.slug, slug)).get();

  if (!likeData) {
    // If no record exists, return 0
    return new Response(JSON.stringify({ count: 0 }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  }

  return new Response(JSON.stringify({ count: likeData.count }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' }
  });
};

export const POST: APIRoute = async ({ params, request }) => {
  console.log('POST request received for:', params.slug);
  console.log('Request headers:', Object.fromEntries(request.headers));
  const slug = params.slug;

  if (!slug) {
    return new Response(JSON.stringify({ error: 'Slug is required' }), { status: 400 });
  }

  try {
    // Try to insert a new row. If it conflicts (already exists), update the count.
    await db.insert(Likes).values({ slug, count: 1 }).onConflictDoUpdate({
      target: Likes.slug,
      set: { count: sql`count + 1` }
    });

    const updated = await db.select().from(Likes).where(eq(Likes.slug, slug)).get();

    return new Response(JSON.stringify({ count: updated?.count || 0 }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (e) {
    console.error(e);
    return new Response(JSON.stringify({ error: 'Database error' }), { status: 500 });
  }
};
