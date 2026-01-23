import { cn } from '@/lib/utils';

interface ProgressBarProps {
    value: number;
    max?: number;
    variant?: 'default' | 'gradient' | 'striped';
    color?: 'orange' | 'cyan' | 'success' | 'warning';
    size?: 'sm' | 'md' | 'lg';
    showLabel?: boolean;
    labelPosition?: 'inside' | 'outside';
    className?: string;
}

export function ProgressBar({
    value,
    max = 100,
    variant = 'default',
    color = 'orange',
    size = 'md',
    showLabel = false,
    labelPosition = 'outside',
    className
}: ProgressBarProps) {
    const percentage = Math.min(100, Math.max(0, (value / max) * 100));

    const baseStyles = 'overflow-hidden rounded-full bg-[#1a1a1a]';

    const sizes = {
        sm: 'h-1',
        md: 'h-2',
        lg: 'h-3',
    };

    const labelSizes = {
        sm: 'text-xs',
        md: 'text-sm',
        lg: 'text-base',
    };

    const colorClasses = {
        orange: 'bg-[#ff5e1a]',
        cyan: 'bg-[#00d1ff]',
        success: 'bg-[#00ff88]',
        warning: 'bg-[#ffcc00]',
    };

    const variants = {
        default: colorClasses[color],
        gradient: cn(
            color === 'orange' && 'bg-gradient-to-r from-[#ff5e1a] to-[#ff8a3d]',
            color === 'cyan' && 'bg-gradient-to-r from-[#00d1ff] to-[#33dcff]',
            color === 'success' && 'bg-gradient-to-r from-[#00ff88] to-[#66ffaa]',
            color === 'warning' && 'bg-gradient-to-r from-[#ffcc00] to-[#ffdd66]'
        ),
        striped: cn(
            colorClasses[color],
            'bg-striped animate-stripes'
        ),
    };

    return (
        <div className={cn('w-full', className)}>
            {showLabel && labelPosition === 'outside' && (
                <div className="flex justify-between mb-2">
                    <span className={cn('text-[#999999]', labelSizes[size])}>Progress</span>
                    <span className={cn('font-medium', labelSizes[size])}>{percentage.toFixed(0)}%</span>
                </div>
            )}

            <div className={cn(baseStyles, sizes[size])}>
                <div
                    className={cn(
                        'h-full rounded-full transition-all duration-500 ease-out',
                        variants[variant]
                    )}
                    style={{ width: `${percentage}%` }}
                >
                    {showLabel && labelPosition === 'inside' && (
                        <div className="flex items-center justify-end h-full px-2">
                            <span className={cn('text-white font-medium', labelSizes[size])}>
                                {percentage.toFixed(0)}%
                            </span>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
