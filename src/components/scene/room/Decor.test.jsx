import { Children } from 'react'
import { expect, test, vi } from 'vitest'
import * as decor from './Decor'
import Decor from './Decor'
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

test('Decor no longer exports a disconnected About frame', () => {
  expect(decor.AboutFrame).toBeUndefined()
})

test('keeps one deliberate plant on the research console', () => {
  const children = Decor().props.children
  const consoleGroup = children.find((child) => child.props?.position?.[0] === 3.55)
  const plants = Children.toArray(consoleGroup.props.children).filter((child) => child.type === LowPolyPlant)

  expect(plants).toHaveLength(1)
  expect(plants[0].props.position).toEqual([-1.85, 0.55, 0.12])
})
