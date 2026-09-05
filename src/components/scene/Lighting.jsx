import { roomLayout } from '../../data/roomLayout'

export default function Lighting() {
  return (
    <>
      <ambientLight intensity={0.38} />
      <hemisphereLight
        color="#eee6f4"
        groundColor="#867895"
        intensity={0.85}
      />
      <directionalLight
        castShadow
        color="#ffe4be"
        intensity={2.4}
        position={[-8, 7.5, -3.6]}
        shadow-bias={-0.0002}
        shadow-mapSize-height={1024}
        shadow-mapSize-width={1024}
        shadow-camera-left={-10}
        shadow-camera-right={10}
        shadow-camera-top={9}
        shadow-camera-bottom={-9}
        shadow-camera-near={0.5}
        shadow-camera-far={28}
      />
      <pointLight
        color="#ffc98f"
        distance={4}
        intensity={0.7}
        position={[
          roomLayout.desk.position[0] + 1.77,
          roomLayout.desk.position[1] + 1.61,
          roomLayout.desk.position[2] - 0.36,
        ]}
      />
    </>
  )
}
