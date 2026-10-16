import { useState, useRef } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { diagramas } from '../data/diagramas'
import { useCasoStore } from '../store/useCasoStore'

const HW = 92 // media anchura del nodo
const HH = 30 // media altura del nodo

const COLORS = {
  base: 'rgba(168, 178, 220, 0.55)',
  input: '#ff6b81',
  R: '#3dd6c6',
  B: '#f5b941',
}

// Intersección de la recta centro→objetivo con el borde del rectángulo del nodo.
function edgePoint(cx, cy, tx, ty, pad = 6) {
  const dx = tx - cx
  const dy = ty - cy
  const sx = dx === 0 ? Infinity : (HW + pad) / Math.abs(dx)
  const sy = dy === 0 ? Infinity : (HH + pad) / Math.abs(dy)
  const s = Math.min(sx, sy)
  return [cx + dx * s, cy + dy * s]
}

function quad(p0, c, p1, t) {
  const u = 1 - t
  return [u * u * p0[0] + 2 * u * t * c[0] + t * t * p1[0], u * u * p0[1] + 2 * u * t * c[1] + t * t * p1[1]]
}

function quadTangent(p0, c, p1, t) {
  const dx = 2 * (1 - t) * (c[0] - p0[0]) + 2 * t * (p1[0] - c[0])
  const dy = 2 * (1 - t) * (c[1] - p0[1]) + 2 * t * (p1[1] - c[1])
  const l = Math.hypot(dx, dy) || 1
  return [dx / l, dy / l]
}

function buildEdge(a, b, curve = 0) {
  const dx = b.x - a.x
  const dy = b.y - a.y
  const len = Math.hypot(dx, dy)
  const ctrl = [(a.x + b.x) / 2 + (-dy / len) * curve * len, (a.y + b.y) / 2 + (dx / len) * curve * len]
  const p0 = edgePoint(a.x, a.y, ctrl[0], ctrl[1])
  const p1 = edgePoint(b.x, b.y, ctrl[0], ctrl[1], 10)
  return { p0, p1, ctrl, d: `M${p0[0]},${p0[1]} Q${ctrl[0]},${ctrl[1]} ${p1[0]},${p1[1]}` }
}

function LoopMarker({ loop, active, dim, onClick }) {
  const color = COLORS[loop.tipo]
  const r = 25
  const a0 = (-70 * Math.PI) / 180
  const a1 = (230 * Math.PI) / 180
  const x0 = r * Math.cos(a0)
  const y0 = r * Math.sin(a0)
  const x1 = r * Math.cos(a1)
  const y1 = r * Math.sin(a1)
  return (
    <g
      className={`cld-loop ${loop.ccw ? 'ccw' : ''} ${dim ? 'cld-dim' : ''}`}
      transform={`translate(${loop.x},${loop.y})`}
      onClick={onClick}
      role="button"
      aria-label={`Bucle ${loop.id}: ${loop.nombre}`}
      id={`loop-marker-${loop.id}`}
      style={{ cursor: 'pointer' }}
    >
      <circle
        r={r + 9}
        fill={active ? `${color}22` : 'rgba(6,9,20,0.85)'}
        stroke={active ? color : 'transparent'}
        strokeWidth="2"
      />
      <g transform={loop.ccw ? 'scale(-1,1)' : undefined}>
        <g>
          <path
            d={`M${x0},${y0} A${r},${r} 0 1 1 ${x1},${y1}`}
            fill="none"
            stroke={color}
            strokeWidth="2.4"
            strokeLinecap="round"
            markerEnd={`url(#arrow-${loop.tipo})`}
          />
          <animateTransform
            attributeName="transform"
            type="rotate"
            from="0 0 0"
            to="360 0 0"
            dur="7s"
            repeatCount="indefinite"
          />
        </g>
      </g>
      <text textAnchor="middle" dominantBaseline="central" fill={color}>
        {loop.id.replace('R0b', 'R0′')}
      </text>
    </g>
  )
}

