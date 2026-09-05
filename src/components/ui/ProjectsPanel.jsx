const EMPTY_MESSAGE = 'More work is being prepared for this shelf.'

export default function ProjectsPanel({ content }) {
  return (
    <>
      <header className="panel-header">
        <p className="eyebrow">{content.eyebrow}</p>
        <h2>{content.title}</h2>
        <p className="panel-intro">{content.intro}</p>
      </header>
      <div className="project-grid">
        {content.items.length === 0 ? (
          <p className="empty-state">{EMPTY_MESSAGE}</p>
        ) : (
          content.items.map((item, index) => (
            <article className="project-card" key={item.title}>
              <span className="card-number">0{index + 1}</span>
              <h3>{item.title}</h3>
              <p>{item.summary}</p>
              <ul className="tag-list" aria-label={`${item.title} technologies`}>
                {item.tags.map((tag) => (
                  <li key={tag}>{tag}</li>
                ))}
              </ul>
            </article>
          ))
        )}
      </div>
    </>
  )
}
