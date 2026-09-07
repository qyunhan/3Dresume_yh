import { Children, isValidElement } from 'react'
import { Box3, BoxGeometry, CylinderGeometry, Mesh, Object3D } from 'three'
import { expect, test } from 'vitest'
import Room from '../Room'
import Lighting from '../Lighting'
import { phase2Layout } from '../../../data/phase2Layout'
import { roomLayout } from '../../../data/roomLayout'
import { MediaConsole } from './Furniture'
import { DeskLamp, FloorPouf, Trophy } from './LowPolyProps'
import { Laptop, Reports, Tv } from './PortfolioObjects'
import { EquityResearchStation, FinancialDashboard } from './ResumeObjects'
import { SchoolLife, Rc4Trophy } from './SchoolLife'
import RoomShell from './RoomShell'

// Expand these pure geometry components through their actual mesh/material
// boundary; Object3D composes translations, rotations and scales as R3F does.
function expand(element) {
  if (!isValidElement(element)) return null
  if (typeof element.type === 'function') return expand(element.type(element.props))
  return { type: element.type, props: element.props, children: Children.toArray(element.props.children).map(expand).filter(Boolean) }
}

function descendants(node) {
  return node ? [node, ...node.children.flatMap(descendants)] : []
}

function geometryTree(node) {
  const shape = node.children.find((child) => ['boxGeometry', 'cylinderGeometry'].includes(child.type))
  const geometry = shape?.type === 'boxGeometry' ? new BoxGeometry(...shape.props.args)
    : shape ? new CylinderGeometry(...shape.props.args) : null
  const object = geometry ? new Mesh(geometry) : new Object3D()
  if (node.props.position) object.position.fromArray(node.props.position)
  if (node.props.rotation) object.rotation.fromArray(node.props.rotation)
  if (Array.isArray(node.props.scale)) object.scale.fromArray(node.props.scale)
  else if (node.props.scale !== undefined) object.scale.setScalar(node.props.scale)
  object.userData.node = node
  node.children.filter((child) => child.type === 'group' || child.type === 'mesh').forEach((child) => object.add(geometryTree(child)))
  return object
}

function bounds(element) {
  return new Box3().setFromObject(geometryTree(expand(element)))
}

function roomChildren() {
  return Children.toArray(Room({}).props.children)
}

test('Room routes the report offset through EquityResearchStation into real report geometry', () => {
  const anchor = phase2Layout.items['equity-research']
  const object = roomChildren().find((child) => child.props.item?.id === anchor.id)
  const station = object.props.children(false)
  expect(station.type).toBe(EquityResearchStation)
  const scene = geometryTree(expand(<group position={object.props.position}>{station}</group>))
  scene.updateMatrixWorld(true)
  let stand
  scene.traverse((mesh) => {
    if (mesh.geometry?.parameters.width === 1.92) stand = mesh
  })
  const standBounds = new Box3().setFromObject(stand)
  expect((standBounds.min.x + standBounds.max.x) / 2).toBeCloseTo(roomLayout.reports.position[0])
  expect(standBounds.max.y).toBeCloseTo(roomLayout.reports.position[1])
  expect((standBounds.min.z + standBounds.max.z) / 2).toBeCloseTo(roomLayout.reports.position[2])
  const transformed = Reports({ position: [1, 2, 3], rotation: [0, 0.3, 0], scale: 0.5 })
  expect(transformed.props).toMatchObject({ position: [1, 2, 3], rotation: [0, 0.3, 0], scale: 0.5 })
})

