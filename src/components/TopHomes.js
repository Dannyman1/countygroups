"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import { pickFirstImage } from '@/lib/imageUtils'
import SafeImage from '@/components/SafeImage'
import fallbackImages from '@/data/fallbackImages'

export default function TopHomes({ state }) {
  const [homes, setHomes] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const params = new URLSearchParams();
    params.set("count", "5");
    params.set("category", "top");
    if (state) params.set("state", state);

    fetch(`/api/homes?${params.toString()}`)
      .then((r) => r.json())
      .then((data) => setHomes(data))
      .catch(() => setHomes([]))
      .finally(() => setLoading(false));
  }, [state]);

  if (loading) {
    return (
      <section className="w-full bg-white py-16">
        <div className="max-w-7xl mx-auto px-6">Loading...</div>
      </section>
    );
  }

  return (
    <section className="w-full bg-white py-16">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="flex items-end justify-between mb-8">
          <div>
            <h2 className="text-3xl font-semibold text-stone-950">Top Homes Right Now</h2>
            <p className="mt-2 text-stone-600 max-w-md">
              Hand-picked homes offering the best value across top locations.
            </p>
          </div>

          <button className="hidden md:inline-flex text-orange-600 font-medium hover:underline">View all</button>
        </div>

        {/* Swiper */}
        <Swiper
          modules={[Navigation]}
          navigation
          spaceBetween={24}
          slidesPerView={1.1}
          breakpoints={{ 640: { slidesPerView: 2.2 }, 1024: { slidesPerView: 3.2 } }}
          className="pb-4"
        >
          {homes.map((home, idx) => (
            <SwiperSlide key={home.id}>
              <div
                role="button"
                onClick={() => router.push(`/homes/${home.id}`)}
                className="cursor-pointer group rounded-2xl border border-stone-200 overflow-hidden hover:shadow-xl transition bg-white"
              >
                <div className="relative h-56 overflow-hidden">
                  <div className="relative h-56 sm:h-64 md:h-72 overflow-hidden">
                  {(() => {
                    const src = pickFirstImage(home);
                    const start = fallbackImages && fallbackImages.length ? idx % fallbackImages.length : 0;
                    const rotated = fallbackImages ? [...fallbackImages.slice(start), ...fallbackImages.slice(0, start)] : [];
                    const candidates = src ? [src, ...rotated] : rotated;
                    return (
                      <SafeImage srcList={candidates} alt={home.title || home.name || 'Listing'} fill={true} className="h-full w-full object-cover group-hover:scale-105 transition duration-500" priority={idx === 0} />
                    )
                  })()}
                  <span className="absolute top-4 left-4 bg-orange-600 text-white text-xs font-semibold px-3 py-1 rounded-full">
                    {home.tag}
                  </span>
                </div>

                <div className="p-5">
                  <h3 className="text-lg font-semibold text-stone-950 leading-snug">{home.title || home.name}</h3>
                  <p className="mt-1 text-sm text-stone-600">{home.location}</p>

                  <div className="mt-4 flex items-center justify-between">
                    <span className="text-orange-600 font-bold text-lg">{home.price}</span>
                    <button className="text-sm font-medium text-stone-950 hover:text-orange-600 transition">Compare →</button>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}