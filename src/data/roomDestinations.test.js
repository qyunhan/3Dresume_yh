import { expect, test } from 'vitest'
import { roomDestinations } from './roomDestinations'

test('maps every room destination to its intended section', () => {
  expect(roomDestinations).toEqual({
    tv: { label: 'Frontend projects on TV', sectionId: 'frontend' },
    laptop: { label: 'Technical projects on laptop', sectionId: 'technical' },
    noticeBoard: {
      label: 'About and experience on notice board',
      sectionId: 'experience',
    },
    reports: {
      label: 'Research and reports on books',
      sectionId: 'reports',
    },
  })
})
