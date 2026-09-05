import { act, fireEvent, render, screen } from '@testing-library/react'
import { afterEach, expect, test, vi } from 'vitest'
import DoorEntry from './DoorEntry'

afterEach(() => vi.useRealTimers())

test('starts the entry sequence and hands off to the room', async () => {
  vi.useFakeTimers()
  const onEnter = vi.fn()
  render(<DoorEntry onEnter={onEnter} />)

  fireEvent.click(screen.getByRole('button', { name: /knock on the door/i }))
  expect(screen.getByTestId('door-entry')).toHaveClass('is-opening')

  act(() => vi.advanceTimersByTime(900))
  expect(onEnter).toHaveBeenCalledOnce()
})
