export const assessmentSections = [
  {
    "Id": 1,
    "title": "Scope & Applicability",
    "description": "Determine if your AI system falls under EU AI Act regulations",
    "type": "general",
    "questions": [
      {
        "Id": "Q1",
        "title": "Does your AI system's output reach any person located in the EU?",
        "type": "radio",
        "required": true,
        "options": [
          { "value": "yes", "label": "Yes" },
          { "value": "no", "label": "No" }
        ],
        "helpText": "This includes direct users, indirect users, or any person affected by the AI system's decisions or outputs.",
        "articleRef": "Article 2 - Scope"
      },
      {
        "Id": "Q2",
        "title": "Are you the provider, deployer, importer or distributor of the AI system?",
        "type": "checkbox",
        "required": true,
        "options": [
          { "value": "provider", "label": "Provider (developing/training the AI system)" },
          { "value": "deployer", "label": "Deployer (using the AI system for intended purpose)" },
          { "value": "importer", "label": "Importer (placing third-country AI system on EU market)" },
          { "value": "distributor", "label": "Distributor (making AI system available on market)" }
        ],
        "helpText": "Select all roles that apply to your organization in relation to the AI system.",
        "articleRef": "Article 3 - Definitions"
      },
      {
        "Id": "Q3",
        "title": "Is the AI placed on the EU market after August 1, 2024?",
        "type": "radio",
        "required": true,
        "options": [
          { "value": "yes", "label": "Yes" },
          { "value": "no", "label": "No" }
        ],
        "helpText": "The AI Act applies to AI systems placed on the market or put into service after August 1, 2024.",
        "articleRef": "Article 112 - Entry into force"
      },
      {
        "Id": "Q4",
        "title": "Has the system undergone conformity assessment under other EU product-safety law?",
        "type": "radio",
        "required": false,
        "options": [
          { "value": "yes", "label": "Yes" },
          { "value": "no", "label": "No" }
        ],
        "helpText": "Other EU laws may apply such as Medical Device Regulation, Machinery Regulation, etc.",
        "articleRef": "Article 2 - Scope"
      },
      {
        "Id": "Q5",
        "title": "Is the AI used solely for military, research or non-commercial purposes?",
        "type": "radio",
        "required": false,
        "options": [
          { "value": "yes", "label": "Yes" },
          { "value": "no", "label": "No" }
        ],
        "helpText": "Certain uses are excluded from the AI Act scope.",
        "articleRef": "Article 2 - Scope"
      }
    ]
  },
  {
    "Id": 2,
    "title": "AI System Inventory",
    "description": "Document your AI system's technical characteristics and deployment",
    "type": "general",
    "questions": [
      {
        "Id": "Q6",
        "title": "System name, version, and release date",
        "type": "text",
        "required": true,
        "placeholder": "e.g., CustomerBot v2.1, released March 2024",
        "helpText": "Provide clear identification of your AI system including version control.",
        "articleRef": "Annex IV - Technical Documentation"
      },
      {
        "Id": "Q7",
        "title": "External APIs or GPAI models embedded",
        "type": "textarea",
        "required": false,
        "placeholder": "List any third-party AI models, APIs, or services integrated into your system",
        "helpText": "Include details about General Purpose AI models (GPAI) and their capabilities.",
        "articleRef": "Article 3 - Definitions"
      },
      {
        "Id": "Q8",
        "title": "Hardware dependencies (edge devices, IoT sensors)",
        "type": "textarea",
        "required": false,
        "placeholder": "Describe any specific hardware requirements or dependencies",
        "helpText": "Include edge computing devices, specialized sensors, or processing units.",
        "articleRef": "Annex IV - Technical Documentation"
      },
      {
        "Id": "Q9",
        "title": "Intended users and deployment environments",
        "type": "textarea",
        "required": true,
        "placeholder": "Describe who will use the system and in what contexts",
        "helpText": "Be specific about user groups, use cases, and operational environments.",
        "articleRef": "Article 13 - Transparency obligations"
      },
      {
        "Id": "Q10",
        "title": "Does the system continue to learn post-deployment?",
        "type": "radio",
        "required": true,
        "options": [
          { "value": "yes", "label": "Yes - continues learning from new data" },
          { "value": "no", "label": "No - static model after deployment" }
        ],
        "helpText": "Continuous learning systems may have additional obligations under the AI Act.",
        "articleRef": "Article 15 - Accuracy, robustness and cybersecurity"
      }
    ]
  },
  {
    "Id": 3,
    "title": "Risk Classification",
    "description": "Determine your AI system's risk category under the AI Act",
    "type": "risk",
    "questions": [
      {
        "Id": "Q11",
        "title": "Does the system perform remote biometric identification?",
        "type": "radio",
        "required": true,
        "options": [
          { "value": "yes", "label": "Yes" },
          { "value": "no", "label": "No" }
        ],
        "helpText": "Remote biometric identification includes facial recognition, voice recognition, etc.",
        "articleRef": "Article 5 - Prohibited AI practices"
      },
      {
        "Id": "Q12",
        "title": "Is it a safety component of critical infrastructure?",
        "type": "radio",
        "required": true,
        "options": [
          { "value": "yes", "label": "Yes" },
          { "value": "no", "label": "No" }
        ],
        "helpText": "Critical infrastructure includes energy, transport, banking, health systems, etc.",
        "articleRef": "Annex III - High-risk AI systems"
      },
      {
        "Id": "Q13",
        "title": "Does it influence education, employment or credit decisions?",
        "type": "radio",
        "required": true,
        "options": [
          { "value": "yes", "label": "Yes" },
          { "value": "no", "label": "No" }
        ],
        "helpText": "This includes recruitment, performance evaluation, credit scoring, educational assessments.",
        "articleRef": "Annex III - High-risk AI systems"
      },
      {
        "Id": "Q14",
        "title": "Is it used by law-enforcement, migration or justice authorities?",
        "type": "radio",
        "required": true,
        "options": [
          { "value": "yes", "label": "Yes" },
          { "value": "no", "label": "No" }
        ],
        "helpText": "Systems used by public authorities for law enforcement, immigration, or judicial decisions.",
        "articleRef": "Annex III - High-risk AI systems"
      },
      {
        "Id": "Q15",
        "title": "Can derogations (Art. 6 §3) be invoked if high risk?",
        "type": "radio",
        "required": false,
        "options": [
          { "value": "yes", "label": "Yes" },
          { "value": "no", "label": "No" },
          { "value": "na", "label": "Not Applicable" }
        ],
        "helpText": "Derogations may apply for testing or certain specific purposes.",
        "articleRef": "Article 6 - Classification rules"
      }
    ]
  },
  {
    "Id": 4,
    "title": "Prohibited Practices",
    "description": "Ensure your AI system doesn't engage in prohibited practices",
    "type": "prohibited",
    "questions": [
      {
        "Id": "Q16",
        "title": "Does the AI exploit vulnerabilities due to age, disability or social status?",
        "type": "radio",
        "required": true,
        "options": [
          { "value": "yes", "label": "Yes" },
          { "value": "no", "label": "No" }
        ],
        "helpText": "Prohibited practices include exploiting vulnerabilities of specific groups.",
        "articleRef": "Article 5 - Prohibited AI practices"
      },
      {
        "Id": "Q17",
        "title": "Does it assign or use a social score to affect access to services?",
        "type": "radio",
        "required": true,
        "options": [
          { "value": "yes", "label": "Yes" },
          { "value": "no", "label": "No" }
        ],
        "helpText": "Social scoring systems that affect access to services are prohibited.",
        "articleRef": "Article 5 - Prohibited AI practices"
      },
      {
        "Id": "Q18",
        "title": "Does it attempt emotion recognition in workplaces or schools?",
        "type": "radio",
        "required": true,
        "options": [
          { "value": "yes", "label": "Yes" },
          { "value": "no", "label": "No" }
        ],
        "helpText": "Emotion recognition in workplaces and educational institutions is prohibited.",
        "articleRef": "Article 5 - Prohibited AI practices"
      },
      {
        "Id": "Q19",
        "title": "Does it scrape images for untargeted facial-recognition databases?",
        "type": "radio",
        "required": true,
        "options": [
          { "value": "yes", "label": "Yes" },
          { "value": "no", "label": "No" }
        ],
        "helpText": "Untargeted scraping of facial images from internet or CCTV is prohibited.",
        "articleRef": "Article 5 - Prohibited AI practices"
      }
    ]
  },
  {
    "Id": 5,
    "title": "High-Risk Evaluation",
    "description": "Assess compliance with high-risk AI system requirements",
    "type": "risk",
    "questions": [
      {
        "Id": "Q20",
        "title": "Is a risk-management system documented and iterative?",
        "type": "radio",
        "required": true,
        "options": [
          { "value": "yes", "label": "Yes - fully documented and iterative" },
          { "value": "no", "label": "No - not implemented" },
          { "value": "partial", "label": "Partial - some documentation exists" }
        ],
        "helpText": "Risk management must be continuous and documented throughout the AI system lifecycle.",
        "articleRef": "Article 9 - Risk management system"
      },
      {
        "Id": "Q21",
        "title": "Are data governance measures in place to detect bias?",
        "type": "radio",
        "required": true,
        "options": [
          { "value": "yes", "label": "Yes - comprehensive bias detection" },
          { "value": "no", "label": "No - no bias detection measures" },
          { "value": "partial", "label": "Partial - some measures in place" }
        ],
        "helpText": "Data governance must include measures to detect and mitigate bias.",
        "articleRef": "Article 10 - Data and data governance"
      },
      {
        "Id": "Q22",
        "title": "Does the model meet declared accuracy/robustness thresholds?",
        "type": "radio",
        "required": true,
        "options": [
          { "value": "yes", "label": "Yes - meets all thresholds" },
          { "value": "no", "label": "No - doesn't meet thresholds" },
          { "value": "unknown", "label": "Unknown - not measured" }
        ],
        "helpText": "Performance metrics must be documented and maintained.",
        "articleRef": "Article 15 - Accuracy, robustness and cybersecurity"
      },
      {
        "Id": "Q23",
        "title": "Are human-oversight controls engineered into the UI?",
        "type": "radio",
        "required": true,
        "options": [
          { "value": "yes", "label": "Yes - built into interface" },
          { "value": "no", "label": "No - no oversight controls" },
          { "value": "partial", "label": "Partial - some controls exist" }
        ],
        "helpText": "Human oversight must be designed into the system interface.",
        "articleRef": "Article 14 - Human oversight"
      },
      {
        "Id": "Q24",
        "title": "Is automatic event logging activated for the full life-cycle?",
        "type": "radio",
        "required": true,
        "options": [
          { "value": "yes", "label": "Yes - comprehensive logging" },
          { "value": "no", "label": "No - no logging" },
          { "value": "partial", "label": "Partial - some logging" }
        ],
        "helpText": "Automatic logging must capture all relevant events throughout the system lifecycle.",
        "articleRef": "Article 12 - Record-keeping"
      }
    ]
  },
  {
    "Id": 6,
    "title": "Governance & Current Status",
    "description": "Assess your organization's AI governance and compliance readiness",
    "type": "general",
    "questions": [
      {
        "Id": "Q25",
        "title": "Has Annex IV technical documentation been drafted?",
        "type": "radio",
        "required": true,
        "options": [
          { "value": "complete", "label": "Complete - all sections documented" },
          { "value": "partial", "label": "Partial - some sections complete" },
          { "value": "missing", "label": "Missing - not started" }
        ],
        "helpText": "Technical documentation must cover all requirements in Annex IV.",
        "articleRef": "Annex IV - Technical Documentation"
      },
      {
        "Id": "Q26",
        "title": "Is a quality-management system (QMS) certified or planned?",
        "type": "radio",
        "required": true,
        "options": [
          { "value": "yes", "label": "Yes - certified QMS in place" },
          { "value": "no", "label": "No - no QMS" },
          { "value": "planned", "label": "Planned - QMS in development" }
        ],
        "helpText": "A quality management system is required for high-risk AI systems.",
        "articleRef": "Article 17 - Quality management system"
      },
      {
        "Id": "Q27",
        "title": "Are logs retained for at least six months and linked to risk events?",
        "type": "radio",
        "required": true,
        "options": [
          { "value": "yes", "label": "Yes - proper retention and linking" },
          { "value": "no", "label": "No - inadequate retention" },
          { "value": "partial", "label": "Partial - some retention measures" }
        ],
        "helpText": "Logs must be retained for at least 6 months and linked to risk events.",
        "articleRef": "Article 12 - Record-keeping"
      },
      {
        "Id": "Q28",
        "title": "Is a post-market monitoring plan available?",
        "type": "radio",
        "required": true,
        "options": [
          { "value": "yes", "label": "Yes - comprehensive plan in place" },
          { "value": "no", "label": "No - no monitoring plan" },
          { "value": "planned", "label": "Planned - under development" }
        ],
        "helpText": "Post-market monitoring is required to track AI system performance.",
        "articleRef": "Article 61 - Post-market monitoring"
      },
      {
        "Id": "Q29",
        "title": "Have all staff with AI roles completed AI literacy training?",
        "type": "radio",
        "required": true,
        "options": [
          { "value": "yes", "label": "Yes - all staff trained" },
          { "value": "no", "label": "No - no training completed" },
          { "value": "progress", "label": "In Progress - training underway" }
        ],
        "helpText": "AI literacy training is required for staff involved in AI systems.",
        "articleRef": "Article 4 - AI literacy"
      },
      {
        "Id": "Q30",
        "title": "Are third-party suppliers contractually bound to AI-Act duties?",
        "type": "radio",
        "required": true,
        "options": [
          { "value": "yes", "label": "Yes - contracts updated" },
          { "value": "no", "label": "No - no contractual obligations" },
          { "value": "unknown", "label": "Unknown - needs review" }
        ],
        "helpText": "Contracts with suppliers must include AI Act compliance obligations.",
        "articleRef": "Article 25 - Obligations of distributors"
      },
      {
        "Id": "Q31",
        "title": "Have serious-incident reporting workflows been tested?",
        "type": "radio",
        "required": true,
        "options": [
          { "value": "yes", "label": "Yes - tested and documented" },
          { "value": "no", "label": "No - no testing" },
          { "value": "na", "label": "Not Applicable - no serious incidents" }
        ],
        "helpText": "Serious incident reporting procedures must be tested and documented.",
        "articleRef": "Article 62 - Reporting of serious incidents"
      },
      {
        "Id": "Q32",
        "title": "Is budget allocated for conformity assessment and CE marking?",
        "type": "radio",
        "required": true,
        "options": [
          { "value": "yes", "label": "Yes - budget allocated" },
          { "value": "no", "label": "No - no budget allocation" },
          { "value": "review", "label": "Under Review - budget planning" }
        ],
        "helpText": "Budget planning for conformity assessment and CE marking is essential.",
        "articleRef": "Article 43 - Conformity assessment"
      }
    ]
  }
]