import { render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { expect, test, vi } from 'vitest'
import App from './App'

const { cameraController } = vi.hoisted(() => ({ cameraController: vi.fn(() => null) }))

vi.mock('@react-three/fiber', () => ({
  Canvas: ({ children }) => <div data-testid="canvas">{children}</div>,
}))
vi.mock('./components/scene/Room', () => ({
  default: ({ onSelectZone, onSelectItem, onCatClick }) => (
    <>
      <button onClick={() => onSelectZone('projects')} type="button">
        Open Projects
      </button>
      <button onClick={() => onSelectItem({ zoneId: 'projects', itemId: 'hdb', cameraPreset: 'financialAutomation' })} type="button">
        Open HDB
      </button>
      <button onClick={() => onSelectZone('research')} type="button">
        Open Research
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
  expect(within(panel).getByRole('heading', { name: 'HDB Price Prediction' })).toBeInTheDocument()
  expect(within(panel).queryByRole('heading', { name: 'Time Series Weather Forecasting' })).not.toBeInTheDocument()
  // The canonical selected item wins even if a callback supplies a stale preset.
  expect(cameraController.mock.lastCall[0].selectedSection).toBe('hdb')

  await userEvent.click(within(panel).getByRole('button', { name: 'Time Series Weather Forecasting' }))
  expect(screen.getByRole('dialog', { name: 'Projects details' })).toBe(panel)
  expect(within(panel).getByRole('heading', { name: 'Time Series Weather Forecasting' })).toBeInTheDocument()
  expect(cameraController.mock.lastCall[0].selectedSection).toBe('weather')

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
  expect(cameraController.mock.lastCall[0].selectedSection).toBe('projects')
})

test('research zone uses the authored research framing', async () => {
  render(<App />)
  await userEvent.click(screen.getByRole('button', { name: 'Enter' }))
  await userEvent.click(screen.getByRole('button', { name: 'Open Research' }))
  expect(screen.getByRole('dialog', { name: 'Research details' })).toBeInTheDocument()
  expect(cameraController.mock.lastCall[0].selectedSection).toBe('research')
})

test('cat clicks do not open a portfolio section', async () => {
  render(<App />)

  await userEvent.click(screen.getByRole('button', { name: 'Enter' }))
  await userEvent.click(screen.getByRole('button', { name: 'Pet cat' }))

  expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
})
