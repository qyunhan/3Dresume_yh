import { roomLayout } from '../../data/roomLayout'
import { phase2Layout } from '../../data/phase2Layout'
import Interactable from './Interactable'
import ZoneLabel from './ZoneLabel'
import PortfolioObject from './PortfolioObject'
import { Material, palette } from './room/materials'
import RoomShell from './room/RoomShell'
import { Desk, OfficeChair, MediaConsole } from './room/Furniture'
import { DeskLamp, FloorPouf } from './room/LowPolyProps'
import { Laptop } from './room/PortfolioObjects'
import { FinancialDashboard, WeatherStation, HdbBlock, EquityResearchStation } from './room/ResumeObjects'
import { CareerJourney, EyMemento, ShopeeMemento, UobMemento } from './room/CareerJourney'
import { NusToken, Rc4Trophy, SchoolLife, UclaMemory } from './room/SchoolLife'
import Decor from './room/Decor'
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
  uclaMemory: UclaMemory,
}

const visiblePortfolioItemIds = [
  'financial-automation', 'weather', 'hdb', 'equity-research', 'ey', 'shopee', 'uob', 'nus', 'rc4-flag', 'ucla',
]

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
      <DeskLamp position={[-1.88, 2.25, -4.74]} />
      <FloorPouf position={[-0.15, roomLayout.rug.position[1] + 0.07 / 2, -0.27]} rotation={[0, -0.2, 0]} />
      <group position={roomLayout.laptop.position}><Laptop /></group>
      <CareerJourney />
      <SchoolLife />
      {Object.entries(phase2Layout.zoneLabels).map(([zone, anchor]) => (
        <ZoneLabel key={zone} zone={zone} position={anchor.position} onSelect={() => onSelectZone(zone)} />
      ))}
      {visiblePortfolioItemIds.map((itemId) => {
        const anchor = phase2Layout.items[itemId]
        const Component = resumeObjects[anchor.objectType]
        return (
          <PortfolioObject
            key={anchor.id}
            item={anchor}
            label={anchor.interactiveLabel}
            position={anchor.position}
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
