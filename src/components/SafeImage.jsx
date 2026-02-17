"use client"

import Image from 'next/image'
import { useState, useMemo } from 'react'

/**
 * SafeImage
 * - Accepts `srcList` (string or array) of candidate URLs to try in order
 * - On error, advances to the next candidate until exhausted
 * - Renders a neutral placeholder if no candidate is available
 */
export default function SafeImage({ srcList, alt = '', className, sizes, priority, fill = false, quality, style }){
  const candidates = useMemo(() => {
    if (!srcList) return [];
    if (Array.isArray(srcList)) return srcList.filter(Boolean);
    return [srcList].filter(Boolean);
  }, [srcList]);

  const [pos, setPos] = useState(0);
  const src = candidates[pos] || '';

  function handleError(){
    if (pos < candidates.length - 1) setPos((p) => p + 1);
  }

  if (!src) return <div className="w-full h-full bg-stone-100" style={style} />;

  return (
    <Image
      src={src}
      alt={alt}
      className={className}
      sizes={sizes}
      priority={priority}
      quality={quality}
      onError={handleError}
      fill={fill}
      style={style}
    />
  )
}
