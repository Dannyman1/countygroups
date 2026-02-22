'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabaseclient'

type Home = {
  id: string
  title: string
  price: number
  location: string
  description: string
  property_images?: { id: string; image_url: string }[]
}

export default function AdminHomes() {
  const [homes, setHomes] = useState<Home[]>([])
  const [form, setForm] = useState({
    title: '',
    price: '',
    location: '',
    description: ''
  })
  const [files, setFiles] = useState<File[]>([])
  const [editingId, setEditingId] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [showForm, setShowForm] = useState(false)

  async function fetchHomes() {
    const { data, error } = await supabase
      .from('properties')
      .select('*, property_images(id, image_url)')
      .order('created_at', { ascending: false })

    if (!error) setHomes(data || [])
  }

  useEffect(() => {
    fetchHomes()
  }, [])

  async function createHome() {
    setLoading(true)
    const { data: home, error } = await supabase
      .from('properties')
      .insert({
        title: form.title,
        price: Number(form.price),
        location: form.location,
        description: form.description
      })
      .select()
      .single()

    if (error) {
      alert(error.message)
      setLoading(false)
      return
    }

    if (files.length) {
      for (const file of files) {
        const path = `${home.id}/${Date.now()}-${file.name}`
        const { data: upload } = await supabase.storage
          .from('property-images')
          .upload(path, file)

        const imageUrl = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/property-images/${upload?.path}`

        await supabase.from('property_images').insert({
          property_id: home.id,
          image_url: imageUrl
        })
      }
    }

    resetForm()
    setShowForm(false)
    fetchHomes()
    setLoading(false)
  }

  async function updateHome() {
    if (!editingId) return

    setLoading(true)
    const { error } = await supabase
      .from('properties')
      .update({
        title: form.title,
        price: Number(form.price),
        location: form.location,
        description: form.description
      })
      .eq('id', editingId)

    if (error) alert(error.message)

    if (files.length) {
      for (const file of files) {
        const path = `${editingId}/${Date.now()}-${file.name}`
        const { data: upload } = await supabase.storage
          .from('property-images')
          .upload(path, file)

        const imageUrl = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/property-images/${upload?.path}`

        await supabase.from('property_images').insert({
          property_id: editingId,
          image_url: imageUrl
        })
      }
    }

    resetForm()
    setShowForm(false)
    fetchHomes()
    setLoading(false)
  }

  async function deleteHome(id: string) {
    if (!confirm('Delete this home?')) return
    await supabase.from('properties').delete().eq('id', id)
    fetchHomes()
  }

  async function deleteImage(imageId: string) {
    await supabase.from('property_images').delete().eq('id', imageId)
    fetchHomes()
  }

  function startEdit(home: Home) {
    setEditingId(home.id)
    setForm({
      title: home.title,
      price: String(home.price),
      location: home.location,
      description: home.description
    })
    setShowForm(true)
  }

  function resetForm() {
    setForm({ title: '', price: '', location: '', description: '' })
    setFiles([])
    setEditingId(null)
    setShowForm(false)
  }

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-8">
      <h1 className="text-2xl font-semibold">Manage Homes</h1>

      {/* Form */}
      {!showForm && !editingId ? (
        <div className="mb-4">
          <button onClick={() => setShowForm(true)} className="bg-[#FFD700] text-black px-4 py-2 rounded">Add Home</button>
        </div>
      ) : (
        <div className="bg-white/5 p-4 rounded space-y-3">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <input
              className="p-2 rounded bg-black/30"
              placeholder="Title"
              value={form.title}
              onChange={e => setForm({ ...form, title: e.target.value })}
            />
            <input
              className="p-2 rounded bg-black/30"
              placeholder="Price"
              type="number"
              value={form.price}
              onChange={e => setForm({ ...form, price: e.target.value })}
            />
            <input
              className="p-2 rounded bg-black/30"
              placeholder="Location"
              value={form.location}
              onChange={e => setForm({ ...form, location: e.target.value })}
            />
            <textarea
              className="p-2 rounded bg-black/30 md:col-span-2"
              placeholder="Description"
              value={form.description}
              onChange={e => setForm({ ...form, description: e.target.value })}
            />
          </div>

          <input
            type="file"
            multiple
            onChange={e => setFiles(Array.from(e.target.files || []))}
          />

          <div className="flex gap-3">
            {!editingId ? (
              <button
                onClick={createHome}
                disabled={loading}
                className="bg-blue-600 px-4 py-2 rounded"
              >
                {loading ? 'Saving...' : 'Add Home'}
              </button>
            ) : (
              <>
                <button
                  onClick={updateHome}
                  disabled={loading}
                  className="bg-green-600 px-4 py-2 rounded"
                >
                  {loading ? 'Updating...' : 'Update Home'}
                </button>
                <button onClick={resetForm} className="bg-gray-600 px-4 py-2 rounded">
                  Cancel
                </button>
              </>
            )}

            <button onClick={() => { resetForm(); setShowForm(false) }} className="bg-white/5 px-4 py-2 rounded text-sm">Hide</button>
          </div>
        </div>
      )}

      {/* Homes List */}
      {homes.length === 0 ? (
        <div className="p-6 border rounded text-center text-white/80">
          <p className="mb-3">No homes yet.</p>
          {!showForm && (
            <button onClick={() => setShowForm(true)} className="bg-[#FFD700] text-black px-4 py-2 rounded">Add Home</button>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {homes.map(home => (
            <div key={home.id} className="border p-4 rounded space-y-3 bg-white/2">
              <div className="flex justify-between items-center">
                <h2 className="font-semibold text-sm sm:text-base">
                  {home.title} – ${home.price}
                </h2>
                <div className="flex gap-2">
                  <button onClick={() => startEdit(home)} className="text-blue-400 text-xs sm:text-sm">
                    Edit
                  </button>
                  <button onClick={() => deleteHome(home.id)} className="text-red-400 text-xs sm:text-sm">
                    Delete
                  </button>
                </div>
              </div>

              <p className="text-sm opacity-80">{home.location}</p>
              <p className="text-sm">{home.description}</p>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {home.property_images?.map(img => (
                  <div key={img.id} className="relative">
                    <img
                      src={img.image_url}
                      className="w-full h-32 sm:h-28 object-cover rounded"
                    />
                    <button
                      onClick={() => deleteImage(img.id)}
                      className="absolute top-1 right-1 bg-red-600 text-xs px-2 py-1 rounded"
                    >
                      ✕
                    </button>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
