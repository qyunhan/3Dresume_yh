import { useEffect, useState } from 'react'
import { roomAsset } from '../../data/roomAssets'

export default function DoorEntry({ onEnter }) {
  const [opening, setOpening] = useState(false)
  const [reduceMotion, setReduceMotion] = useState(false)

  useEffect(() => {
    const media = window.matchMedia?.('(prefers-reduced-motion: reduce)')
    if (!media) return undefined
    const update = () => setReduceMotion(media.matches)
    update()
    media.addEventListener?.('change', update)
    return () => media.removeEventListener?.('change', update)
  }, [])

  const enterRoom = () => {
    if (opening) return
    setOpening(true)
    window.setTimeout(onEnter, reduceMotion ? 180 : 820)
  }

  return (
    <section
      aria-label="Welcome to Yunhan's 3D Resume"
      className={`door-entry${opening ? ' is-opening' : ''}${reduceMotion ? ' reduce-motion' : ''}`}
      data-testid="door-entry"
    >
      <div className="entry-copy">
        <p className="eyebrow">COME ON IN</p>
        <h1>Welcome to Yunhan&apos;s<br />little corner :D</h1>
        <p className="entry-description">A 3D room filled with things I&apos;ve built, questions I&apos;ve chased, and places I&apos;ve learned from.</p>
        <p className="entry-invitation">Click around!</p>
        <button className="knock-button" onClick={enterRoom} type="button">
          <span aria-hidden="true">☝</span> Knock on the door
        </button>
        <span className="entry-secondary">Enter the room</span>
      </div>

      <div aria-hidden="true" className="entry-door-scene">
        <img alt="" className="entry-plant" src={roomAsset('welcome-plant.png')} />
        <div className="door-frame">
          <div className="door-light" />
          <img alt="" className="entry-door" src={roomAsset('welcome-door.png')} />
          <span className="door-threshold" />
        </div>
      </div>
    </section>
  )
}
