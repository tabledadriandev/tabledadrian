import sharp from 'sharp'
import fs from 'node:fs'

const out = new URL('../public/garnish', import.meta.url).pathname
fs.mkdirSync(out, { recursive: true })

function hsv(r, g, b) {
  const max = Math.max(r, g, b)
  const min = Math.min(r, g, b)
  const d = max - min
  let h = 0
  if (d) {
    if (max === r) h = ((g - b) / d) % 6
    else if (max === g) h = (b - r) / d + 2
    else h = (r - g) / d + 4
    h *= 60
    if (h < 0) h += 360
  }
  return [h, max ? d / max : 0, max / 255]
}

async function cut({ src, rect, name, test, seed, size = 360, minArea = 400 }) {
  const { data, info } = await sharp(`${new URL('../public/gallery', import.meta.url).pathname}/${src}.jpeg`)
    .extract(rect)
    .raw()
    .toBuffer({ resolveWithObject: true })
  const { width: w, height: h, channels: c } = info
  const mask = new Uint8Array(w * h)
  for (let i = 0; i < w * h; i++) {
    const r = data[i * c]
    const g = data[i * c + 1]
    const b = data[i * c + 2]
    mask[i] = test(r, g, b, hsv(r, g, b)) ? 1 : 0
  }
  // close small holes: dilate then erode
  const morph = (m, on) => {
    const n = new Uint8Array(w * h)
    for (let y = 0; y < h; y++)
      for (let x = 0; x < w; x++) {
        let v = on ? 0 : 1
        for (let dy = -1; dy <= 1; dy++)
          for (let dx = -1; dx <= 1; dx++) {
            const xx = x + dx
            const yy = y + dy
            if (xx < 0 || yy < 0 || xx >= w || yy >= h) continue
            const m2 = m[yy * w + xx]
            if (on && m2) v = 1
            if (!on && !m2) v = 0
          }
        n[y * w + x] = v
      }
    return n
  }
  let m = morph(morph(mask, true), true)
  m = morph(morph(m, false), false)
  // components
  const label = new Int32Array(w * h)
  const comps = []
  let id = 0
  for (let i = 0; i < w * h; i++) {
    if (!m[i] || label[i]) continue
    id++
    const stack = [i]
    label[i] = id
    let area = 0
    let sx = 0
    let sy = 0
    while (stack.length) {
      const p = stack.pop()
      area++
      const x = p % w
      const y = (p / w) | 0
      sx += x
      sy += y
      for (const q of [p - 1, p + 1, p - w, p + w]) {
        if (q < 0 || q >= w * h) continue
        if (Math.abs((q % w) - x) > 1) continue
        if (m[q] && !label[q]) {
          label[q] = id
          stack.push(q)
        }
      }
    }
    comps.push({ id, area, cx: sx / area, cy: sy / area })
  }
  comps.sort((a, b) => b.area - a.area)
  let pick = comps[0]
  if (seed) {
    const near = comps.filter((k) => k.area > minArea)
    near.sort((a, b) => Math.hypot(a.cx - seed[0], a.cy - seed[1]) - Math.hypot(b.cx - seed[0], b.cy - seed[1]))
    pick = near[0]
  }
  const outside = new Uint8Array(w * h)
  const queue = []
  for (let x = 0; x < w; x++) queue.push(x, (h - 1) * w + x)
  for (let y = 0; y < h; y++) queue.push(y * w, y * w + w - 1)
  while (queue.length) {
    const p = queue.pop()
    if (outside[p] || label[p] === pick.id) continue
    outside[p] = 1
    const x = p % w
    for (const q of [p - 1, p + 1, p - w, p + w]) {
      if (q < 0 || q >= w * h || Math.abs((q % w) - x) > 1) continue
      if (!outside[q] && label[q] !== pick.id) queue.push(q)
    }
  }
  for (let i = 0; i < w * h; i++) if (!outside[i]) label[i] = pick.id
  const alpha = Buffer.alloc(w * h)
  let x0 = w
  let y0 = h
  let x1 = 0
  let y1 = 0
  for (let i = 0; i < w * h; i++) {
    if (label[i] === pick.id) {
      alpha[i] = 255
      const x = i % w
      const y = (i / w) | 0
      x0 = Math.min(x0, x)
      y0 = Math.min(y0, y)
      x1 = Math.max(x1, x)
      y1 = Math.max(y1, y)
    }
  }
  const soft = await sharp(alpha, { raw: { width: w, height: h, channels: 1 } }).blur(1.1).extractChannel(0).raw().toBuffer()
  const rgba = Buffer.alloc(w * h * 4)
  for (let i = 0; i < w * h; i++) {
    rgba[i * 4] = data[i * c]
    rgba[i * 4 + 1] = data[i * c + 1]
    rgba[i * 4 + 2] = data[i * c + 2]
    rgba[i * 4 + 3] = soft[i]
  }
  const pad = 6
  const box = {
    left: Math.max(0, x0 - pad),
    top: Math.max(0, y0 - pad),
    width: Math.min(w, x1 + pad) - Math.max(0, x0 - pad),
    height: Math.min(h, y1 + pad) - Math.max(0, y0 - pad),
  }
  const file = `${out}/${name}.webp`
  await sharp(rgba, { raw: { width: w, height: h, channels: 4 } })
    .extract(box)
    .resize(size, size, { fit: 'inside', withoutEnlargement: true })
    .webp({ quality: 86, alphaQuality: 90 })
    .toFile(file)
  const meta = await sharp(file).metadata()
  console.log(name, pick.area, meta.width, meta.height, fs.statSync(file).size)
}

const green = (r, g, b, [hh, s, v]) => hh > 60 && hh < 170 && s > 0.22 && v > 0.12
await cut({ src: 'leek-salad', rect: { left: 690, top: 480, width: 240, height: 200 }, name: 'basil', test: green, size: 420 })
await cut({
  src: 'honeycomb-dessert',
  rect: { left: 1000, top: 200, width: 150, height: 300 },
  name: 'thyme',
  test: (r, g, b, [hh, s, v]) => hh > 45 && hh < 160 && s > 0.12 && v < 0.82,
  size: 420,
})
const petal = (r, g, b, [hh, s, v]) => (hh > 290 || hh < 20) && s > 0.28 && v < 0.85
await cut({ src: 'rose-tartlets', rect: { left: 80, top: 720, width: 460, height: 420 }, name: 'petal-a', test: petal, seed: [130, 180], size: 260 })
await cut({ src: 'rose-tartlets', rect: { left: 80, top: 720, width: 460, height: 420 }, name: 'petal-b', test: petal, seed: [104, 321], size: 220 })
await cut({ src: 'rose-tartlets', rect: { left: 80, top: 720, width: 460, height: 420 }, name: 'petal-c', test: petal, seed: [251, 258], size: 200 })
