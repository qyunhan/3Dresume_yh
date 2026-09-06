import { render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { expect, test, vi } from 'vitest'
import App from './App'

const { cameraController } = vi.hoisted(() => ({ cameraController: vi.fn(() => null) }))

vi.mock('@react-three/fiber', () => ({
  Canvas: ({ children }) => <div data-testid="canvas">{children}</div>,
}))
vi.mock('./components/scene/Room', () => ({
  default: ({ onSelect, onSelectZone, onSelectItem, onCatClick }) => (
    <>
      <button onClick={() => onSelectZone('projects')} type="button">
        Open Projects
      </button>
      <button onClick={() => onSelectItem({ zoneId: 'projects', itemId: 'hdb', cameraPreset: 'hdb' })} type="button">
        Open HDB
      </button>
      <button onClick={() => onSelect('frontend')} type="button">
        Open TV
      </button>
      <button onClick={onCatClick} type="button">
        Pet cat
      </button>
    </>
  ),
}))
vi.mock('./components/scene/CameraController', () => ({ default: cameraController }))
vi.mock('./components/scene/Lighting', () => ({ default: () => null }))
vi.mock('./components/ui/DoorEntry', () => ({
  default: ({ onEnter }) => <button onClick={onEnter} type="button">Enter</button>,
}))

test('renders the room canvas behind its entry page', () => {
  render(<App />)

  expect(screen.getByTestId('canvas')).toBeInTheDocument()
  expect(screen.getByRole('button', { name: 'Enter' })).toBeInTheDocument()
})

test('selects an item in its zone and restores the room camera with Back', async () => {
  render(<App />)

  await userEvent.click(screen.getByRole('button', { name: 'Enter' }))
  await userEvent.click(screen.getByRole('button', { name: 'Open HDB' }))
  const panel = screen.getByRole('dialog', { name: 'Projects details' })
  expect(within(panel).getByRole('heading', { name: 'Projects' })).toBeInTheDocument()
  expect(within(panel).getByText('HDB Price Prediction')).toBeInTheDocument()
  expect(within(panel).queryByText('Time Series Weather Forecasting')).not.toBeInTheDocument()
  expect(cameraController.mock.lastCall[0].selectedSection).toBe('technical')

  await userEvent.click(screen.getByRole('button', { name: /back to room/i }))
  expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
  expect(cameraController.mock.lastCall[0].selectedSection).toBeNull()
})

test('selecting a zone clears the selected item and shows its overview', async () => {
  render(<App />)

  await userEvent.click(screen.getByRole('button', { name: 'Enter' }))
  await userEvent.click(screen.getByRole('button', { name: 'Open HDB' }))
  await userEvent.click(screen.getByRole('button', { name: 'Open Projects' }))

  const panel = screen.getByRole('dialog', { name: 'Projects details' })
  expect(within(panel).getByRole('heading', { name: 'Projects' })).toBeInTheDocument()
  expect(within(panel).getByText('Automated Financial Dashboard')).toBeInTheDocument()
  expect(within(panel).getByText('Time Series Weather Forecasting')).toBeInTheDocument()
  expect(within(panel).getByText('HDB Price Prediction')).toBeInTheDocument()
})

test('keeps existing room objects selectable during the zone migration', async () => {
  render(<App />)
  await userEvent.click(screen.getByRole('button', { name: 'Enter' }))
  await userEvent.click(screen.getByRole('button', { name: 'Open TV' }))
  expect(screen.getByRole('dialog', { name: 'Projects details' })).toBeInTheDocument()
})

test('cat clicks do not open a portfolio section', async () => {
  render(<App />)

  await userEvent.click(screen.getByRole('button', { name: 'Enter' }))
  await userEvent.click(screen.getByRole('button', { name: 'Pet cat' }))

  expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
})
