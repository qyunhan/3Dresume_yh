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

  test('mounts the window on the left wall facing into the room', () => {
    expect(roomLayout.window.position).toEqual([-6.84, 3.9, -3.6])
    expect(roomLayout.window.rotation).toEqual([0, Math.PI / 2, 0])
  })

  test('keeps the right-return door clear of the media console', () => {
    expect(roomLayout.door.position).toEqual([6.84, 2.65, -4.4])
    expect(roomLayout.door.rotation).toEqual([0, Math.PI / 2, 0])

    const doorLeftEdge = roomLayout.door.position[0] - 0.18 / 2
    const consoleRightEdge = roomLayout.mediaConsole.position[0] + 4.1 / 2
    const doorHalfWidth = 1.94 / 2
    const rightReturnEnd = roomLayout.room.backWallZ + 2.2

    expect(doorLeftEdge).toBeGreaterThan(consoleRightEdge)
    expect(roomLayout.door.position[2] - doorHalfWidth).toBeGreaterThanOrEqual(
      roomLayout.room.backWallZ,
    )
    expect(roomLayout.door.position[2] + doorHalfWidth).toBeLessThanOrEqual(
      rightReturnEnd,
    )
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
