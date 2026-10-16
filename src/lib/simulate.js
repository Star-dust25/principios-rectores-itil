// Modelo ilustrativo de dinámica de sistemas (paso mensual).
// No pretende ser predictivo: muestra cómo los bucles reaccionan
// al nivel de adopción de cada principio (0–100).

const clamp = (v, a, b) => Math.min(b, Math.max(a, v))

export function simulate(adopcion, meses = 12) {
  const [p1, p2, p3, p4, p5, p6, p7] = [1, 2, 3, 4, 5, 6, 7].map((i) => (adopcion[i] ?? 0) / 100)

  // Estado inicial (línea base de TransAndina)
  let A = 0.3 // alineación TI–negocio
  let V = 0.1 // visibilidad / métricas
  let C = 0.32 // tasa de cambios fallidos
  let I = 420 // incidentes / mes
  let D = 0.7 // deuda técnica
  let S = 2.6 // CSAT (1–5)

  const k = 0.6 + 0.6 * p2 // "comenzar donde se está" acelera el arranque
  const E = 0.5 * p6 + 0.5 * p6 * p7 // eficiencia: automatizar solo rinde si se simplificó antes
  const caos = Math.max(0, p7 - p6) // automatizar procesos desordenados

  const serie = []
  for (let m = 0; m <= meses; m++) {
    const L = clamp((I / 525) * (1 - 0.45 * E), 0.15, 0.95) // carga reactiva
    const T = 1 - L // tiempo disponible para mejorar

    serie.push({
      mes: m,
      csat: S,
      fallidos: C * 100,
      mttr: 4 + 20 * L * (1 - 0.5 * V),
      incidentes: I,
      reactivo: L * 100,
      mejora: 100 * (0.3 * V + 0.25 * T + 0.25 * (1 - C / 0.5) + 0.2 * A),
    })

    const aprendizaje = p3 * (0.4 + 0.6 * V)

    // R1 — bucle del valor (la satisfacción retroalimenta la alineación)
    A += k * (0.16 * p1 + 0.05 * p4 + 0.04 * p5) * (1 - A) + 0.03 * ((S - 3) / 2)
    A = clamp(A, 0.05, 1)

    // R2 — visibilidad y aprendizaje
    V += k * (0.22 * p4 + 0.08 * p2 + 0.06 * p3) * (1 - V) - 0.03 * V * (1 - p4)
    V = clamp(V, 0.02, 1)

    // B1 / R3 — control del cambio y capacidad liberada
    C += -k * (0.055 * aprendizaje + 0.02 * p5 + 0.03 * p6 + 0.02 * p6 * p7) * C + 0.015 * caos + 0.02 * (L - 0.6)
    C = clamp(C, 0.03, 0.5)

    D += 0.03 * L - 0.1 * T * (0.4 * p5 + 0.3 * p2 + 0.3 * p6 * p7)
    D = clamp(D, 0.1, 1)

    const objetivoI = 420 * (0.3 + 0.45 * (C / 0.32) + 0.25 * (D / 0.7))
    I += 0.35 * (objetivoI - I)

    const objetivoS = 1 + 4 * (0.35 * A + 0.25 * (1 - C / 0.5) + 0.2 * (1 - I / 600) + 0.2 * V)
    S = clamp(S + 0.3 * (objetivoS - S), 1, 5)
  }
  return serie
}

export const presets = {
  ninguno: { label: 'Sin ITIL', icon: 'fa-solid fa-fire', valores: { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0, 7: 0 } },
  soloAutomatizar: {
    label: 'Solo automatizar',
    icon: 'fa-solid fa-robot',
    valores: { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0, 7: 100 },
  },
  aislados: {
    label: 'Principios aislados',
    icon: 'fa-solid fa-puzzle-piece',
    valores: { 1: 100, 2: 0, 3: 0, 4: 0, 5: 0, 6: 100, 7: 0 },
  },
  integrados: {
    label: 'Los 7 integrados',
    icon: 'fa-solid fa-circle-nodes',
    valores: { 1: 85, 2: 80, 3: 85, 4: 85, 5: 80, 6: 85, 7: 75 },
  },
}
