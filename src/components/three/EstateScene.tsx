"use client";

import { useEffect, useMemo, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Html } from "@react-three/drei";
import * as THREE from "three";
import { ZONES } from "@/data/zones";
import type { ZoneId } from "@/lib/types";

const DAY = { sky: "#cfc6b4", fog: "#cfc6b4", sun: 2.4, amb: 0.9, sunColor: "#fff1d6", ground: "#4a5a3f", water: "#4f7a83" };
const NIGHT = { sky: "#0b0f14", fog: "#0b0f14", sun: 0.25, amb: 0.22, sunColor: "#9fb4ff", ground: "#1d2620", water: "#16262c" };

/** Deterministic pseudo-random so trees don't move between renders. */
function rand(seed: number) {
  const x = Math.sin(seed * 9301 + 49297) * 233280;
  return x - Math.floor(x);
}

export default function EstateScene({
  active,
  night,
  onSelect,
}: {
  active: ZoneId | null;
  night: boolean;
  onSelect: (id: ZoneId) => void;
}) {
  const t = night ? NIGHT : DAY;
  return (
    <Canvas
      shadows
      dpr={[1, 1.75]}
      camera={{ position: [12, 10, 14], fov: 38, near: 0.1, far: 120 }}
      gl={{ antialias: true, powerPreference: "high-performance" }}
      style={{ touchAction: "pan-y" }}
      aria-label="3D model of the Aranya estate"
    >
      <color attach="background" args={[t.sky]} />
      <fog attach="fog" args={[t.fog, 22, 48]} />
      <hemisphereLight args={[t.sky, t.ground, t.amb]} />
      <directionalLight
        position={night ? [-8, 10, -6] : [10, 14, 6]}
        intensity={t.sun}
        color={t.sunColor}
        castShadow
        shadow-mapSize={[1024, 1024]}
        shadow-camera-left={-14}
        shadow-camera-right={14}
        shadow-camera-top={14}
        shadow-camera-bottom={-14}
      />
      <Terrain night={night} />
      <Trees night={night} />
      <Buildings night={night} />
      {ZONES.map((z) => (
        <Hotspot key={z.id} id={z.id} index={z.index} label={z.name} position={z.position} active={active === z.id} onSelect={onSelect} />
      ))}
      <CameraRig active={active} />
    </Canvas>
  );
}

/** Same height field as the terrain mesh (plane y maps to world -z). */
function heightAt(x: number, z: number) {
  const y = -z;
  const ridge = Math.max(0, -x * 0.12 - y * 0.1) * 1.4;
  const basin = -Math.exp(-((x - 4.2) ** 2 + (y + 3.2) ** 2) / 5) * 1.1;
  const noise = Math.sin(x * 0.9) * Math.cos(y * 0.7) * 0.18;
  return ridge + basin + noise;
}

function Terrain({ night }: { night: boolean }) {
  const t = night ? NIGHT : DAY;
  const geo = useMemo(() => {
    const g = new THREE.PlaneGeometry(34, 34, 48, 48);
    const p = g.attributes.position;
    for (let i = 0; i < p.count; i++) p.setZ(i, heightAt(p.getX(i), -p.getY(i)));
    g.computeVertexNormals();
    return g;
  }, []);
  return (
    <group>
      <mesh geometry={geo} rotation-x={-Math.PI / 2} receiveShadow>
        <meshStandardMaterial color={t.ground} flatShading roughness={1} />
      </mesh>
      {/* lake */}
      <mesh rotation-x={-Math.PI / 2} position={[4.2, -0.32, 3.2]} receiveShadow>
        <circleGeometry args={[2.6, 40]} />
        <meshStandardMaterial color={t.water} metalness={0.3} roughness={0.15} />
      </mesh>
    </group>
  );
}

