import { Children, isValidElement } from 'react'
import { expect, test, vi } from 'vitest'
import * as decor from './Decor'
import Decor from './Decor'
import { LowPolyPlant } from './LowPolyProps'
import { roomLayout } from '../../../data/roomLayout'

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

test('keeps decor off the desk and research console', () => {
  const descendants = (element) => !isValidElement(element) ? [] : [element, ...Children.toArray(element.props.children).flatMap(descendants)]
  expect(descendants(Decor()).filter((element) => element.type === LowPolyPlant)).toHaveLength(0)
})

test('leaves the School & Life shelf as the room’s only shelf display', () => {
  const decorGroups = Children.toArray(Decor().props.children)
  expect(decorGroups.some((group) => group.props.position === roomLayout.shelves.position)).toBe(false)
})
