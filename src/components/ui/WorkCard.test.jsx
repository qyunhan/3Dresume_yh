import { fireEvent, render, screen } from '@testing-library/react'
import { expect, test } from 'vitest'
import WorkCard from './WorkCard'

test('hides unavailable media without leaving an empty card area', () => {
  render(
    <WorkCard
      item={{
        title: 'HDB Price Prediction Analytics Tool',
        summary: 'A buyer tool for market exploration.',
        tags: ['Python', 'Machine Learning'],
        image: '/previews/hdb-tool-preview.png',
      }}
    />,
  )

  const image = screen.getByRole('img', { name: 'HDB Price Prediction Analytics Tool preview' })
  fireEvent.error(image)
  expect(screen.queryByRole('img')).not.toBeInTheDocument()
})

test('uses a supplied live demo as the clickable card destination', () => {
  render(
    <WorkCard
      item={{
        title: 'Forecasting',
        summary: 'A forecasting project.',
        tags: ['Time Series', 'Python'],
        demoUrl: 'https://example.com/demo',
      }}
    />,
  )

  expect(screen.getByRole('link', { name: /view forecasting/i }))
    .toHaveAttribute('href', 'https://example.com/demo')
})
