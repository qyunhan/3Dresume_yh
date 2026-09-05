import { useEffect, useState } from 'react'

export default function Interactable({ label, onClick, children, ...props }) {
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
        onClick()
      }}
      onPointerOut={(event) => {
        event.stopPropagation()
        setHovered(false)
      }}
      onPointerOver={(event) => {
        event.stopPropagation()
        setHovered(true)
      }}
      {...props}
    >
      {children(hovered)}
    </group>
  )
}
