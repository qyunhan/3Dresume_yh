import { useEffect, useRef, useState } from 'react'
import { useFrame } from '@react-three/fiber'
import { roomDestinations } from '../../data/roomDestinations'
import Interactable from './Interactable'
import { getCatReactionPose } from './catAnimation'

const palette = {
  lavender: '#aaa0bb',
  lavenderShadow: '#8e829f',
  wood: '#9a6548',
  woodDark: '#6f4535',
  cream: '#eee6d5',
  white: '#f7f3ed',
  ink: '#28252d',
  blush: '#d99aa1',
  sage: '#788b78',
  sky: '#afc9cf',
  gold: '#c58d5f',
}

function Material({ color, hovered = false, ...props }) {
  return (
    <meshStandardMaterial
      color={color}
      emissive="#fff0cf"
      emissiveIntensity={hovered ? 0.2 : 0}
      roughness={0.78}
      {...props}
    />
  )
}

function RoomShell() {
  return (
    <group>
      <mesh receiveShadow position={[0, -0.24, 0]}>
        <boxGeometry args={[12, 0.45, 10]} />
        <Material color={palette.wood} />
      </mesh>
      {Array.from({ length: 10 }, (_, index) => (
        <mesh key={index} position={[-5.4 + index * 1.2, 0.002, 0]}>
          <boxGeometry args={[0.025, 0.01, 9.92]} />
          <Material color={palette.woodDark} />
        </mesh>
      ))}
      <mesh receiveShadow position={[0, 3.1, -5.1]}>
        <boxGeometry args={[12.25, 6.65, 0.28]} />
        <Material color={palette.lavender} />
      </mesh>
      <mesh receiveShadow position={[-6.1, 3.1, 0]}>
        <boxGeometry args={[0.28, 6.65, 10.25]} />
        <Material color={palette.lavenderShadow} />
      </mesh>
      <mesh position={[0, 0.18, -4.9]}>
        <boxGeometry args={[12, 0.2, 0.18]} />
        <Material color={palette.white} />
      </mesh>
      <mesh position={[-5.9, 0.18, 0]}>
        <boxGeometry args={[0.18, 0.2, 10]} />
        <Material color={palette.white} />
      </mesh>
    </group>
  )
}

function Desk() {
  return (
    <group position={[-3.25, 0, -3.85]}>
      <mesh castShadow position={[0, 2.12, 0]}>
        <boxGeometry args={[3.7, 0.2, 1.25]} />
        <Material color={palette.white} />
      </mesh>
      {[
        [-1.58, 1.05, -0.46],
        [1.58, 1.05, -0.46],
        [-1.58, 1.05, 0.46],
        [1.58, 1.05, 0.46],
      ].map((position) => (
        <mesh castShadow key={position.join()} position={position}>
          <boxGeometry args={[0.16, 2.1, 0.16]} />
          <Material color={palette.white} />
        </mesh>
      ))}
      <mesh position={[1.2, 1.35, 0]}>
        <boxGeometry args={[0.85, 1.25, 0.9]} />
        <Material color="#e8e1da" />
      </mesh>
      <mesh position={[1.2, 1.51, 0.47]}>
        <boxGeometry args={[0.58, 0.07, 0.03]} />
        <Material color={palette.gold} />
      </mesh>
    </group>
  )
}

function Chair() {
  return (
    <group position={[-3.1, 0, -1.95]} rotation={[0, -0.08, 0]}>
      <mesh castShadow position={[0, 1.22, 0]}>
        <boxGeometry args={[1.3, 0.18, 1.2]} />
        <Material color={palette.cream} />
      </mesh>
      <mesh castShadow position={[0, 2.08, 0.48]} rotation={[-0.08, 0, 0]}>
        <boxGeometry args={[1.3, 1.55, 0.18]} />
        <Material color={palette.cream} />
      </mesh>
      {[
        [-0.5, 0.58, -0.42],
        [0.5, 0.58, -0.42],
        [-0.5, 0.58, 0.42],
        [0.5, 0.58, 0.42],
      ].map((position) => (
        <mesh castShadow key={position.join()} position={position}>
          <boxGeometry args={[0.12, 1.15, 0.12]} />
          <Material color={palette.woodDark} />
        </mesh>
      ))}
    </group>
  )
}