function Trees({ night }: { night: boolean }) {
  const ref = useRef<THREE.InstancedMesh>(null);
  const count = 220;
  const color = night ? "#1a2a1e" : "#3d5a3a";
  const matrices = useMemo(() => {
    const arr: THREE.Matrix4[] = [];
    const m = new THREE.Matrix4();
    let placed = 0;
    for (let i = 0; placed < count && i < count * 6; i++) {
      const x = (rand(i) - 0.5) * 30;
      const z = (rand(i + 999) - 0.5) * 30;
      // keep clearings around buildings and the lake
      const clear = ZONES.some((zn) => Math.hypot(zn.position[0] - x, zn.position[2] - z) < (zn.id === "lake" ? 3.1 : zn.id === "forest" ? 0.9 : 1.9));
      if (clear) continue;
      const s = 0.55 + rand(i + 7) * 0.9;
      const y = heightAt(x, z);
      if (y < -0.2) continue; // nothing growing in the lake basin
      m.compose(new THREE.Vector3(x, y + s * 0.9, z), new THREE.Quaternion(), new THREE.Vector3(s * 0.7, s * 1.6, s * 0.7));
      arr.push(m.clone());
      placed++;
    }
    return arr;
  }, []);

  useFrame(() => {
    const mesh = ref.current;
    if (!mesh || mesh.userData.done) return;
    matrices.forEach((mt, i) => mesh.setMatrixAt(i, mt));
    mesh.instanceMatrix.needsUpdate = true;
    mesh.userData.done = true;
  });

  return (
    <instancedMesh ref={ref} args={[undefined, undefined, matrices.length]} castShadow>
      <coneGeometry args={[0.6, 1.3, 6]} />
      <meshStandardMaterial color={color} flatShading roughness={1} />
    </instancedMesh>
  );
}

function Buildings({ night }: { night: boolean }) {
  const wall = night ? "#3a342c" : "#e7dfd0";
  const roof = night ? "#2a1f18" : "#8a5a3a";
  const glow = night ? "#ffcf7a" : "#000000";
  const villa = (key: string, p: [number, number, number], r = 0) => (
    <group key={key} position={[p[0], heightAt(p[0], p[2]) - 0.05, p[2]]} rotation-y={r}>
      <mesh castShadow receiveShadow position={[0, 0.25, 0]}>
        <boxGeometry args={[0.9, 0.5, 0.7]} />
        <meshStandardMaterial color={wall} flatShading emissive={glow} emissiveIntensity={night ? 0.25 : 0} />
      </mesh>
      <mesh castShadow position={[0, 0.66, 0]} rotation-y={Math.PI / 4}>
        <coneGeometry args={[0.72, 0.38, 4]} />
        <meshStandardMaterial color={roof} flatShading />
      </mesh>
    </group>
  );
  return (
    <group>
      {/* villas strung along the ridge */}
      {[
        [-4.2, 1.15, -1.6],
        [-3.1, 0.95, -0.2],
        [-4.6, 1.3, 0.9],
        [-2.2, 0.75, -2.2],
        [-3.6, 1.05, -3.1],
      ].map((p, i) => villa(`v${i}`, p as [number, number, number], i * 0.6))}
      {/* long pool */}
      <group position={[0, heightAt(0.4, 1.4), 0]}>
        <mesh position={[0.4, 0.18, 1.4]} receiveShadow>
          <boxGeometry args={[3.4, 0.06, 0.8]} />
          <meshStandardMaterial color={night ? "#1f4b5a" : "#5fb0c2"} emissive={night ? "#2a7e95" : "#000"} emissiveIntensity={night ? 0.5 : 0} roughness={0.1} />
        </mesh>
        <mesh position={[0.4, 0.12, 1.4]} receiveShadow>
          <boxGeometry args={[3.8, 0.1, 1.2]} />
          <meshStandardMaterial color={wall} />
        </mesh>
      </group>
      {/* spa courtyard */}
      <group position={[3.4, heightAt(3.4, -1.6), -1.6]}>
        <mesh castShadow receiveShadow position={[0, 0.2, 0]}>
          <boxGeometry args={[1.6, 0.4, 1.6]} />
          <meshStandardMaterial color={night ? "#4a2e22" : "#b0644a"} flatShading emissive={glow} emissiveIntensity={night ? 0.15 : 0} />
        </mesh>
        <mesh castShadow position={[0, 0.9, 0]}>
          <sphereGeometry args={[0.55, 8, 6]} />
          <meshStandardMaterial color={night ? "#1a2a1e" : "#557a46"} flatShading />
        </mesh>
      </group>
      {/* fire kitchen */}
      <group position={[0.8, heightAt(0.8, -2.8), -2.8]}>
        <mesh castShadow receiveShadow position={[0, 0.2, 0]}>
          <boxGeometry args={[2.2, 0.4, 1]} />
          <meshStandardMaterial color={wall} flatShading emissive={glow} emissiveIntensity={night ? 0.35 : 0} />
        </mesh>
        <mesh castShadow position={[0, 0.55, 0]}>
          <boxGeometry args={[2.5, 0.08, 1.3]} />
          <meshStandardMaterial color={roof} />
        </mesh>
        {night && <pointLight position={[0, 0.5, 0.8]} color="#ff9a4a" intensity={6} distance={4} />}
      </group>
      {/* jetty */}
      <mesh position={[3.2, -0.22, 4.5]} castShadow>
        <boxGeometry args={[0.3, 0.05, 1.6]} />
        <meshStandardMaterial color="#6b4e34" />
      </mesh>
    </group>
  );
}

