import { cn } from '@/lib/utils';

interface MotoIconProps {
    name: 'engine' | 'gears' | 'wrench' | 'chip' | 'dashboard' | 'exhaust';
    variant?: 'outline' | 'solid' | 'duotone';
    size?: 'sm' | 'md' | 'lg' | 'xl';
    color?: 'orange' | 'cyan' | 'white' | 'gray';
    className?: string;
}

export function MotoIcon({
    name,
    variant = 'outline',
    size = 'md',
    color = 'orange',
    className
}: MotoIconProps) {
    const sizes = {
        sm: 'h-4 w-4',
        md: 'h-6 w-6',
        lg: 'h-8 w-8',
        xl: 'h-12 w-12',
    };

    const colors = {
        orange: 'text-[#ff5e1a]',
        cyan: 'text-[#00d1ff]',
        white: 'text-white',
        gray: 'text-[#999999]',
    };

    const icons = {
        engine: (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M8 4h8l2 2h4v4l-2 2v6l-2 2H8l-2-2v-6L4 10V6l4-4z" />
                <circle cx="12" cy="12" r="2" />
                <path d="M12 10v4" />
                <path d="M10 12h4" />
            </svg>
        ),
        gears: (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <circle cx="12" cy="12" r="3" />
                <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
            </svg>
        ),
        wrench: (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
            </svg>
        ),
        chip: (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <rect x="4" y="4" width="16" height="16" rx="2" />
                <path d="M9 4v16" />
                <path d="M15 4v16" />
                <path d="M4 9h16" />
                <path d="M4 15h16" />
            </svg>
        ),
        dashboard: (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <rect x="3" y="3" width="18" height="18" rx="2" />
                <path d="M9 12h6" />
                <path d="M12 9v6" />
                <circle cx="12" cy="12" r="2" />
            </svg>
        ),
        exhaust: (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M4 12h16" />
                <path d="M4 12v6a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-6" />
                <path d="M8 12V8a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v4" />
                <path d="M10 16h4" />
            </svg>
        ),
    };

    return (
        <div className={cn(
            'inline-flex items-center justify-center',
            sizes[size],
            colors[color],
            variant === 'duotone' && 'opacity-70',
            className
        )}>
            {icons[name]}
        </div>
    );
}
