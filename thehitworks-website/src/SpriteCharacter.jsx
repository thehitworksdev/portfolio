import { useRef, useEffect, useMemo, useState } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

const textureCache = new Map()
function loadTexture(url) {
  if (textureCache.has(url)) return textureCache.get(url)
  const tex = new THREE.TextureLoader().load(url)
  tex.magFilter = THREE.NearestFilter
  tex.minFilter = THREE.NearestFilter
  tex.generateMipmaps = false 
  tex.wrapS = THREE.ClampToEdgeWrapping
  tex.wrapT = THREE.ClampToEdgeWrapping
  textureCache.set(url, tex)
  return tex
}

// Assets in /public are served as plain URLs, not JS-importable modules —
// so the manifest is fetched at runtime instead of statically imported.
let manifestPromise = null
function getManifest() {
  if (!manifestPromise) {
    manifestPromise = fetch('/sprites/manifest.json')
      .then((r) => r.json())
      .then((data) => {
        Object.values(data).forEach((a) => loadTexture(a.file)) // preload all textures once
        return data
      })
  }
  return manifestPromise
}

/** Returns the manifest once loaded, or null while it's still fetching. */
export function useSpriteManifest() {
  const [manifest, setManifest] = useState(null)
  useEffect(() => {
    let alive = true
    getManifest().then((data) => {
      if (alive) setManifest(data)
    })
    return () => {
      alive = false
    }
  }, [])
  return manifest
}

const WORLD_HEIGHT = 2

export default function SpriteCharacter({
  state = 'idle_standing',
  position = [0, 0, 0],
  scale = 1,
  facing = 1,
  onComplete,
}) {
  const manifest = useSpriteManifest()
  const meshRef = useRef()
  const frameRef = useRef(0)
  const clockRef = useRef(0)
  const finishedRef = useRef(false)

  const anim = manifest ? manifest[state] || manifest.idle_standing : null
  const texture = useMemo(() => (anim ? loadTexture(anim.file) : null), [anim?.file])

  useEffect(() => {
    if (!anim || !texture) return
    frameRef.current = 0
    clockRef.current = 0
    finishedRef.current = false
    texture.repeat.set(1 / anim.frameCount, 1)
    texture.offset.set(0, 0)
  }, [state, texture, anim])

  useFrame((_, delta) => {
    if (!anim || !texture || finishedRef.current) return
    clockRef.current += delta
    const frameDuration = 1 / anim.fps

    if (clockRef.current >= frameDuration) {
      clockRef.current = 0
      let next = frameRef.current + 1

      if (next >= anim.frameCount) {
        if (anim.loop) {
          next = 0
        } else {
          next = anim.frameCount - 1
          finishedRef.current = true
          onComplete && onComplete(state)
        }
      }
      frameRef.current = next
      texture.offset.x = next / anim.frameCount
    }
  })

  if (!anim || !texture) return null // manifest still loading

  const aspect = anim.frameWidth / anim.frameHeight
  const planeW = WORLD_HEIGHT * aspect * scale
  const planeH = WORLD_HEIGHT * scale

  return (
    <group position={position} scale={[facing, 1, 1]}>
      <mesh ref={meshRef}>
        <planeGeometry args={[planeW, planeH]} />
        <meshBasicMaterial map={texture} transparent alphaTest={0.1} side={THREE.DoubleSide} />
      </mesh>
    </group>
  )
}