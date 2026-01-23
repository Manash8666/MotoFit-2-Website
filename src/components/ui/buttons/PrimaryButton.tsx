'use client';

import { forwardRef } from 'react';
import { cn } from '@/lib/utils';
import { ArrowRight } from 'lucide-react';

interface PrimaryButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'default' | 'orange' | 'cyan' | 'outline';
    size?: 'sm' | 'md' | 'lg' | 'xl';
    icon?: React.ReactNode;
    iconPosition?: 'left' | 'right';
    isLoading?: boolean;
    glow?: boolean;
}

const PrimaryButton = forwardRef<HTMLButtonElement, PrimaryButtonProps>(
    ({
        children,
        variant = 'default',
        size = 'md',
        icon,
        iconPosition = 'right',
        isLoading = false,
        glow = true,
        className,
        disabled,
        ...props
    }, ref) => {
        const baseStyles = 'relative group font-semibold rounded-lg transition-all duration-300 overflow-hidden';

        const variants = {
            default: cn(
                'bg-gradient-to-r from-[#ff5e1a] to-[#00d1ff]',
                'hover:from-[#ff6b2a] hover:to-[#1ad6ff]',
                'active:from-[#e05515] active:to-[#00c2eb]',
                'text-white',
                'shadow-lg'
            ),
            orange: cn(
                'bg-gradient-to-r from-[#ff5e1a] to-[#ff8a3d]',
                'hover:from-[#ff6b2a] hover:to-[#ff9752]',
                'active:from-[#e05515] active:to-[#ff7d2f]',
                'text-white',
                'shadow-lg shadow-[#ff5e1a]/20'
            ),
            cyan: cn(
                'bg-gradient-to-r from-[#00d1ff] to-[#33dcff]',
                'hover:from-[#1ad6ff] hover:to-[#4ce1ff]',
                'active:from-[#00c2eb] active:to-[#29d7ff]',
                'text-[#050505]',
                'shadow-lg shadow-[#00d1ff]/20'
            ),
            outline: cn(
                'bg-transparent',
                'border-2 border-[#333]',
                'hover:border-[#ff5e1a]',
                'text-white',
                'backdrop-blur-sm'
            ),
        };

        const sizes = {
            sm: 'px-4 py-2 text-sm',
            md: 'px-6 py-3 text-base',
            lg: 'px-8 py-4 text-lg',
            xl: 'px-12 py-6 text-xl',
        };

        const glowEffect = glow ? cn(
            'before:absolute before:inset-0 before:rounded-lg',
            'before:bg-gradient-to-r before:from-[#ff5e1a] before:to-[#00d1ff]',
            'before:opacity-0 before:blur-xl',
            'before:transition-opacity before:duration-500',
            'hover:before:opacity-40',
            'after:absolute after:inset-[-2px] after:rounded-lg',
            'after:bg-gradient-to-r after:from-[#ff5e1a] after:to-[#00d1ff]',
            'after:opacity-0 after:blur-md',
            'after:transition-opacity after:duration-500',
            'hover:after:opacity-30'
        ) : '';

        return (
            <button
                ref={ref}
                disabled={disabled || isLoading}
                className={cn(
                    baseStyles,
                    variants[variant],
                    sizes[size],
                    glowEffect,
                    (disabled || isLoading) && 'opacity-50 cursor-not-allowed',
                    className
                )}
                {...props}
            >
                <span className="relative z-10 flex items-center justify-center gap-2">
                    {isLoading ? (
                        <>
                            <svg className="animate-spin h-4 w-4 text-current" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                            </svg>
                            <span>Processing...</span>
                        </>
                    ) : (
                        <>
                            {icon && iconPosition === 'left' && icon}
                            {children}
                            {icon && iconPosition === 'right' && icon}
                            {!icon && variant !== 'outline' && (
                                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                            )}
                        </>
                    )}
                </span>

                {/* Ripple effect */}
                <span className="absolute inset-0 overflow-hidden rounded-lg">
                    <span className="absolute top-1/2 left-1/2 h-0 w-0 rounded-full bg-white/20 transition-all duration-500 group-hover:h-96 group-hover:w-96 group-hover:-translate-x-1/2 group-hover:-translate-y-1/2" />
                </span>
            </button>
        );
    }
);

PrimaryButton.displayName = 'PrimaryButton';
export default PrimaryButton;
