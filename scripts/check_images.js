const fs = require('fs');
const path = require('path');

const file = path.join(__dirname, '../src/data/homes.js');
const content = fs.readFileSync(file, 'utf8');

function sanitizeUrl(u){
  if (!u) return null;
  const s = String(u).trim();
  const m = s.match(/(https?:\/\/[^\s\"']+?\.(?:jpg|jpeg|png|webp|gif))/i);
  if (m) return m[1];
  if (s.startsWith('/http')) return s.slice(1);
  return s;
}

// Find blocks like images:[...]
const imagesBlocks = [...content.matchAll(/images\s*:\s*\[([^\]]*)\]/gmi)];

imagesBlocks.forEach((blk, idx) => {
  const arrText = blk[1];
  const matches = [...arrText.matchAll(/(["'])(.*?)\1/g)];
  console.log(`Home #${idx + 1} images:`);
  matches.forEach((m, i) => {
    const raw = m[2];
    console.log(`  [${i}] raw=${raw} -> clean=${sanitizeUrl(raw)}`);
  });
});
