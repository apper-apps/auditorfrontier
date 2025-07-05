import { motion } from 'framer-motion'
import ApperIcon from '@/components/ApperIcon'
import Button from '@/components/atoms/Button'

const ReviewPage = ({ companyInfo, answers, sections, onEdit }) => {
  const formatAnswer = (answer, question) => {
    if (typeof answer === 'boolean') {
      return answer ? 'Yes' : 'No'
    }
    if (Array.isArray(answer)) {
      return answer.join(', ')
    }
    if (question.type === 'select') {
      const option = question.options?.find(opt => opt.value === answer)
      return option?.label || answer
    }
    return answer || 'Not answered'
  }

  const getCompletionStats = () => {
    const totalQuestions = sections.reduce((sum, section) => sum + section.questions.length, 0)
    const answeredQuestions = Object.keys(answers).length
    const completionPercentage = Math.round((answeredQuestions / totalQuestions) * 100)
    
    return {
      total: totalQuestions,
      answered: answeredQuestions,
      percentage: completionPercentage
    }
  }

  const stats = getCompletionStats()

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="space-y-8"
    >
      <div className="text-center mb-8">
        <div className="w-16 h-16 bg-gradient-to-r from-success-600 to-success-500 rounded-full flex items-center justify-center mx-auto mb-4">
          <ApperIcon name="CheckCircle" className="w-8 h-8 text-white" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Review Your Assessment</h2>
        <p className="text-gray-600">
          Please review your answers before submitting your compliance assessment.
        </p>
      </div>

      {/* Completion Stats */}
      <div className="bg-gradient-to-r from-primary-50 to-primary-100 rounded-xl p-6 border-l-4 border-primary-500">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold text-primary-900 mb-1">Assessment Progress</h3>
            <p className="text-primary-700">
              {stats.answered} of {stats.total} questions completed ({stats.percentage}%)
            </p>
          </div>
          <div className="text-3xl font-bold text-primary-600">
            {stats.percentage}%
          </div>
        </div>
      </div>

      {/* Company Information */}
      <div className="card p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
            <ApperIcon name="Building" className="w-5 h-5" />
            Company Information
          </h3>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onEdit(0)}
            icon="Edit"
          >
            Edit
          </Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <span className="text-sm font-medium text-gray-500">Company Name</span>
            <p className="text-gray-900">{companyInfo.companyName || 'Not provided'}</p>
          </div>
          <div>
            <span className="text-sm font-medium text-gray-500">Industry</span>
            <p className="text-gray-900">{companyInfo.industry || 'Not provided'}</p>
          </div>
          <div>
            <span className="text-sm font-medium text-gray-500">Company Size</span>
            <p className="text-gray-900">{companyInfo.companySize || 'Not provided'}</p>
          </div>
          <div>
            <span className="text-sm font-medium text-gray-500">Primary Market</span>
            <p className="text-gray-900">{companyInfo.primaryMarket || 'Not provided'}</p>
          </div>
          <div>
            <span className="text-sm font-medium text-gray-500">Contact Email</span>
            <p className="text-gray-900">{companyInfo.contactEmail || 'Not provided'}</p>
          </div>
          <div>
            <span className="text-sm font-medium text-gray-500">AI Systems Count</span>
            <p className="text-gray-900">{companyInfo.aiSystemsCount || 'Not provided'}</p>
          </div>
        </div>
      </div>

      {/* Assessment Sections */}
      <div className="space-y-6">
        {sections.map((section, sectionIndex) => (
          <div key={section.Id} className="card p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                <ApperIcon name="FileText" className="w-5 h-5" />
                {section.title}
              </h3>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onEdit(sectionIndex + 1)}
                icon="Edit"
              >
                Edit
              </Button>
            </div>
            
            <div className="space-y-4">
              {section.questions.map((question, questionIndex) => (
                <div key={question.Id} className="border-l-2 border-gray-200 pl-4">
                  <div className="flex items-start gap-2">
                    <span className="text-sm font-medium text-gray-500 mt-1">
                      Q{questionIndex + 1}:
                    </span>
                    <div className="flex-1">
                      <p className="text-sm text-gray-700 mb-1">{question.title}</p>
                      <p className={`text-sm font-medium ${
                        answers[question.Id] ? 'text-gray-900' : 'text-gray-400'
                      }`}>
                        {formatAnswer(answers[question.Id], question)}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Final Warning */}
      <div className="bg-gradient-to-r from-warning-50 to-warning-100 border-l-4 border-warning-500 rounded-lg p-6">
        <div className="flex items-start gap-3">
          <ApperIcon name="AlertTriangle" className="w-6 h-6 text-warning-600 mt-0.5" />
          <div>
            <h3 className="text-lg font-semibold text-warning-900 mb-2">Before You Submit</h3>
            <p className="text-warning-800 text-sm leading-relaxed">
              Please ensure all information is accurate and complete. Once submitted, your assessment 
              will be processed and you'll receive a detailed compliance report. You can still edit 
              any section above if needed.
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default ReviewPage