test('research keeps only its lamp on the console and its practical light sits at the lamp bulb', () => {
  const anchor = phase2Layout.items['equity-research']
  const station = expand(<group position={anchor.position}><EquityResearchStation reportOffset={anchor.reportOffset} /></group>)
  const scene = geometryTree(station)
  scene.updateMatrixWorld(true)
  const consoleBounds = bounds(<MediaConsole position={roomLayout.mediaConsole.position} />)
  const accessories = []
  let bulb
  scene.traverse((object) => {
    if (object.userData.node.props.name === 'research-lamp') accessories.push(object)
    if (object.userData.node.children.some((child) => child.type === 'meshStandardMaterial' && child.props.emissiveIntensity === 0.35)) bulb = object
  })
  expect(accessories).toHaveLength(1)
  for (const accessory of accessories) {
    const box = new Box3().setFromObject(accessory)
    expect(box.min.y).toBeCloseTo(consoleBounds.max.y)
    expect(box.min.x).toBeGreaterThan(consoleBounds.min.x)
    expect(box.max.x).toBeLessThan(consoleBounds.max.x)
    expect(box.min.z).toBeGreaterThan(consoleBounds.min.z)
    expect(box.max.z).toBeLessThan(consoleBounds.max.z)
  }
  expect(bulb).toBeDefined()
  const bulbBounds = new Box3().setFromObject(bulb)
  const practical = Children.toArray(Lighting().props.children).filter((child) => child.type === 'pointLight')[1]
  practical.props.position.forEach((value, axis) => {
    const key = ['x', 'y', 'z'][axis]
    expect(value).toBeCloseTo((bulbBounds.min[key] + bulbBounds.max[key]) / 2)
  })
})

test('lamp emission and restrained trophy metalness reach actual standard materials', () => {
  const lamp = descendants(expand(<DeskLamp />))
  expect(lamp.some((node) => node.type === 'meshStandardMaterial' && node.props.emissiveIntensity === 0.35)).toBe(true)
  expect(lamp.filter((node) => node.type === 'mesh').every((node) => node.props.emissive === undefined)).toBe(true)
  for (const component of [<Trophy />, <Rc4Trophy />]) {
    const metals = descendants(expand(component)).filter((node) => node.type === 'meshStandardMaterial' && node.props.metalness > 0)
    expect(metals.length).toBeGreaterThan(0)
    expect(metals.every((node) => node.props.metalness <= 0.4 && node.props.roughness >= 0.45)).toBe(true)
  }
})

test.each([['TV', Tv], ['finance monitor', FinancialDashboard], ['laptop', Laptop]])('%s has a gently emissive display and retains hover feedback', (_name, Component) => {
  const materials = (hovered) => descendants(expand(<Component hovered={hovered} />)).filter((node) => node.type === 'meshStandardMaterial')
  const screens = materials(false).filter((node) => node.props.emissiveIntensity > 0)
  expect(screens.length).toBeGreaterThan(0)
  expect(screens.every((node) => node.props.emissiveIntensity <= 0.2)).toBe(true)
  expect(materials(true).some((node) => node.props.emissiveIntensity >= 0.2)).toBe(true)
})

test('school shelf keeps only NUS, trophy, and UCLA groups while the pouf rests on the rug', () => {
  const school = SchoolLife()
  const schoolGroups = Children.toArray(school.props.children).map((child) => child.props.name)
  expect(schoolGroups.filter(Boolean)).toEqual(['school-nus', 'school-trophy', 'school-ucla'])
  const pouf = roomChildren().find((child) => child.type === FloorPouf)
  expect(bounds(pouf).min.y).toBeCloseTo(roomLayout.rug.position[1] + 0.07 / 2)
})

test('sun patches use a few opaque diagonal floor meshes', () => {
  const patches = descendants(expand(<RoomShell />)).filter((node) => node.type === 'mesh' && node.props.name === 'sun-patch')
  expect(patches.length).toBeGreaterThanOrEqual(2)
  expect(patches.length).toBeLessThanOrEqual(4)
  for (const patch of patches) {
    expect(Math.abs(patch.props.rotation[1])).toBeGreaterThan(0.2)
    const material = patch.children.find((child) => child.type === 'meshStandardMaterial')
    expect(material.props.transparent).not.toBe(true)
    expect(material.props.opacity ?? 1).toBe(1)
  }
})
