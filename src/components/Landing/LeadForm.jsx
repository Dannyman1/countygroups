import React from 'react'

export default function LeadForm(){
  return (
    <section className="container mx-auto px-6 py-12 text-white">
      <div className="max-w-2xl mx-auto bg-white/5 p-6 rounded-lg">
        <h3 className="text-2xl font-bold mb-3">Get Property Alerts & Free Buying Guide</h3>
        <p className="text-sm mb-4">Sign up and we’ll send hand-picked homes that match your criteria. Includes our free Orange County buying guide.</p>
        <form className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <input aria-label="Name" placeholder="Full name" className="p-3 rounded bg-transparent border border-white/20 text-white" />
          <input aria-label="Email" placeholder="Email" className="p-3 rounded bg-transparent border border-white/20 text-white" />
          <div className="flex">
            <input aria-label="Phone" placeholder="Phone" className="p-3 rounded-l bg-transparent border border-white/20 text-white flex-1" />
            <button className="bg-[#FFD700] text-black px-6 rounded-r">Get Alerts</button>
          </div>
        </form>
      </div>
    </section>
  )
}
