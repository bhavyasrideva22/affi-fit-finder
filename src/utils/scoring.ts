import { Answer, AssessmentResults, WiscarScores } from '@/types/assessment';
import { assessmentQuestions } from '@/data/questions';

export function calculateAssessmentResults(answers: Answer[]): AssessmentResults {
  const psychometricAnswers = answers.filter(a => 
    assessmentQuestions.find(q => q.id === a.questionId)?.category === 'psychometric'
  );
  
  const technicalAnswers = answers.filter(a => 
    assessmentQuestions.find(q => q.id === a.questionId)?.category === 'technical'
  );
  
  const wiscarAnswers = answers.filter(a => 
    assessmentQuestions.find(q => q.id === a.questionId)?.category === 'wiscar'
  );

  const psychFitScore = calculatePsychometricScore(psychometricAnswers);
  const techReadyScore = calculateTechnicalScore(technicalAnswers);
  const wiscarScores = calculateWiscarScores(wiscarAnswers);
  
  const overallConfidence = Math.round(
    (psychFitScore + techReadyScore + getAverageWiscarScore(wiscarScores)) / 3
  );

  const recommendation = getRecommendation(overallConfidence);
  const careerMatches = getCareerMatches(overallConfidence, wiscarScores);
  const skillGaps = getSkillGaps(techReadyScore, wiscarScores);
  const learningPath = getLearningPath(overallConfidence);
  const nextSteps = getNextSteps(recommendation, skillGaps);

  return {
    psychFitScore,
    techReadyScore,
    wiscarScores,
    overallConfidence,
    recommendation,
    careerMatches,
    skillGaps,
    learningPath,
    nextSteps
  };
}

function calculatePsychometricScore(answers: Answer[]): number {
  let totalScore = 0;
  let totalWeight = 0;

  answers.forEach(answer => {
    const question = assessmentQuestions.find(q => q.id === answer.questionId);
    if (!question) return;

    let score = 0;
    if (question.type === 'slider') {
      score = ((Number(answer.value) - 1) / 9) * 100; // Convert 1-10 to 0-100
    } else if (question.type === 'multiple-choice') {
      // Score based on answer selection (higher index = higher score for most psych questions)
      const answerIndex = Number(answer.value);
      if (question.subcategory === 'personality') {
        const scores = [90, 70, 40, 85]; // Planned approach scores highest
        score = scores[answerIndex] || 50;
      } else if (question.subcategory === 'work_style') {
        const scores = [85, 75, 55, 80]; // Independent work scores highest
        score = scores[answerIndex] || 50;
      }
    }

    totalScore += score * (question.weight || 1);
    totalWeight += question.weight || 1;
  });

  return Math.round(totalScore / totalWeight);
}

function calculateTechnicalScore(answers: Answer[]): number {
  let totalScore = 0;
  let totalWeight = 0;

  answers.forEach(answer => {
    const question = assessmentQuestions.find(q => q.id === answer.questionId);
    if (!question) return;

    let score = 0;
    if (question.type === 'slider') {
      score = ((Number(answer.value) - 1) / 9) * 100;
    } else if (question.type === 'multiple-choice' && question.correctAnswer !== undefined) {
      score = Number(answer.value) === question.correctAnswer ? 100 : 0;
    } else if (question.type === 'scenario' && question.correctAnswer !== undefined) {
      score = Number(answer.value) === question.correctAnswer ? 100 : 0;
    }

    totalScore += score * (question.weight || 1);
    totalWeight += question.weight || 1;
  });

  return Math.round(totalScore / totalWeight);
}

function calculateWiscarScores(answers: Answer[]): WiscarScores {
  const wiscarCategories = {
    will: [] as Answer[],
    interest: [] as Answer[],
    skill: [] as Answer[],
    cognitive: [] as Answer[],
    abilityToLearn: [] as Answer[],
    realWorldFit: [] as Answer[]
  };

  answers.forEach(answer => {
    const question = assessmentQuestions.find(q => q.id === answer.questionId);
    if (!question?.subcategory) return;

    if (question.subcategory in wiscarCategories) {
      wiscarCategories[question.subcategory as keyof typeof wiscarCategories].push(answer);
    }
  });

  return {
    will: calculateSubcategoryScore(wiscarCategories.will, 'will'),
    interest: calculateSubcategoryScore(wiscarCategories.interest, 'interest'),
    skill: calculateSubcategoryScore(wiscarCategories.skill, 'skill'),
    cognitive: calculateSubcategoryScore(wiscarCategories.cognitive, 'cognitive'),
    abilityToLearn: calculateSubcategoryScore(wiscarCategories.abilityToLearn, 'abilityToLearn'),
    realWorldFit: calculateSubcategoryScore(wiscarCategories.realWorldFit, 'realWorldFit')
  };
}

