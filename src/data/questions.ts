import { Question } from '@/types/assessment';

export const assessmentQuestions: Question[] = [
  // Psychometric Section
  {
    id: 'psych_1',
    type: 'slider',
    category: 'psychometric',
    subcategory: 'interest',
    question: 'How excited are you about the idea of earning passive income through digital marketing?',
    min: 1,
    max: 10,
    weight: 2
  },
  {
    id: 'psych_2',
    type: 'multiple-choice',
    category: 'psychometric',
    subcategory: 'personality',
    question: 'When starting a new project, you prefer to:',
    options: [
      'Plan everything meticulously before beginning',
      'Start with basic planning and adapt as you go',
      'Jump in and figure things out along the way',
      'Research extensively first, then create a detailed plan'
    ],
    weight: 1.5
  },
  {
    id: 'psych_3',
    type: 'slider',
    category: 'psychometric',
    subcategory: 'motivation',
    question: 'Rate your persistence when facing setbacks (1 = give up easily, 10 = never give up)',
    min: 1,
    max: 10,
    weight: 2
  },
  {
    id: 'psych_4',
    type: 'multiple-choice',
    category: 'psychometric',
    subcategory: 'work_style',
    question: 'Which work environment energizes you most?',
    options: [
      'Working independently with minimal supervision',
      'Collaborating with a small, close-knit team',
      'Large team environment with clear hierarchies',
      'Mixture of independent and collaborative work'
    ],
    weight: 1
  },
  {
    id: 'psych_5',
    type: 'slider',
    category: 'psychometric',
    subcategory: 'analytical',
    question: 'How comfortable are you with analyzing data and metrics to make decisions?',
    min: 1,
    max: 10,
    weight: 2
  },

  // Technical Section
  {
    id: 'tech_1',
    type: 'multiple-choice',
    category: 'technical',
    question: 'What is a conversion rate in affiliate marketing?',
    options: [
      'The rate at which you convert visitors into subscribers',
      'The percentage of clicks that result in a desired action (sale/lead)',
      'How fast your website loads',
      'The rate of commission you earn per sale'
    ],
    correctAnswer: 1,
    weight: 1.5
  },
  {
    id: 'tech_2',
    type: 'slider',
    category: 'technical',
    question: 'Rate your current knowledge of SEO (Search Engine Optimization)',
    min: 1,
    max: 10,
    weight: 2
  },
  {
    id: 'tech_3',
    type: 'multiple-choice',
    category: 'technical',
    question: 'Which platform is commonly used for affiliate marketing tracking?',
    options: [
      'Instagram',
      'Google Analytics and affiliate networks',
      'Microsoft Word',
      'Photoshop'
    ],
    correctAnswer: 1,
    weight: 1.5
  },
  {
    id: 'tech_4',
    type: 'scenario',
    category: 'technical',
    scenario: 'Your affiliate campaign has 1000 clicks, 50 conversions, and generated $500 in commissions.',
    question: 'What is the conversion rate and earnings per click?',
    options: [
      '5% conversion rate, $0.50 per click',
      '50% conversion rate, $5.00 per click',
      '10% conversion rate, $1.00 per click',
      '2% conversion rate, $0.25 per click'
    ],
    correctAnswer: 0,
    weight: 2
  },
  {
    id: 'tech_5',
    type: 'slider',
    category: 'technical',
    question: 'How experienced are you with creating content (blogs, videos, social media)?',
    min: 1,
    max: 10,
    weight: 2
  },

  // WISCAR Framework
  {
    id: 'wiscar_will_1',
    type: 'scenario',
    category: 'wiscar',
    subcategory: 'will',
    scenario: 'Your first affiliate campaign fails to generate any sales after 3 months of effort.',
    question: 'What would you most likely do?',
    options: [
      'Quit and try something else',
      'Analyze what went wrong and try a different approach',
      'Continue with the same strategy for a few more months',
      'Seek mentorship and completely revamp your strategy'
    ],
    weight: 2
  },
  {
    id: 'wiscar_interest_1',
    type: 'multiple-choice',
    category: 'wiscar',
    subcategory: 'interest',
    question: 'Which aspect of affiliate marketing interests you most?',
    options: [
      'Building relationships with brands and other marketers',
      'Creating engaging content that converts',
      'Analyzing data and optimizing performance',
      'The potential for passive income'
    ],
    weight: 1.5
  },
  {
    id: 'wiscar_skill_1',
    type: 'slider',
    category: 'wiscar',
    subcategory: 'skill',
    question: 'Rate your current ability to create compelling marketing content',
    min: 1,
    max: 10,
    weight: 1.5
  },
  {
    id: 'wiscar_cognitive_1',
    type: 'scenario',
    category: 'wiscar',
    subcategory: 'cognitive',
    scenario: 'You notice your affiliate links are getting clicks but no conversions.',
    question: 'What\'s your first step to diagnose the problem?',
    options: [
      'Increase traffic to the links',
      'Change to a different affiliate program',
      'Analyze the landing page and customer journey',
      'Lower your commission expectations'
    ],
    weight: 2
  },
  {
    id: 'wiscar_learn_1',
    type: 'slider',
    category: 'wiscar',
    subcategory: 'abilityToLearn',
    question: 'How quickly do you typically adapt to new digital tools and platforms?',
    min: 1,
    max: 10,
    weight: 1.5
  },
  {
    id: 'wiscar_fit_1',
    type: 'scenario',
    category: 'wiscar',
    subcategory: 'realWorldFit',
    scenario: 'You have the opportunity to set up your first affiliate marketing campaign.',
    question: 'Which approach would you take?',
    options: [
      'Choose a high-commission product regardless of your interest',
      'Pick a product you genuinely use and believe in',
      'Select the easiest product to promote',
      'Go with whatever is trending right now'
    ],
    weight: 2
  }
];