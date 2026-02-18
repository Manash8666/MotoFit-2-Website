"use client";

import React, { useRef, useMemo, useState, useEffect } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useTexture } from "@react-three/drei";
import * as THREE from "three";
import { HoloVertexShader, HoloFragmentShader } from "./HoloShader";

interface MansiHologramProps {
    mousePosition: { x: number; y: number };
    imageSrc: string;
}

const HologramScene: React.FC<MansiHologramProps> = ({ mousePosition, imageSrc }) => {
    const meshRef = useRef<THREE.Mesh>(null);

    // Load Texture
    const texture = useTexture(imageSrc);

    // Shader Uniforms
    const uniforms = useMemo(
        () => ({
            uTime: { value: 0 },
            uTexture: { value: texture },
            uMouse: { value: new THREE.Vector2(0, 0) },
            uParallaxStrength: { value: 0.3 }, // Configurable
            uColor: { value: new THREE.Color("#00f3ff") }, // Cyan
            uGlowIntensity: { value: 2.0 },
            uScanSpeed: { value: 2.0 },
        }),
        [texture]
    );

    // Animation Loop
    useFrame((state) => {
        if (!meshRef.current) return;

        // Update Time
        uniforms.uTime.value = state.clock.getElapsedTime();

        // Lerp Mouse Position for Smoothness
        uniforms.uMouse.value.x = THREE.MathUtils.lerp(
            uniforms.uMouse.value.x,
            mousePosition.x,
            0.1
        );
        uniforms.uMouse.value.y = THREE.MathUtils.lerp(
            uniforms.uMouse.value.y,
            mousePosition.y,
            0.1
        );
    });

    return (
        <mesh ref={meshRef} position={[0, 0, 0]}>
            <planeGeometry args={[3, 4, 32, 32]} />
            <shaderMaterial
                vertexShader={HoloVertexShader}
                fragmentShader={HoloFragmentShader}
                uniforms={uniforms}
                transparent={true}
                side={THREE.DoubleSide}
            />
        </mesh>
    );
};

export default function MansiHologram({ imageSrc, mousePosition }: MansiHologramProps) {
    return (
        <Canvas camera={{ position: [0, 0, 5], fov: 45 }} gl={{ alpha: true, antialias: true }}>
            <ambientLight intensity={0.5} />
            <HologramScene mousePosition={mousePosition} imageSrc={imageSrc} />
        </Canvas>
    );
}
