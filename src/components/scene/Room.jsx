import { roomLayout } from '../../data/roomLayout'
import { phase2Layout } from '../../data/phase2Layout'
import Interactable from './Interactable'
import ZoneLabel from './ZoneLabel'
import PortfolioObject from './PortfolioObject'
import { Material, palette } from './room/materials'
import RoomShell from './room/RoomShell'
import { Desk, OfficeChair, MediaConsole } from './room/Furniture'
import { Laptop } from './room/PortfolioObjects'
import { FinancialDashboard, WeatherStation, HdbBlock, EquityResearchStation } from './room/ResumeObjects'
import { CareerJourney } from './room/CareerJourney'
import { SchoolLife } from './room/SchoolLife'
import Decor from './room/Decor'
import Cat from './room/Cat'

const resumeObjects = {
  financialDashboard: FinancialDashboard,
  weatherStation: WeatherStation,
  hdbBlock: HdbBlock,
  equityResearchStation: EquityResearchStation,
}

const standaloneItemIds = ['financial-automation', 'weather', 'hdb', 'equity-research']
const careerItems = ['ey', 'shopee', 'uob'].map((itemId) => phase2Layout.items[itemId])
const schoolItems = ['science-club', 'rc4-flag', 'ucla'].map((itemId) => phase2Layout.items[itemId])

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
      <CareerJourney items={careerItems} onSelect={onSelectItem} />
      <SchoolLife items={schoolItems} onSelect={onSelectItem} />
      {Object.entries(phase2Layout.zoneLabels).map(([zone, anchor]) => (
        <ZoneLabel key={zone} zone={zone} position={anchor.position} onSelect={() => onSelectZone(zone)} />
      ))}
      {standaloneItemIds.map((itemId) => {
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
