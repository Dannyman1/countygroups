import homes from '@/data/homes'
import ListingCard from '@/components/ListingCard'

export default function HomesPage({ searchParams }) {
  const region = searchParams?.region ? String(searchParams.region).toLowerCase() : null

  const filtered = region
    ? homes.filter(h => {
        const fields = [h.state, h.name, h.address].filter(Boolean).map(s => s.toLowerCase())
        return fields.some(f => f.includes(region))
      })
    : homes

  return (
    <div className="listings-bg">
      <div className="listings-overlay" aria-hidden />

      <main className="glass-container max-w-8xl mx-auto px-4 sm:px-6 pt-14 md:pt-16 pb-12 w-full">
        <h1 className="luxury-h1 text-2xl sm:text-3xl text-white font-semibold mb-2">Listings</h1>
        {region ? (
          <p className="text-sm text-white/80 mb-6">Showing results for <strong className="text-white">{searchParams.region}</strong></p>
        ) : (
          <p className="text-sm text-white/80 mb-6">Explore curated listings across our markets.</p>
        )}

        <section className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-8 mt-6">
          {filtered?.length ? filtered.map((home, idx) => (
            <ListingCard key={home?.id ?? idx} home={home} idx={idx} />
          )) : (
            <div className="col-span-full text-center text-white/80 py-12">No listings found for that region.</div>
          )}
        </section>
      </main>
    </div>
  )
}
