const EMPTY_MESSAGE = 'More work is being prepared for this shelf.'

export default function ExperiencePanel({ content }) {
  return (
    <>
      <header className="panel-header">
        <p className="eyebrow">{content.eyebrow}</p>
        <h2>{content.title}</h2>
        <p className="panel-intro">{content.intro}</p>
      </header>
      <div className="timeline">
        {content.timeline.length === 0 ? (
          <p className="empty-state">{EMPTY_MESSAGE}</p>
        ) : (
          content.timeline.map((item) => (
            <article className="timeline-item" key={`${item.period}-${item.role}`}>
              <p className="timeline-period">{item.period}</p>
              <div>
                <h3>{item.role}</h3>
                <p>{item.detail}</p>
                <ul className="tag-list" aria-label={`${item.role} capabilities`}>
                  {item.tags.slice(0, 3).map((tag) => (
                    <li key={tag}>{tag}</li>
                  ))}
                </ul>
              </div>
            </article>
          ))
        )}
      </div>
    </>
  )
}
