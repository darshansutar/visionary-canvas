'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import {  Loader2, Download } from "lucide-react"
import { generateImage } from '@/app/actions/generateImage'
import { v4 as uuidv4 } from 'uuid'
import Header from './Header'

const TextToImage = ({ onNavigate }: { onNavigate: (page: string) => void }) => {
  const [inputText, setInputText] = useState('')
  const [generatedImage, setGeneratedImage] = useState('')
  
  const [isLoading, setIsLoading] = useState(false)
  const [currentPage, setCurrentPage] = useState('home')

 

  const cardVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    },
    hover: {
      boxShadow: "0px 10px 30px rgba(0,0,0,0.1)",
      transition: {
        duration: 0.3
      }
    }
  }

  const glowingBorderAnimation = {
    animate: {
      boxShadow: [
        "0 0 0 2px rgba(255, 255, 255, 0.3)",
        "0 0 0 4px rgba(255, 255, 255, 0.3)",
        "0 0 0 2px rgba(255, 255, 255, 0.3)",
      ],
    },
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: "easeInOut",
    },
  };

  const handleGenerateImage = async () => {
    setIsLoading(true)
    setGeneratedImage('')
    try {
      const imageUrl = await generateImage(inputText)
      setGeneratedImage(imageUrl)
      
      // Save the generated image to history
      const newImage = {
        id: uuidv4(),
        url: imageUrl,
        prompt: inputText,
        createdAt: new Date().toISOString()
      }
      const savedImages = JSON.parse(localStorage.getItem('generatedImages') || '[]')
      localStorage.setItem('generatedImages', JSON.stringify([newImage, ...savedImages]))
    } catch (error) {
      console.error("Failed to generate image:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleDownload = () => {
    if (generatedImage) {
      fetch(generatedImage)
        .then(response => response.blob())
        .then(blob => {
          const url = window.URL.createObjectURL(blob);
          const a = document.createElement('a');
          a.style.display = 'none';
          a.href = url;
          a.download = 'generated-image.png';
          document.body.appendChild(a);
          a.click();
          window.URL.revokeObjectURL(url);
        });
    }
  };

  const handleNavigation = (page: string) => {
    setCurrentPage(page)
    onNavigate(page)
  }

  return (
    <motion.div 
      className="flex flex-col min-h-screen"
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

      <main className="flex-grow container mx-auto px-4 py-6 sm:py-8">
        <motion.div 
          className="max-w-3xl mx-auto space-y-4 sm:space-y-6"
        >
          <motion.div
            className="bg-white bg-opacity-20 backdrop-blur-lg rounded-2xl sm:rounded-3xl p-4 sm:p-6 shadow-lg"
            variants={cardVariants}
            whileHover="hover"
          >
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 mb-4 sm:mb-6">
              <motion.div
                className="flex-grow"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Input
                  type="text"
                  placeholder="Enter text to generate image..."
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  className="w-full h-12 sm:h-16 text-base sm:text-lg rounded-full bg-white bg-opacity-40 border-blue-200 text-blue-700 placeholder-blue-400 px-4 sm:px-6"
                />
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.05, rotateZ: 2 }}
                whileTap={{ scale: 0.95, rotateZ: -2 }}
              >
                <Button
                  onClick={handleGenerateImage}
                  disabled={isLoading}
                  className="w-full sm:w-auto h-12 sm:h-16 px-6 sm:px-8 text-base sm:text-lg font-semibold rounded-full bg-gradient-to-r from-blue-400 to-blue-600 hover:from-blue-500 hover:to-blue-700 text-white"
                >
                  {isLoading ? <Loader2 className="h-5 w-5 animate-spin" /> : "Generate"}
                </Button>
              </motion.div>
            </div>

            <motion.div 
              className="w-full max-w-md mx-auto bg-white bg-opacity-30 rounded-xl sm:rounded-2xl overflow-hidden relative aspect-square"
            >
              <AnimatePresence mode="wait">
                {generatedImage ? (
                  <motion.div
                    key="generated-image"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5 }}
                    className="w-full h-full"
                  >
                    <img
                      src={generatedImage}
                      alt="Generated image"
                      className="w-full h-full object-cover"
                    />
                    <motion.button
                      className="absolute bottom-4 right-4 bg-white bg-opacity-70 p-2 rounded-full shadow-lg"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={handleDownload}
                    >
                      <Download className="h-6 w-6 text-blue-600" />
                    </motion.button>
                  </motion.div>
                ) : (
                  <motion.div
                    key="placeholder"
                    initial={{ opacity: 0 }}
                    animate={{ 
                      opacity: 1,
                      ...glowingBorderAnimation.animate,
                    }}
                    exit={{ opacity: 0 }}
                    transition={{ 
                      opacity: { duration: 0.5 },
                      ...glowingBorderAnimation.transition,
                    }}
                    className={`w-full h-full flex items-center justify-center text-blue-600 rounded-2xl ${
                      isLoading ? 'bg-transparent' : 'bg-blue-100'
                    }`}
                  >
                    {isLoading ? (
                      <div className="flex flex-col items-center">
                        <motion.div
                          animate={{
                            rotate: 360,
                          }}
                          transition={{
                            duration: 1,
                            repeat: Infinity,
                            ease: "linear",
                          }}
                          className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full mb-4"
                        />
                        <p className="text-blue-600 font-medium">Your vision is on its way</p>
                      </div>
                    ) : (
                      "Generated image will appear here"
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </motion.div>
        </motion.div>
      </main>
    </motion.div>
  )
};

export default TextToImage;