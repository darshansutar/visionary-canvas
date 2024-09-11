import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from "@/components/ui/button"
import { Home, Phone, Image as ImageIcon, Menu, X, Sparkles } from "lucide-react"

const Header = ({ currentPage, onNavigate }: { currentPage: string, onNavigate: (page: string) => void }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const menuItems = [
    { id: 'landing', icon: Home, label: 'Home' },
    { id: 'home', icon: ImageIcon, label: 'Generate' },
    { id: 'history', icon: ImageIcon, label: 'History' },
    { id: 'training', icon: Sparkles, label: 'Training' }, // Add this line
    { id: 'contact', icon: Phone, label: 'Contact' },
  ]

  return (
    <motion.header 
      className="sticky top-0 bg-white bg-opacity-20 backdrop-blur-lg border-b border-white border-opacity-20 shadow-sm z-10"
    >
      <nav className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold text-blue-800">Visionary Canvas</h1>
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
                      ? 'bg-blue-500 bg-opacity-30 text-blue-800'
                      : 'hover:bg-blue-300 hover:bg-opacity-20 text-blue-600'
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