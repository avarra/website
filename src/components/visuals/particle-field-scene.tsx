"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useEffect, useRef } from "react";
import * as THREE from "three";

const PARTICLE_COUNT = 9000;
const SCENE_COUNT = 5;
const SIGNAL_COUNT = 10;
const SIGNAL_POINTS = 96;

type ParticleData = {
  positions: Float32Array;
  targetPositions: Float32Array[];
  colors: Float32Array;
  seeds: Float32Array;
};

type SignalData = {
  positions: Float32Array;
  basePositions: Float32Array;
  colors: Float32Array;
};

const PARTICLE_DATA = createParticleData();
const SIGNAL_DATA = createSignalData();

configureThreeConsoleWarnings();

export function ParticleFieldScene() {
  return (
    <Canvas
      className="!absolute inset-0 opacity-100"
      camera={{ position: [0, 0.2, 8.2], fov: 50 }}
      dpr={[1, 1.5]}
      gl={{
        antialias: false,
        alpha: true,
        powerPreference: "high-performance",
      }}
    >
      <TopographicParticles />
      <SignalStreaks />
    </Canvas>
  );
}

function TopographicParticles() {
  const fieldRef = useRef<THREE.Group>(null);
  const pointsRef = useRef<THREE.Points>(null);
  const pointer = useRef(new THREE.Vector2(20, 20));
  const scroll = useRef(0);
  const smoothScroll = useRef(0);
  const elapsed = useRef(0);
  const { viewport } = useThree();

  useEffect(() => {
    const updatePointer = (event: PointerEvent) => {
      pointer.current.x =
        (event.clientX / window.innerWidth - 0.5) * viewport.width;
      pointer.current.y =
        -(event.clientY / window.innerHeight - 0.5) * viewport.height;
    };

    const updateScroll = () => {
      const maxScroll = Math.max(
        document.documentElement.scrollHeight - window.innerHeight,
        1,
      );
      scroll.current = window.scrollY / maxScroll;
    };

    window.addEventListener("pointermove", updatePointer, { passive: true });
    window.addEventListener("scroll", updateScroll, { passive: true });
    updateScroll();

    return () => {
      window.removeEventListener("pointermove", updatePointer);
      window.removeEventListener("scroll", updateScroll);
    };
  }, [viewport.height, viewport.width]);

  useFrame((_, delta) => {
    const points = pointsRef.current;
    const field = fieldRef.current;
    if (!points) return;

    elapsed.current += delta;

    smoothScroll.current = THREE.MathUtils.damp(
      smoothScroll.current,
      scroll.current,
      5,
      delta,
    );

    const sceneProgress = smoothScroll.current * (SCENE_COUNT - 1);
    const sceneIndex = Math.min(Math.floor(sceneProgress), SCENE_COUNT - 2);
    const sceneMix = smootherStep(sceneProgress - sceneIndex);
    const currentTarget = PARTICLE_DATA.targetPositions[sceneIndex];
    const nextTarget = PARTICLE_DATA.targetPositions[sceneIndex + 1];
    const positions = PARTICLE_DATA.positions;
    const position = points.geometry.attributes
      .position as THREE.BufferAttribute;
    const time = elapsed.current;

    for (let index = 0; index < PARTICLE_COUNT; index += 1) {
      const i = index * 3;
      const seed = PARTICLE_DATA.seeds[index];
      const tx = THREE.MathUtils.lerp(currentTarget[i], nextTarget[i], sceneMix);
      const ty = THREE.MathUtils.lerp(
        currentTarget[i + 1],
        nextTarget[i + 1],
        sceneMix,
      );
      const tz = THREE.MathUtils.lerp(
        currentTarget[i + 2],
        nextTarget[i + 2],
        sceneMix,
      );
      const dx = tx - pointer.current.x;
      const dy = ty - pointer.current.y;
      const distance = Math.sqrt(dx * dx + dy * dy);
      const ripple =
        distance < 3.4
          ? Math.sin(distance * 6.4 - time * 5.2) *
            Math.pow(1 - distance / 3.4, 2)
          : 0;
      const currentX = positions[i];
      const currentY = positions[i + 1];
      const currentZ = positions[i + 2];
      const orbit =
        Math.sin(time * (0.2 + seed * 0.16) + seed * 12.4) * 0.055;
      const targetX = tx + orbit + ripple * dx * 0.16;
      const targetY =
        ty +
        Math.cos(time * 0.24 + seed * 10.2) * 0.045 +
        ripple * 0.42;
      const targetZ =
        tz +
        Math.sin(time * 0.18 + tx * 0.38 + seed * 9.1) * 0.12 +
        ripple * 0.2;

      positions[i] = THREE.MathUtils.lerp(currentX, targetX, 0.14);
      positions[i + 1] = THREE.MathUtils.lerp(currentY, targetY, 0.14);
      positions[i + 2] = THREE.MathUtils.lerp(currentZ, targetZ, 0.14);
    }

    position.needsUpdate = true;
    points.rotation.x = THREE.MathUtils.lerp(
      -0.3,
      0.38,
      smoothScroll.current,
    );
    points.rotation.y =
      Math.sin(time * 0.12) * 0.08 +
      THREE.MathUtils.lerp(-0.2, 0.24, smoothScroll.current);
    points.rotation.z =
      Math.sin(time * 0.08) * 0.05 +
      THREE.MathUtils.lerp(-0.08, 0.12, smoothScroll.current);
    if (field) {
      field.position.x = Math.sin(smoothScroll.current * Math.PI * 2) * -0.75;
      field.position.y = THREE.MathUtils.lerp(
        -0.35,
        0.36,
        smoothScroll.current,
      );
      field.position.z = THREE.MathUtils.lerp(0, 0.8, smoothScroll.current);
      field.scale.setScalar(
        THREE.MathUtils.lerp(1.12, 1.18, smoothScroll.current),
      );
    }
  });

  return (
    <group ref={fieldRef}>
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
          size={0.032}
          vertexColors
          transparent
          opacity={0.96}
          sizeAttenuation
          depthWrite={false}
        />
      </points>
    </group>
  );
}

