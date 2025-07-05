import { motion } from 'framer-motion'

const ProgressBar = ({ 
  progress = 0, 
  sections = [], 
  currentSection = 0,
  className = '' 
}) => {
  return (
    <div className={`w-full ${className}`}>
      <div className="flex justify-between items-center mb-4">
        <span className="text-sm font-medium text-gray-700">
          Progress: {Math.round(progress)}%
        </span>
        <span className="text-sm font-medium text-gray-700">
          Section {currentSection + 1} of {sections.length}
        </span>
      </div>
      
      <div className="progress-bar mb-4">
        <motion.div
          className="progress-fill"
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        />
      </div>
      
      {sections.length > 0 && (
        <div className="flex justify-between">
          {sections.map((section, index) => (
            <div
              key={index}
              className={`flex flex-col items-center ${
                index <= currentSection ? 'text-primary-600' : 'text-gray-400'
              }`}
            >
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold mb-1 ${
                index < currentSection 
                  ? 'bg-primary-600 text-white' 
                  : index === currentSection
                  ? 'bg-primary-100 text-primary-600 border-2 border-primary-600'
                  : 'bg-gray-200 text-gray-400'
              }`}>
                {index + 1}
              </div>
              <span className="text-xs font-medium hidden sm:block">{section.title}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default ProgressBar