import { cn } from '@/lib/utils';

interface BadgeProps {
    variant?: 'default' | 'orange' | 'cyan' | 'success' | 'warning' | 'error';
    size?: 'sm' | 'md' | 'lg';
    glow?: boolean;
    children: React.ReactNode;
    className?: string;
}

export function Badge({
    variant = 'default',
    size = 'md',
    glow = false,
    children,
    className
}: BadgeProps) {
    const baseStyles = 'inline-flex items-center font-medium rounded-full border';

    const variants = {
        default: cn(
            'bg-[#1a1a1a] border-[#333] text-white'
        ),
        orange: cn(
            'bg-[#ff5e1a]/10 border-[#ff5e1a]/20 text-[#ff8a3d]',
            glow && 'shadow-sm shadow-[#ff5e1a]/20'
        ),
        cyan: cn(
            'bg-[#00d1ff]/10 border-[#00d1ff]/20 text-[#33dcff]',
            glow && 'shadow-sm shadow-[#00d1ff]/20'
        ),
        success: cn(
            'bg-[#00ff88]/10 border-[#00ff88]/20 text-[#00ff88]',
            glow && 'shadow-sm shadow-[#00ff88]/20'
        ),
        warning: cn(
            'bg-[#ffcc00]/10 border-[#ffcc00]/20 text-[#ffcc00]',
            glow && 'shadow-sm shadow-[#ffcc00]/20'
        ),
        error: cn(
            'bg-[#ff3366]/10 border-[#ff3366]/20 text-[#ff6688]',
            glow && 'shadow-sm shadow-[#ff3366]/20'
        ),
    };

    const sizes = {
        sm: 'px-2 py-1 text-xs',
        md: 'px-3 py-1.5 text-sm',
        lg: 'px-4 py-2 text-base',
    };

    return (
        <span className={cn(baseStyles, variants[variant], sizes[size], className)}>
            {children}
        </span>
    );
}