function calculateSubcategoryScore(answers: Answer[], subcategory: string): number {
  if (answers.length === 0) return 50; // Default score

  let totalScore = 0;
  let totalWeight = 0;

  answers.forEach(answer => {
    const question = assessmentQuestions.find(q => q.id === answer.questionId);
    if (!question) return;

    let score = 0;
    if (question.type === 'slider') {
      score = ((Number(answer.value) - 1) / 9) * 100;
    } else if (question.type === 'scenario' || question.type === 'multiple-choice') {
      // Context-specific scoring for WISCAR scenarios
      const answerIndex = Number(answer.value);
      if (subcategory === 'will') {
        const scores = [20, 90, 40, 85]; // "Analyze and try different approach" scores highest
        score = scores[answerIndex] || 50;
      } else if (subcategory === 'cognitive') {
        const scores = [30, 40, 95, 20]; // "Analyze landing page" scores highest
        score = scores[answerIndex] || 50;
      } else if (subcategory === 'realWorldFit') {
        const scores = [40, 95, 30, 60]; // "Pick product you believe in" scores highest
        score = scores[answerIndex] || 50;
      } else {
        score = ((answerIndex + 1) / 4) * 100; // Default scoring
      }
    }

    totalScore += score * (question.weight || 1);
    totalWeight += question.weight || 1;
  });

  return Math.round(totalScore / totalWeight);
}

function getAverageWiscarScore(wiscarScores: WiscarScores): number {
  const scores = Object.values(wiscarScores);
  return Math.round(scores.reduce((sum, score) => sum + score, 0) / scores.length);
}

function getRecommendation(overallConfidence: number): 'Yes' | 'Maybe' | 'No' {
  if (overallConfidence >= 85) return 'Yes';
  if (overallConfidence >= 65) return 'Maybe';
  return 'No';
}

function getCareerMatches(overallConfidence: number, wiscarScores: WiscarScores): string[] {
  const allCareers = [
    'Affiliate Marketing Specialist',
    'Affiliate Program Manager',
    'Affiliate Strategist',
    'SEO Affiliate Specialist',
    'Content Writer (Affiliate-focused)',
    'High-ticket Affiliate Marketer'
  ];

  if (overallConfidence >= 85) {
    return allCareers.slice(0, 4);
  } else if (overallConfidence >= 65) {
    return allCareers.slice(0, 3);
  } else {
    if (wiscarScores.skill >= 70) {
      return ['Content Writer (Affiliate-focused)', 'SEO Affiliate Specialist'];
    }
    return ['Content Marketing', 'Digital Analytics', 'Customer Engagement'];
  }
}

function getSkillGaps(techReadyScore: number, wiscarScores: WiscarScores): string[] {
  const gaps: string[] = [];
  
  if (techReadyScore < 70) gaps.push('Technical foundations');
  if (wiscarScores.skill < 70) gaps.push('Content creation');
  if (wiscarScores.cognitive < 70) gaps.push('Analytics and optimization');
  if (wiscarScores.realWorldFit < 70) gaps.push('Campaign strategy');
  
  return gaps;
}

function getLearningPath(overallConfidence: number): string[] {
  if (overallConfidence >= 85) {
    return ['Advanced Strategies', 'Scaling and Automation'];
  } else if (overallConfidence >= 65) {
    return ['Intermediate Skills', 'Campaign Optimization'];
  } else {
    return ['Beginner Foundations', 'Basic Campaign Setup'];
  }
}

function getNextSteps(recommendation: string, skillGaps: string[]): string[] {
  const steps: string[] = [];
  
  if (recommendation === 'Yes') {
    steps.push('Start your first affiliate campaign');
    steps.push('Join affiliate networks like Amazon Associates');
    steps.push('Create content in your chosen niche');
  } else if (recommendation === 'Maybe') {
    steps.push('Complete foundational training courses');
    skillGaps.forEach(gap => {
      if (gap === 'Technical foundations') steps.push('Learn SEO and analytics basics');
      if (gap === 'Content creation') steps.push('Practice content writing and video creation');
    });
  } else {
    steps.push('Explore alternative careers in digital marketing');
    steps.push('Consider content marketing or social media roles');
    steps.push('Build foundational digital skills first');
  }
  
  return steps;
}