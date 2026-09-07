import { expect, test } from 'vitest'
import { reportAsset, roomAsset } from './roomAssets'

test('keeps public room imagery under Vite’s configured base path', () => {
  expect(roomAsset('nus-mascot.png')).toBe(`${import.meta.env.BASE_URL}room-assets/nus-mascot.png`)
  expect(reportAsset('weather-forecast-report.pdf')).toBe(`${import.meta.env.BASE_URL}reports/weather-forecast-report.pdf`)
})
