import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { expect, test, vi } from 'vitest'
import App from './App'

vi.mock('@react-three/fiber', () => ({
  Canvas: ({ children }) => <div data-testid="canvas">{children}</div>,
}))
vi.mock('./components/scene/Room', () => ({
  default: ({ onSelect, onCatClick }) => (
    <>
      <button onClick={() => onSelect('frontend')} type="button">
        Open TV
      </button>
      <button onClick={onCatClick} type="button">
        Pet cat
      </button>
    </>
  ),
}))
vi.mock('./components/scene/CameraController', () => ({ default: () => null }))
vi.mock('./components/scene/Lighting', () => ({ default: () => null }))
vi.mock('./components/ui/DoorEntry', () => ({
  default: ({ onEnter }) => <button onClick={onEnter} type="button">Enter</button>,
}))

test('renders the room canvas behind its entry page', () => {
  render(<App />)

  expect(screen.getByTestId('canvas')).toBeInTheDocument()
  expect(screen.getByRole('button', { name: 'Enter' })).toBeInTheDocument()
})

test('selects a section from the room and returns with Back', async () => {
  render(<App />)

  await userEvent.click(screen.getByRole('button', { name: 'Enter' }))
  await userEvent.click(screen.getByRole('button', { name: 'Open TV' }))
  expect(
    screen.getByRole('heading', { name: 'Data Products' }),
  ).toBeInTheDocument()

  await userEvent.click(screen.getByRole('button', { name: /back to room/i }))
  expect(
    screen.queryByRole('heading', { name: 'Data Products' }),
  ).not.toBeInTheDocument()
})

test('cat clicks do not open a portfolio section', async () => {
  render(<App />)

  await userEvent.click(screen.getByRole('button', { name: 'Enter' }))
  await userEvent.click(screen.getByRole('button', { name: 'Pet cat' }))

  expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
})
