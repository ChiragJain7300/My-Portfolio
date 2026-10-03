"use client";

import React, { useRef, useMemo, useEffect } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Text } from "@react-three/drei";
import * as THREE from "three";

// ─── Skill nodes for the neural network ────────────────────────────────────
const SKILL_NODES = [
  { label: "Next.js",    x: -3.5,  y:  2.2,  z: -2 },
  { label: "TypeScript", x:  3.0,  y:  2.7,  z: -3 },
  { label: "Node.js",   x: -4.0,  y:  0.8,  z: -1 },
  { label: "LLMs",      x:  4.2,  y:  1.2,  z: -2 },
  { label: "React",     x: -1.5,  y:  3.5,  z: -4 },
  { label: "MongoDB",   x:  1.5,  y:  0.5,  z: -2 },
  { label: "n8n",       x:  3.5,  y:  2.0,  z: -1 },
  { label: "Express",   x: -2.5,  y: -0.5,  z: -3 },
  { label: "GraphQL",   x:  0.5,  y:  3.8,  z: -3 },
  { label: "Docker",    x: -4.5,  y:  1.8,  z: -4 },
  { label: "Redis",     x:  2.0,  y:  1.2,  z: -1 },
  { label: "OpenAI",   x: -0.5,  y: -0.5,  z: -2 },
];

const MAX_EDGE_DIST = 4.5;
const ACCENT_HEX = "#e8e4dc";

// ─── Neural Network (background layer) ─────────────────────────────────────
function NeuralNetwork() {
  const groupRef = useRef<THREE.Group>(null!);
  const mouseNorm = useRef(new THREE.Vector2(0, 0));

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      mouseNorm.current.set(
        (e.clientX / window.innerWidth) * 2 - 1,
        -(e.clientY / window.innerHeight) * 2 + 1
      );
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  // Build edge line geometry once
  const edgeGeo = useMemo(() => {
    const positions: number[] = [];
    for (let i = 0; i < SKILL_NODES.length; i++) {
      for (let j = i + 1; j < SKILL_NODES.length; j++) {
        const a = SKILL_NODES[i];
        const b = SKILL_NODES[j];
        const dist = Math.hypot(a.x - b.x, a.y - b.y, a.z - b.z);
        if (dist < MAX_EDGE_DIST) {
          positions.push(a.x, a.y, a.z, b.x, b.y, b.z);
        }
      }
    }
    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.Float32BufferAttribute(positions, 3));
    return geo;
  }, []);

  const edgeMat = useMemo(
    () =>
      new THREE.LineBasicMaterial({
        color: new THREE.Color(ACCENT_HEX),
        transparent: true,
        opacity: 0.05,
        depthWrite: false,
      }),
    []
  );

  const lines = useMemo(
    () => new THREE.LineSegments(edgeGeo, edgeMat),
    [edgeGeo, edgeMat]
  );

  useFrame((_, delta) => {
    const g = groupRef.current;
    if (!g) return;
    g.rotation.y += delta * 0.025 + mouseNorm.current.x * delta * 0.012;
    g.rotation.x += delta * 0.010 + mouseNorm.current.y * delta * 0.005;
  });

  return (
    <group ref={groupRef}>
      <primitive object={lines} />
      {SKILL_NODES.map((node) => (
        <group key={node.label} position={[node.x, node.y, node.z]}>
          <mesh>
            <sphereGeometry args={[0.05, 8, 8]} />
            <meshBasicMaterial
              color={ACCENT_HEX}
              transparent
              opacity={0.35}
            />
          </mesh>
          <Text
            position={[0, 0.18, 0]}
            fontSize={0.15}
            color={ACCENT_HEX}
            anchorX="center"
            anchorY="middle"
            fillOpacity={0.28}
          >
            {node.label}
          </Text>
        </group>
      ))}
    </group>
  );
}

// ─── Helpers ─────────────────────────────────────────────────────────────────
const PARTICLE_COUNT = 2800;
const TEXT_TARGET = "CHIRAG JAIN";

function buildScatterPositions(vpW: number, vpH: number): Float32Array {
  const arr = new Float32Array(PARTICLE_COUNT * 3);
  for (let i = 0; i < PARTICLE_COUNT; i++) {
    arr[i * 3]     = (Math.random() - 0.5) * vpW * 1.5;
    arr[i * 3 + 1] = (Math.random() - 0.5) * vpH * 1.5;
    arr[i * 3 + 2] = (Math.random() - 0.5) * 2.5;
  }
  return arr;
}

function buildTextTargetPositions(vpW: number, vpH: number): Float32Array {
  const cw = 512, ch = 128;
  const offscreen = document.createElement("canvas");
  offscreen.width  = cw;
  offscreen.height = ch;
  const ctx = offscreen.getContext("2d")!;
  ctx.clearRect(0, 0, cw, ch);
  ctx.fillStyle    = "#fff";
  ctx.font         = "bold 68px monospace";
  ctx.textAlign    = "center";
  ctx.textBaseline = "middle";
  ctx.fillText(TEXT_TARGET, cw / 2, ch / 2);

  const { data } = ctx.getImageData(0, 0, cw, ch);
  const pts: [number, number][] = [];
  for (let y = 0; y < ch; y++)
    for (let x = 0; x < cw; x++)
      if (data[(y * cw + x) * 4 + 3] > 120) pts.push([x, y]);

  const scaleX = (vpW * 0.72) / cw;
  const scaleY = (vpH * 0.16) / ch;

  const arr = new Float32Array(PARTICLE_COUNT * 3);
  for (let i = 0; i < PARTICLE_COUNT; i++) {
    if (!pts.length) { arr[i * 3] = arr[i * 3 + 1] = arr[i * 3 + 2] = 0; continue; }
    const [px, py] = pts[Math.floor(Math.random() * pts.length)];
    arr[i * 3]     = (px - cw / 2) * scaleX;
    arr[i * 3 + 1] = -(py - ch / 2) * scaleY;
    arr[i * 3 + 2] = (Math.random() - 0.5) * 0.2;
  }
  return arr;
}

