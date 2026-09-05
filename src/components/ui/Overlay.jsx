import { useState } from 'react'
import { sectionContent } from '../../data/projects'
import ExperiencePanel from './ExperiencePanel'
import ProjectsPanel from './ProjectsPanel'
import ReportsPanel from './ReportsPanel'

function SectionPanel({ sectionId }) {
  const content = sectionContent[sectionId]
  if (!content) return null

  if (sectionId === 'experience') {
    return <ExperiencePanel content={content} />
  }
  if (sectionId === 'reports') {
    return <ReportsPanel content={content} />
  }
  return <ProjectsPanel content={content} />
}

export default function Overlay({
  selectedSection,
  onBack,
}) {
  const [controlsOpen, setControlsOpen] = useState(true)
  const hasSelection = Boolean(sectionContent[selectedSection])

  return (
    <div className="overlay">
      {controlsOpen ? (
        <aside aria-label="Room controls" className="room-controls">
          <button
            aria-label="Hide room controls"
            className="controls-dismiss"
            onClick={() => setControlsOpen(false)}
            type="button"
          >
            ×
          </button>
          <p className="controls-title">Explore my room!</p>
          <ul>
            <li><span aria-hidden="true">↔</span>Drag to look around</li>
            <li><span aria-hidden="true">↕</span>Scroll to zoom</li>
            <li><span aria-hidden="true">✦</span>Click on objects</li>
          </ul>
        </aside>
      ) : (
        <button
          aria-label="Show room controls"
          className="controls-reveal"
          onClick={() => setControlsOpen(true)}
          type="button"
        >
          <span aria-hidden="true">?</span>
        </button>
      )}

      {hasSelection && (
        <section
          aria-label={`${sectionContent[selectedSection].title} details`}
          aria-modal="false"
          className="content-panel"
          role="dialog"
        >
          <button className="back-button" onClick={onBack} type="button">
            <span aria-hidden="true">←</span> Back to room
          </button>
          <SectionPanel sectionId={selectedSection} />
        </section>
      )}
    </div>
  )
}
