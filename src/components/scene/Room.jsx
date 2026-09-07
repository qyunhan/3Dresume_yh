import { roomLayout } from '../../data/roomLayout'
import { phase2Layout } from '../../data/phase2Layout'
import Interactable from './Interactable'
import SceneMarker from './SceneMarker'
import ZoneLabel from './ZoneLabel'
import PortfolioObject from './PortfolioObject'
import { Material, palette } from './room/materials'
import RoomShell from './room/RoomShell'
import { Desk, OfficeChair, MediaConsole } from './room/Furniture'
import { Laptop } from './room/PortfolioObjects'
import { FinancialDashboard, WeatherStation, HdbBlock, EquityResearchStation } from './room/ResumeObjects'
import { CareerJourney, EyMemento, ShopeeMemento, UobMemento } from './room/CareerJourney'
import { NusToken, Rc4Trophy, ScienceClubToken, UclaMemory } from './room/SchoolLife'
import Decor, { AboutFrame } from './room/Decor'
import Cat from './room/Cat'

const resumeObjects = {
  financialDashboard: FinancialDashboard,
  weatherStation: WeatherStation,
  hdbBlock: HdbBlock,
  equityResearchStation: EquityResearchStation,
  eyMemento: EyMemento,
  shopeeMemento: ShopeeMemento,
  uobMemento: UobMemento,
  nusToken: NusToken,
  rc4Trophy: Rc4Trophy,
  scienceClubToken: ScienceClubToken,
  uclaMemory: UclaMemory,
}

export default function Room({ onAboutClick, onSelectZone, onSelectItem, onCatClick, catReaction }) {
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
      <CareerJourney />
      {Object.entries(phase2Layout.zoneLabels).map(([zone, anchor]) => (
        <ZoneLabel key={zone} zone={zone} position={anchor.position} onSelect={() => onSelectZone(zone)} />
      ))}
      {Object.values(phase2Layout.items).map((anchor) => {
        const Component = resumeObjects[anchor.objectType]
        return (
          <PortfolioObject
            key={anchor.id}
            item={anchor}
            label={anchor.interactiveLabel}
            position={anchor.position}
            markerPosition={anchor.markerPosition}
            onSelect={onSelectItem}
          >
            {(hovered) => <Component hovered={hovered} reportOffset={anchor.reportOffset} />}
          </PortfolioObject>
        )
      })}
      <Interactable label="About this room" onClick={onAboutClick} position={phase2Layout.about.position}>
        {(hovered) => <AboutFrame hovered={hovered} />}
      </Interactable>
      <SceneMarker
        label="About this room"
        shortLabel="About"
        position={phase2Layout.about.markerPosition}
        onSelect={onAboutClick}
      />
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
