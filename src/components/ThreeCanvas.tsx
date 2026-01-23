"use client";

import { Canvas } from "@react-three/fiber";
import { Preload } from "@react-three/drei";
import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";

interface ThreeCanvasProps {
  children: React.ReactNode;
  camera?: any;
}

function ErrorFallback() {
  return (
    <div className="h-full w-full flex items-center justify-center bg-gray-900">
      <p className="text-white">3D content failed to load</p>
    </div>
  );
}

export default function ThreeCanvas({
  children,
  camera = { position: [0, 0, 50], fov: 75 },
}: ThreeCanvasProps) {
  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <Canvas
        camera={camera}
        gl={{ antialias: true, alpha: true, precision: "highp" }}
        dpr={[1, 2]}
        style={{ background: "transparent" }}
      >
        <Suspense fallback={null}>{children}</Suspense>
        <Preload all />
      </Canvas>
    </ErrorBoundary>
  );
}
