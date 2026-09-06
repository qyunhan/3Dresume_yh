import { useState } from 'react'
import { render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { expect, test, vi } from 'vitest'
import DetailPanel from './DetailPanel'

test.each([
  ['projects', 'Projects', 'Automated Financial Dashboard'],
  ['research', 'Research', 'Equity Research'],
  ['experience', 'Experience', 'EY'],
  ['school', 'School & Life', 'NUS'],
])('opens the %s overview with item navigation and no selected detail', (zone, title, item) => {
  render(<DetailPanel activeZone={zone} selectedItem={null} onBack={() => {}} onSelectItem={() => {}} />)
  expect(screen.getByRole('dialog', { name: `${title} details` })).toBeInTheDocument()
  expect(screen.getByRole('heading', { name: title })).toBeInTheDocument()
  expect(screen.getByRole('button', { name: item })).toHaveAttribute('aria-pressed', 'false')
  expect(screen.queryByRole('article')).not.toBeInTheDocument()
})

test('switches the detail and skills in place while keeping the zone open', async () => {
  function Panel() {
    const [selectedItem, setSelectedItem] = useState('hdb')
    return <DetailPanel activeZone="projects" selectedItem={selectedItem} onBack={() => {}} onSelectItem={setSelectedItem} />
  }
  render(<Panel />)
  expect(screen.getByRole('heading', { name: 'HDB Price Prediction' })).toBeInTheDocument()
  expect(within(screen.getByRole('list', { name: 'Skills' })).getByText('Dash')).toBeInTheDocument()
  await userEvent.click(screen.getByRole('button', { name: 'Time Series Weather Forecasting' }))
  expect(screen.getByRole('dialog', { name: 'Projects details' })).toBeInTheDocument()
  expect(screen.getByRole('heading', { name: 'Projects' })).toBeInTheDocument()
  expect(screen.getByRole('heading', { name: 'Time Series Weather Forecasting' })).toBeInTheDocument()
  expect(screen.queryByRole('heading', { name: 'HDB Price Prediction' })).not.toBeInTheDocument()
  expect(screen.getByText('Machine Learning × Time Series')).toBeInTheDocument()
  expect(screen.getByText('Comparing forecasting models with an engineered weather-data pipeline.')).toBeInTheDocument()
  expect(screen.getByText(/Compared five forecasting models across more than ten years/)).toBeInTheDocument()
  expect(within(screen.getByRole('list', { name: 'Skills' })).getByText('Pandas')).toBeInTheDocument()
  expect(screen.getByRole('button', { name: 'Time Series Weather Forecasting' })).toHaveAttribute('aria-pressed', 'true')
})

test('Back returns control to the room', async () => {
  const onBack = vi.fn()
  render(<DetailPanel activeZone="research" onBack={onBack} onSelectItem={() => {}} />)
  await userEvent.click(screen.getByRole('button', { name: 'Back to room' }))
  expect(onBack).toHaveBeenCalledOnce()
})

test('an item from another zone falls back to the active zone overview', () => {
  render(<DetailPanel activeZone="school" selectedItem="hdb" onBack={() => {}} onSelectItem={() => {}} />)
  expect(screen.getByRole('dialog', { name: 'School & Life details' })).toBeInTheDocument()
  expect(screen.queryByRole('article')).not.toBeInTheDocument()
})

test.each([null, 'unknown'])('does not open a panel for %s', (activeZone) => {
  render(<DetailPanel activeZone={activeZone} onBack={() => {}} onSelectItem={() => {}} />)
  expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
})
