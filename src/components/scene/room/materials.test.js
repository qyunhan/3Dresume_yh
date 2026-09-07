import { expect, test } from 'vitest'
import { palette } from './materials'

test('uses the original light pastel lavender as the room wall color', () => {
  expect(palette.lavender).toBe('#79658A')
  expect(palette.lavenderShadow).toBe('#65536F')
  expect(palette.lightLavender).toBe('#A58DB8')
  expect(palette.purpleFurniture).toBe('#9276A5')
  expect(palette.cream).toBe('#EDE5DA')
  expect(palette.white).toBe('#F5EFE8')
  expect(palette.wood).toBe('#A9653F')
})