function SignalStreaks() {
  const linesRef = useRef<THREE.LineSegments>(null);
  const scroll = useRef(0);
  const smoothScroll = useRef(0);
  const elapsed = useRef(0);

  useEffect(() => {
    const updateScroll = () => {
      const maxScroll = Math.max(
        document.documentElement.scrollHeight - window.innerHeight,
        1,
      );
      scroll.current = window.scrollY / maxScroll;
    };

    window.addEventListener("scroll", updateScroll, { passive: true });
    updateScroll();
    return () => window.removeEventListener("scroll", updateScroll);
  }, []);

  useFrame((_, delta) => {
    const lines = linesRef.current;
    if (!lines) return;

    elapsed.current += delta;

    smoothScroll.current = THREE.MathUtils.damp(
      smoothScroll.current,
      scroll.current,
      5,
      delta,
    );

    const positions = lines.geometry.attributes
      .position as THREE.BufferAttribute;
    const time = elapsed.current;

    for (let index = 0; index < SIGNAL_DATA.positions.length; index += 3) {
      const lineIndex = Math.floor(index / (SIGNAL_POINTS * 6));
      const wave =
        Math.sin(time * 1.5 + index * 0.031 + smoothScroll.current * 9) *
        0.08;
      SIGNAL_DATA.positions[index] =
        SIGNAL_DATA.basePositions[index] +
        Math.sin(smoothScroll.current * Math.PI * 2 + lineIndex) * 0.55;
      SIGNAL_DATA.positions[index + 1] =
        SIGNAL_DATA.basePositions[index + 1] +
        wave +
        Math.cos(smoothScroll.current * Math.PI * 3 + lineIndex) * 0.34;
      SIGNAL_DATA.positions[index + 2] =
        SIGNAL_DATA.basePositions[index + 2] +
        Math.sin(smoothScroll.current * Math.PI + lineIndex) * 1.4;
    }

    positions.needsUpdate = true;
    lines.position.y = THREE.MathUtils.lerp(-0.7, 0.45, smoothScroll.current);
    lines.position.z = THREE.MathUtils.lerp(-0.65, 0.8, smoothScroll.current);
    lines.rotation.x = THREE.MathUtils.lerp(-0.36, 0.28, smoothScroll.current);
    lines.rotation.z =
      Math.sin(time * 0.12) * 0.08 +
      THREE.MathUtils.lerp(-0.1, 0.18, smoothScroll.current);
  });

  return (
    <lineSegments ref={linesRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[SIGNAL_DATA.positions, 3]}
        />
        <bufferAttribute
          attach="attributes-color"
          args={[SIGNAL_DATA.colors, 3]}
        />
      </bufferGeometry>
      <lineBasicMaterial
        vertexColors
        transparent
        opacity={0.74}
        blending={THREE.NormalBlending}
      />
    </lineSegments>
  );
}

