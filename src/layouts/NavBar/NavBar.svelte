<script lang="ts">
  import { onMount } from "svelte";
  import { fly } from "svelte/transition";
  import { i18next } from "../../i18n/config";
  import ColorPicker from "@/components/colorPicker.svelte";
  import GoLink from "@/components/goLink.svelte";

  let { lang }: { lang?: string } = $props();

  const localT = $derived(i18next.getFixedT(lang || "en"));
  let showMenu = $state(false);
  let showLangMenu = $state(false);
  let mounted = $state(false);
  let langMenuRef: HTMLDivElement;

  onMount(() => {
    requestAnimationFrame(() => (mounted = true));
  });

  $effect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (langMenuRef && !langMenuRef.contains(event.target as Node)) {
        showLangMenu = false;
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  });

  const changeLanguage = (lang: string) => {
    const currentPath = window.location.pathname;
    const pathParts = currentPath.split("/").filter(Boolean);

    const locales = ["es", "en"];
    const hasLocale = locales.includes(pathParts[0]);

    let newPath = "";
    if (lang === "en") {
      newPath = hasLocale ? "/" + pathParts.slice(1).join("/") : currentPath;
    } else {
      newPath = hasLocale ? "/" + lang + "/" + pathParts.slice(1).join("/") : "/" + lang + currentPath;
    }

    newPath = newPath.replace(/\/+$/, "") || "/";

    window.location.href = newPath;
  };

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      history.pushState(null, "", `#${id}`);
    }
  };

  const links: { name: string; href: string; pc: boolean }[] = $derived([
    { name: localT("nav.home"), href: "home", pc: false },
    { name: localT("nav.about"), href: "about", pc: true },
    { name: localT("nav.experience"), href: "experience", pc: true },
    { name: localT("nav.projects"), href: "projects", pc: true },
    { name: localT("nav.hobbie"), href: "hobbie", pc: false },
  ]);
</script>

