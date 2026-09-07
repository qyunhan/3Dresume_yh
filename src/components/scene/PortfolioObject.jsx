import { getPortfolioItem } from '../../data/portfolio'
import Interactable from './Interactable'

export default function PortfolioObject({ item, label, position, onSelect, children }) {
  const content = getPortfolioItem(item.zoneId, item.id)
  const interactiveLabel = label ?? item.interactiveLabel ?? content.objectName
  const select = () => onSelect({ zoneId: item.zoneId, itemId: item.id, cameraPreset: content.cameraPreset })

  return (
    <Interactable label={interactiveLabel} position={position} onClick={select}>
      {children}
    </Interactable>
  )
}
