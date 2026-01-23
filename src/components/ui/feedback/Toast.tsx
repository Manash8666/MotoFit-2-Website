'use client';

import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';
import { X, CheckCircle, AlertCircle, Info, AlertTriangle } from 'lucide-react';

interface ToastProps {
    id: string;
    title: string;
    message?: string;
    type?: 'success' | 'error' | 'warning' | 'info';
    duration?: number;
    onClose: (id: string) => void;
}

export function Toast({
    id,
    title,
    message,
    type = 'info',
    duration = 5000,
    onClose
}: ToastProps) {
    const [isVisible, setIsVisible] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsVisible(false);
            setTimeout(() => onClose(id), 300);
        }, duration);

        return () => clearTimeout(timer);
    }, [id, duration, onClose]);

    const typeConfig = {
        success: {
            icon: CheckCircle,
            bg: 'bg-[#00ff88]/10',
            border: 'border-[#00ff88]/20',
            iconColor: 'text-[#00ff88]',
        },
        error: {
            icon: AlertCircle,
            bg: 'bg-[#ff3366]/10',
            border: 'border-[#ff3366]/20',
            iconColor: 'text-[#ff3366]',
        },
        warning: {
            icon: AlertTriangle,
            bg: 'bg-[#ffcc00]/10',
            border: 'border-[#ffcc00]/20',
            iconColor: 'text-[#ffcc00]',
        },
        info: {
            icon: Info,
            bg: 'bg-[#00d1ff]/10',
            border: 'border-[#00d1ff]/20',
            iconColor: 'text-[#00d1ff]',
        },
    };

    const { icon: Icon, bg, border, iconColor } = typeConfig[type];

    return (
        <div
            className={cn(
                'relative p-4 rounded-lg border backdrop-blur-sm',
                'transform transition-all duration-300',
                isVisible ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0',
                bg,
                border
            )}
        >
            <button
                onClick={() => {
                    setIsVisible(false);
                    setTimeout(() => onClose(id), 300);
                }}
                className="absolute top-2 right-2 p-1 rounded hover:bg-white/10 transition-colors"
            >
                <X className="h-4 w-4" />
            </button>

            <div className="flex items-start gap-3 pr-6">
                <Icon className={cn('h-5 w-5 flex-shrink-0', iconColor)} />

                <div className="flex-1">
                    <div className="font-semibold text-sm">{title}</div>
                    {message && (
                        <div className="text-sm text-[#999999] mt-1">{message}</div>
                    )}
                </div>
            </div>

            {/* Progress bar */}
            <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-current/20 rounded-b-lg overflow-hidden">
                <div
                    className="h-full bg-current rounded-b-lg transition-all duration-100 ease-linear"
                    style={{ width: isVisible ? '0%' : '100%' }}
                />
            </div>
        </div>
    );
}
