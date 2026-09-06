import { Html } from '@react-three/drei'
import { getZone } from '../../data/portfolio'

export default function ZoneLabel({ zone, title, subtitle, position, onSelect }) {
  const content = getZone(zone)
  title = content?.title ?? title
  subtitle = content?.subtitle ?? subtitle
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
