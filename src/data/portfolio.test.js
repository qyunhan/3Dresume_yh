import { expect, test } from 'vitest'
import { ZONE_IDS, getPortfolioItem, getZone, portfolio } from './portfolio'

test('defines all four recruiter-facing resume zones', () => {
  expect(ZONE_IDS).toEqual(['projects', 'research', 'experience', 'school'])
  expect(portfolio.projects.title).toBe('Projects')
  expect(portfolio.school.subtitle).toBe('Beyond Work')
})

test('resolves an object to its direct detail item within its zone', () => {
  expect(getPortfolioItem('projects', 'hdb').title).toBe('HDB Price Prediction')
  expect(getPortfolioItem('research', 'hdb')).toBeNull()
  expect(getPortfolioItem('missing', 'hdb')).toBeNull()
  expect(getPortfolioItem('projects', 'missing')).toBeNull()
  expect(getZone(null)).toBeNull()
  expect(getZone('missing')).toBeNull()
  expect(getZone('constructor')).toBeNull()
})

test.each([
  ['projects', ['hdb', 'weather', 'financial-automation']],
  ['research', ['equity-research', 'portfolio-research']],
  ['experience', ['ey', 'shopee', 'uob']],
  ['school', ['science-club', 'ucla', 'rc4-flag']],
])('%s supplies complete content for every selectable object', (zoneId, itemIds) => {
  const zone = getZone(zoneId)
  expect(zone.items.map(({ id }) => id)).toEqual(itemIds)
  for (const item of zone.items) {
    for (const field of ['id', 'title', 'subtitle', 'hook', 'shortDescription', 'longDescription', 'objectName', 'cameraPreset', 'status']) {
      expect(item[field], `${item.id}.${field}`).toEqual(expect.any(String))
      expect(item[field].trim(), `${item.id}.${field}`).not.toBe('')
    }
    expect(item.body.length).toBeGreaterThanOrEqual(1)
    expect(item.body.length).toBeLessThanOrEqual(2)
    expect(item.skills.length).toBeGreaterThanOrEqual(3)
    expect(item.skills.length).toBeLessThanOrEqual(5)
    expect(item.skills.every((skill) => typeof skill === 'string' && skill.trim())).toBe(true)
  }
})
