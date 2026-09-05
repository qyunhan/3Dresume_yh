import { Children, isValidElement } from 'react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { expect, test, vi } from 'vitest'
import Room from './Room'
import SceneMarker from './SceneMarker'
import Interactable from './Interactable'

vi.mock('@react-three/drei', () => ({
  Html: ({ children }) => <div>{children}</div>,
}))

// Inspect the composition boundary without creating a WebGL context; render
// the real DOM markers so keyboard activation exercises their real handlers.
function descendants(element) {
  if (!isValidElement(element)) return []
  return [element, ...Children.toArray(element.props.children).flatMap(descendants)]
}

test('each room marker is keyboard accessible and selects the same section as its mesh', async () => {
  const onSelect = vi.fn()
  const elements = descendants(Room({ onSelect, onCatClick: vi.fn(), catReaction: 0 }))
  const markers = elements.filter((element) => element.type === SceneMarker)
  expect(markers).toHaveLength(4)
  render(<>{markers.map((marker, index) => <div key={index}>{marker}</div>)}</>)
  const user = userEvent.setup()

  for (const [label, sectionId] of [
    ['Frontend projects on TV', 'frontend'],
    ['Technical projects on laptop', 'technical'],
    ['About and experience on notice board', 'experience'],
    ['Research and reports on books', 'reports'],
  ]) {
    const marker = screen.getByRole('button', { name: label })
    marker.focus()
    await user.keyboard('{Enter}')
    expect(onSelect).toHaveBeenLastCalledWith(sectionId)
    const mesh = elements.find((element) => element.type === Interactable && element.props.label === label)
    expect(mesh).toBeDefined()
    mesh.props.onClick()
    expect(onSelect).toHaveBeenLastCalledWith(sectionId)
  }
  expect(onSelect).toHaveBeenCalledTimes(8)
})
