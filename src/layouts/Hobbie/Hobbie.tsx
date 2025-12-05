import { useCallback, useEffect, useState } from "react";
import { TitleMenu } from "../../components/titleMenu";
import { motion } from "framer-motion";
import { containerVariants, itemVariants } from "@/lib/functions";
import { TypewriterEffectSmooth } from "@/components/textWrite";
import { AnimatedShinyText } from "@/components/shinyText";
const apiUrl = import.meta.env.PUBLIC_BACKEND_API;
const apiKey = import.meta.env.PUBLIC_API_KEY;

export default function Hobbie() {
  const [showIframe, setShowIframe] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  const [liked, setLiked] = useState(false);

  const fetchLikeCount = useCallback(async () => {
      await fetch(`${apiUrl}/api/likes?website=stadistics-port`,{
        method: "GET",
        headers: { "Content-Type": "application/json","jarcy-key": apiKey },
      }).then((res) => res.json())
      .then((data) => {
        setLikeCount(data.total);
      })
      .catch((error) => {
        console.error("Error fetching like count:", error);
      });
  }, []);

  const checkLocalLiked = () => {
    const storedLiked = localStorage.getItem("liked");
    if (storedLiked === "true") {
      setLiked(true);
    }
  };

  useEffect(() => {
    fetchLikeCount();
    checkLocalLiked();

    const timer = setTimeout(() => setShowIframe(true), 2000);
    return () => clearTimeout(timer);
  }, [fetchLikeCount]);

  const incrementLike = async () => {
    if (liked) return;

    setLiked(true);
    setLikeCount((prev) => prev + 1);
    localStorage.setItem("liked", "true");

    await fetch(`${apiUrl}/api/likes`, {
      method: "POST",
      headers: { "Content-Type": "application/json", "jarcy-key": apiKey },
      body: JSON.stringify({ website: "stadistics-port", timestamp: new Date().toISOString() }),
    }).catch((error) => {
      console.error("Error sending like:", error);
    });
  };

  return (
    <motion.section
      id="hobbie"
      variants={containerVariants}
      initial="offscreen"
      whileInView="onscreen"
      viewport={{ once: true, amount: 0.2 }}
      className="w-full max-w-2xl mx-auto pt-40 mb-40 px-4"
    >
      <motion.div variants={itemVariants}>
        <TitleMenu title="Hobbie" description="I like so much listen music">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            className="size-5.5 transition-transform duration-300 group-hover:scale-110"
          >
            <path
              fill="none"
              stroke="currentColor"
              strokeWidth={1.5}
              d="M22 18c0 1.4 0 2.1-.273 2.635a2.5 2.5 0 0 1-1.092 1.092C20.1 22 19.4 22 18 22s-2.1 0-2.635-.273a2.5 2.5 0 0 1-1.092-1.092C14 20.1 14 19.4 14 18s0-2.1.273-2.635a2.5 2.5 0 0 1 1.092-1.092C15.9 14 16.6 14 18 14s2.1 0 2.635.273a2.5 2.5 0 0 1 1.092 1.092C22 15.9 22 16.6 22 18Zm0-8c0 1.4 0 2.1-.273 2.635a2.5 2.5 0 0 1-1.092 1.092C20.1 14 19.4 14 18 14s-2.1 0-2.635-.273a2.5 2.5 0 0 1-1.092-1.092C14 12.1 14 11.4 14 10s0-2.1.273-2.635a2.5 2.5 0 0 1 1.092-1.093C15.9 6 16.6 6 18 6s2.1 0 2.635.272a2.5 2.5 0 0 1 1.092 1.093C22 7.9 22 8.6 22 10Zm-8 8c0 1.4 0 2.1-.273 2.635a2.5 2.5 0 0 1-1.092 1.092C12.1 22 11.4 22 10 22s-2.1 0-2.635-.273a2.5 2.5 0 0 1-1.093-1.092C6 20.1 6 19.4 6 18s0-2.1.272-2.635a2.5 2.5 0 0 1 1.093-1.092C7.9 14 8.6 14 10 14s2.1 0 2.635.273a2.5 2.5 0 0 1 1.092 1.092C14 15.9 14 16.6 14 18ZM10 6c0 1.4 0 2.1-.272 2.635a2.5 2.5 0 0 1-1.093 1.093C8.1 10 7.4 10 6 10s-2.1 0-2.635-.272a2.5 2.5 0 0 1-1.093-1.093C2 8.1 2 7.4 2 6s0-2.1.272-2.635a2.5 2.5 0 0 1 1.093-1.093C3.9 2 4.6 2 6 2s2.1 0 2.635.272a2.5 2.5 0 0 1 1.093 1.093C10 3.9 10 4.6 10 6Z"
            ></path>
          </svg>
        </TitleMenu>
      </motion.div>

      <motion.div
        variants={itemVariants}
        className="flex flex-col mt-6 h-[475px] justify-center items-center"
      >
        {!showIframe ? (
          <span className="text-lg text-zinc-500 dark:text-zinc-400 animate-pulse">
            Loading Spotify...
          </span>
        ) : (
          <iframe
            src="https://open.spotify.com/embed/playlist/1obkalHY41oiRotc1UfEMm?utm_source=generator&amp;theme=0"
            width="100%"
            height="475"
            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
            loading="lazy"
          ></iframe>
        )}
      </motion.div>

      <div className="text-center font-vectra font-bold mt-10 text-2xl select-none text-zinc-300 dark:text-zinc-500">
        {likeCount}
      </div>

      <div className="flex justify-center items-center">
        <div className={"heart-container " + (liked && "pointer-events-none")}>
          <input
            type="checkbox"
            className="checkbox"
            id="Give-It-An-Id"
            checked={liked}
            onChange={() => {
              incrementLike();
            }}
          />
          <div className="svg-container">
            <svg
              viewBox="0 0 24 24"
              className="svg-outline"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M17.5,1.917a6.4,6.4,0,0,0-5.5,3.3,6.4,6.4,0,0,0-5.5-3.3A6.8,6.8,0,0,0,0,8.967c0,4.547,4.786,9.513,8.8,12.88a4.974,4.974,0,0,0,6.4,0C19.214,18.48,24,13.514,24,8.967A6.8,6.8,0,0,0,17.5,1.917Zm-3.585,18.4a2.973,2.973,0,0,1-3.83,0C4.947,16.006,2,11.87,2,8.967a4.8,4.8,0,0,1,4.5-5.05A4.8,4.8,0,0,1,11,8.967a1,1,0,0,0,2,0,4.8,4.8,0,0,1,4.5-5.05A4.8,4.8,0,0,1,22,8.967C22,11.87,19.053,16.006,13.915,20.313Z"></path>
            </svg>
            <svg
              viewBox="0 0 24 24"
              className="svg-filled"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M17.5,1.917a6.4,6.4,0,0,0-5.5,3.3,6.4,6.4,0,0,0-5.5-3.3A6.8,6.8,0,0,0,0,8.967c0,4.547,4.786,9.513,8.8,12.88a4.974,4.974,0,0,0,6.4,0C19.214,18.48,24,13.514,24,8.967A6.8,6.8,0,0,0,17.5,1.917Z"></path>
            </svg>
            <svg
              className="svg-celebrate"
              width="100"
              height="100"
              xmlns="http://www.w3.org/2000/svg"
            >
              <polygon points="10,10 20,20"></polygon>
              <polygon points="10,50 20,50"></polygon>
              <polygon points="20,80 30,70"></polygon>
              <polygon points="90,10 80,20"></polygon>
              <polygon points="90,50 80,50"></polygon>
              <polygon points="80,80 70,70"></polygon>
            </svg>
          </div>
        </div>
      </div>

      <div className="h-[80px] flex justify-center items-center w-full">
        {liked && (
          <AnimatedShinyText>
            <TypewriterEffectSmooth
              className="text-zinc-600 dark:text-zinc-500 font-vectra font-bold text-xl text-shine"
              words={[{ text: "Thank you for visiting my portfolio!" }]}
              duration={1.5}
            />
          </AnimatedShinyText>
        )}
      </div>
    </motion.section>
  );
}
