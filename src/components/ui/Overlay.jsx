import { useEffect, useState } from 'react'
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

export default function Overlay({ selectedSection, onBack, catReaction }) {
  const [showCatMessage, setShowCatMessage] = useState(false)
  const hasSelection = Boolean(sectionContent[selectedSection])

  useEffect(() => {
    if (!catReaction) return undefined

    setShowCatMessage(true)
    const timeout = window.setTimeout(() => setShowCatMessage(false), 2000)
    return () => window.clearTimeout(timeout)
  }, [catReaction])

  return (
    <div className="overlay">
      <header className="brand-card">
        <p className="brand-kicker">Interactive portfolio · Phase 01</p>
        <h1>A room full of ideas</h1>
        <p className="explore-hint">
          <span aria-hidden="true" /> Explore the glowing objects
        </p>
      </header>

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

      {showCatMessage && (
        <p className="cat-toast" role="status">
          The curator is awake.
        </p>
      )}
    </div>
  )
}
