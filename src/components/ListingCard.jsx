import Link from 'next/link'
import { sanitizeUrl } from '@/lib/imageUtils'
import fallbackImages from '@/data/fallbackImages'
import SafeImage from '@/components/SafeImage'

export default function ListingCard({ home, idx }){
  const imgs = (home?.images && home.images.length) ? home.images : (home?.image ? [home.image] : []);
  const primary = sanitizeUrl(imgs?.[0]);
  const start = fallbackImages && fallbackImages.length ? idx % fallbackImages.length : 0;
  const rotatedFallbacks = fallbackImages ? [...fallbackImages.slice(start), ...fallbackImages.slice(0, start)] : [];
  const candidates = primary ? [primary, ...rotatedFallbacks] : rotatedFallbacks;

  return (
    <article className="card glass-card rounded-2xl overflow-hidden h-full flex flex-col w-full">
      <Link href={`/homes/${home.id}`} className="block relative h-72 sm:h-80 md:h-96 w-full overflow-hidden">
        <SafeImage
          srcList={candidates}
          alt={home?.title || home?.name || 'Listing'}
          fill={true}
          className="object-cover w-full h-full transition-transform duration-300 hover:scale-105"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          priority={idx === 0}
        />
      </Link>

      <div className="p-4 flex-1 flex flex-col justify-between">
        <div>
          <h3 className="text-xl sm:text-2xl font-semibold text-white leading-tight">{home?.title || home?.name || 'Listing'}</h3>
          <p className="text-sm sm:text-base text-white/80 mt-1">{home?.location || home?.address || ''}</p>
        </div>

        <div className="mt-4 flex items-center justify-between">
          <span className="text-amber-400 font-bold">{home?.price}</span>
          <span className="text-sm text-white/80">{home?.state}</span>
        </div>
      </div>
    </article>
  )
}
