'use client';

import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';

interface MeterProps {
    value: number;
    min?: number;
    max?: number;
    label?: string;
    units?: string;
    variant?: 'radial' | 'linear' | 'semi';
    size?: 'sm' | 'md' | 'lg';
    showValue?: boolean;
    className?: string;
}

export function Meter({
    value,
    min = 0,
    max = 100,
    label,
    units,
    variant = 'radial',
    size = 'md',
    showValue = true,
    className
}: MeterProps) {
    const [animatedValue, setAnimatedValue] = useState(min);

    const percentage = ((value - min) / (max - min)) * 100;
    const normalizedValue = Math.min(max, Math.max(min, value));

    useEffect(() => {
        const timer = setTimeout(() => {
            setAnimatedValue(normalizedValue);
        }, 100);

        return () => clearTimeout(timer);
    }, [normalizedValue]);

    const sizes = {
        sm: 'w-24 h-24',
        md: 'w-32 h-32',
        lg: 'w-48 h-48',
    };

    const strokeWidths = {
        sm: 4,
        md: 6,
        lg: 8,
    };

    const radius = {
        sm: 36,
        md: 48,
        lg: 72,
    };

    const circumference = 2 * Math.PI * radius[size];
    const strokeDashoffset = circumference - (percentage / 100) * circumference;

    if (variant === 'radial') {
        return (
            <div className={cn('relative', sizes[size], className)}>
                <svg className="w-full h-full -rotate-90">
                    {/* Background circle */}
                    <circle
                        cx="50%"
                        cy="50%"
                        r={radius[size]}
                        stroke="#1a1a1a"
                        strokeWidth={strokeWidths[size]}
                        fill="none"
                    />

                    {/* Progress circle */}
                    <circle
                        cx="50%"
                        cy="50%"
                        r={radius[size]}
                        stroke="#ff5e1a"
                        strokeWidth={strokeWidths[size]}
                        fill="none"
                        strokeLinecap="round"
                        strokeDasharray={circumference}
                        strokeDashoffset={strokeDashoffset}
                        className="transition-all duration-1000 ease-out"
                    />
                </svg>

                {/* Center content */}
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                    {showValue && (
                        <div className="text-center">
                            <div className="text-2xl font-bold tracking-tight">
                                {animatedValue.toFixed(0)}
                                {units && <span className="text-sm ml-1">{units}</span>}
                            </div>
                            {label && (
                                <div className="text-xs text-[#999999] uppercase tracking-widest mt-1">
                                    {label}
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>
        );
    }

    // Linear meter variant
    return (
        <div className={cn('space-y-2', className)}>
            {label && (
                <div className="flex justify-between text-sm">
                    <span className="text-[#999999]">{label}</span>
                    {showValue && (
                        <span className="font-medium">
                            {animatedValue.toFixed(0)}{units}
                        </span>
                    )}
                </div>
            )}

            <div className="relative h-2 bg-[#1a1a1a] rounded-full overflow-hidden">
                <div
                    className={cn(
                        'absolute left-0 top-0 h-full rounded-full',
                        'bg-gradient-to-r from-[#ff5e1a] to-[#ff8a3d]',
                        'transition-all duration-1000 ease-out'
                    )}
                    style={{ width: `${percentage}%` }}
                />
            </div>

            <div className="flex justify-between text-xs text-[#666666]">
                <span>{min}{units}</span>
                <span>{max}{units}</span>
            </div>
        </div>
    );
}
