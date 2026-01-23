'use client';

import React, {
    CSSProperties,
    ReactNode,
    forwardRef,
    useEffect,
    useImperativeHandle,
    useLayoutEffect,
    useMemo,
    useRef,
    useState,
} from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { cn } from "@/lib/utils";
import { MotoIcon } from "@/components/ui/icons/MotoIcons";

if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
}

type Section = {
    id?: string;
    title: string | ReactNode;
    subtitle?: string;
    background?: string;
    leftLabel?: ReactNode;
    rightLabel?: ReactNode;
    renderBackground?: (active: boolean, previous: boolean) => ReactNode;
    icon?: 'engine' | 'gears' | 'wrench' | 'chip' | 'dashboard' | 'exhaust';
};

type Colors = Partial<{
    text: string;
    overlay: string;
    pageBg: string;
    stageBg: string;
    accent: string;
    secondary: string;
}>;

type Durations = Partial<{
    change: number;
    snap: number;
}>;

export type FullScreenFXAPI = {
    next: () => void;
    prev: () => void;
    goTo: (index: number) => void;
    getIndex: () => number;
    refresh: () => void;
};

export type FullScreenFXProps = {
    sections: Section[];
    className?: string;
    style?: CSSProperties;

    fontFamily?: string;
    header?: ReactNode;
    footer?: ReactNode;
    gap?: number;
    gridPaddingX?: number;

    showProgress?: boolean;
    debug?: boolean;

    durations?: Durations;
    reduceMotion?: boolean;
    smoothScroll?: boolean;

    bgTransition?: "fade" | "slide" | "wipe" | "industrial";
    parallaxAmount?: number;

    currentIndex?: number;
    onIndexChange?: (index: number) => void;
    initialIndex?: number;

    colors?: Colors;

    apiRef?: React.Ref<FullScreenFXAPI>;
    ariaLabel?: string;

    variant?: 'default' | 'mechanical' | 'digital' | 'gallery';
};

const clamp = (n: number, lo: number, hi: number) => Math.max(lo, Math.min(hi, n));

