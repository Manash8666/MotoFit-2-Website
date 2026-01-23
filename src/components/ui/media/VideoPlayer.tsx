'use client';

import { useRef, useState } from 'react';
import { cn } from '@/lib/utils';
import { Play, Pause, Volume2, VolumeX } from 'lucide-react';

interface VideoPlayerProps {
    src: string;
    poster?: string;
    autoPlay?: boolean;
    loop?: boolean;
    muted?: boolean;
    controls?: boolean;
    className?: string;
}

export function VideoPlayer({
    src,
    poster,
    autoPlay = false,
    loop = true,
    muted = true,
    controls = true,
    className
}: VideoPlayerProps) {
    const videoRef = useRef<HTMLVideoElement>(null);
    const [isPlaying, setIsPlaying] = useState(autoPlay);
    const [isMuted, setIsMuted] = useState(muted);
    const [progress, setProgress] = useState(0);

    const togglePlay = () => {
        if (!videoRef.current) return;

        if (isPlaying) {
            videoRef.current.pause();
        } else {
            videoRef.current.play();
        }
        setIsPlaying(!isPlaying);
    };

    const toggleMute = () => {
        if (!videoRef.current) return;

        videoRef.current.muted = !isMuted;
        setIsMuted(!isMuted);
    };

    const handleTimeUpdate = () => {
        if (!videoRef.current) return;

        const currentTime = videoRef.current.currentTime;
        const duration = videoRef.current.duration;
        setProgress((currentTime / duration) * 100);
    };

    return (
        <div className={cn('relative group overflow-hidden rounded-lg', className)}>
            <video
                ref={videoRef}
                src={src}
                poster={poster}
                autoPlay={autoPlay}
                loop={loop}
                muted={isMuted}
                playsInline
                onTimeUpdate={handleTimeUpdate}
                className="w-full h-full object-cover"
            />

            {controls && (
                <>
                    {/* Custom Controls */}
                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-4 bg-black/50 backdrop-blur-sm rounded-full px-4 py-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <button
                            onClick={togglePlay}
                            className="p-1 hover:bg-white/10 rounded-full transition-colors"
                        >
                            {isPlaying ? (
                                <Pause className="h-4 w-4 text-white" />
                            ) : (
                                <Play className="h-4 w-4 text-white" />
                            )}
                        </button>

                        <button
                            onClick={toggleMute}
                            className="p-1 hover:bg-white/10 rounded-full transition-colors"
                        >
                            {isMuted ? (
                                <VolumeX className="h-4 w-4 text-white" />
                            ) : (
                                <Volume2 className="h-4 w-4 text-white" />
                            )}
                        </button>

                        {/* Progress Bar */}
                        <div className="w-32 h-1 bg-white/20 rounded-full overflow-hidden">
                            <div
                                className="h-full bg-[#ff5e1a] rounded-full transition-all duration-100"
                                style={{ width: `${progress}%` }}
                            />
                        </div>
                    </div>

                    {/* Play button overlay for paused state */}
                    {!isPlaying && (
                        <button
                            onClick={togglePlay}
                            className="absolute inset-0 flex items-center justify-center bg-black/30 backdrop-blur-sm transition-all duration-300 hover:bg-black/40"
                        >
                            <div className="p-4 bg-[#ff5e1a] rounded-full">
                                <Play className="h-8 w-8 text-white ml-1" />
                            </div>
                        </button>
                    )}
                </>
            )}
        </div>
    );
}
