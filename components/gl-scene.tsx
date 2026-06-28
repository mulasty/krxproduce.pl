"use client";

import { useRef, useMemo, type ReactNode } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Environment } from "@react-three/drei";
import { EffectComposer, Bloom, ChromaticAberration } from "@react-three/postprocessing";
import * as THREE from "three";

const CYAN = new THREE.Color("#22d3ee");
const AMBER = new THREE.Color("#f59e0b");

function MouseParticles({
  count = 600,
  mouse,
}: {
  count?: number;
  mouse: React.MutableRefObject<{ x: number; y: number }>;
}) {
  const mesh = useRef<THREE.Points>(null);
  const { viewport } = useThree();

  const geometry = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const vel = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      pos[i3] = (Math.random() - 0.5) * viewport.width * 2;
      pos[i3 + 1] = (Math.random() - 0.5) * viewport.height * 2;
      pos[i3 + 2] = (Math.random() - 0.5) * 8;
      vel[i3] = (Math.random() - 0.5) * 0.02;
      vel[i3 + 1] = (Math.random() - 0.5) * 0.02;
      vel[i3 + 2] = (Math.random() - 0.5) * 0.01;
      const c = CYAN.clone().lerp(AMBER, Math.random());
      col[i3] = c.r;
      col[i3 + 1] = c.g;
      col[i3 + 2] = c.b;
    }
    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.BufferAttribute(pos, 3));
    geo.setAttribute("color", new THREE.BufferAttribute(col, 3));
    (geo as unknown as { velocities: Float32Array }).velocities = vel;
    return geo;
  }, [count, viewport]);

  const velocities = (geometry as unknown as { velocities: Float32Array }).velocities;

  useFrame(() => {
    if (!mesh.current) return;
    const pos = mesh.current.geometry.attributes.position.array as Float32Array;
    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      pos[i3] += velocities[i3] + mouse.current.x * 0.003;
      pos[i3 + 1] += velocities[i3 + 1] + mouse.current.y * 0.003;
      pos[i3 + 2] += velocities[i3 + 2];
      const halfW = viewport.width;
      const halfH = viewport.height;
      if (pos[i3] > halfW) pos[i3] = -halfW;
      if (pos[i3] < -halfW) pos[i3] = halfW;
      if (pos[i3 + 1] > halfH) pos[i3 + 1] = -halfH;
      if (pos[i3 + 1] < -halfH) pos[i3 + 1] = halfH;
      if (pos[i3 + 2] > 4) pos[i3 + 2] = -4;
      if (pos[i3 + 2] < -4) pos[i3 + 2] = 4;
    }
    mesh.current.geometry.attributes.position.needsUpdate = true;
  });

  return (
    <points ref={mesh} geometry={geometry}>
      <pointsMaterial
        size={0.04}
        vertexColors
        transparent
        opacity={0.9}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
}

function MorphingShape({
  position,
  mouse,
}: {
  position: [number, number, number];
  mouse: React.MutableRefObject<{ x: number; y: number }>;
}) {
  const mesh = useRef<THREE.Mesh>(null);
  const material = useRef<THREE.MeshPhysicalMaterial>(null);

  useFrame((_, delta) => {
    if (!mesh.current || !material.current) return;
    const rotSpeed = 0.5;
    mesh.current.rotation.x += delta * rotSpeed;
    mesh.current.rotation.y += delta * rotSpeed * 0.7;
    mesh.current.rotation.z += delta * rotSpeed * 0.3;

    const tx = mouse.current.x * 0.15;
    const ty = mouse.current.y * 0.1;
    mesh.current.position.x += (position[0] + tx - mesh.current.position.x) * 0.03;
    mesh.current.position.y += (position[1] - ty - mesh.current.position.y) * 0.03;

    const floatOffset = Math.sin(Date.now() * 0.001 + position[0]) * 0.15;
    mesh.current.position.y += floatOffset * delta;
  });

  return (
    <mesh ref={mesh} position={position}>
      <torusKnotGeometry args={[0.55, 0.2, 180, 24]} />
      <meshPhysicalMaterial
        ref={material}
        color="#22d3ee"
        emissive="#22d3ee"
        emissiveIntensity={0.4}
        roughness={0.1}
        metalness={0.9}
        clearcoat={0.3}
        transparent
        opacity={0.95}
      />
    </mesh>
  );
}

