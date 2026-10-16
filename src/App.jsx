import { useEffect } from 'react'
import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import Navbar from './components/Navbar'
import { Footer, ScrollProgress, BackToTop } from './components/Layout'
import Home from './pages/Home'
import Contexto from './pages/Contexto'
import Principios from './pages/Principios'
import Arquetipo from './pages/Arquetipo'
import Conclusion from './pages/Conclusion'

const titles = {
  '/': 'Caso 02 · Arquetipo sistémico con los 7 principios rectores de ITIL 4',
  '/contexto': '1. Contexto de la empresa · Caso 02 ITIL',
  '/principios': '2. Aplicación de los 7 principios · Caso 02 ITIL',
  '/arquetipo': '3. Arquetipo sistémico · Caso 02 ITIL',
  '/conclusion': '4. Conclusión · Caso 02 ITIL',
}

function AnimatedRoutes() {
  const location = useLocation()

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' })
    document.title = titles[location.pathname] ?? titles['/']
  }, [location.pathname])

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Home />} />
        <Route path="/contexto" element={<Contexto />} />
        <Route path="/principios" element={<Principios />} />
        <Route path="/arquetipo" element={<Arquetipo />} />
        <Route path="/conclusion" element={<Conclusion />} />
        <Route path="*" element={<Home />} />
      </Routes>
    </AnimatePresence>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <a href="#main-content" className="skip-link">
        Saltar al contenido
      </a>
      <ScrollProgress />
      <Navbar />
      <AnimatedRoutes />
      <Footer />
      <BackToTop />
    </BrowserRouter>
  )
}