function Hotspot({
  id,
  index,
  label,
  position,
  active,
  onSelect,
}: {
  id: ZoneId;
  index: string;
  label: string;
  position: [number, number, number];
  active: boolean;
  onSelect: (id: ZoneId) => void;
}) {
  return (
    <Html position={[position[0], heightAt(position[0], position[2]) + 1.3, position[2]]} center zIndexRange={[20, 0]}>
      <button
        onClick={() => onSelect(id)}
        aria-pressed={active}
        aria-label={`${label} — fly to this area`}
        className={`group flex items-center gap-2 whitespace-nowrap rounded-full px-1.5 py-1.5 pr-3 text-[0.62rem] uppercase tracking-[0.16em] transition-all duration-500 ${
          active ? "bg-ivory text-bg" : "glass-ink text-ivory hover:bg-white/20"
        }`}
      >
        <span className={`grid h-6 w-6 place-items-center rounded-full text-[0.58rem] ${active ? "bg-bg text-ivory" : "bg-gold text-bg"}`}>{index}</span>
        <span className="hidden sm:inline">{label}</span>
      </button>
    </Html>
  );
}

/** Smoothly flies the camera to the active zone, otherwise slowly orbits the estate. */
function CameraRig({ active }: { active: ZoneId | null }) {
  const { camera } = useThree();
  const look = useRef(new THREE.Vector3(0, 0, 0));
  const drag = useRef({ on: false, x: 0, y: 0, yaw: 0.7, pitch: 0.55 });
  const target = useMemo(() => {
    const z = ZONES.find((zz) => zz.id === active);
    return z ? { pos: new THREE.Vector3(z.camera[0], z.camera[1] + heightAt(z.position[0], z.position[2]), z.camera[2]), look: new THREE.Vector3(z.position[0], heightAt(z.position[0], z.position[2]) + 0.4, z.position[2]) } : null;
  }, [active]);

  const { gl } = useThree();
  useEffect(() => {
    const el = gl.domElement;
    const d = drag.current;
    const down = (e: PointerEvent) => {
      d.on = true;
      d.x = e.clientX;
      d.y = e.clientY;
    };
    const move = (e: PointerEvent) => {
      if (!d.on) return;
      d.yaw -= (e.clientX - d.x) * 0.005;
      d.pitch = THREE.MathUtils.clamp(d.pitch + (e.clientY - d.y) * 0.003, 0.32, 0.95);
      d.x = e.clientX;
      d.y = e.clientY;
    };
    const up = () => {
      d.on = false;
    };
    el.addEventListener("pointerdown", down);
    window.addEventListener("pointermove", move);
    window.addEventListener("pointerup", up);
    return () => {
      el.removeEventListener("pointerdown", down);
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerup", up);
    };
  }, [gl]);

  useFrame((_, dt) => {
    const k = 1 - Math.pow(0.0025, dt);
    if (target) {
      camera.position.lerp(target.pos, k);
      look.current.lerp(target.look, k);
    } else {
      const d = drag.current;
      if (!d.on) d.yaw += dt * 0.04;
      const r = 20;
      const want = new THREE.Vector3(Math.sin(d.yaw) * r * Math.cos(d.pitch), Math.sin(d.pitch) * r, Math.cos(d.yaw) * r * Math.cos(d.pitch));
      camera.position.lerp(want, k);
      look.current.lerp(new THREE.Vector3(0, 0, 0), k);
    }
    camera.lookAt(look.current);
  });
  return null;
}
