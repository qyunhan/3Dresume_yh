import { expect, test } from 'vitest'
import { palette } from './materials'

test('uses the requested cozy lavender room palette', () => {
  expect(palette.lavender).toBe('#A98BC3')
  expect(palette.lightLavender).toBe('#BDA6D3')
  expect(palette.lavenderShadow).toBe('#8D71A6')
  expect(palette.purpleFurniture).toBe('#9673B0')
  expect(palette.cushion).toBe('#A77FC2')
  expect(palette.cream).toBe('#EFE4D7')
  expect(palette.white).toBe('#F8F1E8')
  expect(palette.wood).toBe('#A96F4E')
  expect(palette.woodLight).toBe('#B9815D')
  expect(palette.sage).toBe('#718363')
  expect(palette.gold).toBe('#D2A855')
})