function Laptop({ hovered }) {
  return (
    <group position={[-3.2, 2.3, -3.75]}>
      <mesh castShadow position={[0, 0.05, 0.05]}>
        <boxGeometry args={[1.45, 0.1, 0.92]} />
        <Material color="#d9d5d4" hovered={hovered} />
      </mesh>
      <mesh castShadow position={[0, 0.55, -0.4]} rotation={[-0.08, 0, 0]}>
        <boxGeometry args={[1.45, 0.92, 0.08]} />
        <Material color="#d9d5d4" hovered={hovered} />
      </mesh>
      <mesh position={[0, 0.55, -0.35]} rotation={[-0.08, 0, 0]}>
        <boxGeometry args={[1.25, 0.72, 0.015]} />
        <meshStandardMaterial
          color={hovered ? '#d8b8c9' : '#64566f'}
          emissive="#d8b8c9"
          emissiveIntensity={hovered ? 0.32 : 0.06}
          roughness={0.6}
        />
      </mesh>
    </group>
  )
}

function Tv({ hovered }) {
  return (
    <group position={[3.3, 3.5, -4.82]}>
      <mesh castShadow>
        <boxGeometry args={[2.75, 1.55, 0.18]} />
        <Material color={palette.ink} hovered={hovered} />
      </mesh>
      <mesh position={[0, 0, 0.105]}>
        <boxGeometry args={[2.47, 1.27, 0.025]} />
        <meshStandardMaterial
          color={hovered ? '#c8a6ba' : '#594d63'}
          emissive="#d9b8c9"
          emissiveIntensity={hovered ? 0.3 : 0.045}
          roughness={0.65}
        />
      </mesh>
    </group>
  )
}

function NoticeBoard({ hovered }) {
  return (
    <group position={[0.45, 3.75, -4.79]}>
      <mesh castShadow>
        <boxGeometry args={[2.2, 1.5, 0.16]} />
        <Material color={palette.woodDark} hovered={hovered} />
      </mesh>
      <mesh position={[0, 0, 0.1]}>
        <boxGeometry args={[1.95, 1.25, 0.04]} />
        <Material color="#c69f77" hovered={hovered} />
      </mesh>
      {[
        [-0.53, 0.28, '#f4eddf'],
        [0.35, 0.34, '#d9b2b7'],
        [-0.18, -0.32, '#e6dbc4'],
        [0.62, -0.25, '#b9c8bd'],
      ].map(([x, y, color], index) => (
        <mesh
          key={`${x}-${y}`}
          position={[x, y, 0.135 + index * 0.001]}
          rotation={[0, 0, (index - 1.5) * 0.035]}
        >
          <boxGeometry args={[0.58, 0.43, 0.012]} />
          <Material color={color} hovered={hovered} />
        </mesh>
      ))}
    </group>
  )
}

function Reports({ hovered }) {
  const books = [
    { color: '#805f79', position: [-0.35, 0, 0], rotation: 0.02 },
    { color: '#b87f79', position: [0, 0.08, 0], rotation: -0.04 },
    { color: '#7e927c', position: [0.35, 0.03, 0], rotation: 0.06 },
  ]

  return (
    <group position={[2.1, 1.72, -3.88]}>
      {books.map((book, index) => (
        <group
          key={book.color}
          position={book.position}
          rotation={[0, 0, book.rotation]}
        >
          <mesh castShadow>
            <boxGeometry args={[0.3, 0.95 + index * 0.08, 0.72]} />
            <Material color={book.color} hovered={hovered} />
          </mesh>
          <mesh position={[0, 0, 0.37]}>
            <boxGeometry args={[0.18, 0.06, 0.02]} />
            <Material color={palette.cream} hovered={hovered} />
          </mesh>
        </group>
      ))}
    </group>
  )
}

