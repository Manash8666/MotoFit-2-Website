'use client';

import { forwardRef } from 'react';
import { cn } from '@/lib/utils';
import { LucideIcon } from 'lucide-react';

interface IconButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    icon: LucideIcon;
    variant?: 'default' | 'ghost' | 'outline' | 'glass';
    size?: 'sm' | 'md' | 'lg';
    round?: boolean;
    label?: string;
}

const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(
    ({
        icon: Icon,
        variant = 'default',
        size = 'md',
        round = false,
        label,
        className,
        ...props
    }, ref) => {
        const baseStyles = cn(
            'inline-flex items-center justify-center',
            'transition-all duration-200',
            'focus:outline-none focus:ring-2 focus:ring-[#ff5e1a]/50',
            round ? 'rounded-full' : 'rounded-lg'
        );

        const variants = {
            default: cn(
                'bg-[#ff5e1a] text-white',
                'hover:bg-[#ff6b2a]',
                'active:bg-[#e05515]'
            ),
            ghost: cn(
                'text-[#a0a0a0]',
                'hover:text-white hover:bg-white/5'
            ),
            outline: cn(
                'border border-[#333] text-white',
                'hover:border-[#ff5e1a] hover:text-[#ff5e1a]'
            ),
            glass: cn(
                'bg-white/5 text-white backdrop-blur-sm',
                'hover:bg-white/10'
            ),
        };

        const sizes = {
            sm: cn('p-2', label && 'gap-2'),
            md: cn('p-3', label && 'gap-3'),
            lg: cn('p-4', label && 'gap-4'),
        };

        const iconSizes = {
            sm: 'h-4 w-4',
            md: 'h-5 w-5',
            lg: 'h-6 w-6',
        };

        return (
            <button
                ref={ref}
                className={cn(baseStyles, variants[variant], sizes[size], className)}
                aria-label={label}
                {...props}
            >
                <Icon className={iconSizes[size]} />
                {label && <span className="text-sm font-medium">{label}</span>}
            </button>
        );
    }
);

IconButton.displayName = 'IconButton';
export default IconButton;
