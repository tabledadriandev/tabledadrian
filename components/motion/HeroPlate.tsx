'use client'

import { Suspense, useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { useTexture } from '@react-three/drei'
import * as THREE from 'three'

const vertexShader = /* glsl */ `
  varying vec2 vUv;
  uniform float uTime;
  void main() {
    vUv = uv;
    vec3 p = position;
    float wave = sin(uv.y * 10.0 + uTime * 0.55) * 0.008;
    wave += cos(uv.x * 8.0 - uTime * 0.4) * 0.006;
    p.z += wave;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(p, 1.0);
  }
`

const fragmentShader = /* glsl */ `
  precision highp float;
  uniform sampler2D uTexture;
  uniform float uTime;
  uniform vec2 uMouse;
  uniform vec2 uTex;
  uniform vec2 uPlane;
  varying vec2 vUv;

  float hash(vec2 p) {
    return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123);
  }

  float noise(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);
    float a = hash(i);
    float b = hash(i + vec2(1.0, 0.0));
    float c = hash(i + vec2(0.0, 1.0));
    float d = hash(i + vec2(1.0, 1.0));
    vec2 u = f * f * (3.0 - 2.0 * f);
    return mix(a, b, u.x) + (c - a) * u.y * (1.0 - u.x) + (d - b) * u.x * u.y;
  }

  vec2 cover(vec2 uv) {
    float planeAspect = uPlane.x / max(uPlane.y, 0.001);
    float imageAspect = uTex.x / max(uTex.y, 0.001);
    vec2 scale = vec2(1.0);
    if (planeAspect > imageAspect) scale.y = imageAspect / planeAspect;
    else scale.x = planeAspect / imageAspect;
    return (uv - 0.5) * scale + 0.5;
  }

  void main() {
    vec2 uv = cover(vUv);
    float n = noise(uv * 2.2 + vec2(uTime * 0.07, uTime * 0.05));
    vec2 pull = uMouse - vUv;
    float falloff = smoothstep(0.9, 0.0, length(pull));
    uv += (n - 0.5) * 0.016;
    uv += pull * falloff * 0.04;
    uv = clamp(uv, 0.002, 0.998);

    vec3 col = texture2D(uTexture, uv).rgb;
    col = pow(col, vec3(0.94));
    col *= vec3(1.04, 0.99, 0.92);

    float vignette = smoothstep(1.08, 0.28, length((vUv - 0.5) * vec2(1.05, 1.2)));
    col *= mix(0.55, 1.0, vignette);

    vec3 gold = vec3(0.86, 0.71, 0.42);
    float spark = step(0.993, hash(floor(uv * vec2(220.0, 280.0)) + floor(uTime * 5.0)));
    float mote = step(0.978, hash(uv * vec2(80.0, 120.0) + uTime * 0.22));
    float sheen = smoothstep(0.42, 0.5, fract(uv.x * 0.35 + uv.y * 0.08 - uTime * 0.035));
    sheen *= smoothstep(0.58, 0.5, fract(uv.x * 0.35 + uv.y * 0.08 - uTime * 0.035));
    col = mix(col, gold, spark * 0.92 + mote * 0.22);
    col += gold * sheen * 0.07;

    gl_FragColor = vec4(col, 1.0);
  }
`

function Plate({ src }: { src: string }) {
  const texture = useTexture(src)
  const material = useRef<THREE.ShaderMaterial>(null)
  const mouse = useRef(new THREE.Vector2(0.5, 0.5))
  const { viewport, size } = useThree()

  useMemo(() => {
    texture.colorSpace = THREE.SRGBColorSpace
    texture.minFilter = THREE.LinearFilter
    texture.magFilter = THREE.LinearFilter
    texture.generateMipmaps = false
  }, [texture])

  const uniforms = useMemo(() => {
    const image = texture.image as { width?: number; height?: number } | undefined
    return {
      uTexture: { value: texture },
      uTime: { value: 0 },
      uMouse: { value: new THREE.Vector2(0.5, 0.5) },
      uTex: { value: new THREE.Vector2(image?.width || 1200, image?.height || 1600) },
      uPlane: { value: new THREE.Vector2(size.width, size.height) },
    }
  }, [texture, size.width, size.height])

  useFrame((state) => {
    const mat = material.current
    if (!mat) return
    mat.uniforms.uTime.value = state.clock.elapsedTime
    const next = new THREE.Vector2(state.pointer.x * 0.5 + 0.5, state.pointer.y * 0.5 + 0.5)
    mouse.current.lerp(next, 0.06)
    mat.uniforms.uMouse.value.copy(mouse.current)
    mat.uniforms.uPlane.value.set(size.width, size.height)
    const image = texture.image as { width?: number; height?: number } | undefined
    if (image?.width) mat.uniforms.uTex.value.set(image.width, image.height)
  })

  return (
    <mesh scale={[viewport.width, viewport.height, 1]}>
      <planeGeometry args={[1, 1, 48, 48]} />
      <shaderMaterial
        ref={material}
        uniforms={uniforms}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
      />
    </mesh>
  )
}

function Dust({ count }: { count: number }) {
  const ref = useRef<THREE.Points>(null)
  const positions = useMemo(() => {
    const array = new Float32Array(count * 3)
    for (let i = 0; i < count; i += 1) {
      array[i * 3] = (Math.random() - 0.5) * 2.4
      array[i * 3 + 1] = (Math.random() - 0.5) * 2.8
      array[i * 3 + 2] = Math.random() * 0.55
    }
    return array
  }, [count])

  useFrame(({ clock }) => {
    if (!ref.current) return
    ref.current.rotation.z = clock.elapsedTime * 0.015
    ref.current.position.y = Math.sin(clock.elapsedTime * 0.25) * 0.04
  })

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        color="#e7d3a1"
        size={0.018}
        transparent
        opacity={0.8}
        depthWrite={false}
        sizeAttenuation
      />
    </points>
  )
}

function MarkReady({ onReady }: { onReady: () => void }) {
  useEffect(() => {
    onReady()
  }, [onReady])
  return null
}

export default function HeroPlate({ src, mobile }: { src: string; mobile: boolean }) {
  const wrap = useRef<HTMLDivElement>(null)
  const [active, setActive] = useState(true)
  const [live, setLive] = useState(false)
  const reveal = useCallback(() => setLive(true), [])

  useEffect(() => {
    const node = wrap.current
    if (!node) return
    const observer = new IntersectionObserver(
      ([entry]) => setActive(entry.isIntersecting),
      { threshold: 0.05 }
    )
    observer.observe(node)
    return () => observer.disconnect()
  }, [])

  return (
    <div ref={wrap} className="hero-plate-canvas" data-live={live ? '1' : '0'} aria-hidden="true">
      <Canvas
        dpr={mobile ? [1, 1] : [1, 1.35]}
        frameloop={active ? 'always' : 'demand'}
        camera={{ position: [0, 0, 1.35], fov: 42 }}
        gl={{
          antialias: false,
          alpha: false,
          powerPreference: 'high-performance',
          stencil: false,
        }}
      >
        <Suspense fallback={null}>
          <Plate src={src} />
          <Dust count={mobile ? 70 : 240} />
          <MarkReady onReady={reveal} />
        </Suspense>
      </Canvas>
    </div>
  )
}
