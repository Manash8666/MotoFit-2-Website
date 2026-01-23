'use client';

import { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: 'primary' | 'secondary' | 'glass' | 'border' | 'icon';
  color?: 'orange' | 'cyan' | 'white';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  disabled?: boolean;
  loading?: boolean;
  fullWidth?: boolean;
}

const variantStyles = {
  primary: 'bg-[#ff5e1a] text-white hover:bg-[#ff8a3d] active:scale-95',
  secondary: 'bg-[#00d1ff] text-[#050505] hover:bg-[#33dcff] active:scale-95',
  glass: 'bg-white/10 border border-white/20 text-white hover:bg-white/20 backdrop-blur-md',
  border: 'border-2 border-current text-current hover:bg-current/10',
  icon: 'rounded-full p-2 hover:bg-white/10'
};

const sizeStyles = {
  sm: 'px-3 py-1.5 text-xs',
  md: 'px-4 py-2.5 text-sm font-semibold',
  lg: 'px-6 py-3 text-base font-bold',
  xl: 'px-8 py-4 text-lg font-bold'
};

const colorStyles = {
  orange: 'text-[#ff5e1a]',
  cyan: 'text-[#00d1ff]',
  white: 'text-white'
};

export function Button({
  children,
  variant = 'primary',
  color = 'orange',
  size = 'md',
  disabled = false,
  loading = false,
  fullWidth = false,
  className,
  ...props
}: ButtonProps) {
  return (
    <button
      disabled={disabled || loading}
      className={cn(
        'rounded-lg transition-all duration-300 font-semibold',
        'focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#ff5e1a]',
        'disabled:opacity-50 disabled:cursor-not-allowed',
        variantStyles[variant],
        sizeStyles[size],
        variant === 'border' && colorStyles[color],
        fullWidth && 'w-full',
        className
      )}
      {...props}
    >
      <span className={cn('flex items-center justify-center gap-2', loading && 'opacity-0')}>
        {children}
      </span>
      {loading && (
        <span className="absolute flex items-center justify-center">
          <span className="animate-spin">⚙️</span>
        </span>
      )}
    </button>
  );
}

export function PrimaryButton({
  children,
  color = 'orange',
  ...props
}: Omit<ButtonProps, 'variant'> & { color?: 'orange' | 'cyan' }) {
  const bgColor = color === 'orange' ? 'bg-[#ff5e1a] hover:bg-[#ff8a3d]' : 'bg-[#00d1ff] hover:bg-[#33dcff]';
  const textColor = color === 'cyan' ? 'text-[#050505]' : 'text-white';
  
  return (
    <Button
      variant="primary"
      className={cn(bgColor, textColor)}
      {...props}
    >
      {children}
    </Button>
  );
}

export function GlassButton({
  children,
  size = 'md',
  ...props
}: Omit<ButtonProps, 'variant'>) {
  return (
    <Button
      variant="glass"
      size={size}
      className="backdrop-blur-xl border border-white/20 hover:border-white/40 hover:shadow-lg"
      {...props}
    >
      {children}
    </Button>
  );
}

export function IconButton({
  children,
  size = 'md',
  ...props
}: Omit<ButtonProps, 'variant'> & { size?: 'sm' | 'md' | 'lg' }) {
  const sizeMap = {
    sm: 'w-8 h-8',
    md: 'w-10 h-10',
    lg: 'w-12 h-12'
  };

  return (
    <button
      className={cn(
        'rounded-full flex items-center justify-center transition-all duration-300',
        'hover:bg-white/10 active:scale-95 focus:outline-none focus:ring-2 focus:ring-[#ff5e1a]',
        sizeMap[size]
      )}
      {...props}
    >
      {children}
    </button>
  );
}

export function BorderButton({
  children,
  color = 'orange',
  ...props
}: Omit<ButtonProps, 'variant'>) {
  const borderColor = color === 'orange' ? 'border-[#ff5e1a] text-[#ff5e1a] hover:bg-[#ff5e1a]/10' : 'border-[#00d1ff] text-[#00d1ff] hover:bg-[#00d1ff]/10';
  
  return (
    <Button
      variant="border"
      className={cn('border-2', borderColor)}
      {...props}
    >
      {children}
    </Button>
  );
}
