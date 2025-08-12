export interface Question {
  id: string;
  type: 'multiple-choice' | 'slider' | 'scenario';
  category: 'psychometric' | 'technical' | 'wiscar';
  subcategory?: string;
  question: string;
  options?: string[];
  min?: number;
  max?: number;
  scenario?: string;
  correctAnswer?: number;
  weight?: number;
}

export interface Answer {
  questionId: string;
  value: number | string;
  score?: number;
}

export interface WiscarScores {
  will: number;
  interest: number;
  skill: number;
  cognitive: number;
  abilityToLearn: number;
  realWorldFit: number;
}

export interface AssessmentResults {
  psychFitScore: number;
  techReadyScore: number;
  wiscarScores: WiscarScores;
  overallConfidence: number;
  recommendation: 'Yes' | 'Maybe' | 'No';
  careerMatches: string[];
  skillGaps: string[];
  learningPath: string[];
  nextSteps: string[];
}

export interface AssessmentState {
  currentQuestionIndex: number;
  answers: Answer[];
  isComplete: boolean;
  results?: AssessmentResults;
}