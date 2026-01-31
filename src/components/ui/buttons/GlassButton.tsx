// src/components/ui/buttons/GlassButton.tsx
import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import Magnetic from "../interactive/Magnetic";

const glassButtonVariants = cva(
    "relative isolate all-unset cursor-pointer rounded-lg transition-all duration-300 group",
    {
        variants: {
            variant: {
                default: "bg-white/5 backdrop-blur-sm border border-white/10",
                orange: "bg-[#ff5e1a]/10 backdrop-blur-sm border border-[#ff5e1a]/20",
                cyan: "bg-[#00d1ff]/10 backdrop-blur-sm border border-[#00d1ff]/20",
                industrial: "bg-gradient-to-br from-[#1a1a1a] to-[#0a0a0a] border border-[#333]",
            },
            size: {
                sm: "text-sm",
                default: "text-base",
                lg: "text-lg",
                xl: "text-xl",
                icon: "h-10 w-10",
            },
            glow: {
                none: "",
                orange: "shadow-[0_0_20px_rgba(255,94,26,0.3)] hover:shadow-[0_0_30px_rgba(255,94,26,0.5)]",
                cyan: "shadow-[0_0_20px_rgba(0,209,255,0.3)] hover:shadow-[0_0_30px_rgba(0,209,255,0.5)]",
                white: "shadow-[0_0_20px_rgba(255,255,255,0.2)] hover:shadow-[0_0_30px_rgba(255,255,255,0.3)]",
            },
            hoverEffect: {
                scale: "hover:scale-105",
                lift: "hover:-translate-y-1",
                glow: "hover:shadow-lg",
                none: "",
            },
        },
        defaultVariants: {
            variant: "default",
            size: "default",
            glow: "none",
            hoverEffect: "scale",
        },
    }
);

const glassButtonTextVariants = cva(
    "relative block select-none tracking-tight font-semibold uppercase transition-colors duration-300",
    {
        variants: {
            variant: {
                default: "text-white",
                orange: "text-[#ff8a3d] group-hover:text-white",
                cyan: "text-[#33dcff] group-hover:text-white",
                industrial: "text-white",
            },
            size: {
                sm: "px-4 py-2.5 text-xs",
                default: "px-6 py-3.5",
                lg: "px-8 py-4",
                xl: "px-10 py-5",
                icon: "flex h-10 w-10 items-center justify-center",
            },
        },
        defaultVariants: {
            variant: "default",
            size: "default",
        },
    }
);

export interface GlassButtonProps
    extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof glassButtonVariants> {
    contentClassName?: string;
    icon?: React.ReactNode;
    iconPosition?: "left" | "right";
    loading?: boolean;
    fullWidth?: boolean;
}

const GlassButton = React.forwardRef<HTMLButtonElement, GlassButtonProps>(
    ({
        className,
        children,
        variant = "default",
        size = "default",
        glow = "none",
        hoverEffect = "scale",
        contentClassName,
        icon,
        iconPosition = "right",
        loading = false,
        fullWidth = false,
        disabled,
        ...props
    }, ref) => {
        const ButtonContent = (
            <div className={cn("glass-button-wrap relative", fullWidth && "w-full", className)}>
                <button
                    className={cn(
                        glassButtonVariants({ variant, size, glow, hoverEffect }),
                        "overflow-hidden",
                        fullWidth && "w-full",
                        disabled && "opacity-50 cursor-not-allowed"
                    )}
                    ref={ref}
                    disabled={disabled || loading}
                    {...props}
                >
                    {/* Background gradient overlay on hover */}
                    <div className={cn(
                        "absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300",
                        variant === "orange" && "bg-gradient-to-r from-[#ff5e1a]/20 to-[#ff8a3d]/20",
                        variant === "cyan" && "bg-gradient-to-r from-[#00d1ff]/20 to-[#33dcff]/20",
                        variant === "default" && "bg-white/10",
                    )} />

                    {/* Border glow effect */}
                    <div className={cn(
                        "absolute -inset-[1px] rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300",
                        variant === "orange" && "bg-gradient-to-r from-[#ff5e1a] to-[#ff8a3d]",
                        variant === "cyan" && "bg-gradient-to-r from-[#00d1ff] to-[#33dcff]",
                        "blur-sm"
                    )} />

                    <span
                        className={cn(
                            glassButtonTextVariants({ variant, size }),
                            "relative z-10 flex items-center justify-center gap-2",
                            contentClassName
                        )}
                    >
                        {loading ? (
                            <div className="flex items-center gap-2">
                                <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                                <span>Processing...</span>
                            </div>
                        ) : (
                            <>
                                {icon && iconPosition === "left" && icon}
                                {children}
                                {icon && iconPosition === "right" && icon}
                            </>
                        )}
                    </span>

                    {/* Ripple effect */}
                    <span className="absolute inset-0 overflow-hidden rounded-lg">
                        <span className="absolute top-1/2 left-1/2 h-0 w-0 rounded-full bg-white/10 transition-all duration-500 group-hover:h-96 group-hover:w-96 group-hover:-translate-x-1/2 group-hover:-translate-y-1/2" />
                    </span>
                </button>

                {/* Shadow/glow layer */}
                <div className={cn(
                    "glass-button-shadow absolute inset-0 rounded-lg blur-xl transition-all duration-300",
                    glow === "orange" && "bg-[#ff5e1a]/20 group-hover:bg-[#ff5e1a]/30",
                    glow === "cyan" && "bg-[#00d1ff]/20 group-hover:bg-[#00d1ff]/30",
                    glow === "white" && "bg-white/10 group-hover:bg-white/15",
                    "-z-10"
                )} />
            </div>
        );

        return disabled ? ButtonContent : <Magnetic>{ButtonContent}</Magnetic>;
    }
);

GlassButton.displayName = "GlassButton";

// Pre-styled variants for common use cases
export const IndustrialButton = React.forwardRef<HTMLButtonElement, Omit<GlassButtonProps, 'variant' | 'glow' | 'hoverEffect'>>(
    (props, ref) => (
        <GlassButton
            ref={ref}
            variant="industrial"
            glow="orange"
            hoverEffect="lift"
            {...props}
        />
    )
);

export const MechanicalButton = React.forwardRef<HTMLButtonElement, Omit<GlassButtonProps, 'variant' | 'glow'>>(
    (props, ref) => (
        <GlassButton
            ref={ref}
            variant="orange"
            glow="orange"
            hoverEffect="scale"
            {...props}
        />
    )
);

export const DigitalButton = React.forwardRef<HTMLButtonElement, Omit<GlassButtonProps, 'variant' | 'glow'>>(
    (props, ref) => (
        <GlassButton
            ref={ref}
            variant="cyan"
            glow="cyan"
            hoverEffect="glow"
            {...props}
        />
    )
);

export { GlassButton, glassButtonVariants };
export default GlassButton;
