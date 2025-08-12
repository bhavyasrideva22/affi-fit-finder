import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Progress } from "@/components/ui/progress";
import { Question } from "@/types/assessment";
import { useState } from "react";

interface QuestionCardProps {
  question: Question;
  questionNumber: number;
  totalQuestions: number;
  onAnswer: (value: number | string) => void;
  onNext: () => void;
  onPrevious: () => void;
  canGoBack: boolean;
  initialValue?: number | string;
}

export function QuestionCard({
  question,
  questionNumber,
  totalQuestions,
  onAnswer,
  onNext,
  onPrevious,
  canGoBack,
  initialValue
}: QuestionCardProps) {
  const [selectedValue, setSelectedValue] = useState<number | string>(
    initialValue ?? (question.type === 'slider' ? 5 : '')
  );

  const handleAnswerChange = (value: number | string) => {
    setSelectedValue(value);
    onAnswer(value);
  };

  const progress = (questionNumber / totalQuestions) * 100;

  return (
    <div className="min-h-screen bg-gradient-subtle flex items-center justify-center px-4">
      <div className="w-full max-w-2xl">
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-muted-foreground">
              Question {questionNumber} of {totalQuestions}
            </span>
            <span className="text-sm font-medium text-primary">
              {Math.round(progress)}% Complete
            </span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>

        <Card className="p-8 shadow-medium">
          {/* Category Badge */}
          <div className="mb-6">
            <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${
              question.category === 'psychometric' 
                ? 'bg-primary/10 text-primary'
                : question.category === 'technical'
                ? 'bg-accent/10 text-accent'
                : 'bg-success/10 text-success'
            }`}>
              {question.category === 'psychometric' ? 'Psychological Fit' :
               question.category === 'technical' ? 'Technical Readiness' : 'WISCAR Framework'}
            </span>
          </div>

          {/* Scenario (if applicable) */}
          {question.scenario && (
            <div className="mb-6 p-4 bg-muted rounded-lg">
              <h4 className="font-medium mb-2 text-muted-foreground">Scenario:</h4>
              <p className="text-sm">{question.scenario}</p>
            </div>
          )}

          {/* Question */}
          <h2 className="text-2xl font-semibold mb-8 leading-relaxed">
            {question.question}
          </h2>

          {/* Answer Input */}
          <div className="mb-8">
            {question.type === 'slider' && (
              <div className="space-y-6">
                <div className="px-4">
                  <Slider
                    value={[Number(selectedValue)]}
                    onValueChange={(value) => handleAnswerChange(value[0])}
                    min={question.min || 1}
                    max={question.max || 10}
                    step={1}
                    className="w-full"
                  />
                </div>
                <div className="flex justify-between text-sm text-muted-foreground px-2">
                  <span>{question.min || 1}</span>
                  <span className="font-medium text-lg text-foreground">
                    {selectedValue}
                  </span>
                  <span>{question.max || 10}</span>
                </div>
              </div>
            )}

            {(question.type === 'multiple-choice' || question.type === 'scenario') && question.options && (
              <div className="space-y-3">
                {question.options.map((option, index) => (
                  <button
                    key={index}
                    onClick={() => handleAnswerChange(index)}
                    className={`w-full p-4 text-left rounded-lg border-2 transition-all duration-200 ${
                      selectedValue === index
                        ? 'border-primary bg-primary/5 shadow-soft'
                        : 'border-border hover:border-primary/50 hover:bg-primary/5'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                        selectedValue === index ? 'border-primary' : 'border-muted-foreground'
                      }`}>
                        {selectedValue === index && (
                          <div className="w-2 h-2 rounded-full bg-primary" />
                        )}
                      </div>
                      <span className="text-sm leading-relaxed">{option}</span>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Navigation */}
          <div className="flex justify-between">
            <Button
              variant="outline"
              onClick={onPrevious}
              disabled={!canGoBack}
              className="px-6"
            >
              Previous
            </Button>
            
            <Button
              onClick={onNext}
              disabled={selectedValue === '' || selectedValue === undefined}
              className="bg-gradient-primary text-primary-foreground hover:shadow-medium px-6"
            >
              {questionNumber === totalQuestions ? 'Complete Assessment' : 'Next'}
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
}