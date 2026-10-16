import { useMemo } from 'react'
import { motion } from 'framer-motion'
import { principios } from '../data/caso'
import { presets, simulate } from '../lib/simulate'
import { useCasoStore } from '../store/useCasoStore'

function Sparkline({ data, color, invert }) {
  const w = 240
  const h = 70
  const min = Math.min(...data)
  const max = Math.max(...data)
  const span = max - min || 1
  const pts = data.map((v, i) => [(i / (data.length - 1)) * w, h - 6 - ((v - min) / span) * (h - 12)])
  const d = pts.map((p, i) => `${i ? 'L' : 'M'}${p[0].toFixed(1)},${p[1].toFixed(1)}`).join(' ')
  const gid = `g-${color.replace('#', '')}${invert ? 'i' : ''}`
  return (
    <svg className="spark" viewBox={`0 0 ${w} ${h}`} preserveAspectRatio="none" aria-hidden="true">
      <defs>
        <linearGradient id={gid} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={color} stopOpacity="0.35" />
          <stop offset="1" stopColor={color} stopOpacity="0" />
        </linearGradient>
      </defs>
      <motion.path
        d={`${d} L${w},${h} L0,${h} Z`}
        fill={`url(#${gid})`}
        animate={{ d: `${d} L${w},${h} L0,${h} Z` }}
        transition={{ duration: 0.4 }}
      />
      <motion.path
        d={d}
        fill="none"
        stroke={color}
        strokeWidth="2.4"
        strokeLinecap="round"
        animate={{ d }}
        transition={{ duration: 0.4 }}
      />
      <circle cx={pts.at(-1)[0] - 3} cy={pts.at(-1)[1]} r="4" fill={color} />
    </svg>
  )
}

const KPIS = [
  { key: 'csat', label: 'Satisfacción (CSAT)', fmt: (v) => v.toFixed(1), unit: '/5', better: 'up', color: '#5EEAD4' },
  { key: 'fallidos', label: 'Cambios fallidos', fmt: (v) => v.toFixed(0), unit: '%', better: 'down', color: '#FCA5A5' },
  { key: 'mttr', label: 'MTTR', fmt: (v) => v.toFixed(1), unit: 'h', better: 'down', color: '#E9C46A' },
  { key: 'mejora', label: 'Índice de mejora', fmt: (v) => v.toFixed(0), unit: '/100', better: 'up', color: '#F9EEE2' },
]

export default function SimulationPanel() {
  const { adopcion, setAdopcion, aplicarPreset } = useCasoStore()
  const serie = useMemo(() => simulate(adopcion), [adopcion])
  const first = serie[0]
  const last = serie.at(-1)

  const caos = adopcion[7] - adopcion[6] > 30
  const promedio = Object.values(adopcion).reduce((a, b) => a + b, 0) / 7
  const minimo = Math.min(...Object.values(adopcion))

  let alerta
  if (caos) {
    alerta = {
      cls: 'bad',
      icon: 'fa-solid fa-triangle-exclamation',
      txt: 'Estás automatizando más de lo que simplificaste: "automatizar el caos" aumenta los cambios fallidos. Primero optimiza (principio 6), luego automatiza.',
    }
  } else if (promedio < 25) {
    alerta = {
      cls: 'bad',
      icon: 'fa-solid fa-fire',
      txt: 'Dominan los bucles viciosos: la espiral del apagafuegos y la erosión de la confianza deterioran el servicio mes a mes.',
    }
  } else if (minimo < 30) {
    alerta = {
      cls: '',
      icon: 'fa-solid fa-puzzle-piece',
      txt: 'Hay mejoras, pero algún principio está casi ausente: los bucles no se refuerzan entre sí y el resultado queda por debajo de su potencial.',
    }
  } else {
    alerta = {
      cls: 'ok',
      icon: 'fa-solid fa-circle-check',
      txt: 'Los 7 principios funcionan como sistema: los bucles R1, R2 y R3 se refuerzan y B1 mantiene los cambios bajo control.',
    }
  }

  return (
    <div className="sim-layout">
      {/* Sticky mini summary for small/medium viewports */}
      <div className="sim-strip" aria-label="Resumen rápido de métricas">
        {KPIS.map((k) => (
          <div key={k.key}>
            <b style={{ color: k.color }}>
              {k.fmt(last[k.key])}
              <small style={{ fontSize: '0.7em', opacity: 0.8 }}>{k.unit}</small>
            </b>
            <span>{k.label.split(' ')[0]}</span>
          </div>
        ))}
      </div>

      <div className="stack-lg">
        <div className="g g-2 keep-2">
          {KPIS.map((k) => {
            const delta = last[k.key] - first[k.key]
            const good = k.better === 'up' ? delta >= 0 : delta <= 0
            return (
              <div key={k.key} className="glass kpi-card" id={`kpi-${k.key}`}>
                <div className="small muted">{k.label} · mes 12</div>
                <div className="kpi-top">
                  <div className="kpi-val" style={{ color: k.color }}>
                    {k.fmt(last[k.key])}
                    <span className="small muted"> {k.unit}</span>
                  </div>
                  <span className={`kpi-delta ${good ? 'up' : 'down'}`}>
                    <i className={`fa-solid ${delta >= 0 ? 'fa-arrow-trend-up' : 'fa-arrow-trend-down'}`} aria-hidden="true" />{' '}
                    {delta >= 0 ? '+' : ''}
                    {k.fmt(delta)} vs. mes 0
                  </span>
                </div>
                <Sparkline data={serie.map((s) => s[k.key])} color={k.color} />
              </div>
            )
          })}
        </div>

        <div className={`alert ${alerta.cls}`} role="status">
          <i className={alerta.icon} style={{ marginTop: 3 }} aria-hidden="true" />
          <span>{alerta.txt}</span>
        </div>

        <p className="small muted">
          <i className="fa-solid fa-circle-info" aria-hidden="true" /> Modelo ilustrativo de dinámica de sistemas (12 meses, paso mensual).
          Permite visualizar cómo los bucles se activan e interactúan según el grado de adopción de cada principio.
        </p>
      </div>

      <div className="glass card-pad stack-lg sim-controls">
        <div>
          <div className="h3">Nivel de adopción</div>
          <div className="presets mt-8">
            {Object.entries(presets).map(([key, p]) => (
              <button
                key={key}
                type="button"
                className="btn btn-sm"
                id={`preset-${key}`}
                onClick={() => aplicarPreset(key)}
              >
                <i className={p.icon} aria-hidden="true" /> {p.label}
              </button>
            ))}
          </div>
        </div>

        {principios.map((p) => (
          <div key={p.id} className="slider-row" style={{ '--pc': p.color }}>
            <label htmlFor={`slider-${p.id}`}>
              <span>
                {p.id}. {p.nombre}
              </span>
              <b>{adopcion[p.id]}%</b>
            </label>
            <input
              id={`slider-${p.id}`}
              className="range"
              type="range"
              min="0"
              max="100"
              step="5"
              value={adopcion[p.id]}
              style={{ '--val': `${adopcion[p.id]}%` }}
              onChange={(e) => setAdopcion(p.id, Number(e.target.value))}
              aria-label={`Adopción de principio ${p.id}: ${p.nombre}`}
            />
          </div>
        ))}
      </div>
    </div>
  )
}
