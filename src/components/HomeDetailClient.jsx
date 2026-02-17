"use client"

import { useState } from "react";
import ContactModal from "./ContactModal";
import Image from 'next/image';
import { sanitizeUrl, pickFirstImage } from '@/lib/imageUtils'

export default function HomeDetailClient({ home }) {
  const [pressed, setPressed] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [action, setAction] = useState("Buy");

  if (!home) return null;

  function openModal(a) {
    setAction(a);
    setModalOpen(true);
  }

  return (
    <main className="max-w-5xl mx-auto pt-14 md:pt-16" style={{ paddingLeft: '34px', paddingRight: '34px', paddingBottom: '34px' }}>
      <article className="bg-white border-2 border-orange-500 rounded-3xl overflow-hidden shadow-lg">
        <div className="md:flex">
          {/* Image column */}
          <div className="md:w-1/2 relative h-80 md:h-auto">
              <div
              onPointerDown={() => setPressed(true)}
              onPointerUp={() => setPressed(false)}
              onPointerLeave={() => setPressed(false)}
              className="h-full w-full overflow-hidden relative"
            >
              {(() => {
                const src = pickFirstImage(home);
                if (!src) return <div className="w-full h-full bg-stone-100" />;
                return (
                  <Image
                    src={src}
                    alt={home.title || home.name || 'Listing'}
                    fill
                    className="w-full h-full object-cover transition-transform duration-300"
                    style={{ transform: pressed ? 'scale(1.06)' : 'scale(1)' }}
                    priority
                  />
                )
              })()}

              <span className="absolute top-4 left-4 bg-orange-600 text-white text-xs font-semibold px-3 py-1 rounded-full">{home.tag}</span>
              <span className="absolute top-4 right-4 bg-white/90 text-stone-950 text-sm font-semibold px-3 py-1 rounded-md">{home.price}</span>
            </div>
          </div>

          {/* Details column */}
          <div className="md:w-1/2 p-6 flex flex-col justify-between">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-stone-950">{home.title}</h1>
              <p className="mt-2 text-sm text-stone-600">{home.location} — <span className="font-medium text-stone-950">{home.state}</span></p>

              <div className="mt-6 space-y-4">
                <div>
                  <h2 className="text-sm font-semibold text-stone-950">Overview</h2>
                  <p className="mt-2 text-sm text-stone-600">This is a demo listing for {home.title} located in {home.location}. Replace with real data as needed.</p>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="p-3 bg-gray-50 border rounded-lg">
                    <div className="text-xs text-stone-600">State</div>
                    <div className="text-sm font-medium text-stone-950">{home.state}</div>
                  </div>

                  <div className="p-3 bg-gray-50 border rounded-lg">
                    <div className="text-xs text-stone-600">Tag</div>
                    <div className="text-sm font-medium text-stone-950">{home.tag}</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6 flex gap-3">
              <button onClick={() => openModal('Buy')} className="flex-1 px-5 py-3 bg-orange-600 text-white rounded-2xl font-semibold shadow-sm hover:bg-orange-700 transition">Buy Now</button>
              <button onClick={() => openModal('Rent')} className="flex-1 px-5 py-3 border-2 border-orange-500 text-orange-600 rounded-2xl font-semibold hover:bg-orange-50 transition">Rent Now</button>
            </div>
          </div>
        </div>
      </article>

      <ContactModal open={modalOpen} onClose={() => setModalOpen(false)} home={home} action={action} />
    </main>
  );
}
