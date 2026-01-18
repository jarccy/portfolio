import { CardProfile } from "@/components/cardProfile";
import { TitleMenu } from "../../components/titleMenu";
import { motion } from "framer-motion";
import { containerVariants, itemVariants, itemProfile } from "@/lib/functions";
import { i18next } from "@/i18n/config";

export default function About({ lang }: { lang: string }) {
  const localT = i18next.getFixedT(lang || "en");

  const openMail = () => {
    window.location.href = "mailto:jarcristhian@gmail.com";
  };

  return (
    <motion.section
      id="about"
      variants={containerVariants}
      initial="offscreen"
      whileInView="onscreen"
      viewport={{ once: true, amount: 0.2 }}
      className="w-full max-w-2xl mx-auto pt-40 mb-10 px-4"
    >
      <motion.div variants={itemVariants}>
        <TitleMenu
          title={localT("about.title")}
          description={localT("about.description")}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            className="size-6 transition-transform duration-300 group-hover:scale-110"
          >
            <path
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M19.618 21.25c0-3.602-4.016-6.53-7.618-6.53s-7.618 2.928-7.618 6.53M12 11.456a4.353 4.353 0 1 0 0-8.706a4.353 4.353 0 0 0 0 8.706"
            ></path>
          </svg>
        </TitleMenu>
      </motion.div>

      <div className="flex flex-col md:flex-row gap-5 mt-6">
        <motion.div variants={itemVariants} className="flex flex-col gap-2">
          <p className="text-sm md:text-base text-zinc-600 dark:text-zinc-400 mb-4 min-w-[350px]">
            {localT("about.header")}{" "}
            <span className="text-zinc-800 dark:text-zinc-200 font-semibold">
              Jar Cristhian
            </span>
            {localT("about.description2")}
          </p>
          <div className="flex gap-4 ">
            <button
              className="relative inline-flex select-none items-center gap-2 cursor-pointer rounded-2xl px-4 py-2 font-medium
            bg-white/10 border border-white/20 backdrop-blur-lg shadow-md hover:scale-105 
            active:scale-95 active:brightness-90 transition-all duration-300"
            >
              {localT("about.resume")}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                className="h-5 w-5"
              >
                <path
                  fill="currentColor"
                  d="m12 15.577l-3.539-3.538l.708-.72L11.5 13.65V5h1v8.65l2.33-2.33l.709.719zM6.616 19q-.691 0-1.153-.462T5 17.384v-2.423h1v2.423q0 .231.192.424t.423.192h10.77q.23 0 .423-.192t.192-.424v-2.423h1v2.423q0 .691-.462 1.153T17.384 19z"
                />
              </svg>
            </button>

            <button
              className="inline-flex  select-none items-center gap-2 cursor-pointer rounded-2xl px-2 md:px-6 py-1.5 font-medium hover:scale-105 transition-transform duration-300
          text-white dark:text-zinc-900 bg-zinc-700 dark:bg-neutral-200 active:scale-95 active:brightness-90 group/svg
          "
              onClick={openMail}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                className="h-4.5 w-4.5"
              >
                <g fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m7 9l5 3.5L17 9"
                  />
                  <path d="M2 17V7a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2Z" />
                </g>
              </svg>
              {localT("about.contact")}
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
            </button>
          </div>
        </motion.div>

        <motion.div
          variants={itemProfile}
          className="flex items-center justify-center "
        >
          <CardProfile>
            <button
              type="button"
              className="flex w-56 cursor-pointer flex-col mt-4 md:-mt-2 items-stretch rounded-[16px] border-0 bg-neutral-100 dark:bg-zinc-900 saturate-0 p-2"
              aria-label="Jarcy"
              style={{
                transformStyle: "preserve-3d",
                transform: "none",
                opacity: 1,
              }}
            >
              <div className="mx-2 flex-1">
                <div className="relative mt-2 aspect-[3/3] w-full">
                  <img
                    loading="eager"
                    className="absolute select-none pointer-events-none inset-0 h-full w-full rounded-[16px] bg-[#000000] object-cover"
                    alt="Invite background"
                    src="/images/profile.webp"
                    style={{
                      boxShadow: "rgba(0, 0, 0, 0.05) 0px 5px 6px 0px",
                      opacity: 1,
                    }}
                  />
                </div>
              </div>
              <div className="font-vectra font-bold mt-2 flex flex-shrink-0 items-center justify-between p-2 text-white">
                <div className=" text-zinc-500 dark:text-zinc-400">
                  Jar Cristhian
                </div>
                <div className="text-xs text-gray-300 opacity-50">23/05</div>
              </div>
            </button>
          </CardProfile>
        </motion.div>
      </div>
    </motion.section>
  );
}
