'use client';

import { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface TagProps {
  children: ReactNode;
  onRemove?: () => void;
  variant?: 'default' | 'filled' | 'outlined' | 'soft';
  color?: 'orange' | 'cyan' | 'white';
  interactive?: boolean;
  icon?: ReactNode;
  className?: string;
}

const variantStyles = {
  default: 'bg-[#1a1a1a] border border-[#2a2a2a] text-[#a0a0a0]',
  filled: 'bg-[#ff5e1a] text-white border-0',
  outlined: 'bg-transparent border-2 text-current',
  soft: 'bg-[#ff5e1a]/20 border border-[#ff5e1a]/30 text-[#ff5e1a]'
};

const colorStyles = {
  orange: 'border-[#ff5e1a] text-[#ff5e1a]',
  cyan: 'border-[#00d1ff] text-[#00d1ff]',
  white: 'border-white text-white'
};

export function Tag({
  children,
  onRemove,
  variant = 'default',
  color = 'orange',
  interactive = false,
  icon,
  className
}: TagProps) {
  const baseClass = 'inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium transition-all duration-200 whitespace-nowrap';
  
  const variantClass = variant === 'outlined'
    ? cn(variantStyles[variant], colorStyles[color])
    : variantStyles[variant];

  return (
    <div
      className={cn(
        baseClass,
        variantClass,
        interactive && 'cursor-pointer hover:scale-105',
        className
      )}
    >
      {icon && <span className="flex-shrink-0">{icon}</span>}
      <span>{children}</span>
      {onRemove && (
        <button
          onClick={onRemove}
          className="ml-1 text-current hover:opacity-70 transition-opacity focus:outline-none"
          aria-label="Remove tag"
        >
          ✕
        </button>
      )}
    </div>
  );
}

export function InteractiveTag({
  children,
  onRemove,
  ...props
}: Omit<TagProps, 'interactive'>) {
  return (
    <Tag
      interactive={true}
      onRemove={onRemove}
      {...props}
    >
      {children}
    </Tag>
  );
}

export function TechTag({
  children,
  ...props
}: Omit<TagProps, 'variant'>) {
  return (
    <Tag
      variant="soft"
      className="bg-[#ff5e1a]/15 border border-[#ff5e1a]/40 text-[#ff8a3d] hover:bg-[#ff5e1a]/25"
      {...props}
    >
      {children}
    </Tag>
  );
}

interface TagGroupProps {
  tags: (string | { label: string; onRemove?: () => void })[];
  variant?: 'default' | 'filled' | 'outlined' | 'soft';
  color?: 'orange' | 'cyan' | 'white';
  className?: string;
  onChange?: (tags: string[]) => void;
}

export function TagGroup({
  tags,
  variant = 'default',
  color = 'orange',
  className,
  onChange
}: TagGroupProps) {
  const handleRemove = (index: number) => {
    const newTags = tags.filter((_, i) => i !== index);
    onChange?.(newTags.map(t => typeof t === 'string' ? t : t.label));
  };

  return (
    <div className={cn('flex flex-wrap gap-2', className)}>
      {tags.map((tag, idx) => {
        const label = typeof tag === 'string' ? tag : tag.label;
        const onRemove = typeof tag === 'string' ? undefined : tag.onRemove;

        return (
          <Tag
            key={idx}
            variant={variant}
            color={color}
            onRemove={onRemove || (() => handleRemove(idx))}
          >
            {label}
          </Tag>
        );
      })}
    </div>
  );
}
