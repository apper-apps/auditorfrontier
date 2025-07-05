import { useState, useEffect } from 'react'
import { ApperIcon } from '@/components/ApperIcon'

const TrustBanner = () => {
  const [currentTestimonial, setCurrentTestimonial] = useState(0)

  const testimonials = [
    {
      text: "This assessment helped us achieve EU AI Act compliance 3 months ahead of schedule. The detailed recommendations were invaluable.",
      author: "Sarah Chen",
      role: "Chief Technology Officer",
      company: "TechFlow Solutions"
    },
    {
      text: "Comprehensive and user-friendly. The step-by-step guidance made complex regulations understandable for our entire team.",
      author: "Marcus Rodriguez",
      role: "Compliance Director",
      company: "DataVision Corp"
    },
    {
      text: "Excellent tool for risk assessment. The detailed reports helped us identify and address potential compliance gaps early.",
      author: "Lisa Zhang",
      role: "AI Ethics Lead",
      company: "Innovation Labs"
    },
    {
      text: "Professional, thorough, and reliable. This assessment tool has become essential for our AI governance framework.",
      author: "David Thompson",
      role: "Risk Management Lead",
      company: "SecureAI Systems"
    }
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length)
    }, 4000)

    return () => clearInterval(interval)
  }, [testimonials.length])

  return (
    <div className="bg-gradient-to-r from-primary-50 to-secondary-50 border-b border-primary-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-4">
          {/* Security Badges */}
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2 text-success-600">
              <ApperIcon name="Lock" size={18} />
              <span className="text-sm font-medium">HTTPS Secured</span>
            </div>
            <div className="flex items-center gap-2 text-primary-600">
              <ApperIcon name="ShieldCheck" size={18} />
              <span className="text-sm font-medium">Verified Platform</span>
            </div>
            <div className="flex items-center gap-2 text-accent-600">
              <ApperIcon name="Award" size={18} />
              <span className="text-sm font-medium">ISO 27001 Certified</span>
            </div>
          </div>

          {/* Testimonials */}
          <div className="flex-1 max-w-2xl">
            <div className="relative h-16 overflow-hidden">
              {testimonials.map((testimonial, index) => (
                <div
                  key={index}
                  className={`absolute inset-0 transition-opacity duration-500 ${
                    index === currentTestimonial ? 'opacity-100' : 'opacity-0'
                  }`}
                >
                  <div className="flex items-center justify-center h-full">
                    <div className="text-center">
                      <p className="text-sm text-gray-700 italic mb-1">
                        "{testimonial.text}"
                      </p>
                      <p className="text-xs text-gray-500">
                        - {testimonial.author}, {testimonial.role} at {testimonial.company}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            {/* Testimonial Indicators */}
            <div className="flex justify-center mt-2 gap-1">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentTestimonial(index)}
                  className={`w-2 h-2 rounded-full transition-colors duration-200 ${
                    index === currentTestimonial ? 'bg-primary-500' : 'bg-gray-300'
                  }`}
                  aria-label={`View testimonial ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TrustBanner