'use client'
import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabaseclient'

export default function AdminProducts() {
  const [title, setTitle] = useState('')
  const [price, setPrice] = useState('')
  const [file, setFile] = useState(null)
  const [products, setProducts] = useState([])

  async function loadProducts() {
    const { data } = await supabase
      .from('properties')
      .select('*, property_images(id, image_url)')
      .order('created_at', { ascending: false })

    setProducts(data || [])
  }

  async function addProduct() {
    if (!title || !price) return alert('Fill all fields')

    const { data: product, error } = await supabase
      .from('properties')
      .insert({ title, price: Number(price) })
      .select()
      .single()

    if (error) return alert(error.message)

    if (file) {
      const { data: upload } = await supabase.storage
        .from('property-images')
        .upload(`${product.id}/${file.name}`, file)

      const imageUrl = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/property-images/${upload?.path}`

      await supabase.from('property_images').insert({
        property_id: product.id,
        image_url: imageUrl
      })
    }

    setTitle('')
    setPrice('')
    setFile(null)
    loadProducts()
  }

  async function deleteProduct(id) {
    await supabase.from('properties').delete().eq('id', id)
    loadProducts()
  }

  async function deleteImage(id) {
    await supabase.from('property_images').delete().eq('id', id)
    loadProducts()
  }

  useEffect(() => {
    loadProducts()
  }, [])

  return (
    <div className="p-6">
      <h1 className="text-xl font-semibold mb-4">Manage Products</h1>

      <div className="bg-white/5 p-4 rounded mb-6 space-y-2">
        <input className="p-2 w-full" placeholder="Title" value={title} onChange={e => setTitle(e.target.value)} />
        <input className="p-2 w-full" placeholder="Price" value={price} onChange={e => setPrice(e.target.value)} />
        <input type="file" onChange={e => setFile(e.target.files?.[0] || null)} />
        <button onClick={addProduct} className="bg-blue-600 px-4 py-2 rounded">
          Add Product
        </button>
      </div>

      {products.map(p => (
        <div key={p.id} className="border p-4 mb-4 rounded">
          <h2>{p.title} - ${p.price}</h2>

          <div className="flex gap-3 flex-wrap">
            {p.property_images?.map((img) => (
              <div key={img.id} className="relative">
                <img src={img.image_url} className="w-32 h-32 object-cover" />
                <button
                  onClick={() => deleteImage(img.id)}
                  className="absolute top-1 right-1 bg-red-600 text-xs px-2 py-1 rounded"
                >
                  X
                </button>
              </div>
            ))}
          </div>

          <button
            onClick={() => deleteProduct(p.id)}
            className="mt-3 bg-red-700 px-3 py-1 rounded"
          >
            Delete Product
          </button>
        </div>
      ))}
    </div>
  )
}
