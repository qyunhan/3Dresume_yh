import { fireEvent, render, screen } from '@testing-library/react'
import { expect, test, vi } from 'vitest'
import Interactable from './Interactable'

test('reports hover, handles clicks, and restores the cursor', () => {
  const onClick = vi.fn()
  const { container, unmount } = render(
    <Interactable label="Test object" onClick={onClick}>
      {(hovered) => <span>{hovered ? 'hot' : 'cold'}</span>}
    </Interactable>,
  )

  const group = container.querySelector('group')
  expect(screen.getByText('cold')).toBeInTheDocument()

  fireEvent.pointerOver(group)
  expect(screen.getByText('hot')).toBeInTheDocument()
  expect(document.body.style.cursor).toBe('pointer')

  fireEvent.click(group)
  expect(onClick).toHaveBeenCalledOnce()
  expect(screen.getByText('cold')).toBeInTheDocument()
  expect(document.body.style.cursor).toBe('auto')

  fireEvent.pointerOut(group)
  expect(screen.getByText('cold')).toBeInTheDocument()
  expect(document.body.style.cursor).toBe('auto')

  fireEvent.pointerOver(group)

  unmount()
  expect(document.body.style.cursor).toBe('auto')
})
