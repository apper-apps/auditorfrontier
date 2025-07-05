export const calculateComplianceScore = (companyInfo, answers) => {
  const results = {
    overallScore: 0,
    riskClassification: 'Minimal',
    criticalGaps: [],
    recommendations: [],
    assessmentDate: new Date().toISOString()
  }

  // Check for prohibited practices
  const prohibitedAnswers = ['Q16', 'Q17', 'Q18', 'Q19']
  const hasProhibitedPractices = prohibitedAnswers.some(qId => answers[qId] === 'yes')
  
  if (hasProhibitedPractices) {
    results.riskClassification = 'Prohibited'
    results.overallScore = 0
    results.criticalGaps.push('System engages in prohibited AI practices - immediate cessation required')
    results.recommendations.push('Immediately cease prohibited practices and redesign system')
    results.recommendations.push('Consult with legal counsel regarding AI Act compliance')
    return results
  }

  // Check for high-risk classification
  const highRiskAnswers = ['Q11', 'Q12', 'Q13', 'Q14']
  const isHighRisk = highRiskAnswers.some(qId => answers[qId] === 'yes')
  
  if (isHighRisk) {
    results.riskClassification = 'High'
    
    // Calculate score based on high-risk requirements
    const highRiskRequirements = ['Q20', 'Q21', 'Q22', 'Q23', 'Q24']
    let highRiskScore = 0
    
    highRiskRequirements.forEach(qId => {
      if (answers[qId] === 'yes') {
        highRiskScore += 20
      } else if (answers[qId] === 'partial') {
        highRiskScore += 10
      }
    })
    
    results.overallScore = Math.max(20, highRiskScore)
    
    // Add critical gaps for missing high-risk requirements
    if (answers['Q20'] !== 'yes') {
      results.criticalGaps.push('Risk management system not fully implemented')
    }
    if (answers['Q21'] !== 'yes') {
      results.criticalGaps.push('Data governance measures insufficient for bias detection')
    }
    if (answers['Q22'] !== 'yes') {
      results.criticalGaps.push('Accuracy and robustness thresholds not met or measured')
    }
    if (answers['Q23'] !== 'yes') {
      results.criticalGaps.push('Human oversight controls not properly integrated')
    }
    if (answers['Q24'] !== 'yes') {
      results.criticalGaps.push('Automatic event logging not comprehensive')
    }
    
  } else {
    // Check for limited risk (transparency obligations)
    const transparencyAnswers = ['Q1', 'Q9']
    const hasTransparencyNeeds = transparencyAnswers.some(qId => answers[qId] === 'yes')
    
    if (hasTransparencyNeeds) {
      results.riskClassification = 'Limited'
      results.overallScore = 75 // Default good score for limited risk
    } else {
      results.riskClassification = 'Minimal'
      results.overallScore = 85 // Default good score for minimal risk
    }
  }

  // Check governance and readiness
  const governanceQuestions = ['Q25', 'Q26', 'Q27', 'Q28', 'Q29', 'Q30', 'Q31', 'Q32']
  let governanceScore = 0
  
  governanceQuestions.forEach(qId => {
    if (answers[qId] === 'yes' || answers[qId] === 'complete') {
      governanceScore += 12.5
    } else if (answers[qId] === 'partial' || answers[qId] === 'planned' || answers[qId] === 'progress') {
      governanceScore += 6.25
    }
  })

  // Adjust overall score based on governance
  if (results.riskClassification === 'High') {
    results.overallScore = Math.min(100, results.overallScore + (governanceScore * 0.3))
  } else {
    results.overallScore = Math.min(100, results.overallScore + (governanceScore * 0.15))
  }

  // Add governance gaps
  if (answers['Q25'] !== 'complete') {
    results.criticalGaps.push('Technical documentation (Annex IV) incomplete')
  }
  if (answers['Q26'] !== 'yes' && isHighRisk) {
    results.criticalGaps.push('Quality management system not certified')
  }
  if (answers['Q27'] !== 'yes') {
    results.criticalGaps.push('Log retention and risk event linking inadequate')
  }
  if (answers['Q28'] !== 'yes') {
    results.criticalGaps.push('Post-market monitoring plan not established')
  }

  // Generate recommendations based on findings
  results.recommendations = generateRecommendations(results, answers, isHighRisk)

  return results
}

const generateRecommendations = (results, answers, isHighRisk) => {
  const recommendations = []

  // High-risk specific recommendations
  if (isHighRisk) {
    recommendations.push('Implement comprehensive risk management system with regular reviews')
    recommendations.push('Establish data governance framework with bias detection capabilities')
    recommendations.push('Design human oversight controls into user interface')
    recommendations.push('Implement automatic logging for all system events')
    recommendations.push('Prepare for third-party conformity assessment')
  }

  // General recommendations
  if (results.overallScore < 60) {
    recommendations.push('Conduct immediate AI Act compliance gap analysis')
    recommendations.push('Establish AI governance team with defined roles and responsibilities')
  }

  if (answers['Q29'] !== 'yes') {
    recommendations.push('Implement comprehensive AI literacy training program for all staff')
  }

  if (answers['Q30'] !== 'yes') {
    recommendations.push('Update supplier contracts to include AI Act compliance obligations')
  }

  if (answers['Q25'] !== 'complete') {
    recommendations.push('Complete technical documentation following Annex IV requirements')
  }

  if (answers['Q28'] !== 'yes') {
    recommendations.push('Develop post-market monitoring plan and implementation procedures')
  }

  // Always include these general recommendations
  recommendations.push('Regular compliance monitoring and assessment updates')
  recommendations.push('Stay updated with AI Act implementation guidance and standards')
  recommendations.push('Consider engaging AI Act compliance specialists for detailed review')

  return recommendations
}