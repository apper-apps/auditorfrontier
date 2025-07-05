import { motion } from 'framer-motion'
import ApperIcon from '@/components/ApperIcon'

const Empty = ({ 
  title = "No Data Available", 
  description = "Get started by taking your first assessment", 
  actionText = "Start Assessment",
  onAction 
}) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col items-center justify-center min-h-[400px] p-8 text-center"
    >
      <div className="w-24 h-24 bg-gradient-to-r from-primary-50 to-primary-100 rounded-full flex items-center justify-center mb-6">
        <ApperIcon name="FileText" className="w-12 h-12 text-primary-600" />
      </div>
      
      <h3 className="text-2xl font-bold text-gray-900 mb-2">{title}</h3>
      <p className="text-gray-600 mb-8 max-w-md">{description}</p>
      
      {onAction && (
        <button
          onClick={onAction}
          className="btn-primary flex items-center gap-2"
        >
          <ApperIcon name="Play" className="w-4 h-4" />
          {actionText}
        </button>
      )}
    </motion.div>
  )
}

export default Empty