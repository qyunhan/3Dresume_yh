import { useState } from 'react'
import { Canvas } from '@react-three/fiber'
import CameraController from './components/scene/CameraController'
import Lighting from './components/scene/Lighting'
import Room from './components/scene/Room'
import Overlay from './components/ui/Overlay'

export default function App() {
  const [selectedSection, setSelectedSection] = useState(null)
  const [catReaction, setCatReaction] = useState(0)

  return (
    <main className="app-shell">
      <Canvas
        camera={{ fov: 43, near: 0.1, far: 80, position: [10.5, 8.2, 12.5] }}
        data-testid="canvas"
        dpr={[1, 1.5]}
        gl={{ alpha: false, antialias: true }}
        shadows
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
      <Overlay
        catReaction={catReaction}
        onBack={() => setSelectedSection(null)}
        onSelect={setSelectedSection}
        selectedSection={selectedSection}
      />
    </main>
  )
}
