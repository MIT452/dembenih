export function getStaticUrl(p) {
  if (!p) return p;
  if (typeof p !== 'string') return p;
  if (p.startsWith('http')) return p;
  const base = import.meta.env.VITE_CLOUDINARY_BASE || import.meta.env.BASE_URL || '/';
  if (p.startsWith('/')) {
    return base + p.slice(1);
  }
  return p;
}

export default getStaticUrl;
