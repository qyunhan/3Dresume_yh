import { Children, cloneElement, isValidElement } from 'react'
import { fireEvent, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { expect, test, vi } from 'vitest'
import Room from './Room'
import ZoneLabel from './ZoneLabel'
import Interactable from './Interactable'
import SceneMarker from './SceneMarker'
import { EquityResearchStation } from './room/ResumeObjects'

vi.mock('@react-three/drei', () => ({
  Html: ({ children }) => <div>{children}</div>,
  Image: (props) => <mesh {...props} />,
  useGLTF: Object.assign(() => ({ scene: {} }), { preload: () => {} }),
}))

vi.mock('./room/Cat', () => ({ default: () => <group name="cat" /> }))

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
  expect(objects.map((object) => object.props.item.id)).toEqual(['financial-automation', 'weather', 'hdb', 'equity-research'])
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

test('keeps the laptop and lounge props without a detached desk lamp', () => {
  const onSelectZone = vi.fn()
  const onSelectItem = vi.fn()
  const tree = descendants(Room({ onSelectZone, onSelectItem, onCatClick: vi.fn(), catReaction: 0 }))

  expect(tree.some((node) => node.type?.name === 'FloorPouf')).toBe(false)
  expect(tree.some((node) => node.type?.name === 'Laptop')).toBe(true)
  expect(tree.some((node) => node.type?.name === 'DeskLamp')).toBe(false)
})

test('research retains only TV, reports, and lamp hero groups', () => {
  const researchNames = descendants(EquityResearchStation({ reportOffset: [0, 0, 0] })).map((node) => node.props?.name)

  expect(researchNames).toEqual(expect.arrayContaining(['research-station', 'research-tv', 'research-reports', 'research-lamp']))
  expect(researchNames).not.toEqual(expect.arrayContaining(['research-plant', 'research-notebook']))
})

test('renders the canonical hero objects inside their board and shelf groups exactly once', () => {
  const onSelectItem = vi.fn()
  const { container } = render(<Room onSelectItem={onSelectItem} onSelectZone={vi.fn()} onCatClick={vi.fn()} catReaction={0} />)

  for (const label of ['Financial dashboard', 'Weather station', 'HDB block', 'Equity report', 'EY', 'Shopee', 'UOB', 'Science Club', 'RC4 Flag', 'UCLA Exchange']) {
    expect(container.querySelectorAll(`group[name="${label}"]`)).toHaveLength(1)
  }
  expect(container.querySelectorAll('group[name="NUS"]')).toHaveLength(0)

  const careerCards = container.querySelectorAll('group[name="experience-card"]')
  expect(careerCards).toHaveLength(3)
  ;['EY', 'Shopee', 'UOB'].forEach((label, index) => {
    expect(careerCards[index].querySelector(`group[name="${label}"]`)).not.toBeNull()
  })
  expect(container.querySelectorAll('mesh[name="experience-logo-ey"], mesh[name="experience-logo-shopee"], mesh[name="experience-logo-uob"]')).toHaveLength(3)
  expect(Array.from(careerCards).every((card) => card.querySelectorAll('mesh').length === 1)).toBe(true)

  const schoolShelf = container.querySelector('group[name="school-shelf"]')
  expect(schoolShelf?.querySelectorAll('group[name="Science Club"], group[name="RC4 Flag"], group[name="UCLA Exchange"]')).toHaveLength(3)
  expect(schoolShelf?.querySelectorAll('group[name="school-photo-frame"]')).toHaveLength(3)
  expect(schoolShelf?.querySelectorAll('mesh[name="school-frame-top"], mesh[name="school-frame-bottom"], mesh[name="school-frame-left"], mesh[name="school-frame-right"]')).toHaveLength(12)
  expect(schoolShelf?.querySelectorAll('mesh[name="school-science-mascot"], mesh[name="school-rc4-orca"], mesh[name="school-ucla-mascot"]')).toHaveLength(3)
  expect(schoolShelf?.querySelectorAll('mesh')).toHaveLength(16)

  for (const [label, zoneId, itemId, cameraPreset] of [
    ['Financial dashboard', 'projects', 'financial-automation', 'financialAutomation'],
    ['Weather station', 'projects', 'weather', 'weather'],
    ['HDB block', 'projects', 'hdb', 'hdb'],
    ['Equity report', 'research', 'equity-research', 'equityResearch'],
    ['EY', 'experience', 'ey', 'ey'],
    ['Shopee', 'experience', 'shopee', 'shopee'],
    ['UOB', 'experience', 'uob', 'uob'],
    ['Science Club', 'school', 'science-club', 'scienceClub'],
    ['RC4 Flag', 'school', 'rc4-flag', 'rc4'],
    ['UCLA Exchange', 'school', 'ucla', 'ucla'],
  ]) {
    fireEvent.click(container.querySelector(`group[name="${label}"]`))
    expect(onSelectItem).toHaveBeenLastCalledWith({ zoneId, itemId, cameraPreset })
  }
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
