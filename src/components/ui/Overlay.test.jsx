import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { expect, test, vi } from 'vitest'
import Overlay from './Overlay'

test.each([
  ['projects', 'Projects'],
  ['research', 'Research'],
  ['experience', 'Experience'],
  ['school', 'School & Life'],
])('routes %s to its content panel', (section, heading) => {
  render(
    <Overlay
      activeZone={section}
      onBack={() => {}}
      catReaction={0}
    />,
  )
  expect(screen.getByRole('heading', { name: heading })).toBeInTheDocument()
})

test('Back requests clearing the section', async () => {
  const onBack = vi.fn()
  render(
    <Overlay
      activeZone="projects"
      onBack={onBack}
      catReaction={0}
    />,
  )

  await userEvent.click(screen.getByRole('button', { name: /back to room/i }))
  expect(onBack).toHaveBeenCalledOnce()
})

test('an unknown selection renders no panel', () => {
  render(
    <Overlay
      activeZone="unknown"
      onBack={() => {}}
      catReaction={0}
    />,
  )
  expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
})

test('leaves destination navigation to the in-room markers', () => {
  render(
    <Overlay
      activeZone={null}
      onBack={() => {}}
      catReaction={0}
    />,
  )

  expect(screen.queryByRole('navigation', { name: 'Portfolio destinations' }))
    .not.toBeInTheDocument()
  expect(screen.getByRole('button', { name: 'Hide room controls' }))
    .toBeInTheDocument()
})

test('lets visitors hide and restore the room controls menu', async () => {
  const user = userEvent.setup()
  render(<Overlay activeZone={null} onBack={() => {}} />)

  expect(screen.getByText('Drag to look around')).toBeInTheDocument()
  await user.click(screen.getByRole('button', { name: 'Hide room controls' }))
  expect(screen.queryByText('Drag to look around')).not.toBeInTheDocument()

  await user.click(screen.getByRole('button', { name: 'Show room controls' }))
  expect(screen.getByText('Scroll to zoom')).toBeInTheDocument()
  expect(screen.queryByRole('navigation', { name: 'Portfolio destinations' }))
    .not.toBeInTheDocument()
})

test('supplies the active zone when selecting an item through the shared panel', async () => {
  const onSelectItem = vi.fn()
  render(<Overlay activeZone="projects" selectedItem="hdb" onBack={() => {}} onSelectItem={onSelectItem} />)
  await userEvent.click(screen.getByRole('button', { name: 'Time Series Weather Forecasting' }))
  expect(onSelectItem).toHaveBeenCalledWith({ zoneId: 'projects', itemId: 'weather' })
})
