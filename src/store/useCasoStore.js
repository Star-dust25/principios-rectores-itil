import { create } from 'zustand'
import { presets } from '../lib/simulate'

export const useCasoStore = create((set) => ({
  // Diagrama causal
  modo: 'itil', // 'actual' | 'itil'
  bucleActivo: null,
  principioActivo: null,
  setModo: (modo) => set({ modo, bucleActivo: null, principioActivo: null }),
  toggleBucle: (id) =>
    set((s) => ({ bucleActivo: s.bucleActivo === id ? null : id, principioActivo: null })),
  togglePrincipio: (id) =>
    set((s) => ({ principioActivo: s.principioActivo === id ? null : id, bucleActivo: null })),

  // Simulación
  adopcion: { ...presets.integrados.valores },
  setAdopcion: (id, valor) => set((s) => ({ adopcion: { ...s.adopcion, [id]: valor } })),
  aplicarPreset: (key) => set({ adopcion: { ...presets[key].valores } }),
}))
