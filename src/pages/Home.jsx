import { lazy, Suspense } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Page, Reveal } from '../components/Layout'
import { empresa } from '../data/caso'

const Hero3D = lazy(() => import('../components/Hero3D'))

const pasos = [
  {
    n: '01',
    to: '/contexto',
    titulo: 'Contexto de la empresa',
    texto: 'TransAndina Logística: desalineación, cero métricas y cambios caóticos.',
    grad: 'grad-text-warm',
  },
  {
    n: '02',
    to: '/principios',
    titulo: 'Aplicación de los principios',
    texto: 'Cómo se aplica cada uno de los 7 principios rectores de ITIL 4.',
    grad: 'grad-text',
  },
  {
    n: '03',
    to: '/arquetipo',
    titulo: 'Arquetipo sistémico',
    texto: 'Diagrama causal interactivo con bucles de refuerzo y equilibrio + simulación.',
    grad: 'grad-text',
  },
  {
    n: '04',
    to: '/conclusion',
    titulo: 'Conclusión',
    texto: 'Beneficios de integrar los principios como un sistema interconectado.',
    grad: 'grad-text-warm',
  },
]

export default function Home() {
  return (
    <Page>
      <div className="container-x">
        <section className="hero-grid">
          <div>
            <motion.span
              className="eyebrow"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.1 }}
            >
              <i className="fa-solid fa-diagram-project" aria-hidden="true" /> Caso práctico 02 · ITIL 4 + Dinámica de sistemas
            </motion.span>
            <motion.h1
              className="h1"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15, duration: 0.6 }}
            >
              Un arquetipo sistémico con los <span className="grad-text">7 principios rectores</span> de ITIL
            </motion.h1>
            <motion.p
              className="lead"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              {empresa.nombre} pasa de la espiral del "apagafuegos" a un círculo virtuoso de valor, aprendizaje y mejora
              continua. Explora el caso, el diagrama causal y simula el efecto de cada principio.
            </motion.p>
            <motion.div
              className="hero-actions"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.45 }}
            >
              <Link to="/contexto" className="btn btn-primary" id="hero-start">
                Comenzar el caso <i className="fa-solid fa-arrow-right" aria-hidden="true" />
              </Link>
              <Link to="/arquetipo" className="btn" id="hero-diagram">
                <i className="fa-solid fa-circle-nodes" aria-hidden="true" /> Ver el arquetipo
              </Link>
            </motion.div>
            <motion.div
              className="hero-stats"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              <div className="hero-stat">
                <strong className="grad-text">2,6 → 4,3</strong>
                <span>Satisfacción (CSAT)</span>
              </div>
              <div className="hero-stat">
                <strong className="grad-text-warm">32% → 8%</strong>
                <span>Cambios fallidos</span>
              </div>
              <div className="hero-stat">
                <strong className="grad-text">4 bucles</strong>
                <span>R1 · R2 · B1 · R3</span>
              </div>
            </motion.div>
          </div>
          <motion.div
            className="hero-canvas"
            initial={{ opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            <Suspense fallback={null}>
              <Hero3D />
            </Suspense>
          </motion.div>
        </section>

        <section className="sec">
          <Reveal>
            <span className="eyebrow">Estructura del caso</span>
            <h2 className="h2">Cuatro partes, un sistema</h2>
          </Reveal>
          <div className="g g-4 mt-24">
            {pasos.map((p, i) => (
              <Reveal key={p.n} delay={i * 0.08}>
                <Link to={p.to} className="glass card-pad hover-lift step-card" id={`step-${p.n}`}>
                  <span className={`step-num ${p.grad}`}>{p.n}</span>
                  <h3 className="h3">{p.titulo}</h3>
                  <p className="muted small">{p.texto}</p>
                  <span className="go">
                    Explorar <i className="fa-solid fa-arrow-right" aria-hidden="true" />
                  </span>
                </Link>
              </Reveal>
            ))}
          </div>
        </section>
      </div>
    </Page>
  )
}
