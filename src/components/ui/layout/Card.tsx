'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';
import { Spotlight } from '../effects/Spotlight';

// Card Component
const Card = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & {
    variant?: 'default' | 'glass' | 'metal' | 'hologram' | 'border';
    hoverEffect?: 'spotlight' | 'glow' | 'lift' | 'none';
    spotlightColor?: 'orange' | 'cyan';
  }
>(({
  className,
  variant = 'default',
  hoverEffect = 'spotlight',
  spotlightColor = 'orange',
  children,
  ...props
}, ref) => {
  const cardRef = React.useRef<HTMLDivElement>(null);

  const variants = {
    default: cn(
      'bg-[#0a0a0a] border border-[#1a1a1a]',
      'hover:border-[#333] transition-colors duration-300'
    ),
    glass: cn(
      'bg-white/5 backdrop-blur-md border border-white/10',
      'hover:bg-white/10 hover:border-white/20 transition-all duration-300'
    ),
    metal: cn(
      'bg-gradient-to-br from-[#1a1a1a] to-[#050505] border border-[#333]',
      'shadow-[inset_0_1px_0_rgba(255,255,255,0.1)]',
      'hover:shadow-[inset_0_1px_0_rgba(255,94,26,0.3)] transition-shadow duration-300'
    ),
    hologram: cn(
      'bg-gradient-to-br from-[#00d1ff]/5 via-transparent to-[#ff5e1a]/5',
      'border border-transparent',
      'hover:border-[#00d1ff]/30 hover:shadow-[0_0_30px_rgba(0,209,255,0.1)]',
      'transition-all duration-300 relative overflow-hidden'
    ),
    border: cn(
      'bg-transparent border border-[#1a1a1a]',
      'hover:border-[#ff5e1a] transition-colors duration-300'
    ),
  };

  const hoverEffects = {
    spotlight: 'group',
    glow: 'hover:shadow-lg hover:shadow-[#ff5e1a]/10',
    lift: 'hover:-translate-y-1 hover:shadow-xl transition-transform duration-300',
    none: '',
  };

  return (
    <div
      ref={ref}
      className={cn(
        'relative rounded-xl p-6 overflow-hidden',
        variants[variant],
        hoverEffects[hoverEffect],
        hoverEffect === 'spotlight' && 'transition-all duration-300 hover:border-[#333]',
        className
      )}
      {...props}
    >
      {hoverEffect === 'spotlight' && (
        <Spotlight
          color={spotlightColor}
          size={200}
          intensity={0.15}
          blur={60}
          springOptions={{ bounce: 0, damping: 25, stiffness: 200 }}
          className="opacity-0 group-hover:opacity-100"
        />
      )}

      {variant === 'hologram' && (
        <>
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent animate-scan" />
          <div className="absolute -top-1/2 -left-1/2 w-full h-full bg-gradient-to-br from-[#00d1ff]/10 via-transparent to-transparent blur-3xl" />
        </>
      )}

      <div className="relative z-10">{children}</div>
    </div>
  );
});
Card.displayName = 'Card';

// CardHeader Component
const CardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & {
    align?: 'left' | 'center' | 'right';
  }
>(({ className, align = 'left', children, ...props }, ref) => {
  const alignment = {
    left: 'text-left',
    center: 'text-center',
    right: 'text-right',
  };

  return (
    <div
      ref={ref}
      className={cn(
        'flex flex-col space-y-1.5 pb-4 border-b border-[#1a1a1a]',
        alignment[align],
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
});
CardHeader.displayName = 'CardHeader';

// CardTitle Component
const CardTitle = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement> & {
    variant?: 'default' | 'gradient' | 'glow';
    gradient?: 'orange' | 'cyan';
  }
>(({ className, variant = 'default', gradient = 'orange', children, ...props }, ref) => {
  const variants = {
    default: 'text-white',
    gradient: cn(
      gradient === 'orange'
        ? 'bg-gradient-to-r from-[#ff5e1a] to-[#ff8a3d] bg-clip-text text-transparent'
        : 'bg-gradient-to-r from-[#00d1ff] to-[#33dcff] bg-clip-text text-transparent'
    ),
    glow: cn(
      'text-white',
      gradient === 'orange'
        ? 'drop-shadow-[0_0_8px_rgba(255,94,26,0.5)]'
        : 'drop-shadow-[0_0_8px_rgba(0,209,255,0.5)]'
    ),
  };

  return (
    <h3
      ref={ref}
      className={cn(
        'text-2xl font-bold leading-none tracking-tight',
        variants[variant],
        className
      )}
      {...props}
    >
      {children}
    </h3>
  );
});
CardTitle.displayName = 'CardTitle';

// CardDescription Component
const CardDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement> & {
    variant?: 'default' | 'muted' | 'accent';
  }
>(({ className, variant = 'default', children, ...props }, ref) => {
  const variants = {
    default: 'text-[#999999]',
    muted: 'text-[#666666]',
    accent: 'text-[#ff8a3d]',
  };

  return (
    <p
      ref={ref}
      className={cn('text-sm', variants[variant], className)}
      {...props}
    >
      {children}
    </p>
  );
});
CardDescription.displayName = 'CardDescription';

// CardContent Component
const CardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn('pt-4', className)}
    {...props}
  />
));
CardContent.displayName = 'CardContent';

// CardFooter Component
const CardFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & {
    justify?: 'start' | 'center' | 'end' | 'between';
  }
>(({ className, justify = 'start', children, ...props }, ref) => {
  const justification = {
    start: 'justify-start',
    center: 'justify-center',
    end: 'justify-end',
    between: 'justify-between',
  };

  return (
    <div
      ref={ref}
      className={cn(
        'flex items-center pt-4 border-t border-[#1a1a1a]',
        justification[justify],
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
});
CardFooter.displayName = 'CardFooter';

// Pre-styled Card variations for common use cases
const ServiceCard = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, children, ...props }, ref) => (
  <Card
    ref={ref}
    variant="glass"
    hoverEffect="spotlight"
    spotlightColor="orange"
    className={cn('hover:scale-[1.02] transition-transform duration-300', className)}
    {...props}
  >
    {children}
  </Card>
));

const ProjectCard = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, children, ...props }, ref) => (
  <Card
    ref={ref}
    variant="metal"
    hoverEffect="lift"
    className={cn('group', className)}
    {...props}
  >
    {children}
  </Card>
));

const TechCard = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, children, ...props }, ref) => (
  <Card
    ref={ref}
    variant="hologram"
    hoverEffect="glow"
    className={cn('hover:shadow-[0_0_40px_rgba(0,209,255,0.15)]', className)}
    {...props}
  >
    {children}
  </Card>
));

export {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardDescription,
  CardContent,
  ServiceCard,
  ProjectCard,
  TechCard
};
