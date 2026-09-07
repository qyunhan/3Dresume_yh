import { render, screen } from '@testing-library/react'
import { expect, test, vi } from 'vitest'
import { AboutFrame } from './Decor'

vi.mock('./materials', () => ({
  Material: ({ color, hovered = false }) => <span data-testid="material" data-color={color} data-hovered={String(hovered)} />,
  palette: {
    white: '#fff',
    cream: '#eee',
    woodDark: '#654',
    blush: '#d9a',
    lavenderShadow: '#8e8',
  },
}))

test('About frame forwards hover state to its framed surfaces', () => {
  render(<AboutFrame hovered />)

  const frameSurfaces = screen.getAllByTestId('material').filter(
    (material) => ['#eee', '#d9a'].includes(material.dataset.color),
  )
  expect(frameSurfaces).toHaveLength(2)
  expect(frameSurfaces.every((material) => material.dataset.hovered === 'true')).toBe(true)
})
