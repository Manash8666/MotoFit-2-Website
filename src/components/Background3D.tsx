'use client';

import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial, Preload, OrthographicCamera } from '@react-three/drei';
import * as THREE from 'three';
import { useRef, useMemo, Suspense } from 'react';
// import { EffectComposer, Bloom, Noise } from '@react-three/postprocessing';

function Embers({ count = 5000 }) {
  const pointsRef = useRef<THREE.Points>(null);
  const materialRef = useRef<THREE.PointsMaterial>(null);

  // Generate particles in a cylindrical shape (like exhaust)
  const [positions, colors, sizes] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);
    const siz = new Float32Array(count);

    for (let i = 0; i < count; i++) {
      // Cylindrical coordinates
      const radius = Math.random() * 10;
      const angle = Math.random() * Math.PI * 2;
      const height = (Math.random() - 0.5) * 20;

      pos[i * 3] = Math.cos(angle) * radius;
      pos[i * 3 + 1] = height;
      pos[i * 3 + 2] = Math.sin(angle) * radius;

      // Orange to red gradient
      const intensity = Math.random();
      col[i * 3] = 1.0; // R
      col[i * 3 + 1] = 0.2 + intensity * 0.3; // G
      col[i * 3 + 2] = 0.1; // B

      siz[i] = Math.random() * 0.1 + 0.05;
    }

    return [pos, col, siz];
  }, [count]);

  useFrame((state) => {
    if (!pointsRef.current) return;

    const time = state.clock.getElapsedTime();
    const positionsArray = pointsRef.current.geometry.attributes.position.array as Float32Array;

    // Fluid noise movement
    for (let i = 0; i < positionsArray.length; i += 3) {
      // Perlin-like noise
      const x = positionsArray[i];
      const y = positionsArray[i + 1];
      const z = positionsArray[i + 2];

      const noiseX = Math.sin(time * 0.5 + x * 0.1) * 0.05;
      const noiseY = Math.cos(time * 0.3 + y * 0.1) * 0.05;
      const noiseZ = Math.sin(time * 0.7 + z * 0.1) * 0.05;

      positionsArray[i] += noiseX;
      positionsArray[i + 1] += noiseY;
      positionsArray[i + 2] += noiseZ;

      // Reset if too far
      if (positionsArray[i + 1] > 15) positionsArray[i + 1] = -15;
    }

    pointsRef.current.geometry.attributes.position.needsUpdate = true;

    // Rotate slowly
    pointsRef.current.rotation.y = time * 0.05;
  });

  return (
    <Points ref={pointsRef} positions={positions}>
      <bufferGeometry attach="geometry">
        <bufferAttribute
          attach="attributes-position"
          count={positions.length / 3}
          array={positions}
          itemSize={3}
          args={[positions, 3]}
        />
        <bufferAttribute
          attach="attributes-color"
          count={colors.length / 3}
          array={colors}
          itemSize={3}
          args={[colors, 3]}
        />
      </bufferGeometry>
      <PointMaterial
        ref={materialRef}
        transparent
        vertexColors
        size={0.15}
        sizeAttenuation
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </Points>
  );
}

export default function Background3D() {
  return (
    <div className="fixed inset-0 -z-10">
      <Canvas dpr={[1, 2]} gl={{ alpha: false, antialias: false }}>
        <OrthographicCamera makeDefault position={[0, 0, 50]} zoom={100} />
        <color attach="background" args={['#050505']} />
        <fog attach="fog" args={['#050505', 30, 50]} />

        <Suspense fallback={null}>
          <Embers count={3000} />

          {/* PostProcessing removed for stability */}
        </Suspense>

        <Preload all />
      </Canvas>

      {/* Gradient overlay for text readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#050505]/50 to-[#050505]" />
    </div>
  );
}
