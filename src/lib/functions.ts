/**
 * Lightweight animation helpers that replace framer-motion variants.
 *
 * A `Variant` describes the hidden ("offscreen") state of an element; the
 * visible state is always `opacity: 1`, no translation and no blur.
 * `reveal()` returns an inline style string that transitions between both.
 */

export const EASE_OUT = "cubic-bezier(0, 0, 0.58, 1)";
export const EASE_IN_OUT = "cubic-bezier(0.42, 0, 0.58, 1)";

export type Variant = {
    opacity?: number;
    x?: number;
    y?: number;
    blur?: number;
    /** ms */
    duration: number;
    /** ms */
    delay?: number;
    ease?: string;
};

/** Delay between staggered children (ms). Mirrors `staggerChildren: 0.4`. */
export const STAGGER = 400;

export const itemVariants: Variant = { opacity: 0, y: -20, duration: 400 };

export const itemProfile: Variant = { opacity: 0, x: -20, duration: 200 };

export const itemUp: Variant = { opacity: 0, y: 20, duration: 400 };

/**
 * @param extraTransition transitions the element already had via classes
 *   (e.g. `transition-all duration-300`), since the inline style overrides them.
 */
export function reveal(
    visible: boolean,
    variant: Variant,
    delay = variant.delay ?? 0,
    extraTransition?: string,
): string {
    const { opacity = 0, x = 0, y = 0, blur = 0, duration, ease = EASE_OUT } = variant;
    const t = `${duration}ms ${ease} ${delay}ms`;
    const props = [`opacity ${t}`, `transform ${t}`];
    if (extraTransition) props.unshift(extraTransition);
    if (blur) props.push(`filter ${t}`);

    return [
        `opacity: ${visible ? 1 : opacity}`,
        `transform: ${visible ? "none" : `translate(${x}px, ${y}px)`}`,
        blur ? `filter: ${visible ? "none" : `blur(${blur}px)`}` : "",
        `transition: ${props.join(", ")}`,
    ]
        .filter(Boolean)
        .join("; ");
}

type InViewOptions = {
    /** Fraction of the element that must be visible (0-1). */
    amount?: number;
    /** Stop observing after the first time it enters. */
    once?: boolean;
    onenter?: () => void;
    onleave?: () => void;
};

/** Svelte action: replaces framer-motion `whileInView`. */
export function inview(node: HTMLElement, options: InViewOptions = {}) {
    let opts = options;

    const observer = new IntersectionObserver(
        ([entry]) => {
            if (entry.isIntersecting) {
                opts.onenter?.();
                if (opts.once) observer.disconnect();
            } else {
                opts.onleave?.();
            }
        },
        { threshold: opts.amount ?? 0 },
    );
    observer.observe(node);

    return {
        update(next: InViewOptions) {
            opts = next;
        },
        destroy() {
            observer.disconnect();
        },
    };
}

/** Svelte action: moves the node to `document.body` (replaces `createPortal`). */
export function portal(node: HTMLElement) {
    document.body.appendChild(node);
    return {
        destroy() {
            node.remove();
        },
    };
}
