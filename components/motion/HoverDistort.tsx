'use client'

import { useEffect } from 'react'
import { getMotionCaps } from '@/lib/motion-caps'

const VERT = `
attribute vec2 p;
varying vec2 vUv;
void main() {
  vUv = vec2(p.x * 0.5 + 0.5, 0.5 - p.y * 0.5);
  gl_Position = vec4(p, 0.0, 1.0);
}`

const FRAG = `
precision mediump float;
varying vec2 vUv;
uniform sampler2D tex;
uniform vec2 mouse;
uniform vec2 vel;
uniform vec2 cover;
uniform float aspect;
uniform float strength;
uniform float time;

vec3 sampleAt(vec2 uv) {
  vec2 c = uv * cover + (1.0 - cover) * 0.5;
  return texture2D(tex, clamp(c, 0.001, 0.999)).rgb;
}

void main() {
  vec2 toM = (vUv - mouse) * vec2(aspect, 1.0);
  float d = length(toM);
  float falloff = exp(-d * 5.5);
  vec2 dir = d > 0.0001 ? toM / d : vec2(0.0);
  float ripple = sin(d * 42.0 - time * 5.0) * falloff;
  vec2 disp = (dir * ripple * 0.011 + vel * 0.05 * falloff) * strength;
  disp.x /= aspect;
  float r = sampleAt(vUv + disp * 1.7).r;
  float g = sampleAt(vUv + disp).g;
  float b = sampleAt(vUv + disp * 0.35).b;
  vec3 col = vec3(r, g, b);
  vec3 gold = vec3(1.08, 0.94, 0.72);
  col = mix(col, col * gold, strength * falloff * 0.55);
  gl_FragColor = vec4(col, 1.0);
}`