function Window() {
  return (
    <group position={[-5.91, 3.75, 0.55]} rotation={[0, Math.PI / 2, 0]}>
      <mesh>
        <boxGeometry args={[3.1, 2.5, 0.13]} />
        <Material color={palette.white} />
      </mesh>
      <mesh position={[0, 0, 0.08]}>
        <boxGeometry args={[2.72, 2.12, 0.04]} />
        <meshStandardMaterial color={palette.sky} roughness={0.35} />
      </mesh>
      <mesh position={[0, 0, 0.12]}>
        <boxGeometry args={[0.1, 2.18, 0.07]} />
        <Material color={palette.white} />
      </mesh>
      <mesh position={[0, 0, 0.12]}>
        <boxGeometry args={[2.78, 0.1, 0.07]} />
        <Material color={palette.white} />
      </mesh>
      <mesh position={[0, -1.34, 0.1]}>
        <boxGeometry args={[3.35, 0.16, 0.35]} />
        <Material color={palette.white} />
      </mesh>
    </group>
  )
}

function FloatingShelves() {
  return (
    <group>
      <mesh castShadow position={[-4.7, 4.9, -1.5]}>
        <boxGeometry args={[0.72, 0.14, 2.3]} />
        <Material color={palette.white} />
      </mesh>
      <mesh castShadow position={[-4.7, 3.7, -1.05]}>
        <boxGeometry args={[0.72, 0.14, 1.7]} />
        <Material color={palette.white} />
      </mesh>
    </group>
  )
}

function Rug() {
  return (
    <mesh receiveShadow position={[0.35, 0.035, 0.25]}>
      <boxGeometry args={[5.4, 0.07, 4.25]} />
      <Material color={palette.cream} />
    </mesh>
  )
}

function MediaConsole() {
  return (
    <group position={[3.2, 0, -4.08]}>
      <mesh castShadow position={[0, 1.25, 0]}>
        <boxGeometry args={[3.75, 0.18, 1.05]} />
        <Material color={palette.white} />
      </mesh>
      <mesh castShadow position={[-1.55, 0.65, 0]}>
        <boxGeometry args={[0.14, 1.2, 0.8]} />
        <Material color={palette.white} />
      </mesh>
      <mesh castShadow position={[1.55, 0.65, 0]}>
        <boxGeometry args={[0.14, 1.2, 0.8]} />
        <Material color={palette.white} />
      </mesh>
    </group>
  )
}

function Decor() {
  return (
    <group>
      <group position={[-4.7, 5.22, -1.8]}>
        <mesh castShadow>
          <cylinderGeometry args={[0.26, 0.3, 0.5, 8]} />
          <Material color={palette.blush} />
        </mesh>
        {[-0.18, 0, 0.18].map((x, index) => (
          <mesh
            key={x}
            position={[x, 0.52 + index * 0.05, 0]}
            rotation={[0, 0, (index - 1) * 0.45]}
          >
            <boxGeometry args={[0.16, 0.7, 0.08]} />
            <Material color={palette.sage} />
          </mesh>
        ))}
      </group>
      <group position={[-4.7, 3.98, -1.05]}>
        <mesh castShadow>
          <cylinderGeometry args={[0.18, 0.24, 0.62, 8]} />
          <Material color="#b87f79" />
        </mesh>
        <mesh position={[0, 0.38, 0]}>
          <cylinderGeometry args={[0.12, 0.16, 0.22, 8]} />
          <Material color={palette.cream} />
        </mesh>
      </group>
      <group position={[-1.85, 2.3, -3.85]}>
        <mesh>
          <cylinderGeometry args={[0.25, 0.3, 0.08, 12]} />
          <Material color={palette.gold} />
        </mesh>
        <mesh position={[0, 0.38, 0]}>
          <cylinderGeometry args={[0.04, 0.04, 0.75, 8]} />
          <Material color={palette.gold} />
        </mesh>
        <mesh position={[0, 0.79, 0]} rotation={[0.25, 0, 0]}>
          <cylinderGeometry args={[0.22, 0.38, 0.45, 10]} />
          <Material color={palette.blush} />
        </mesh>
      </group>
      <mesh castShadow position={[3.98, 1.5, -3.94]}>
        <boxGeometry args={[0.7, 0.34, 0.66]} />
        <Material color="#d7c8b9" />
      </mesh>
      <mesh castShadow position={[4.7, 1.44, -3.94]}>
        <boxGeometry args={[0.52, 0.24, 0.66]} />
        <Material color="#a6b39f" />
      </mesh>
    </group>
  )
}

