import fallbackImages from '@/data/fallbackImages'

export function sanitizeUrl(u){
  if (!u) return null;
  const s = String(u).trim();
  if (s.startsWith('/images/') && s !== '/images/placeholder.svg') return null;
  const m = s.match(/(https?:\/\/[^\s"']+?\.(?:jpg|jpeg|png|webp|gif))/i);
  if (m) return m[1];
  if (s.startsWith('/http')) return s.slice(1);
  return s;
}

export function pickFirstImage(home){
  const imgs = (home.images && home.images.length) ? home.images : (home.image ? [home.image] : []);
  if (!imgs || imgs.length === 0) return fallbackImages?.[0] || '/images/placeholder.svg';
  const s = sanitizeUrl(imgs[0]);
  if (!s) return fallbackImages?.[0] || '/images/placeholder.svg';
  // If path points to local /images but files are not present, use placeholder/fallback
  if (s.startsWith('/images/')) return fallbackImages?.[0] || '/images/placeholder.svg';
  return s;
}
