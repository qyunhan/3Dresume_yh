export const palette = {
  lavender: '#b8aec8',
  lavenderShadow: '#8e829f',
  wood: '#9a6548',
  woodDark: '#6f4535',
  cream: '#eee6d5',
  white: '#f7f3ed',
  ink: '#28252d',
  blush: '#d99aa1',
  sage: '#788b78',
  sky: '#afc9cf',
  gold: '#c58d5f',
}

export function Material({ color, hovered = false, ...props }) {
  return (
    <meshStandardMaterial
      color={color}
      emissive="#fff0cf"
      emissiveIntensity={hovered ? 0.2 : 0}
      roughness={0.78}
      flatShading
      {...props}
    />
  )
}
