export const palette = {
  lavender: '#79658A',
  lavenderShadow: '#65536F',
  lightLavender: '#A58DB8',
  purpleFurniture: '#9276A5',
  wood: '#A9653F',
  woodDark: '#65536F',
  cream: '#EDE5DA',
  white: '#F5EFE8',
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
