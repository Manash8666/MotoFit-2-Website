"use client";

import { useRef, useMemo } from "react";
import { Points } from "@react-three/drei";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";

const count = 200;

export default function FloatingEmbers() {
  const pointsRef = useRef<THREE.Points>(null);
  const materialRef = useRef<THREE.PointsMaterial>(null);

  // Safely create positions array
  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);

    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 100;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 100;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 100;
    }

    return pos;
  }, []);

  useFrame((state) => {
    if (!pointsRef.current) return;

    const positionAttribute = pointsRef.current.geometry.attributes
      .position as THREE.BufferAttribute;

    if (!positionAttribute || !positionAttribute.array) return;

    const positionsArray = positionAttribute.array as Float32Array;

    for (let i = 0; i < positionsArray.length; i += 3) {
      positionsArray[i] += Math.sin(state.clock.elapsedTime * 0.3 + i) * 0.01;
      positionsArray[i + 1] +=
        Math.cos(state.clock.elapsedTime * 0.2 + i) * 0.01;
      positionsArray[i + 2] +=
        Math.sin(state.clock.elapsedTime * 0.25 + i) * 0.01;
    }

    positionAttribute.needsUpdate = true;
  });

  return (
    <Points ref={pointsRef}>
      <bufferGeometry attach="geometry">
        <bufferAttribute
          attach="attributes-position"
          count={positions.length / 3}
          array={positions}
          itemSize={3}
          args={[positions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        ref={materialRef}
        size={0.3}
        color="#ff6b35"
        sizeAttenuation={true}
        transparent
        opacity={0.8}
      />
    </Points>
  );
}