export const FullScreenScrollFX = forwardRef<HTMLDivElement, FullScreenFXProps>(
    (
        {
            sections,
            className,
            style,
            fontFamily = '"Manrope", system-ui, -apple-system, sans-serif',
            header,
            footer,
            gap = 2,
            gridPaddingX = 4,
            showProgress = true,
            debug = false,
            durations = { change: 0.8, snap: 800 },
            reduceMotion,
            smoothScroll = false,
            bgTransition = "industrial",
            parallaxAmount = 5,
            currentIndex,
            onIndexChange,
            initialIndex = 0,
            colors = {
                text: "#ffffff",
                overlay: "rgba(0,0,0,0.6)",
                pageBg: "#050505",
                stageBg: "#0a0a0a",
                accent: "#ff5e1a",
                secondary: "#00d1ff",
            },
            apiRef,
            ariaLabel = "Motorcycle build showcase",
            variant = "default",
        },
        ref
    ) => {
        const total = sections.length;
        const [localIndex, setLocalIndex] = useState(clamp(initialIndex, 0, Math.max(0, total - 1)));
        const isControlled = typeof currentIndex === "number";
        const index = isControlled ? clamp(currentIndex!, 0, Math.max(0, total - 1)) : localIndex;

        const rootRef = useRef<HTMLDivElement | null>(null);
        const fixedRef = useRef<HTMLDivElement | null>(null);
        const fixedSectionRef = useRef<HTMLDivElement | null>(null);

        const bgRefs = useRef<HTMLImageElement[]>([]);
        const wordRefs = useRef<HTMLSpanElement[][]>([]);

        const leftTrackRef = useRef<HTMLDivElement | null>(null);
        const rightTrackRef = useRef<HTMLDivElement | null>(null);
        const leftItemRefs = useRef<HTMLDivElement[]>([]);
        const rightItemRefs = useRef<HTMLDivElement[]>([]);

        const progressFillRef = useRef<HTMLDivElement | null>(null);
        const currentNumberRef = useRef<HTMLSpanElement | null>(null);

        const stRef = useRef<ScrollTrigger | null>(null);
        const lastIndexRef = useRef(index);
        const isAnimatingRef = useRef(false);
        const isSnappingRef = useRef(false);
        const sectionTopRef = useRef<number[]>([]);

        const prefersReduced = useMemo(() => {
            if (typeof window === "undefined") return false;
            return window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        }, []);
        const motionOff = reduceMotion ?? prefersReduced;

        const splitWords = (text: string) => {
            const words = text.split(/\s+/).filter(Boolean);
            return words.map((w, i) => (
                <span className="fx-word-mask" key={i}>
                    <span className="fx-word" ref={(el) => { if (el) tempWordBucket.current.push(el); }}>
                        {w}
                    </span>
                    {i < words.length - 1 ? " " : null}
                </span>
            ));
        };

        const tempWordBucket = useRef<HTMLSpanElement[]>([]);
        const WordsCollector = ({ onReady }: { onReady: () => void }) => {
            useEffect(() => onReady(), []); // eslint-disable-line
            return null;
        };

        const computePositions = () => {
            const el = fixedSectionRef.current;
            if (!el) return;
            const top = el.offsetTop;
            const h = el.offsetHeight;
            const arr: number[] = [];
            for (let i = 0; i < total; i++) arr.push(top + (h * i) / total);
            sectionTopRef.current = arr;
        };

        const measureAndCenterLists = (toIndex = index, animate = true) => {
            const centerTrack = (
                container: HTMLDivElement | null,
                items: HTMLDivElement[],
                isRight: boolean
            ) => {
                if (!container || items.length === 0) return;
                const first = items[0];
                const second = items[1];
                const contRect = container.getBoundingClientRect();
                let rowH = first.getBoundingClientRect().height;
                if (second) {
                    rowH = second.getBoundingClientRect().top - first.getBoundingClientRect().top;
                }
                const targetY = contRect.height / 2 - rowH / 2 - toIndex * rowH;
                const prop = isRight ? rightTrackRef : leftTrackRef;
                if (!prop.current) return;
                if (animate) {
                    gsap.to(prop.current, {
                        y: targetY,
                        duration: (durations.change ?? 0.7) * 0.9,
                        ease: "power3.out",
                    });
                } else {
                    gsap.set(prop.current, { y: targetY });
                }
            };

            measureRAF(() => {
                measureRAF(() => {
                    centerTrack(leftTrackRef.current, leftItemRefs.current, false);
                    centerTrack(rightTrackRef.current, rightItemRefs.current, true);
                });
            });
        };

        const measureRAF = (fn: () => void) => {
            if (typeof window === "undefined") return;
            requestAnimationFrame(() => requestAnimationFrame(fn));
        };

        useLayoutEffect(() => {
            if (typeof window === "undefined") return;
            const fixed = fixedRef.current;
            const fs = fixedSectionRef.current;
            if (!fixed || !fs || total === 0) return;

            gsap.set(bgRefs.current, { opacity: 0, scale: 1.04, yPercent: 0 });
            if (bgRefs.current[0]) gsap.set(bgRefs.current[0], { opacity: 1, scale: 1 });

            wordRefs.current.forEach((words, sIdx) => {
                words.forEach((w) => {
                    gsap.set(w, {
                        yPercent: sIdx === index ? 0 : 100,
                        opacity: sIdx === index ? 1 : 0,
                    });
                });
            });

            computePositions();
            measureAndCenterLists(index, false);

            const st = ScrollTrigger.create({
                trigger: fs,
                start: "top top",
                end: "bottom bottom",
                pin: fixed,
                pinSpacing: true,
                onUpdate: (self) => {
                    if (motionOff || isSnappingRef.current) return;
                    const prog = self.progress;
                    const target = Math.min(total - 1, Math.floor(prog * total));
                    if (target !== lastIndexRef.current && !isAnimatingRef.current) {
                        const next = lastIndexRef.current + (target > lastIndexRef.current ? 1 : -1);
                        goTo(next, false);
                    }
                    if (progressFillRef.current) {
                        const p = (lastIndexRef.current / (total - 1 || 1)) * 100;
                        progressFillRef.current.style.width = `${p}%`;
                    }
                },
            });

            stRef.current = st;

            if (initialIndex && initialIndex > 0 && initialIndex < total) {
                requestAnimationFrame(() => goTo(initialIndex, false));
            }

            const ro = new ResizeObserver(() => {
                computePositions();
                measureAndCenterLists(lastIndexRef.current, false);
                ScrollTrigger.refresh();
            });
            ro.observe(fs);

            return () => {
                ro.disconnect();
                st.kill();
                stRef.current = null;
            };
            // eslint-disable-next-line react-hooks/exhaustive-deps
        }, [total, initialIndex, motionOff, bgTransition, parallaxAmount]);

        const changeSection = (to: number) => {
            if (to === lastIndexRef.current || isAnimatingRef.current) return;
            const from = lastIndexRef.current;
            const down = to > from;
            isAnimatingRef.current = true;

            if (!isControlled) setLocalIndex(to);
            onIndexChange?.(to);

            if (currentNumberRef.current) {
                currentNumberRef.current.textContent = String(to + 1).padStart(2, "0");
            }
            if (progressFillRef.current) {
                const p = (to / (total - 1 || 1)) * 100;
                progressFillRef.current.style.width = `${p}%`;
            }

            const D = durations.change ?? 0.7;

            const outWords = wordRefs.current[from] || [];
            const inWords = wordRefs.current[to] || [];
            if (outWords.length) {
                gsap.to(outWords, {
                    yPercent: down ? -100 : 100,
                    opacity: 0,
                    duration: D * 0.6,
                    stagger: down ? 0.03 : -0.03,
                    ease: "power3.out",
                });
            }
            if (inWords.length) {
                gsap.set(inWords, { yPercent: down ? 100 : -100, opacity: 0 });
                gsap.to(inWords, {
                    yPercent: 0,
                    opacity: 1,
                    duration: D,
                    stagger: down ? 0.05 : -0.05,
                    ease: "power3.out",
                });
            }

            const prevBg = bgRefs.current[from];
            const newBg = bgRefs.current[to];

            if (bgTransition === "industrial") {
                // Industrial wipe effect with sparks
                if (newBg) {
                    gsap.set(newBg, {
                        opacity: 1,
                        clipPath: down ? "inset(100% 0 0 0)" : "inset(0 0 100% 0)",
                        scale: 1.02,
                        filter: "brightness(1.2)",
                    });
                    gsap.to(newBg, {
                        clipPath: "inset(0 0 0 0)",
                        scale: 1,
                        filter: "brightness(1)",
                        duration: D,
                        ease: "power3.out",
                    });
                }
                if (prevBg) {
                    gsap.to(prevBg, {
                        opacity: 0,
                        scale: 0.98,
                        duration: D * 0.8,
                        ease: "power2.in",
                    });
                }
            } else {
                // Fade transition
                if (newBg) {
                    gsap.set(newBg, { opacity: 0, scale: 1.04, yPercent: down ? 1 : -1 });
                    gsap.to(newBg, { opacity: 1, scale: 1, yPercent: 0, duration: D, ease: "power2.out" });
                }
                if (prevBg) {
                    gsap.to(prevBg, {
                        opacity: 0,
                        yPercent: down ? -parallaxAmount : parallaxAmount,
                        duration: D,
                        ease: "power2.out",
                    });
                }
            }

            measureAndCenterLists(to, true);

            leftItemRefs.current.forEach((el, i) => {
                el.classList.toggle("active", i === to);
                gsap.to(el, {
                    opacity: i === to ? 1 : 0.35,
                    x: i === to ? 20 : 0,
                    duration: D * 0.6,
                    ease: "power3.out",
                });
            });
            rightItemRefs.current.forEach((el, i) => {
                el.classList.toggle("active", i === to);
                gsap.to(el, {
                    opacity: i === to ? 1 : 0.35,
                    x: i === to ? -20 : 0,
                    duration: D * 0.6,
                    ease: "power3.out",
                });
            });

            gsap.delayedCall(D, () => {
                lastIndexRef.current = to;
                isAnimatingRef.current = false;
            });
        };

        const goTo = (to: number, withScroll = true) => {
            const clamped = clamp(to, 0, total - 1);
            isSnappingRef.current = true;
            changeSection(clamped);

            const pos = sectionTopRef.current[clamped];
            const snapMs = durations.snap ?? 800;

            if (withScroll && typeof window !== "undefined") {
                window.scrollTo({ top: pos, behavior: "smooth" });
                setTimeout(() => (isSnappingRef.current = false), snapMs);
            } else {
                setTimeout(() => (isSnappingRef.current = false), 10);
            }
        };

        const next = () => goTo(index + 1);
        const prev = () => goTo(index - 1);

        useImperativeHandle(apiRef, () => ({
            next,
            prev,
            goTo,
            getIndex: () => index,
            refresh: () => ScrollTrigger.refresh(),
        }));

        const handleJump = (i: number) => goTo(i);
        const handleLoadedStagger = () => {
            leftItemRefs.current.forEach((el, i) => {
                gsap.fromTo(
                    el,
                    { opacity: 0, y: 20 },
                    { opacity: i === index ? 1 : 0.35, y: 0, duration: 0.5, delay: i * 0.06, ease: "power3.out" }
                );
            });
            rightItemRefs.current.forEach((el, i) => {
                gsap.fromTo(
                    el,
                    { opacity: 0, y: 20 },
                    { opacity: i === index ? 1 : 0.35, y: 0, duration: 0.5, delay: 0.2 + i * 0.06, ease: "power3.out" }
                );
            });
        };

        useEffect(() => {
            handleLoadedStagger();
            measureAndCenterLists(index, false);
            // eslint-disable-next-line react-hooks/exhaustive-deps
        }, []);

        const cssVars: CSSProperties = {
            ["--fx-font" as any]: fontFamily,
            ["--fx-text" as any]: colors.text ?? "#ffffff",
            ["--fx-overlay" as any]: colors.overlay ?? "rgba(0,0,0,0.6)",
            ["--fx-page-bg" as any]: colors.pageBg ?? "#050505",
            ["--fx-stage-bg" as any]: colors.stageBg ?? "#0a0a0a",
            ["--fx-accent" as any]: colors.accent ?? "#ff5e1a",
            ["--fx-secondary" as any]: colors.secondary ?? "#00d1ff",
            ["--fx-gap" as any]: `${gap}rem`,
            ["--fx-grid-px" as any]: `${gridPaddingX}rem`,
        };

        return (
            <div
                ref={(node) => {
                    (rootRef as any).current = node;
                    if (typeof ref === "function") ref(node);
                    else if (ref) (ref as React.MutableRefObject<HTMLDivElement | null>).current = node;
                }}
                className={cn(
                    "fx",
                    variant === "mechanical" && "fx-mechanical",
                    variant === "digital" && "fx-digital",
                    variant === "gallery" && "fx-gallery",
                    className
                )}
                style={{ ...cssVars, ...style }}
                aria-label={ariaLabel}
            >
                {debug && <div className="fx-debug">Section: {index}</div>}

                <div className="fx-scroll">
                    <div className="fx-fixed-section" ref={fixedSectionRef}>
                        <div className="fx-fixed" ref={fixedRef}>
                            {/* Grid Overlay */}
                            <div className="absolute inset-0 grid grid-cols-12 gap-4 pointer-events-none z-0">
                                {[...Array(12)].map((_, i) => (
                                    <div key={i} className="border-r border-[#1a1a1a]/20 last:border-r-0" />
                                ))}
                            </div>

                            {/* Backgrounds */}
                            <div className="fx-bgs" aria-hidden="true">
                                {sections.map((s, i) => (
                                    <div className="fx-bg" key={s.id ?? i}>
                                        {s.renderBackground ? (
                                            s.renderBackground(index === i, lastIndexRef.current === i)
                                        ) : s.background ? (
                                            <>
                                                <div
                                                    ref={(el) => { if (el) bgRefs.current[i] = el as unknown as HTMLImageElement; }}
                                                    className="fx-bg-img"
                                                >
                                                    <Image
                                                        src={s.background!}
                                                        alt=""
                                                        fill
                                                        className="object-cover"
                                                    />
                                                </div>
                                                <div className="fx-bg-overlay" />
                                            </>
                                        ) : (
                                            <div className="fx-bg-placeholder" />
                                        )}
                                    </div>
                                ))}
                            </div>

                            {/* Content Grid */}
                            <div className="fx-grid">
                                {/* Header */}
                                {header && <div className="fx-header">{header}</div>}

                                {/* Content */}
                                <div className="fx-content">
                                    {/* Left Track - Build Numbers */}
                                    <div className="fx-left" role="list">
                                        <div className="fx-track" ref={leftTrackRef}>
                                            {sections.map((s, i) => (
                                                <div
                                                    key={`L-${s.id ?? i}`}
                                                    className={cn(
                                                        "fx-item fx-left-item",
                                                        i === index && "active",
                                                        variant === "mechanical" && "text-[#ff8a3d]",
                                                        variant === "digital" && "text-[#33dcff]"
                                                    )}
                                                    ref={(el) => { if (el) leftItemRefs.current[i] = el; }}
                                                    onClick={() => handleJump(i)}
                                                    role="button"
                                                    tabIndex={0}
                                                    aria-pressed={i === index}
                                                >
                                                    <div className="flex items-center gap-3">
                                                        <span className="text-xs font-mono opacity-50">{String(i + 1).padStart(2, '0')}</span>
                                                        {s.leftLabel}
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Center Title */}
                                    <div className="fx-center">
                                        {sections.map((s, sIdx) => {
                                            tempWordBucket.current = [];
                                            const isString = typeof s.title === "string";
                                            return (
                                                <div key={`C-${s.id ?? sIdx}`} className={cn(
                                                    "fx-featured",
                                                    sIdx === index && "active"
                                                )}>
                                                    {s.icon && (
                                                        <div className="mb-6">
                                                            <MotoIcon
                                                                name={s.icon}
                                                                variant="solid"
                                                                color={variant === "mechanical" ? "orange" : "cyan"}
                                                                size="lg"
                                                            />
                                                        </div>
                                                    )}
                                                    <h3 className="fx-featured-title">
                                                        {isString ? splitWords(s.title as string) : s.title}
                                                    </h3>
                                                    {s.subtitle && (
                                                        <p className="fx-featured-subtitle">{s.subtitle}</p>
                                                    )}
                                                    <WordsCollector
                                                        onReady={() => {
                                                            if (tempWordBucket.current.length) {
                                                                wordRefs.current[sIdx] = [...tempWordBucket.current];
                                                            }
                                                            tempWordBucket.current = [];
                                                        }}
                                                    />
                                                </div>
                                            );
                                        })}
                                    </div>

                                    {/* Right Track - Technologies */}
                                    <div className="fx-right" role="list">
                                        <div className="fx-track" ref={rightTrackRef}>
                                            {sections.map((s, i) => (
                                                <div
                                                    key={`R-${s.id ?? i}`}
                                                    className={cn(
                                                        "fx-item fx-right-item",
                                                        i === index && "active",
                                                        variant === "mechanical" && "text-[#ff8a3d]",
                                                        variant === "digital" && "text-[#33dcff]"
                                                    )}
                                                    ref={(el) => { if (el) rightItemRefs.current[i] = el; }}
                                                    onClick={() => handleJump(i)}
                                                    role="button"
                                                    tabIndex={0}
                                                    aria-pressed={i === index}
                                                >
                                                    {s.rightLabel}
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>

                                {/* Footer */}
                                <div className="fx-footer">
                                    {footer && <div className="fx-footer-title">{footer}</div>}
                                    {showProgress && (
                                        <div className="fx-progress">
                                            <div className="fx-progress-numbers">
                                                <span ref={currentNumberRef} className="font-mono">
                                                    {String(index + 1).padStart(2, "0")}
                                                </span>
                                                <span className="font-mono opacity-50">
                                                    {String(total).padStart(2, "0")}
                                                </span>
                                            </div>
                                            <div className="fx-progress-bar">
                                                <div className="fx-progress-fill" ref={progressFillRef} />
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* End */}
                    <div className="fx-end">
                        <div className="text-center">
                            <p className="text-[#666666] font-mono uppercase tracking-widest text-sm mb-2">
                                Motorcycle Build Gallery
                            </p>
                            <p className="text-[#ff5e1a] text-2xl font-bold">Fin</p>
                        </div>
                    </div>
                </div>

                <style jsx>{`
          .fx {
            width: 100%;
            overflow: hidden;
            background: var(--fx-page-bg);
            color: var(--fx-text);
            font-family: var(--fx-font);
            text-transform: uppercase;
            letter-spacing: -0.02em;
          }

          .fx-mechanical {
            --fx-accent: #ff5e1a;
          }

          .fx-digital {
            --fx-accent: #00d1ff;
          }

          .fx-debug {
            position: fixed; bottom: 10px; right: 10px; z-index: 9999;
            background: rgba(255,255,255,0.8); color: #000; padding: 6px 8px; font: 12px/1 monospace; border-radius: 4px;
          }

          .fx-fixed-section { height: ${Math.max(1, total + 1)}00vh; position: relative; }
          .fx-fixed { position: sticky; top: 0; height: 100vh; width: 100%; overflow: hidden; background: var(--fx-page-bg); }

          .fx-grid {
            display: grid;
            grid-template-columns: repeat(12, 1fr);
            gap: var(--fx-gap);
            padding: 0 var(--fx-grid-px);
            position: relative;
            height: 100%;
            z-index: 2;
          }

          .fx-bgs { position: absolute; inset: 0; background: var(--fx-stage-bg); z-index: 1; }
          .fx-bg { position: absolute; inset: 0; }
          .fx-bg-img {
            position: absolute; inset: -10% 0 -10% 0;
            width: 100%; height: 120%; object-fit: cover;
            filter: brightness(0.8) contrast(1.2);
            opacity: 0;
            will-change: transform, opacity, clip-path;
          }
          .fx-bg-overlay { position: absolute; inset: 0; background: var(--fx-overlay); }
          .fx-bg-placeholder { position: absolute; inset: 0; background: linear-gradient(135deg, var(--fx-stage-bg) 0%, #1a1a1a 100%); }

          .fx-header {
            grid-column: 1 / 13; align-self: start; padding-top: 10vh;
            font-size: clamp(3rem, 8vw, 6rem); line-height: 0.85; text-align: center;
            background: linear-gradient(to right, var(--fx-text) 0%, var(--fx-accent) 100%);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
          }

          .fx-content {
            grid-column: 1 / 13;
            position: absolute; inset: 0;
            display: grid; grid-template-columns: 1fr 1.3fr 1fr;
            align-items: center;
            height: 100%;
            padding: 0 var(--fx-grid-px);
          }

          .fx-left, .fx-right {
            height: 60vh;
            overflow: hidden;
            display: grid; align-content: center;
          }
          .fx-left { justify-items: start; }
          .fx-right { justify-items: end; }
          .fx-track { will-change: transform; }

          .fx-item {
            color: var(--fx-text);
            font-weight: 600;
            letter-spacing: 0em;
            line-height: 1.2;
            margin: 12px 0;
            opacity: 0.35;
            transition: opacity 0.3s ease, transform 0.3s ease;
            position: relative;
            font-size: clamp(1rem, 2vw, 1.5rem);
            user-select: none;
            cursor: pointer;
            padding: 8px 16px;
            border-radius: 8px;
          }
          .fx-item:hover {
            opacity: 0.7;
            background: rgba(255, 255, 255, 0.05);
          }
          .fx-left-item.active, .fx-right-item.active { 
            opacity: 1;
            color: var(--fx-accent);
          }
          .fx-left-item.active { transform: translateX(20px); }
          .fx-right-item.active { transform: translateX(-20px); }

          .fx-left-item.active::before,
          .fx-right-item.active::after {
            content: "";
            position: absolute; top: 50%; transform: translateY(-50%);
            width: 8px; height: 2px; background: var(--fx-accent);
          }
          .fx-left-item.active::before { left: 0; }
          .fx-right-item.active::after { right: 0; }

          .fx-center {
            display: grid; place-items: center; text-align: center; height: 60vh; overflow: hidden;
          }
          .fx-featured { 
            position: absolute; 
            opacity: 0; 
            visibility: hidden;
          }
          .fx-featured.active { 
            opacity: 1; 
            visibility: visible;
          }
          .fx-featured-title {
            margin: 0; 
            color: var(--fx-text);
            font-weight: 900; 
            letter-spacing: -0.01em;
            font-size: clamp(2.5rem, 6vw, 5rem);
            line-height: 1;
            margin-bottom: 1rem;
          }
          .fx-featured-subtitle {
            color: #999999;
            font-size: 1rem;
            font-weight: 400;
            text-transform: none;
            letter-spacing: 0.1em;
            max-width: 400px;
            margin: 0 auto;
          }
          .fx-word-mask { display: inline-block; overflow: hidden; vertical-align: middle; }
          .fx-word { display: inline-block; vertical-align: middle; }

          .fx-footer {
            grid-column: 1 / 13; 
            align-self: end; 
            padding-bottom: 5vh; 
            text-align: center;
          }
          .fx-footer-title { 
            color: var(--fx-text); 
            font-size: clamp(1.5rem, 4vw, 3rem); 
            font-weight: 900; 
            letter-spacing: -0.01em; 
            line-height: 0.9; 
            margin-bottom: 2rem;
          }
          .fx-progress { 
            width: 200px; 
            height: 2px; 
            margin: 0 auto; 
            background: rgba(255, 255, 255, 0.1); 
            position: relative; 
          }
          .fx-progress-fill { 
            position: absolute; 
            inset: 0 auto 0 0; 
            width: 0%; 
            background: var(--fx-accent); 
            height: 100%; 
            transition: width 0.3s ease; 
          }
          .fx-progress-numbers { 
            position: absolute; 
            inset: auto 0 100% 0; 
            display: flex; 
            justify-content: space-between; 
            font-size: 0.8rem; 
            color: var(--fx-text); 
            margin-bottom: 0.5rem;
          }

          .fx-end { 
            height: 100vh; 
            display: grid; 
            place-items: center; 
            background: linear-gradient(to bottom, var(--fx-page-bg), #0a0a0a);
          }

          @media (max-width: 900px) {
            .fx-content {
              grid-template-columns: 1fr; 
              row-gap: 3vh;
              place-items: center;
            }
            .fx-left, .fx-right, .fx-center { height: auto; }
            .fx-left, .fx-right { justify-items: center; }
            .fx-track { transform: none !important; }
            .fx-item { padding: 6px 12px; }
            .fx-featured-title { font-size: clamp(2rem, 5vw, 3rem); }
          }
        `}</style>
            </div>
        );
    }
);

FullScreenScrollFX.displayName = "FullScreenScrollFX";

// Preset components for common use cases
export const MotorcycleBuildGallery = (props: Omit<FullScreenFXProps, 'variant' | 'bgTransition' | 'colors'>) => (
    <FullScreenScrollFX
        variant="mechanical"
        bgTransition="industrial"
        colors={{
            text: "#ffffff",
            overlay: "rgba(0,0,0,0.7)",
            pageBg: "#050505",
            stageBg: "#0a0a0a",
            accent: "#ff5e1a",
            secondary: "#00d1ff",
        }}
        {...props}
    />
);

export const PwaFeaturesShowcase = (props: Omit<FullScreenFXProps, 'variant' | 'bgTransition' | 'colors'>) => (
    <FullScreenScrollFX
        variant="digital"
        bgTransition="slide"
        colors={{
            text: "#ffffff",
            overlay: "rgba(0,0,0,0.6)",
            pageBg: "#050505",
            stageBg: "#00101a",
            accent: "#00d1ff",
            secondary: "#ff5e1a",
        }}
        {...props}
    />
);
