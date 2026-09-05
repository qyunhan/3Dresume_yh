import { render, screen } from '@testing-library/react'
import { expect, test, vi } from 'vitest'
import App from './App'

vi.mock('@react-three/fiber', () => ({
  Canvas: ({ children }) => <div data-testid="canvas">{children}</div>,
}))

test('renders the room canvas and portfolio heading', () => {
  render(<App />)

  expect(screen.getByTestId('canvas')).toBeInTheDocument()
  expect(
    screen.getByRole('heading', { name: /a room full of ideas/i }),
  ).toBeInTheDocument()
})
