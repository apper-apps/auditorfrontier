import { useState, useEffect } from 'react'
import { toast } from 'react-toastify'

export const useAssessment = () => {
  const [currentStep, setCurrentStep] = useState(0)
  const [companyInfo, setCompanyInfo] = useState({})
  const [answers, setAnswers] = useState({})
  const [errors, setErrors] = useState({})
  const [isLoading, setIsLoading] = useState(false)

  // Auto-save to localStorage
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      const assessmentData = {
        currentStep,
        companyInfo,
        answers,
        timestamp: new Date().toISOString()
      }
      localStorage.setItem('aiActAssessment', JSON.stringify(assessmentData))
    }, 1000)

    return () => clearTimeout(timeoutId)
  }, [currentStep, companyInfo, answers])

  // Load from localStorage on mount
  useEffect(() => {
    const savedData = localStorage.getItem('aiActAssessment')
    if (savedData) {
      try {
        const parsed = JSON.parse(savedData)
        setCurrentStep(parsed.currentStep || 0)
        setCompanyInfo(parsed.companyInfo || {})
        setAnswers(parsed.answers || {})
        toast.info('Previous assessment progress restored')
      } catch (error) {
        console.error('Failed to load saved assessment:', error)
        toast.error('Failed to restore previous progress')
      }
    }
  }, [])

  const validateStep = (step) => {
    const newErrors = {}
    
    // Add validation logic based on step
    if (step === 0) {
      if (!companyInfo.companyName?.trim()) {
        newErrors.companyName = 'Company name is required'
      }
      if (!companyInfo.contactEmail?.trim()) {
        newErrors.contactEmail = 'Contact email is required'
      }
      if (!companyInfo.industry) {
        newErrors.industry = 'Industry is required'
      }
    }
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const nextStep = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => prev + 1)
    }
  }

  const previousStep = () => {
    setCurrentStep(prev => Math.max(0, prev - 1))
  }

  const updateCompanyInfo = (field, value) => {
    setCompanyInfo(prev => ({
      ...prev,
      [field]: value
    }))
    
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: undefined
      }))
    }
  }

  const updateAnswer = (questionId, value) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: value
    }))
    
    if (errors[questionId]) {
      setErrors(prev => ({
        ...prev,
        [questionId]: undefined
      }))
    }
  }

  const submitAssessment = async () => {
    setIsLoading(true)
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      // Clear saved data
      localStorage.removeItem('aiActAssessment')
      
      toast.success('Assessment submitted successfully!')
      return true
    } catch (error) {
      toast.error('Failed to submit assessment')
      return false
    } finally {
      setIsLoading(false)
    }
  }

  return {
    currentStep,
    companyInfo,
    answers,
    errors,
    isLoading,
    nextStep,
    previousStep,
    updateCompanyInfo,
    updateAnswer,
    submitAssessment,
    validateStep
  }
}