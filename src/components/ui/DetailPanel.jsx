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
            {entry.title}
          </button>
        ))}
      </nav>
      {item && (
        <article aria-label={item.title} className="detail-item">
          <h3>{item.title}</h3>
          <p className="detail-item__subtitle">{item.subtitle}</p>
          <p className="detail-item__summary">{item.shortDescription}</p>
          <p>{item.longDescription}</p>
          <SkillTags skills={item.skills} />
        </article>
      )}
    </section>
  )
}
