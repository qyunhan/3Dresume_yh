import { useState } from 'react'
import { Html } from '@react-three/drei'

export default function SceneMarker({ label, shortLabel, position, onSelect, onHoverChange, visible = false }) {
  const [active, setActive] = useState(false)
  const [labelSuppressed, setLabelSuppressed] = useState(false)
  const setMarkerActive = (nextActive) => {
    setActive(nextActive)
    onHoverChange?.(nextActive)
  }

  return (
    <Html center distanceFactor={9} position={position} transform={false}>
      <button
        aria-label={label}
        className={`scene-marker${active || visible ? ' is-visible' : ''}${labelSuppressed ? ' is-label-suppressed' : ''}`}
        onClick={(event) => {
          event.stopPropagation()
          setMarkerActive(false)
          setLabelSuppressed(true)
          onSelect()
        }}
        onFocus={() => setMarkerActive(true)}
        onBlur={() => {
          setMarkerActive(false)
          setLabelSuppressed(false)
        }}
        onPointerEnter={() => setMarkerActive(true)}
        onPointerLeave={() => {
          setMarkerActive(false)
          setLabelSuppressed(false)
        }}
        type="button"
      >
        <span aria-hidden="true" className="marker-dot" />
        <span aria-hidden="true" className="marker-leader" />
        <span className="marker-label">{shortLabel}</span>
      </button>
    </Html>
  )
}
