"use client"

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import ContactModal from "./ContactModal";
import StateFilter from "./StateFilter";
import homesData from "../data/homes";
import fallbackImages from "../data/fallbackImages";

import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import { sanitizeUrl, pickFirstImage } from '@/lib/imageUtils'
import SafeImage from '@/components/SafeImage'

import { motion } from 'framer-motion'
import { Heart, MapPin, ArrowRight, Search } from 'lucide-react'

function twoImagesFor(home, idx){
  const imgs = (home?.images && home.images.length) ? home.images : (home?.image ? [home.image] : []);
  // If no images provided, use a fallback image (cycled by index)
  if (!imgs || imgs.length === 0){
    const fb = fallbackImages?.[idx % (fallbackImages.length || 1)] || '';
    return [fb, fb];
  }

  const img1 = sanitizeUrl(imgs[0]) || null;
  if (!img1){
    const fb = fallbackImages?.[idx % (fallbackImages.length || 1)] || '';
    return [fb, fb];
  }

  if (img1.includes('/seed/')){
    const alt = img1.replace(/(seed\/[^/]+)(\/.*)$/, (m,p,suf) => `${p}-alt${suf}`)
    return [img1, alt]
  }
  return [img1, img1];
}

const cardVariants = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease: 'easeOut' } }
}

export default function HomesList() {
  const [homes, setHomes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [selected, setSelected] = useState(null);
  const [action, setAction] = useState("Buy");
  const [stateFilter, setStateFilter] = useState("");
  const router = useRouter();

  useEffect(() => {
    setLoading(true);
    try {
      let list = homesData || [];
      if (stateFilter) {
        list = list.filter(h => (h.state || '').toLowerCase() === stateFilter.toLowerCase());
      }
      // keep the UI responsive by limiting to 50 results by default
      setHomes(list.slice(0, 50));
    } catch (err) {
      setHomes([]);
    } finally {
      setLoading(false);
    }
  }, [stateFilter]);

  if (loading) return <div className="max-w-7xl mx-auto px-6 py-12 text-center">Loading homes...</div>;

  function onSearchSubmit(e){
    e.preventDefault();
    setStateFilter(query.trim());
  }

  return (
    <div>
      <motion.section
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-gradient-to-b from-[#0b1220] to-[#0f1724] text-white pb-12 rounded-b-3xl shadow-xl"
      >
        <div className="max-w-7xl mx-auto px-6 pt-16 pb-8">
          <motion.h1
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05, duration: 0.5 }}
            className="text-xl sm:text-2xl font-semibold mb-3"
          >
            Find Your <span className="text-orange-400">Dream</span> Home
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.12, duration: 0.45 }}
            className="text-sm sm:text-base text-white/80 mb-6 max-w-2xl"
          >
            Browse curated, premium listings crafted to help you discover the perfect place, cozy, refined and welcoming.
          </motion.p>

          <motion.form onSubmit={onSearchSubmit} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.18, duration: 0.45 }} className="max-w-3xl">
            <div className="flex gap-3 items-center bg-white/6 border border-white/8 p-1 rounded-full shadow-md">
              <input
                aria-label="Search by state, city or keyword"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search states, cities, or keywords"
                className="flex-1 bg-transparent text-white placeholder:text-white/60 px-4 py-3 rounded-full focus:outline-none focus:ring-2 focus:ring-orange-400"
              />

              <button type="submit" className="btn-pill bg-orange-500 text-white px-4 py-2 mr-1 shadow-sm hover:bg-orange-600 transition">
                <Search size={16} />
              </button>
            </div>
          </motion.form>
        </div>
      </motion.section>

      <div className="max-w-7xl mx-auto px-6 py-12">
        <StateFilter value={stateFilter} onChange={(v) => setStateFilter(v)} />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {homes.map((home, idx) => {
            const imgs = twoImagesFor(home, idx);
            // ensure imgs is always an array and contains at least one string
            const safeImgs = (imgs && imgs.length) ? imgs : [fallbackImages?.[idx % (fallbackImages.length || 1)] || ''];
            const title = home.title || home.name || home.address || 'Listing';
            const location = home.location || home.address || '';
            return (
              <motion.article
                key={home.id}
                initial="hidden"
                animate="visible"
                variants={cardVariants}
                whileHover={{ scale: 1.02 }}
                className="card"
                style={{ willChange: 'transform, opacity' }}
                transition={{ duration: 0.25 }}
              >
                <div
                  role="button"
                  onClick={() => router.push(`/homes/${home.id}`)}
                  className="relative h-64 sm:h-72 md:h-80 overflow-hidden cursor-pointer"
                  aria-label={`Open details for ${title}`}
                >
                  <Swiper className="home-swiper h-full" slidesPerView={1}>
                    {safeImgs.map((u, i) => (
                      u ? (
                        <SwiperSlide key={i}>
                          <div className="relative h-64 sm:h-72 md:h-80 w-full overflow-hidden">
                                    <SafeImage
                                      srcList={[u, ...fallbackImages.slice((idx + i) % (fallbackImages.length || 1))]}
                                      alt={`${(home.title || home.name || 'Listing')} image ${i + 1}`}
                                      fill={true}
                                      className="object-cover w-full h-full transition-transform duration-300 hover:scale-105"
                                      quality={85}
                                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                                      priority={i === 0}
                                    />
                          </div>
                        </SwiperSlide>
                      ) : null
                    ))}
                  </Swiper>

                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent pointer-events-none"></div>

                  <div className="absolute top-4 left-4 bg-orange-600 text-white text-xs font-semibold px-3 py-1 rounded-full">{home.tag}</div>
                  <div className="absolute top-4 right-4 bg-white/90 text-stone-900 text-sm font-semibold px-3 py-1 rounded-md">{home.price}</div>
                </div>

                <div className="p-5">
                  <div className="flex items-start justify-between gap-4">
                      <div>
                      <h3 className="font-semibold text-stone-900 text-lg leading-tight">{title}</h3>
                      <p className="mt-1 text-sm text-stone-600 flex items-center gap-2"><MapPin size={14} className="text-stone-500"/>{location}</p>
                    </div>

                      <button aria-label="favorite" className="card-btn" title="Save">
                        <Heart size={16} className="text-stone-700"/>
                      </button>
                  </div>

                  <div className="mt-4 flex items-center justify-between">
                    <div className="text-sm text-stone-600">State: <span className="text-stone-900 font-medium">{home.state}</span></div>
                  </div>

                  <div className="mt-5 flex gap-3">
                    <button
                      onClick={() => { setSelected(home); setAction('Buy'); setModalOpen(true); }}
                      className="flex-1 btn-pill bg-orange-600 text-white font-medium shadow-sm hover:bg-orange-700 active:scale-95 transition"
                      aria-label={`Buy ${title}`}
                    ><span>Buy Now</span><ArrowRight size={16} /></button>

                    <button
                      onClick={() => { setSelected(home); setAction('Rent'); setModalOpen(true); }}
                      className="flex-1 btn-pill border border-stone-200 text-stone-800 bg-white hover:bg-stone-50 transition"
                      aria-label={`Rent ${title}`}
                    >Rent Now</button>
                  </div>
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>

      <ContactModal open={modalOpen} onClose={() => setModalOpen(false)} home={selected} action={action} />
    </div>
  );
}
