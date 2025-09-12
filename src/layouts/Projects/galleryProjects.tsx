import { useState } from "react";
import { motion } from "framer-motion";
import { containerVariants, itemProfile } from "@/lib/functions";

interface ImageGalleryProps {
  mainImage: string;
  images: string[];
  name: string;
  description: string;
  technologies: string[];
}

interface GalleryProjectsProps extends ImageGalleryProps {
  children?: React.ReactNode;
}

export default function GalleryProjects({
  mainImage,
  images,
  name,
  description,
  technologies,
  children,
}: GalleryProjectsProps) {
  const [selectedImage, setSelectedImage] = useState<string>(mainImage);

  const setImagen = (image: string) => {
    setSelectedImage(image);
  };

  const goBack = () => {
    window.location.href = "/#projects";
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="offscreen"
      whileInView="onscreen"
      viewport={{ once: true, amount: 0.2 }}
    >
      <div className="flex items-center justify-between">
        <button
          onClick={() => goBack()}
          className="flex items-center gap-2 opacity-70 hover:opacity-100 cursor-pointer"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            className="bi bi-arrow-left"
            viewBox="0 0 16 16"
          >
            <path
              fillRule="evenodd"
              d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z"
            ></path>
          </svg>
          Back
        </button>

        <h1 className="text-2xl md:text-3xl font-bold capitalize">{name}</h1>
      </div>

      <article className="mt-6 mb-5">
        <p className="font-medium text-zinc-600 dark:text-zinc-400 text-sm transition-all duration-300 group-hover:-translate-y-10 group-hover:bg-zinc-100/20 group-hover:backdrop-blur group-hover:dark:bg-zinc-950/90">
          {description}
          {technologies.map((tech, index) => (
            <span
              key={index}
              className="text-zinc-700 font-bold dark:text-neutral-300"
            >
              {tech}
              {index < technologies.length - 1 && index > 0 && ", "}
              <span className="font-normal text-zinc-600 dark:text-zinc-400">
                {index === technologies.length - 2 && " & "}
              </span>
            </span>
          ))}
        </p>
      </article>

      <div className="relative h-full overflow-hidden mb-4">
        {selectedImage === mainImage ? (
          children
        ) : (
          <img
            src={selectedImage}
            alt={name}
            className="transition-transform duration-300 select-none hover:scale-105"
          />
        )}
      </div>

      <motion.div
        variants={itemProfile}
        className="flex gap-4 mt-4 items-center w-2/3 bg-zinc-200/80 dark:bg-zinc-800 rounded-lg overflow-hidden px-3 py-1"
      >
        {images.map((img) => (
          <div
            key={img}
            onClick={() => setImagen(img)}
            className="flex-1 relative h-full overflow-hidden focus:outline-none cursor-pointer"
          >
            <img
              src={img}
              alt={name}
              className={`transition-transform duration-300 select-none`}
            />
          </div>
        ))}
      </motion.div>
    </motion.div>
  );
}
