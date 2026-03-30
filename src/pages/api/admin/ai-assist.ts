export const prerender = false;

import type { APIRoute } from 'astro';

export const POST: APIRoute = async ({ request }) => {
  const apiKey = import.meta.env.CLAUDE_API_KEY;

  if (!apiKey) {
    return new Response(JSON.stringify({
      response: 'Claude API key not configured. Add CLAUDE_API_KEY to your .env file to enable the AI assistant.',
    }), { headers: { 'Content-Type': 'application/json' } });
  }

  const { message } = await request.json();

  // Read compositions data for context
  let compositionsContext = '';
  try {
    const { readdirSync, readFileSync } = await import('node:fs');
    const { join } = await import('node:path');
    const dir = join(process.cwd(), 'src/content/compositions');
    const files = readdirSync(dir).filter(f => f.endsWith('.json'));
    const comps = files.map(f => {
      const content = readFileSync(join(dir, f), 'utf-8');
      return { id: f.replace('.json', ''), ...JSON.parse(content) };
    });
    compositionsContext = JSON.stringify(comps, null, 2);
  } catch {
    compositionsContext = 'Unable to read compositions data.';
  }

  try {
    const res = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model: 'claude-sonnet-4-20250514',
        max_tokens: 2048,
        system: `You are a catalog assistant for a composer's website. You help manage composition metadata, rewrite program notes, suggest tags, and standardize data. You have access to the full compositions catalog.

When proposing changes, format them as diffs showing the file, field, old value, and new value. Be specific and actionable.

Current catalog data:
${compositionsContext}`,
        messages: [{ role: 'user', content: message }],
      }),
    });

    const data = await res.json();
    const text = data.content?.[0]?.text || 'No response from Claude.';

    return new Response(JSON.stringify({ response: text }), {
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (err) {
    return new Response(JSON.stringify({
      error: 'Failed to reach Claude API. Check your API key and network connection.',
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};
