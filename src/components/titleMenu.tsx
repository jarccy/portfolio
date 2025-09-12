import { TypewriterEffectSmooth } from "./textWrite";

type data = {
  title: string;
  description: string;
  children: React.ReactNode;
};

export const TitleMenu = ({ title, description, children }: data) => {
  return (
    <div className="flex items-center gap-3 mb-4 group">
      <div className="rounded-xl bg-gradient-to-r from-zinc-200 via-zinc-100 to-zinc-50  dark:from-zinc-800 dark:via-zinc-600 dark:to-zinc-500 group">
        <div className="bg-zinc-100 dark:bg-zinc-800 rounded-xl p-2 backdrop-blur-sm flex items-center justify-center ml-1 border-[0.5px] border-zinc-300 dark:border-zinc-700">
          {children}
        </div>
      </div>

      <div className="flex flex-col -space-y-1">
        <div className="h-[35px]">
          <TypewriterEffectSmooth
            className="text-2xl font-bold font-vectra"
            words={[{ text: title }]}
            duration={0.5}
          />
        </div>

        <p className="text-zinc-500 dark:text-zinc-400 text-sm">
          {description}
        </p>
      </div>
    </div>
  );
};
