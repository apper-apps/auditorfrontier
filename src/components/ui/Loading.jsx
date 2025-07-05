import { motion } from 'framer-motion'

const Loading = ({ type = 'default' }) => {
  if (type === 'form') {
    return (
      <div className="space-y-6 p-6">
        <div className="flex items-center justify-between">
          <div className="h-8 bg-gray-200 rounded-lg w-48 animate-shimmer"></div>
          <div className="h-6 bg-gray-200 rounded-lg w-16 animate-shimmer"></div>
        </div>
        
        <div className="space-y-4">
          <div className="h-6 bg-gray-200 rounded-lg w-32 animate-shimmer"></div>
          <div className="h-12 bg-gray-200 rounded-lg w-full animate-shimmer"></div>
        </div>
        
        <div className="space-y-4">
          <div className="h-6 bg-gray-200 rounded-lg w-40 animate-shimmer"></div>
          <div className="h-12 bg-gray-200 rounded-lg w-full animate-shimmer"></div>
        </div>
        
        <div className="space-y-4">
          <div className="h-6 bg-gray-200 rounded-lg w-36 animate-shimmer"></div>
          <div className="h-24 bg-gray-200 rounded-lg w-full animate-shimmer"></div>
        </div>
        
        <div className="flex justify-between pt-4">
          <div className="h-12 bg-gray-200 rounded-lg w-24 animate-shimmer"></div>
          <div className="h-12 bg-gray-200 rounded-lg w-24 animate-shimmer"></div>
        </div>
      </div>
    )
  }
  
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex items-center justify-center min-h-[400px]"
    >
      <div className="relative">
        <div className="w-16 h-16 border-4 border-primary-200 border-t-primary-600 rounded-full animate-spin"></div>
        <div className="absolute inset-0 w-16 h-16 border-4 border-transparent border-t-accent-500 rounded-full animate-spin animation-delay-150"></div>
      </div>
    </motion.div>
  )
}

export default Loading