{#snippet githubIcon()}
  <svg xmlns="http://www.w3.org/2000/svg" class="size-[1.2em]" viewBox="0 0 24 24">
    <g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5">
      <path
        d="M16 22.027v-2.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7a5.44 5.44 0 0 0-1.5-3.75a5.07 5.07 0 0 0-.09-3.77s-1.18-.35-3.91 1.48a13.4 13.4 0 0 0-7 0c-2.73-1.83-3.91-1.48-3.91-1.48A5.07 5.07 0 0 0 5 5.797a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7a3.37 3.37 0 0 0-.94 2.58v2.87"
      ></path>
      <path d="M9 20.027c-3 .973-5.5 0-7-3"></path>
    </g>
  </svg>
{/snippet}

{#snippet mailIcon()}
  <svg xmlns="http://www.w3.org/2000/svg" class="size-[1.2em]" viewBox="0 0 20 20">
    <path
      fill="currentColor"
      d="M15.5 4A2.5 2.5 0 0 1 18 6.5v8a2.5 2.5 0 0 1-2.5 2.5h-11A2.5 2.5 0 0 1 2 14.5v-8A2.5 2.5 0 0 1 4.5 4zM17 7.961l-6.746 3.97a.5.5 0 0 1-.426.038l-.082-.038L3 7.963V14.5A1.5 1.5 0 0 0 4.5 16h11a1.5 1.5 0 0 0 1.5-1.5zM15.5 5h-11A1.5 1.5 0 0 0 3 6.5v.302l7 4.118l7-4.12v-.3A1.5 1.5 0 0 0 15.5 5"
    ></path>
  </svg>
{/snippet}

<nav
  class="fixed flex justify-between items-center gap-3 z-50 top-0 right-5 sm:left-auto w-[calc(100vw-150px)] sm:w-auto transition-all duration-300"
  style="transform: {mounted ? 'none' : 'translateY(-50px)'}; opacity: {mounted
    ? 1
    : 0}; transition: all 300ms cubic-bezier(0.4, 0, 0.2, 1), transform 0.1s cubic-bezier(0, 0, 0.58, 1), opacity 0.1s cubic-bezier(0, 0, 0.58, 1);"
>
  <div class="flex w-full items-center gap-3 mt-2 sm:mt-4 sm:hidden xl:hidden">
    <div
      class="group relative cursor-pointer px-2 py-1 sm:px-3 sm:py-2 text-white dark:text-black border-white dark:border-black border border-dashed hover:border-solid rounded-full overflow-hidden text-center font-semibold"
    >
      <a
        href="https://github.com/jarccy"
        target="_blank"
        aria-label="Github"
        class="inline-block transition-all duration-300 group-hover:-translate-y-12 group-hover:opacity-0"
      >
        {@render githubIcon()}
      </a>

      <a
        href="https://github.com/jarccy"
        target="_blank"
        aria-label="Github"
        class="absolute inset-0 flex items-center justify-center text-black dark:text-white bg-white dark:bg-neutral-900  transition-all duration-300 translate-y-12 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 rounded-full"
      >
        {@render githubIcon()}
      </a>
    </div>

    <div
      class="group relative cursor-pointer px-2 py-1 sm:px-3 sm:py-2 text-white dark:text-black border-white dark:border-black border border-dashed hover:border-solid rounded-full overflow-hidden text-center font-semibold"
    >
      <a
        href="mailto:jarcristhian@gmail.com"
        target="_blank"
        aria-label="Email"
        class="inline-block transition-all duration-300 group-hover:-translate-y-12 group-hover:opacity-0"
      >
        {@render mailIcon()}
      </a>

      <a
        href="mailto:jarcristhian@gmail.com"
        target="_blank"
        aria-label="Email"
        class="absolute inset-0 flex items-center justify-center text-black dark:text-white bg-white dark:bg-neutral-900  transition-all duration-300 translate-y-12 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 rounded-full"
      >
        {@render mailIcon()}
      </a>
    </div>
  </div>

  <div
    class={[
      "flex items-center w-[150px] md:w-full px-4 py-1 sm:py-2 bg-neutral-800/40 shadow rounded-xl mt-2 sm:mt-4",
      !showMenu && "backdrop-blur",
    ]}
  >
    <div class="flex items-center gap-1 sm:gap-4 px-1 w-full justify-between">
      <div class="hidden md:flex items-center gap-3">
        {#each links.filter((link) => link.pc) as link (link.href)}
          <GoLink click={() => scrollToSection(link.href)} showIcon={false}>
            {localT(`${link.name}`)}
          </GoLink>
        {/each}
      </div>

      <div class="flex justify-end gap-1 ml-auto">
        <div class="relative" bind:this={langMenuRef}>
          <button
            onclick={() => (showLangMenu = !showLangMenu)}
            aria-label="Language"
            class="p-1 rounded-full cursor-pointer hover:bg-neutral-200/50 dark:hover:bg-neutral-800 text-neutral-200 hover:text-neutral-200 dark:text-neutral-200 dark:hover:text-neutral-100 transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="size-[1.1em]" viewBox="0 0 24 24">
              <path
                fill="none"
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width={1.5}
                d="m10.5 21l5.25-11.25L21 21m-9-3h7.5M3 5.621a49 49 0 0 1 6-.371m0 0q1.681 0 3.334.114M9 5.25V3m3.334 2.364C11.176 10.658 7.69 15.08 3 17.502m9.334-12.138q1.344.092 2.666.257m-4.589 8.495a18 18 0 0 1-3.827-5.802"
              ></path>
            </svg>
          </button>

          {#if showLangMenu}
            <div
              transition:fly={{ x: -10, duration: 200 }}
              class="absolute right-0 mt-3.5 w-32 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-xl shadow-lg z-30 overflow-hidden"
            >
              <div class="py-1">
                <button
                  onclick={() => changeLanguage("en")}
                  class="w-full text-left px-4 py-2 text-sm text-neutral-600 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-800 hover:text-neutral-900 dark:hover:text-neutral-100 transition-colors"
                >
                  English
                </button>
                <button
                  onclick={() => changeLanguage("es")}
                  class="w-full text-left px-4 py-2 text-sm text-neutral-600 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-800 hover:text-neutral-900 dark:hover:text-neutral-100 transition-colors"
                >
                  Español
                </button>
              </div>
            </div>
          {/if}
        </div>

        <ColorPicker lang={lang || "en"} />
      </div>

      <div class="flex md:hidden ml-2 z-50">
        <label class={["hamburger cursor-pointer relative z-50", showMenu && "active"]}>
          <input type="checkbox" checked={showMenu} onchange={() => (showMenu = !showMenu)} />
          <svg viewBox="0 0 32 32">
            <path
              d="M27 10 13 10C10.8 10 9 8.2 9 6 9 3.5 10.8 2 13 2 15.2 2 17 3.8 17 6L17 26C17 28.2 18.8 30 21 30 23.2 30 25 28.2 25 26 25 23.8 23.2 22 21 22L7 22"
              class="line line-top-bottom"
            ></path>
            <path d="M7 16 27 16" class="line"></path>
          </svg>
        </label>

        {#if showMenu}
          <div class="fixed top-0 left-0 w-screen h-screen backdrop-blur-3xl bg-white/50 dark:bg-neutral-900/50 -z-10">
            <div class="flex flex-col items-end justify-end gap-4 pr-8 mt-20">
              {#each links as link (link.href)}
                <GoLink click={() => scrollToSection(link.href)} showIcon={true}>
                  {link.name}
                </GoLink>
              {/each}
            </div>
          </div>
        {/if}
      </div>
    </div>
  </div>
</nav>
