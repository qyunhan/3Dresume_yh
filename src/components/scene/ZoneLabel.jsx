import { Html } from '@react-three/drei'

export default function ZoneLabel({ title, subtitle, position, onSelect }) {
  return (
    <Html center distanceFactor={9} position={position}>
      <button
        aria-label={`${title}: ${subtitle}`}
        className="zone-label"
        onPointerDown={(event) => event.stopPropagation()}
        onClick={(event) => {
          event.stopPropagation()
          onSelect()
        }}
        type="button"
      >
        <span className="zone-label__title">{title}</span>
        <span className="zone-label__subtitle">{subtitle}</span>
      </button>
    </Html>
  )
}
