import { useEffect, useRef, useState } from 'react'
import { useFrame } from '@react-three/fiber'
import { roomDestinations } from '../../data/roomDestinations'
import { roomLayout } from '../../data/roomLayout'
import Interactable from './Interactable'
import { getCatReactionPose } from './catAnimation'
import { Material, palette } from './room/materials'
import RoomShell from './room/RoomShell'
import { Desk, OfficeChair, MediaConsole } from './room/Furniture'

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
      <Desk {...roomLayout.desk} />
      <OfficeChair {...roomLayout.chair} />
      <MediaConsole {...roomLayout.mediaConsole} />
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
