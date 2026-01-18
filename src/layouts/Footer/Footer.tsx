import { motion } from "framer-motion";
import { containerVariants, itemVariants } from "@/lib/functions";

export default function Footer() {
  return (
    <motion.section
      id="hobbie"
      variants={containerVariants}
      initial="offscreen"
      whileInView="onscreen"
      viewport={{ once: true, amount: 0.2 }}
      className="w-full max-w-2xl mx-auto pt-40 mb-40 px-4"
    >
      <motion.div
        variants={itemVariants}
        className="flex flex-col mt-6 h-[475px] justify-center items-center"
      >
        <div>a</div>
      </motion.div>
    </motion.section>
  );
}
