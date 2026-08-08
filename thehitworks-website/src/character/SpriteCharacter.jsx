import { useRef, useEffect, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import manifest from '../../public/sprites/manifest.json'

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

Object.values(manifest).forEach((a) => loadTexture(a.file))

const WORLD_HEIGHT = 2

export default function SpriteCharacter({
  state = 'idle_standing',
  position = [0, 0, 0],
  scale = 1,
  facing = 1,
  onComplete,
}) {
  const meshRef = useRef()
  const frameRef = useRef(0)
  const clockRef = useRef(0)
  const finishedRef = useRef(false)

  const anim = manifest[state] || manifest.idle_standing
  const texture = useMemo(() => loadTexture(anim.file), [anim.file])

  useEffect(() => {
    frameRef.current = 0
    clockRef.current = 0
    finishedRef.current = false
    texture.repeat.set(1 / anim.frameCount, 1)
    texture.offset.set(0, 0)
  }, [state, texture, anim.frameCount])

  const aspect = anim.frameWidth / anim.frameHeight
  const planeW = WORLD_HEIGHT * aspect * scale
  const planeH = WORLD_HEIGHT * scale

  useFrame((_, delta) => {
    if (finishedRef.current) return
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

  return (
    <group position={position} scale={[facing, 1, 1]}>
      <mesh ref={meshRef}>
        <planeGeometry args={[planeW, planeH]} />
        <meshBasicMaterial map={texture} transparent alphaTest={0.1} side={THREE.DoubleSide} />
      </mesh>
    </group>
  )
}

export { manifest as spriteManifest }
