import { useRef, useEffect, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

import manifest from "../sprites/manifest.json";

const textureCache = new Map<string, THREE.Texture>();

function loadTexture(url: string): THREE.Texture {
  if (textureCache.has(url)) {
    return textureCache.get(url)!;
  }

  const loader = new THREE.TextureLoader();

  const texture = loader.load(
    url,
    () => {
      console.log("Sprite loaded:", url);
    },
    undefined,
    (error) => {
      console.error("Failed to load sprite:", url, error);
    }
  );

  texture.magFilter = THREE.NearestFilter;
  texture.minFilter = THREE.NearestFilter;
  texture.generateMipmaps = false;

  texture.wrapS = THREE.ClampToEdgeWrapping;
  texture.wrapT = THREE.ClampToEdgeWrapping;

  texture.colorSpace = THREE.SRGBColorSpace;

  textureCache.set(url, texture);

  return texture;
}

// Preload all sprite textures
Object.values(manifest).forEach((asset) => {
  loadTexture(asset.file);
});

const WORLD_HEIGHT = 2;

type SpriteCharacterProps = {
  state?: keyof typeof manifest;
  position?: [number, number, number];
  scale?: number;
  facing?: number;
  onComplete?: (state: string) => void;
};

export default function SpriteCharacter({
  state = "idle_standing",
  position = [0, 0, 0],
  scale = 1,
  facing = 1,
  onComplete,
}: SpriteCharacterProps) {
  const meshRef = useRef<THREE.Mesh>(null);

  const frameRef = useRef(0);
  const clockRef = useRef(0);
  const finishedRef = useRef(false);

  const anim =
    manifest[state] ||
    manifest["idle_standing"];

  const texture = useMemo(() => {
    return loadTexture(anim.file);
  }, [anim.file]);

  useEffect(() => {
    frameRef.current = 0;
    clockRef.current = 0;
    finishedRef.current = false;

    texture.repeat.set(
      1 / anim.frameCount,
      1
    );

    texture.offset.set(0, 0);

    texture.needsUpdate = true;
  }, [
    state,
    texture,
    anim.frameCount,
  ]);

  const aspect =
    anim.frameWidth /
    anim.frameHeight;

  const planeWidth =
    WORLD_HEIGHT *
    aspect *
    scale;

  const planeHeight =
    WORLD_HEIGHT *
    scale;

  useFrame((_, delta) => {
    if (finishedRef.current) {
      return;
    }

    clockRef.current += delta;

    const frameDuration =
      1 / anim.fps;

    if (clockRef.current >= frameDuration) {
      clockRef.current -= frameDuration;

      let nextFrame =
        frameRef.current + 1;

      if (
        nextFrame >=
        anim.frameCount
      ) {
        if (anim.loop) {
          nextFrame = 0;
        } else {
          nextFrame =
            anim.frameCount - 1;

          finishedRef.current = true;

          if (onComplete) {
            onComplete(state);
          }
        }
      }

      frameRef.current = nextFrame;

      texture.offset.x =
        nextFrame /
        anim.frameCount;

      texture.needsUpdate = true;
    }
  });

  return (
    <group
      position={position}
      scale={[facing, 1, 1]}
      raycast={() => null}
    >
      <mesh
        ref={meshRef}
        position={[0, 0, 0]}

        // IMPORTANT:
        // The character will NOT capture
        // mouse/touch/raycast events.
        raycast={() => null}
      >
        <planeGeometry
          args={[
            planeWidth,
            planeHeight,
          ]}
        />

        <meshBasicMaterial
          map={texture}
          transparent={true}
          alphaTest={0.01}
          side={THREE.DoubleSide}
          depthWrite={false}
          toneMapped={false}
        />
      </mesh>
    </group>
  );
}

export { manifest as spriteManifest };