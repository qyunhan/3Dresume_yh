export default function AboutPanel({ onBack }) {
  return (
    <section aria-label="About this room" aria-modal="false" className="content-panel" role="dialog">
      <button className="back-button" onClick={onBack} type="button">
        <span aria-hidden="true">←</span> Back to room
      </button>
      <header className="panel-header">
        <p className="eyebrow">A little context</p>
        <h2>About this room</h2>
        <p className="panel-intro">
          An interactive space for exploring the work, research, experience, and life behind this portfolio.
        </p>
      </header>
    </section>
  )
}
