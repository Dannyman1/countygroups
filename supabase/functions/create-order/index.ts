// Edge Function: create-order
// Public endpoint (no JWT required). Uses SERVICE_ROLE key to write to DB.
// Expects JSON body: { user_id?: string, amount: number, currency?: string, items: any[], metadata?: object }

import 'jsr:@supabase/functions-js/edge-runtime.d.ts';
import { createClient } from 'npm:@supabase/supabase-js@2';

const CORS_HEADERS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, apikey, content-type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
};

Deno.serve(async (req: Request) => {
  // CORS preflight
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: CORS_HEADERS });
  }

  if (req.method !== 'POST') {
    return new Response(JSON.stringify({ error: 'Method not allowed' }), {
      status: 405,
      headers: { ...CORS_HEADERS, 'Content-Type': 'application/json' },
    });
  }

  let payload: any;
  try {
    payload = await req.json();
  } catch (err) {
    return new Response(JSON.stringify({ error: 'Invalid JSON' }), {
      status: 400,
      headers: { ...CORS_HEADERS, 'Content-Type': 'application/json' },
    });
  }

  // Basic validation
  const amount = payload?.amount;
  const items = payload?.items;
  if (typeof amount !== 'number' || isNaN(amount) || amount < 0) {
    return new Response(JSON.stringify({ error: 'Invalid or missing amount' }), {
      status: 400,
      headers: { ...CORS_HEADERS, 'Content-Type': 'application/json' },
    });
  }
  if (!Array.isArray(items)) {
    return new Response(JSON.stringify({ error: 'Invalid or missing items array' }), {
      status: 400,
      headers: { ...CORS_HEADERS, 'Content-Type': 'application/json' },
    });
  }

  // Create supabase client using service role (server-side)
  const supabase = createClient(
    Deno.env.get('SUPABASE_URL') ?? '',
    Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
  );

  const newOrder = {
    user_id: payload.user_id ?? null,
    amount: amount,
    currency: payload.currency ?? 'USD',
    items: items,
    status: payload.status ?? 'pending',
    metadata: payload.metadata ?? {},
  };

  try {
    const { data, error } = await supabase.from('orders').insert(newOrder).select().single();

    if (error) {
      console.error('Insert error', error);
      return new Response(JSON.stringify({ error: 'Database insert failed', details: error.message }), {
        status: 500,
        headers: { ...CORS_HEADERS, 'Content-Type': 'application/json' },
      });
    }

    return new Response(JSON.stringify({ order: data }), {
      status: 201,
      headers: { ...CORS_HEADERS, 'Content-Type': 'application/json' },
    });
  } catch (err) {
    console.error('Unexpected error', err);
    return new Response(JSON.stringify({ error: 'Unexpected server error' }), {
      status: 500,
      headers: { ...CORS_HEADERS, 'Content-Type': 'application/json' },
    });
  }
});
