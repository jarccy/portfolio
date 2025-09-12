// import { motion } from "framer-motion";

type company = {
  name: string;
  charge: string;
  period: string;
  description: string;
  technologies: string;
};

export const CardExperience = ({ company }: { company: company }) => {
  return (
    <div
      className="w-full overflow-hidden relative h-full rounded-2xl p-2 px-3 transition-all duration-300 hover:scale-105 bg-gradient-to-tr from-white via-neutral-100
          to-neutral-100 dark:from-zinc-950 dark:via-zinc-900 dark:to-zinc-800 dark:border-t hover:border-t-4 border border-zinc-200 hover:border-t-zinc-700 dark:border-zinc-800 dark:hover:border-t-neutral-300"
    >
      <div className="flex flex-col justify-between h-full">
        <div className="-space-y-2">
          <div className="flex flex-wrap justify-between items-center">
            <span className="text-lg font-semibold text-zinc-600 dark:text-zinc-300">
              {company.name}
            </span>
            <span className="text-xs font-semibold text-zinc-400 dark:text-zinc-500">
              {company.period}
            </span>
          </div>

          <span className="text-xs font-semibold text-zinc-400 dark:text-zinc-500">
            {company.charge}
          </span>
        </div>

        <div className="flex flex-col gap-2">
          <span className="text-sm text-zinc-500 dark:text-zinc-400">
            {company.description}
          </span>

          <span className="font-semibold text-zinc-600 dark:text-zinc-300 mb-2">
            {company.technologies}
          </span>
        </div>
      </div>

      <BackgroundCard />
    </div>
  );
};

const BackgroundCard = () => {
  return (
    <img
      src="/images/background.svg"
      alt="Background"
      width="200"
      height="200"
      className="select-none grayscale pointer-events-none object-cover object-left-top h-[80%] absolute -bottom-10 inset-x-0 w-full"
    />
  );
};
