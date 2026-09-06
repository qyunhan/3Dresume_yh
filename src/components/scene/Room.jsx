import { roomLayout } from '../../data/roomLayout'
import { phase2Layout } from '../../data/phase2Layout'
import Interactable from './Interactable'
import ZoneLabel from './ZoneLabel'
import PortfolioObject from './PortfolioObject'
import { Material, palette } from './room/materials'
import RoomShell from './room/RoomShell'
import { Desk, OfficeChair, MediaConsole } from './room/Furniture'
import { Laptop, NoticeBoard } from './room/PortfolioObjects'
import { FinancialDashboard, WeatherStation, HdbBlock, EquityResearchStation } from './room/ResumeObjects'
import Decor from './room/Decor'
import Cat from './room/Cat'

const resumeObjects = {
  financialDashboard: FinancialDashboard,
  weatherStation: WeatherStation,
  hdbBlock: HdbBlock,
  equityResearchStation: EquityResearchStation,
}

export default function Room({ onSelectZone, onSelectItem, onCatClick, catReaction }) {
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
      <group position={roomLayout.laptop.position}><Laptop /></group>
      <group position={roomLayout.noticeBoard.position}><NoticeBoard /></group>
      {Object.entries(phase2Layout.zoneLabels).map(([zone, anchor]) => (
        <ZoneLabel key={zone} zone={zone} position={anchor.position} onSelect={() => onSelectZone(zone)} />
      ))}
      {Object.values(phase2Layout.items).map((anchor) => {
        const Component = resumeObjects[anchor.objectType]
        return (
          <PortfolioObject
            key={anchor.id}
            item={anchor}
            position={anchor.position}
            markerPosition={anchor.markerPosition}
            onSelect={onSelectItem}
          >
            {(hovered) => <Component hovered={hovered} reportOffset={anchor.reportOffset} />}
          </PortfolioObject>
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
