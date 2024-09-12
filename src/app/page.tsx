'use client'

import { motion, AnimatePresence } from 'framer-motion'
import TextToImage from "@/components/text-to-image-app"
import LandingPage from "@/components/landing-page"
import ImageHistory from "@/components/ImageHistory"
import ContactUs from "@/components/ContactUs"
import VisionaryTraining from "@/components/VisionaryTraining" // Add this line
import { useState } from 'react'



export default function Home() {
  const [currentPage, setCurrentPage] = useState('landing')

  const handleNavigation = (page: string) => {
    setCurrentPage(page)
  }

  const pageVariants = {
    initial: { opacity: 0, x: "-100%" },
    in: { opacity: 1, x: 0 },
    out: { opacity: 0, x: "100%" }
  }

  const pageTransition = {
    ease: "easeInOut",
    duration: 0.5
  }

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={currentPage}
        initial="initial"
        animate="in"
        exit="out"
        variants={pageVariants}
        transition={pageTransition}
        style={{
          background: "linear-gradient(to bottom right, #e6fff9, #b3ffe6, #80ffd4)",
        }}
      >
        {currentPage === 'landing' && (
          <LandingPage onNavigate={handleNavigation} />
        )}
        {currentPage === 'home' && (
          <TextToImage onNavigate={handleNavigation} />
        )}
        {currentPage === 'history' && (
          <ImageHistory onNavigate={handleNavigation} />
        )}
        {currentPage === 'training' && ( // Add this block
          <VisionaryTraining onNavigate={handleNavigation} />
        )}
        {currentPage === 'contact' && (
          <ContactUs onNavigate={handleNavigation} />
        )}
      </motion.div>
    </AnimatePresence>
  )
}
