import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { expect, test, vi } from 'vitest'
import Overlay from './Overlay'

test.each([
  ['frontend', 'Data Products'],
  ['technical', 'Applied Data Science'],
  ['experience', 'Data, models, and decisions'],
  ['reports', 'Reports & Research'],
])('routes %s to its content panel', (section, heading) => {
  render(
    <Overlay
      selectedSection={section}
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
      selectedSection="frontend"
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
      selectedSection="unknown"
      onBack={() => {}}
      catReaction={0}
    />,
  )
  expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
})

test('a cat reaction announces its playful message', () => {
  render(
    <Overlay selectedSection={null} onBack={() => {}} catReaction={1} />,
  )
  expect(screen.getByRole('status')).toHaveTextContent('The curator is awake.')
})

test('leaves destination navigation to the in-room markers', () => {
  render(
    <Overlay
      selectedSection={null}
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
  render(<Overlay selectedSection={null} onBack={() => {}} catReaction={0} />)

  expect(screen.getByText('Drag to look around')).toBeInTheDocument()
  await user.click(screen.getByRole('button', { name: 'Hide room controls' }))
  expect(screen.queryByText('Drag to look around')).not.toBeInTheDocument()

  await user.click(screen.getByRole('button', { name: 'Show room controls' }))
  expect(screen.getByText('Scroll to zoom')).toBeInTheDocument()
})
