import { Children, cloneElement, isValidElement } from 'react'
import { fireEvent, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { expect, test, vi } from 'vitest'
import Room from './Room'
import ZoneLabel from './ZoneLabel'
import Interactable from './Interactable'
import SceneMarker from './SceneMarker'
import { CareerJourney } from './room/CareerJourney'
import { EquityResearchStation } from './room/ResumeObjects'
import { SchoolLife } from './room/SchoolLife'

vi.mock('@react-three/drei', () => ({
  Html: ({ children }) => <div>{children}</div>,
  useGLTF: Object.assign(() => ({ scene: {} }), { preload: () => {} }),
}))

// Inspect the composition boundary without creating a WebGL context; render
// the real DOM markers so keyboard activation exercises their real handlers.
function descendants(element) {
  if (!isValidElement(element)) return []
  return [element, ...Children.toArray(element.props.children).flatMap(descendants)]
}

test('the four environmental plaques open their zone with keyboard activation', async () => {
  const onSelectZone = vi.fn()
  const elements = descendants(Room({ onSelectZone }))
  const labels = elements.filter((element) => element.type === ZoneLabel)
  expect(labels).toHaveLength(4)
  render(<>{labels}</>)
  const user = userEvent.setup()
  for (const [label, zoneId] of [
    ['Projects: What I Build', 'projects'], ['Research: How I Think', 'research'],
    ["Experience: Where I've Worked", 'experience'], ['School & Life: Beyond Work', 'school'],
  ]) {
    screen.getByRole('button', { name: label }).focus()
    await user.keyboard('{Enter}')
    expect(onSelectZone).toHaveBeenLastCalledWith(zoneId)
  }
})

test('removes visual scene markers and the disconnected About interaction', () => {
  const elements = descendants(Room({ onAboutClick: vi.fn(), onSelectItem: vi.fn(), onSelectZone: vi.fn() }))
  const objects = elements.filter((element) => element.type?.name === 'PortfolioObject')

  expect(elements.some((element) => element.type === SceneMarker)).toBe(false)
  expect(elements.some((element) => element.type === Interactable && element.props.label === 'About this room')).toBe(false)
  expect(objects.map((object) => object.props.item.id)).toEqual([
    'financial-automation', 'weather', 'hdb', 'equity-research', 'ey', 'shopee', 'uob', 'nus', 'rc4-flag', 'ucla',
  ])
})

test('the three project heroes retain their canonical selection payloads', () => {
  const onSelectItem = vi.fn()
  const elements = descendants(Room({ onSelectItem }))
  const objects = elements.filter((element) => element.type?.name === 'PortfolioObject' && element.props.item.zoneId === 'projects')
  expect(objects).toHaveLength(3)
  const { container } = render(<>{objects.map((object) => cloneElement(object, { children: () => null }))}</>)
  for (const [label, zoneId, itemId, cameraPreset] of [
    ['Financial dashboard', 'projects', 'financial-automation', 'financialAutomation'],
    ['Weather station', 'projects', 'weather', 'weather'],
    ['HDB block', 'projects', 'hdb', 'hdb'],
  ]) {
    const mesh = container.querySelector(`group[name="${label}"]`)
    fireEvent.click(mesh)
    expect(onSelectItem).toHaveBeenLastCalledWith({ zoneId, itemId, cameraPreset })
  }
  expect(onSelectItem).toHaveBeenCalledTimes(3)
})

test('composes the reusable desk and lounge props into the room', () => {
  const onSelectZone = vi.fn()
  const onSelectItem = vi.fn()
  const tree = descendants(Room({ onSelectZone, onSelectItem, onCatClick: vi.fn(), catReaction: 0 }))

  expect(tree.some((node) => node.type?.name === 'FloorPouf')).toBe(true)
  expect(tree.some((node) => node.type?.name === 'DeskLamp')).toBe(true)
})

test('career, school, and research retain only their intended hero groups', () => {
  const careerNames = descendants(CareerJourney()).map((node) => node.props?.name)
  const schoolNames = descendants(SchoolLife()).map((node) => node.props?.name)
  const researchNames = descendants(EquityResearchStation({ reportOffset: [0, 0, 0] })).map((node) => node.props?.name)

  expect(careerNames.filter((name) => name === 'experience-card')).toHaveLength(3)
  expect(careerNames).not.toContain('Career timeline')
  expect(schoolNames).toEqual(expect.arrayContaining(['school-shelf', 'school-nus', 'school-trophy', 'school-ucla']))
  expect(researchNames).toContain('research-lamp')
  expect(researchNames).not.toEqual(expect.arrayContaining(['research-plant', 'research-notebook']))
})

test('cat remains a separate interaction with no portfolio selection', () => {
  const onCatClick = vi.fn()
  const onSelectItem = vi.fn()
  const onSelectZone = vi.fn()
  const elements = descendants(Room({ onCatClick, onSelectItem, onSelectZone, catReaction: 3 }))
  const cat = elements.find((element) => element.type === Interactable && element.props.label === 'A very helpful cat')
  cat.props.onClick()
  expect(onCatClick).toHaveBeenCalledOnce()
  expect(onSelectItem).not.toHaveBeenCalled()
  expect(onSelectZone).not.toHaveBeenCalled()
})
