"use client";

import { useRef, useState, Suspense } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Environment, Float, Html } from "@react-three/drei";
import * as THREE from "three";
import { motion, AnimatePresence } from "motion/react";

export type HotspotId =
  | "overview"
  | "suites"
  | "cove"
  | "terrace"
  | "pavilion";

interface Hotspot {
  id: HotspotId;
  position: [number, number, number];
  label: string;
  title: string;
  description: string;
  cameraTarget: [number, number, number];
}

const HOTSPOTS: Hotspot[] = [
  {
    id: "suites",
    position: [-2.4, 0.5, 1.2],
    label: "01",
    title: "Suite Terrace",
    description:
      "Eleven suites step down the cliffside, each with an uninterrupted line of sight to the water.",
    cameraTarget: [-2.4, 0.5, 1.2],
  },
  {
    id: "cove",
    position: [1.8, -0.6, 2.4],
    label: "02",
    title: "The Private Cove",
    description:
      "A sheltered inlet reserved for guests — calm water, a short stone stair, and nothing else.",
    cameraTarget: [1.8, -0.6, 2.4],
  },
  {
    id: "terrace",
    position: [0.2, 1.1, -1.6],
    label: "03",
    title: "Cliffside Dining Terrace",
    description:
      "Open-air dining set into the rock face, timed every evening to the sunset.",
    cameraTarget: [0.2, 1.1, -1.6],
  },
  {
    id: "pavilion",
    position: [-1.2, -0.3, -2.2],
    label: "04",
    title: "Spa Pavilion",
    description:
      "A freestanding stone pavilion at the edge of the property, used for treatments and quiet mornings.",
    cameraTarget: [-1.2, -0.3, -2.2],
  },
];

function Terrain() {
  const meshRef = useRef<THREE.Mesh>(null);

  const geometry = (() => {
    const geo = new THREE.PlaneGeometry(14, 14, 80, 80);
    const pos = geo.attributes.position;
    for (let i = 0; i < pos.count; i++) {
      const x = pos.getX(i);
      const y = pos.getY(i);
      const dist = Math.sqrt(x * x + y * y);
      const ridge = Math.sin(x * 0.6) * Math.cos(y * 0.5) * 0.6;
      const falloff = Math.max(0, 1 - dist / 9);
      const z = ridge * falloff + Math.sin(dist * 0.8) * 0.15 * falloff;
      pos.setZ(i, z);
    }
    geo.computeVertexNormals();
    return geo;
  })();

  return (
    <mesh
      ref={meshRef}
      geometry={geometry}
      rotation={[-Math.PI / 2, 0, 0]}
      receiveShadow
    >
      <meshStandardMaterial
        color="#c9bfa4"
        roughness={0.9}
        metalness={0}
        flatShading
      />
    </mesh>
  );
}

function Water() {
  const ref = useRef<THREE.Mesh>(null);
  useFrame(({ clock }) => {
    if (ref.current) {
      const mat = ref.current.material as THREE.MeshStandardMaterial;
      mat.opacity = 0.85 + Math.sin(clock.elapsedTime * 0.6) * 0.03;
    }
  });
  return (
    <mesh ref={ref} rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.42, 0]}>
      <planeGeometry args={[30, 30]} />
      <meshStandardMaterial
        color="#3d5a63"
        transparent
        opacity={0.88}
        roughness={0.2}
        metalness={0.3}
      />
    </mesh>
  );
}

function HotspotMarker({
  hotspot,
  active,
  onSelect,
}: {
  hotspot: Hotspot;
  active: boolean;
  onSelect: (id: HotspotId) => void;
}) {
  const [hovered, setHovered] = useState(false);

  return (
    <group position={hotspot.position}>
      <Float speed={2} floatIntensity={0.6} rotationIntensity={0}>
        <mesh
          onClick={(e) => {
            e.stopPropagation();
            onSelect(hotspot.id);
          }}
          onPointerOver={() => setHovered(true)}
          onPointerOut={() => setHovered(false)}
        >
          <sphereGeometry args={[0.1, 16, 16]} />
          <meshStandardMaterial
            color={active ? "#a9793f" : "#f6f1e7"}
            emissive={active ? "#a9793f" : "#000000"}
            emissiveIntensity={active ? 0.6 : 0}
          />
        </mesh>
      </Float>
      <Html distanceFactor={8} center>
        <button
          onClick={() => onSelect(hotspot.id)}
          className={`pointer-events-auto flex items-center justify-center w-9 h-9 rounded-full border text-[11px] font-medium transition-all duration-300 ${
            active
              ? "bg-brass border-brass text-cream scale-110"
              : hovered
              ? "bg-cream border-cream text-ink scale-105"
              : "bg-ink/40 border-cream/50 text-cream backdrop-blur-sm"
          }`}
          style={{ cursor: "pointer" }}
        >
          {hotspot.label}
        </button>
      </Html>
    </group>
  );
}

