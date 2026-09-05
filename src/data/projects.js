export const SECTION_IDS = ['frontend', 'technical', 'experience', 'reports']

export const sectionContent = {
  frontend: {
    eyebrow: 'Selected work',
    title: 'Frontend Projects',
    intro:
      'Interfaces shaped around clarity, gentle motion, and small human details.',
    items: [
      {
        title: 'Soft Focus',
        summary: 'A calm planning interface for creative routines.',
        tags: ['React', 'Motion'],
      },
      {
        title: 'Field Notes',
        summary: 'An editorial archive for places and observations.',
        tags: ['Design systems', 'Accessibility'],
      },
    ],
  },
  technical: {
    eyebrow: 'Under the hood',
    title: 'Technical Projects',
    intro:
      'Systems, prototypes, and experiments built to make complex things feel simple.',
    items: [
      {
        title: 'Signal Garden',
        summary: 'A live data experiment with a spatial interface.',
        tags: ['WebGL', 'Data'],
      },
      {
        title: 'Tiny Tools',
        summary: 'Focused utilities for repetitive creative workflows.',
        tags: ['TypeScript', 'APIs'],
      },
    ],
  },
  experience: {
    eyebrow: 'About & experience',
    title: 'Curious by design',
    intro:
      'I work where thoughtful interfaces meet reliable engineering, turning early ideas into inviting products.',
    timeline: [
      {
        period: 'Now',
        role: 'Product Engineer',
        detail:
          'Designing and building useful, expressive digital products.',
      },
      {
        period: 'Before',
        role: 'Creative Technologist',
        detail: 'Prototyping new interactions across design and code.',
      },
    ],
  },
  reports: {
    eyebrow: 'Research archive',
    title: 'Reports & Writing',
    intro:
      'A small shelf of investigations, findings, and documented decisions.',
    items: [
      {
        title: 'Designing for Calm',
        summary: 'Patterns that lower interface noise.',
        meta: 'Field report · 08 min',
      },
      {
        title: 'Rooms as Interfaces',
        summary: 'Using spatial memory to organize content.',
        meta: 'Research note · 06 min',
      },
      {
        title: 'Motion with Restraint',
        summary: 'A practical guide to purposeful transitions.',
        meta: 'Technical report · 10 min',
      },
    ],
  },
}
