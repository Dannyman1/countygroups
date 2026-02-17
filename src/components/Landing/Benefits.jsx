import React from 'react'

const benefits = [
  {icon: '📍', title: 'Local Expertise', text: 'Deep knowledge of Orange County neighborhoods and market trends.'},
  {icon: '🎥', title: 'Virtual Tours', text: 'High-quality video & 3D tours to preview homes from anywhere.'},
  {icon: '⚡', title: 'Fast Response', text: 'Dedicated agents respond quickly to requests and showings.'},
  {icon: '🔒', title: 'Trusted Process', text: 'Transparent pricing, secure offers, and guided closing.'},
  {icon: '📈', title: 'Pro Marketing', text: 'Professional photography, social ads, and MLS syndication.'},
  {icon: '🤝', title: 'Full Support', text: 'From search to close — mortgage, inspections and staging help.'},
]

export default function Benefits(){
  return (
    <section className="container mx-auto px-6 py-12 text-white">
      <h3 className="text-2xl font-bold mb-6">Why Choose Us</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-6">
        {benefits.map((b,i) => (
          <div key={i} className="bg-white/5 p-6 rounded-lg text-center">
            <div className="text-3xl mb-3">{b.icon}</div>
            <h4 className="font-semibold mb-2">{b.title}</h4>
            <p className="text-sm text-white/85">{b.text}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
