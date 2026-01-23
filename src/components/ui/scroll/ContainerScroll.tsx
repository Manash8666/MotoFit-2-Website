"use client";
import React, { useRef, useEffect } from "react";
import { useScroll, useTransform, motion, MotionValue } from "framer-motion";
import { cn } from "@/lib/utils";

export const ContainerScroll = ({
  titleComponent,
  children,
  variant = "default",
  height = "60rem",
  perspective = "1000px",
  className,
}: {
  titleComponent: string | React.ReactNode;
  children: React.ReactNode;
  variant?: "default" | "mechanical" | "digital" | "industrial";
  height?: "60rem" | "70rem" | "80rem" | "90rem";
  perspective?: string;
  className?: string;
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });
  const [isMobile, setIsMobile] = React.useState(false);

  React.useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => {
      window.removeEventListener("resize", checkMobile);
    };
  }, []);

  const scaleDimensions = () => {
    return isMobile ? [0.85, 1] : [1.05, 1];
  };

  const rotateX = useTransform(scrollYProgress, [0, 1], isMobile ? [5, 0] : [20, 0]);
  const rotateY = useTransform(scrollYProgress, [0, 1], isMobile ? [2, 0] : [5, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], scaleDimensions());
  const translateY = useTransform(scrollYProgress, [0, 1], [0, -100]);

  // Color variants based on theme
  const variants = {
    default: {
      border: "border-[#1a1a1a]",
      hoverBorder: "group-hover:border-[#333333]",
      bg: "bg-[#0a0a0a]",
      innerBg: "bg-[#050505]",
      shadow: "shadow-[0_0_60px_rgba(255,94,26,0.15)]",
      accentShadow: "shadow-[0_0_30px_rgba(255,94,26,0.3)]",
    },
    mechanical: {
      border: "border-[#ff5e1a]/20",
      hoverBorder: "group-hover:border-[#ff5e1a]/40",
      bg: "bg-gradient-to-br from-[#0a0a0a] to-[#1a0a00]",
      innerBg: "bg-gradient-to-b from-[#050505] to-[#0a0500]",
      shadow: "shadow-[0_0_60px_rgba(255,94,26,0.2)]",
      accentShadow: "shadow-[0_0_40px_rgba(255,94,26,0.5)]",
    },
    digital: {
      border: "border-[#00d1ff]/20",
      hoverBorder: "group-hover:border-[#00d1ff]/40",
      bg: "bg-gradient-to-br from-[#0a0a0a] to-[#00101a]",
      innerBg: "bg-gradient-to-b from-[#050505] to-[#000a0f]",
      shadow: "shadow-[0_0_60px_rgba(0,209,255,0.15)]",
      accentShadow: "shadow-[0_0_30px_rgba(0,209,255,0.3)]",
    },
    industrial: {
      border: "border-[#333333]",
      hoverBorder: "group-hover:border-[#666666]",
      bg: "bg-gradient-to-br from-[#1a1a1a] via-[#0a0a0a] to-[#1a1a1a]",
      innerBg: "bg-[#050505]",
      shadow: "shadow-[0_0_40px_rgba(0,0,0,0.8)]",
      accentShadow: "shadow-[inset_0_1px_0_rgba(255,255,255,0.1),0_0_30px_rgba(255,94,26,0.2)]",
    },
  };

  const currentVariant = variants[variant];

  return (
    <div
      className={cn(
        `h-[${height}] flex items-center justify-center relative p-2 md:p-20`,
        "bg-gradient-to-b from-[#050505] to-[#0a0a0a]",
        className
      )}
      ref={containerRef}
    >
      <div
        className="py-10 md:py-40 w-full relative group"
        style={{
          perspective: perspective,
        }}
      >
        <Header
          translate={translateY}
          titleComponent={titleComponent}
          variant={variant}
        />
        <ScrollCard
          rotateX={rotateX}
          rotateY={rotateY}
          scale={scale}
          translateY={translateY}
          variant={variant}
          currentVariant={currentVariant}
        >
          {children}
        </ScrollCard>

        {/* Grid Overlay */}
        <div className="absolute inset-0 pointer-events-none z-0">
          <div className="absolute inset-0 grid grid-cols-12 gap-4">
            {[...Array(12)].map((_, i) => (
              <div
                key={i}
                className="border-r border-[#1a1a1a]/30 last:border-r-0"
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export const Header = ({
  translate,
  titleComponent,
  variant = "default"
}: {
  translate: MotionValue<number>;
  titleComponent: string | React.ReactNode;
  variant?: string;
}) => {
  return (
    <motion.div
      style={{
        translateY: translate,
      }}
      className="max-w-6xl mx-auto text-center relative z-10"
    >
      <div className="inline-block">
        {variant === "mechanical" && (
          <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-24 h-px bg-gradient-to-r from-transparent via-[#ff5e1a] to-transparent" />
        )}
        {variant === "digital" && (
          <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-24 h-px bg-gradient-to-r from-transparent via-[#00d1ff] to-transparent" />
        )}
        <div className={cn(
          "relative",
          variant === "mechanical" && "text-[#ff8a3d]",
          variant === "digital" && "text-[#33dcff]",
          variant === "industrial" && "text-white",
          variant === "default" && "text-white"
        )}>
          {titleComponent}
        </div>
      </div>
    </motion.div>
  );
};

export const ScrollCard = ({
  rotateX,
  rotateY,
  scale,
  translateY,
  variant = "default",
  currentVariant,
  children,
}: {
  rotateX: MotionValue<number>;
  rotateY: MotionValue<number>;
  scale: MotionValue<number>;
  translateY: MotionValue<number>;
  variant?: string;
  currentVariant: any;
  children: React.ReactNode;
}) => {
  // Dynamic shadow based on variant
  const getBoxShadow = () => {
    switch (variant) {
      case "mechanical":
        return "0 0 #0000004d, 0 9px 20px rgba(255, 94, 26, 0.1), 0 37px 37px rgba(255, 94, 26, 0.05), 0 84px 50px rgba(0, 0, 0, 0.4), 0 149px 60px rgba(0, 0, 0, 0.2), 0 233px 65px rgba(0, 0, 0, 0.1)";
      case "digital":
        return "0 0 #0000004d, 0 9px 20px rgba(0, 209, 255, 0.1), 0 37px 37px rgba(0, 209, 255, 0.05), 0 84px 50px rgba(0, 0, 0, 0.4), 0 149px 60px rgba(0, 0, 0, 0.2), 0 233px 65px rgba(0, 0, 0, 0.1)";
      default:
        return "0 0 #0000004d, 0 9px 20px #0000004a, 0 37px 37px #00000042, 0 84px 50px #00000026, 0 149px 60px #0000000a, 0 233px 65px #00000003";
    }
  };

  const [isHovered, setIsHovered] = React.useState(false);

  return (
    <motion.div
      style={{
        rotateX,
        rotateY,
        scale,
        translateY,
        boxShadow: getBoxShadow(),
      }}
      className={cn(
        "max-w-6xl -mt-12 mx-auto h-[30rem] md:h-[40rem] w-full border-2 p-2 md:p-6 rounded-[24px] relative group/card transition-all duration-300",
        currentVariant.border,
        currentVariant.hoverBorder,
        currentVariant.bg,
        "backdrop-blur-sm"
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Glow effect on hover */}
      {variant === "mechanical" && (
        <div className={cn(
          "absolute -inset-1 rounded-[28px] blur-xl opacity-0 transition-opacity duration-500",
          "bg-gradient-to-r from-[#ff5e1a]/20 via-[#ff8a3d]/10 to-transparent",
          isHovered && "opacity-70"
        )} />
      )}
      {variant === "digital" && (
        <div className={cn(
          "absolute -inset-1 rounded-[28px] blur-xl opacity-0 transition-opacity duration-500",
          "bg-gradient-to-r from-[#00d1ff]/20 via-[#33dcff]/10 to-transparent",
          isHovered && "opacity-70"
        )} />
      )}

      {/* Inner border effect */}
      <div className={cn(
        "absolute inset-0 rounded-[24px] border pointer-events-none",
        variant === "mechanical" && "border-[#ff5e1a]/10",
        variant === "digital" && "border-[#00d1ff]/10",
        variant === "industrial" && "border-[#333333]/50",
        variant === "default" && "border-[#1a1a1a]"
      )} />

      {/* Corner accents */}
      <div className="absolute -top-2 -left-2 w-4 h-4 border-t-2 border-l-2 rounded-tl-lg border-[#ff5e1a]/30" />
      <div className="absolute -top-2 -right-2 w-4 h-4 border-t-2 border-r-2 rounded-tr-lg border-[#ff5e1a]/30" />
      <div className="absolute -bottom-2 -left-2 w-4 h-4 border-b-2 border-l-2 rounded-bl-lg border-[#00d1ff]/30" />
      <div className="absolute -bottom-2 -right-2 w-4 h-4 border-b-2 border-r-2 rounded-br-lg border-[#00d1ff]/30" />

      <div className={cn(
        "h-full w-full overflow-hidden rounded-2xl md:rounded-2xl md:p-4 relative z-10",
        currentVariant.innerBg,
        variant === "mechanical" && "border border-[#ff5e1a]/5",
        variant === "digital" && "border border-[#00d1ff]/5"
      )}>
        {children}

        {/* Scan line effect for digital variant */}
        {variant === "digital" && (
          <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#00d1ff] to-transparent animate-scan" />
        )}
      </div>

      {/* Floating particles background */}
      <div className="absolute inset-0 rounded-[24px] overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className={cn(
              "absolute rounded-full",
              variant === "mechanical" && "bg-[#ff5e1a]",
              variant === "digital" && "bg-[#00d1ff]",
              variant === "default" && "bg-[#333333]"
            )}
            style={{
              width: Math.random() * 4 + 1 + 'px',
              height: Math.random() * 4 + 1 + 'px',
              left: Math.random() * 100 + '%',
              top: Math.random() * 100 + '%',
              opacity: Math.random() * 0.3 + 0.1,
              animation: `float ${Math.random() * 10 + 10}s infinite ease-in-out`,
              animationDelay: `${Math.random() * 5}s`,
            }}
          />
        ))}
      </div>
    </motion.div>
  );
};

// Preset variants for common use cases
export const MotorcycleGalleryScroll = ({
  titleComponent,
  children,
}: {
  titleComponent: string | React.ReactNode;
  children: React.ReactNode;
}) => (
  <ContainerScroll
    titleComponent={titleComponent}
    children={children}
    variant="mechanical"
    height="70rem"
    perspective="1200px"
    className="bg-gradient-to-b from-[#050505] via-[#0a0a0a] to-[#050505]"
  />
);

export const TechDemoScroll = ({
  titleComponent,
  children,
}: {
  titleComponent: string | React.ReactNode;
  children: React.ReactNode;
}) => (
  <ContainerScroll
    titleComponent={titleComponent}
    children={children}
    variant="digital"
    height="80rem"
    perspective="1500px"
    className="bg-gradient-to-b from-[#050505] via-[#0a0a0a] to-[#00101a]"
  />
);

export const WorkshopScroll = ({
  titleComponent,
  children,
}: {
  titleComponent: string | React.ReactNode;
  children: React.ReactNode;
}) => (
  <ContainerScroll
    titleComponent={titleComponent}
    children={children}
    variant="industrial"
    height="60rem"
    perspective="1000px"
    className="bg-gradient-to-b from-[#050505] to-[#1a1a1a]"
  />
);
