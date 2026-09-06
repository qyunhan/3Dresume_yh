import { useState } from 'react'
import { getPortfolioItem } from '../../data/portfolio'
import Interactable from './Interactable'
import SceneMarker from './SceneMarker'

export default function PortfolioObject({ item, position, markerPosition, onSelect, children }) {
  const [meshHovered, setMeshHovered] = useState(false)
  const [markerHovered, setMarkerHovered] = useState(false)
  const content = getPortfolioItem(item.zoneId, item.id)
  const select = () => onSelect({ zoneId: item.zoneId, itemId: item.id, cameraPreset: content.cameraPreset })

  return (
    <group>
      <Interactable
        label={content.objectName}
        position={position}
        onClick={select}
        onHoverChange={setMeshHovered}
      >
        {(hovered) => children(hovered || markerHovered)}
      </Interactable>
      <SceneMarker
        label={content.objectName}
        shortLabel={content.objectName}
        position={markerPosition}
        visible={meshHovered}
        onHoverChange={setMarkerHovered}
        onSelect={select}
      />
    </group>
  )
}
