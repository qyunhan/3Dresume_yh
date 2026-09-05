const EMPTY_MESSAGE = 'More work is being prepared for this shelf.'

export default function ReportsPanel({ content }) {
  return (
    <>
      <header className="panel-header">
        <p className="eyebrow">{content.eyebrow}</p>
        <h2>{content.title}</h2>
        <p className="panel-intro">{content.intro}</p>
      </header>
      <div className="report-list">
        {content.items.length === 0 ? (
          <p className="empty-state">{EMPTY_MESSAGE}</p>
        ) : (
          content.items.map((item) => (
            <article className="report-card" key={item.title}>
              <p className="report-meta">{item.meta}</p>
              <h3>{item.title}</h3>
              <p>{item.summary}</p>
            </article>
          ))
        )}
      </div>
    </>
  )
}
