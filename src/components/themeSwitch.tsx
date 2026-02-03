import { useCallback, useEffect, useRef, useState } from "react"
import { flushSync } from "react-dom"

import { cn } from "@/lib/utils"

type TransitionType = "circle" | "top-down"

interface ThemeSwitchProps
  extends React.ComponentPropsWithoutRef<"button"> {
  duration?: number
  variant?: TransitionType
}

export const ThemeSwitch = ({
  className,
  duration = 400,
  variant = "circle",
  ...props
}: ThemeSwitchProps) => {
  const [isDark, setIsDark] = useState(false)
  const buttonRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    const updateTheme = () => {
      setIsDark(document.documentElement.classList.contains("dark"))
    }

    updateTheme()

    const observer = new MutationObserver(updateTheme)
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    })

    return () => observer.disconnect()
  }, [])

  const toggleTheme = useCallback(async () => {
    if (!buttonRef.current) return

    await document.startViewTransition(() => {
      flushSync(() => {
        const newTheme = !isDark
        setIsDark(newTheme)
        document.documentElement.classList.toggle("dark")
        localStorage.setItem("theme", newTheme ? "dark" : "light")
      })
    }).ready

    const getAnimation = () => {
      switch (variant) {
        case "top-down":
          return {
            clipPath: [
              "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)",
              "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
            ],
          }
        case "circle":
        default: {
          const { top, left, width, height } =
            buttonRef.current!.getBoundingClientRect()
          const x = left + width / 2
          const y = top + height / 2
          const maxRadius = Math.hypot(
            Math.max(left, window.innerWidth - left),
            Math.max(top, window.innerHeight - top)
          )
          return {
            clipPath: [
              `circle(0px at ${x}px ${y}px)`,
              `circle(${maxRadius}px at ${x}px ${y}px)`,
            ],
          }
        }
      }
    }

    document.documentElement.animate(
      getAnimation(),
      {
        duration,
        easing: "ease-in-out",
        pseudoElement: "::view-transition-new(root)",
      }
    )
  }, [isDark, duration, variant])

  return (
    <button
      ref={buttonRef}
      onClick={toggleTheme}
      className={cn(className)}
      {...props}
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
  )
}
