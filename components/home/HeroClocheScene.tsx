'use client'

import { useEffect, useMemo, useRef, type MutableRefObject } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js'
import * as THREE from 'three'

export interface ClochePointer {
  x: number
  y: number
}

function Cloche({
  tone,
  pointer,
}: {
  tone: 'light' | 'dark'
  pointer: MutableRefObject<ClochePointer>
}) {
  const root = useRef<THREE.Group>(null)
  const dome = useMemo(() => {
    const points: THREE.Vector2[] = []
    const steps = 36
    for (let i = 0; i <= steps; i++) {
      const angle = (i / steps) * (Math.PI / 2)
      points.push(new THREE.Vector2(Math.max(Math.cos(angle) * 1.12, 0.001), Math.sin(angle) * 0.98))
    }
    return new THREE.LatheGeometry(points, 64)
  }, [])

  useEffect(() => () => dome.dispose(), [dome])

  useFrame((_, delta) => {
    const node = root.current
    if (!node) return
    node.rotation.y += delta * 0.28
    node.rotation.x = THREE.MathUtils.damp(node.rotation.x, pointer.current.y * 0.18, 4, delta)
    node.rotation.z = THREE.MathUtils.damp(node.rotation.z, pointer.current.x * -0.08, 4, delta)
  })

  const plate = '#f6f1e4'
  const rim = tone === 'light' ? '#6b512a' : '#ead6aa'
  const lip = tone === 'light' ? '#3e2d1b' : '#c4a56c'
  const gold = tone === 'light' ? '#c4a05c' : '#d8b56c'

  return (
    <group ref={root} position={[0, -0.2, 0]}>
      <mesh position={[0, -0.1, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[1.65, 40]} />
        <meshBasicMaterial color={tone === 'light' ? '#2a2118' : '#000000'} transparent opacity={tone === 'light' ? 0.22 : 0.35} depthWrite={false} />
      </mesh>
      <mesh position={[0, -0.02, 0]}>
        <cylinderGeometry args={[1.92, 1.84, 0.055, 64]} />
        <meshStandardMaterial color={plate} roughness={0.4} metalness={0.05} />
      </mesh>
      <mesh position={[0, 0.012, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[1.9, 0.028, 12, 72]} />
        <meshStandardMaterial color={rim} metalness={0.88} roughness={0.26} />
      </mesh>
      <mesh position={[0, -0.01, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[1.99, 0.014, 10, 72]} />
        <meshStandardMaterial color={lip} metalness={0.5} roughness={0.42} />
      </mesh>
      <mesh geometry={dome} position={[0, 0.02, 0]}>
        <meshPhysicalMaterial color={gold} metalness={1} roughness={0.2} clearcoat={0.4} clearcoatRoughness={0.22} />
      </mesh>
      <mesh position={[0, 1.02, 0]}>
        <sphereGeometry args={[0.09, 24, 24]} />
        <meshStandardMaterial color={gold} metalness={1} roughness={0.16} />
      </mesh>
      <mesh position={[0, 0.94, 0]}>
        <cylinderGeometry args={[0.034, 0.055, 0.07, 18]} />
        <meshStandardMaterial color={gold} metalness={1} roughness={0.2} />
      </mesh>
    </group>
  )
}

function Lights({ tone }: { tone: 'light' | 'dark' }) {
  const { gl, scene } = useThree()

  useEffect(() => {
    const pmrem = new THREE.PMREMGenerator(gl)
    const env = pmrem.fromScene(new RoomEnvironment(), 0.04).texture
    scene.environment = env
    gl.toneMapping = THREE.ACESFilmicToneMapping
    gl.toneMappingExposure = tone === 'light' ? 1.05 : 1.16
    pmrem.dispose()
    return () => {
      env.dispose()
      if (scene.environment === env) scene.environment = null
    }
  }, [gl, scene, tone])

  return (
    <>
      <ambientLight intensity={tone === 'light' ? 0.62 : 0.26} />
      <directionalLight position={[3.1, 4.4, 2.2]} intensity={tone === 'light' ? 2.2 : 2.5} color="#fff6ea" />
      <directionalLight position={[-3.2, 1.1, -1.6]} intensity={0.65} color="#e6c48a" />
      <pointLight position={[0.2, 0.35, 1.4]} intensity={tone === 'light' ? 4 : 8} distance={6} color="#f0d7a4" />
    </>
  )
}

function LookAt() {
  const { camera } = useThree()
  useEffect(() => {
    camera.lookAt(0, 0.22, 0)
  }, [camera])
  return null
}

export default function HeroClocheScene({
  tone,
  pointer,
  active,
}: {
  tone: 'light' | 'dark'
  pointer: MutableRefObject<ClochePointer>
  active: boolean
}) {
  return (
    <Canvas
      dpr={[1, 1.35]}
      frameloop={active ? 'always' : 'never'}
      camera={{ position: [0.2, 1.38, 4.85], fov: 30 }}
      gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
    >
      <LookAt />
      <Lights tone={tone} />
      <Cloche tone={tone} pointer={pointer} />
    </Canvas>
  )
}
