import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { createClient } from '@supabase/supabase-js';

/**
 * WARNING:
 * - This route uses the SUPABASE_SERVICE_ROLE_KEY which bypasses Row Level Security.
 * - NEVER expose SUPABASE_SERVICE_ROLE_KEY to clients or commit it to source control.
 * - Restrict usage of this endpoint to trusted callers, add authentication and rate-limiting.
 */

// Environment
const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY!;

if (!SUPABASE_URL || !SERVICE_ROLE_KEY) {
  console.error('Missing required supabase env vars NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY');
}

// Create a server-only Supabase client using the service role key.
// Note: auth options disable session persistence and auto refresh for serverless usage.
const supabaseAdmin = createClient(SUPABASE_URL, SERVICE_ROLE_KEY, {
  auth: { persistSession: false, autoRefreshToken: false, detectSessionInUrl: false },
});

// Zod schema for request body
const orderSchema = z.object({
  full_name: z.string().min(1, 'full_name is required'),
  email: z.string().email('email must be valid'),
  phone: z.string().min(1, 'phone is required'),
  message: z.string().max(2000).optional().nullable(),
  notes: z.string().max(2000).optional().nullable(),
  property_id: z.string().uuid().optional().nullable(),
  amount: z
    .union([z.number().positive(), z.string().regex(/^\d+(\.\d{1,2})?$/, 'invalid amount')])
    .optional()
    .nullable(),
  user_id: z.string().uuid().optional().nullable(), // optional — service role allows setting it
});

// Response helper
const json = (body: unknown, status = 200) =>
  NextResponse.json(body, { status, headers: { 'Content-Type': 'application/json' } });

// POST handler
export async function POST(req: NextRequest) {
  try {
    // Only allow POST
    if (req.method !== 'POST') {
      return json({ error: 'Method not allowed' }, 405);
    }

    const body = await req.json().catch(() => null);
    if (!body) return json({ error: 'Invalid JSON body' }, 400);

    // Validate input with zod
    const parseResult = orderSchema.safeParse(body);
    if (!parseResult.success) {
      // Return first validation error message
      const firstError = parseResult.error.errors[0];
      return json({ error: firstError?.message || 'Invalid input' }, 400);
    }
    const payload = parseResult.data;

    // Normalize amount to numeric (Postgres numeric)
    if (payload.amount !== null && payload.amount !== undefined) {
      if (typeof payload.amount === 'string') payload.amount = Number(payload.amount);
    }

    // Build insert object: only include allowed keys
    const insertPayload: Record<string, any> = {
      full_name: payload.full_name.trim(),
      email: payload.email.trim(),
      phone: payload.phone.trim(),
      message: payload.message ?? null,
      notes: payload.notes ?? null,
      property_id: payload.property_id ?? null,
      amount: payload.amount ?? null,
      user_id: payload.user_id ?? null, // service role allows you to set this
    };

    // Insert using the service role (bypasses RLS) — choose whether you need .select()
    const { data, error } = await supabaseAdmin
      .from('orders')
      .insert([insertPayload])
      .select('*')
      .limit(1)
      .single();

    if (error) {
      console.error('Supabase insert error (service role):', error);
      return json({ error: error.message }, 500);
    }

    return json({ order: data }, 201);
  } catch (err: any) {
    console.error('Unexpected error in /api/orders:', err);
    return json({ error: 'Internal server error' }, 500);
  }
}