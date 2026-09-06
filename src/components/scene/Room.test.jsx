import { Children, cloneElement, isValidElement } from 'react'
import { fireEvent, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { expect, test, vi } from 'vitest'
import Room from './Room'
import ZoneLabel from './ZoneLabel'
import Interactable from './Interactable'

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

test('project and research meshes and keyboard markers select the same canonical item', async () => {
  const onSelectItem = vi.fn()
  const elements = descendants(Room({ onSelectItem }))
  const objects = elements.filter((element) => element.props.item)
  expect(objects).toHaveLength(4)
  const { container } = render(<>{objects.map((object) => cloneElement(object, { children: () => null }))}</>)
  const user = userEvent.setup()
  for (const [label, zoneId, itemId, cameraPreset] of [
    ['Financial dashboard', 'projects', 'financial-automation', 'financialAutomation'],
    ['Weather station', 'projects', 'weather', 'weather'],
    ['HDB block', 'projects', 'hdb', 'hdb'],
    ['Equity report', 'research', 'equity-research', 'equityResearch'],
  ]) {
    const marker = screen.getByRole('button', { name: label })
    const mesh = container.querySelector(`group[name="${label}"]`)
    expect(marker).not.toHaveClass('is-visible')
    fireEvent.pointerOver(mesh)
    expect(marker).toHaveClass('is-visible')
    fireEvent.pointerOut(mesh)
    expect(marker).not.toHaveClass('is-visible')
    marker.focus()
    await user.keyboard('{Enter}')
    expect(onSelectItem).toHaveBeenLastCalledWith({ zoneId, itemId, cameraPreset })
    fireEvent.click(mesh)
    expect(onSelectItem).toHaveBeenLastCalledWith({ zoneId, itemId, cameraPreset })
    marker.blur()
  }
  expect(onSelectItem).toHaveBeenCalledTimes(8)
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
