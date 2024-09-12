'use client'

import React, { useState } from 'react'
import { motion} from 'framer-motion'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import Header from './Header'

const ContactUs = ({ onNavigate }: { onNavigate: (page: string) => void }) => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log({ name, email, message })
    setName('')
    setEmail('')
    setMessage('')
  }

  const backgroundVariants = {
    animate: {
      background: [
        "linear-gradient(to bottom right, #e6fff9, #b3ffe6, #80ffd4)",
        "linear-gradient(to bottom right, #b3ffe6, #80ffd4, #4dffc3)",
        "linear-gradient(to bottom right, #80ffd4, #4dffc3, #1affb2)",
        "linear-gradient(to bottom right, #e6fff9, #b3ffe6, #80ffd4)",
      ],
      transition: {
        duration: 20,
        repeat: Infinity,
        repeatType: "reverse" as const
      }
    }
  }

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

  const inputVariants = {
    hover: { scale: 1.02 },
    tap: { scale: 0.98 }
  }

  const buttonVariants = {
    hover: { scale: 1.05, rotateZ: 2 },
    tap: { scale: 0.95, rotateZ: -2 }
  }

  return (
    <motion.div 
      className="flex flex-col min-h-screen"
      animate={{
        background: backgroundVariants.animate.background,
        transition: {
          ...backgroundVariants.animate.transition,
          repeatType: "reverse" as const
        }
      }}
    >
      <Header currentPage="contact" onNavigate={onNavigate} />
      <main className="flex-grow container mx-auto px-4 py-6 sm:py-8">
        <motion.div 
          className="max-w-3xl mx-auto space-y-4 sm:space-y-6"
          variants={cardVariants}
          initial="initial"
          animate="animate"
          whileHover="hover"
        >
          <div className="bg-white bg-opacity-20 backdrop-blur-lg rounded-2xl sm:rounded-3xl p-4 sm:p-6 shadow-lg">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-blue-700 mb-4 text-center">Contact Us</h2>
            <p className="text-lg sm:text-xl text-blue-600 max-w-2xl mx-auto text-center mb-8">
              We would love to hear from you! Please fill out the form below.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-blue-700 mb-2" htmlFor="name">Name</label>
                <motion.div
                  variants={inputVariants}
                  whileHover="hover"
                  whileTap="tap"
                >
                  <Input
                    type="text"
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    className="w-full h-12 sm:h-16 text-base sm:text-lg rounded-full bg-white bg-opacity-40 border-blue-200 text-blue-700 placeholder-blue-400 px-4 sm:px-6"
                    placeholder="Your Name"
                  />
                </motion.div>
              </div>
              <div>
                <label className="block text-blue-700 mb-2" htmlFor="email">Email</label>
                <motion.div
                  variants={inputVariants}
                  whileHover="hover"
                  whileTap="tap"
                >
                  <Input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full h-12 sm:h-16 text-base sm:text-lg rounded-full bg-white bg-opacity-40 border-blue-200 text-blue-700 placeholder-blue-400 px-4 sm:px-6"
                    placeholder="your@email.com"
                  />
                </motion.div>
              </div>
              <div>
                <label className="block text-blue-700 mb-2" htmlFor="message">Message</label>
                <motion.div
                  variants={inputVariants}
                  whileHover="hover"
                  whileTap="tap"
                >
                  <textarea
                    id="message"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    required
                    className="w-full h-32 text-base sm:text-lg rounded-3xl bg-white bg-opacity-40 border-blue-200 text-blue-700 placeholder-blue-400 px-4 sm:px-6 py-3"
                    placeholder="Your message here..."
                  />
                </motion.div>
              </div>
              <motion.div
                className="flex justify-center mt-6"
                variants={buttonVariants}
                whileHover="hover"
                whileTap="tap"
              >
                <Button
                  type="submit"
                  className="w-full sm:w-auto h-12 sm:h-16 px-6 sm:px-8 text-base sm:text-lg font-semibold rounded-full bg-gradient-to-r from-blue-400 to-blue-600 hover:from-blue-500 hover:to-blue-700 text-white"
                >
                  Send Message
                </Button>
              </motion.div>
            </form>
          </div>
        </motion.div>
      </main>
    </motion.div>
  )
}

export default ContactUs