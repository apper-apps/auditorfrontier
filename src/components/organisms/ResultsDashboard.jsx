import React, { useCallback, useState } from "react";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import ApperIcon from "@/components/ApperIcon";
import Button from "@/components/atoms/Button";
import Input from "@/components/atoms/Input";
import Error from "@/components/ui/Error";
import Loading from "@/components/ui/Loading";

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

const PremiumReportModal = ({ isOpen, onClose }) => {
  const [selectedTier, setSelectedTier] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentError, setPaymentError] = useState('');

  const pricingTiers = [
    {
      id: 'basic-premium',
      name: 'Essential Report',
      price: 497,
      features: [
        'Detailed compliance analysis',
        'Implementation roadmap',
        'Risk assessment matrix',
        'Regulatory requirements checklist',
        'Basic remediation guidance'
      ],
      description: 'Perfect for small to medium businesses starting their AI compliance journey'
    },
    {
      id: 'professional',
      name: 'Professional Report',
      price: 997,
      features: [
        'Everything in Essential Report',
        'Custom compliance framework',
        'Industry-specific recommendations',
        'Gap analysis with priorities',
        'Implementation timeline',
        'Stakeholder communication templates'
      ],
      description: 'Ideal for established businesses with complex AI implementations',
      popular: true
    },
    {
      id: 'enterprise',
      name: 'Enterprise Report',
      price: 1997,
      features: [
        'Everything in Professional Report',
        'Executive summary for leadership',
        'Multi-jurisdiction compliance',
        'Advanced risk modeling',
        'Integration with existing systems',
        'Ongoing compliance monitoring plan',
        '30-day implementation support'
      ],
      description: 'Comprehensive solution for large organizations and enterprises'
    }
  ];

  const handleClose = useCallback(() => {
    if (!isProcessing) {
      onClose();
      setSelectedTier(null);
      setPaymentError('');
    }
  }, [isProcessing, onClose]);

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

  const handlePurchase = async (tier) => {
    setIsProcessing(true);
    setPaymentError('');
    
    try {
      // Simulate Stripe payment processing
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // In a real implementation, you would:
      // 1. Create a payment intent with Stripe
      // 2. Handle the payment confirmation
      // 3. Process the successful payment
      // 4. Generate and deliver the premium report
      
      // For demo purposes, we'll simulate success
      toast.success(`Premium report purchased successfully! You'll receive your ${tier.name} via email within 24 hours.`);
      handleClose();
    } catch (error) {
      setPaymentError('Payment failed. Please try again.');
      toast.error('Payment processing failed. Please try again.');
    } finally {
      setIsProcessing(false);
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
        transition={{ duration: 0.3 }}
        className="bg-white rounded-xl shadow-xl w-full max-w-6xl max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="sticky top-0 bg-white border-b border-gray-200 p-6 rounded-t-xl">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Premium Compliance Reports</h2>
              <p className="text-gray-600 mt-1">Choose the perfect report for your compliance needs</p>
            </div>
            <button
              onClick={handleClose}
              disabled={isProcessing}
              className="text-gray-400 hover:text-gray-600 transition-colors p-2"
            >
              <ApperIcon name="X" size={24} />
            </button>
          </div>
        </div>

        <div className="p-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {pricingTiers.map((tier) => (
              <div
                key={tier.id}
                className={`relative card p-6 ${
                  tier.popular ? 'border-2 border-accent-400 shadow-lg' : ''
                }`}
              >
                {tier.popular && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <span className="bg-accent-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                      Most Popular
                    </span>
                  </div>
                )}
                
                <div className="text-center mb-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{tier.name}</h3>
                  <div className="text-3xl font-bold text-accent-600 mb-1">
                    €{tier.price.toLocaleString()}
                  </div>
                  <p className="text-gray-600 text-sm">{tier.description}</p>
                </div>

                <ul className="space-y-3 mb-6">
                  {tier.features.map((feature, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <ApperIcon name="CheckCircle" className="w-5 h-5 text-success-600 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700 text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>

                <Button
                  variant={tier.popular ? "accent" : "secondary"}
                  className="w-full"
                  onClick={() => handlePurchase(tier)}
                  loading={isProcessing}
                  disabled={isProcessing}
                >
                  {isProcessing ? 'Processing...' : `Get ${tier.name}`}
                </Button>
              </div>
            ))}
          </div>

          {paymentError && (
            <div className="mt-6 p-4 bg-error-50 border border-error-200 rounded-lg">
              <div className="flex items-center gap-2">
                <ApperIcon name="AlertCircle" className="w-5 h-5 text-error-600" />
                <p className="text-error-800 text-sm">{paymentError}</p>
              </div>
            </div>
          )}

          <div className="mt-8 p-6 bg-gray-50 rounded-lg">
            <div className="flex items-center gap-3 mb-4">
              <ApperIcon name="Shield" className="w-6 h-6 text-success-600" />
              <h4 className="text-lg font-semibold text-gray-900">Secure Payment Processing</h4>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-600">
              <div className="flex items-center gap-2">
                <ApperIcon name="Lock" className="w-4 h-4 text-success-600" />
                <span>SSL encrypted payments</span>
              </div>
              <div className="flex items-center gap-2">
                <ApperIcon name="CreditCard" className="w-4 h-4 text-success-600" />
                <span>Powered by Stripe</span>
              </div>
              <div className="flex items-center gap-2">
                <ApperIcon name="CheckCircle" className="w-4 h-4 text-success-600" />
                <span>PCI DSS compliant</span>
              </div>
              <div className="flex items-center gap-2">
                <ApperIcon name="Mail" className="w-4 h-4 text-success-600" />
                <span>Report delivered within 24 hours</span>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
const PDFPreviewModal = ({ isOpen, onClose, pdfData }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const handleClose = useCallback(() => {
    onClose();
    setIsLoading(true);
    setError(null);
  }, [onClose]);

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

  const handleDownload = () => {
    if (pdfData && pdfData.blob) {
      const link = document.createElement('a');
      link.href = pdfData.url;
      link.download = `AI_Act_Compliance_Report_${new Date().toISOString().split('T')[0]}.html`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      toast.success('Report downloaded successfully!');
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
        transition={{ duration: 0.3 }}
        className="bg-white rounded-xl shadow-xl w-full max-w-6xl max-h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Report Preview</h2>
            <p className="text-gray-600 mt-1">Review your compliance assessment report</p>
          </div>
          <div className="flex items-center gap-3">
            <Button
              variant="secondary"
              onClick={handleDownload}
              disabled={!pdfData}
              className="flex items-center gap-2"
            >
              <ApperIcon name="Download" size={16} />
              Download
            </Button>
            <button
              onClick={handleClose}
              className="text-gray-400 hover:text-gray-600 transition-colors p-2"
            >
              <ApperIcon name="X" size={24} />
            </button>
          </div>
        </div>

        <div className="flex-1 p-6">
          {error ? (
            <div className="flex items-center justify-center h-full">
              <div className="text-center">
                <ApperIcon name="AlertCircle" className="w-12 h-12 text-error-600 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Preview Error</h3>
                <p className="text-gray-600">{error}</p>
              </div>
            </div>
          ) : (
            <div className="h-full bg-gray-50 rounded-lg overflow-hidden">
              {isLoading && (
                <div className="flex items-center justify-center h-full">
                  <div className="text-center">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600 mx-auto mb-4"></div>
                    <p className="text-gray-600">Loading preview...</p>
                  </div>
                </div>
              )}
              
              {pdfData && pdfData.url && (
                <iframe
                  src={pdfData.url}
                  className="w-full h-full border-0 rounded-lg"
                  title="PDF Preview"
                  onLoad={() => setIsLoading(false)}
                  onError={() => {
                    setIsLoading(false);
                    setError('Failed to load preview. Please try downloading the report instead.');
                  }}
                />
              )}
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
};

const ResultsDashboard = ({ results }) => {
  const [isEmailModalOpen, setIsEmailModalOpen] = useState(false);
  const [isPremiumModalOpen, setIsPremiumModalOpen] = useState(false);
  const [isPDFPreviewOpen, setIsPDFPreviewOpen] = useState(false);
  
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

{/* PDF Preview Section */}
      {results.pdfData && (
        <div className="card p-6 bg-gradient-to-r from-blue-50 to-indigo-50 border-2 border-primary-200">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <ApperIcon name="Eye" className="w-8 h-8 text-primary-600" />
              <div>
                <h3 className="text-lg font-semibold text-gray-900">Report Preview</h3>
                <p className="text-gray-600 text-sm">Review your generated compliance report</p>
              </div>
            </div>
            <Button
              variant="primary"
              onClick={() => setIsPDFPreviewOpen(true)}
              className="flex items-center gap-2"
            >
              <ApperIcon name="FileText" size={16} />
              Preview Report
            </Button>
          </div>
          
          <div className="bg-white rounded-lg p-4 border border-gray-200">
            <div className="flex items-center justify-between text-sm text-gray-600">
              <span>Document: AI_Act_Compliance_Report.pdf</span>
              <span>Generated: {new Date().toLocaleDateString()}</span>
            </div>
          </div>
        </div>
      )}

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
          <Button 
            variant="accent" 
            className="w-full"
            onClick={() => setIsPremiumModalOpen(true)}
          >
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

<PDFPreviewModal
        isOpen={isPDFPreviewOpen}
        onClose={() => setIsPDFPreviewOpen(false)}
        pdfData={results.pdfData}
      />

      <EmailModal
        isOpen={isEmailModalOpen}
        onClose={() => setIsEmailModalOpen(false)}
        onSubmit={handleEmailSubmit}
      />
      
      <PremiumReportModal
        isOpen={isPremiumModalOpen}
        onClose={() => setIsPremiumModalOpen(false)}
      />
    </motion.div>
  );
};

export default ResultsDashboard;