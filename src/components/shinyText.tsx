import React from 'react';

interface ShinyTextProps {
    text: string;
    disabled?: boolean;
    speed?: number;
    className?: string;
    color?: string;
    shineColor?: string;
    spread?: number;
    yoyo?: boolean;
    pauseOnHover?: boolean;
}

const ShinyText: React.FC<ShinyTextProps> = ({
    text,
    disabled = false,
    speed = 2,
    className = '',
    color = '#b5b5b5',
    shineColor = '#ffffff',
    spread = 120,
    pauseOnHover = false,
}) => {

    return (
        <span
            className={`shiny-text inline-flex items-center justify-center ${disabled ? 'disabled' : ''} ${pauseOnHover ? 'pause-on-hover' : ''} ${className}`}
            style={{
                '--shiny-speed': `${speed}s`,
                '--shiny-color': color,
                '--shiny-shine-color': shineColor,
                '--shiny-spread': `${spread}deg`,
            } as React.CSSProperties}
        >
            {text}
            <style dangerouslySetInnerHTML={{
                __html: `
                .shiny-text {
                    color: var(--shiny-color);
                    background: linear-gradient(
                        var(--shiny-spread),
                        var(--shiny-color) 0%,
                        var(--shiny-color) 35%,
                        var(--shiny-shine-color) 50%,
                        var(--shiny-color) 65%,
                        var(--shiny-color) 100%
                    );
                    background-size: 200% auto;
                    -webkit-background-clip: text;
                    background-clip: text;
                    -webkit-text-fill-color: transparent;
                    animation: shiny-text-left var(--shiny-speed) linear infinite;
                    padding: 14px 0px;
                }
                
                .shiny-text.disabled {
                    animation: none !important;
                }
                
                .shiny-text.pause-on-hover:hover {
                    animation-play-state: paused;
                }

                @keyframes shiny-text-left {
                    from { background-position: 150% center; }
                    to { background-position: -50% center; }
                }

                @keyframes shiny-text-right {
                    from { background-position: -50% center; }
                    to { background-position: 150% center; }
                }
            `}} />
        </span>
    );
};

export default ShinyText;
