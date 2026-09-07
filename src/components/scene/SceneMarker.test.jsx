import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { expect, test, vi } from 'vitest'
import SceneMarker from './SceneMarker'

vi.mock('@react-three/drei', () => ({
  Html: ({ children }) => <div>{children}</div>,
}))

test('exposes an anchored destination as a DOM button', async () => {
  const onSelect = vi.fn()
  render(
    <SceneMarker
      label="Frontend projects on TV"
      shortLabel="Projects"
      position={[1, 2, 3]}
      onSelect={onSelect}
    />,
  )

  await userEvent.click(
    screen.getByRole('button', { name: 'Frontend projects on TV' }),
  )

  expect(screen.getByText('Projects')).toBeInTheDocument()
  expect(onSelect).toHaveBeenCalledOnce()
})

test('reveals its label while hovered or focused', async () => {
  const user = userEvent.setup()
  render(
    <SceneMarker
      label="Frontend projects on TV"
      shortLabel="Projects"
      position={[1, 2, 3]}
      onSelect={() => {}}
    />,
  )

  const marker = screen.getByRole('button', { name: 'Frontend projects on TV' })
  expect(marker).not.toHaveClass('is-visible')
  await user.hover(marker)
  expect(marker).toHaveClass('is-visible')
  await user.unhover(marker)
  expect(marker).not.toHaveClass('is-visible')
})

test('clears its hover label when the object is selected', async () => {
  const user = userEvent.setup()
  const onSelect = vi.fn()
  render(
    <SceneMarker
      label="HDB Price Prediction"
      shortLabel="HDB"
      position={[0, 0, 0]}
      onSelect={onSelect}
    />,
  )

  const marker = screen.getByRole('button', { name: 'HDB Price Prediction' })
  await user.hover(marker)
  expect(marker).toHaveClass('is-visible')
  await user.click(marker)

  expect(onSelect).toHaveBeenCalledOnce()
  expect(marker).not.toHaveClass('is-visible')
})
