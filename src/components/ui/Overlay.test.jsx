import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { expect, test, vi } from 'vitest'
import Overlay from './Overlay'

test.each([
  ['frontend', 'Frontend Projects'],
  ['technical', 'Technical Projects'],
  ['experience', 'Curious by design'],
  ['reports', 'Reports & Writing'],
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

test('offers keyboard-operable navigation to every portfolio section', async () => {
  const onSelect = vi.fn()
  render(
    <Overlay
      selectedSection={null}
      onBack={() => {}}
      onSelect={onSelect}
      catReaction={0}
    />,
  )

  const destinations = [
    ['Frontend projects on TV', 'frontend'],
    ['Technical projects on laptop', 'technical'],
    ['About and experience on notice board', 'experience'],
    ['Research and reports on books', 'reports'],
  ]

  for (const [label, sectionId] of destinations) {
    await userEvent.click(screen.getByRole('button', { name: label }))
    expect(onSelect).toHaveBeenLastCalledWith(sectionId)
  }
})
