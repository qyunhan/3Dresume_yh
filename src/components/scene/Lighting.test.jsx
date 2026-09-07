import { Children, isValidElement } from 'react'
import { expect, test } from 'vitest'
import Lighting from './Lighting'

function descendants(element) {
  if (!isValidElement(element)) return []
  return [element, ...Children.toArray(element.props.children).flatMap(descendants)]
}

test('provides warm practical lights beneath a shadowed key light', () => {
  const tree = descendants(Lighting())

  expect(tree.filter((node) => node.type === 'pointLight')).toHaveLength(2)
  expect(tree.find((node) => node.type === 'directionalLight').props.castShadow).toBe(true)
  expect(tree.find((node) => node.type === 'ambientLight').props.intensity).toBeGreaterThanOrEqual(0.8)
  expect(tree.find((node) => node.type === 'hemisphereLight').props.groundColor).toBe('#C3ADD3')
  expect(tree.find((node) => node.type === 'hemisphereLight').props.intensity).toBeGreaterThanOrEqual(0.9)
})
