<script lang="ts">
  import CardProfile from "@/components/cardProfile.svelte";
  import TitleMenu from "../../components/titleMenu.svelte";
  import { STAGGER, inview, itemProfile, itemVariants, reveal } from "@/lib/functions";
  import { i18next } from "@/i18n/config";

  let { lang }: { lang: string } = $props();

  const localT = $derived(i18next.getFixedT(lang || "en"));
  let visible = $state(false);

  const openMail = () => {
    window.location.href = "mailto:jarcristhian@gmail.com";
  };
</script>

<section
  id="about"
  use:inview={{ amount: 0.2, once: true, onenter: () => (visible = true) }}
  class="w-full max-w-2xl mx-auto pt-40 mb-10 px-4"
>
  <div style={reveal(visible, itemVariants, 0)}>
    <TitleMenu title={localT("about.title")} description={localT("about.description")}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        class="size-6 transition-transform duration-300 group-hover:scale-110"
      >
        <path
          fill="none"
          stroke="currentColor"
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width={1.5}
          d="M19.618 21.25c0-3.602-4.016-6.53-7.618-6.53s-7.618 2.928-7.618 6.53M12 11.456a4.353 4.353 0 1 0 0-8.706a4.353 4.353 0 0 0 0 8.706"
        ></path>
      </svg>
    </TitleMenu>
  </div>

  <div class="flex flex-col md:flex-row gap-5 mt-6">
    <div style={reveal(visible, itemVariants, STAGGER)} class="flex flex-col gap-2">
      <p class="text-sm md:text-base text-neutral-600 dark:text-neutral-400 mb-4 min-w-[350px]">
        {localT("about.header")}{" "}
        <span class="text-primary font-semibold">Jar Cristhian</span>
        {localT("about.description2")}
      </p>
      <div class="flex gap-4 ">
        <button
          class="relative inline-flex select-none items-center gap-2 cursor-pointer rounded-2xl px-4 py-2 font-medium
            bg-white/10 border border-white/20 backdrop-blur-lg shadow-md hover:scale-105
            active:scale-95 active:brightness-90 transition-all duration-300"
        >
          {localT("about.resume")}
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="h-5 w-5">
            <path
              fill="currentColor"
              d="m12 15.577l-3.539-3.538l.708-.72L11.5 13.65V5h1v8.65l2.33-2.33l.709.719zM6.616 19q-.691 0-1.153-.462T5 17.384v-2.423h1v2.423q0 .231.192.424t.423.192h10.77q.23 0 .423-.192t.192-.424v-2.423h1v2.423q0 .691-.462 1.153T17.384 19z"
            />
          </svg>
        </button>

        <button
          class="inline-flex  select-none items-center gap-2 cursor-pointer rounded-2xl px-2 md:px-6 py-1.5 font-medium hover:scale-105 transition-transform duration-300
          text-white dark:text-neutral-900 bg-primary active:scale-95 active:brightness-90 group/svg
          "
          onclick={openMail}
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="h-4.5 w-4.5">
            <g fill="none" stroke="currentColor" stroke-width="1.5">
              <path stroke-linecap="round" stroke-linejoin="round" d="m7 9l5 3.5L17 9" />
              <path d="M2 17V7a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2Z" />
            </g>
          </svg>
          {localT("about.contact")}
          <svg
            class="h-3.5 w-3.5 transition-transform duration-500 -translate-x-1 group-hover/svg:translate-x-0.5"
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
          >
            <path
              d="M7.5 5.5l5 4.5-5 4.5"
              stroke="currentColor"
              stroke-width="1.5"
              fill="none"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </button>
      </div>
    </div>

    <div style={reveal(visible, itemProfile, STAGGER * 2)} class="flex items-center justify-center ">
      <CardProfile>
        <button
          type="button"
          class="flex w-56 cursor-pointer flex-col mt-4 md:-mt-2 items-stretch rounded-[16px] border-0 bg-neutral-100 dark:bg-neutral-900 saturate-0 p-2"
          aria-label="Jarcy"
          style="transform-style: preserve-3d; transform: none; opacity: 1;"
        >
          <div class="mx-2 flex-1">
            <div class="relative mt-2 aspect-[3/3] w-full">
              <img
                loading="eager"
                class="absolute select-none pointer-events-none inset-0 h-full w-full rounded-[16px] bg-[#000000] object-cover"
                alt="Invite background"
                src="/images/profile.webp"
                style="box-shadow: rgba(0, 0, 0, 0.05) 0px 5px 6px 0px; opacity: 1;"
              />
            </div>
          </div>
          <div class="font-vectra font-bold mt-2 flex flex-shrink-0 items-center justify-between p-2 text-white">
            <div class=" text-neutral-500 dark:text-neutral-400">Jar Cristhian</div>
            <div class="text-xs text-gray-300 opacity-50">23/05</div>
          </div>
        </button>
      </CardProfile>
    </div>
  </div>
</section>
