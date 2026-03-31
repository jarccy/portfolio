"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

export const SpotlightParticles = ({ className }: { className?: string }) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        let animationFrameId: number;
        let particles: Particle[] = [];
        let particleCount = 0;

        const calculateParticleCount = () => {
            return Math.floor((window.innerWidth * window.innerHeight) / 10000);
        };

        const getOscillation = (time: number, duration: number) => {
            const period = duration * 1000;
            const progress = (time % period) / period;
            const t = progress < 0.5 ? progress * 2 : (1 - (progress - 0.5) * 2);
            // Ease in out
            const ease = t * t * (3 - 2 * t);
            return -3 + 6 * ease;
        };

        class Particle {
            x: number = 0;
            y: number = 0;
            speed: number = 0;
            opacity: number = 1;
            fadeDelay: number = 0;
            fadeStart: number = 0;
            fadingOut: boolean = false;
            size: number = 0;

            constructor() {
                this.reset();
                this.y = Math.random() * canvas!.height;
                this.fadeDelay = Math.random() * 600 + 100;
                this.fadeStart = Date.now() + this.fadeDelay;
                this.fadingOut = false;
            }

            reset() {
                this.x = Math.random() * canvas!.width;
                this.y = Math.random() * canvas!.height;
                this.speed = Math.random() / 5 + 0.1;
                this.opacity = 1;
                this.fadeDelay = Math.random() * 600 + 100;
                this.fadeStart = Date.now() + this.fadeDelay;
                this.fadingOut = false;
                this.size = Math.random() * 3 + 2;
            }

            update() {
                this.y -= this.speed;
                if (this.y < 0) {
                    this.reset();
                    this.y = canvas!.height;
                }

                if (!this.fadingOut && Date.now() > this.fadeStart) {
                    this.fadingOut = true;
                }

                if (this.fadingOut) {
                    this.opacity -= 0.008;
                    if (this.opacity <= 0) {
                        this.reset();
                    }
                }
            }

            draw(time: number) {
                if (!ctx || !canvas) return;

                // Calculate beam visibility
                const dx = this.x - canvas.width / 2;
                const dy = this.y;
                const dist = Math.sqrt(dx * dx + dy * dy);
                if (dist === 0) return;

                const angleDeg = Math.atan2(dy, dx) * (180 / Math.PI) + 90;

                // Spotlight angles
                const beams = [
                    { base: 10, duration: 16, reverse: false },
                    { base: -10, duration: 14, reverse: true },
                    { base: 0, duration: 22, reverse: false }
                ];

                let maxBeamIntensity = 0;

                beams.forEach(beam => {
                    const osc = getOscillation(time, beam.duration);
                    const beamAngle = 180 + beam.base + (beam.reverse ? -osc : osc);

                    // Difference in angles (normalized to -180, 180)
                    let diff = (angleDeg - beamAngle + 180) % 360 - 180;
                    if (diff < -180) diff += 360;

                    const absDiff = Math.abs(diff);
                    if (absDiff < 20) { // Beam half-width ~20deg (160 to 200)
                        const intensity = 1 - (absDiff / 20);
                        maxBeamIntensity = Math.max(maxBeamIntensity, intensity);
                    }
                });

                if (maxBeamIntensity <= 0) return;

                // Vertical fade (matching CSS mask)
                // mask-image: linear-gradient(to bottom, hsl(var(--primary)) 0%, hsl(var(--primary)) 15%, transparent 60%);
                const verticalFade = Math.max(0, Math.min(1, 1 - (this.y / (canvas.height * 0.6))));

                const finalOpacity = this.opacity * maxBeamIntensity * verticalFade * 0.6;
                if (finalOpacity <= 0.01) return;

                const primaryColor = getComputedStyle(document.documentElement).getPropertyValue('--primary').trim();
                ctx.fillStyle = `hsl(${primaryColor} / ${finalOpacity})`;
                ctx.fillRect(this.x, this.y, 1, this.size);
            }
        }

        const initParticles = () => {
            particleCount = calculateParticleCount();
            particles = [];
            for (let i = 0; i < particleCount; i++) {
                particles.push(new Particle());
            }
        };

        const animate = (time: number) => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            particles.forEach((particle) => {
                particle.update();
                particle.draw(time);
            });
            animationFrameId = requestAnimationFrame(animate);
        };

        const onResize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            initParticles();
        };

        window.addEventListener("resize", onResize);

        // Initial setup
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        initParticles();
        animationFrameId = requestAnimationFrame(animate);

        return () => {
            window.removeEventListener("resize", onResize);
            cancelAnimationFrame(animationFrameId);
        };
    }, []);

    return (
        <div className={cn("absolute inset-0 overflow-hidden pointer-events-none select-none -z-5", className)}>
            <style dangerouslySetInnerHTML={{
                __html: `
        /* Spotlight Effect */
        .spotlight-container {
            pointer-events: none;
            position: absolute; left: 0; right: 0; top: 0; margin: 0 auto;
            height: 100vh; width: 100%;
            overflow: hidden;
        }

        .spotlight-container > div {
            border-radius: 0 0 50% 50%;
            position: absolute; left: 0; right: 0; margin: 0 auto; 
            top: -10vh;
            width: 45vw; height: 120vh;
            background-image: conic-gradient(from 0deg at 50% 0%, transparent 160deg, hsl(var(--primary) / 0.1) 175deg, hsl(var(--primary) / 0.4) 180deg, hsl(var(--primary) / 0.1) 185deg, transparent 200deg);
            transform-origin: 50% 0;
            filter: blur(45px);
            opacity: 0;
            -webkit-mask-image: linear-gradient(to bottom, hsl(var(--primary)) 0%, hsl(var(--primary)) 15%, transparent 60%);
            mask-image: linear-gradient(to bottom, hsl(var(--primary)) 0%, hsl(var(--primary)) 15%, transparent 60%);
            animation: spotlight-entrance 2.5s ease-out forwards, spotlight-animation 22s ease-in-out infinite alternate 2.5s;
        }
        
        .spotlight-container > div:nth-child(1){ 
            rotate: 10deg;
            opacity: 0.3;
            animation: spotlight-entrance 2.5s ease-out forwards, spotlight-animation 16s ease-in-out infinite alternate 2.5s;
        }
        .spotlight-container > div:nth-child(2){ 
            rotate: -10deg;
            opacity: 0.3;
            animation: spotlight-entrance 2.5s ease-out forwards, spotlight-animation 14s ease-in-out infinite alternate-reverse 2.5s;
        }
        
        @keyframes spotlight-entrance {
            0% { transform: scaleY(0) rotateZ(-3deg); opacity: 0; }
            100% { transform: scaleY(1) rotateZ(-3deg); opacity: 0.3; }
        }

        @keyframes spotlight-animation {
            0% { transform: rotateZ(-3deg) scale(1); opacity: 0.3; }
            50% { transform: rotateZ(3deg) scale(1.05); opacity: 0.6; }
            100% { transform: rotateZ(-3deg) scale(1); opacity: 0.3; }
        }
      `}} />

            {/* Spotlight */}
            <div className="spotlight-container">
                <div></div>
                <div></div>
                <div></div>
            </div>

            {/* Particles */}
            <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none" />
        </div>
    );
};
