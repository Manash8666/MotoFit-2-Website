'use client';

import { cn } from '@/lib/utils';

interface LoadingProps {
  variant?: 'spinner' | 'dots' | 'pulse' | 'bars' | 'cyber';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  color?: 'orange' | 'cyan' | 'white';
  text?: string;
  className?: string;
}

export function Loading({
  variant = 'cyber',
  size = 'md',
  color = 'orange',
  text = 'Loading...',
  className
}: LoadingProps) {
  const sizes = {
    sm: 'h-4 w-4',
    md: 'h-8 w-8',
    lg: 'h-12 w-12',
    xl: 'h-16 w-16',
  };

  const colors = {
    orange: 'text-[#ff5e1a] border-[#ff5e1a]',
    cyan: 'text-[#00d1ff] border-[#00d1ff]',
    white: 'text-white border-white',
  };

  const variants = {
    spinner: (
      <svg className={cn('animate-spin', sizes[size], colors[color])} fill="none" viewBox="0 0 24 24">
        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
      </svg>
    ),
    dots: (
      <div className={cn('flex items-center gap-1', sizes[size])}>
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            className={cn(
              'h-1/3 w-1/3 rounded-full bg-current',
              'animate-bounce',
              colors[color].split(' ')[0]
            )}
            style={{ animationDelay: `${i * 0.1}s` }}
          />
        ))}
      </div>
    ),
    pulse: (
      <div className={cn('rounded-full', sizes[size], colors[color].split(' ')[0], 'animate-pulse bg-current')} />
    ),
    bars: (
      <div className={cn('flex items-center justify-center gap-1', sizes[size])}>
        {[0, 1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className={cn(
              'h-full w-1 rounded-full bg-current',
              'animate-grow-shrink',
              colors[color].split(' ')[0]
            )}
            style={{ animationDelay: `${i * 0.1}s` }}
          />
        ))}
      </div>
    ),
    cyber: (
      <div className={cn('relative', sizes[size])}>
        {/* Outer ring */}
        <div className={cn(
          'absolute inset-0 rounded-full border-2',
          colors[color],
          'animate-spin'
        )} />

        {/* Inner ring */}
        <div className={cn(
          'absolute inset-2 rounded-full border-2',
          colors[color],
          'animate-spin-reverse opacity-50'
        )} />

        {/* Center dot */}
        <div className={cn(
          'absolute inset-4 rounded-full',
          colors[color].split(' ')[0],
          'animate-pulse'
        )} />
      </div>
    ),
  };

  return (
    <div className={cn('flex flex-col items-center gap-4', className)}>
      <div className="relative">
        {variants[variant]}

        {/* Glow effect for cyber variant */}
        {variant === 'cyber' && (
          <div className={cn(
            'absolute inset-0 rounded-full blur-md',
            color === 'orange' ? 'bg-[#ff5e1a]/30' : 'bg-[#00d1ff]/30',
            'animate-pulse-glow'
          )} />
        )}
      </div>

      {text && (
        <div className="flex flex-col items-center gap-1">
          <span className={cn(
            'text-sm font-mono uppercase tracking-widest',
            color === 'orange' ? 'text-[#ff8a3d]' : 'text-[#33dcff]'
          )}>
            {text}
          </span>
          <div className={cn(
            'w-16 h-0.5 rounded-full',
            color === 'orange' ? 'bg-gradient-to-r from-transparent via-[#ff5e1a] to-transparent' : 'bg-gradient-to-r from-transparent via-[#00d1ff] to-transparent',
            'animate-pulse'
          )} />
        </div>
      )}
    </div>
  );
}