// ─── Particle Text (foreground layer) ────────────────────────────────────────
function ParticleText() {
  const { viewport } = useThree();
  const geoRef  = useRef<THREE.BufferGeometry>(null!);
  const mouseWS = useRef(new THREE.Vector2(-1000, -1000)); // world-space coords
  const phase   = useRef<"scatter" | "morph" | "settled">("scatter");

  // Build positions once, store in refs so useFrame can mutate
  const scatterPos = useMemo(() => buildScatterPositions(viewport.width, viewport.height), [viewport]);
  const targetPos  = useMemo(() => buildTextTargetPositions(viewport.width, viewport.height), [viewport]);
  const curPos     = useMemo(() => scatterPos.slice() as Float32Array, [scatterPos]);

  // Per-particle colours
  const colorsArr = useMemo(() => {
    const arr = new Float32Array(PARTICLE_COUNT * 3);
    const base = new THREE.Color(ACCENT_HEX);
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const v = 0.75 + Math.random() * 0.25;
      arr[i * 3]     = base.r * v;
      arr[i * 3 + 1] = base.g * v;
      arr[i * 3 + 2] = base.b * v;
    }
    return arr;
  }, []);

  // Set up geometry attributes imperatively (works in R3F v9)
  useEffect(() => {
    const geo = geoRef.current;
    if (!geo) return;
    geo.setAttribute("position", new THREE.Float32BufferAttribute(curPos, 3));
    geo.setAttribute("color",    new THREE.Float32BufferAttribute(colorsArr, 3));
  }, [curPos, colorsArr]);

  // Mouse tracking in world space
  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      mouseWS.current.set(
        ((e.clientX / window.innerWidth)  * 2 - 1) * (viewport.width  / 2),
        (-(e.clientY / window.innerHeight) * 2 + 1) * (viewport.height / 2)
      );
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, [viewport]);

  // Phase sequencing
  useEffect(() => {
    const t1 = setTimeout(() => { phase.current = "morph";    }, 700);
    const t2 = setTimeout(() => { phase.current = "settled";  }, 4000);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, []);

  useFrame((_, delta) => {
    const geo = geoRef.current;
    if (!geo || !geo.attributes?.position) return;
    const attr = geo.attributes.position as THREE.BufferAttribute;
    if (!attr || !attr.array) return;
    const arr  = attr.array as Float32Array;
    const ph   = phase.current;

    const lerpSpd  = ph === "morph" ? Math.min(delta * 2.8, 0.14) : 0.018;
    const repelR   = 1.4;
    const repelStr = 0.55;

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const ix = i * 3, iy = ix + 1, iz = ix + 2;
      const tx = ph !== "scatter" ? targetPos[ix]  : scatterPos[ix];
      const ty = ph !== "scatter" ? targetPos[iy]  : scatterPos[iy];
      const tz = ph !== "scatter" ? targetPos[iz]  : scatterPos[iz];

      arr[ix] += (tx - arr[ix]) * lerpSpd;
      arr[iy] += (ty - arr[iy]) * lerpSpd;
      arr[iz] += (tz - arr[iz]) * lerpSpd * 0.5;

      // Subtle organic float + cursor repulsion after text has settled
      if (ph === "settled") {
        const drift = Math.sin(delta * 1.5 + i * 0.1) * 0.0003;
        arr[iy] += drift;

        const dx   = arr[ix] - mouseWS.current.x;
        const dy   = arr[iy] - mouseWS.current.y;
        const dist = Math.hypot(dx, dy);
        if (dist < repelR && dist > 0) {
          const f = ((repelR - dist) / repelR) * repelStr;
          arr[ix] += (dx / dist) * f * delta * 5;
          arr[iy] += (dy / dist) * f * delta * 5;
        }
      }
    }
    attr.needsUpdate = true;
  });

  return (
    <points>
      <bufferGeometry ref={geoRef} />
      <pointsMaterial
        size={0.024}
        vertexColors
        transparent
        opacity={0.88}
        sizeAttenuation
        depthWrite={false}
      />
    </points>
  );
}

// ─── Scene ───────────────────────────────────────────────────────────────────
function Scene() {
  return (
    <>
      <NeuralNetwork />
      <group position={[0, 0.85, 0]}>
        <ParticleText />
      </group>
    </>
  );
}

// ─── Canvas wrapper — exported and dynamically imported by Hero.tsx ──────────
export function HeroScene() {
  return (
    <Canvas
      camera={{ position: [0, 0, 7], fov: 60 }}
      dpr={[1, 1.5]}
      gl={{ antialias: false, alpha: true }}
      style={{ position: "absolute", inset: 0, pointerEvents: "none" }}
      aria-hidden="true"
    >
      <Scene />
    </Canvas>
  );
}
