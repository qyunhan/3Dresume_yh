import { Children } from 'react'
import { render, screen } from '@testing-library/react'
import { expect, test, vi } from 'vitest'
import Decor, { AboutFrame } from './Decor'
import { LowPolyPlant } from './LowPolyProps'

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

test('keeps one deliberate plant on the research console', () => {
  const children = Decor().props.children
  const consoleGroup = children.find((child) => child.props?.position?.[0] === 3.55)
  const plants = Children.toArray(consoleGroup.props.children).filter((child) => child.type === LowPolyPlant)

  expect(plants).toHaveLength(1)
  expect(plants[0].props.position).toEqual([-1.85, 0.55, 0.12])
})
