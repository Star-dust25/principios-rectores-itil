import { motion } from 'framer-motion'
import CausalLoopDiagram from '../components/CausalLoopDiagram'
import SimulationPanel from '../components/SimulationPanel'
import { Page, PageNav, Reveal } from '../components/Layout'
import { principios } from '../data/caso'
import { diagramas, tablaBucles } from '../data/diagramas'
import { useCasoStore } from '../store/useCasoStore'

const contrarresta = [
  { entrada: 'Desalineación con el negocio', principios: [1, 4, 5], bucles: ['R1'] },
  { entrada: 'Ausencia de métricas', principios: [2, 3, 4], bucles: ['R2', 'B1'] },
  { entrada: 'Mala gestión del cambio', principios: [6, 5, 7], bucles: ['B1', 'R3'] },
]

export default function Arquetipo() {
  const { modo, setModo, bucleActivo, toggleBucle, principioActivo, togglePrincipio } = useCasoStore()
  const data = diagramas[modo]

  return (
    <Page>
      <div className="container-x">
        <Reveal>
          <span className="eyebrow">3 · Diseño del arquetipo sistémico</span>
          <h1 className="h1">
            De la <span className="grad-text-warm">espiral del apagafuegos</span> a la{' '}
            <span className="grad-text">espiral de valor</span>
          </h1>
          <p className="lead">
            Diagrama de bucles causales (CLD). Un enlace <b style={{ color: 'var(--teal)' }}>(+)</b> indica que ambas variables se
            mueven en el mismo sentido; <b style={{ color: 'var(--danger)' }}>(−)</b> en sentido opuesto. Los bucles{' '}
            <b style={{ color: 'var(--teal)' }}>R</b> se refuerzan y los <b style={{ color: 'var(--amber)' }}>B</b> equilibran.
          </p>
        </Reveal>

        <div className="flex between items-center wrap gap-16 mt-32">
          <div className="segmented" role="tablist" aria-label="Modo del diagrama">
            {[
              { k: 'actual', label: 'Situación actual', icon: 'fa-solid fa-fire' },
              { k: 'itil', label: 'Arquetipo ITIL', icon: 'fa-solid fa-seedling' },
            ].map((t) => (
              <button
                key={t.k}
                role="tab"
                aria-selected={modo === t.k}
                id={`modo-${t.k}`}
                className={modo === t.k ? 'on' : ''}
                onClick={() => setModo(t.k)}
              >
                {modo === t.k && (
                  <motion.span layoutId="seg-pill" className={`seg-pill ${t.k === 'actual' ? 'warm' : ''}`} />
                )}
                <i className={t.icon} aria-hidden="true" /> {t.label}
              </button>
            ))}
          </div>

          <div className="legend">
            <span>
              <i className="sw" style={{ background: 'rgba(255,107,129,0.2)', borderColor: '#ff6b81' }} aria-hidden="true" />{' '}
              Entrada (problema)
            </span>
            <span>
              <i className="sw" style={{ background: 'rgba(74,222,128,0.2)', borderColor: '#4ade80' }} aria-hidden="true" /> Salida
            </span>
            {modo === 'actual' && (
              <span>
                <b style={{ letterSpacing: -2 }}>‖</b> Retraso temporal
              </span>
            )}
          </div>
        </div>

        <div className="cld-layout mt-16">
          <div className="glass cld-wrap">
            <CausalLoopDiagram />
          </div>

          <aside className="stack">
            <div className="small muted">Toca un bucle para resaltarlo en el diagrama:</div>
            <div className="loop-list">
              {data.loops.map((l) => (
                <button
                  key={l.id}
                  type="button"
                  className={`loop-item ${l.tipo} ${bucleActivo === l.id ? 'active' : ''}`}
                  onClick={() => toggleBucle(l.id)}
                  id={`loop-item-${l.id}`}
                  aria-pressed={bucleActivo === l.id}
                >
                  <div className="flex items-center gap-8">
                    <span className={`chip chip-loop-${l.tipo}`}>{l.id.replace('R0b', 'R0′')}</span>
                    <strong style={{ fontFamily: 'var(--font-display)' }}>{l.nombre}</strong>
                  </div>
                  <div className="chain">{l.cadena}</div>
                  {bucleActivo === l.id && (
                    <motion.p
                      className="small muted mt-8"
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      style={{ lineHeight: 1.55 }}
                    >
                      {l.texto}
                    </motion.p>
                  )}
                </button>
              ))}
            </div>

            {modo === 'itil' && (
              <div className="mt-8">
                <div className="small muted" style={{ marginBottom: 10 }}>
                  …o selecciona un principio para ver su impacto causal:
                </div>
                <div className="flex wrap gap-8">
                  {principios.map((p) => (
                    <button
                      key={p.id}
                      type="button"
                      className={`principle-chip ${principioActivo === p.id ? 'active' : ''}`}
                      style={{ '--pc': p.color }}
                      onClick={() => togglePrincipio(p.id)}
                      id={`principio-chip-${p.id}`}
                      title={p.nombre}
                      aria-pressed={principioActivo === p.id}
                    >
                      <span className="dot" aria-hidden="true" /> {p.id}. {p.nombre.split(' ').slice(0, 2).join(' ')}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </aside>
        </div>

        <section className="sec">
          <Reveal>
            <span className="eyebrow">Lectura del arquetipo</span>
            <h2 className="h2">Cómo los principios contrarrestan las variables de entrada</h2>
          </Reveal>
          <div className="g g-3 mt-24">
            {contrarresta.map((c, i) => (
              <Reveal key={c.entrada} delay={i * 0.08}>
                <div className="glass card-pad stack h-full">
                  <span className="chip chip-danger" style={{ justifySelf: 'start' }}>
                    <i className="fa-solid fa-arrow-right-to-bracket" aria-hidden="true" /> Entrada
                  </span>
                  <h3 className="h3">{c.entrada}</h3>
                  <div className="stack" style={{ gap: 8 }}>
                    {c.principios.map((id) => {
                      const p = principios.find((x) => x.id === id)
                      return (
                        <div key={id} className="flex items-center gap-8 small" style={{ color: p.color }}>
                          <i className={p.icon} aria-hidden="true" /> <span style={{ color: 'var(--text-dim)' }}>{p.nombre}</span>
                        </div>
                      )
                    })}
                  </div>
                  <div className="flex gap-8 mt-8">
                    {c.bucles.map((b) => (
                      <span key={b} className={`chip chip-loop-${b[0]}`}>
                        <i className="fa-solid fa-rotate" aria-hidden="true" /> Activa {b}
                      </span>
                    ))}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.1}>
            <div className="glass card-pad mt-24">
              <p className="muted" style={{ lineHeight: 1.7 }}>
                <b style={{ color: 'var(--text)' }}>Punto de apalancamiento:</b> el bucle <b className="grad-text">R3</b>{' '}
                comparte las variables <i>Incidentes</i> y <i>Tasa de cambios exitosos</i> con la espiral del apagafuegos, pero
                las recorre en sentido inverso. Cuando "Mantenerlo simple" y "Optimizar y automatizar" liberan capacidad, ese
                tiempo se reinvierte en mejora; la mejora alimenta el aprendizaje (R2), estabiliza los cambios (B1) y genera
                valor visible que asegura el patrocinio de la dirección (R1). Los cuatro bucles convergen en las variables de
                salida: <b style={{ color: 'var(--success)' }}>mejora continua</b> y{' '}
                <b style={{ color: 'var(--success)' }}>satisfacción del usuario</b>.
              </p>
            </div>
          </Reveal>
        </section>

        <section className="sec" id="tabla-bucles">
          <Reveal>
            <span className="eyebrow">Matriz sistémica</span>
            <h2 className="h2">Explicación de los 4 bucles (R1 · R2 · B1 · R3)</h2>
            <p className="lead">
              Conoce el propósito, el circuito causal cerrado y los principios de ITIL 4 que componen cada bucle del arquetipo.
            </p>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="glass mt-24 table-scroll">
              <table className="data-table">
                <thead>
                  <tr>
                    <th style={{ width: '85px' }}>Bucle</th>
                    <th style={{ minWidth: '170px' }}>Nombre y tipo</th>
                    <th style={{ minWidth: '270px' }}>Circuito causal (Paso a paso)</th>
                    <th style={{ minWidth: '260px' }}>Propósito e impacto sistémico</th>
                    <th style={{ minWidth: '190px' }}>Principios impulsores</th>
                  </tr>
                </thead>
                <tbody>
                  {tablaBucles.map((b) => (
                    <tr
                      key={b.id}
                      className={bucleActivo === b.id ? 'row-active' : ''}
                      onClick={() => toggleBucle(b.id)}
                      style={{ cursor: 'pointer' }}
                      title="Haz clic para resaltar este bucle en el diagrama causal superior"
                    >
                      <td>
                        <span className={`chip chip-loop-${b.tipo}`}>
                          {b.id}
                        </span>
                      </td>
                      <td>
                        <strong style={{ display: 'block', color: 'var(--cream)', fontFamily: 'var(--font-display)', fontSize: '1.02rem' }}>
                          {b.nombre}
                        </strong>
                        <span className="small muted">{b.tipoTexto}</span>
                      </td>
                      <td>
                        <code className="chain-code">{b.cadena}</code>
                      </td>
                      <td>
                        <p className="small" style={{ margin: 0, lineHeight: 1.55 }}>
                          {b.proposito}
                        </p>
                        <p className="small muted" style={{ margin: '6px 0 0', fontStyle: 'italic' }}>
                          <b style={{ color: 'var(--seafoam)' }}>Impacto:</b> {b.impacto}
                        </p>
                      </td>
                      <td>
                        <div className="flex wrap gap-6">
                          {b.principios.map((id) => {
                            const p = principios.find((x) => x.id === id)
                            return (
                              <span
                                key={id}
                                className="principle-pill-sm"
                                style={{ '--pc': p.color }}
                              >
                                <i className={p.icon} aria-hidden="true" /> P{p.id} · {p.nombre.split(' ')[0]}
                              </span>
                            )
                          })}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="scroll-hint">
              <i className="fa-solid fa-arrows-left-right" aria-hidden="true" /> Desliza horizontalmente para ver la tabla completa · Toca una fila para resaltar el bucle en el diagrama
            </div>
          </Reveal>
        </section>

        <section className="sec">
          <Reveal>
            <span className="eyebrow">Simulación interactiva</span>
            <h2 className="h2">¿Qué pasa si aplicas solo algunos principios?</h2>
            <p className="lead">
              Ajusta el nivel de adopción de cada principio y observa la evolución a 12 meses. Prueba "Solo automatizar" para
              ver por qué el principio 7 exige optimizar primero.
            </p>
          </Reveal>
          <div className="mt-24">
            <SimulationPanel />
          </div>
        </section>

        <PageNav
          prev={{ to: '/principios', label: '2. Principios' }}
          next={{ to: '/conclusion', label: '4. Conclusión' }}
        />
      </div>
    </Page>
  )
}
