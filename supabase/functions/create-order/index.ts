import 'jsr:@supabase/functions-js/edge-runtime.d.ts'
import { createClient } from 'npm:@supabase/supabase-js@2'

/**
 * Allowed origins
 */
const ALLOWED_ORIGINS = [
  'http://localhost:3000',
  'https://yourdomain.com',
]

function buildCorsHeaders(origin: string | null) {
  if (origin && ALLOWED_ORIGINS.includes(origin)) {
    return {
      'Access-Control-Allow-Origin': origin,
      'Access-Control-Allow-Headers': 'authorization, apikey, content-type, x-client-info, x-supabase-auth-token',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Vary': 'Origin',
    }
  }

  // Safe fallback (prevents CORS crash)
  return {
    'Access-Control-Allow-Origin': 'http://localhost:3000',
    'Access-Control-Allow-Headers': 'authorization, apikey, content-type, x-client-info, x-supabase-auth-token',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
  }
}

function json(req: Request, body: unknown, status = 200) {
  const origin = req.headers.get('origin')
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      'Content-Type': 'application/json',
      ...buildCorsHeaders(origin),
    },
  })
}

Deno.serve(async (req: Request) => {
  const origin = req.headers.get('origin')

  // ✅ Handle CORS preflight FIRST
  if (req.method === 'OPTIONS') {
    return new Response(null, {
      status: 204,
      headers: buildCorsHeaders(origin),
    })
  }

  if (req.method !== 'POST') {
    return json(req, { error: 'Method not allowed' }, 405)
  }

  if (!req.headers.get('content-type')?.includes('application/json')) {
    return json(req, { error: 'Content-Type must be application/json' }, 415)
  }

  let payload: any
  try {
    payload = await req.json()
  } catch {
    return json(req, { error: 'Invalid JSON body' }, 400)
  }

  // ✅ Validate required fields based on your table
  if (typeof payload?.amount !== 'number' || payload.amount < 0) {
    return json(req, { error: 'Invalid amount' }, 400)
  }

  if (!payload?.property_id) {
    return json(req, { error: 'property_id is required' }, 400)
  }

  const SUPABASE_URL = Deno.env.get('SUPABASE_URL')
  const SERVICE_KEY = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')

  if (!SUPABASE_URL || !SERVICE_KEY) {
    return json(req, { error: 'Server configuration error' }, 500)
  }

  const supabase = createClient(SUPABASE_URL, SERVICE_KEY)

  // ✅ Only columns that actually exist in your orders table
  const order = {
    user_id: typeof payload.user_id === 'string' ? payload.user_id : null,
    full_name: typeof payload.full_name === 'string' ? payload.full_name : null,
    email: typeof payload.email === 'string' ? payload.email : null,
    phone: typeof payload.phone === 'string' ? payload.phone : null,
    message: typeof payload.message === 'string' ? payload.message : null,
    property_id: payload.property_id,
    amount: payload.amount,
    currency:
      typeof payload.currency === 'string'
        ? payload.currency.toUpperCase()
        : 'USD',
    status: 'pending',
    notes: typeof payload.notes === 'string' ? payload.notes : null,
  }

  try {
    const { data, error } = await supabase
      .from('orders')
      .insert(order)
      .select()
      .single()

    if (error) {
      console.error('Insert error:', error.message)
      return json(req, { error: 'Database insert failed' }, 500)
    }

    return json(req, { order: data }, 201)
  } catch (err) {
    console.error('Unexpected error:', err)
    return json(req, { error: 'Unexpected server error' }, 500)
  }
})