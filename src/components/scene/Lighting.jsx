import { roomLayout } from '../../data/roomLayout'
import { researchLightPosition } from '../../data/roomPolish'

export default function Lighting() {
  return (
    <>
      {/* Fill stays low so surfaces in shade read as volume, not flat colour. */}
      <ambientLight color="#fff8f3" intensity={0.58} />
      <hemisphereLight
        color="#fff8f3"
        groundColor="#C3ADD3"
        intensity={0.72}
      />
      <directionalLight
        castShadow
        color="#ffdfb8"
        intensity={2.7}
        position={[-8, 7.5, -3.6]}
        shadow-bias={-0.0002}
        shadow-normalBias={0.02}
        shadow-mapSize-height={2048}
        shadow-mapSize-width={2048}
        shadow-camera-left={-10}
        shadow-camera-right={10}
        shadow-camera-top={9}
        shadow-camera-bottom={-9}
        shadow-camera-near={0.5}
        shadow-camera-far={28}
      />
      {/* Cool rim from the opposite side separates edges from the wall. */}
      <directionalLight color="#d6c1ec" intensity={0.5} position={[7.5, 3.2, 2.4]} />
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
