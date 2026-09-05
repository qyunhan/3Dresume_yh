export default function Lighting() {
  return (
    <>
      <ambientLight intensity={0.72} />
      <hemisphereLight
        color="#f3e7df"
        groundColor="#867895"
        intensity={1.25}
      />
      <directionalLight
        castShadow
        color="#ffe4be"
        intensity={2.15}
        position={[4, 9, 6]}
        shadow-bias={-0.0002}
        shadow-mapSize-height={1024}
        shadow-mapSize-width={1024}
      />
      <pointLight
        color="#ffc98f"
        distance={7}
        intensity={1.2}
        position={[-2.5, 4, -1.8]}
      />
    </>
  )
}
