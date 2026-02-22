import ListingCard from '@/components/ListingCard'
import { createServerSupabase } from '@/lib/supabase/server'

export default async function HomesPage({ searchParams }) {
  // `searchParams` may be a Promise in some Next.js versions; await defensively
  const sp = await searchParams
  const regionRaw = sp?.region
  const region = regionRaw ? String(regionRaw).trim().toLowerCase() : null

  let data = []
  try {
    const supabase = await createServerSupabase()

    // Choose columns you actually want to render
    const columns = 'id,title,description,price,location,created_at'

    if (region) {
      const term = `%${region}%`
      const { data: d, error } = await supabase
        .from('properties')
        .select(columns)
        .or(`location.ilike.${term},title.ilike.${term},description.ilike.${term}`)
        .order('created_at', { ascending: false })
        .limit(24)

      if (error) {
        console.error('Supabase error fetching properties (search):', error)
        throw error
      }
      data = d ?? []
    } else {
      const { data: d, error } = await supabase
        .from('properties')
        .select(columns)
        .order('created_at', { ascending: false })
        .limit(24)

      if (error) {
        console.error('Supabase error fetching properties (all):', error)
        throw error
      }
      data = d ?? []
    }
  } catch (err) {
    console.error('Failed to load properties:', err)
    data = []
  }

  return (
    <div className="listings-bg">
      <div className="listings-overlay" aria-hidden />

      <main className="glass-container max-w-8xl mx-auto px-4 sm:px-6 pt-14 md:pt-16 pb-12 w-full">
        <h1 className="luxury-h1 text-2xl sm:text-3xl text-white font-semibold mb-2">Listings</h1>
        {region ? (
          <p className="text-sm text-white/80 mb-6">Showing results for <strong className="text-white">{String(regionRaw)}</strong></p>
        ) : (
          <p className="text-sm text-white/80 mb-6">Explore curated listings across our markets.</p>
        )}

        <section className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-8 mt-6">
          {data?.length ? data.map((property, idx) => (
            <ListingCard key={property?.id ?? idx} home={property} idx={idx} />
          )) : (
            <div className="col-span-full text-center text-white/80 py-12">No listings found for that region.</div>
          )}
        </section>
      </main>
    </div>
  )
}