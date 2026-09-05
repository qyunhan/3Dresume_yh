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
            <WorkCard item={item} key={item.title} variant="research" />
          ))
        )}
      </div>
    </>
  )
}
import WorkCard from './WorkCard'
