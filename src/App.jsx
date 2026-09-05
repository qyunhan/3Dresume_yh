import { Canvas } from '@react-three/fiber'

export default function App() {
  return (
    <main className="app-shell">
      <Canvas data-testid="canvas" />
      <h1>A room full of ideas</h1>
    </main>
  )
}
