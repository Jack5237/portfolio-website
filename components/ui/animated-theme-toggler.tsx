"use client"

import { useCallback, useEffect, useState } from "react"
import { useTheme } from "next-themes"
import { Moon, Sun } from "lucide-react"
import { flushSync } from "react-dom"

import { cn } from "@/lib/utils"

interface AnimatedThemeTogglerProps extends React.ComponentPropsWithoutRef<"button"> {
  duration?: number
}

export const AnimatedThemeToggler = ({
  className,
  duration = 400,
  ...props
}: AnimatedThemeTogglerProps) => {
  const { setTheme, resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const toggleTheme = useCallback(() => {
    if (!resolvedTheme) return

    const viewportWidth = window.visualViewport?.width ?? window.innerWidth
    const viewportHeight =
      window.visualViewport?.height ?? window.innerHeight

    const x = viewportWidth / 2
    const y = viewportHeight / 2

    const maxRadius = Math.hypot(x, y)

    const newTheme = resolvedTheme === "dark" ? "light" : "dark"

    const applyTheme = () => {
      setTheme(newTheme)
    }

    if (typeof document.startViewTransition !== "function") {
      applyTheme()
      return
    }

    const transition = document.startViewTransition(() => {
      flushSync(applyTheme)
    })

    const ready = transition?.ready
    if (ready && typeof ready.then === "function") {
      ready.then(() => {
        document.documentElement.animate(
          {
            clipPath: [
              `circle(0px at ${x}px ${y}px)`,
              `circle(${maxRadius}px at ${x}px ${y}px)`,
            ],
          },
          {
            duration,
            easing: "ease-in-out",
            pseudoElement: "::view-transition-new(root)",
          }
        )
      })
    }
  }, [resolvedTheme, setTheme, duration])

  if (!mounted) {
    return (
      <button
        type="button"
        className={cn(
          "rounded-full p-2",
          "transition-all duration-300 ease-in-out",
          "hover:bg-foreground/10 focus:outline-none focus:ring-2 focus:ring-foreground/20",
          className
        )}
        disabled
        {...props}
      >
        <Moon className="h-4 w-4 sm:h-5 sm:w-5 text-foreground" />
        <span className="sr-only">Toggle theme</span>
      </button>
    )
  }

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className={cn(
        "rounded-full p-2",
        "transition-all duration-300 ease-in-out",
        "hover:bg-foreground/10 focus:outline-none focus:ring-2 focus:ring-foreground/20",
        className
      )}
      aria-label={resolvedTheme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
      suppressHydrationWarning
      {...props}
    >
      {resolvedTheme === "dark" ? (
        <Sun className="h-4 w-4 sm:h-5 sm:w-5 text-foreground" />
      ) : (
        <Moon className="h-4 w-4 sm:h-5 sm:w-5 text-foreground" />
      )}
      <span className="sr-only">Toggle theme</span>
    </button>
  )
}
