import { useState } from 'react'
import { Canvas } from '@react-three/fiber'
import CameraController from './components/scene/CameraController'
import Lighting from './components/scene/Lighting'
import Room from './components/scene/Room'
import Overlay from './components/ui/Overlay'
import DoorEntry from './components/ui/DoorEntry'

export default function App() {
  const [selectedSection, setSelectedSection] = useState(null)
  const [catReaction, setCatReaction] = useState(0)
  const [enteredRoom, setEnteredRoom] = useState(false)

  return (
    <main className="app-shell">
      <Canvas
        camera={{ fov: 43, near: 0.1, far: 80, position: [8.8, 5.7, 10.4] }}
        data-testid="canvas"
        dpr={[1, 1.5]}
        gl={{ alpha: false, antialias: true }}
        shadows="basic"
      >
        <color attach="background" args={['#b8aec8']} />
        <Lighting />
        <Room
          catReaction={catReaction}
          onCatClick={() => setCatReaction((count) => count + 1)}
          onSelect={setSelectedSection}
        />
        <CameraController selectedSection={selectedSection} />
      </Canvas>
      {enteredRoom && (
        <Overlay
          catReaction={catReaction}
          onBack={() => setSelectedSection(null)}
          selectedSection={selectedSection}
        />
      )}
      {!enteredRoom && <DoorEntry onEnter={() => setEnteredRoom(true)} />}
    </main>
  )
}
