'use client'

import React, { useState } from 'react'
import { motion, useMotionValue, useTransform, AnimatePresence } from 'framer-motion'
import { Button } from "@/components/ui/button"
import { Paintbrush, Wand2, Sparkles, Home, Phone, Image as ImageIcon, LucideIcon } from 'lucide-react'
import Header from './Header'

const features = [
  {
    icon: Paintbrush,
    title: 'Creative Freedom',
    description: 'Transform your ideas into stunning visuals with ease.'
  },
  {
    icon: Wand2,
    title: 'AI-Powered Magic',
    description: 'Harness the power of advanced AI to generate unique images.'
  },
  {
    icon: Sparkles,
    title: 'Endless Possibilities',
    description: 'Explore a world of imagination with our text-to-image technology.'
  }
]

const FeatureCard = ({ icon: Icon, title, description }: { icon: LucideIcon; title: string; description: string }) => {
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const rotateX = useTransform(y, [-100, 100], [30, -30])
  const rotateY = useTransform(x, [-100, 100], [-30, 30])

  const cardVariants = {
    hover: {
      scale: 1.05,
      rotateX: 5,
      rotateY: 5,
      boxShadow: "0px 10px 30px rgba(0,0,0,0.2)",
    }
  }

  return (
    <motion.div
      style={{ x, y, rotateX, rotateY, z: 100 }}
      drag
      dragElastic={0.1}
      dragConstraints={{ top: 0, left: 0, right: 0, bottom: 0 }}
      whileTap={{ cursor: 'grabbing' }}
      variants={cardVariants}
      whileHover="hover"
      className="w-full sm:w-64 h-80 rounded-xl bg-white bg-opacity-20 backdrop-blur-lg p-6 cursor-grab transition-all duration-300"
    >
      <div className="flex flex-col items-center text-center h-full">
        <Icon className="w-8 h-8 sm:w-12 sm:h-12 mb-2 sm:mb-4 text-blue-500" />
        <h3 className="text-lg sm:text-xl font-bold mb-1 sm:mb-2 text-blue-800">{title}</h3>
        <p className="text-sm sm:text-base text-blue-600">{description}</p>
      </div>
    </motion.div>
  )
}

const AnimatedButton = ({ children, onClick, className }: { children: React.ReactNode; onClick: () => void; className?: string }) => (
  <motion.button
    whileHover={{ scale: 1.05, rotateY: 5, rotateX: -5 }}
    whileTap={{ scale: 0.95 }}
    transition={{ type: "spring", stiffness: 400, damping: 17 }}
    onClick={onClick}
    className={className}
  >
    {children}
  </motion.button>
)

const LandingPage = ({ onNavigate }: { onNavigate: (id: string) => void }) => {
  const [currentPage, setCurrentPage] = useState('landing')

  const handleNavigation = (page: string) => {
    setCurrentPage(page)
    onNavigate(page)
  }

  return (
    <motion.div 
      className="min-h-screen flex flex-col"
      style={{
        background: "linear-gradient(to bottom right, #e6f2ff, #b3d9ff, #80bfff)",
        transition: "background 20s ease-in-out"
      }}
      animate={{
        background: [
          "linear-gradient(to bottom right, #e6f2ff, #b3d9ff, #80bfff)",
          "linear-gradient(to bottom right, #b3d9ff, #80bfff, #4da6ff)",
          "linear-gradient(to bottom right, #80bfff, #4da6ff, #1a8cff)",
          "linear-gradient(to bottom right, #e6f2ff, #b3d9ff, #80bfff)",
        ],
        transition: {
          duration: 20,
          repeat: Infinity,
          repeatType: "reverse" as const
        }
      }}
    >
      <Header currentPage={currentPage} onNavigate={handleNavigation} />
      
      <main className="flex-grow container mx-auto px-4 py-8 sm:py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-8 sm:mb-16"
        >
          <motion.h2 
            className="text-3xl sm:text-4xl md:text-5xl font-bold text-blue-900 mb-4"
            whileHover={{ scale: 1.05, rotateX: 10, rotateY: 10 }}
          >
            Transform Text into Art
          </motion.h2>
          <motion.p 
            className="text-lg sm:text-xl text-blue-700 max-w-2xl mx-auto"
            whileHover={{ scale: 1.02 }}
          >
            Unleash your creativity with Visionary Canvas. Turn your words into stunning images using the power of AI.
          </motion.p>
          <motion.div
            whileHover={{ scale: 1.1, rotateZ: 2 }}
            whileTap={{ scale: 0.9, rotateZ: -2 }}
          >
            <Button 
              onClick={() => onNavigate('home')} 
              className="mt-8 bg-blue-500 hover:bg-blue-600 text-white px-8 py-3 rounded-full text-lg font-semibold"
            >
              Get Started
            </Button>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-4 sm:gap-8"
        >
          {features.map((feature, index) => (
            <FeatureCard key={index} {...feature} />
          ))}
        </motion.div>
      </main>

      <footer className="py-4 sm:py-6 text-center text-blue-600 text-sm sm:text-base">
        <p>&copy; 2023 Visionary Canvas. All rights reserved.</p>
      </footer>
    </motion.div>
  )
}

export default LandingPage