function IcosahedronShape({
  position,
  mouse,
}: {
  position: [number, number, number];
  mouse: React.MutableRefObject<{ x: number; y: number }>;
}) {
  const mesh = useRef<THREE.Mesh>(null);
  const material = useRef<THREE.MeshPhysicalMaterial>(null);

  useFrame((_, delta) => {
    if (!mesh.current || !material.current) return;
    const speed = 0.4;
    mesh.current.rotation.x += delta * speed;
    mesh.current.rotation.y += delta * speed * 1.3;

    const tx = mouse.current.x * 0.12;
    const ty = mouse.current.y * 0.08;
    mesh.current.position.x += (position[0] + tx - mesh.current.position.x) * 0.02;
    mesh.current.position.y += (position[1] - ty - mesh.current.position.y) * 0.02;

    const pulse = 1 + Math.sin(Date.now() * 0.002) * 0.05;
    mesh.current.scale.setScalar(pulse);
  });

  return (
    <mesh ref={mesh} position={position}>
      <icosahedronGeometry args={[0.6, 1]} />
      <meshPhysicalMaterial
        ref={material}
        color="#f59e0b"
        emissive="#f59e0b"
        emissiveIntensity={0.3}
        roughness={0.2}
        metalness={0.8}
        wireframe={false}
        transparent
        opacity={0.9}
      />
    </mesh>
  );
}

function WireframeIcosahedron({
  position,
  mouse,
}: {
  position: [number, number, number];
  mouse: React.MutableRefObject<{ x: number; y: number }>;
}) {
  const mesh = useRef<THREE.Mesh>(null);

  useFrame((_, delta) => {
    if (!mesh.current) return;
    const speed = 0.15;
    mesh.current.rotation.x += delta * speed;
    mesh.current.rotation.y += delta * speed * 0.9;
    mesh.current.rotation.z += delta * speed * 0.5;

    const tx = mouse.current.x * 0.1;
    const ty = mouse.current.y * 0.06;
    mesh.current.position.x += (position[0] + tx - mesh.current.position.x) * 0.01;
    mesh.current.position.y += (position[1] - ty - mesh.current.position.y) * 0.01;
  });

  return (
    <mesh ref={mesh} position={position}>
      <icosahedronGeometry args={[0.9, 0]} />
      <meshBasicMaterial color="#22d3ee" wireframe transparent opacity={0.15} />
    </mesh>
  );
}

function AnimatedLights() {
  const light1 = useRef<THREE.PointLight>(null);
  const light2 = useRef<THREE.PointLight>(null);

  useFrame((_, delta) => {
    if (light1.current) {
      light1.current.position.x = Math.sin(Date.now() * 0.0005) * 6;
      light1.current.position.z = Math.cos(Date.now() * 0.0004) * 6;
    }
    if (light2.current) {
      light2.current.position.x = Math.cos(Date.now() * 0.0003) * 5;
      light2.current.position.z = Math.sin(Date.now() * 0.0005) * 5;
    }
  });

  return (
    <>
      <pointLight ref={light1} position={[5, 3, 5]} intensity={2} color="#22d3ee" />
      <pointLight ref={light2} position={[-5, -2, 4]} intensity={1.5} color="#f59e0b" />
      <ambientLight intensity={0.2} />
      <spotLight position={[0, 5, 5]} intensity={0.5} angle={0.6} penumbra={0.5} color="#22d3ee" />
    </>
  );
}

export function Scene3D({ children }: { children?: ReactNode }) {
  const mouse = useRef({ x: 0, y: 0 });

  return (
    <div
      className="fixed inset-0 z-0"
      onPointerMove={(e) => {
        const x = (e.clientX / window.innerWidth) * 2 - 1;
        const y = -(e.clientY / window.innerHeight) * 2 + 1;
        mouse.current = { x, y };
      }}
    >
      <Canvas
        camera={{ position: [0, 0, 7], fov: 55 }}
        dpr={[1, 1.5]}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: "high-performance",
          stencil: false,
          depth: true,
        }}
        style={{ background: "transparent" }}
        performance={{ min: 0.5 }}
      >
        <AnimatedLights />
        <MouseParticles mouse={mouse} />
        <MorphingShape position={[-2.2, 0.8, -2]} mouse={mouse} />
        <MorphingShape position={[2.5, -0.5, -1.5]} mouse={mouse} />
        <IcosahedronShape position={[0, -1.5, -3]} mouse={mouse} />
        <WireframeIcosahedron position={[-0.5, 1.8, -4]} mouse={mouse} />
        <WireframeIcosahedron position={[3, 1.2, -4]} mouse={mouse} />
        <Environment preset="night" />

        <EffectComposer>
          <Bloom
            luminanceThreshold={0.2}
            luminanceSmoothing={0.08}
            intensity={0.8}
            mipmapBlur
          />
          <ChromaticAberration offset={[0.001, 0.0005]} />
        </EffectComposer>
      </Canvas>
      {children}
    </div>
  );
}
