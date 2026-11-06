"use client";

import React, { useRef, useMemo, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

// ─── Colors ──────────────────────────────────────────────────────────────────
const ACCENT_LIME = "#9ef01a"; // Luminous neon lime matching the Behance reference
const MESH_TINT = "#9cb296";   // Elegant muted mineral/everforest sage

// ─── Generate Organic Vertical Spire Lattice with Vertex Brightness ──────────
function generateSpireData() {
  const points: [number, number, number][] = [];
  const rings = 30; // Vertical levels
  const ptsPerRing = 10;
  const heightSpan = 6.6;
  const minY = -3.3;

  for (let r = 0; r < rings; r++) {
    const t = r / (rings - 1); // 0 to 1
    const y = minY + t * heightSpan;

    // Organic envelope: tapered at ends, expanding above and below the headline
    const envelope = Math.sin(t * Math.PI) * 1.5;
    const twist = y * 0.45;

    for (let p = 0; p < ptsPerRing; p++) {
      const angle = (p / ptsPerRing) * Math.PI * 2 + twist;
      const radiusPerturb =
        1.0 +
        0.24 * Math.sin(angle * 3 + y * 1.5) +
        0.14 * Math.cos(angle * 2 - y * 1.1);
      const rad = Math.max(0.16, envelope * radiusPerturb);

      const px = Math.cos(angle) * rad;
      const pz = Math.sin(angle) * rad;
      points.push([px, y, pz]);
    }

    // Core depth points on selective rings
    if (r % 2 === 0 && t > 0.16 && t < 0.84) {
      points.push([
        Math.sin(y * 1.8) * 0.22,
        y,
        Math.cos(y * 1.8) * 0.22,
      ]);
    }
  }

  // Build edge lines with per-vertex brightness:
  // - High clarity above (y > 1.1) and below (y < -1.1)
  // - Very soft / transparent directly behind the headline (|y| <= 1.1) for 100% typographic contrast
  const edgePositions: number[] = [];
  const edgeColors: number[] = [];
  const maxConnDist = 1.16;

  for (let i = 0; i < points.length; i++) {
    const p1 = points[i];
    for (let j = i + 1; j < points.length; j++) {
      const p2 = points[j];
      const dx = p1[0] - p2[0];
      const dy = p1[1] - p2[1];
      const dz = p1[2] - p2[2];
      const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);

      if (dist < maxConnDist) {
        edgePositions.push(p1[0], p1[1], p1[2]);
        edgePositions.push(p2[0], p2[1], p2[2]);

        [p1, p2].forEach((p) => {
          const absY = Math.abs(p[1]);
          const intensity = absY > 1.1 ? 0.62 : 0.16;
          edgeColors.push(intensity * 0.65, intensity * 0.78, intensity * 0.68);
        });
      }
    }
  }

  // Focal Node Placement matching Behance reference:
  // 1) An apex electric-lime node near top (y ~ 1.9, visible above the headline)
  // 2) A subtle faint node on the right perimeter
  let apexNode: [number, number, number] = [0, 1.9, 0.2];
  let sideNode: [number, number, number] = [1.2, -0.6, 0.3];

  // Find actual vertices closest to target coordinates
  let minApexDist = Infinity;
  let minSideDist = Infinity;
  for (const p of points) {
    if (p[1] > 1.6 && p[1] < 2.3) {
      const d = Math.hypot(p[0], p[2]);
      if (d < minApexDist) {
        minApexDist = d;
        apexNode = p;
      }
    }
    if (p[1] < -0.3 && p[1] > -1.2 && p[0] > 0.8) {
      const d = Math.hypot(p[0] - 1.2, p[1] + 0.6);
      if (d < minSideDist) {
        minSideDist = d;
        sideNode = p;
      }
    }
  }

  return { points, edgePositions, edgeColors, focalNodes: [apexNode, sideNode] };
}

