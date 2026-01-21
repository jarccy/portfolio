type Company = {
  name: string;
  charge: string;
  period: string;
  description: string;
  technologies: string;
};

export const CardExperience = ({ company }: { company: Company }) => {
  const { name, charge, period, description, technologies } = company;

  return (
    <div className={cardClass}>
      <div className="flex flex-col justify-between h-full">
        <div className="-space-y-2">
          <div className="flex flex-wrap justify-between items-center">
            <span className="text-lg font-semibold text-zinc-600 dark:text-zinc-300">
              {name}
            </span>
            <span className="text-xs font-semibold text-primary/70">
              {period}
            </span>
          </div>
          <span className="text-xs font-semibold text-zinc-400 dark:text-zinc-500">
            {charge}
          </span>
        </div>

        <div className="flex flex-col gap-2">
          <span className="text-sm text-zinc-500 dark:text-zinc-400">
            {description}
          </span>
          <span className="font-semibold text-zinc-600 dark:text-zinc-300 mb-2">
            {technologies}
          </span>
        </div>
      </div>

      <img
        src="/images/background.svg"
        alt="Background"
        width="200"
        height="200"
        className="hidden md:block select-none grayscale pointer-events-none object-cover object-left-top h-[80%] absolute -bottom-10 inset-x-0 w-full"
      />
    </div>
  );
};

const cardClass =
  "w-full relative h-full rounded-2xl p-2 px-3 overflow-hidden " +
  "bg-gradient-to-tr from-white via-neutral-100 to-neutral-100 " +
  "dark:from-zinc-950 dark:via-zinc-900 dark:to-zinc-800 " +
  "border border-zinc-200 dark:border-zinc-800 " +
  "dark:border-t " +
  "md:transition-all md:duration-300 md:hover:scale-105 " +
  "md:hover:border-t-4 md:hover:border-t-zinc-700 dark:md:hover:border-t-neutral-300";