function CameraRig({ target }: { target: [number, number, number] }) {
  const { camera } = useThree();
  const current = useRef(new THREE.Vector3(0, 3.2, 6.5));
  const lookAt = useRef(new THREE.Vector3(0, 0, 0));
  const targetLookAt = useRef(new THREE.Vector3(...target));

  useFrame(() => {
    targetLookAt.current.set(target[0] * 0.4, target[1] * 0.4, target[2] * 0.4);
    const desired = new THREE.Vector3(
      target[0] * 0.5 + 2.5,
      2.6,
      target[2] * 0.5 + 5.5
    );
    current.current.lerp(desired, 0.03);
    lookAt.current.lerp(targetLookAt.current, 0.04);
    camera.position.copy(current.current);
    camera.lookAt(lookAt.current);
  });

  return null;
}

function Scene({
  activeId,
  onSelect,
}: {
  activeId: HotspotId;
  onSelect: (id: HotspotId) => void;
}) {
  const activeHotspot =
    HOTSPOTS.find((h) => h.id === activeId) ?? HOTSPOTS[0];

  return (
    <>
      <color attach="background" args={["#d9d0ba"]} />
      <fog attach="fog" args={["#d9d0ba", 9, 19]} />
      <ambientLight intensity={0.45} />
      <directionalLight
        position={[6, 8, 4]}
        intensity={1.1}
        color="#ffd9a8"
        castShadow
      />
      <directionalLight position={[-4, 3, -3]} intensity={0.25} color="#8fb8c9" />
      <Suspense fallback={null}>
        <Environment preset="sunset" />
      </Suspense>

      <Terrain />
      <Water />

      {HOTSPOTS.map((h) => (
        <HotspotMarker
          key={h.id}
          hotspot={h}
          active={h.id === activeId}
          onSelect={onSelect}
        />
      ))}

      <CameraRig target={activeHotspot.cameraTarget} />
    </>
  );
}

export default function PropertyScene() {
  const [activeId, setActiveId] = useState<HotspotId>("suites");
  const active = HOTSPOTS.find((h) => h.id === activeId) ?? HOTSPOTS[0];

  return (
    <div className="relative w-full h-[80vh] min-h-[520px] md:h-[88vh] bg-cream-soft">
      <Canvas
        shadows
        camera={{ position: [0, 3.2, 6.5], fov: 42 }}
        dpr={[1, 1.6]}
      >
        <Scene activeId={activeId} onSelect={setActiveId} />
      </Canvas>

      {/* Info card overlay */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 p-6 md:p-10">
        <AnimatePresence mode="wait">
          <motion.div
            key={active.id}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="pointer-events-auto max-w-md bg-ink/90 backdrop-blur-md text-cream p-6 md:p-8"
          >
            <p className="text-[10px] uppercase tracking-[0.18em] text-brass-light mb-3">
              {active.label} — Hotspot
            </p>
            <h3 className="font-display text-2xl md:text-3xl mb-3">
              {active.title}
            </h3>
            <p className="text-cream/70 text-sm leading-relaxed">
              {active.description}
            </p>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Hotspot nav list (desktop) */}
      <div className="pointer-events-none absolute top-6 right-6 md:top-10 md:right-10 hidden md:flex flex-col gap-2 items-end">
        {HOTSPOTS.map((h) => (
          <button
            key={h.id}
            onClick={() => setActiveId(h.id)}
            className={`pointer-events-auto text-[11px] uppercase tracking-[0.14em] px-3 py-1.5 transition-colors ${
              h.id === activeId
                ? "text-ink font-medium"
                : "text-ink/40 hover:text-ink/70"
            }`}
          >
            {h.title}
          </button>
        ))}
      </div>

      <div className="pointer-events-none absolute top-6 left-6 md:top-10 md:left-10 text-[10px] uppercase tracking-[0.18em] text-ink/50">
        Select a hotspot to explore
      </div>
    </div>
  );
}