// ─── 3D Organic Spire Component ──────────────────────────────────────────────
function OrganicSpire() {
  const groupRef = useRef<THREE.Group>(null!);
  const mouseNorm = useRef(new THREE.Vector2(0, 0));
  const currentRot = useRef({ x: 0, y: 0 });

  const { edgePositions, edgeColors, focalNodes } = useMemo(
    () => generateSpireData(),
    []
  );

  // Mouse move listener with restrained coordinates
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

  // BufferGeometry for lines with per-vertex colors
  const lineGeo = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    geo.setAttribute(
      "position",
      new THREE.Float32BufferAttribute(edgePositions, 3)
    );
    geo.setAttribute(
      "color",
      new THREE.Float32BufferAttribute(edgeColors, 3)
    );
    return geo;
  }, [edgePositions, edgeColors]);

  const lineMat = useMemo(
    () =>
      new THREE.LineBasicMaterial({
        vertexColors: true,
        transparent: true,
        opacity: 0.28,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
      }),
    []
  );

  const lines = useMemo(
    () => new THREE.LineSegments(lineGeo, lineMat),
    [lineGeo, lineMat]
  );

  // Floating ambient luminous dust particles (minimal, subtle, clear of text)
  const dustParticles = useMemo(() => {
    const count = 30;
    const pos = new Float32Array(count * 3);
    let placed = 0;

    for (let i = 0; i < count * 3 && placed < count; i++) {
      const x = (Math.random() - 0.5) * 7.0;
      const y = (Math.random() - 0.5) * 6.0;
      let z = (Math.random() - 0.5) * 3.0;

      // Keep particles well away from central text bounds
      if (Math.abs(x) < 3.6 && Math.abs(y) < 1.4) {
        continue;
      }

      pos[placed * 3] = x;
      pos[placed * 3 + 1] = y;
      pos[placed * 3 + 2] = z;
      placed++;
    }

    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.BufferAttribute(pos.slice(0, placed * 3), 3));
    return geo;
  }, []);

  const dustMat = useMemo(
    () =>
      new THREE.PointsMaterial({
        color: new THREE.Color(ACCENT_LIME),
        size: 0.024,
        transparent: true,
        opacity: 0.32,
        blending: THREE.AdditiveBlending,
      }),
    []
  );

  useFrame((state, delta) => {
    const g = groupRef.current;
    if (!g) return;

    // Subtle, restrained cursor interaction with gentle damping
    const targetY = mouseNorm.current.x * 0.10 + state.clock.elapsedTime * 0.022;
    const targetX = -mouseNorm.current.y * 0.05;

    currentRot.current.y +=
      (targetY - currentRot.current.y) * Math.min(delta * 1.6, 0.05);
    currentRot.current.x +=
      (targetX - currentRot.current.x) * Math.min(delta * 1.6, 0.05);

    g.rotation.y = currentRot.current.y;
    g.rotation.x = currentRot.current.x;

    // Gentle vertical breathing float
    g.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.04;
  });

  return (
    <group ref={groupRef} position={[0, 0, -0.4]}>
      {/* Intricate Geometric Spire Mesh */}
      <primitive object={lines} />

      {/* Floating Ambient Luminous Dust */}
      <points geometry={dustParticles} material={dustMat} />

      {/* Apex Luminous Green Focal Node (matching Behance reference top apex) */}
      {focalNodes[0] && (
        <group position={[focalNodes[0][0], focalNodes[0][1], focalNodes[0][2]]}>
          <mesh>
            <sphereGeometry args={[0.042, 16, 16]} />
            <meshBasicMaterial color={ACCENT_LIME} />
          </mesh>
          <mesh>
            <sphereGeometry args={[0.12, 16, 16]} />
            <meshBasicMaterial
              color={ACCENT_LIME}
              transparent
              opacity={0.25}
              blending={THREE.AdditiveBlending}
              depthWrite={false}
            />
          </mesh>
        </group>
      )}

      {/* Subtle Side Perimeter Node */}
      {focalNodes[1] && (
        <group position={[focalNodes[1][0], focalNodes[1][1], focalNodes[1][2]]}>
          <mesh>
            <sphereGeometry args={[0.028, 12, 12]} />
            <meshBasicMaterial color={ACCENT_LIME} />
          </mesh>
          <mesh>
            <sphereGeometry args={[0.07, 12, 12]} />
            <meshBasicMaterial
              color={ACCENT_LIME}
              transparent
              opacity={0.16}
              blending={THREE.AdditiveBlending}
              depthWrite={false}
            />
          </mesh>
        </group>
      )}
    </group>
  );
}

// ─── Main Scene Export ───────────────────────────────────────────────────────
export function HeroScene() {
  return (
    <div
      className="absolute inset-0 pointer-events-none select-none z-0 overflow-hidden"
      style={{
        maskImage:
          "linear-gradient(to bottom, transparent 0%, black 14%, black 86%, transparent 100%)",
        WebkitMaskImage:
          "linear-gradient(to bottom, transparent 0%, black 14%, black 86%, transparent 100%)",
      }}
    >
      <Canvas
        camera={{ position: [0, 0, 7.8], fov: 46 }}
        dpr={[1, 1.75]}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: "high-performance",
        }}
      >
        <ambientLight intensity={0.6} />
        <OrganicSpire />
      </Canvas>
    </div>
  );
}
export default HeroScene;
