import { Children, isValidElement } from 'react'
import { expect, test } from 'vitest'
import Lighting from './Lighting'

function descendants(element) {
  if (!isValidElement(element)) return []
  return [element, ...Children.toArray(element.props.children).flatMap(descendants)]
}

test('provides warm practical lights beneath a shadowed key light', () => {
  const tree = descendants(Lighting())

  const directionals = tree.filter((node) => node.type === 'directionalLight')

  expect(tree.filter((node) => node.type === 'pointLight')).toHaveLength(2)
  expect(directionals[0].props.castShadow).toBe(true)
  // A shaded fill keeps form readable; a lone flat ambient wash flattens the room.
  expect(tree.find((node) => node.type === 'ambientLight').props.intensity).toBeGreaterThanOrEqual(0.4)
  expect(tree.find((node) => node.type === 'ambientLight').props.intensity).toBeLessThan(directionals[0].props.intensity)
  expect(tree.find((node) => node.type === 'hemisphereLight').props.groundColor).toBe('#C3ADD3')
  expect(tree.find((node) => node.type === 'hemisphereLight').props.intensity).toBeGreaterThanOrEqual(0.5)
  // A rim light opposite the key separates silhouettes from the wall.
  expect(directionals).toHaveLength(2)
  expect(directionals[1].props.castShadow).toBeUndefined()
  expect(directionals[1].props.position[0]).toBeGreaterThan(0)
})
