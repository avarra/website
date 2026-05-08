"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useEffect, useRef } from "react";
import * as THREE from "three";

const PARTICLE_COUNT = 1450;

type ParticleData = {
  positions: Float32Array;
  basePositions: Float32Array;
  colors: Float32Array;
};

const PARTICLE_DATA = createParticleData();

export function ParticleFieldScene() {
  return (
    <Canvas
      className="!absolute inset-0 opacity-90"
      camera={{ position: [0, 0, 7], fov: 58 }}
      dpr={[1, 1.5]}
      gl={{ antialias: false, alpha: true, powerPreference: "high-performance" }}
    >
      <ambientLight intensity={0.7} />
      <Particles />
    </Canvas>
  );
}

function Particles() {
  const pointsRef = useRef<THREE.Points>(null);
  const pointer = useRef(new THREE.Vector2(0, 0));
  const { viewport } = useThree();

  useEffect(() => {
    const updatePointer = (event: PointerEvent) => {
      pointer.current.x =
        (event.clientX / window.innerWidth - 0.5) * viewport.width;
      pointer.current.y =
        -(event.clientY / window.innerHeight - 0.5) * viewport.height;
    };

    window.addEventListener("pointermove", updatePointer, { passive: true });
    return () => window.removeEventListener("pointermove", updatePointer);
  }, [viewport.height, viewport.width]);

  useFrame(({ clock }) => {
    const points = pointsRef.current;
    if (!points) return;

    const { positions, basePositions } = PARTICLE_DATA;
    const position = points.geometry.attributes
      .position as THREE.BufferAttribute;
    const elapsed = clock.getElapsedTime();

    for (let index = 0; index < PARTICLE_COUNT; index += 1) {
      const i = index * 3;
      const bx = basePositions[i];
      const by = basePositions[i + 1];
      const dx = bx - pointer.current.x;
      const dy = by - pointer.current.y;
      const distance = Math.max(Math.sqrt(dx * dx + dy * dy), 0.001);
      const force = Math.min(0.55 / (distance * distance), 0.5);
      const wave = Math.sin(elapsed * 0.7 + index * 0.031) * 0.04;

      positions[i] = bx + dx * force + wave;
      positions[i + 1] =
        by + dy * force + Math.cos(elapsed * 0.5 + index * 0.019) * 0.035;
      positions[i + 2] =
        basePositions[i + 2] + Math.sin(elapsed + index * 0.013) * 0.08;
    }

    position.needsUpdate = true;
    points.rotation.z = Math.sin(elapsed * 0.12) * 0.045;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[PARTICLE_DATA.positions, 3]}
        />
        <bufferAttribute
          attach="attributes-color"
          args={[PARTICLE_DATA.colors, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.024}
        vertexColors
        transparent
        opacity={0.78}
        sizeAttenuation
      />
    </points>
  );
}

function createParticleData(): ParticleData {
  const positions = new Float32Array(PARTICLE_COUNT * 3);
  const basePositions = new Float32Array(PARTICLE_COUNT * 3);
  const colors = new Float32Array(PARTICLE_COUNT * 3);
  const palette = [
    new THREE.Color("#171514"),
    new THREE.Color("#6f8d78"),
    new THREE.Color("#b96a53"),
    new THREE.Color("#65737e"),
  ];

  for (let index = 0; index < PARTICLE_COUNT; index += 1) {
    const i = index * 3;
    const radius = 1.2 + seededUnit(index, 3) * 2.8;
    const angle = index * 0.17;
    const drift = (seededUnit(index, 7) - 0.5) * 1.4;
    positions[i] = Math.cos(angle) * radius + drift;
    positions[i + 1] =
      Math.sin(angle) * radius * 0.62 + (seededUnit(index, 11) - 0.5) * 1.3;
    positions[i + 2] = (seededUnit(index, 17) - 0.5) * 2.4;
    basePositions[i] = positions[i];
    basePositions[i + 1] = positions[i + 1];
    basePositions[i + 2] = positions[i + 2];

    const color = palette[index % palette.length];
    colors[i] = color.r;
    colors[i + 1] = color.g;
    colors[i + 2] = color.b;
  }

  return { positions, basePositions, colors };
}

function seededUnit(index: number, salt: number) {
  const x = Math.sin(index * 12.9898 + salt * 78.233) * 43758.5453;
  return x - Math.floor(x);
}
