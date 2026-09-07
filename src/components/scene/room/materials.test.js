import { expect, test } from 'vitest'
import { palette } from './materials'

test('uses the original light pastel lavender as the room wall color', () => {
  expect(palette.lavender).toBe('#b8aec8')
})
