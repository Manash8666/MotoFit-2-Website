'use client';

import { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface BadgeProps {
  children: ReactNode;
  variant?: 'default' | 'status' | 'tech' | 'premium' | 'outlined';
  status?: 'active' | 'idle' | 'offline' | 'error';
  color?: 'orange' | 'cyan' | 'white' | 'green' | 'red';
  size?: 'sm' | 'md' | 'lg';
  icon?: ReactNode;
  className?: string;
}

const variantStyles = {
  default: 'bg-[#0a0a0a] border border-[#1a1a1a] text-[#a0a0a0]',
  status: 'bg-gradient-to-r from-[#ff5e1a]/20 to-[#00d1ff]/20 border border-[#ff5e1a]/30',
  tech: 'bg-[#ff5e1a]/10 border border-[#ff5e1a]/30 text-[#ff5e1a]',
  premium: 'bg-gradient-to-r from-[#ff5e1a] to-[#00d1ff] text-white font-bold',
  outlined: 'bg-transparent border-2 border-current'
};

const statusColors = {
  active: 'border-green-500 text-green-500 shadow-[0_0_10px_rgba(34,197,94,0.3)]',
  idle: 'border-yellow-500 text-yellow-500 shadow-[0_0_10px_rgba(234,179,8,0.3)]',
  offline: 'border-gray-500 text-gray-500 shadow-[0_0_10px_rgba(107,114,128,0.3)]',
  error: 'border-red-500 text-red-500 shadow-[0_0_10px_rgba(239,68,68,0.3)]'
};

const colorStyles = {
  orange: 'text-[#ff5e1a]',
  cyan: 'text-[#00d1ff]',
  white: 'text-white',
  green: 'text-green-500',
  red: 'text-red-500'
};

const sizeStyles = {
  sm: 'px-2 py-1 text-xs',
  md: 'px-3 py-1.5 text-sm',
  lg: 'px-4 py-2 text-base'
};

export function Badge({
  children,
  variant = 'default',
  status,
  color = 'orange',
  size = 'md',
  icon,
  className
}: BadgeProps) {
  const variantClass = variant === 'status' && status 
    ? statusColors[status]
    : variantStyles[variant];

  return (
    <span
      className={cn(
        'inline-flex items-center gap-2 rounded-full font-semibold transition-all duration-300',
        'whitespace-nowrap',
        variantClass,
        sizeStyles[size],
        variant === 'outlined' && colorStyles[color],
        className
      )}
    >
      {icon && <span className="flex-shrink-0">{icon}</span>}
      {children}
    </span>
  );
}

export function StatusBadge({
  children,
  status,
  ...props
}: Omit<BadgeProps, 'variant'> & { status: BadgeProps['status'] }) {
  const statusIcons = {
    active: '●',
    idle: '◐',
    offline: '◯',
    error: '✕'
  };

  return (
    <Badge
      variant="status"
      status={status}
      icon={statusIcons[status || 'offline']}
      {...props}
    >
      {children}
    </Badge>
  );
}

export function TechBadge({
  children,
  color = 'orange',
  ...props
}: Omit<BadgeProps, 'variant'>) {
  return (
    <Badge
      variant="tech"
      color={color}
      className="bg-[#ff5e1a]/10 border border-[#ff5e1a]/30"
      {...props}
    >
      {children}
    </Badge>
  );
}

export function PremiumBadge({
  children,
  ...props
}: Omit<BadgeProps, 'variant'>) {
  return (
    <Badge
      variant="premium"
      icon="⭐"
      {...props}
    >
      {children}
    </Badge>
  );
}

export function OutlinedBadge({
  children,
  color = 'cyan',
  ...props
}: Omit<BadgeProps, 'variant'>) {
  return (
    <Badge
      variant="outlined"
      color={color}
      className={cn(
        'border-2',
        color === 'orange' && 'border-[#ff5e1a] text-[#ff5e1a]',
        color === 'cyan' && 'border-[#00d1ff] text-[#00d1ff]'
      )}
      {...props}
    >
      {children}
    </Badge>
  );
}
