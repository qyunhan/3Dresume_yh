import { useEffect, useState } from 'react'

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
        <p className="eyebrow">Welcome in</p>
        <h1>Welcome to Yunhan&apos;s<br />3D Resume :D</h1>
        <p>A small space for data, products, and the work behind them.</p>
        <button className="knock-button" onClick={enterRoom} type="button">
          <span aria-hidden="true">☝</span> Knock on the door
        </button>
        <span className="entry-secondary">Enter the room</span>
      </div>

      <div aria-hidden="true" className="entry-door-scene">
        <div className="entry-plant">
          <span className="plant-stem" />
          {[1, 2, 3, 4, 5, 6].map((leaf) => <span className={`plant-leaf leaf-${leaf}`} key={leaf} />)}
          <span className="plant-pot" />
        </div>
        <div className="door-frame">
          <div className="door-light" />
          <div className="entry-door">
            <span className="door-panel panel-one" />
            <span className="door-panel panel-two" />
            <span className="door-panel panel-three" />
            <span className="door-panel panel-four" />
            <span className="door-handle" />
          </div>
          <span className="door-threshold" />
        </div>
      </div>
    </section>
  )
}
