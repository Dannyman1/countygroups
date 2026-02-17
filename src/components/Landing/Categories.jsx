import React from 'react'

const categories = [
  {title:'Residential', subtitle:'Homes & Apartments'},
  {title:'Studio', subtitle:'Compact living'},
  {title:'Single Family', subtitle:'Family homes'},
  {title:'Villa', subtitle:'Luxury villas'},
]

export default function Categories(){
  return (
    <section className="container mx-auto px-6 py-12">
      <h3 className="text-xl font-bold mb-6">Browse By Category</h3>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {categories.map((c,i)=> (
          <div key={i} className="bg-white rounded shadow p-6 text-center">
            {i === 0 ? (
              <img
                src="https://res.cloudinary.com/duovgx8fv/image/upload/w_2400,q_auto,f_auto,dpr_auto/v1770370172/download_17_xzzvf7.jpg"
                alt="Homes & Apartments"
                className="w-full h-32 object-cover rounded mb-4"
              />
            ) : i === 1 ? (
              <img
                src="https://res.cloudinary.com/duovgx8fv/image/upload/w_2400,q_auto,f_auto,dpr_auto/v1770370589/download_18_p7sphn.jpg"
                alt="Compact living"
                className="w-full h-32 object-cover rounded mb-4"
              />
            ) : i === 2 ? (
              <img
                src="https://res.cloudinary.com/duovgx8fv/image/upload/w_2400,q_auto,f_auto,dpr_auto/v1770370762/download_19_v6vgtp.jpg"
                alt="Family homes"
                className="w-full h-32 object-cover rounded mb-4"
              />
            ) : i === 3 ? (
              <img
                src="https://res.cloudinary.com/duovgx8fv/image/upload/w_2400,q_auto,f_auto,dpr_auto/v1770371344/download_22_oiwxhy.jpg"
                alt="Luxury villas"
                className="w-full h-32 object-cover rounded mb-4"
              />
            ) : (
              <div className="h-32 bg-gray-100 rounded mb-4" />
            )}
            <h4 className="font-semibold">{c.title}</h4>
            <p className="text-sm text-gray-500">{c.subtitle}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
