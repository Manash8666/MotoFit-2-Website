import { cn } from '@/lib/utils';

interface LoadingProps {
    variant?: 'spinner' | 'dots' | 'pulse' | 'bars';
    size?: 'sm' | 'md' | 'lg';
    color?: 'orange' | 'cyan' | 'white';
    text?: string;
    className?: string;
}

export function Loading({
    variant = 'spinner',
    size = 'md',
    color = 'orange',
    text,
    className
}: LoadingProps) {
    const sizes = {
        sm: 'h-4 w-4',
        md: 'h-8 w-8',
        lg: 'h-12 w-12',
    };

    const colors = {
        orange: 'text-[#ff5e1a]',
        cyan: 'text-[#00d1ff]',
        white: 'text-white',
    };

    const variants = {
        spinner: (
            <svg className={cn('animate-spin', sizes[size], colors[color])} fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
            </svg>
        ),
        dots: (
            <div className={cn('flex items-center gap-1', sizes[size])}>
                {[0, 1, 2].map((i) => (
                    <div
                        key={i}
                        className={cn(
                            'h-1/3 w-1/3 rounded-full bg-current',
                            'animate-bounce',
                            colors[color]
                        )}
                        style={{ animationDelay: `${i * 0.1}s` }}
                    />
                ))}
            </div>
        ),
        pulse: (
            <div className={cn('rounded-full', sizes[size], colors[color], 'animate-pulse bg-current')} />
        ),
        bars: (
            <div className={cn('flex items-center justify-center gap-1', sizes[size])}>
                {[0, 1, 2, 3, 4].map((i) => (
                    <div
                        key={i}
                        className={cn(
                            'h-full w-1 rounded-full bg-current',
                            'animate-grow-shrink',
                            colors[color]
                        )}
                        style={{ animationDelay: `${i * 0.1}s` }}
                    />
                ))}
            </div>
        ),
    };

    return (
        <div className={cn('flex items-center gap-3', className)}>
            {variants[variant]}
            {text && <span className="text-sm text-[#999999]">{text}</span>}
        </div>
    );
}
