import { useEffect, useState } from 'react'

export default function Interactable({ label, onClick, children, onHoverChange, ...props }) {
  const [hovered, setHovered] = useState(false)

  useEffect(() => {
    document.body.style.cursor = hovered ? 'pointer' : 'auto'
    return () => {
      document.body.style.cursor = 'auto'
    }
  }, [hovered])

  return (
    <group
      name={label}
      onClick={(event) => {
        event.stopPropagation()
        setHovered(false)
        onHoverChange?.(false)
        onClick()
      }}
      onPointerOut={(event) => {
        event.stopPropagation()
        setHovered(false)
        onHoverChange?.(false)
      }}
      onPointerOver={(event) => {
        event.stopPropagation()
        setHovered(true)
        onHoverChange?.(true)
      }}
      {...props}
    >
      {children(hovered)}
    </group>
  )
}
