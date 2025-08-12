import { useState, useCallback } from "react";
import { AssessmentIntro } from "./AssessmentIntro";
import { QuestionCard } from "./QuestionCard";
import { ResultsPage } from "./ResultsPage";
import { assessmentQuestions } from "@/data/questions";
import { AssessmentState, Answer } from "@/types/assessment";
import { calculateAssessmentResults } from "@/utils/scoring";

export function Assessment() {
  const [assessmentState, setAssessmentState] = useState<AssessmentState>({
    currentQuestionIndex: -1, // -1 means showing intro
    answers: [],
    isComplete: false,
    results: undefined
  });

  const startAssessment = useCallback(() => {
    setAssessmentState(prev => ({
      ...prev,
      currentQuestionIndex: 0
    }));
  }, []);

  const handleAnswer = useCallback((value: number | string) => {
    const currentQuestion = assessmentQuestions[assessmentState.currentQuestionIndex];
    
    setAssessmentState(prev => {
      const newAnswers = [...prev.answers];
      const existingAnswerIndex = newAnswers.findIndex(a => a.questionId === currentQuestion.id);
      
      const newAnswer: Answer = {
        questionId: currentQuestion.id,
        value
      };

      if (existingAnswerIndex >= 0) {
        newAnswers[existingAnswerIndex] = newAnswer;
      } else {
        newAnswers.push(newAnswer);
      }

      return {
        ...prev,
        answers: newAnswers
      };
    });
  }, [assessmentState.currentQuestionIndex]);

  const handleNext = useCallback(() => {
    if (assessmentState.currentQuestionIndex === assessmentQuestions.length - 1) {
      // Complete assessment
      const results = calculateAssessmentResults(assessmentState.answers);
      setAssessmentState(prev => ({
        ...prev,
        isComplete: true,
        results
      }));
    } else {
      // Next question
      setAssessmentState(prev => ({
        ...prev,
        currentQuestionIndex: prev.currentQuestionIndex + 1
      }));
    }
  }, [assessmentState.currentQuestionIndex, assessmentState.answers]);

  const handlePrevious = useCallback(() => {
    setAssessmentState(prev => ({
      ...prev,
      currentQuestionIndex: Math.max(0, prev.currentQuestionIndex - 1)
    }));
  }, []);

  const handleRestart = useCallback(() => {
    setAssessmentState({
      currentQuestionIndex: -1,
      answers: [],
      isComplete: false,
      results: undefined
    });
  }, []);

  // Show intro
  if (assessmentState.currentQuestionIndex === -1) {
    return <AssessmentIntro onStartAssessment={startAssessment} />;
  }

  // Show results
  if (assessmentState.isComplete && assessmentState.results) {
    return <ResultsPage results={assessmentState.results} onRestart={handleRestart} />;
  }

  // Show current question
  const currentQuestion = assessmentQuestions[assessmentState.currentQuestionIndex];
  const currentAnswer = assessmentState.answers.find(a => a.questionId === currentQuestion.id);

  return (
    <QuestionCard
      question={currentQuestion}
      questionNumber={assessmentState.currentQuestionIndex + 1}
      totalQuestions={assessmentQuestions.length}
      onAnswer={handleAnswer}
      onNext={handleNext}
      onPrevious={handlePrevious}
      canGoBack={assessmentState.currentQuestionIndex > 0}
      initialValue={currentAnswer?.value}
    />
  );
}