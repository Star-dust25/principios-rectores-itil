// Contenido del Caso 02 — compartido por todas las páginas de la app.

export const empresa = {
  nombre: 'TransAndina Logística S.A.S.',
  descripcion:
    'Empresa de transporte y almacenamiento con 850 empleados, 14 centros de distribución y un área de TI de 22 personas que da soporte al WMS, rastreo GPS de flota, ERP y mesa de servicio.',
  historia:
    'Hace dos años la empresa duplicó sus operaciones, pero TI no maduró al mismo ritmo. Hoy la dirección ve a TI como un centro de costo que "apaga incendios".',
}

export const problemas = [
  {
    id: 'desalineacion',
    icon: 'fa-solid fa-link-slash',
    titulo: 'Falta de alineación con el negocio',
    sintomas: [
      'Proyectos priorizados según "quién grita más fuerte".',
      'El 60 % del portafolio no tiene un objetivo de negocio asociado.',
      'Operaciones no sabe qué servicios ofrece TI.',
    ],
  },
  {
    id: 'metricas',
    icon: 'fa-solid fa-chart-simple',
    titulo: 'Ausencia de métricas',
    sintomas: [
      'No existen SLA, catálogo de servicios ni KPI.',
      'Las decisiones se basan en percepciones.',
      'Nadie puede demostrar si TI mejora o empeora.',
    ],
  },
  {
    id: 'cambio',
    icon: 'fa-solid fa-code-branch',
    titulo: 'Mala gestión del cambio',
    sintomas: [
      'Cambios en producción sin evaluación ni calendario.',
      'El 32 % de los cambios fallan.',
      'Los cambios causan ~40 % de los incidentes graves.',
    ],
  },
]

export const lineaBase = [
  { indicador: 'Satisfacción del usuario (CSAT)', antes: '2,6 / 5', despues: '4,3 / 5', mejora: true },
  { indicador: 'Tasa de cambios fallidos', antes: '32 %', despues: '8 %', mejora: true },
  { indicador: 'Tiempo medio de resolución (MTTR)', antes: '18 h', despues: '6 h', mejora: true },
  { indicador: 'Incidentes al mes', antes: '420', despues: '190', mejora: true },
  { indicador: 'Incidentes repetitivos', antes: '45 %', despues: '15 %', mejora: true },
  { indicador: 'Tiempo en trabajo reactivo', antes: '80 %', despues: '45 %', mejora: true },
]

