import HomeDetailClient from '@/components/HomeDetailClient'
import { createServerSupabase } from '@/lib/supabase/server'

export default async function HomeDetail({ params }) {
  const resolved = await params
  const id = resolved.id

  try {
    const supabase = await createServerSupabase()
    const { data, error } = await supabase.from('properties').select('*').eq('id', id).single()
    if (error || !data) {
      return (
        <main className="max-w-4xl mx-auto pt-6">
          <h1 className="text-2xl font-semibold">Home not found</h1>
          <p className="mt-1">The requested home does not exist.</p>
        </main>
      )
    }

    return <HomeDetailClient home={data} />
  } catch (err) {
    return (
      <main className="max-w-4xl mx-auto pt-6">
        <h1 className="text-2xl font-semibold">Home not found</h1>
        <p className="mt-1">The requested home does not exist.</p>
      </main>
    )
  }
}
