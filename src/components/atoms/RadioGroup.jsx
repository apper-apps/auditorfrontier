import { motion } from 'framer-motion'
import ApperIcon from '@/components/ApperIcon'

const RadioGroup = ({ 
  label, 
  options = [], 
  value, 
  onChange, 
  error,
  required = false,
  className = '' 
}) => {
  return (
    <div className={`space-y-3 ${className}`}>
      {label && (
        <label className="form-label">
          {label}
          {required && <span className="text-error-500 ml-1">*</span>}
        </label>
      )}
      
      <div className="space-y-2">
        {options.map((option) => (
          <motion.label
            key={option.value}
            whileHover={{ scale: 1.01 }}
            className="flex items-center p-3 border-2 border-gray-200 rounded-lg cursor-pointer hover:border-primary-300 hover:bg-primary-50 transition-all duration-200"
          >
            <input
              type="radio"
              name={label}
              value={option.value}
              checked={value === option.value}
              onChange={(e) => onChange(e.target.value)}
              className="sr-only"
            />
            <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center mr-3 ${
              value === option.value 
                ? 'border-primary-500 bg-primary-500' 
                : 'border-gray-300'
            }`}>
              {value === option.value && (
                <div className="w-2 h-2 bg-white rounded-full"></div>
              )}
            </div>
            <span className="text-gray-900 font-medium">{option.label}</span>
          </motion.label>
        ))}
      </div>
      
      {error && (
        <p className="text-sm text-error-600 flex items-center gap-1">
          <ApperIcon name="AlertCircle" className="w-4 h-4" />
          {error}
        </p>
      )}
    </div>
  )
}

export default RadioGroup