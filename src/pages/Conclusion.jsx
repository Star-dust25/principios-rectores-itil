import { Page, PageNav, Reveal } from '../components/Layout'
import { conclusiones, lineaBase } from '../data/caso'

export default function Conclusion() {
  return (
    <Page>
      <div className="container-x">
        <Reveal>
          <span className="eyebrow">4 · Conclusión</span>
          <h1 className="h1">
            Los principios valen más <span className="grad-text">como sistema</span>
          </h1>
          <p className="lead">
            TransAndina no aplicó los principios como una lista de verificación, sino como un sistema interconectado de
            bucles de retroalimentación que reemplazó los bucles viciosos del trabajo reactivo.
          </p>
        </Reveal>

        <section className="sec">
          <Reveal>
            <span className="eyebrow">Resultados</span>
            <h2 className="h2">Mes 0 vs. mes 12</h2>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="glass mt-24 table-scroll">
              <table className="data-table">
                <thead>
                  <tr>
                    <th>Indicador</th>
                    <th>Mes 0</th>
                    <th>Mes 12</th>
                  </tr>
                </thead>
                <tbody>
                  {lineaBase.map((k) => (
                    <tr key={k.indicador}>
                      <td style={{ color: 'var(--text)' }}>{k.indicador}</td>
                      <td className="val-bad">{k.antes}</td>
                      <td className="val-good">
                        {k.despues} <i className="fa-solid fa-arrow-trend-up small" aria-hidden="true" />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="scroll-hint">
              <i className="fa-solid fa-arrows-left-right" aria-hidden="true" /> Desliza para ver la tabla completa
            </div>
          </Reveal>
        </section>

        <section className="sec">
          <Reveal>
            <span className="eyebrow">Beneficios</span>
            <h2 className="h2">Lo que se obtuvo al integrar los 7 principios</h2>
          </Reveal>
          <div className="g g-3 mt-24">
            {conclusiones.map((c, i) => (
              <Reveal key={c.titulo} delay={i * 0.07}>
                <div className="glass card-pad hover-lift stack h-full">
                  <div className="icon-badge">
                    <i className={c.icon} aria-hidden="true" />
                  </div>
                  <h3 className="h3">{c.titulo}</h3>
                  <p className="muted small" style={{ lineHeight: 1.6 }}>
                    {c.texto}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        <section className="sec">
          <Reveal>
            <div
              className="glass card-pad quote-card"
              style={{
                background: 'linear-gradient(135deg, rgba(139,124,246,0.16), rgba(61,214,198,0.08))',
              }}
            >
              <i className="fa-solid fa-quote-left grad-text" style={{ fontSize: '1.8rem' }} aria-hidden="true" />
              <p className="big-quote mt-16">
                Los 7 principios rectores de ITIL 4 son <span className="grad-text">interdependientes</span>: su valor real
                aparece cuando se aplican juntos, creando un círculo virtuoso de valor, aprendizaje y mejora continua.
              </p>
            </div>
          </Reveal>
        </section>

        <PageNav
          prev={{ to: '/arquetipo', label: '3. Arquetipo' }}
          next={{ to: '/', label: 'Volver al inicio' }}
        />
      </div>
    </Page>
  )
}
