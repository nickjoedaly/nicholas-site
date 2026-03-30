export const prerender = false;

import type { APIRoute } from 'astro';
import { readFileSync, writeFileSync, existsSync, unlinkSync } from 'node:fs';
import { join } from 'node:path';

const CONTENT_DIR = 'src/content';

function getFilePath(path: string): string {
  // path = "compositions" or "compositions/meridian-lines"
  const parts = path.split('/');
  const collection = parts[0];
  const id = parts[1];

  if (id) {
    return join(process.cwd(), CONTENT_DIR, collection, `${id}.json`);
  }
  return join(process.cwd(), CONTENT_DIR, collection);
}

// GET /api/admin/collections/compositions — list all
// GET /api/admin/collections/compositions/meridian-lines — get one
export const GET: APIRoute = async ({ params }) => {
  const path = params.path || '';
  const parts = path.split('/');

  if (parts.length === 1) {
    // List all items in collection
    const dirPath = getFilePath(path);
    try {
      const { readdirSync } = await import('node:fs');
      const files = readdirSync(dirPath).filter(f => f.endsWith('.json'));
      const items = files.map(f => {
        const content = readFileSync(join(dirPath, f), 'utf-8');
        return { id: f.replace('.json', ''), ...JSON.parse(content) };
      });
      return new Response(JSON.stringify(items), {
        headers: { 'Content-Type': 'application/json' },
      });
    } catch {
      return new Response(JSON.stringify({ error: 'Collection not found' }), { status: 404 });
    }
  }

  // Get single item
  const filePath = getFilePath(path);
  if (!existsSync(filePath)) {
    return new Response(JSON.stringify({ error: 'Not found' }), { status: 404 });
  }
  const content = readFileSync(filePath, 'utf-8');
  return new Response(content, { headers: { 'Content-Type': 'application/json' } });
};

// PUT /api/admin/collections/compositions/meridian-lines — update
export const PUT: APIRoute = async ({ params, request }) => {
  const path = params.path || '';
  const filePath = getFilePath(path);

  if (!existsSync(filePath)) {
    return new Response(JSON.stringify({ error: 'Not found' }), { status: 404 });
  }

  const data = await request.json();
  writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf-8');

  return new Response(JSON.stringify({ success: true, id: path.split('/')[1] }), {
    headers: { 'Content-Type': 'application/json' },
  });
};

// POST /api/admin/collections/compositions — create new
export const POST: APIRoute = async ({ params, request }) => {
  const path = params.path || '';
  const data = await request.json();
  const id = data.id || data.title?.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

  if (!id) {
    return new Response(JSON.stringify({ error: 'ID or title required' }), { status: 400 });
  }

  const filePath = join(process.cwd(), CONTENT_DIR, path, `${id}.json`);

  if (existsSync(filePath)) {
    return new Response(JSON.stringify({ error: 'Already exists' }), { status: 409 });
  }

  const { id: _, ...rest } = data;
  writeFileSync(filePath, JSON.stringify(rest, null, 2), 'utf-8');

  return new Response(JSON.stringify({ success: true, id }), {
    status: 201,
    headers: { 'Content-Type': 'application/json' },
  });
};

// DELETE /api/admin/collections/compositions/meridian-lines — delete
export const DELETE: APIRoute = async ({ params }) => {
  const path = params.path || '';
  const filePath = getFilePath(path);

  if (!existsSync(filePath)) {
    return new Response(JSON.stringify({ error: 'Not found' }), { status: 404 });
  }

  unlinkSync(filePath);
  return new Response(JSON.stringify({ success: true }), {
    headers: { 'Content-Type': 'application/json' },
  });
};
