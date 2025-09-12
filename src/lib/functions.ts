import { type Variants } from "framer-motion";

export const containerVariants: Variants = {
    offscreen: {},
    onscreen: {
        transition: {
            staggerChildren: 0.4,
        },
    },
};

export const itemVariants: Variants = {
    offscreen: { opacity: 0, y: -20 },
    onscreen: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.4, ease: "easeOut" },
    },
};

export const itemProfile: Variants = {
    offscreen: { opacity: 0, x: -20 },
    onscreen: {
        opacity: 1,
        x: 0,
        transition: { duration: 0.2, ease: "easeOut" },
    },
};

export const itemUp: Variants = {
    offscreen: { opacity: 0, y: 20 },
    onscreen: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.4, ease: "easeOut" },
    },
};

// export const itemVariants = {
//   initial: { opacity: 0, y: 20 },
//   animate: { opacity: 1, y: 0, transition: { duration: 0.4 } },
// };

// UP
// export const itemVariants = {
//   initial: { opacity: 0, y: 15 },
//   animate: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
// };

// 3. Elegant Slide Left
// export const itemVariants: Variants = {
//   initial: { opacity: 0, x: -50 },
//   animate: { opacity: 1, x: 0, transition: { duration: 0.7, ease: "easeOut" } },
// };

// 1. Girated
// const itemVariants = {
//   initial: { opacity: 0, y: 30, skewY: 10 },
//   animate: {
//     opacity: 1,
//     y: 0,
//     skewY: 0,
//     transition: { duration: 0.5, ease: "easeOut" },
//   },
// };

// 3. 3D
// const itemVariants = {
//   initial: { opacity: 0, rotateY: 90 },
//   animate: {
//     opacity: 1,
//     rotateY: 0,
//     transition: { duration: 0.6, ease: "easeInOut" },
//   },
// };

// 3. Scale
// export const itemVariants = {
//   initial: { opacity: 0, scale: 0.8 },
//   animate: {
//     opacity: 1,
//     scale: 1,
//     transition: { duration: 0.4, ease: "easeOut" },
//   },
// };

// 5. Blur
// export const itemVariants = {
//   initial: { opacity: 0, filter: "blur(8px)" },
//   animate: { opacity: 1, filter: "blur(0px)", transition: { duration: 0.5 } },
// };

// 8. Left
// export const itemVariants = {
//   initial: { opacity: 0, x: -100 },
//   animate: { opacity: 1, x: 0, transition: { duration: 0.6 } },
// };

// 9.  Right
// export const itemVariants = {
//   initial: { opacity: 0, x: 100 },
//   animate: { opacity: 1, x: 0, transition: { duration: 0.6 } },
// };

// 11. Slide UP
// export const itemVariants = {
//   initial: { opacity: 0, y: 20 },
//   animate: { opacity: 1, y: 0, transition: { duration: 0.4 } },
// };

// 4. Elegant Slide Right
// export const itemVariants = {
//   initial: { opacity: 0, x: 50 },
//   animate: { opacity: 1, x: 0, transition: { duration: 0.7, ease: "easeOut" } },
// };

// 19. Soft Elastic
// export const itemVariants = {
//   initial: { opacity: 0, scale: 0.9 },
//   animate: {
//     opacity: 1,
//     scale: 1,
//     transition: { type: "spring", stiffness: 80 },
//   },
// };