function Cat({ reaction }) {
  const cat = useRef()
  const reactionStart = useRef(-10)
  const reactionPending = useRef(false)
  const [reduceMotion, setReduceMotion] = useState(false)

  useEffect(() => {
    setReduceMotion(
      window.matchMedia('(prefers-reduced-motion: reduce)').matches,
    )
  }, [])

  useEffect(() => {
    if (reaction > 0) reactionPending.current = true
  }, [reaction])

  useFrame(({ clock }) => {
    if (!cat.current) return
    if (reactionPending.current) {
      reactionStart.current = clock.elapsedTime
      reactionPending.current = false
    }
    const pose = getCatReactionPose(
      clock.elapsedTime,
      reactionStart.current,
      reduceMotion,
    )
    cat.current.position.y = pose.y
    cat.current.rotation.z = pose.rotationZ
  })

  return (
    <group ref={cat} position={[2.15, 0, 1.28]} rotation={[0, -0.45, 0]}>
      <mesh castShadow position={[0, 0.62, 0]}>
        <boxGeometry args={[0.72, 0.78, 1.05]} />
        <Material color="#bb8775" />
      </mesh>
      <mesh castShadow position={[0, 1.18, 0.38]}>
        <boxGeometry args={[0.68, 0.62, 0.65]} />
        <Material color="#c8917c" />
      </mesh>
      {[-0.23, 0.23].map((x) => (
        <mesh
          castShadow
          key={x}
          position={[x, 1.55, 0.38]}
          rotation={[0, 0, x * -1.2]}
        >
          <boxGeometry args={[0.22, 0.34, 0.18]} />
          <Material color="#9e6c62" />
        </mesh>
      ))}
      {[-0.23, 0.23].map((x) => (
        <mesh key={x} position={[x, 1.25, 0.715]}>
          <boxGeometry args={[0.07, 0.07, 0.03]} />
          <Material color={palette.ink} />
        </mesh>
      ))}
      <mesh position={[0, 1.1, 0.72]}>
        <boxGeometry args={[0.09, 0.06, 0.03]} />
        <Material color={palette.blush} />
      </mesh>
      {[-0.24, 0.24].map((x) => (
        <mesh castShadow key={x} position={[x, 0.23, 0.22]}>
          <cylinderGeometry args={[0.1, 0.12, 0.46, 8]} />
          <Material color="#a9776b" />
        </mesh>
      ))}
      <mesh
        castShadow
        position={[0.48, 0.67, -0.42]}
        rotation={[0, 0.1, -0.85]}
      >
        <cylinderGeometry args={[0.08, 0.1, 1, 8]} />
        <Material color="#9e6c62" />
      </mesh>
    </group>
  )
}

export default function Room({ onSelect, onCatClick, catReaction }) {
  return (
    <group>
      <RoomShell />
      <Rug />
      <Desk />
      <Chair />
      <MediaConsole />
      <Window />
      <FloatingShelves />
      <Decor />

      <Interactable
        label={roomDestinations.laptop.label}
        onClick={() => onSelect(roomDestinations.laptop.sectionId)}
      >
        {(hovered) => <Laptop hovered={hovered} />}
      </Interactable>
      <Interactable
        label={roomDestinations.tv.label}
        onClick={() => onSelect(roomDestinations.tv.sectionId)}
      >
        {(hovered) => <Tv hovered={hovered} />}
      </Interactable>
      <Interactable
        label={roomDestinations.noticeBoard.label}
        onClick={() => onSelect(roomDestinations.noticeBoard.sectionId)}
      >
        {(hovered) => <NoticeBoard hovered={hovered} />}
      </Interactable>
      <Interactable
        label={roomDestinations.reports.label}
        onClick={() => onSelect(roomDestinations.reports.sectionId)}
      >
        {(hovered) => <Reports hovered={hovered} />}
      </Interactable>
      <Interactable label="A very helpful cat" onClick={onCatClick}>
        {(hovered) => (
          <group scale={hovered ? 1.04 : 1}>
            <Cat reaction={catReaction} />
          </group>
        )}
      </Interactable>
    </group>
  )
}
