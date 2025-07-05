import React, { useCallback, useState } from "react";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import ApperIcon from "@/components/ApperIcon";
import Button from "@/components/atoms/Button";
import Input from "@/components/atoms/Input";

// Utility functions moved outside component to prevent redeclaration
const getScoreColor = (score) => {
  if (score >= 80) return 'text-success-600';
  if (score >= 60) return 'text-warning-600';
  return 'text-error-600';
};

const getScoreBackground = (score) => {
  if (score >= 80) return 'from-success-600 to-success-500';
  if (score >= 60) return 'from-warning-600 to-warning-500';
  return 'from-error-600 to-error-500';
};

const getRiskClassificationColor = (classification) => {
  switch (classification.toLowerCase()) {
    case 'minimal':
      return 'bg-success-100 text-success-800 border-success-200';
    case 'limited':
      return 'bg-info-100 text-info-800 border-info-200';
    case 'high':
      return 'bg-warning-100 text-warning-800 border-warning-200';
    case 'prohibited':
      return 'bg-error-100 text-error-800 border-error-200';
    default:
      return 'bg-gray-100 text-gray-800 border-gray-200';
  }
};

const EmailModal = ({ isOpen, onClose, onSubmit }) => {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!email.trim()) {
      setError('Email address is required');
      return;
    }

    if (!validateEmail(email)) {
      setError('Please enter a valid email address');
      return;
    }

    setError('');
    setIsSubmitting(true);
    try {
      await onSubmit(email);
      toast.success('Report will be sent to your email shortly!');
      onClose();
      setEmail('');
    } catch (error) {
      toast.error('Failed to send report. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = useCallback(() => {
    if (!isSubmitting) {
      onClose();
      setEmail('');
      setError('');
    }
  }, [isSubmitting, onClose]);

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      handleClose();
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Escape') {
      handleClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
      onClick={handleBackdropClick}
      onKeyDown={handleKeyDown}
      tabIndex={-1}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        transition={{ duration: 0.2 }}
        className="bg-white rounded-xl shadow-xl w-full max-w-md p-6"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">Get Your Free Report</h3>
          <button
            onClick={handleClose}
            disabled={isSubmitting}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <ApperIcon name="X" size={20} />
          </button>
        </div>

        <p className="text-gray-600 text-sm mb-6">
          Enter your email address and we'll send you a PDF copy of your compliance assessment report.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="form-label">Email Address</label>
            <Input
              type="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value)
                setError('')
              }}
              placeholder="your@email.com"
              disabled={isSubmitting}
              className={error ? 'border-error-300 focus:border-error-400 focus:ring-error-400' : ''}
            />
            {error && (
              <p className="text-error-600 text-sm mt-1">{error}</p>
            )}
          </div>

          <div className="flex gap-3 pt-2">
            <Button
              type="button"
              variant="secondary"
              className="flex-1"
              onClick={handleClose}
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              variant="primary"
              className="flex-1"
              loading={isSubmitting}
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Sending...' : 'Send Report'}
            </Button>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

