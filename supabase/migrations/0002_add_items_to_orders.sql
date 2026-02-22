-- Migration: add `items` column to `orders`
-- Run this in Supabase SQL editor or via your migration tooling

BEGIN;

-- Add JSONB `items` column with a safe default
ALTER TABLE IF EXISTS public.orders
ADD COLUMN IF NOT EXISTS items jsonb NOT NULL DEFAULT '[]'::jsonb;

-- Optional: update existing rows that may have NULL items
UPDATE public.orders SET items = '[]'::jsonb WHERE items IS NULL;

COMMIT;
