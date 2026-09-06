import { fireEvent, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { expect, test, vi } from 'vitest'
import ZoneLabel from './ZoneLabel'

// Html needs a WebGL scene; leave the DOM interaction under test intact.
vi.mock('@react-three/drei', () => ({
  Html: ({ children }) => <div>{children}</div>,
}))

test('opens a zone without propagating clicks or pointer presses to the room', async () => {
  const onSelect = vi.fn()
  const roomClick = vi.fn()
  const roomPointer = vi.fn()
  render(
    <div onClick={roomClick} onPointerDown={roomPointer}>
      <ZoneLabel title="PROJECTS" subtitle="What I Build" position={[0, 0, 0]} onSelect={onSelect} />
    </div>,
  )

  const label = screen.getByRole('button', { name: 'PROJECTS: What I Build' })
  fireEvent.pointerDown(label)
  await userEvent.click(label)
  expect(onSelect).toHaveBeenCalledOnce()
  expect(roomClick).not.toHaveBeenCalled()
  expect(roomPointer).not.toHaveBeenCalled()
})

test('opens a zone using the keyboard', async () => {
  const onSelect = vi.fn()
  render(<ZoneLabel title="Research" subtitle="How I Think" position={[0, 0, 0]} onSelect={onSelect} />)
  await userEvent.tab()
  expect(screen.getByRole('button', { name: 'Research: How I Think' })).toHaveFocus()
  await userEvent.keyboard('{Enter}')
  expect(onSelect).toHaveBeenCalledOnce()
})