/** A shared WebGL ripple and gold RGB shift for `[data-distort]` photo frames. Desktop, fine pointer only. */
export function HoverDistort() {
  useEffect(() => {
    const caps = getMotionCaps()
    if (caps.tier !== 'full' || !caps.webgl || !caps.fine || caps.saveData) return

    const canvas = document.createElement('canvas')
    canvas.className = 'distort-canvas'
    canvas.setAttribute('aria-hidden', 'true')
    const gl = canvas.getContext('webgl', { alpha: false, antialias: false, premultipliedAlpha: false })
    if (!gl) return

    const compile = (type: number, src: string) => {
      const shader = gl.createShader(type)!
      gl.shaderSource(shader, src)
      gl.compileShader(shader)
      return shader
    }
    const program = gl.createProgram()!
    gl.attachShader(program, compile(gl.VERTEX_SHADER, VERT))
    gl.attachShader(program, compile(gl.FRAGMENT_SHADER, FRAG))
    gl.linkProgram(program)
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) return
    gl.useProgram(program)
    const buffer = gl.createBuffer()
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer)
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]), gl.STATIC_DRAW)
    const loc = gl.getAttribLocation(program, 'p')
    gl.enableVertexAttribArray(loc)
    gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0)
    const u = (name: string) => gl.getUniformLocation(program, name)
    const uMouse = u('mouse')
    const uVel = u('vel')
    const uCover = u('cover')
    const uAspect = u('aspect')
    const uStrength = u('strength')
    const uTime = u('time')

    const textures = new Map<string, WebGLTexture>()
    const textureFor = (img: HTMLImageElement) => {
      const key = img.currentSrc || img.src
      const cached = textures.get(key)
      if (cached) return cached
      const tex = gl.createTexture()!
      gl.bindTexture(gl.TEXTURE_2D, tex)
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR)
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR)
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE)
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE)
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGB, gl.RGB, gl.UNSIGNED_BYTE, img)
      textures.set(key, tex)
      if (textures.size > 8) {
        const [oldest, value] = textures.entries().next().value as [string, WebGLTexture]
        gl.deleteTexture(value)
        textures.delete(oldest)
      }
      return tex
    }

    const dpr = Math.min(window.devicePixelRatio || 1, 1.5)
    let host: HTMLElement | null = null
    let img: HTMLImageElement | null = null
    let hovering = false
    let strength = 0
    let frame = 0
    let start = performance.now()
    const mouse = { x: 0.5, y: 0.5, tx: 0.5, ty: 0.5, vx: 0, vy: 0 }

    const pickImage = (el: HTMLElement) =>
      el.querySelector<HTMLImageElement>('.is-on img') ?? el.querySelector<HTMLImageElement>('img')

    const render = () => {
      frame = 0
      if (!host) return
      const current = pickImage(host)
      if (!current || !current.complete || !current.naturalWidth) {
        frame = requestAnimationFrame(render)
        return
      }
      if (current !== img) img = current
      const hostRect = host.getBoundingClientRect()
      const rect = img.getBoundingClientRect()
      const w = Math.max(1, rect.width)
      const h = Math.max(1, rect.height)
      const cw = Math.round(w * dpr)
      const ch = Math.round(h * dpr)
      if (canvas.width !== cw || canvas.height !== ch) {
        canvas.width = cw
        canvas.height = ch
        gl.viewport(0, 0, cw, ch)
      }
      canvas.style.transform = `translate3d(${rect.left - hostRect.left - host.clientLeft}px, ${rect.top - hostRect.top - host.clientTop}px, 0)`
      canvas.style.width = `${w}px`
      canvas.style.height = `${h}px`

      strength += ((hovering ? 1 : 0) - strength) * 0.09
      mouse.vx += (mouse.tx - mouse.x - mouse.vx) * 0.2
      mouse.vy += (mouse.ty - mouse.y - mouse.vy) * 0.2
      mouse.x += (mouse.tx - mouse.x) * 0.14
      mouse.y += (mouse.ty - mouse.y) * 0.14
      canvas.style.opacity = String(Math.min(1, strength * 3))

      const iw = img.naturalWidth
      const ih = img.naturalHeight
      const scale = Math.max(w / iw, h / ih)
      gl.bindTexture(gl.TEXTURE_2D, textureFor(img))
      gl.uniform2f(uCover, w / (iw * scale), h / (ih * scale))
      gl.uniform2f(uMouse, mouse.x, mouse.y)
      gl.uniform2f(uVel, mouse.vx * 6, mouse.vy * 6)
      gl.uniform1f(uAspect, w / h)
      gl.uniform1f(uStrength, strength)
      gl.uniform1f(uTime, (performance.now() - start) / 1000)
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4)

      if (!hovering && strength < 0.01) {
        canvas.remove()
        host = null
        img = null
        return
      }
      frame = requestAnimationFrame(render)
    }

    const onOver = (event: PointerEvent) => {
      if (!(event.target instanceof Element)) return
      const next = event.target.closest<HTMLElement>('[data-distort]')
      if (!next) return
      if (next !== host) {
        host = next
        img = null
        strength = 0
        start = performance.now()
        host.appendChild(canvas)
      }
      hovering = true
      if (!frame) frame = requestAnimationFrame(render)
    }
    const onOut = (event: PointerEvent) => {
      if (!host) return
      const to = event.relatedTarget
      if (to instanceof Node && host.contains(to)) return
      hovering = false
    }
    const onMove = (event: PointerEvent) => {
      if (!host || !img) return
      const rect = img.getBoundingClientRect()
      mouse.tx = (event.clientX - rect.left) / rect.width
      mouse.ty = (event.clientY - rect.top) / rect.height
    }

    document.addEventListener('pointerover', onOver)
    document.addEventListener('pointerout', onOut)
    window.addEventListener('pointermove', onMove, { passive: true })
    return () => {
      document.removeEventListener('pointerover', onOver)
      document.removeEventListener('pointerout', onOut)
      window.removeEventListener('pointermove', onMove)
      if (frame) cancelAnimationFrame(frame)
      canvas.remove()
      textures.forEach((tex) => gl.deleteTexture(tex))
      gl.getExtension('WEBGL_lose_context')?.loseContext()
    }
  }, [])

  return null
}
