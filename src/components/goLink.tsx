import { cn } from "@/lib/utils";

// export const GoLink = ({
//   children,
//   click,
//   className,
//   showIcon,
// }: {
//   children: React.ReactNode;
//   click: () => void;
//   className?: string;
//   showIcon: boolean;
// }) => {
//   return (
//     <button
//       onClick={click}
//       className={cn(
//         className,
//         "group relative flex items-center cursor-pointer",
//         "before:pointer-events-none before:absolute before:left-0 before:w-full before:bg-white before:content-['']",
//         "before:scale-x-1 before:transition-all before:duration-300 before:ease-[cubic-bezier(0.4,0,0.2,1)]",
//         "before:origin-left md:before:top-0",
//         "before:z-1 px-2 before:h-full before:scale-x-0 before:mix-blend-difference hover:before:scale-x-100",
//       )}
//     >
//       {children}
//       {showIcon && (
//         <svg
//           className="z-0 ml-[0.6em] mt-[0em] size-[0.55em] -translate-x-1 rotate-45 opacity-0 transition-all duration-300 [motion-reduce:transition-none] group-hover:translate-x-0 group-hover:opacity-100 motion-reduce:transition-none"
//           fill="none"
//           viewBox="0 0 10 10"
//           xmlns="http://www.w3.org/2000/svg"
//           aria-hidden="true"
//         >
//           <path
//             d="M1.004 9.166 9.337.833m0 0v8.333m0-8.333H1.004"
//             stroke="currentColor"
//             strokeWidth="1.25"
//             strokeLinecap="round"
//             strokeLinejoin="round"
//           ></path>
//         </svg>
//       )}
//     </button>
//   );
// };

export const GoLink = ({
  children,
  click,
  className,
  showIcon,
}: {
  children: React.ReactNode;
  click: () => void;
  className?: string;
  showIcon: boolean;
}) => {
  return (
    <button
      onClick={click}
      className={cn(
        className,
        // "group relative flex items-center cursor-pointer",
        // "before:pointer-events-none before:absolute before:left-0 before:w-full before:bg-white before:content-['']",
        // "before:origin-right before:scale-x-0 before:transition-all before:duration-300 before:ease-[cubic-bezier(0.4,0,0.2,1)]",
        // "before:origin-center md:before:bottom-0",
        // "before:z-1 px-2 before:h-0 before:scale-x-100 before:mix-blend-difference hover:before:h-[1.4em]",
        "group relative flex items-center cursor-pointer",
        "before:pointer-events-none before:absolute before:left-0 before:w-full before:bg-white before:content-['']",
        "before:origin-left before:scale-x-0 before:transition-all before:duration-300 before:ease-[cubic-bezier(0.4,0,0.2,1)]",
        "before:origin-center md:before:top-0",
        "before:z-1 px-2 before:h-0 before:scale-x-100 before:mix-blend-difference hover:before:h-[1.4em]",
      )}
    >
      {children}
      {showIcon && (
        <svg
          className="z-0 ml-[0.6em] mt-[0em] size-[0.55em] translate-y-1 opacity-0 transition-all duration-300 [motion-reduce:transition-none] group-hover:translate-y-0 group-hover:rotate-45 group-hover:opacity-100 motion-reduce:transition-none"
          fill="none"
          viewBox="0 0 10 10"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <path
            d="M1.004 9.166 9.337.833m0 0v8.333m0-8.333H1.004"
            stroke="currentColor"
            strokeWidth="1.25"
            strokeLinecap="round"
            strokeLinejoin="round"
          ></path>
        </svg>
      )}
    </button>
  );
};
