import { getPortfolioItem, getZone } from '../../data/portfolio'
import SkillTags from './SkillTags'

export default function DetailPanel({ activeZone, selectedItem, onBack, onSelectItem }) {
  const zone = getZone(activeZone)
  if (!zone) return null

  const item = getPortfolioItem(activeZone, selectedItem)

  return (
    <section
      aria-label={`${zone.title} details`}
      aria-modal="false"
      className="content-panel"
      role="dialog"
    >
      <button className="back-button" onClick={onBack} type="button">
        <span aria-hidden="true">←</span> Back to room
      </button>
      <header className="panel-header">
        <p className="eyebrow">{zone.subtitle}</p>
        <h2>{zone.title}</h2>
        <p className="panel-intro">{zone.intro}</p>
      </header>
      <nav aria-label={`${zone.title} items`} className="item-switcher">
        {zone.items.map((entry) => (
          <button
            aria-pressed={entry.id === item?.id}
            className="item-switcher__button"
            key={entry.id}
            onClick={() => onSelectItem(entry.id)}
            type="button"
          >
            {entry.tabTitle ?? entry.title}
          </button>
        ))}
      </nav>
      {item && (
        <article aria-label={item.title} className="detail-item">
          <h3>{item.title}</h3>
          <p className="detail-item__subtitle">{item.subtitle}</p>
          <p className="detail-item__hook"><strong>{item.hook ?? item.shortDescription}</strong></p>
          {(item.body ?? [item.longDescription]).map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
          {item.coursework && <DetailList label="Relevant coursework" items={item.coursework} />}
          {item.courses && <DetailList label="Courses" items={item.courses} />}
          {item.optionalLine && <p className="detail-item__optional">{item.optionalLine}</p>}
          <SkillTags skills={item.skills} />
        </article>
      )}
    </section>
  )
}

function DetailList({ label, items }) {
  return (
    <div className="detail-list">
      <p className="detail-list__label">{label}</p>
      <ul>
        {items.map((entry) => <li key={entry}>{entry}</li>)}
      </ul>
    </div>
  )
}
