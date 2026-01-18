import { motion, type Variants } from "framer-motion";
import Languages from "./Languages";
import { BackgroundBeamsWithCollision } from "./Stars";
import { useEffect, useState } from "react";
import { i18next } from "@/i18n/config";
// import Preloader from "./Loader";

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

export default function Home({ lang }: { lang: string }) {
  const localT = i18next.getFixedT(lang || "en");
  const [isPreloaderVisible, setIsPreloaderVisible] = useState(true);

  useEffect(() => {
    if (lang) {
      import("../../i18n/config").then((module) => {
        module.default.changeLanguage(lang);
      });
    }

    const timer = setTimeout(() => {
      setIsPreloaderVisible(false);
    }, 100);

    return () => clearTimeout(timer);
  }, [lang]);


  return (
    <BackgroundBeamsWithCollision>
      {isPreloaderVisible ? (
        <>
          {/* <Preloader /> */}
          <div
            id="home"
            className="relative z-[2] flex justify-center items-center min-h-[calc(100vh-12px)]"
          >
          </div>
        </>
      ) : (
        <motion.section
          id="home"
          variants={containerVariants}
          initial="initial"
          animate="animate"
          className="relative z-[2] flex justify-center items-center min-h-[calc(100vh-12px)] px-4"
        >
          <div className="max-w-xl w-full text-center">
            <motion.h1
              variants={itemVariants}
              className="text-4xl sm:text-5xl lg:text-6xl font-bold font-sans text-primary leading-tight"
            >
              {localT("home.name")}
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
              {localT("home.description")}
            </motion.article>

            <motion.div variants={itemVariants}>
              <Languages />
            </motion.div>
          </div>
        </motion.section>
      )}
    </BackgroundBeamsWithCollision>
  );
}
