import { useState, useEffect } from 'react'
import { NavLink, Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'

const links = [
  { to: '/', label: 'Inicio', end: true },
  { to: '/contexto', num: '1', label: 'Contexto' },
  { to: '/principios', num: '2', label: 'Principios' },
  { to: '/arquetipo', num: '3', label: 'Arquetipo' },
  { to: '/conclusion', num: '4', label: 'Conclusión' },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const location = useLocation()

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (open) {
      document.body.classList.add('no-scroll')
    } else {
      document.body.classList.remove('no-scroll')
    }
    return () => document.body.classList.remove('no-scroll')
  }, [open])

  // Close drawer on Escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && open) setOpen(false)
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [open])

  return (
    <header className="nav">
      <div className="container-x nav-inner">
        <Link to="/" className="brand" id="nav-brand">
          <span className="brand-logo" aria-hidden="true">7</span>
          <span>
            Caso 02 <span className="muted brand-sub" style={{ fontWeight: 500 }}>· ITIL 4</span>
          </span>
        </Link>

        {/* Desktop navigation */}
        <nav className="nav-links desktop" aria-label="Navegación principal">
          {links.map((l) => {
            const active = l.end ? location.pathname === l.to : location.pathname.startsWith(l.to)
            return (
              <NavLink
                key={l.to}
                to={l.to}
                end={l.end}
                id={`nav-${l.to.replace('/', '') || 'inicio'}`}
                className={`nav-link ${active ? 'active' : ''}`}
              >
                {active && (
                  <motion.span
                    layoutId="nav-pill"
                    className="nav-pill"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
                {l.num && <span className="num">{l.num}.</span>}
                <span>{l.label}</span>
              </NavLink>
            )
          })}
        </nav>

        {/* Mobile toggle button */}
        <button
          className="nav-toggle"
          id="nav-toggle"
          aria-expanded={open}
          aria-label={open ? 'Cerrar menú' : 'Abrir menú'}
          onClick={() => setOpen((o) => !o)}
        >
          <i className={open ? 'fa-solid fa-xmark' : 'fa-solid fa-bars'} aria-hidden="true" />
        </button>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {open && (
          <motion.div
            className="nav-drawer"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={() => setOpen(false)}
          >
            <motion.nav
              className="nav-drawer-panel"
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -20, opacity: 0 }}
              transition={{ duration: 0.25 }}
              onClick={(e) => e.stopPropagation()}
              aria-label="Navegación móvil"
            >
              {links.map((l) => {
                const active = l.end ? location.pathname === l.to : location.pathname.startsWith(l.to)
                return (
                  <NavLink
                    key={l.to}
                    to={l.to}
                    end={l.end}
                    className={`nav-link ${active ? 'active' : ''}`}
                    onClick={() => setOpen(false)}
                  >
                    {l.num && <span className="num">{l.num}.</span>}
                    <span>{l.label}</span>
                    {active && <i className="fa-solid fa-chevron-right small muted" style={{ marginLeft: 'auto' }} />}
                  </NavLink>
                )
              })}
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
