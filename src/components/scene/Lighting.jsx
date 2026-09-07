import { roomLayout } from '../../data/roomLayout'
import { researchLightPosition } from '../../data/roomPolish'

export default function Lighting() {
  return (
    <>
      <ambientLight color="#fff4e8" intensity={0.42} />
      <hemisphereLight
        color="#f5e8d8"
        groundColor="#867895"
        intensity={0.72}
      />
      <directionalLight
        castShadow
        color="#ffdfb8"
        intensity={2.25}
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
      <pointLight
        color="#ffd2a4"
        distance={3.4}
        intensity={0.48}
        position={researchLightPosition}
      />
    </>
  )
}
