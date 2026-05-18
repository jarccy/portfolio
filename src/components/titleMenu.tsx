import { TypewriterEffectSmooth } from "./textWrite";

type data = {
  title: string;
  description: string;
  children: React.ReactNode;
};

export const TitleMenu = ({ title, description, children }: data) => {
  return (
    <div className="flex items-center gap-3 mb-4 group">
      <div className="rounded-xl bg-gradient-to-r from-neutral-200 via-neutral-100 to-neutral-50  dark:from-neutral-800 dark:via-neutral-600 dark:to-neutral-500 group">
        <div className="bg-neutral-100 dark:bg-neutral-800 rounded-xl p-2 backdrop-blur-sm flex items-center justify-center ml-1 border-[0.5px] border-neutral-300 dark:border-neutral-700">
          {children}
        </div>
      </div>

      <div className="flex flex-col -space-y-1">
        <div className="h-[35px]">
          <TypewriterEffectSmooth
            className="text-primary text-2xl font-bold font-vectra"
            words={[{ text: title }]}
            duration={0.5}
          />
        </div>

        <p className="text-neutral-500 dark:text-neutral-400 text-sm">
          {description}
        </p>
      </div>
    </div>
  );
};
