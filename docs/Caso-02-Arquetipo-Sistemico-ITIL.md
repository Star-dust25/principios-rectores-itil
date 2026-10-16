# Caso 02 — Arquetipo sistémico basado en los 7 principios rectores de ITIL 4

**Empresa:** TransAndina Logística S.A.S. (ficticia)
**Enfoque:** ITIL 4 + Dinámica de Sistemas

---

## 1. Contexto de la empresa

**TransAndina Logística S.A.S.** es una empresa de transporte y almacenamiento con 850 empleados, 14 centros de distribución y un área de TI de 22 personas. TI da soporte al sistema de gestión de almacenes (WMS), al rastreo de flota (GPS), al ERP y a la mesa de servicio interna.

Hace dos años la empresa duplicó sus operaciones, pero TI no maduró al mismo ritmo. Hoy la dirección ve a TI como un **centro de costo que "apaga incendios"**. El diagnóstico inicial muestra tres problemas raíz:

| Problema raíz | Síntomas observados |
|---|---|
| **Falta de alineación con el negocio** | Los proyectos se priorizan según "quién grita más fuerte". El 60 % del portafolio no tiene un objetivo de negocio asociado. Operaciones no sabe qué servicios ofrece TI. |
| **Ausencia de métricas** | No hay SLA, catálogo de servicios ni KPI. Las decisiones se basan en percepciones. Nadie puede demostrar si TI mejora o empeora. |
| **Mala gestión del cambio** | Los cambios se hacen en producción sin evaluación ni calendario. El 32 % de los cambios fallan y causan cerca del 40 % de los incidentes graves. |

**Línea base (mes 0):**

| Indicador | Valor |
|---|---|
| Satisfacción del usuario (CSAT) | 2,6 / 5 |
| Tasa de cambios fallidos | 32 % |
| Tiempo medio de resolución (MTTR) | 18 h |
| Incidentes al mes | 420 |
| Incidentes repetitivos | 45 % |
| Tiempo del equipo en trabajo reactivo | 80 % |

---

## 2. Aplicación de los 7 principios rectores

### 2.1 Centrarse en el valor
- Se arman talleres con Operaciones, Comercial y Finanzas para identificar los **5 servicios críticos** (WMS, rastreo GPS, facturación, ERP y mesa de servicio).
- Cada iniciativa de TI debe responder: *¿qué resultado de negocio mejora y para quién?* Lo que no aporta valor se pospone.
- Se definen métricas de valor: pedidos despachados a tiempo, disponibilidad del WMS en horario operativo y CSAT.

### 2.2 Comenzar donde se está
- Antes de comprar una herramienta nueva, se evalúa lo que ya existe: la mesa de servicio ya registra tickets en una herramienta *open source* y algunos técnicos ya hacen revisiones informales de cambios.
- Se reutilizan esos datos históricos (18 meses de tickets) para construir la **primera línea base**.
- Las buenas prácticas informales se formalizan; no se desechan.

### 2.3 Progresar iterativamente con retroalimentación
- La transformación se divide en **iteraciones trimestrales**:
  1. Catálogo mínimo de servicios + métricas base.
  2. Gestión del cambio (CAB ligero y calendario de cambios).
  3. Gestión de problemas para incidentes repetitivos.
  4. Automatización selectiva.
- Al final de cada iteración se hace una retrospectiva con usuarios clave y una encuesta CSAT de 3 preguntas. Los resultados ajustan la siguiente iteración.

### 2.4 Colaborar y promover la visibilidad
- Se publica un **tablero de servicio** visible para toda la empresa: disponibilidad, incidentes abiertos, cambios programados y CSAT.
- Se crea un comité mensual TI–Negocio donde Operaciones participa en la priorización del portafolio.
- Los cambios se comunican con anticipación a las áreas afectadas.

### 2.5 Pensar y trabajar de forma holística
- Se analizan las **cuatro dimensiones** de ITIL: organizaciones y personas, información y tecnología, socios y proveedores, y flujos de valor y procesos.
- Se descubre que el 25 % de las caídas del rastreo GPS vienen del proveedor de telecomunicaciones; se renegocia el contrato con SLA y penalidades.
- La capacitación del personal y los incentivos se alinean con los nuevos procesos.

### 2.6 Mantenerlo simple y práctico
- Se adopta un proceso de cambios con **solo tres tipos**: estándar (preaprobado), normal (CAB semanal de 30 min) y de emergencia.
- Los formularios bajan de 25 a 8 campos obligatorios.
- Se eliminan reportes que nadie leía y se dejan 6 KPI clave.

### 2.7 Optimizar y automatizar
- Primero se **optimiza**: se eliminan aprobaciones duplicadas y pasos manuales sin valor en el flujo de cambios y de solicitudes.
- Luego se **automatiza** lo que ya funciona bien: reinicio de contraseñas por autoservicio, despliegues estándar con *pipelines* y alertas de monitoreo que crean tickets automáticamente.
- Regla explícita: *no se automatiza un proceso desordenado*.

---

## 3. Diseño del arquetipo sistémico

### 3.1 Situación inicial: los bucles viciosos

Antes de la intervención, el sistema de TransAndina está dominado por dos arquetipos clásicos de Peter Senge:

**R0 — "Espiral del apagafuegos" (bucle de refuerzo vicioso)**
> Más **incidentes** (+) → más **carga reactiva** (−) → menos **tiempo para planificar** (+) → menor **calidad de los cambios** (−) → más **incidentes**.

