import { Page, PageNav, Reveal } from '../components/Layout'
import { empresa, lineaBase, problemas } from '../data/caso'

export default function Contexto() {
  return (
    <Page>
      <div className="container-x">
        <Reveal>
          <span className="eyebrow">1 · Contexto de la empresa</span>
          <h1 className="h1">
            {empresa.nombre.split(' ')[0]} <span className="grad-text-warm">Logística</span>
          </h1>
          <p className="lead">{empresa.descripcion}</p>
          <p className="lead mt-16">{empresa.historia}</p>
        </Reveal>

        <section className="sec">
          <Reveal>
            <span className="eyebrow">Diagnóstico</span>
            <h2 className="h2">Tres problemas raíz (variables de entrada)</h2>
          </Reveal>
          <div className="g g-3 mt-24">
            {problemas.map((p, i) => (
              <Reveal key={p.id} delay={i * 0.1}>
                <article className="glass card-pad hover-lift stack h-full" id={`problema-${p.id}`}>
                  <div className="icon-badge danger">
                    <i className={p.icon} aria-hidden="true" />
                  </div>
                  <h3 className="h3">{p.titulo}</h3>
                  <ul className="check-list danger">
                    {p.sintomas.map((s) => (
                      <li key={s}>
                        <i className="fa-solid fa-xmark" aria-hidden="true" />
                        <span>{s}</span>
                      </li>
                    ))}
                  </ul>
                </article>
              </Reveal>
            ))}
          </div>
        </section>

        <section className="sec">
          <Reveal>
            <span className="eyebrow">Línea base</span>
            <h2 className="h2">Indicadores al mes 0</h2>
            <p className="lead">
              Construida reutilizando 18 meses de tickets históricos ("comenzar donde se está"). Al final del caso se
              comparan con los resultados del mes 12.
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="g g-3 mt-24">
              {lineaBase.map((k) => (
                <div key={k.indicador} className="glass card-pad">
                  <div className="small muted">{k.indicador}</div>
                  <div className="kpi-val val-bad" style={{ marginTop: 6 }}>
                    {k.antes}
                  </div>
                </div>
              ))}
            </div>
          </Reveal>
        </section>

        <PageNav
          prev={{ to: '/', label: 'Inicio' }}
          next={{ to: '/principios', label: '2. Aplicación de los principios' }}
        />
      </div>
    </Page>
  )
}
