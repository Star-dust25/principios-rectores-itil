import { useMemo, useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Float, Html, Line, OrbitControls, Sparkles, Stars } from '@react-three/drei'
import { principios } from '../data/caso'

// Radio calibrado para que toda la órbita y sus etiquetas entren cómodamente dentro del canvas
const RADIUS = 2.15

// Nombres concisos y completos para las etiquetas en órbita
const ETIQUETAS_ORBIT = {
  1: '1. Centrarse en el valor',
  2: '2. Comenzar donde se está',
  3: '3. Progresar iterativamente',
  4: '4. Colaborar y visibilidad',
  5: '5. Pensar holísticamente',
  6: '6. Simple y práctico',
  7: '7. Optimizar y automatizar',
}

function Core() {
  const ref = useRef()
  useFrame((_, dt) => {
    ref.current.rotation.y += dt * 0.22
    ref.current.rotation.x += dt * 0.08
  })
  return (
    <Float speed={1.8} rotationIntensity={0.25} floatIntensity={0.5}>
      <group ref={ref}>
        <mesh>
          <icosahedronGeometry args={[0.75, 1]} />
          <meshStandardMaterial
            color="#8b7cf6"
            emissive="#5b4bd6"
            emissiveIntensity={0.85}
            roughness={0.25}
            metalness={0.4}
            flatShading
          />
        </mesh>
        <mesh scale={1.22}>
          <icosahedronGeometry args={[0.75, 1]} />
          <meshBasicMaterial color="#3dd6c6" wireframe transparent opacity={0.35} />
        </mesh>
      </group>
      <Html center position={[0, -1.2, 0]}>
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
        return [Math.cos(a) * RADIUS, Math.sin(a * 2) * 0.3, Math.sin(a) * RADIUS]
      }),
    [],
  )
  const ring = useMemo(() => [...points, points[0]], [points])

  useFrame((_, dt) => {
    group.current.rotation.y += dt * 0.16
  })

  return (
    <group ref={group} rotation={[0.32, 0, 0.06]}>
      <Line points={ring} color="#3dd6c6" lineWidth={1.2} transparent opacity={0.4} />
      {points.map((pt, i) => (
        <group key={principios[i].id} position={pt}>
          <Line
            points={[[0, 0, 0], [-pt[0], -pt[1], -pt[2]]]}
            color={principios[i].color}
            lineWidth={0.8}
            transparent
            opacity={0.25}
            dashed
            dashSize={0.12}
            gapSize={0.1}
          />
          <mesh>
            <sphereGeometry args={[0.18, 32, 32]} />
            <meshStandardMaterial
              color={principios[i].color}
              emissive={principios[i].color}
              emissiveIntensity={0.85}
              roughness={0.25}
            />
          </mesh>
          <Html center position={[0, 0.36, 0]}>
            <div className="orbit-label" style={{ borderColor: principios[i].color }}>
              <span className="full">{ETIQUETAS_ORBIT[principios[i].id]}</span>
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
      camera={{ position: [0, 1.2, 8.4], fov: 44 }}
      dpr={[1, 1.5]}
      gl={{ powerPreference: 'high-performance', antialias: true }}
    >
      <color attach="background" args={['#060914']} />
      <ambientLight intensity={0.45} />
      <pointLight position={[5, 5, 5]} intensity={45} color="#ffffff" />
      <pointLight position={[-5, -3, -4]} intensity={32} color="#3dd6c6" />
      <Stars radius={60} depth={40} count={1200} factor={3} fade speed={0.6} />
      <Sparkles count={40} scale={7} size={2} speed={0.4} color="#8b7cf6" />
      <Core />
      <Orbit />
      <OrbitControls
        enableZoom={false}
        enablePan={false}
        autoRotate
        autoRotateSpeed={0.35}
        rotateSpeed={0.5}
      />
    </Canvas>
  )
}
