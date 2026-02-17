import homes from '@/data/homes'
import HomeDetailClient from '@/components/HomeDetailClient'

export default async function HomeDetail({ params }) {
  const resolved = await params
  const id = parseInt(resolved.id, 10)
  const home = homes.find((h) => h.id === id)

  if (!home) {
    return (
      <main className="max-w-4xl mx-auto pt-6">
        <h1 className="text-2xl font-semibold">Home not found</h1>
        <p className="mt-1">The requested home does not exist.</p>
      </main>
    )
  }

  return <HomeDetailClient home={home} />
}
