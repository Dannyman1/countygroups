"use client"

import { useState, useEffect, useRef } from "react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { Search } from "lucide-react"

export default function SearchBar() {
  const [q, setQ] = useState("")
  const router = useRouter()
  const [open, setOpen] = useState(false)
  const [suggestions, setSuggestions] = useState([])
  const debounceRef = useRef(null)

  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current)
    if (q.trim().length < 2) {
      setSuggestions([])
      return
    }

    debounceRef.current = setTimeout(() => {
      fetch(`/api/homes?search=${encodeURIComponent(q.trim())}&count=5`)
        .then(r => r.json())
        .then(data => setSuggestions(data || [])).catch(()=>setSuggestions([]))
    }, 250)

    return () => clearTimeout(debounceRef.current)
  }, [q])

  function submit(e) {
    e.preventDefault()
    if (!q.trim()) return
    router.push(`/homes?region=${encodeURIComponent(q.trim())}`)
  }

  return (
    <motion.form onSubmit={submit} className="max-w-3xl mx-auto w-full" whileTap={{ scale: 0.995 }}>
      <div className="relative w-full">
        <div className="flex items-center gap-3 bg-white/5 border border-white/20 rounded-full px-3 py-2">
        <Search className="w-5 h-5 text-white/80" />
        <input
          value={q}
          onChange={(e) => { setQ(e.target.value); setOpen(true) }}
          placeholder="Search by address, city, state, or ZIP code"
          className="flex-1 bg-transparent text-white placeholder-white/70 outline-none px-2 py-2"
        />
        <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} type="submit" className="bg-orange-600 hover:bg-orange-700 text-white font-medium px-5 py-2 rounded-full">
          Search
        </motion.button>
        </div>

        {open && suggestions.length > 0 && (
          <div className="absolute left-0 right-0 mt-2 bg-[#05060a] border border-white/6 rounded-lg shadow-lg z-50 overflow-hidden">
            {suggestions.map((s) => {
              const img = (s.images && s.images.length) ? s.images[0] : null
              return (
                <button
                  key={s.id}
                  onClick={() => router.push(`/homes?region=${encodeURIComponent(s.state || s.address || s.name)}`)}
                  className="w-full text-left px-3 py-2 hover:bg-white/5 flex items-center gap-3"
                >
                  <div className="w-12 h-10 bg-gray-800 rounded overflow-hidden flex-shrink-0">
                    {img ? <img src={img} alt={s.name} className="w-full h-full object-cover" /> : null}
                  </div>
                  <div className="flex-1">
                    <div className="text-sm text-white/90">{s.name}</div>
                    <div className="text-xs text-white/60">{s.address} • {s.price}</div>
                  </div>
                </button>
              )
            })}
          </div>
        )}
      </div>

      <div className="mt-3 flex gap-2 justify-center">
        <button type="button" onClick={() => { setQ("New York"); setOpen(true) }} className="px-3 py-1.5 bg-white/10 text-white rounded-full text-sm hover:bg-orange-100/30">New York</button>
        <button type="button" onClick={() => { setQ("Los Angeles"); setOpen(true) }} className="px-3 py-1.5 bg-white/10 text-white rounded-full text-sm hover:bg-orange-100/30">Los Angeles</button>
        <button type="button" onClick={() => { setQ("Miami"); setOpen(true) }} className="px-3 py-1.5 bg-white/10 text-white rounded-full text-sm hover:bg-orange-100/30">Miami</button>
        <button type="button" onClick={() => { setQ("Chicago"); setOpen(true) }} className="px-3 py-1.5 bg-white/10 text-white rounded-full text-sm hover:bg-orange-100/30">Chicago</button>
      </div>
    </motion.form>
  )
}
