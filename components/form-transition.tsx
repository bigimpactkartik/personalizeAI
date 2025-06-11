"use client"

import { motion } from "framer-motion"
import type React from "react"

interface FormTransitionProps {
  children: React.ReactNode
  delay?: number
  className?: string
}

export function FormTransition({ children, delay = 0, className = "" }: FormTransitionProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95, y: 10 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{
        duration: 0.4,
        delay,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
      className={className}
    >
      {children}
    </motion.div>
  )
}
