import { describe, expect, test } from 'vitest'
import { roomLayout } from './roomLayout'

const anchorIds = [
  'desk',
  'chair',
  'laptop',
  'noticeBoard',
  'tv',
  'mediaConsole',
  'reports',
  'cat',
  'rug',
  'window',
  'shelves',
  'door',
]

describe('immersive room layout', () => {
  test('contains every named scene anchor', () => {
    anchorIds.forEach((anchorId) => {
      expect(roomLayout[anchorId]).toBeDefined()
      expect(roomLayout[anchorId].position).toHaveLength(3)
      expect(roomLayout[anchorId].position.every(Number.isFinite)).toBe(true)
    })
  })

  test('uses the room footprint and back-wall contract', () => {
    expect(roomLayout.room).toEqual({ width: 14, depth: 11, backWallZ: -5.5 })
  })

  test.each([
    ['laptop', 'technical'],
    ['tv', 'frontend'],
    ['noticeBoard', 'experience'],
    ['reports', 'reports'],
  ])('%s exposes a selectable destination anchor', (anchorId, sectionId) => {
    const anchor = roomLayout[anchorId]
    expect(anchor.markerPosition).toHaveLength(3)
    expect(anchor.markerPosition.every(Number.isFinite)).toBe(true)
    expect(anchor.sectionId).toBe(sectionId)
  })
})
