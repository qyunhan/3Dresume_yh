export const palette = {
  wall: '#A98BC3',
  wallLight: '#BDA6D3',
  wallDark: '#8D71A6',
  chair: '#9673B0',
  cushion: '#A77FC2',
  cream: '#EFE4D7',
  warmWhite: '#F8F1E8',
  wood: '#A96F4E',
  woodLight: '#B9815D',
  green: '#718363',
  gold: '#D2A855',
  lavender: '#A98BC3',
  lavenderShadow: '#8D71A6',
  lightLavender: '#BDA6D3',
  purpleFurniture: '#9673B0',
  woodDark: '#8D71A6',
  white: '#F8F1E8',
  ink: '#28252d',
  blush: '#A77FC2',
  sage: '#718363',
  sky: '#BDA6D3',
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
