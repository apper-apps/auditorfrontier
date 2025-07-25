import { useState } from 'react'
import { motion } from 'framer-motion'
import ApperIcon from '@/components/ApperIcon'
import Input from '@/components/atoms/Input'
import Select from '@/components/atoms/Select'
import Textarea from '@/components/atoms/Textarea'
import RadioGroup from '@/components/atoms/RadioGroup'
import CheckboxGroup from '@/components/atoms/CheckboxGroup'

const QuestionCard = ({ 
  question, 
  value, 
  onChange, 
  error,
  questionNumber,
  showHelp = false,
  onToggleHelp,
  className = '' 
}) => {
  const [showTooltip, setShowTooltip] = useState(false)
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 })
  
  const handleMouseEnter = (e) => {
    if (question.articleRef) {
      const rect = e.currentTarget.getBoundingClientRect()
      setTooltipPosition({
        x: rect.left + rect.width / 2,
        y: rect.top - 10
      })
      setShowTooltip(true)
    }
  }
  
  const handleMouseLeave = () => {
    setShowTooltip(false)
  }
  
  const getTooltipStyle = () => ({
    position: 'fixed',
    left: `${tooltipPosition.x}px`,
    top: `${tooltipPosition.y}px`,
    transform: 'translateX(-50%) translateY(-100%)',
    zIndex: 1000,
    maxWidth: '300px',
    whiteSpace: 'nowrap',
    pointerEvents: 'none'
  })
  const renderInput = () => {
    const commonProps = {
      value: value || '',
      onChange: (e) => onChange(e.target.value),
      error,
      required: question.required
    }

    switch (question.type) {
      case 'text':
        return <Input {...commonProps} placeholder={question.placeholder} />
      
      case 'email':
        return <Input {...commonProps} type="email" placeholder={question.placeholder} />
      
      case 'number':
        return <Input {...commonProps} type="number" placeholder={question.placeholder} />
      
      case 'textarea':
        return <Textarea {...commonProps} placeholder={question.placeholder} rows={4} />
      
      case 'select':
        return (
          <Select 
            {...commonProps} 
            options={question.options} 
            placeholder={question.placeholder}
            onChange={(e) => onChange(e.target.value)}
          />
        )
      
      case 'radio':
        return (
          <RadioGroup 
            options={question.options}
            value={value}
            onChange={onChange}
            error={error}
            required={question.required}
          />
        )
      
      case 'checkbox':
        return (
          <CheckboxGroup 
            options={question.options}
            value={value || []}
            onChange={onChange}
            error={error}
            required={question.required}
          />
        )
      
      default:
        return <Input {...commonProps} placeholder={question.placeholder} />
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={`card p-6 ${className}`}
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-start gap-3">
          <div className="flex-shrink-0 w-8 h-8 bg-gradient-to-r from-primary-600 to-primary-500 text-white rounded-full flex items-center justify-center text-sm font-bold">
            {questionNumber}
          </div>
<div className="flex-1">
            <h3 
              className="text-lg font-semibold text-gray-900 mb-2 cursor-help"
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              {question.title}
              {question.required && <span className="text-error-500 ml-1">*</span>}
              {question.articleRef && (
                <ApperIcon name="Info" className="w-4 h-4 text-primary-500 ml-2 inline-block" />
              )}
            </h3>
            {question.description && (
              <p className="text-gray-600 mb-4">{question.description}</p>
            )}
          </div>
        </div>
        
        {question.helpText && (
          <button
            onClick={onToggleHelp}
            className="flex-shrink-0 p-2 text-gray-400 hover:text-primary-600 transition-colors"
          >
            <ApperIcon name="HelpCircle" className="w-5 h-5" />
          </button>
        )}
      </div>
      
      {showHelp && question.helpText && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          className="mb-4 p-4 bg-gradient-to-r from-info-50 to-info-100 border-l-4 border-info-500 rounded-lg"
        >
          <div className="flex items-start gap-2">
            <ApperIcon name="Info" className="w-5 h-5 text-info-600 mt-0.5" />
            <div>
              <p className="text-sm text-info-800 font-medium mb-1">Help</p>
              <p className="text-sm text-info-700">{question.helpText}</p>
              {question.articleRef && (
                <p className="text-xs text-info-600 mt-2">
                  Reference: {question.articleRef}
                </p>
              )}
            </div>
          </div>
        </motion.div>
      )}
<div 
        className="space-y-4 relative"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {renderInput()}
      </div>
      
      {showTooltip && question.articleRef && (
        <div 
          className="tooltip opacity-100 transition-opacity duration-200"
          style={getTooltipStyle()}
        >
          <div className="bg-gray-900 text-white px-3 py-2 rounded-lg shadow-lg text-sm">
            <div className="font-semibold mb-1">EU AI Act Reference</div>
            <div>{question.articleRef}</div>
          </div>
        </div>
      )}
    </motion.div>
  )
}

export default QuestionCard