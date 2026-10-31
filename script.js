document.getElementById('year').textContent = new Date().getFullYear();
const section = document.getElementById('testimonios');
const list = document.getElementById('testimonial-list');
const entries = Array.isArray(window.MASTER_TESTIMONIALS) ? window.MASTER_TESTIMONIALS : [];
for (const item of entries) {
  if (!item || item.approved !== true || typeof item.name !== 'string' || !item.name.trim() || !['Estudiante', 'Cliente'].includes(item.role)) continue;
  const quote = typeof item.quote === 'string' ? item.quote.trim() : '';
  let video;
  try { const url = new URL(item.videoUrl); if (url.protocol === 'https:') video = url.href; } catch {}
  if (!quote && !video) continue;
  const card = document.createElement('article'); card.className = 'testimonial-card';
  const label = document.createElement('span'); label.className = 'pill'; label.textContent = item.role; card.append(label);
  if (quote) { const text = document.createElement('blockquote'); text.textContent = quote; card.append(text); }
  const byline = document.createElement('p'); const name = document.createElement('strong'); name.textContent = item.name.trim(); byline.append(name); card.append(byline);
  if (video) { const link = document.createElement('a'); link.href = video; link.target = '_blank'; link.rel = 'noopener noreferrer'; link.textContent = 'Ver testimonio en video'; link.setAttribute('aria-label', 'Ver testimonio de ' + item.name.trim()); card.append(link); }
  list.append(card);
}
if (list.children.length) {
  document.getElementById('testimonial-preview').hidden = true;
  list.hidden = false;
}
