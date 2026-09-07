import { expect, test } from 'vitest'
import {
  DeskLamp,
  FloorPouf,
  LowPolyPlant,
  PhotoFrame,
  StackedBooks,
  Trophy,
  WallPlaque,
} from './LowPolyProps'

test('StackedBooks renders one book group for each requested book', () => {
  expect(StackedBooks({ count: 3 }).props.children).toHaveLength(3)
})

test.each([
  ['LowPolyPlant', LowPolyPlant, {}],
  ['WallPlaque', WallPlaque, { title: 'HDB' }],
  ['PhotoFrame', PhotoFrame, {}],
  ['Trophy', Trophy, {}],
  ['DeskLamp', DeskLamp, {}],
  ['FloorPouf', FloorPouf, {}],
])('%s provides a group root that forwards transforms', (_name, Primitive, options) => {
  const element = Primitive({ ...options, position: [1, 2, 3] })

  expect(element.type).toBe('group')
  expect(element.props.position).toEqual([1, 2, 3])
})