function createParticleData(): ParticleData {
  const positions = new Float32Array(PARTICLE_COUNT * 3);
  const colors = new Float32Array(PARTICLE_COUNT * 3);
  const seeds = new Float32Array(PARTICLE_COUNT);
  const targetPositions = Array.from(
    { length: SCENE_COUNT },
    () => new Float32Array(PARTICLE_COUNT * 3),
  );
  const ink = new THREE.Color("#171514");
  const signal = new THREE.Color("#6f8d78");
  const pulse = new THREE.Color("#b96a53");
  const steel = new THREE.Color("#65737e");

  for (let index = 0; index < PARTICLE_COUNT; index += 1) {
    const i = index * 3;
    const u = seededUnit(index, 5);
    const v = seededUnit(index, 11);
    const w = seededUnit(index, 17);
    const seed = seededUnit(index, 23);
    seeds[index] = seed;

    writeScenePosition(targetPositions[0], i, 0, u, v, w, seed);
    writeScenePosition(targetPositions[1], i, 1, u, v, w, seed);
    writeScenePosition(targetPositions[2], i, 2, u, v, w, seed);
    writeScenePosition(targetPositions[3], i, 3, u, v, w, seed);
    writeScenePosition(targetPositions[4], i, 4, u, v, w, seed);

    positions[i] = targetPositions[0][i];
    positions[i + 1] = targetPositions[0][i + 1];
    positions[i + 2] = targetPositions[0][i + 2];

    const color = ink.clone();
    if (seed < 0.44) {
      color.lerp(steel, 0.48 + seededUnit(index, 37) * 0.34);
    } else if (seed < 0.82) {
      color.lerp(signal, 0.45 + seededUnit(index, 41) * 0.42);
    } else {
      color.lerp(pulse, 0.55 + seededUnit(index, 43) * 0.34);
    }

    const intensity = seed > 0.94 ? 1.16 : 0.82 + w * 0.28;
    colors[i] = Math.min(color.r * intensity, 1);
    colors[i + 1] = Math.min(color.g * intensity, 1);
    colors[i + 2] = Math.min(color.b * intensity, 1);
  }

  return { positions, targetPositions, colors, seeds };
}

function writeScenePosition(
  positions: Float32Array,
  offset: number,
  scene: number,
  u: number,
  v: number,
  w: number,
  seed: number,
) {
  if (scene === 0) {
    const x = (u - 0.5) * 18.4;
    const z = (v - 0.5) * 7.4;
    const ridge =
      Math.sin(x * 0.58 + z * 1.12) * 0.52 +
      Math.sin(x * 1.22 - z * 0.74) * 0.28;
    const lane = Math.exp(-Math.abs(x) * 0.28) * 0.54;
    const safeTextPocket =
      Math.exp(-Math.pow((x + 2.6) / 3.7, 2)) *
      Math.exp(-Math.pow((z - 0.2) / 2.4, 2));

    if (seed < 0.42) {
      positions[offset] = x;
      positions[offset + 1] =
        -2.12 + ridge * 0.88 + lane + Math.sin(seed * 7.2) * 0.18;
      positions[offset + 2] = z + (w - 0.5) * 1.3;
      return;
    }

    if (seed < 0.82) {
      const contour = Math.sin(x * 0.42 + seed * 9.4) * 0.42;
      const textPocketPush = safeTextPocket * 1.2;
      positions[offset] = x + textPocketPush * 1.7;
      positions[offset + 1] =
        -0.15 +
        (v - 0.5) * 4.65 +
        contour +
        Math.cos(w * Math.PI * 2 + x * 0.18) * 0.32 -
        textPocketPush * 0.52;
      positions[offset + 2] = z * 0.78 + (w - 0.5) * 2.35;
      return;
    }

    positions[offset] = x * 0.94 + Math.sin(seed * 12) * 0.7;
    positions[offset + 1] =
      1.3 + (v - 0.5) * 2.95 + Math.sin(x * 0.36 + w * 5.2) * 0.38;
    positions[offset + 2] = z * 0.72 + (w - 0.5) * 3.1;
    return;
  }

  if (scene === 1) {
    const angle = u * Math.PI * 2.6 + seed * 0.8;
    const radius = 1.35 + v * 3.2;
    positions[offset] = Math.cos(angle) * radius + (w - 0.5) * 1.8;
    positions[offset + 1] =
      Math.sin(angle) * radius * 0.46 + Math.sin(radius * 2.1) * 0.72;
    positions[offset + 2] = (v - 0.5) * 4.2 + Math.cos(angle) * 0.9;
    return;
  }

  if (scene === 2) {
    const columns = 110;
    const row = Math.floor(u * columns);
    const col = Math.floor(v * columns);
    const x = (row / columns - 0.5) * 10.5;
    const y = (col / columns - 0.5) * 5.2;
    const trace =
      row % 14 < 2 || col % 17 < 2 || Math.abs((row % 34) - (col % 34)) < 2;
    positions[offset] = x + (seed - 0.5) * 0.08;
    positions[offset + 1] = y + (w - 0.5) * 0.08;
    positions[offset + 2] =
      (trace ? -0.4 : -1.4) + Math.sin(x * 1.1 + y * 1.6) * 0.24;
    return;
  }

  if (scene === 3) {
    const band = Math.floor(seed * 5);
    const x = (u - 0.5) * 15.4;
    const y =
      -1.7 +
      band * 0.72 +
      Math.sin(u * Math.PI * 5 + band) * 0.28 +
      (w - 0.5) * 0.2;
    positions[offset] = x;
    positions[offset + 1] = y;
    positions[offset + 2] = (v - 0.5) * 3.4 + band * 0.2;
    return;
  }

  const x = (u - 0.5) * 17.5;
  const z = (v - 0.5) * 6.8;
  const horizon = Math.abs(x) < 1.1 ? 0.64 : 0;
  positions[offset] = x;
  positions[offset + 1] =
    -2.05 +
    Math.sin(z * 1.6) * 0.28 +
    Math.sin(x * 0.42) * 0.18 +
    horizon +
    (w - 0.5) * 0.32;
  positions[offset + 2] = z;
}

