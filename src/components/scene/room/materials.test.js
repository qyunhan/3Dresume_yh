import { expect, test } from 'vitest'
import { palette } from './materials'

test('uses the requested cozy lavender room palette', () => {
  expect(palette.wall).toBe('#AD93C0')
  expect(palette.wallLight).toBe('#C3ADD3')
  expect(palette.lavender).toBe('#AD93C0')
  expect(palette.lightLavender).toBe('#C3ADD3')
  expect(palette.lavenderShadow).toBe('#9E84B1')
  expect(palette.purpleFurniture).toBe('#9673B0')
  expect(palette.cushion).toBe('#A77FC2')
  expect(palette.cream).toBe('#EFE4D7')
  expect(palette.white).toBe('#F8F1E8')
  expect(palette.wood).toBe('#A96F4E')
  expect(palette.woodLight).toBe('#B9815D')
  expect(palette.sage).toBe('#718363')
  expect(palette.gold).toBe('#D2A855')
})
