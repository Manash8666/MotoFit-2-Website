import { cn } from '@/lib/utils';
import { X } from 'lucide-react';

interface TagProps {
    variant?: 'default' | 'outline' | 'solid';
    color?: 'orange' | 'cyan' | 'gray';
    removable?: boolean;
    onRemove?: () => void;
    children: React.ReactNode;
    className?: string;
}

export function Tag({
    variant = 'default',
    color = 'gray',
    removable = false,
    onRemove,
    children,
    className
}: TagProps) {
    const baseStyles = 'inline-flex items-center gap-1.5 rounded-md font-mono text-xs uppercase tracking-widest transition-colors';

    const variants = {
        default: cn(
            color === 'orange' && 'text-[#ff8a3d] hover:text-[#ffb07a]',
            color === 'cyan' && 'text-[#33dcff] hover:text-[#66e7ff]',
            color === 'gray' && 'text-[#999999] hover:text-[#cccccc]'
        ),
        outline: cn(
            'border px-2 py-1',
            color === 'orange' && 'border-[#ff5e1a]/30 text-[#ff8a3d] hover:border-[#ff5e1a]/50',
            color === 'cyan' && 'border-[#00d1ff]/30 text-[#33dcff] hover:border-[#00d1ff]/50',
            color === 'gray' && 'border-[#333] text-[#999999] hover:border-[#666]'
        ),
        solid: cn(
            'px-2 py-1',
            color === 'orange' && 'bg-[#ff5e1a]/10 text-[#ff8a3d]',
            color === 'cyan' && 'bg-[#00d1ff]/10 text-[#33dcff]',
            color === 'gray' && 'bg-[#333] text-[#999999]'
        ),
    };

    return (
        <span className={cn(baseStyles, variants[variant], className)}>
            {children}
            {removable && (
                <button
                    onClick={onRemove}
                    className="p-0.5 rounded hover:bg-white/10 transition-colors"
                    aria-label="Remove tag"
                >
                    <X className="h-3 w-3" />
                </button>
            )}
        </span>
    );
}
