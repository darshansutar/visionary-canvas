import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Download, Trash2, Image as ImageIcon } from 'lucide-react'
import Header from './Header'

interface HistoryImage {
  id: string
  url: string
  prompt: string
  createdAt: string
}

const ImageHistory = ({ onNavigate }: { onNavigate: (page: string) => void }) => {
  const [currentPage, setCurrentPage] = useState('history')
  const [images, setImages] = useState<HistoryImage[]>([])
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const [notification, setNotification] = useState(false)

  React.useEffect(() => {
    const savedImages = JSON.parse(localStorage.getItem('generatedImages') || '[]')
    setImages(savedImages)
  }, [])

  const handleNavigation = (page: string) => {
    setCurrentPage(page)
    onNavigate(page)
  }

  const handleDelete = (id: string) => {
    const updatedImages = images.filter(image => image.id !== id)
    setImages(updatedImages)
    localStorage.setItem('generatedImages', JSON.stringify(updatedImages))
    setSelectedId(null)
    setNotification(true)

    setTimeout(() => {
      setNotification(false)
    }, 2000)
  }

  const handleDownload = (url: string) => {
    window.open(url, '_blank');
  }

  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 },
    hover: {
      scale: 1.05,
      boxShadow: "0px 10px 30px rgba(0,0,0,0.2)",
    },
    exit: {
      opacity: 0,
      transition: { duration: 0.5 },
    }
  }

  const fadeVariants = {
    initial: { opacity: 0 },
    enter: { opacity: 1 },
    exit: { opacity: 0 },
  }

  const placeholderVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1, transition: { delay: 0.2 } },
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
      <AnimatePresence>
        <motion.div
          key={currentPage}
          variants={fadeVariants}
          initial="initial"
          animate="enter"
          exit="exit"
          transition={{ duration: 0.5 }}
          className="flex-grow p-4 sm:p-8"
        >
          <h1 className="text-2xl sm:text-3xl font-bold text-center mb-6 sm:mb-8 text-blue-800">Image History</h1>
          {images.length === 0 ? (
            <motion.div
              variants={placeholderVariants}
              initial="hidden"
              animate="visible"
              className="flex flex-col items-center justify-center h-64 w-64 mx-auto bg-white bg-opacity-50 rounded-2xl shadow-lg"
            >
              <ImageIcon className="w-16 h-16 text-blue-400 mb-4" />
              <p className="text-lg text-blue-600 font-semibold text-center">No images in history yet</p>
              <p className="text-sm text-blue-500 mt-2 text-center">Generate some images to see them here!</p>
            </motion.div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              <AnimatePresence>
                {images.map((image, index) => (
                  <motion.div
                    key={image.id}
                    className="relative rounded-2xl overflow-hidden shadow-lg"
                    style={{ aspectRatio: '1 / 1' }}
                    variants={cardVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    whileHover="hover"
                    transition={{ delay: index * 0.1 }}
                  >
                    <img
                      src={image.url}
                      alt={image.prompt}
                      className="w-full h-full object-cover cursor-pointer"
                      onClick={() => setSelectedId(selectedId === image.id ? null : image.id)}
                    />
                    <div className="absolute top-2 right-2 flex space-x-2">
                      <motion.button
                        className="bg-white bg-opacity-70 p-2 rounded-full shadow-lg"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => handleDownload(image.url)}
                      >
                        <Download className="h-6 w-6 text-blue-600" />
                      </motion.button>
                      <motion.button
                        className="bg-white bg-opacity-70 p-2 rounded-full shadow-lg"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => handleDelete(image.id)}
                      >
                        <Trash2 className="h-6 w-6 text-red-600" />
                      </motion.button>
                    </div>
                    <AnimatePresence>
                      {selectedId === image.id && (
                        <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 20 }}
                          className="absolute inset-0 bg-gradient-to-t from-black/80 to-black/40 backdrop-blur-sm flex flex-col justify-end p-4"
                        >
                          <p className="text-sm font-semibold text-blue-200 mb-2">{new Date(image.createdAt).toLocaleString()}</p>
                          <p className="text-base font-bold text-white line-clamp-3 mb-4">{image.prompt}</p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          )}
          <AnimatePresence>
            {notification && (
              <motion.div
                className="fixed bottom-4 left-1/2 transform -translate-x-1/2 bg-green-500 text-white p-4 rounded-lg shadow-lg"
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0, opacity: 0 }}
                transition={{ duration: 0.5 }}
              >
                <motion.div
                  className="text-center"
                  initial={{ y: 20 }}
                  animate={{ y: 0 }}
                  exit={{ y: 20 }}
                  transition={{ duration: 0.5 }}
                >
                  Vision is removed successfully
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </AnimatePresence>
    </motion.div>
  )
}

export default ImageHistory