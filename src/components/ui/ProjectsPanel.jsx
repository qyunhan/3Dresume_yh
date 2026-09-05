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
            <WorkCard index={index + 1} item={item} key={item.title} />
          ))
        )}
      </div>
    </>
  )
}
import WorkCard from './WorkCard'
