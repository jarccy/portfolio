"use client";

import { usePrimaryColor, type PrimaryColor } from "@/lib/theme";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useRef, useEffect } from "react";
import { cn } from "@/lib/utils";
import { ThemeSwitch } from "./themeSwitch";

const colors: { name: PrimaryColor; color: string }[] = [
    { name: 'default', color: '#18181a' },
    { name: 'blue', color: '#94bcfa' },
    { name: 'green', color: '#86efac' },
    { name: 'yellow', color: '#fde68a' },
    { name: 'violet', color: '#c4b5fd' },
    { name: 'pink', color: '#fb63b6' },
    { name: 'orange', color: '#fca5a5' },
    { name: 'rose', color: '#fb7086' },
];

export function ColorPicker({ lang }: { lang?: string }) {
    const [primaryColor, setPrimaryColor] = usePrimaryColor();
    const [isOpen, setIsOpen] = useState(false);
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (ref.current && !ref.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <div className="relative" ref={ref}>
            <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsOpen(!isOpen)}
                className="p-1 rounded-full cursor-pointer hover:bg-neutral-200/50 dark:hover:bg-zinc-800 text-zinc-400 hover:text-zinc-600 dark:text-zinc-400 dark:hover:text-zinc-200 transition-colors"
            >
                <svg xmlns="http://www.w3.org/2000/svg" className="size-5" viewBox="0 0 256 256"><path fill="currentColor" d="M200.77 53.89A103.27 103.27 0 0 0 128 24h-1.07A104 104 0 0 0 24 128c0 43 26.58 79.06 69.36 94.17A32 32 0 0 0 136 192a16 16 0 0 1 16-16h46.21a31.81 31.81 0 0 0 31.2-24.88a104.4 104.4 0 0 0 2.59-24a103.28 103.28 0 0 0-31.23-73.23m13 93.71a15.89 15.89 0 0 1-15.56 12.4H152a32 32 0 0 0-32 32a16 16 0 0 1-21.31 15.07C62.49 194.3 40 164 40 128a88 88 0 0 1 87.09-88h.9a88.35 88.35 0 0 1 88 87.25a89 89 0 0 1-2.18 20.35ZM140 76a12 12 0 1 1-12-12a12 12 0 0 1 12 12m-44 24a12 12 0 1 1-12-12a12 12 0 0 1 12 12m0 56a12 12 0 1 1-12-12a12 12 0 0 1 12 12m88-56a12 12 0 1 1-12-12a12 12 0 0 1 12 12"></path></svg>
            </motion.button>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -10 }}
                        className="absolute bg-white dark:bg-zinc-900 right-0 top-full mt-3.5 p-3 border border-zinc-200 dark:border-zinc-800 rounded-xl shadow-lg min-w-[180px] z-50 origin-top-right"
                    >
                        <div className="flex items-center justify-between mb-3">
                            <p className="text-xs font-bold text-muted-foreground px-1 uppercase tracking-wider">
                                {lang === "en" ? "Theme / Color" : "Tema / Color"}
                            </p>
                            <ThemeSwitch className="p-1 rounded-full cursor-pointer hover:bg-neutral-200/50 dark:hover:bg-zinc-800 text-zinc-400 hover:text-zinc-600 dark:text-zinc-400 dark:hover:text-zinc-200" />
                        </div>
                        <div className="grid grid-cols-4 gap-2">
                            {colors.map((c) => (
                                <button
                                    key={c.name}
                                    onClick={() => {
                                        setPrimaryColor(c.name);
                                        setIsOpen(false);
                                    }}
                                    className={cn(
                                        "w-8 h-8 cursor-pointer rounded-full border-2 transition-all flex items-center justify-center",
                                        primaryColor === c.name
                                            ? "border-primary scale-110 shadow-sm"
                                            : "border-transparent opacity-80 hover:opacity-100 hover:scale-105"
                                    )}
                                    style={{ backgroundColor: c.color }}
                                    title={c.name}
                                >
                                    {primaryColor === c.name && (
                                        <div className="w-2 h-2 bg-white rounded-full shadow-sm" />
                                    )}
                                </button>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

