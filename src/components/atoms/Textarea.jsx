import { forwardRef } from 'react'
import ApperIcon from '@/components/ApperIcon'

const Textarea = forwardRef(({ 
  label, 
  error, 
  rows = 4,
  className = '',
  required = false,
  ...props 
}, ref) => {
  const textareaClasses = `form-input resize-none ${error ? 'border-error-500 focus:ring-error-400' : ''} ${className}`
  
  return (
    <div className="space-y-2">
      {label && (
        <label className="form-label">
          {label}
          {required && <span className="text-error-500 ml-1">*</span>}
        </label>
      )}
      
      <textarea
        ref={ref}
        rows={rows}
        className={textareaClasses}
        {...props}
      />
      
      {error && (
        <p className="text-sm text-error-600 flex items-center gap-1">
          <ApperIcon name="AlertCircle" className="w-4 h-4" />
          {error}
        </p>
      )}
    </div>
  )
})

Textarea.displayName = 'Textarea'

export default Textarea