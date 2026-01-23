'use client';

import { cn } from '@/lib/utils';

interface ToggleProps {
    enabled: boolean;
    onChange: (enabled: boolean) => void;
    variant?: 'default' | 'glow' | 'minimal';
    size?: 'sm' | 'md' | 'lg';
    label?: string;
    className?: string;
}

export function Toggle({
    enabled,
    onChange,
    variant = 'default',
    size = 'md',
    label,
    className
}: ToggleProps) {
    const baseStyles = 'relative inline-flex items-center cursor-pointer transition-colors';

    const variants = {
        default: cn(
            'bg-[#333]',
            enabled && 'bg-[#ff5e1a]'
        ),
        glow: cn(
            'bg-[#333] shadow-inner',
            enabled && 'bg-[#ff5e1a] shadow-[0_0_20px_rgba(255,94,26,0.5)]'
        ),
        minimal: cn(
            'bg-transparent border border-[#333]',
            enabled && 'border-[#ff5e1a]'
        ),
    };

    const sizes = {
        sm: 'w-8 h-4',
        md: 'w-12 h-6',
        lg: 'w-16 h-8',
    };

    const toggleSizes = {
        sm: 'h-3 w-3',
        md: 'h-4 w-4',
        lg: 'h-6 w-6',
    };

    const togglePositions = {
        sm: enabled ? 'translate-x-4' : 'translate-x-1',
        md: enabled ? 'translate-x-6' : 'translate-x-1',
        lg: enabled ? 'translate-x-8' : 'translate-x-1',
    };

    return (
        <div className="flex items-center gap-3">
            {label && (
                <span className="text-sm text-[#999999]">{label}</span>
            )}

            <button
                type="button"
                className={cn(baseStyles, variants[variant], sizes[size], 'rounded-full', className)}
                onClick={() => onChange(!enabled)}
                aria-pressed={enabled}
            >
                <span className="sr-only">Toggle</span>

                <span
                    className={cn(
                        'inline-block transform transition-transform duration-200',
                        'bg-white rounded-full',
                        toggleSizes[size],
                        togglePositions[size]
                    )}
                />
            </button>
        </div>
    );
}
