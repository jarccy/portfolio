import { motion } from "framer-motion";
import { containerVariants, itemVariants, itemUp } from "@/lib/functions";

type project = {
  name: string;
  date: number;
  image: string;
  description: string;
  descriptionEs: string;
  technologies: string[];
};

export const CardProject = ({
  project,
  locale,
  children,
}: {
  project: project;
  locale: string;
  children: React.ReactNode;
}) => {
  return (
    <motion.div
      variants={containerVariants}
      initial="offscreen"
      whileInView="onscreen"
      viewport={{ once: true, amount: 0.2 }}
    >
      <motion.div
        variants={itemVariants}
        className="group h-64 px-3 pt-2 pb-3 rounded-xl transition-all duration-300 hover:scale-105 bg-gradient-to-tr from-white via-neutral-100
          to-neutral-200/30 dark:border-t hover:border-t-4 border border-zinc-200 hover:border-t-zinc-700 dark:border-zinc-800 dark:hover:border-t-neutral-300 dark:from-zinc-950 dark:via-zinc-900 dark:to-zinc-800
          relative overflow-hidden flex flex-col justify-between"
      >
        <div className="flex items-center justify-between mb-2">
          <span className="font-semibold capitalize">{project.name}</span>
          <span className="font-vectra text-xs font-semibold opacity-50 mt-1">
            {project.date}
          </span>
        </div>

        <div className="relative h-full overflow-hidden">{children}</div>

        <motion.div variants={itemUp} className="relative mt-1">
          <p className="font-medium text-zinc-600 dark:text-zinc-400 text-sm transition-all duration-300 group-hover:-translate-y-10 group-hover:bg-zinc-100/20 group-hover:backdrop-blur group-hover:dark:bg-zinc-950/90">
            {locale === "en" ? project.description : project.descriptionEs}
            {project.technologies.map((tech, index) => (
              <span
                key={index}
                className="text-zinc-700 font-bold dark:text-neutral-300"
              >
                {tech}
                {index < project.technologies.length - 1 && index > 0 && ", "}
                <span className="font-normal text-zinc-600 dark:text-zinc-400">
                  {index === project.technologies.length - 2 && " & "}
                </span>

                {index === project.technologies.length - 1 && "."}
              </span>
            ))}
          </p>

          <a
            className="absolute group-hover:-translate-y-7 translate-y-4 select-none
            inline-flex items-center gap-2 px-3 py-1.5 text-xs font-medium rounded-full transition-all duration-300
             text-white dark:text-zinc-900 bg-zinc-700 dark:bg-neutral-200 cursor-pointer hover:scale-105 active:scale-95 active:brightness-90 group/svg"
            href={locale === "en" ? `/project/${project.name}` : `/es/project/${project.name}`}
          >
            {locale === "en" ? "Show more" : "Mostrar más"}
            <svg
              className="h-3.5 w-3.5 transition-transform duration-500 -translate-x-1 group-hover/svg:translate-x-0.5"
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden="true"
            >
              <path
                d="M7.5 5.5l5 4.5-5 4.5"
                stroke="currentColor"
                strokeWidth="1.5"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </a>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};
