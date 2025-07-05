import { motion } from 'framer-motion'
import Button from '@/components/atoms/Button'

const NavigationButtons = ({ 
  onPrevious, 
  onNext, 
  canGoPrevious = true,
  canGoNext = true,
  nextText = 'Next',
  previousText = 'Previous',
  isLoading = false,
  className = '' 
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: 0.2 }}
      className={`flex items-center justify-between pt-6 border-t border-gray-200 ${className}`}
    >
      <Button
        variant="secondary"
        onClick={onPrevious}
        disabled={!canGoPrevious}
        icon="ChevronLeft"
      >
        {previousText}
      </Button>
      
      <Button
        variant="primary"
        onClick={onNext}
        disabled={!canGoNext}
        loading={isLoading}
        icon="ChevronRight"
        iconPosition="right"
      >
        {nextText}
      </Button>
    </motion.div>
  )
}

export default NavigationButtons