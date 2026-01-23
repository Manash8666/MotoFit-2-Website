'use client';

import { Suspense, lazy, useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { Loading } from './Loading';

const Spline = lazy(() => import('@splinetool/react-spline'));

interface SplineSceneProps {
  scene: string;
  className?: string;
  loadingFallback?: React.ReactNode;
  onLoad?: () => void;
  onError?: (error: Error) => void;
  interactive?: boolean;
  performance?: 'low' | 'medium' | 'high';
}

export function SplineScene({
  scene,
  className,
  loadingFallback,
  onLoad,
  onError,
  interactive = true,
  performance = 'medium'
}: SplineSceneProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  const handleLoad = () => {
    setIsLoading(false);
    onLoad?.();
  };

  const handleError = () => {
    setIsLoading(false);
    setHasError(true);
    onError?.(new Error("Spline scene failed to load"));
  };

  const defaultFallback = (
    <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-[#0a0a0a] to-[#1a1a1a] rounded-lg border border-[#1a1a1a]">
      <Loading
        variant="pulse"
        size="lg"
        color="orange"
        text="Loading 3D Scene..."
      />
    </div>
  );

  return (
    <div className={cn('relative w-full h-full', className)}>
      {isLoading && (
        <div className="absolute inset-0 z-10">
          {loadingFallback || defaultFallback}
        </div>
      )}

      {hasError ? (
        <div className="w-full h-full flex flex-col items-center justify-center bg-[#0a0a0a] rounded-lg border border-[#1a1a1a] p-8">
          <div className="text-[#ff5e1a] text-4xl mb-4">⚠️</div>
          <h3 className="text-xl font-bold mb-2">3D Scene Failed to Load</h3>
          <p className="text-[#999999] text-center">
            Please check your connection or try refreshing the page.
          </p>
        </div>
      ) : (
        <Suspense fallback={loadingFallback || defaultFallback}>
          <Spline
            scene={scene}
            onLoad={handleLoad}
            onError={handleError}
            style={{
              width: '100%',
              height: '100%',
              borderRadius: 'inherit',
            }}
          />
        </Suspense>
      )}
    </div>
  );
}

// Pre-configured Spline scenes for common use cases
export const MotorcycleSplineScene = (props: Omit<SplineSceneProps, 'scene'>) => (
  <SplineScene
    scene="https://prod.spline.design/6Wq1Q7YGyM-iab9i/scene.splinecode"
    interactive={false}
    performance="high"
    {...props}
  />
);

export const EngineSplineScene = (props: Omit<SplineSceneProps, 'scene'>) => (
  <SplineScene
    scene="https://prod.spline.design/PYZ5m-MWr5ZJN46Z/scene.splinecode"
    interactive={true}
    performance="medium"
    {...props}
  />
);
