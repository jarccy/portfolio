import { motion, type Variants } from "framer-motion";
import Languages from "./Languages";
import { Stars } from "./Stars";
import { useEffect } from "react";
import { i18next } from "@/i18n/config";
import ShinyText from "@/components/shinyText";
import { SpotlightParticles } from "./SpotlightParticles";

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

const nameBlurVariants: Variants = {
  initial: { opacity: 0, filter: "blur(12px)", y: 8 },
  animate: {
    opacity: 1,
    filter: "blur(0px)",
    y: 0,
    transition: { duration: 0.6, ease: "easeOut", delay: 0.2 },
  },
};

const surnameBlurVariants: Variants = {
  initial: { opacity: 0, filter: "blur(12px)", y: 8 },
  animate: {
    opacity: 1,
    filter: "blur(0px)",
    y: 0,
    transition: { duration: 0.6, ease: "easeOut", delay: 0.55 },
  },
};

const descriptionBlurVariants: Variants = {
  initial: { opacity: 0, filter: "blur(12px)", y: 14 },
  animate: {
    opacity: 1,
    filter: "blur(0px)",
    y: 0,
    transition: { duration: 0.6, ease: "easeOut", delay: 1.1 },
  },
};

const languagesBlurVariants: Variants = {
  initial: { opacity: 0, filter: "blur(12px)", y: 14 },
  animate: {
    opacity: 1,
    filter: "blur(0px)",
    y: 0,
    transition: { duration: 0.6, ease: "easeOut", delay: 1.35 },
  },
};

export default function Home({ lang }: { lang: string }) {
  const localT = i18next.getFixedT(lang || "en");

  useEffect(() => {
    if (lang) {
      import("../../i18n/config").then((module) => {
        module.default.changeLanguage(lang);
      });
    }
  }, [lang]);

  return (
    <Stars>
      <motion.section
        id="home"
        variants={containerVariants}
        initial="initial"
        animate="animate"
        className="relative z-[2] flex justify-center items-center min-h-[calc(100vh-2px)] px-4"
      >
        <SpotlightParticles />
        <div className="max-w-xl w-full text-center space-y-2">
          <motion.h1
            variants={itemVariants}
            className="text-4xl sm:text-5xl lg:text-6xl font-bold font-sans text-neutral-600 dark:text-neutral-200 leading-tight"
          >
            <motion.span variants={nameBlurVariants} className="inline-block mr-2">
              {localT("home.name")}
            </motion.span>
            <motion.span variants={surnameBlurVariants} className="inline-block text-primary">
              Jarcy
            </motion.span>
          </motion.h1>

          <motion.h2
            variants={itemVariants}
            className="font-vectra text-4xl sm:text-5xl lg:text-6xl font-bold py-2"
          >
            <ShinyText
              text="Software Developer"
              speed={2}
              color="var(--color-secondary)"
              shineColor="var(--color-primary)"
            />
          </motion.h2>

          <motion.article
            variants={descriptionBlurVariants}
            className="dark:text-neutral-400/90 px-4 md:px-0 text-sm sm:text-base"
          >
            {localT("home.description")}
          </motion.article>

          <motion.div variants={languagesBlurVariants}>
            <Languages />
          </motion.div>
        </div>
      </motion.section>
    </Stars>
  );
}
