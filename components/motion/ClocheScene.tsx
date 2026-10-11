'use client'

import { useMemo, useRef, type MutableRefObject } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Environment, Float, Lightformer, Sparkles } from '@react-three/drei'
import * as THREE from 'three'

export interface ClocheSignal {
  lift: number
  pointerX: number
  pointerY: number
}

const GOLD = '#c9a26a'

function Cloche({ signal }: { signal: MutableRefObject<ClocheSignal> }) {
  const group = useRef<THREE.Group>(null)
  const dome = useRef<THREE.Group>(null)
  const glow = useRef<THREE.PointLight>(null)

  const domeGeometry = useMemo(() => {
    const points: THREE.Vector2[] = []
    const steps = 48
    for (let i = 0; i <= steps; i++) {
      const t = i / steps
      const angle = t * (Math.PI / 2)
      points.push(new THREE.Vector2(Math.cos(angle) * 1.25, Math.sin(angle) * 1.02))
    }
    return new THREE.LatheGeometry(points.reverse(), 96)
  }, [])

  useFrame((_, delta) => {
    const s = signal.current
    if (group.current) {
      group.current.rotation.y += (s.pointerX * 0.5 - group.current.rotation.y) * Math.min(1, delta * 2.4)
      group.current.rotation.x += (0.18 + s.pointerY * 0.18 - group.current.rotation.x) * Math.min(1, delta * 2.4)
    }
    if (dome.current) {
      const lift = s.lift
      dome.current.position.y += (0.02 + lift * 0.62 - dome.current.position.y) * Math.min(1, delta * 4)
      dome.current.rotation.z += (lift * -0.22 - dome.current.rotation.z) * Math.min(1, delta * 4)
      dome.current.position.x += (lift * 0.22 - dome.current.position.x) * Math.min(1, delta * 4)
    }
    if (glow.current) glow.current.intensity = 0.4 + s.lift * 6
  })

  return (
    <group ref={group} position={[0, -0.25, 0]}>
      <Float speed={1.1} rotationIntensity={0.35} floatIntensity={0.7} floatingRange={[-0.08, 0.1]}>
        <mesh position={[0, -0.04, 0]} rotation={[0, 0, 0]}>
          <cylinderGeometry args={[1.62, 1.5, 0.07, 96]} />
          <meshStandardMaterial color="#14110f" metalness={0.4} roughness={0.42} />
        </mesh>
        <mesh position={[0, 0.0, 0]} rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[1.6, 0.022, 16, 160]} />
          <meshStandardMaterial color={GOLD} metalness={1} roughness={0.22} />
        </mesh>
        <pointLight ref={glow} position={[0, 0.35, 0]} color="#f2c98a" intensity={0.4} distance={3.2} />
        <group ref={dome}>
          <mesh geometry={domeGeometry}>
            <meshStandardMaterial color={GOLD} metalness={1} roughness={0.2} side={THREE.DoubleSide} />
          </mesh>
          <mesh position={[0, 0.02, 0]} rotation={[Math.PI / 2, 0, 0]}>
            <torusGeometry args={[1.25, 0.03, 16, 160]} />
            <meshStandardMaterial color={GOLD} metalness={1} roughness={0.18} />
          </mesh>
          <mesh position={[0, 1.13, 0]}>
            <sphereGeometry args={[0.13, 32, 32]} />
            <meshStandardMaterial color={GOLD} metalness={1} roughness={0.16} />
          </mesh>
          <mesh position={[0, 1.04, 0]}>
            <cylinderGeometry args={[0.05, 0.09, 0.08, 24]} />
            <meshStandardMaterial color={GOLD} metalness={1} roughness={0.2} />
          </mesh>
        </group>
      </Float>
      <Sparkles count={36} scale={[4.2, 2.6, 2.2]} size={2.2} speed={0.25} color="#e7c48d" opacity={0.7} position={[0, 0.6, 0]} />
    </group>
  )
}

export default function ClocheScene({
  signal,
  active,
}: {
  signal: MutableRefObject<ClocheSignal>
  active: boolean
}) {
  return (
    <Canvas
      dpr={[1, 1.5]}
      frameloop={active ? 'always' : 'never'}
      camera={{ position: [0, 1.15, 5.4], fov: 32 }}
      gl={{ antialias: true, alpha: true, powerPreference: 'low-power' }}
      onCreated={({ gl }) => {
        gl.toneMapping = THREE.ACESFilmicToneMapping
        gl.toneMappingExposure = 1.05
      }}
    >
      <ambientLight intensity={0.15} />
      <directionalLight position={[3, 4, 2]} intensity={1.4} color="#fff1dc" />
      <directionalLight position={[-4, 1, -3]} intensity={0.6} color="#c9a26a" />
      <Environment resolution={128} frames={1}>
        <Lightformer form="rect" intensity={2.4} color="#fff3e0" position={[0, 4, 3]} scale={[8, 2, 1]} />
        <Lightformer form="rect" intensity={1.2} color="#d8b27a" position={[-5, 1, 0]} rotation-y={Math.PI / 2} scale={[6, 3, 1]} />
        <Lightformer form="ring" intensity={1.6} color="#ffffff" position={[4, 2, -2]} scale={2} />
        <Lightformer form="rect" intensity={0.4} color="#2a221a" position={[0, -3, 0]} rotation-x={-Math.PI / 2} scale={[10, 10, 1]} />
      </Environment>
      <Cloche signal={signal} />
    </Canvas>
  )
}
