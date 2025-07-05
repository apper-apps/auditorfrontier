import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { toast } from 'react-toastify'
import ProgressBar from '@/components/molecules/ProgressBar'
import SectionHeader from '@/components/molecules/SectionHeader'
import QuestionCard from '@/components/molecules/QuestionCard'
import NavigationButtons from '@/components/molecules/NavigationButtons'
import CompanyInfoForm from '@/components/organisms/CompanyInfoForm'
import ReviewPage from '@/components/organisms/ReviewPage'
import ResultsDashboard from '@/components/organisms/ResultsDashboard'
import { assessmentSections } from '@/services/mockData/assessmentData'
import { calculateComplianceScore } from '@/utils/complianceCalculator'

const AssessmentWizard = () => {
  const [currentStep, setCurrentStep] = useState(0)
  const [companyInfo, setCompanyInfo] = useState({})
  const [answers, setAnswers] = useState({})
  const [errors, setErrors] = useState({})
  const [helpVisibility, setHelpVisibility] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [results, setResults] = useState(null)
  const [autoSaveTimeout, setAutoSaveTimeout] = useState(null)

  const allSteps = ['company', ...assessmentSections.map(s => s.Id), 'review', 'results']
  const totalSteps = allSteps.length

  // Auto-save functionality
  useEffect(() => {
    if (autoSaveTimeout) {
      clearTimeout(autoSaveTimeout)
    }
    
    const timeout = setTimeout(() => {
      saveToLocalStorage()
    }, 30000) // Auto-save every 30 seconds
    
    setAutoSaveTimeout(timeout)
    
    return () => {
      if (autoSaveTimeout) {
        clearTimeout(autoSaveTimeout)
      }
    }
  }, [companyInfo, answers])

  // Load saved data on mount
  useEffect(() => {
    loadFromLocalStorage()
  }, [])

  const saveToLocalStorage = () => {
    const assessmentData = {
      currentStep,
      companyInfo,
      answers,
      timestamp: new Date().toISOString()
    }
    localStorage.setItem('aiActAssessment', JSON.stringify(assessmentData))
  }

  const loadFromLocalStorage = () => {
    const saved = localStorage.getItem('aiActAssessment')
    if (saved) {
      try {
        const data = JSON.parse(saved)
        setCurrentStep(data.currentStep || 0)
        setCompanyInfo(data.companyInfo || {})
        setAnswers(data.answers || {})
        toast.info('Previous assessment progress restored')
      } catch (error) {
        console.error('Failed to load saved assessment:', error)
      }
    }
  }

  const validateCurrentStep = () => {
    const newErrors = {}
    
    if (currentStep === 0) {
      // Company info validation
      if (!companyInfo.companyName?.trim()) {
        newErrors.companyName = 'Company name is required'
      }
      if (!companyInfo.industry) {
        newErrors.industry = 'Industry selection is required'
      }
      if (!companyInfo.contactEmail?.trim()) {
        newErrors.contactEmail = 'Contact email is required'
      } else if (!/\S+@\S+\.\S+/.test(companyInfo.contactEmail)) {
        newErrors.contactEmail = 'Please enter a valid email address'
      }
    } else if (currentStep < totalSteps - 2) {
      // Question validation
      const sectionIndex = currentStep - 1
      const section = assessmentSections[sectionIndex]
      
      if (section) {
        section.questions.forEach(question => {
          if (question.required && !answers[question.Id]) {
            newErrors[question.Id] = 'This question is required'
          }
        })
      }
    }
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleNext = () => {
    if (validateCurrentStep()) {
      if (currentStep === totalSteps - 3) {
        // Moving to review step
        saveToLocalStorage()
        setCurrentStep(currentStep + 1)
      } else if (currentStep === totalSteps - 2) {
        // Submit assessment
        handleSubmit()
      } else {
        setCurrentStep(currentStep + 1)
      }
    } else {
      toast.error('Please complete all required fields')
    }
  }

  const handlePrevious = () => {
    setCurrentStep(Math.max(0, currentStep - 1))
  }

  const handleSubmit = async () => {
    setIsSubmitting(true)
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      const complianceResults = calculateComplianceScore(companyInfo, answers)
      setResults(complianceResults)
      setCurrentStep(totalSteps - 1)
      
      // Clear saved data
      localStorage.removeItem('aiActAssessment')
      
      toast.success('Assessment completed successfully!')
    } catch (error) {
      toast.error('Failed to submit assessment. Please try again.')
      console.error('Submission error:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleAnswerChange = (questionId, value) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: value
    }))
    
    // Clear error for this question
    if (errors[questionId]) {
      setErrors(prev => ({
        ...prev,
        [questionId]: undefined
      }))
    }
  }

  const handleCompanyInfoChange = (field, value) => {
    setCompanyInfo(prev => ({
      ...prev,
      [field]: value
    }))
    
    // Clear error for this field
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: undefined
      }))
    }
  }

  const toggleHelp = (questionId) => {
    setHelpVisibility(prev => ({
      ...prev,
      [questionId]: !prev[questionId]
    }))
  }

  const calculateProgress = () => {
    const completedQuestions = Object.keys(answers).length
    const totalQuestions = assessmentSections.reduce((sum, section) => sum + section.questions.length, 0)
    const companyInfoComplete = companyInfo.companyName && companyInfo.industry && companyInfo.contactEmail ? 1 : 0
    
    return ((completedQuestions + companyInfoComplete) / (totalQuestions + 1)) * 100
  }

  const renderCurrentStep = () => {
    if (currentStep === 0) {
      return (
        <CompanyInfoForm
          companyInfo={companyInfo}
          onChange={handleCompanyInfoChange}
          errors={errors}
        />
      )
    }
    
    if (currentStep === totalSteps - 2) {
      return (
        <ReviewPage
          companyInfo={companyInfo}
          answers={answers}
          sections={assessmentSections}
          onEdit={(step) => setCurrentStep(step)}
        />
      )
    }
    
    if (currentStep === totalSteps - 1) {
      return <ResultsDashboard results={results} />
    }
    
    // Question sections
    const sectionIndex = currentStep - 1
    const section = assessmentSections[sectionIndex]
    
    if (!section) return null
    
    return (
      <div className="space-y-6">
        <SectionHeader
          section={section}
          sectionNumber={sectionIndex + 1}
          questionsCompleted={section.questions.filter(q => answers[q.Id]).length}
          totalQuestions={section.questions.length}
        />
        
        <div className="space-y-6">
          {section.questions.map((question, index) => (
            <QuestionCard
              key={question.Id}
              question={question}
              value={answers[question.Id]}
              onChange={(value) => handleAnswerChange(question.Id, value)}
              error={errors[question.Id]}
              questionNumber={index + 1}
              showHelp={helpVisibility[question.Id]}
              onToggleHelp={() => toggleHelp(question.Id)}
            />
          ))}
        </div>
      </div>
    )
  }

  const getNextButtonText = () => {
    if (currentStep === totalSteps - 3) return 'Review Assessment'
    if (currentStep === totalSteps - 2) return 'Submit Assessment'
    return 'Next'
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold gradient-text mb-2">
              EU AI Act Compliance Assessment
            </h1>
            <p className="text-lg text-gray-600">
              Professional assessment for AIactAuditor.eu
            </p>
          </div>
          
          {/* Progress Bar */}
          {currentStep < totalSteps - 1 && (
            <ProgressBar
              progress={calculateProgress()}
              sections={[
                { title: 'Company' },
                ...assessmentSections.map(s => ({ title: s.title })),
                { title: 'Review' }
              ]}
              currentSection={currentStep}
              className="mb-8"
            />
          )}
          
          {/* Main Content */}
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentStep}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                {renderCurrentStep()}
              </motion.div>
            </AnimatePresence>
            
            {/* Navigation */}
            {currentStep < totalSteps - 1 && (
              <NavigationButtons
                onPrevious={handlePrevious}
                onNext={handleNext}
                canGoPrevious={currentStep > 0}
                canGoNext={true}
                nextText={getNextButtonText()}
                isLoading={isSubmitting}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default AssessmentWizard