export const principios = [
  {
    id: 1,
    clave: 'valor',
    nombre: 'Centrarse en el valor',
    icon: 'fa-solid fa-gem',
    color: '#E9C46A',
    resumen: 'Asegurar que las actividades generen valor para clientes y la organización.',
    acciones: [
      'Talleres con Operaciones, Comercial y Finanzas para identificar los 5 servicios críticos.',
      'Cada iniciativa responde: ¿qué resultado de negocio mejora y para quién?',
      'Métricas de valor: pedidos a tiempo, disponibilidad del WMS y CSAT.',
    ],
    contrarresta: ['desalineacion'],
    bucles: ['R1'],
  },
  {
    id: 2,
    clave: 'comenzar',
    nombre: 'Comenzar donde se está',
    icon: 'fa-solid fa-location-dot',
    color: '#5EEAD4',
    resumen: 'Aprovechar los procesos y recursos existentes antes de empezar desde cero.',
    acciones: [
      'Se evalúa la herramienta de tickets existente antes de comprar una nueva.',
      'Se usan 18 meses de tickets históricos para crear la primera línea base.',
      'Las revisiones informales de cambios se formalizan, no se desechan.',
    ],
    contrarresta: ['metricas'],
    bucles: ['R2'],
  },
  {
    id: 3,
    clave: 'iterar',
    nombre: 'Progresar iterativamente con retroalimentación',
    icon: 'fa-solid fa-arrows-rotate',
    color: '#70B8FF',
    resumen: 'Avanzar en pasos pequeños y recoger feedback.',
    acciones: [
      'Iteraciones trimestrales: catálogo + métricas → cambios → problemas → automatización.',
      'Retrospectiva con usuarios clave al cierre de cada iteración.',
      'Encuesta CSAT de 3 preguntas que ajusta la siguiente iteración.',
    ],
    contrarresta: ['metricas', 'cambio'],
    bucles: ['R2', 'B1'],
  },
  {
    id: 4,
    clave: 'colaborar',
    nombre: 'Colaborar y promover la visibilidad',
    icon: 'fa-solid fa-eye',
    color: '#F9EEE2',
    resumen: 'Fomentar la comunicación y transparencia entre las áreas.',
    acciones: [
      'Tablero de servicio público: disponibilidad, incidentes, cambios y CSAT.',
      'Comité mensual TI–Negocio para priorizar el portafolio.',
      'Comunicación anticipada de los cambios a las áreas afectadas.',
    ],
    contrarresta: ['desalineacion', 'metricas'],
    bucles: ['R1', 'R2', 'B1'],
  },
  {
    id: 5,
    clave: 'holistico',
    nombre: 'Pensar y trabajar de forma holística',
    icon: 'fa-solid fa-circle-nodes',
    color: '#38BDF8',
    resumen: 'Considerar el sistema completo: personas, tecnología y proveedores.',
    acciones: [
      'Análisis de las 4 dimensiones de ITIL en cada servicio crítico.',
      'El 25 % de caídas del GPS venían del proveedor: se renegocia con SLA y penalidades.',
      'Capacitación e incentivos alineados con los nuevos procesos.',
    ],
    contrarresta: ['desalineacion', 'cambio'],
    bucles: ['R1', 'B1'],
  },
  {
    id: 6,
    clave: 'simple',
    nombre: 'Mantenerlo simple y práctico',
    icon: 'fa-solid fa-feather',
    color: '#FCA5A5',
    resumen: 'Evitar la complejidad innecesaria en los nuevos procesos.',
    acciones: [
      'Solo 3 tipos de cambio: estándar, normal (CAB semanal de 30 min) y emergencia.',
      'Formularios de 25 a 8 campos obligatorios.',
      'Se eliminan reportes que nadie leía: quedan 6 KPI clave.',
    ],
    contrarresta: ['cambio'],
    bucles: ['B1', 'R3'],
  },
  {
    id: 7,
    clave: 'automatizar',
    nombre: 'Optimizar y automatizar',
    icon: 'fa-solid fa-gears',
    color: '#C4B5FD',
    resumen: 'Mejorar los flujos de trabajo antes de implementar la automatización.',
    acciones: [
      'Primero se eliminan aprobaciones duplicadas y pasos manuales sin valor.',
      'Luego se automatiza: autoservicio de contraseñas, pipelines y alertas → tickets.',
      'Regla explícita: no se automatiza un proceso desordenado.',
    ],
    contrarresta: ['cambio'],
    bucles: ['R3'],
  },
]

export const conclusiones = [
  {
    icon: 'fa-solid fa-handshake',
    titulo: 'Alineación sostenida',
    texto: 'El bucle del valor (R1) convirtió a TI de centro de costo en socio del negocio, con patrocinio de la dirección.',
  },
  {
    icon: 'fa-solid fa-chart-line',
    titulo: 'Decisiones basadas en datos',
    texto: 'Las métricas y la visibilidad (R2) hicieron posible una mejora continua medible.',
  },
  {
    icon: 'fa-solid fa-shield-halved',
    titulo: 'Estabilidad',
    texto: 'El bucle de control del cambio (B1) redujo cambios fallidos e incidentes de forma autocorregida.',
  },
  {
    icon: 'fa-solid fa-bolt',
    titulo: 'Capacidad liberada',
    texto: 'El bucle R3 rompió la espiral del apagafuegos y liberó tiempo para mejorar y automatizar.',
  },
  {
    icon: 'fa-solid fa-face-smile',
    titulo: 'Mayor satisfacción',
    texto: 'La satisfacción del usuario subió de 2,6 a 4,3 como resultado de todos los bucles reforzándose.',
  },
]
