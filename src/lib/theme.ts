import { useState, useEffect } from 'react';

export type PrimaryColor = 'default' | 'blue' | 'green' | 'rose' | 'yellow' | 'violet' | 'pink' | 'orange';

const STORAGE_KEY = 'primary-color';
const EVENT_NAME = 'primary-color-changed';

export function getPrimaryColor(): PrimaryColor {
    if (typeof window === 'undefined') return 'default';
    return (localStorage.getItem(STORAGE_KEY) as PrimaryColor) || 'default';
}

export function setPrimaryColor(color: PrimaryColor) {
    if (typeof window === 'undefined') return;
    localStorage.setItem(STORAGE_KEY, color);
    window.dispatchEvent(new CustomEvent(EVENT_NAME, { detail: color }));
    document.documentElement.setAttribute('data-theme-color', color);
}

export function usePrimaryColor() {
    const [color, setColor] = useState<PrimaryColor>(getPrimaryColor());

    useEffect(() => {
        const handleColorChange = (e: Event) => {
            const customEvent = e as CustomEvent<PrimaryColor>;
            setColor(customEvent.detail);
        };

        window.addEventListener(EVENT_NAME, handleColorChange);
        return () => window.removeEventListener(EVENT_NAME, handleColorChange);
    }, []);

    return [color, setPrimaryColor] as const;
}
