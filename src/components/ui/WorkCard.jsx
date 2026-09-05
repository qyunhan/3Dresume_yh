import { useState } from 'react'

export default function WorkCard({ item, index, variant = 'project' }) {
  const [mediaAvailable, setMediaAvailable] = useState(Boolean(item.image))
  const destination = item.demoUrl || item.link
  const Tag = destination ? 'a' : 'button'
  const cardProps = destination
    ? {
        href: destination,
        rel: 'noreferrer',
        target: '_blank',
      }
    : { type: 'button' }

  return (
    <Tag
      {...cardProps}
      aria-label={`View ${item.title}`}
      className={`work-card ${variant === 'research' ? 'work-card--research' : ''}`}
    >
      {mediaAvailable && (
        <span className="card-media">
          <img
            alt={`${item.title} preview`}
            onError={() => setMediaAvailable(false)}
            src={item.image}
          />
        </span>
      )}
      <span className="card-copy">
        {item.meta && <span className="report-meta">{item.meta}</span>}
        {index && <span className="card-number">{String(index).padStart(2, '0')}</span>}
        <span className="work-card-title">{item.title}</span>
        <span className="work-card-summary">{item.summary}</span>
        <span className="tag-list" aria-label={`${item.title} capabilities`}>
          {item.tags.slice(0, 3).map((tag) => (
            <span key={tag}>{tag}</span>
          ))}
        </span>
      </span>
    </Tag>
  )
}
