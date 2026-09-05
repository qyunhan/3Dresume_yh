import { Html } from '@react-three/drei'

export default function SceneMarker({ label, shortLabel, position, onSelect }) {
  return (
    <Html center distanceFactor={9} position={position} transform={false}>
      <button
        aria-label={label}
        className="scene-marker"
        onClick={(event) => {
          event.stopPropagation()
          onSelect()
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
