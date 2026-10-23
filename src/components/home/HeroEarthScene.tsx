"use client";

import { Suspense, useLayoutEffect, useRef } from "react";
import { Canvas, useFrame, useLoader, useThree } from "@react-three/fiber";
import { Stars } from "@react-three/drei";
import * as THREE from "three";

const EARTH_RADIUS = 2.35;
const ORBIT_RADIUS = 3.55;
const CAMERA_FOV = 38;
const SCENE_PADDING = 1.14;

function CameraRig() {
  const { camera, size } = useThree();

  useLayoutEffect(() => {
    if (!(camera instanceof THREE.PerspectiveCamera)) return;

    const orbitExtent = ORBIT_RADIUS + 0.65;
    const vFov = (CAMERA_FOV * Math.PI) / 180;
    const aspect = size.width / Math.max(size.height, 1);
    const hFov = 2 * Math.atan(Math.tan(vFov / 2) * aspect);

    const distForHeight = orbitExtent / Math.tan(vFov / 2);
    const distForWidth = orbitExtent / Math.tan(hFov / 2);
    const z = Math.max(distForHeight, distForWidth) * SCENE_PADDING;

    camera.position.set(0, 0.05, z);
    camera.fov = CAMERA_FOV;
    camera.near = 0.1;
    camera.far = 200;
    camera.updateProjectionMatrix();
  }, [camera, size.width, size.height]);

  return null;
}

function Earth() {
  const earthRef = useRef<THREE.Mesh>(null);
  const cloudsRef = useRef<THREE.Mesh>(null);
  const [colorMap, specularMap] = useLoader(THREE.TextureLoader, [
    "/assets/img/earth-equirect.jpg",
    "/assets/img/earth-specular.jpg",
  ]);

  useFrame((_, delta) => {
    if (earthRef.current) earthRef.current.rotation.y += delta * 0.06;
    if (cloudsRef.current) cloudsRef.current.rotation.y += delta * 0.07;
  });

  return (
    <group>
      <mesh ref={earthRef}>
        <sphereGeometry args={[EARTH_RADIUS, 72, 72]} />
        <meshPhongMaterial
          map={colorMap}
          specularMap={specularMap}
          specular={new THREE.Color(0x444444)}
          shininess={12}
        />
      </mesh>

      <mesh ref={cloudsRef} scale={1.008}>
        <sphereGeometry args={[EARTH_RADIUS, 64, 64]} />
        <meshPhongMaterial
          color="#ffffff"
          transparent
          opacity={0.08}
          depthWrite={false}
        />
      </mesh>

      <mesh scale={1.04}>
        <sphereGeometry args={[EARTH_RADIUS, 48, 48]} />
        <meshBasicMaterial
          color="#409DD6"
          transparent
          opacity={0.12}
          side={THREE.BackSide}
          blending={THREE.AdditiveBlending}
        />
      </mesh>
    </group>
  );
}

function Satellite() {
  const satelliteRef = useRef<THREE.Group>(null);

  useFrame(({ clock }) => {
    if (!satelliteRef.current) return;

    const t = clock.getElapsedTime() * 0.5;
    satelliteRef.current.position.set(
      Math.cos(t) * ORBIT_RADIUS,
      Math.sin(t * 0.85) * 0.75,
      Math.sin(t) * ORBIT_RADIUS,
    );
    satelliteRef.current.lookAt(0, 0, 0);
  });

  return (
    <group ref={satelliteRef}>
      <mesh castShadow>
        <boxGeometry args={[0.14, 0.1, 0.1]} />
        <meshStandardMaterial
          color="#d8e6f2"
          metalness={0.75}
          roughness={0.25}
        />
      </mesh>

      <mesh position={[0.22, 0, 0]} castShadow>
        <boxGeometry args={[0.28, 0.018, 0.1]} />
        <meshStandardMaterial
          color="#163a66"
          metalness={0.5}
          roughness={0.4}
          emissive="#0d2848"
          emissiveIntensity={0.35}
        />
      </mesh>

      <mesh position={[-0.22, 0, 0]} castShadow>
        <boxGeometry args={[0.28, 0.018, 0.1]} />
        <meshStandardMaterial
          color="#163a66"
          metalness={0.5}
          roughness={0.4}
          emissive="#0d2848"
          emissiveIntensity={0.35}
        />
      </mesh>

      <mesh position={[0, 0.1, 0]}>
        <cylinderGeometry args={[0.01, 0.01, 0.12, 8]} />
        <meshStandardMaterial
          color="#409DD6"
          emissive="#409DD6"
          emissiveIntensity={0.6}
          metalness={0.8}
          roughness={0.2}
        />
      </mesh>

      <mesh position={[0, 0.16, 0]}>
        <sphereGeometry args={[0.018, 12, 12]} />
        <meshStandardMaterial
          color="#5cb3e8"
          emissive="#409DD6"
          emissiveIntensity={1}
        />
      </mesh>

      <pointLight color="#409DD6" intensity={1.2} distance={2.5} />
    </group>
  );
}

function OrbitPath({
  tilt,
  phase,
}: {
  tilt: [number, number, number];
  phase: number;
}) {
  const ringRef = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    if (!ringRef.current) return;
    ringRef.current.rotation.y = clock.getElapsedTime() * 0.08 + phase;
  });

  return (
    <mesh ref={ringRef} rotation={tilt}>
      <torusGeometry args={[ORBIT_RADIUS, 0.004, 12, 160]} />
      <meshBasicMaterial color="#409DD6" transparent opacity={0.22} />
    </mesh>
  );
}

function Scene() {
  const groupRef = useRef<THREE.Group>(null);

  useFrame(({ clock }) => {
    if (!groupRef.current) return;
    groupRef.current.rotation.y =
      Math.sin(clock.getElapsedTime() * 0.15) * 0.08;
    groupRef.current.rotation.x =
      Math.sin(clock.getElapsedTime() * 0.1) * 0.025;
  });

  return (
    <>
      <CameraRig />
      <group ref={groupRef} position={[0, -0.12, 0]}>
        <ambientLight intensity={0.18} />
        <directionalLight position={[6, 4, 5]} intensity={2.2} color="#fff8f0" />
        <directionalLight
          position={[-5, -2, -4]}
          intensity={0.35}
          color="#409DD6"
        />
        <pointLight
          position={[0, 0, 0]}
          intensity={0.15}
          color="#409DD6"
          distance={8}
        />

        <Stars
          radius={90}
          depth={50}
          count={1800}
          factor={3.5}
          saturation={0}
          fade
          speed={0.4}
        />

        <Earth />
        <Satellite />
        <OrbitPath tilt={[Math.PI / 2.6, 0.15, 0.1]} phase={0} />
        <OrbitPath tilt={[Math.PI / 3.2, -0.4, 0.25]} phase={1.8} />
      </group>
    </>
  );
}

function SceneLoader() {
  return (
    <mesh>
      <sphereGeometry args={[EARTH_RADIUS, 32, 32]} />
      <meshBasicMaterial color="#1a4f7a" wireframe transparent opacity={0.35} />
    </mesh>
  );
}

export function HeroEarthScene() {
  return (
    <div className="nm-hero-earth" aria-hidden="true">
      <Canvas
        className="nm-hero-earth-canvas"
        dpr={[1, 1.75]}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: "high-performance",
        }}
      >
        <Suspense fallback={<SceneLoader />}>
          <Scene />
        </Suspense>
      </Canvas>
    </div>
  );
}
