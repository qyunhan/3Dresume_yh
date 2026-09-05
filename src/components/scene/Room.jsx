import { roomDestinations } from '../../data/roomDestinations'
import { roomLayout } from '../../data/roomLayout'
import Interactable from './Interactable'
import SceneMarker from './SceneMarker'
import { Material, palette } from './room/materials'
import RoomShell from './room/RoomShell'
import { Desk, OfficeChair, MediaConsole } from './room/Furniture'
import { Laptop, Tv, NoticeBoard, Reports } from './room/PortfolioObjects'
import Decor from './room/Decor'
import Cat from './room/Cat'

const destinationObjects = [
  { id: 'tv', Component: Tv, shortLabel: 'Projects' },
  { id: 'laptop', Component: Laptop, shortLabel: 'Technical' },
  { id: 'noticeBoard', Component: NoticeBoard, shortLabel: 'About' },
  { id: 'reports', Component: Reports, shortLabel: 'Research' },
]

export default function Room({ onSelect, onCatClick, catReaction }) {
  return (
    <group>
      <RoomShell />
      <mesh receiveShadow position={roomLayout.rug.position}>
        <boxGeometry args={[5.4, 0.07, 4.25]} />
        <Material color={palette.cream} />
      </mesh>
      <Desk {...roomLayout.desk} />
      <OfficeChair {...roomLayout.chair} />
      <MediaConsole {...roomLayout.mediaConsole} />
      <Decor />
      {destinationObjects.map(({ id, Component, shortLabel }) => {
        const anchor = roomLayout[id]
        const select = () => onSelect(anchor.sectionId)
        return (
          <group key={id}>
            <Interactable
              label={roomDestinations[id].label}
              onClick={select}
              position={anchor.position}
            >
              {(hovered) => <Component hovered={hovered} />}
            </Interactable>
            <SceneMarker
              label={roomDestinations[id].label}
              shortLabel={shortLabel}
              position={anchor.markerPosition}
              onSelect={select}
            />
          </group>
        )
      })}
      <Interactable label="A very helpful cat" onClick={onCatClick} position={roomLayout.cat.position}>
        {(hovered) => (
          <group scale={hovered ? 1.04 : 1}>
            <Cat reaction={catReaction} />
          </group>
        )}
      </Interactable>
    </group>
  )
}
