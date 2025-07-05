import { motion } from 'framer-motion'
import Input from '@/components/atoms/Input'
import Select from '@/components/atoms/Select'
import ApperIcon from '@/components/ApperIcon'

const CompanyInfoForm = ({ companyInfo, onChange, errors }) => {
  const industryOptions = [
    { value: 'technology', label: 'Technology' },
    { value: 'financial', label: 'Financial Services' },
    { value: 'healthcare', label: 'Healthcare' },
    { value: 'manufacturing', label: 'Manufacturing' },
    { value: 'other', label: 'Other' }
  ]

  const companySizeOptions = [
    { value: '1-50', label: '1-50 employees' },
    { value: '51-200', label: '51-200 employees' },
    { value: '201-1000', label: '201-1000 employees' },
    { value: '1000+', label: '1000+ employees' }
  ]

  const primaryMarketOptions = [
    { value: 'germany', label: 'Germany' },
    { value: 'france', label: 'France' },
    { value: 'netherlands', label: 'Netherlands' },
    { value: 'other', label: 'Other EU Country' }
  ]

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="space-y-8"
    >
      <div className="text-center mb-8">
        <div className="w-16 h-16 bg-gradient-to-r from-primary-600 to-primary-500 rounded-full flex items-center justify-center mx-auto mb-4">
          <ApperIcon name="Building" className="w-8 h-8 text-white" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Company Information</h2>
        <p className="text-gray-600">
          Please provide basic information about your organization to personalize your assessment.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="md:col-span-2">
          <Input
            label="Company Name"
            value={companyInfo.companyName || ''}
            onChange={(e) => onChange('companyName', e.target.value)}
            error={errors.companyName}
            required
            placeholder="Enter your company name"
            icon="Building"
          />
        </div>

        <Select
          label="Industry"
          value={companyInfo.industry || ''}
          onChange={(e) => onChange('industry', e.target.value)}
          options={industryOptions}
          error={errors.industry}
          required
          placeholder="Select your industry"
        />

        <Select
          label="Company Size"
          value={companyInfo.companySize || ''}
          onChange={(e) => onChange('companySize', e.target.value)}
          options={companySizeOptions}
          placeholder="Select company size"
        />

        <Select
          label="Primary EU Market"
          value={companyInfo.primaryMarket || ''}
          onChange={(e) => onChange('primaryMarket', e.target.value)}
          options={primaryMarketOptions}
          placeholder="Select primary market"
        />

        <Input
          label="Contact Email"
          type="email"
          value={companyInfo.contactEmail || ''}
          onChange={(e) => onChange('contactEmail', e.target.value)}
          error={errors.contactEmail}
          required
          placeholder="your.email@company.com"
          icon="Mail"
        />

        <Input
          label="Number of AI Systems"
          type="number"
          value={companyInfo.aiSystemsCount || ''}
          onChange={(e) => onChange('aiSystemsCount', e.target.value)}
          placeholder="0"
          icon="Bot"
        />
      </div>

      <div className="bg-gradient-to-r from-info-50 to-info-100 border-l-4 border-info-500 rounded-lg p-6">
        <div className="flex items-start gap-3">
          <ApperIcon name="Info" className="w-6 h-6 text-info-600 mt-0.5" />
          <div>
            <h3 className="text-lg font-semibold text-info-900 mb-2">Data Privacy Notice</h3>
            <p className="text-info-800 text-sm leading-relaxed">
              Your information is processed in accordance with GDPR regulations. We use this data solely 
              for generating your compliance assessment and will not share it with third parties. 
              You can request deletion of your data at any time.
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default CompanyInfoForm