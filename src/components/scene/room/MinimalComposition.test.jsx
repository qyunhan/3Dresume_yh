import { Children } from 'react'
import { render } from '@testing-library/react'
import { expect, test, vi } from 'vitest'
import Room from '../Room'
import { CareerJourney } from './CareerJourney'
import { SchoolLife } from './SchoolLife'

vi.mock('@react-three/drei', () => ({
  Html: ({ children }) => <div>{children}</div>,
  Image: (props) => <mesh {...props} />,
}))

vi.mock('./Cat', () => ({ default: () => <group name="cat" /> }))

function roomChildren() {
  return Children.toArray(Room({ onCatClick: vi.fn(), onSelectItem: vi.fn(), onSelectZone: vi.fn(), catReaction: 0 }).props.children)
}

test('keeps exactly the prescribed project, career, and school heroes in one connected room composition', () => {
  const children = roomChildren()
  const standaloneHeroIds = children
    .filter((child) => child.props.item)
    .map((child) => child.props.item.id)

  expect(standaloneHeroIds).toEqual(['financial-automation', 'weather', 'hdb', 'equity-research'])
  expect(children.filter((child) => child.props.item?.zoneId === 'projects')).toHaveLength(3)

  const career = children.find((child) => child.type === CareerJourney)
  expect(career.props.items.map((item) => item.id)).toEqual(['ey', 'shopee', 'uob'])

  const school = children.find((child) => child.type === SchoolLife)
  expect(school.props.items.map((item) => item.id)).toEqual(['science-club', 'rc4-flag', 'ucla'])

  const { container } = render(<Room onCatClick={vi.fn()} onSelectItem={vi.fn()} onSelectZone={vi.fn()} catReaction={0} />)
  expect(container.querySelectorAll('group[name="experience-card"]')).toHaveLength(3)
  const shelf = container.querySelector('group[name="school-shelf"]')
  expect(shelf?.querySelectorAll('group[name="NUS"], group[name="RC4 Flag"], group[name="UCLA"]')).toHaveLength(3)
  expect(container.querySelectorAll('group[name="NUS"]')).toHaveLength(1)
  expect(container.querySelectorAll('group[name="About this room"]')).toHaveLength(0)
})

test('caps the physical research report volumes at three', () => {
  const { container } = render(<Room onCatClick={vi.fn()} onSelectItem={vi.fn()} onSelectZone={vi.fn()} catReaction={0} />)
  const reports = container.querySelector('group[name="research-reports"] > group')
  const reportVolumes = Array.from(reports?.children ?? []).filter((child) => child.tagName === 'GROUP')

  expect(reportVolumes).toHaveLength(3)
  expect(reportVolumes.length).toBeLessThanOrEqual(3)
})
