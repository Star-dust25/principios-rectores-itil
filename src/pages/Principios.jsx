import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Page, PageNav, Reveal } from '../components/Layout'
import { principios, problemas } from '../data/caso'

function Detalle({ p, onClose }) {
  useEffect(() => {
    const onKey = (e) => e.key === 'Escape' && onClose()
    window.addEventListener('keydown', onKey)
    document.body.classList.add('no-scroll')
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.classList.remove('no-scroll')
    }
  }, [onClose])

  return (
    <motion.div
      className="dlg-backdrop"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        className="glass card-pad dlg stack-lg"
        style={{ '--pc': p.color }}
        layoutId={`principio-${p.id}`}
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby={`detalle-${p.id}`}
      >
        <div className="dlg-grabber" aria-hidden="true" />
        <button
          className="dlg-close"
          onClick={onClose}
          aria-label="Cerrar detalle"
          id="modal-close"
        >
          <i className="fa-solid fa-xmark" aria-hidden="true" />
        </button>
        <div className="flex items-center gap-16" style={{ paddingRight: 44 }}>
          <div className="principle-icon">
            <i className={p.icon} aria-hidden="true" />
          </div>
          <div>
            <div className="principle-num">PRINCIPIO {p.id}</div>
            <h2 className="h3" id={`detalle-${p.id}`} style={{ fontSize: '1.4rem' }}>
              {p.nombre}
            </h2>
          </div>
        </div>
        <p className="muted">{p.resumen}</p>
        <div>
          <div className="eyebrow" style={{ color: p.color }}>
            Cómo lo aplica TransAndina
          </div>
          <ul className="check-list mt-16">
            {p.acciones.map((a) => (
              <li key={a}>
                <i className="fa-solid fa-check" style={{ color: p.color }} aria-hidden="true" />
                <span>{a}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="flex wrap gap-8">
          {p.contrarresta.map((c) => (
            <span key={c} className="chip chip-danger wrap-ok">
              <i className="fa-solid fa-shield" aria-hidden="true" /> Contrarresta: {problemas.find((x) => x.id === c)?.titulo}
            </span>
          ))}
          {p.bucles.map((b) => (
            <span key={b} className={`chip chip-loop-${b[0]}`}>
              <i className="fa-solid fa-rotate" aria-hidden="true" /> Bucle {b}
            </span>
          ))}
        </div>
      </motion.div>
    </motion.div>
  )
}

export default function Principios() {
  const [sel, setSel] = useState(null)
  const actual = principios.find((p) => p.id === sel)

  return (
    <Page>
      <div className="container-x">
        <Reveal>
          <span className="eyebrow">2 · Aplicación de los principios</span>
          <h1 className="h1">
            Los <span className="grad-text">7 principios rectores</span> en acción
          </h1>
          <p className="lead">
            Cada principio ataca uno o varios problemas raíz y alimenta un bucle de retroalimentación. Toca o haz clic
            en una tarjeta para ver las acciones concretas implementadas en TransAndina.
          </p>
        </Reveal>

        <div className="g g-4 sec" style={{ marginTop: 36 }}>
          {principios.map((p, i) => (
            <Reveal key={p.id} delay={i * 0.05}>
              <motion.button
                layoutId={`principio-${p.id}`}
                className="glass card-pad hover-lift principle-card stack h-full"
                style={{ '--pc': p.color }}
                onClick={() => setSel(p.id)}
                id={`principio-card-${p.id}`}
                aria-haspopup="dialog"
              >
                <div className="flex between items-center">
                  <div className="principle-icon">
                    <i className={p.icon} aria-hidden="true" />
                  </div>
                  <span className="principle-num">0{p.id}</span>
                </div>
                <h3 className="h3">{p.nombre}</h3>
                <p className="muted small">{p.resumen}</p>
                <div className="flex between items-center wrap gap-8" style={{ marginTop: 'auto', paddingTop: 8 }}>
                  <div className="flex gap-8">
                    {p.bucles.map((b) => (
                      <span key={b} className={`chip chip-loop-${b[0]}`}>
                        {b}
                      </span>
                    ))}
                  </div>
                  <span className="card-cta">
                    Ver más <i className="fa-solid fa-chevron-right small" aria-hidden="true" />
                  </span>
                </div>
              </motion.button>
            </Reveal>
          ))}
          <Reveal delay={0.35}>
            <div
              className="glass card-pad stack h-full"
              style={{
                background: 'linear-gradient(135deg, rgba(139,124,246,0.18), rgba(61,214,198,0.1))',
              }}
            >
              <div className="icon-badge">
                <i className="fa-solid fa-lightbulb" aria-hidden="true" />
              </div>
              <h3 className="h3">Ningún principio funciona solo</h3>
              <p className="muted small">
                Automatizar sin simplificar automatiza el caos; iterar sin visibilidad no deja aprender; centrarse en el valor
                sin visión holística ignora a los proveedores.
              </p>
            </div>
          </Reveal>
        </div>

        <section className="sec">
          <Reveal>
            <span className="eyebrow">Matriz de cobertura</span>
            <h2 className="h2">¿Qué problema contrarresta cada principio?</h2>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="glass mt-24 table-scroll">
              <table className="data-table matrix">
                <thead>
                  <tr>
                    <th>Principio</th>
                    {problemas.map((p) => (
                      <th key={p.id} style={{ textAlign: 'center' }}>
                        {p.titulo}
                      </th>
                    ))}
                    <th>Bucles</th>
                  </tr>
                </thead>
                <tbody>
                  {principios.map((p) => (
                    <tr key={p.id}>
                      <td style={{ color: 'var(--text)' }}>
                        <span style={{ color: p.color, fontWeight: 700 }}>{p.id}.</span> {p.nombre}
                      </td>
                      {problemas.map((pr) =>
                        p.contrarresta.includes(pr.id) ? (
                          <td key={pr.id} className="hit">
                            <i className="fa-solid fa-circle-check" aria-hidden="true" />
                          </td>
                        ) : (
                          <td key={pr.id} className="miss">
                            ·
                          </td>
                        ),
                      )}
                      <td>
                        <div className="flex gap-8">
                          {p.bucles.map((b) => (
                            <span key={b} className={`chip chip-loop-${b[0]}`}>
                              {b}
                            </span>
                          ))}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="scroll-hint">
              <i className="fa-solid fa-arrows-left-right" aria-hidden="true" /> Desliza horizontalmente para ver la tabla completa
            </div>
          </Reveal>
        </section>

        <PageNav
          prev={{ to: '/contexto', label: '1. Contexto' }}
          next={{ to: '/arquetipo', label: '3. Arquetipo sistémico' }}
        />
      </div>

      <AnimatePresence>
        {actual && <Detalle p={actual} onClose={() => setSel(null)} />}
      </AnimatePresence>
    </Page>
  )
}
