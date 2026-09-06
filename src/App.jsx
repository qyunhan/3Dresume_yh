import { useState } from 'react'
import { Canvas } from '@react-three/fiber'
import CameraController from './components/scene/CameraController'
import Lighting from './components/scene/Lighting'
import Room from './components/scene/Room'
import Overlay from './components/ui/Overlay'
import DoorEntry from './components/ui/DoorEntry'
import { getPortfolioItem } from './data/portfolio'
import { hasCameraPreset } from './data/cameraPresets'
import { phase2Layout } from './data/phase2Layout'

export default function App() {
  const [selection, setSelection] = useState({ activeZone: null, selectedItem: null })
  const [catReaction, setCatReaction] = useState(0)
  const [enteredRoom, setEnteredRoom] = useState(false)
  const selectZone = (activeZone) => setSelection({ activeZone, selectedItem: null })
  const selectItem = ({ zoneId, itemId }) => setSelection({ activeZone: zoneId, selectedItem: itemId })
  const clearSelection = () => setSelection({ activeZone: null, selectedItem: null })
  const itemPreset = getPortfolioItem(selection.activeZone, selection.selectedItem)?.cameraPreset
  const cameraPreset = hasCameraPreset(itemPreset)
    ? itemPreset
    : phase2Layout.zoneLabels[selection.activeZone]?.cameraPreset ?? null

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
          onSelectZone={selectZone}
          onSelectItem={selectItem}
        />
        <CameraController selectedSection={cameraPreset} />
      </Canvas>
      {enteredRoom && (
        <Overlay
          onBack={clearSelection}
          activeZone={selection.activeZone}
          selectedItem={selection.selectedItem}
          onSelectItem={selectItem}
        />
      )}
      {!enteredRoom && <DoorEntry onEnter={() => setEnteredRoom(true)} />}
    </main>
  )
}