**B0 / R0′ — "Soluciones que fallan"**
> Más incidentes (+) → más **parches de emergencia** (−) → menos incidentes a corto plazo (**B0**, equilibrio).
> Pero los parches (+) → más **deuda técnica** (+, *con retraso*) → más incidentes (**R0′**, refuerzo).

Además, el bucle de **erosión de la confianza**: más incidentes reducen la satisfacción, aumentan la percepción de TI como costo, reducen la inversión y quitan aún más tiempo para mejorar.

### 3.2 Diagrama causal propuesto: "Espiral de valor ITIL"

**Variables de entrada (problemas):** Desalineación con el negocio, Ausencia de métricas y Mala gestión del cambio.
**Variables de salida:** Mejora continua y Satisfacción del usuario.

Notación: `A → B (+)` significa que si A aumenta, B aumenta; `(−)` significa que si A aumenta, B disminuye.

**Enlaces de entrada (impacto de los problemas):**
- Desalineación con el negocio → Alineación TI–negocio (−)
- Ausencia de métricas → Visibilidad y métricas (−)
- Mala gestión del cambio → Tasa de cambios exitosos (−)

**R1 — Bucle del valor (refuerzo virtuoso)** · Principios: *Centrarse en el valor, Colaborar y promover la visibilidad, Pensar holísticamente*
> Alineación TI–negocio → Valor entregado (+) → Satisfacción del usuario (+) → Patrocinio de la dirección (+) → Alineación TI–negocio (+)

Mientras más se alinea TI con los objetivos del negocio, más valor percibe el usuario; eso aumenta la confianza y el apoyo de la dirección, que a su vez fortalece la alineación.

**R2 — Bucle de aprendizaje iterativo (refuerzo virtuoso)** · Principios: *Progresar iterativamente, Comenzar donde se está, Colaborar*
> Visibilidad y métricas → Retroalimentación y aprendizaje (+) → Mejora continua (+) → Visibilidad y métricas (+)

Las métricas permiten aprender en cada iteración; cada mejora produce mejores mediciones, lo que acelera el siguiente ciclo.

**B1 — Bucle de control del cambio (equilibrio)** · Principios: *Mantenerlo simple, Pensar holísticamente, Progresar iterativamente*
> Incidentes → Visibilidad y métricas (+) → Retroalimentación y aprendizaje (+) → Tasa de cambios exitosos (+) → Incidentes (−)

Cuando los incidentes suben, el tablero los hace visibles, se analizan las causas y se ajusta el proceso de cambios. El sistema se autocorrige y regresa a un nivel controlado.

**R3 — Bucle de capacidad liberada (refuerzo virtuoso)** · Principios: *Optimizar y automatizar, Mantenerlo simple*
> Incidentes → Capacidad liberada (−) → Mejora continua (+) → Retroalimentación y aprendizaje (+) → Tasa de cambios exitosos (+) → Incidentes (−)

Este bucle **invierte la espiral del apagafuegos**: menos incidentes liberan tiempo; ese tiempo se invierte en mejorar y automatizar, lo que reduce aún más los incidentes.

**Enlaces que conectan los bucles:**
- Tasa de cambios exitosos → Valor entregado (+)
- Mejora continua → Satisfacción del usuario (+)
- Patrocinio de la dirección → Capacidad liberada (+) (inversión en automatización)

### 3.3 Cómo los principios contrarrestan los problemas

| Variable de entrada | Principios que la contrarrestan | Bucle que se activa |
|---|---|---|
| Desalineación con el negocio | Centrarse en el valor, Colaborar, Holístico | R1 |
| Ausencia de métricas | Comenzar donde se está, Progresar iterativamente, Visibilidad | R2, B1 |
| Mala gestión del cambio | Simple y práctico, Holístico, Optimizar y automatizar | B1, R3 |

Ningún principio funciona solo: *Optimizar y automatizar* sin *Mantenerlo simple* automatiza el caos; *Progresar iterativamente* sin *Visibilidad* no tiene datos para aprender; *Centrarse en el valor* sin *Pensar holísticamente* ignora a los proveedores. Los bucles comparten variables, por lo que cada mejora alimenta a las demás.

### 3.4 Resultados tras 12 meses

| Indicador | Mes 0 | Mes 12 |
|---|---|---|
| CSAT | 2,6 / 5 | 4,3 / 5 |
| Tasa de cambios fallidos | 32 % | 8 % |
| MTTR | 18 h | 6 h |
| Incidentes al mes | 420 | 190 |
| Incidentes repetitivos | 45 % | 15 % |
| Tiempo en trabajo reactivo | 80 % | 45 % |

---

## 4. Conclusión

TransAndina no resolvió sus problemas aplicando los principios como una lista de verificación, sino como un **sistema interconectado de bucles de retroalimentación**. Los principales beneficios fueron:

1. **Alineación sostenida:** el bucle del valor (R1) convirtió a TI de centro de costo en socio del negocio, con patrocinio de la dirección.
2. **Decisiones basadas en datos:** las métricas y la visibilidad (R2) hicieron posible la mejora continua medible.
3. **Estabilidad:** el bucle de control del cambio (B1) redujo los cambios fallidos y los incidentes de forma autocorregida.
4. **Capacidad liberada:** el bucle R3 rompió la espiral del apagafuegos y permitió invertir tiempo en mejorar y automatizar.
5. **Mayor satisfacción del usuario:** como resultado de todos los bucles reforzándose entre sí.

La lección principal es que los 7 principios rectores de ITIL 4 son **interdependientes**: su valor real aparece cuando se aplican juntos, creando un círculo virtuoso que reemplaza los bucles viciosos del trabajo reactivo.
