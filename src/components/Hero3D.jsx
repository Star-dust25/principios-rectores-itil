import { useMemo, useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Float, Html, Line, OrbitControls, Sparkles, Stars } from '@react-three/drei'
import { principios } from '../data/caso'

const RADIUS = 2.7

function Core() {
  const ref = useRef()
  useFrame((_, dt) => {
    ref.current.rotation.y += dt * 0.25
    ref.current.rotation.x += dt * 0.1
  })
  return (
    <Float speed={2} rotationIntensity={0.3} floatIntensity={0.6}>
      <group ref={ref}>
        <mesh>
          <icosahedronGeometry args={[0.85, 1]} />
          <meshStandardMaterial
            color="#8b7cf6"
            emissive="#5b4bd6"
            emissiveIntensity={0.9}
            roughness={0.25}
            metalness={0.4}
            flatShading
          />
        </mesh>
        <mesh scale={1.25}>
          <icosahedronGeometry args={[0.85, 1]} />
          <meshBasicMaterial color="#3dd6c6" wireframe transparent opacity={0.35} />
        </mesh>
      </group>
      <Html center position={[0, -1.35, 0]}>
        <div className="orbit-label" style={{ borderColor: '#8b7cf6' }}>
          Valor · Mejora continua
        </div>
      </Html>
    </Float>
  )
}

function Orbit() {
  const group = useRef()
  const points = useMemo(
    () =>
      principios.map((p, i) => {
        const a = (i / principios.length) * Math.PI * 2
        return [Math.cos(a) * RADIUS, Math.sin(a * 2) * 0.35, Math.sin(a) * RADIUS]
      }),
    [],
  )
  const ring = useMemo(() => [...points, points[0]], [points])

  useFrame((_, dt) => {
    group.current.rotation.y += dt * 0.18
  })

  return (
    <group ref={group} rotation={[0.35, 0, 0.08]}>
      <Line points={ring} color="#3dd6c6" lineWidth={1.2} transparent opacity={0.45} />
      {points.map((pt, i) => (
        <group key={principios[i].id} position={pt}>
          <Line
            points={[[0, 0, 0], [-pt[0], -pt[1], -pt[2]]]}
            color={principios[i].color}
            lineWidth={0.8}
            transparent
            opacity={0.3}
            dashed
            dashSize={0.12}
            gapSize={0.1}
          />
          <mesh>
            <sphereGeometry args={[0.2, 32, 32]} />
            <meshStandardMaterial
              color={principios[i].color}
              emissive={principios[i].color}
              emissiveIntensity={0.8}
              roughness={0.3}
            />
          </mesh>
          <Html center position={[0, 0.42, 0]}>
            <div className="orbit-label" style={{ borderColor: principios[i].color }}>
              <span className="full">
                {principios[i].id}. {principios[i].nombre.split(' ').slice(0, 3).join(' ')}
              </span>
              <span className="short">P{principios[i].id}</span>
            </div>
          </Html>
        </group>
      ))}
    </group>
  )
}

export default function Hero3D() {
  return (
    <Canvas
      camera={{ position: [0, 1.6, 7], fov: 50 }}
      dpr={[1, 1.5]}
      gl={{ powerPreference: 'high-performance', antialias: true }}
    >
      <color attach="background" args={['#060914']} />
      <ambientLight intensity={0.4} />
      <pointLight position={[5, 5, 5]} intensity={40} color="#ffffff" />
      <pointLight position={[-5, -3, -4]} intensity={30} color="#3dd6c6" />
      <Stars radius={60} depth={40} count={1200} factor={3} fade speed={0.6} />
      <Sparkles count={40} scale={7} size={2} speed={0.4} color="#8b7cf6" />
      <Core />
      <Orbit />
      <OrbitControls
        enableZoom={false}
        enablePan={false}
        autoRotate
        autoRotateSpeed={0.4}
        rotateSpeed={0.5}
      />
    </Canvas>
  )
}
