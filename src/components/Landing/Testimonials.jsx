import React from 'react'

const testimonials = [
  {name:'Sarah M.', text:'Countygroups found our dream home in 2 weeks. Professional and attentive.'},
  {name:'Mark R.', text:'The virtual tour and marketing brought multiple offers in a weekend.'},
  {name:'Angela P.', text:'Helpful agents and a smooth closing process — highly recommend.'},
]

export default function Testimonials(){
  return (
    <section className="container mx-auto px-6 py-12 text-white">
      <h3 className="text-2xl font-bold mb-6">What Our Clients Say</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {testimonials.map((t,i) => (
          <blockquote key={i} className="bg-white/5 p-6 rounded-lg">
            <p className="mb-4">“{t.text}”</p>
            <footer className="text-sm font-semibold">— {t.name}</footer>
          </blockquote>
        ))}
      </div>
    </section>
  )
}
