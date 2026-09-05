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

test('renders the room canvas and hideable room controls', () => {
  render(<App />)

  expect(screen.getByTestId('canvas')).toBeInTheDocument()
  expect(screen.getByRole('complementary', { name: 'Room controls' }))
    .toBeInTheDocument()
})

test('selects a section from the room and returns with Back', async () => {
  render(<App />)

  await userEvent.click(screen.getByRole('button', { name: 'Open TV' }))
  expect(
    screen.getByRole('heading', { name: 'Frontend Projects' }),
  ).toBeInTheDocument()

  await userEvent.click(screen.getByRole('button', { name: /back to room/i }))
  expect(
    screen.queryByRole('heading', { name: 'Frontend Projects' }),
  ).not.toBeInTheDocument()
})

test('cat clicks trigger the playful status without opening a section', async () => {
  render(<App />)

  await userEvent.click(screen.getByRole('button', { name: 'Pet cat' }))

  expect(screen.getByRole('status')).toHaveTextContent('The curator is awake.')
  expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
})
