import { motion } from 'framer-motion'
import ApperIcon from '@/components/ApperIcon'

const SectionHeader = ({ 
  section, 
  sectionNumber, 
  questionsCompleted, 
  totalQuestions,
  className = '' 
}) => {
  const getSectionColor = (type) => {
    switch (type) {
      case 'general':
        return 'section-general'
      case 'risk':
        return 'section-risk'
      case 'prohibited':
        return 'section-prohibited'
      default:
        return 'section-general'
    }
  }

  const getSectionIcon = (type) => {
    switch (type) {
      case 'general':
        return 'Building'
      case 'risk':
        return 'AlertTriangle'
      case 'prohibited':
        return 'XCircle'
      default:
        return 'FileText'
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.4 }}
      className={`${getSectionColor(section.type)} rounded-xl p-6 mb-6 ${className}`}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-md">
            <ApperIcon name={getSectionIcon(section.type)} className="w-6 h-6 text-gray-700" />
          </div>
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-sm font-semibold text-gray-600">
                Section {sectionNumber}
              </span>
              <span className="text-sm text-gray-500">
                {questionsCompleted} of {totalQuestions} completed
              </span>
            </div>
            <h2 className="text-xl font-bold text-gray-900">{section.title}</h2>
            {section.description && (
              <p className="text-gray-700 mt-1">{section.description}</p>
            )}
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <div className="w-16 h-16 relative">
            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
              <path
                d="M18 2.0845
                  a 15.9155 15.9155 0 0 1 0 31.831
                  a 15.9155 15.9155 0 0 1 0 -31.831"
                fill="none"
                stroke="rgba(255, 255, 255, 0.3)"
                strokeWidth="2"
              />
              <path
                d="M18 2.0845
                  a 15.9155 15.9155 0 0 1 0 31.831
                  a 15.9155 15.9155 0 0 1 0 -31.831"
                fill="none"
                stroke="rgba(255, 255, 255, 0.9)"
                strokeWidth="2"
                strokeDasharray={`${(questionsCompleted / totalQuestions) * 100}, 100`}
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-sm font-bold text-gray-700">
                {Math.round((questionsCompleted / totalQuestions) * 100)}%
              </span>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default SectionHeader