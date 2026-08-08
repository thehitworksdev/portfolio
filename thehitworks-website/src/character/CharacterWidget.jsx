import { Canvas } from "@react-three/fiber";
import SpriteCharacter from "./SpriteCharacter";
import { useCharacterBehavior } from "./useCharacterBehavior";

export default function CharacterWidget() {
  const {
    state,
    line,
    facing,
    x,
    handleClick,
  } = useCharacterBehavior();

  return (
    <div
      onClick={handleClick}
      style={{
        position: "fixed",

        // X is controlled by page scroll progress
        left: `${x}%`,

        // Always fixed at bottom
        bottom: 0,

        width: 180,
        height: 220,

        zIndex: 9999,

        cursor: "pointer",
        pointerEvents: "auto",

        // Center character around X position
        transform: "translateX(-50%)",
      }}
    >
      {line && (
        <div
          style={{
            position: "absolute",
            top: 4,
            left: "50%",
            transform:
              "translateX(-50%)",

            background: "#fff",
            color: "#111",

            fontSize: 12,
            fontWeight: 600,

            padding: "6px 10px",
            borderRadius: 10,

            whiteSpace: "nowrap",

            boxShadow:
              "0 2px 8px rgba(0,0,0,0.25)",

            pointerEvents: "none",

            zIndex: 2,
          }}
        >
          {line}

          <div
            style={{
              position: "absolute",
              bottom: -6,
              left: "50%",
              transform:
                "translateX(-50%)",

              width: 0,
              height: 0,

              borderLeft:
                "6px solid transparent",

              borderRight:
                "6px solid transparent",

              borderTop:
                "6px solid #fff",
            }}
          />
        </div>
      )}

      <Canvas
        orthographic
        camera={{
          position: [0, 1, 5],
          zoom: 90,
        }}
        gl={{
          alpha: true,
        }}
        style={{
          background:
            "transparent",
        }}
      >
        <SpriteCharacter
          state={state}
          facing={facing}
          position={[
            0,
            -0.85,
            0,
          ]}
          scale={1}
        />
      </Canvas>
    </div>
  );
}