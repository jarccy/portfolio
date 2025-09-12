import { motion, type Variants } from "framer-motion";
import Languages from "./Languages";
import { BackgroundBeamsWithCollision } from "./Stars";

const containerVariants: Variants = {
  animate: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

export const itemVariants: Variants = {
  initial: { opacity: 0, y: 25 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

export default function Home() {
  return (
    <BackgroundBeamsWithCollision>
      <motion.section
        id="home"
        variants={containerVariants}
        initial="initial"
        animate="animate"
        className="relative z-10 flex justify-center items-center min-h-[calc(100vh-12px)] px-4"
      >
        <div className="max-w-xl w-full text-center">
          <motion.h1
            variants={itemVariants}
            className="text-4xl sm:text-5xl lg:text-6xl font-bold font-sans text-zinc-700 dark:text-zinc-200 leading-tight"
          >
            Hey, I'm Jarcy
          </motion.h1>

          <motion.h2
            variants={itemVariants}
            className="font-vectra text-3xl sm:text-4xl lg:text-6xl font-bold btn-shine"
          >
            Software Developer
          </motion.h2>

          <motion.article
            variants={itemVariants}
            className="dark:text-zinc-400/90 text-sm sm:text-base"
          >
            I build tools that turn work into a fun, seamless, and rewarding
            experience, where productivity and creativity go hand in hand.
          </motion.article>

          <motion.div variants={itemVariants}>
            <Languages />
          </motion.div>
        </div>
      </motion.section>
    </BackgroundBeamsWithCollision>
  );
}
