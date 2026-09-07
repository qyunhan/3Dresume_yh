import { expect, test } from 'vitest'
import { roomAsset } from './roomAssets'

test('keeps public room imagery under Vite’s configured base path', () => {
  expect(roomAsset('nus-mascot.png')).toBe(`${import.meta.env.BASE_URL}room-assets/nus-mascot.png`)
})
