'use client';

import { cn } from '@/lib/utils';
import { LucideIcon } from 'lucide-react';

interface StatCardProps {
    value: string | number;
    label: string;
    icon?: LucideIcon;
    trend?: 'up' | 'down' | 'neutral';
    trendValue?: string;
    variant?: 'default' | 'glass' | 'minimal';
    className?: string;
}

export function StatCard({
    value,
    label,
    icon: Icon,
    trend,
    trendValue,
    variant = 'default',
    className
}: StatCardProps) {
    const baseStyles = 'rounded-xl p-6 transition-all duration-300 hover:scale-[1.02]';

    const variants = {
        default: cn(
            'bg-[#0a0a0a] border border-[#1a1a1a]',
            'hover:border-[#333]'
        ),
        glass: cn(
            'bg-white/5 backdrop-blur-sm border border-white/10',
            'hover:border-white/20'
        ),
        minimal: cn(
            'bg-transparent'
        ),
    };

    const trendColors = {
        up: 'text-[#00ff88]',
        down: 'text-[#ff3366]',
        neutral: 'text-[#00d1ff]',
    };

    return (
        <div className={cn(baseStyles, variants[variant], className)}>
            <div className="flex items-start justify-between mb-4">
                {Icon && (
                    <div className={cn(
                        'p-2 rounded-lg',
                        variant === 'glass' ? 'bg-white/10' : 'bg-[#1a1a1a]'
                    )}>
                        <Icon className="h-5 w-5 text-[#ff5e1a]" />
                    </div>
                )}

                {trend && trendValue && (
                    <div className={cn('flex items-center gap-1 text-sm', trendColors[trend])}>
                        {trend === 'up' ? '↗' : trend === 'down' ? '↘' : '→'}
                        <span>{trendValue}</span>
                    </div>
                )}
            </div>

            <div className="space-y-2">
                <div className="text-3xl font-bold tracking-tight">{value}</div>
                <div className="text-sm text-[#999999] uppercase tracking-widest">{label}</div>
            </div>
        </div>
    );
}