function createSignalData(): SignalData {
  const segmentCount = SIGNAL_COUNT * (SIGNAL_POINTS - 1);
  const positions = new Float32Array(segmentCount * 2 * 3);
  const basePositions = new Float32Array(segmentCount * 2 * 3);
  const colors = new Float32Array(segmentCount * 2 * 3);
  const bright = new THREE.Color("#fffdf8");
  const pulse = new THREE.Color("#b96a53");
  const signal = new THREE.Color("#6f8d78");
  const ink = new THREE.Color("#171514");
  let cursor = 0;

  for (let signalIndex = 0; signalIndex < SIGNAL_COUNT; signalIndex += 1) {
    const startX = -8.2 + signalIndex * 1.85;
    const baseY = -1.88 + Math.sin(signalIndex * 1.3) * 0.86;
    const z = -1.8 + signalIndex * 0.42;

    for (let pointIndex = 0; pointIndex < SIGNAL_POINTS - 1; pointIndex += 1) {
      const a = pointIndex / (SIGNAL_POINTS - 1);
      const b = (pointIndex + 1) / (SIGNAL_POINTS - 1);
      const ax = startX + a * 5.4;
      const bx = startX + b * 5.4;
      const ay =
        baseY +
        Math.sin(a * Math.PI * 2.4 + signalIndex) * 0.42 +
        Math.cos(a * Math.PI * 5.8) * 0.1;
      const by =
        baseY +
        Math.sin(b * Math.PI * 2.4 + signalIndex) * 0.42 +
        Math.cos(b * Math.PI * 5.8) * 0.1;

      basePositions[cursor] = ax;
      basePositions[cursor + 1] = ay;
      basePositions[cursor + 2] = z;
      basePositions[cursor + 3] = bx;
      basePositions[cursor + 4] = by;
      basePositions[cursor + 5] = z + 0.02;
      positions.set(basePositions.subarray(cursor, cursor + 6), cursor);

      const color = bright
        .clone()
        .lerp(signalIndex % 3 === 0 ? pulse : signal, 0.38)
        .lerp(ink, pointIndex % 8 < 4 ? 0 : 0.36);
      colors[cursor] = color.r;
      colors[cursor + 1] = color.g;
      colors[cursor + 2] = color.b;
      colors[cursor + 3] = color.r;
      colors[cursor + 4] = color.g;
      colors[cursor + 5] = color.b;
      cursor += 6;
    }
  }

  return { positions, basePositions, colors };
}

function smootherStep(value: number) {
  return value * value * value * (value * (value * 6 - 15) + 10);
}

function configureThreeConsoleWarnings() {
  const previousConsoleFunction = THREE.getConsoleFunction();

  THREE.setConsoleFunction((type, message, ...params) => {
    if (
      type === "warn" &&
      message ===
        "THREE.Clock: This module has been deprecated. Please use THREE.Timer instead."
    ) {
      return;
    }

    if (previousConsoleFunction) {
      previousConsoleFunction(type, message, ...params);
      return;
    }

    if (type === "error") {
      console.error(message, ...params);
      return;
    }

    if (type === "log") {
      console.log(message, ...params);
      return;
    }

    console.warn(message, ...params);
  });
}

function seededUnit(index: number, salt: number) {
  const x = Math.sin(index * 12.9898 + salt * 78.233) * 43758.5453;
  return x - Math.floor(x);
}
