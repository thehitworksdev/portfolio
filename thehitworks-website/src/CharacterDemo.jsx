import { useState, useRef, useCallback } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { OrbitControls, Grid } from '@react-three/drei'
import * as THREE from 'three'
import SpriteCharacter, { spriteManifest } from './SpriteCharacter'

const STATES = Object.keys(spriteManifest)

/**
 * Handles click-to-walk: click anywhere on the ground plane and the
 * character walks there, then returns to idle automatically.
 */
function InteractiveCharacter() {
  const [state, setState] = useState('idle_standing')
  const [pos, setPos] = useState([0, 0, 0])
  const [facing, setFacing] = useState(1)
  const target = useRef(null) // THREE.Vector3 or null
  const groupPos = useRef(new THREE.Vector3(0, 0, 0))
  const speed = 1.6 // world units / second

  useFrame((_, delta) => {
    if (!target.current) return
    const current = groupPos.current
    const dir = new THREE.Vector3().subVectors(target.current, current)
    const dist = dir.length()

    if (dist < 0.05) {
      target.current = null
      setState('idle_standing')
      return
    }
    dir.normalize()
    current.addScaledVector(dir, Math.min(speed * delta, dist))
    setFacing(dir.x >= 0 ? 1 : -1)
    setPos([current.x, current.y, current.z])
  })

  const handleGroundClick = useCallback((e) => {
    e.stopPropagation()
    const p = e.point
    target.current = new THREE.Vector3(p.x, 0, p.z)
    setState('walk')
  }, [])

  // temporary reactions that auto-return to idle/walk when finished
  const handleComplete = useCallback((finishedState) => {
    if (['greet_wave', 'surprised', 'offer_candy', 'tired'].includes(finishedState)) {
      setState(target.current ? 'walk' : 'idle_standing')
    }
  }, [])

  return (
    <>
      {/* invisible ground plane just to capture click position */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} onClick={handleGroundClick} visible={false}>
        <planeGeometry args={[40, 40]} />
        <meshBasicMaterial />
      </mesh>

      <SpriteCharacter
        state={state}
        position={pos}
        facing={facing}
        scale={1}
        onComplete={handleComplete}
        // click the character itself to make it wave
      />
      {/* invisible larger hit-box over the character for easy clicking */}
      <mesh
        position={[pos[0], pos[1] + 1, pos[2]]}
        onClick={(e) => {
          e.stopPropagation()
          if (!target.current) setState('greet_wave')
        }}
        visible={false}
      >
        <planeGeometry args={[1, 2]} />
        <meshBasicMaterial />
      </mesh>
    </>
  )
}

function StatePicker({ onPick }) {
  return (
    <div
      style={{
        position: 'absolute',
        top: 12,
        left: 12,
        display: 'flex',
        flexWrap: 'wrap',
        gap: 6,
        maxWidth: 320,
        zIndex: 10,
      }}
    >
      {STATES.map((s) => (
        <button
          key={s}
          onClick={() => onPick(s)}
          style={{
            fontSize: 11,
            padding: '4px 8px',
            borderRadius: 6,
            border: '1px solid #444',
            background: '#1e1e2a',
            color: '#eee',
            cursor: 'pointer',
          }}
        >
          {s}
        </button>
      ))}
    </div>
  )
}

export default function CharacterDemo() {
  const [manualState, setManualState] = useState(null)

  return (
    <div style={{ position: 'relative', width: '100%', height: '100vh', background: '#0b0b14' }}>
      <StatePicker onPick={setManualState} />
      <Canvas orthographic camera={{ position: [0, 3, 8], zoom: 90 }}>
        <color attach="background" args={['#12121c']} />
        <Grid infiniteGrid fadeDistance={20} cellColor="#333" sectionColor="#555" />
        {manualState ? (
          <SpriteCharacter state={manualState} position={[0, 0, 0]} />
        ) : (
          <InteractiveCharacter />
        )}
        <OrbitControls enableRotate={false} minZoom={40} maxZoom={200} />
      </Canvas>
      <p
        style={{
          position: 'absolute',
          bottom: 12,
          left: 12,
          color: '#999',
          fontSize: 12,
          maxWidth: 400,
        }}
      >
        Click the ground to walk there. Click the character to wave. Or pick any
        of the 17 states above to preview it directly.
      </p>
    </div>
  )
}
