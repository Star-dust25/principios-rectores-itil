import { useMemo, useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Float, Html, Line, OrbitControls, Sparkles, Stars } from '@react-three/drei'
import { principios } from '../data/caso'

// Radio calibrado para que la órbita respire con amplitud y las etiquetas nunca se sientan apretadas
const RADIUS = 1.98

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
    <Float speed={1.8} rotationIntensity={0.25} floatIntensity={0.4}>
      <group ref={ref}>
        {/* Deep Ocean icosahedron gem */}
        <mesh>
          <icosahedronGeometry args={[0.7, 1]} />
          <meshStandardMaterial
            color="#182F53"
            emissive="#122440"
            emissiveIntensity={0.9}
            roughness={0.2}
            metalness={0.5}
            flatShading
          />
        </mesh>
        {/* Cream Vanilla geometric wireframe */}
        <mesh scale={1.22}>
          <icosahedronGeometry args={[0.7, 1]} />
          <meshBasicMaterial color="#F9EEE2" wireframe transparent opacity={0.45} />
        </mesh>
      </group>
      <Html center position={[0, -1.15, 0]}>
        <div className="orbit-label" style={{ borderColor: '#F9EEE2', color: '#F9EEE2' }}>
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
      {/* Cream Vanilla subtle orbital ring */}
      <Line points={ring} color="#F9EEE2" lineWidth={1.2} transparent opacity={0.35} />
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
      camera={{ position: [0, 0.7, 9.1], fov: 41 }}
      dpr={[1, 1.5]}
      gl={{ powerPreference: 'high-performance', antialias: true }}
    >
      <color attach="background" args={['#0c1829']} />
      <ambientLight intensity={0.55} />
      <pointLight position={[5, 5, 5]} intensity={50} color="#F9EEE2" />
      <pointLight position={[-5, -3, -4]} intensity={35} color="#70B8FF" />
      <Stars radius={60} depth={40} count={1200} factor={3} fade speed={0.6} />
      <Sparkles count={40} scale={6.5} size={2} speed={0.4} color="#F9EEE2" />
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