export default function CausalLoopDiagram() {
  const { modo, bucleActivo, principioActivo, toggleBucle } = useCasoStore()
  const data = diagramas[modo]
  const byId = Object.fromEntries(data.nodes.map((n) => [n.id, n]))

  const [zoom, setZoom] = useState(1)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const wrapRef = useRef(null)

  const activeLoopObj = data.loops.find((l) => l.id === bucleActivo)
  const isEdgeHL = (e) =>
    (bucleActivo && e.loops.includes(bucleActivo)) || (principioActivo && e.p?.includes(principioActivo))
  const filtering = Boolean(bucleActivo || principioActivo)
  const hlNodes = new Set()
  data.edges.forEach((e) => {
    if (isEdgeHL(e)) {
      hlNodes.add(e.from)
      hlNodes.add(e.to)
    }
  })

  const edgeColor = (e) => {
    if (filtering && isEdgeHL(e)) {
      if (activeLoopObj) return COLORS[activeLoopObj.tipo]
      return COLORS.R
    }
    if (byId[e.from].type === 'input') return COLORS.input
    return COLORS.base
  }
  const markerFor = (e) => {
    if (filtering && isEdgeHL(e)) return activeLoopObj ? activeLoopObj.tipo : 'R'
    if (byId[e.from].type === 'input') return 'input'
    return 'base'
  }

  const handleZoom = (delta) => {
    setZoom((z) => Math.max(0.8, Math.min(1.8, Number((z + delta).toFixed(1)))))
  }

  const toggleFullscreen = () => {
    if (!wrapRef.current) return
    if (!document.fullscreenElement) {
      wrapRef.current.requestFullscreen?.().then(() => setIsFullscreen(true)).catch(() => {})
    } else {
      document.exitFullscreen?.().then(() => setIsFullscreen(false)).catch(() => {})
    }
  }

  return (
    <div ref={wrapRef} className="cld-wrap-inner" style={{ width: '100%' }}>
      {/* Interactive Diagram Toolbar for Mobile/Tablet UX */}
      <div className="cld-toolbar">
        <div className="small muted">
          <i className="fa-solid fa-hand-pointer" aria-hidden="true" /> Toca nodos o bucles para interactuar
        </div>
        <div className="zoom">
          <button
            type="button"
            className="btn btn-sm btn-icon"
            onClick={() => handleZoom(-0.2)}
            title="Reducir zoom"
            aria-label="Reducir zoom"
          >
            <i className="fa-solid fa-minus" aria-hidden="true" />
          </button>
          <span className="zoom-val">{Math.round(zoom * 100)}%</span>
          <button
            type="button"
            className="btn btn-sm btn-icon"
            onClick={() => handleZoom(0.2)}
            title="Aumentar zoom"
            aria-label="Aumentar zoom"
          >
            <i className="fa-solid fa-plus" aria-hidden="true" />
          </button>
          <button
            type="button"
            className="btn btn-sm"
            onClick={() => setZoom(1)}
            title="Restablecer escala"
            style={{ padding: '6px 10px', fontSize: '0.78rem' }}
          >
            100%
          </button>
          <button
            type="button"
            className="btn btn-sm btn-icon"
            onClick={toggleFullscreen}
            title={isFullscreen ? 'Salir de pantalla completa' : 'Pantalla completa'}
            aria-label={isFullscreen ? 'Salir de pantalla completa' : 'Pantalla completa'}
          >
            <i className={isFullscreen ? 'fa-solid fa-compress' : 'fa-solid fa-expand'} aria-hidden="true" />
          </button>
        </div>
      </div>

      <div className="cld-scroll" style={{ '--zoom': zoom }}>
        <AnimatePresence mode="wait">
          <motion.svg
            key={modo}
            className="cld-svg"
            viewBox="0 0 1100 740"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.35 }}
            role="img"
            aria-label={modo === 'itil' ? 'Diagrama causal del arquetipo ITIL' : 'Diagrama causal de la situación actual'}
          >
            <defs>
              {Object.entries(COLORS).map(([k, c]) => (
                <marker
                  key={k}
                  id={`arrow-${k}`}
                  viewBox="0 0 10 10"
                  refX="7"
                  refY="5"
                  markerWidth="7"
                  markerHeight="7"
                  orient="auto-start-reverse"
                >
                  <path d="M0,0 L10,5 L0,10 z" fill={c} />
                </marker>
              ))}
              <linearGradient id="node-in" x1="0" x2="1">
                <stop offset="0" stopColor="#ff6b81" stopOpacity="0.22" />
                <stop offset="1" stopColor="#ff6b81" stopOpacity="0.08" />
              </linearGradient>
              <linearGradient id="node-out" x1="0" x2="1">
                <stop offset="0" stopColor="#4ade80" stopOpacity="0.08" />
                <stop offset="1" stopColor="#4ade80" stopOpacity="0.22" />
              </linearGradient>
              <linearGradient id="node-mid" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0" stopColor="#1a2146" />
                <stop offset="1" stopColor="#10152e" />
              </linearGradient>
              <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur stdDeviation="6" result="b" />
                <feMerge>
                  <feMergeNode in="b" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            {/* Enlaces */}
            {data.edges.map((e, i) => {
              const a = byId[e.from]
              const b = byId[e.to]
              const { p0, p1, ctrl, d } = buildEdge(a, b, e.curve)
              const hl = filtering && isEdgeHL(e)
              const dim = filtering && !hl
              const color = edgeColor(e)
              // Polaridad cerca de la punta
              const pt = quad(p0, ctrl, p1, 0.8)
              const tg = quadTangent(p0, ctrl, p1, 0.8)
              const off = 16
              const lp = [pt[0] - tg[1] * off, pt[1] + tg[0] * off]
              const mid = quad(p0, ctrl, p1, 0.5)
              const mt = quadTangent(p0, ctrl, p1, 0.5)
              return (
                <g key={i} className={`cld-edge ${hl ? 'hl' : ''} ${dim ? 'cld-dim' : ''}`}>
                  <path className="line" d={d} stroke={color} markerEnd={`url(#arrow-${markerFor(e)})`} />
                  {e.delay && (
                    <g stroke={color} strokeWidth="2.4">
                      {[-4, 4].map((s) => (
                        <line
                          key={s}
                          x1={mid[0] + mt[0] * s - mt[1] * 10}
                          y1={mid[1] + mt[1] * s + mt[0] * 10}
                          x2={mid[0] + mt[0] * s + mt[1] * 10}
                          y2={mid[1] + mt[1] * s - mt[0] * 10}
                        />
                      ))}
                    </g>
                  )}
                  <circle cx={lp[0]} cy={lp[1]} r="10" fill="#0b1022" stroke={color} strokeOpacity="0.5" />
                  <text
                    className="cld-pol"
                    x={lp[0]}
                    y={lp[1] + 1}
                    textAnchor="middle"
                    dominantBaseline="central"
                    fill={e.pol === '+' ? '#3dd6c6' : '#ff6b81'}
                  >
                    {e.pol === '+' ? '+' : '−'}
                  </text>
                </g>
              )
            })}

            {/* Nodos */}
            {data.nodes.map((n) => {
              const dim = filtering && !hlNodes.has(n.id)
              const fill =
                n.type === 'input'
                  ? 'url(#node-in)'
                  : n.type === 'output'
                    ? 'url(#node-out)'
                    : 'url(#node-mid)'
              const stroke =
                n.type === 'input'
                  ? 'rgba(255,107,129,0.6)'
                  : n.type === 'output'
                    ? 'rgba(74,222,128,0.6)'
                    : 'rgba(139,124,246,0.45)'
              return (
                <g key={n.id} className={`cld-node ${dim ? 'cld-dim' : ''}`} id={`node-${n.id}`}>
                  <rect
                    x={n.x - HW}
                    y={n.y - HH}
                    width={HW * 2}
                    height={HH * 2}
                    rx="14"
                    fill={fill}
                    stroke={stroke}
                    strokeWidth="1.5"
                    filter={filtering && !dim ? 'url(#glow)' : undefined}
                  />
                  {n.type && (
                    <text
                      className="tag"
                      x={n.x}
                      y={n.y - HH - 9}
                      textAnchor="middle"
                      fill={n.type === 'input' ? '#ff6b81' : '#4ade80'}
                    >
                      {n.type === 'input' ? 'ENTRADA' : 'SALIDA'}
                    </text>
                  )}
                  {n.label.map((line, i) => (
                    <text
                      key={i}
                      x={n.x}
                      y={n.y + (i - (n.label.length - 1) / 2) * 18}
                      textAnchor="middle"
                      dominantBaseline="central"
                    >
                      {line}
                    </text>
                  ))}
                </g>
              )
            })}

            {/* Marcadores de bucle */}
            {data.loops.map((l) => (
              <LoopMarker
                key={l.id}
                loop={l}
                active={bucleActivo === l.id}
                dim={filtering && bucleActivo !== l.id && !principioActivo}
                onClick={() => toggleBucle(l.id)}
              />
            ))}
          </motion.svg>
        </AnimatePresence>
      </div>
    </div>
  )
}
