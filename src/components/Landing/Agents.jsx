import React from 'react'

const agents = [
  {name:'Mia Thompson', title:'Lead Agent', bio:'10+ years in luxury residential sales.'},
  {name:'James Ortiz', title:'Buyer Specialist', bio:'Local market expert with negotiation focus.'},
]

export default function Agents(){
  return (
    <section className="container mx-auto px-6 py-12 text-white">
      <h3 className="text-2xl font-bold mb-6">Meet Our Team</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {agents.map((a,i) => (
          <div key={i} className="bg-white/5 p-6 rounded-lg flex gap-4 items-center">
            {i === 0 ? (
              <img
                src="https://res.cloudinary.com/duovgx8fv/image/upload/w_800,q_auto,f_auto,dpr_auto/v1770371688/download_23_xqphsk.jpg"
                alt={`${a.name} avatar`}
                className="w-20 h-20 rounded-full object-cover"
              />
            ) : i === 1 ? (
              <img
                src="https://res.cloudinary.com/duovgx8fv/image/upload/w_800,q_auto,f_auto,dpr_auto/v1770371685/download_24_nqf56a.jpg"
                alt={`${a.name} avatar`}
                className="w-20 h-20 rounded-full object-cover"
              />
            ) : (
              <div className="w-20 h-20 rounded-full bg-gray-600" />
            )}
            <div>
              <h4 className="font-semibold">{a.name}</h4>
              <div className="text-sm text-white/80">{a.title}</div>
              <p className="text-sm mt-2">{a.bio}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
