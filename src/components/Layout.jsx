import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion, useScroll, useSpring, AnimatePresence } from 'framer-motion'

export function ScrollProgress() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 400, damping: 40, restDelta: 0.001 })

  return (
    <motion.div
      className="progress"
      style={{ scaleX }}
      aria-hidden="true"
    />
  )
}

export function BackToTop() {
  const [show, setShow] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setShow(window.scrollY > 350)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <AnimatePresence>
      {show && (
        <motion.button
          className="to-top"
          id="btn-to-top"
          onClick={scrollToTop}
          initial={{ opacity: 0, scale: 0.8, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 10 }}
          transition={{ duration: 0.2 }}
          aria-label="Volver arriba"
        >
          <i className="fa-solid fa-arrow-up" aria-hidden="true" />
        </motion.button>
      )}
    </AnimatePresence>
  )
}

export function Page({ children }) {
  return (
    <motion.main
      id="main-content"
      className="page"
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.45, ease: [0.2, 0.8, 0.2, 1] }}
    >
      {children}
    </motion.main>
  )
}

export function Reveal({ children, delay = 0, className, style }) {
  return (
    <motion.div
      className={className}
      style={style}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.55, delay, ease: [0.2, 0.8, 0.2, 1] }}
    >
      {children}
    </motion.div>
  )
}

export function PageNav({ prev, next }) {
  return (
    <div className="page-nav sec">
      {prev ? (
        <Link to={prev.to} className="btn" id="page-prev">
          <i className="fa-solid fa-arrow-left" aria-hidden="true" /> {prev.label}
        </Link>
      ) : (
        <span />
      )}
      {next && (
        <Link to={next.to} className="btn btn-primary" id="page-next">
          {next.label} <i className="fa-solid fa-arrow-right" aria-hidden="true" />
        </Link>
      )}
    </div>
  )
}

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="container-x">
        <span>Caso 02 · Arquetipo sistémico con los 7 principios rectores de ITIL 4</span>
        <span>TransAndina Logística S.A.S. · Enfoque sistémico de gestión de TI</span>
      </div>
    </footer>
  )
}
