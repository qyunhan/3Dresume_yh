import { expect, test } from 'vitest'
import { getCatReactionPose, getCatWalkPose } from './catAnimation'

test('returns a visible hop during an active reaction', () => {
  const pose = getCatReactionPose(10.125, 10, false)

  expect(pose.y).toBeGreaterThan(0)
  expect(Math.abs(pose.rotationZ)).toBeGreaterThan(0)
})

test('settles after the reaction and respects reduced motion', () => {
  expect(getCatReactionPose(10.9, 10, false)).toEqual({ y: 0, rotationZ: 0 })
  expect(getCatReactionPose(10.125, 10, true)).toEqual({
    y: 0,
    rotationZ: 0,
  })
})

test('walks a short loop and returns to the rug anchor', () => {
  expect(getCatWalkPose(10.5, 10, false).x).not.toBe(0)
  expect(getCatWalkPose(13.2, 10, false)).toEqual({ x: 0, z: 0, rotationY: 0, bob: 0 })
  expect(getCatWalkPose(10.5, 10, true)).toEqual({ x: 0, z: 0, rotationY: 0, bob: 0 })
})
