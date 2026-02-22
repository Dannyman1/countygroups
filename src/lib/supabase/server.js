import { supabase } from '@/lib/supabaseclient'

export async function createServerSupabase() {
  // Return the existing supabase client for server use.
  return supabase
}
