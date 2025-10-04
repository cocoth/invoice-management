"use client"

import { useEffect, useState } from "react"
import { createPortal } from "react-dom"
import { useTheme } from "next-themes"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Moon, Sun } from "lucide-react"

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const [isAnimating, setIsAnimating] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <Button variant="ghost" size="icon">
        <Sun className="size-5" />
      </Button>
    )
  }

  const toggleTheme = () => {
    setIsAnimating(true)
    setTimeout(() => {
      setTheme(theme === "light" ? "dark" : "light")
      setIsAnimating(false)
    }, 800)
  }

  // Portal component for full-screen animation
  const AnimationOverlay = () => {
    if (!mounted || typeof document === 'undefined') return null
    
    return createPortal(
      <AnimatePresence>
        {isAnimating && (
          <motion.div
            initial={{
              clipPath: "circle(0% at 50% 50%)",
              opacity: 0.50
            }}
            animate={{
              clipPath: "circle(150% at 50% 50%)",
              opacity: 1
            }}
            exit={{
              clipPath: "circle(0% at 50% 50%)",
              opacity: 0
            }}
            transition={{
              duration: 0.8,
              ease: [0.4, 0.0, 0.2, 1]
            }}
            className="fixed inset-0 bg-slate-900/60 dark:bg-slate-100/60 pointer-events-none backdrop-blur-sm"
            style={{
              zIndex: 999999,
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              position: 'fixed'
            }}
          />
        )}
      </AnimatePresence>,
      document.body
    )
  }

  return (
    <>
      <Button
        variant="ghost"
        size="icon"
        onClick={toggleTheme}
        className="relative cursor-pointer overflow-hidden"
      >
        <AnimatePresence mode="wait" initial={false}>
          {theme === "light" ? (
            <motion.div
              key="sun"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 20, opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
            >
              <Sun className="size-5" />
            </motion.div>
          ) : (
            <motion.div
              key="moon"
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 20, opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
            >
              <Moon className="size-5" />
            </motion.div>
          )}
        </AnimatePresence>
        <span className="sr-only">Toggle theme</span>
      </Button>

      <AnimationOverlay />
    </>
  )
}
