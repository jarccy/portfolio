import { TypewriterEffectSmooth } from "@/components/textWrite";
import { useState, useRef, useEffect } from "react";
import { ThemeSwitch } from "@/components/themeSwitch"
import { motion, AnimatePresence } from "framer-motion";
import { i18next } from "../../i18n/config";

export default function NavBar({ lang }: { lang?: string }) {
  const localT = i18next.getFixedT(lang || "en");
  const [showMenu, setShowMenu] = useState<boolean>(false);
  const [showLangMenu, setShowLangMenu] = useState<boolean>(false);
  const langMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (langMenuRef.current && !langMenuRef.current.contains(event.target as Node)) {
        setShowLangMenu(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

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

  const links = [
    { name: localT("nav.home"), href: "home" },
    { name: localT("nav.about"), href: "about" },
    { name: localT("nav.experience"), href: "experience" },
    { name: localT("nav.projects"), href: "projects" },
    { name: localT("nav.hobbie"), href: "hobbie" },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-20 flex items-center justify-center transition-all duration-300`}
    >
      <div
        className={
          "flex justify-between items-center w-full sm:max-w-xl md:max-w-xl px-4 py-2 bg-zinc-100/10 dark:bg-zinc-800/20 shadow rounded-xl mt-2 " +
          (showMenu ? "" : "backdrop-blur")
        }
      >
        <div className="h-[35px]" onClick={() => scrollToSection("home")}>
          <TypewriterEffectSmooth
            className="text-xl font-vectra font-bold mt-2 select-none text-zinc-500 dark:text-zinc-200 cursor-pointer"
            words={[{ text: "Jarcy" }]}
            duration={0.5}
          />
        </div>

        <div className="flex items-center gap-3">
          <div className="hidden md:flex items-center gap-4">
            <div
              className="group relative w-fit select-none cursor-pointer"
              onClick={() => scrollToSection("about")}
            >
              <span className="text-zinc-400 hover:text-zinc-600 dark:text-zinc-400 dark:hover:text-zinc-200">
                {localT("nav.about")}
              </span>

              <span className="absolute left-0 bottom-0 h-[1px] w-0 bg-zinc-400 dark:bg-zinc-200 transition-all duration-200 group-hover:w-full"></span>
            </div>

            <div
              className="group relative w-fit select-none cursor-pointer"
              onClick={() => scrollToSection("experience")}
            >
              <span className="text-zinc-400 hover:text-zinc-600 dark:text-zinc-400 dark:hover:text-zinc-200">
                {localT("nav.experience")}
              </span>

              <span className="absolute left-0 bottom-0 h-[1px] w-0 bg-zinc-400 dark:bg-zinc-200 transition-all duration-200 group-hover:w-full"></span>
            </div>

            <div
              className="group relative w-fit select-none cursor-pointer"
              onClick={() => scrollToSection("projects")}
            >
              <span className="text-zinc-400 hover:text-zinc-600 dark:text-zinc-400 dark:hover:text-zinc-200">
                {localT("nav.projects")}
              </span>

              <span className="absolute left-0 bottom-0 h-[1px] w-0 bg-zinc-400 dark:bg-zinc-200 transition-all duration-200 group-hover:w-full"></span>
            </div>
          </div>

          <a
            href="https://github.com/jarccy"
            target="_blank"
            className="p-1 rounded-full cursor-pointer hover:bg-neutral-200/50 dark:hover:bg-zinc-800 text-zinc-400 hover:text-zinc-600 dark:text-zinc-400 dark:hover:text-zinc-200"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="size-[1.2em]"
              viewBox="0 0 24 24"
            >
              <g
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.5"
              >
                <path d="M16 22.027v-2.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7a5.44 5.44 0 0 0-1.5-3.75a5.07 5.07 0 0 0-.09-3.77s-1.18-.35-3.91 1.48a13.4 13.4 0 0 0-7 0c-2.73-1.83-3.91-1.48-3.91-1.48A5.07 5.07 0 0 0 5 5.797a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7a3.37 3.37 0 0 0-.94 2.58v2.87"></path>
                <path d="M9 20.027c-3 .973-5.5 0-7-3"></path>
              </g>
            </svg>
          </a>

          <div className="relative" ref={langMenuRef}>
            <button
              onClick={() => setShowLangMenu(!showLangMenu)}
              className="p-1 rounded-full cursor-pointer hover:bg-neutral-200/50 dark:hover:bg-zinc-800 text-zinc-400 hover:text-zinc-600 dark:text-zinc-400 dark:hover:text-zinc-200 transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="size-[1.1em]" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="m10.5 21l5.25-11.25L21 21m-9-3h7.5M3 5.621a49 49 0 0 1 6-.371m0 0q1.681 0 3.334.114M9 5.25V3m3.334 2.364C11.176 10.658 7.69 15.08 3 17.502m9.334-12.138q1.344.092 2.666.257m-4.589 8.495a18 18 0 0 1-3.827-5.802"></path></svg>
            </button>

            <AnimatePresence>
              {showLangMenu && (
                <motion.div
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  className="absolute right-0 mt-2 w-32 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl shadow-xl z-30 overflow-hidden"
                >
                  <div className="py-1">
                    <button
                      onClick={() => changeLanguage("en")}
                      className="w-full text-left px-4 py-2 text-sm text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors"
                    >
                      English
                    </button>
                    <button
                      onClick={() => changeLanguage("es")}
                      className="w-full text-left px-4 py-2 text-sm text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors"
                    >
                      Español
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <ThemeSwitch className="p-1 rounded-full cursor-pointer hover:bg-neutral-200/50 dark:hover:bg-zinc-800 text-zinc-400 hover:text-zinc-600 dark:text-zinc-400 dark:hover:text-zinc-200" />
        </div>

        <div className="flex md:hidden">
          <label
            className={"hamburger cursor-pointer " + (showMenu ? "z-40" : "")}
          >
            <input
              type="checkbox"
              checked={showMenu}
              onChange={(e) => setShowMenu(!showMenu)}
            />
            <svg viewBox="0 0 32 32">
              <path
                d="M27 10 13 10C10.8 10 9 8.2 9 6 9 3.5 10.8 2 13 2 15.2 2 17 3.8 17 6L17 26C17 28.2 18.8 30 21 30 23.2 30 25 28.2 25 26 25 23.8 23.2 22 21 22L7 22"
                className="line line-top-bottom"
              ></path>
              <path d="M7 16 27 16" className="line"></path>
            </svg>
          </label>

          {showMenu && (
            <div className="absolute top-0 left-0 w-full h-screen backdrop-blur-md bg-zinc-100/10 dark:bg-zinc-800/20">
              <div className="flex flex-col items-end justify-end gap-4 px-6 mt-20">
                {links.map((link, index) => (
                  <div
                    key={link.href}
                    className="group relative w-fit select-none cursor-pointer opacity-0 animate-fade-in-up"
                    style={{ animationDelay: `${index * 100}ms` }}
                    onClick={() => {
                      setShowMenu(false);
                      scrollToSection(link.href);
                    }}
                  >
                    <span className="text-zinc-400 hover:text-zinc-600 dark:text-zinc-400 dark:hover:text-zinc-200">
                      {link.name}
                    </span>

                    <span className="absolute left-0 bottom-0 h-[1px] w-0 bg-zinc-400 dark:bg-zinc-200 transition-all duration-200 group-hover:w-full"></span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
