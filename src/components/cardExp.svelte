<script lang="ts">
  type Company = {
    name: string;
    charge: string;
    period: string;
    description: string;
    technologies: string;
  };

  let { company }: { company: Company } = $props();

  const cardClass =
    "w-full relative h-full rounded-2xl p-2 px-3 overflow-hidden " +
    "bg-gradient-to-tr from-white via-neutral-100 to-neutral-100 " +
    "dark:from-neutral-950 dark:via-neutral-900 dark:to-neutral-800 " +
    "border border-neutral-200 dark:border-neutral-800 " +
    "md:transition-all md:duration-300 md:hover:scale-105 " +
    "md:hover:border-t-4 md:hover:border-t-neutral-700 dark:md:hover:border-t-neutral-300";
</script>

<div class={cardClass}>
  <div class="flex flex-col justify-between h-full">
    <div class="-space-y-2">
      <div class="flex flex-wrap justify-between items-center">
        <span class="text-lg font-semibold text-neutral-600 dark:text-neutral-300">
          {company.name}
        </span>
        <span class="text-xs font-semibold text-primary/70">
          {company.period}
        </span>
      </div>
      <span class="text-xs font-semibold text-neutral-400 dark:text-neutral-500">
        {company.charge}
      </span>
    </div>

    <div class="flex flex-col gap-2">
      <span class="text-sm text-neutral-500 dark:text-neutral-400">
        {company.description}
      </span>
      <span class="font-semibold text-neutral-600 dark:text-neutral-300 mb-2">
        {company.technologies}
      </span>
    </div>
  </div>

  <img
    src="/images/background.svg"
    alt="Background"
    width="200"
    height="200"
    class="hidden md:block select-none grayscale pointer-events-none object-cover object-left-top h-[80%] absolute -bottom-10 inset-x-0 w-full"
  />
</div>
