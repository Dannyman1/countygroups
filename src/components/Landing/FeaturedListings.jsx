import React from 'react'
import VideoCarousel from './VideoCarousel'

export default function FeaturedListings(){
  return (
    <section className="container mx-auto px-6 py-12">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold">Discover Our Featured Listings</h2>
        <button className="text-white/80 border border-white/20 px-4 py-2 rounded">View All</button>
      </div>
      <VideoCarousel />
    </section>
  )
}
