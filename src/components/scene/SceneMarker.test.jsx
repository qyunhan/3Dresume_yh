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
