'use client';

import React, { useRef, useMemo, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float } from '@react-three/drei';
import * as THREE from 'three';

interface Centerpiece3DProps {
  wireframe?: boolean;
}

function StudioSculpture({ wireframe = false }: { wireframe: boolean }) {
  const masterGroupRef = useRef<THREE.Group>(null);
  const ringRef1 = useRef<THREE.Mesh>(null);
  const ringRef2 = useRef<THREE.Mesh>(null);

  // Materials: Matte dark carbon, brushed aluminum, smoked dark visor
  const materials = useMemo(() => {
    return {
      carbon: new THREE.MeshStandardMaterial({
        color: '#1B1B20',
        roughness: 0.45,
        metalness: 0.6,
        wireframe,
      }),
      aluminum: new THREE.MeshStandardMaterial({
        color: '#D4D4D8',
        roughness: 0.2,
        metalness: 0.9,
        wireframe,
      }),
      visor: new THREE.MeshPhysicalMaterial({
        color: wireframe ? '#D4D4D8' : '#09090B',
        roughness: 0.05,
        metalness: 0.1,
        transmission: wireframe ? 0 : 0.85,
        opacity: wireframe ? 1 : 0.92,
        transparent: true,
        wireframe,
      }),
      ring: new THREE.MeshBasicMaterial({
        color: '#D4D4D8',
        wireframe: true,
        transparent: true,
        opacity: wireframe ? 0.6 : 0.25,
      }),
    };
  }, [wireframe]);

  useFrame((state, delta) => {
    if (!masterGroupRef.current) return;

    // Subtle pointer parallax tilt
    const pointerX = state.pointer.x * 0.25;
    const pointerY = state.pointer.y * 0.2;

    masterGroupRef.current.rotation.y = THREE.MathUtils.lerp(
      masterGroupRef.current.rotation.y,
      pointerX * 0.4,
      0.08
    );
    masterGroupRef.current.rotation.x = THREE.MathUtils.lerp(
      masterGroupRef.current.rotation.x,
      -pointerY * 0.3,
      0.08
    );

    // Subtle ambient gyro motion
    if (ringRef1.current) {
      ringRef1.current.rotation.x += delta * 0.3;
      ringRef1.current.rotation.y += delta * 0.4;
    }
    if (ringRef2.current) {
      ringRef2.current.rotation.y -= delta * 0.35;
      ringRef2.current.rotation.z += delta * 0.25;
    }
  });

  return (
    <group ref={masterGroupRef} dispose={null}>
      {/* 1. Main Matte Carbon Shell */}
      <mesh position={[0, 0.4, -0.05]} material={materials.carbon}>
        <boxGeometry args={[1.5, 0.45, 1.5]} />
      </mesh>

      {/* 2. Brushed Aluminum Crown Plate */}
      <mesh position={[0, 0.62, 0.2]} material={materials.aluminum}>
        <boxGeometry args={[1.2, 0.1, 0.85]} />
      </mesh>

      {/* 3. Smoked Visor Assembly */}
      <mesh position={[0, 0.05, 0.8]} material={materials.visor}>
        <boxGeometry args={[1.35, 0.42, 0.3]} />
      </mesh>

      {/* 4. Aluminum Visor Brow Trim */}
      <mesh position={[0, 0.28, 0.82]} material={materials.aluminum}>
        <boxGeometry args={[1.38, 0.05, 0.28]} />
      </mesh>

      {/* 5. Lower Carbon Chin Lock */}
      <mesh position={[0, -0.28, 0.7]} material={materials.carbon}>
        <boxGeometry args={[1.05, 0.28, 0.45]} />
      </mesh>

      {/* 6. Port / Starboard Aluminum Winglets */}
      <mesh position={[-0.85, 0.05, -0.05]} material={materials.aluminum}>
        <boxGeometry args={[0.15, 0.5, 1.1]} />
      </mesh>
      <mesh position={[0.85, 0.05, -0.05]} material={materials.aluminum}>
        <boxGeometry args={[0.15, 0.5, 1.1]} />
      </mesh>

      {/* 7. Inner Core Geometry */}
      <group position={[0, 0.05, -0.05]}>
        <mesh material={materials.aluminum}>
          <octahedronGeometry args={[0.38, 0]} />
        </mesh>
        <mesh ref={ringRef1} material={materials.ring}>
          <torusGeometry args={[0.62, 0.015, 12, 32]} />
        </mesh>
        <mesh ref={ringRef2} material={materials.ring}>
          <torusGeometry args={[0.74, 0.012, 12, 32]} />
        </mesh>
      </group>
    </group>
  );
}

export default function Centerpiece3D({
  wireframe = false,
}: Centerpiece3DProps) {
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const isDraggingRef = useRef(false);
  const lastPointerRef = useRef({ x: 0, y: 0 });

  const handlePointerDown = (e: React.PointerEvent) => {
    isDraggingRef.current = true;
    lastPointerRef.current = { x: e.clientX, y: e.clientY };
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDraggingRef.current) return;
    const dx = e.clientX - lastPointerRef.current.x;
    const dy = e.clientY - lastPointerRef.current.y;
    lastPointerRef.current = { x: e.clientX, y: e.clientY };

    setDragOffset((prev) => ({
      x: prev.x + dy * 0.008,
      y: prev.y + dx * 0.008,
    }));
  };

  const handlePointerUp = () => {
    isDraggingRef.current = false;
  };

  return (
    <div
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerLeave={handlePointerUp}
      className="w-full h-full min-h-[380px] md:min-h-[460px] cursor-grab active:cursor-grabbing select-none"
      title="Click and drag to rotate 360°"
    >
      <Canvas
        camera={{ position: [0, 0, 4.8], fov: 38 }}
        dpr={[1, 2]}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: 'high-performance',
        }}
        className="w-full h-full pointer-events-none"
      >
        {/* Studio Lighting: Key, Fill, Rim */}
        <ambientLight intensity={0.4} />
        <directionalLight position={[5, 7, 5]} intensity={1.5} color="#FFFFFF" />
        <directionalLight position={[-5, -3, -4]} intensity={0.6} color="#A1A1AA" />
        <pointLight position={[0, 0, 3]} intensity={0.8} color="#FFFFFF" distance={7} />

        <group rotation={[dragOffset.x, dragOffset.y, 0]}>
          <Float
            speed={1.5}
            rotationIntensity={0.15}
            floatIntensity={0.25}
            floatingRange={[-0.04, 0.04]}
          >
            <StudioSculpture wireframe={wireframe} />
          </Float>
        </group>
      </Canvas>
    </div>
  );
}
