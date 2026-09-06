import { useState } from 'react'
import DetailPanel from './DetailPanel'

export default function Overlay({
  activeZone,
  selectedItem,
  onBack,
  onSelectItem,
}) {
  const [controlsOpen, setControlsOpen] = useState(true)

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

      <DetailPanel
        activeZone={activeZone}
        selectedItem={selectedItem}
        onBack={onBack}
        onSelectItem={(itemId) => onSelectItem({ zoneId: activeZone, itemId })}
      />
    </div>
  )
}
