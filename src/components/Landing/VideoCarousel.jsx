"use client"
import React, {useState, useEffect, useRef} from 'react'

export default function VideoCarousel(){
  const [videos, setVideos] = useState([])
  const [idx, setIdx] = useState(0)
  const intervalRef = useRef(null)
  const vidRef = useRef(null)

  useEffect(() => {
    let mounted = true
    fetch('/api/homes?count=10')
      .then(r => r.json())
      .then(data => {
        if (!mounted) return
        const vids = (data || []).filter(h => h.video && String(h.video).trim() !== '').slice(0,6)
        setVideos(vids)
      }).catch(()=>{})
    return () => { mounted = false }
  }, [])

  useEffect(() => {
    if (!videos.length) return
    intervalRef.current = setInterval(() => {
      setIdx(i => (i + 1) % videos.length)
    }, 6000)
    return () => clearInterval(intervalRef.current)
  }, [videos.length])

  useEffect(()=>{
    const v = vidRef.current
    if(v){
      v.pause()
      v.currentTime = 0
      v.play().catch(()=>{})
    }
  }, [idx])

  if(!videos.length) return null

  return (
    <div className="relative w-full max-w-6xl mx-auto">
      <div className="overflow-hidden rounded-lg">
        {videos.map((h, i) => (
          <div key={h.id} className={`${i===idx ? 'block' : 'hidden'} w-full` }>
            <video
              ref={i===idx ? vidRef : null}
              src={h.video}
              poster={h.images?.[0]}
              className="w-full h-96 object-cover"
              muted
              playsInline
              loop
              autoPlay
            />
            <div className="p-6 bg-gradient-to-t from-black/60 to-transparent text-white -mt-20 relative">
              <h3 className="text-2xl font-bold">{h.name}</h3>
              <p className="text-sm opacity-90">{h.address}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="flex justify-center gap-2 mt-4">
        {videos.map((_, i) => (
          <button key={i} onClick={()=>setIdx(i)} className={`w-3 h-3 rounded-full ${i===idx ? 'bg-white' : 'bg-white/30'}`} />
        ))}
      </div>
    </div>
  )
}
