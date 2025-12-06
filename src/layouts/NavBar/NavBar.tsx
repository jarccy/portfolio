import { TypewriterEffectSmooth } from "@/components/textWrite";
import { useState } from "react";

export default function NavBar() {
  // const [theme, setTheme] = useState<"light" | "dark">("dark");
  const [showMenu, setShowMenu] = useState<boolean>(false);

  // useEffect(() => {
  //   const savedTheme = localStorage.getItem("theme") as "light" | "dark";

  //   if (savedTheme) {
  //     setTheme(savedTheme);
  //   }
  // }, []);

  // useEffect(() => {
  //   const timeout = setTimeout(() => {
  //     setShowText(true);
  //   }, 500);

  //   return () => clearTimeout(timeout);
  // }, []);

  const handleThemeToggle = (e: React.MouseEvent) => {
    const x = `${e.clientX}px`;
    const y = `${e.clientY}px`;

    document.documentElement.style.setProperty("--circle-x", x);
    document.documentElement.style.setProperty("--circle-y", y);

    const applyTheme = () => {
      document.documentElement.classList.toggle("dark");
      localStorage.theme = document.documentElement.classList.contains("dark")
        ? "dark"
        : "light";

      // setTheme(
      //   document.documentElement.classList.contains("dark") ? "dark" : "light"
      // );
    };

    if (document.startViewTransition) {
      document.documentElement.classList.add("circle-reveal");

      requestAnimationFrame(() => {
        document
          .startViewTransition(() => {
            applyTheme();
          })
          .finished.finally(() => {
            setTimeout(() => {
              document.documentElement.classList.remove("circle-reveal");
            }, 300);
          });
      });
    } else {
      applyTheme();
    }
  };

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      history.pushState(null, "", `#${id}`);
    }
  };

  const links = [
    { name: "Home", href: "home" },
    { name: "About", href: "about" },
    { name: "Experience", href: "experience" },
    { name: "Projects", href: "projects" },
    { name: "Hobbie", href: "hobbie" },
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
                About
              </span>

              <span className="absolute left-0 bottom-0 h-[1px] w-0 bg-zinc-400 dark:bg-zinc-200 transition-all duration-200 group-hover:w-full"></span>
            </div>

            <div
              className="group relative w-fit select-none cursor-pointer"
              onClick={() => scrollToSection("experience")}
            >
              <span className="text-zinc-400 hover:text-zinc-600 dark:text-zinc-400 dark:hover:text-zinc-200">
                Experience
              </span>

              <span className="absolute left-0 bottom-0 h-[1px] w-0 bg-zinc-400 dark:bg-zinc-200 transition-all duration-200 group-hover:w-full"></span>
            </div>

            <div
              className="group relative w-fit select-none cursor-pointer"
              onClick={() => scrollToSection("projects")}
            >
              <span className="text-zinc-400 hover:text-zinc-600 dark:text-zinc-400 dark:hover:text-zinc-200">
                Projects
              </span>

              <span className="absolute left-0 bottom-0 h-[1px] w-0 bg-zinc-400 dark:bg-zinc-200 transition-all duration-200 group-hover:w-full"></span>
            </div>
          </div>

          <a
            href="https://x.com/cristhian_jar"
            target="_blank"
            className="p-1 rounded-full cursor-pointer hover:bg-neutral-200/50 dark:hover:bg-zinc-800 text-zinc-400 hover:text-zinc-600 dark:text-zinc-400 dark:hover:text-zinc-200"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="size-[1.1em]"
              viewBox="0 0 16 16"
            >
              <path
                fill="currentColor"
                d="M9.294 6.928L14.357 1h-1.2L8.762 6.147L5.25 1H1.2l5.31 7.784L1.2 15h1.2l4.642-5.436L10.751 15h4.05zM7.651 8.852l-.538-.775L2.832 1.91h1.843l3.454 4.977l.538.775l4.491 6.47h-1.843z"
              ></path>
            </svg>
          </a>

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

          <button
            onClick={(e) => handleThemeToggle(e)}
            className="p-1 rounded-full cursor-pointer hover:bg-neutral-200/50 dark:hover:bg-zinc-800 text-zinc-400 hover:text-zinc-600 dark:text-zinc-400 dark:hover:text-zinc-200"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 256 256"
              className="size-5"
            >
              <path d="M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24Zm8,16.37a86.4,86.4,0,0,1,16,3V212.67a86.4,86.4,0,0,1-16,3Zm32,9.26a87.81,87.81,0,0,1,16,10.54V195.83a87.81,87.81,0,0,1-16,10.54ZM40,128a88.11,88.11,0,0,1,80-87.63V215.63A88.11,88.11,0,0,1,40,128Zm160,50.54V77.46a87.82,87.82,0,0,1,0,101.08Z"></path>
            </svg>
          </button>
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
