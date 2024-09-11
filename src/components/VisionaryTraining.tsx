import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Sparkles, Image, Cpu, Rocket } from 'lucide-react'
import Header from './Header'

const VisionaryTraining = ({ onNavigate }: { onNavigate: (page: string) => void }) => {
  const [currentPage, setCurrentPage] = useState('training')

  const handleNavigation = (page: string) => {
    setCurrentPage(page)
    onNavigate(page)
  }

  const backgroundVariants = {
    animate: {
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
    }
  }

  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        type: "spring",
        damping: 15,
        stiffness: 100
      }
    },
    hover: {
      scale: 1.05,
      boxShadow: "0px 10px 30px rgba(0,0,0,0.2)",
      transition: {
        type: "spring",
        damping: 10,
        stiffness: 100
      }
    }
  }

  const textVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        type: "spring",
        damping: 15,
        stiffness: 100
      }
    }
  }

  return (
    <motion.div
      className="min-h-screen flex flex-col"
      animate={backgroundVariants.animate}
    >
      <Header currentPage={currentPage} onNavigate={handleNavigation} />
      <main className="flex-grow container mx-auto px-4 py-8">
        <motion.h1 
          className="text-4xl sm:text-5xl font-bold text-center mb-8 text-blue-900"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: "spring", damping: 10, stiffness: 100 }}
        >
          Visionary Training
        </motion.h1>
        <motion.div
          className="max-w-3xl mx-auto bg-white bg-opacity-20 backdrop-blur-lg rounded-3xl p-8 shadow-lg"
          variants={cardVariants}
          initial="hidden"
          animate="visible"
          whileHover="hover"
        >
          <motion.h2 
            className="text-2xl sm:text-3xl font-semibold mb-4 text-blue-800"
            variants={textVariants}
          >
            <Sparkles className="inline-block mr-2 mb-1" />
            Coming Soon: Train Your Own Image LoRA
          </motion.h2>
          <motion.p 
            className="text-lg text-blue-700 mb-6"
            variants={textVariants}
          >
            Get ready to revolutionize your AI image generation with custom LoRA (Low-Rank Adaptation) training. Our Visionary Training program will empower you to create unique, personalized image generation models using your own dataset.
          </motion.p>
          <motion.ul className="space-y-4">
            {[
              { icon: Image, text: "Use your own image dataset to train custom LoRA models" },
              { icon: Cpu, text: "Fine-tune existing AI models with your specific style or content" },
              { icon: Rocket, text: "Generate images that perfectly match your creative vision" }
            ].map((item, index) => (
              <motion.li 
                key={index}
                className="flex items-start"
                variants={textVariants}
                custom={index}
              >
                <item.icon className="w-6 h-6 text-blue-500 mr-2 flex-shrink-0 mt-1" />
                <span className="text-blue-700">{item.text}</span>
              </motion.li>
            ))}
          </motion.ul>
          <motion.p 
            className="mt-6 text-lg font-semibold text-blue-800"
            variants={textVariants}
          >
            Stay tuned for the launch of our exclusive Visionary Training program. Be among the first to create AI models tailored to your unique artistic style and vision!
          </motion.p>
        </motion.div>
      </main>
    </motion.div>
  )
}

export default VisionaryTraining