const ResultsDashboard = ({ results }) => {
  const [isEmailModalOpen, setIsEmailModalOpen] = useState(false);
  
  if (!results) return null;

  const handleEmailSubmit = async (email) => {
    // Simulate API call to send email
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    // Here you would typically make an API call to your backend
    // to send the PDF report to the provided email address
    console.log('Sending PDF report to:', email)
    
    // For demo purposes, we're just simulating success
    // In a real implementation, you might want to handle errors appropriately
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="space-y-8"
    >
      <div className="text-center mb-8">
        <div className="w-16 h-16 bg-gradient-to-r from-success-600 to-success-500 rounded-full flex items-center justify-center mx-auto mb-4">
          <ApperIcon name="Award" className="w-8 h-8 text-white" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Assessment Complete</h2>
        <p className="text-gray-600">
          Your EU AI Act compliance assessment has been completed and analyzed.
        </p>
      </div>

      {/* Score Card */}
      <div className="card-premium p-8 text-center">
        <div className="mb-6">
          <div className={`w-32 h-32 rounded-full bg-gradient-to-r ${getScoreBackground(results.overallScore)} flex items-center justify-center mx-auto mb-4`}>
            <span className="text-4xl font-bold text-white">{results.overallScore}</span>
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-2">Overall Compliance Score</h3>
          <p className={`text-lg font-semibold ${getScoreColor(results.overallScore)}`}>
            {results.overallScore >= 80 ? 'Excellent' : results.overallScore >= 60 ? 'Good' : 'Needs Improvement'}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="text-2xl font-bold text-gray-900 mb-1">{results.riskClassification}</div>
            <div className={`inline-block px-3 py-1 rounded-full text-sm font-medium border ${getRiskClassificationColor(results.riskClassification)}`}>
              Risk Classification
            </div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-error-600 mb-1">{results.criticalGaps.length}</div>
            <div className="text-sm text-gray-600">Critical Gaps</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-primary-600 mb-1">{results.recommendations.length}</div>
            <div className="text-sm text-gray-600">Recommendations</div>
          </div>
        </div>
      </div>

      {/* Critical Gaps */}
      {results.criticalGaps.length > 0 && (
        <div className="card p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <ApperIcon name="AlertTriangle" className="w-5 h-5 text-error-600" />
            Critical Gaps Identified
          </h3>
          <div className="space-y-3">
            {results.criticalGaps.map((gap, index) => (
              <div key={index} className="flex items-start gap-3 p-3 bg-error-50 rounded-lg border border-error-200">
                <ApperIcon name="X" className="w-5 h-5 text-error-600 mt-0.5" />
                <p className="text-error-800 text-sm">{gap}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Recommendations */}
      <div className="card p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
          <ApperIcon name="Lightbulb" className="w-5 h-5 text-primary-600" />
          Recommended Next Steps
        </h3>
        <div className="space-y-3">
          {results.recommendations.map((recommendation, index) => (
            <div key={index} className="flex items-start gap-3 p-3 bg-primary-50 rounded-lg border border-primary-200">
              <ApperIcon name="CheckCircle" className="w-5 h-5 text-primary-600 mt-0.5" />
              <p className="text-primary-800 text-sm">{recommendation}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="card p-6 text-center">
          <ApperIcon name="FileText" className="w-8 h-8 text-primary-600 mx-auto mb-3" />
          <h4 className="text-lg font-semibold text-gray-900 mb-2">Basic Report</h4>
          <p className="text-gray-600 text-sm mb-4">
            Get a summary of your assessment results
          </p>
          <Button 
            variant="secondary" 
            className="w-full"
            onClick={() => setIsEmailModalOpen(true)}
          >
            Download Free Report
          </Button>
        </div>

        <div className="card p-6 text-center border-2 border-accent-200">
          <ApperIcon name="Crown" className="w-8 h-8 text-accent-600 mx-auto mb-3" />
          <h4 className="text-lg font-semibold text-gray-900 mb-2">Premium Report</h4>
          <p className="text-gray-600 text-sm mb-4">
            Detailed compliance roadmap with implementation guidance
          </p>
          <div className="text-2xl font-bold text-accent-600 mb-2">€497 - €1,997</div>
          <Button variant="accent" className="w-full">
            Get Premium Report
          </Button>
        </div>
      </div>

      {/* Footer */}
      <div className="text-center pt-8 border-t border-gray-200">
        <p className="text-gray-500 text-sm">
          Assessment completed on {new Date().toLocaleDateString()}
        </p>
        <p className="text-gray-500 text-sm mt-1">
          Report generated by AIactAuditor.eu
        </p>
      </div>

      <EmailModal
        isOpen={isEmailModalOpen}
        onClose={() => setIsEmailModalOpen(false)}
        onSubmit={handleEmailSubmit}
      />
    </motion.div>
  );
};

export default ResultsDashboard;