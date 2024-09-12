import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from "@/components/ui/button"
import { Home, Phone, Image as ImageIcon, Menu, X, Sparkles } from "lucide-react"
import Image from 'next/image'

const Header = ({ currentPage, onNavigate }: { currentPage: string, onNavigate: (page: string) => void }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const menuItems = [
    { id: 'landing', icon: Home, label: 'Home' },
    { id: 'home', icon: ImageIcon, label: 'Generate' },
    { id: 'history', icon: ImageIcon, label: 'History' },
    { id: 'training', icon: Sparkles, label: 'Training' },
    { id: 'contact', icon: Phone, label: 'Contact' },
  ]

  const logoVariants = {
    hidden: { opacity: 0, rotate: -180, scale: 0.5 },
    visible: { 
      opacity: 1, 
      rotate: 0, 
      scale: 1,
      transition: { 
        type: "spring",
        stiffness: 260,
        damping: 20,
        duration: 0.5 
      }
    },
    hover: { 
      scale: 1.1,
      rotate: 5,
      transition: { duration: 0.3 }
    },
    tap: { scale: 0.95 }
  }

  return (
    <motion.header 
      className="sticky top-0 bg-teal-50 bg-opacity-20 backdrop-blur-lg border-b border-teal-100 border-opacity-20 shadow-sm z-10"
    >
      <nav className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-4"> {/* Changed from space-x-4 to space-x-2 */}
            <motion.div
              className="relative w-16 h-16 sm:w-20 sm:h-20"
              variants={logoVariants}
              initial="hidden"
              animate="visible"
              whileHover="hover"
              whileTap="tap"
            >
              <Image
                src="/images/cdl.gif"
                alt="Visionary Canvas Logo"
                layout="fill"
                objectFit="contain"
              />
            </motion.div>
            <h1 className="text-xl sm:text-2xl font-bold text-blue-800">Visionary Canvas</h1>
          </div>
          <div className="sm:hidden">
            <Button variant="ghost" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <X /> : <Menu />}
            </Button>
          </div>
          <ul className="hidden sm:flex space-x-4">
            {menuItems.map((item) => (
              <motion.li key={item.id} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button
                  variant="ghost"
                  className={`flex items-center space-x-2 ${
                    currentPage === item.id
                      ? 'bg-teal-500 bg-opacity-30 text-teal-800'
                      : 'hover:bg-teal-300 hover:bg-opacity-20 text-teal-600'
                  }`}
                  onClick={() => onNavigate(item.id)}
                >
                  <item.icon className="h-4 w-4" />
                  <span>{item.label}</span>
                </Button>
              </motion.li>
            ))}
          </ul>
        </div>
      </nav>
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="sm:hidden bg-white bg-opacity-90 backdrop-blur-lg"
          >
            <ul className="flex flex-col p-4">
              {menuItems.map((item) => (
                <motion.li key={item.id} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button
                    variant="ghost"
                    className={`w-full justify-start my-1 ${
                      currentPage === item.id
                        ? 'bg-blue-500 bg-opacity-30 text-blue-800'
                        : 'hover:bg-blue-300 hover:bg-opacity-20 text-blue-600'
                    }`}
                    onClick={() => {
                      onNavigate(item.id)
                      setIsMenuOpen(false)
                    }}
                  >
                    <item.icon className="h-4 w-4 mr-2" />
                    <span>{item.label}</span>
                  </Button>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}

export default Header