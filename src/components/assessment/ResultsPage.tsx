import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { AssessmentResults } from "@/types/assessment";
import { 
  CheckCircle, 
  AlertCircle, 
  XCircle, 
  TrendingUp,
  BookOpen,
  Target,
  Users,
  Lightbulb,
  ArrowRight,
  RotateCcw
} from "lucide-react";

interface ResultsPageProps {
  results: AssessmentResults;
  onRestart: () => void;
}

export function ResultsPage({ results, onRestart }: ResultsPageProps) {
  const getRecommendationIcon = (recommendation: string) => {
    switch (recommendation) {
      case 'Yes':
        return <CheckCircle className="w-8 h-8 text-success" />;
      case 'Maybe':
        return <AlertCircle className="w-8 h-8 text-warning" />;
      case 'No':
        return <XCircle className="w-8 h-8 text-destructive" />;
      default:
        return null;
    }
  };

  const getRecommendationColor = (recommendation: string) => {
    switch (recommendation) {
      case 'Yes':
        return 'bg-gradient-success';
      case 'Maybe':
        return 'bg-gradient-to-r from-warning to-warning/80';
      case 'No':
        return 'bg-gradient-to-r from-destructive to-destructive/80';
      default:
        return 'bg-gradient-primary';
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 85) return 'text-success';
    if (score >= 65) return 'text-warning';
    return 'text-destructive';
  };

  return (
    <div className="min-h-screen bg-gradient-subtle">
      <div className="container mx-auto px-4 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Your Assessment Results</h1>
          <p className="text-xl text-muted-foreground">
            Based on your responses, here's your personalized career guidance
          </p>
        </div>

        {/* Overall Recommendation */}
        <Card className={`p-8 mb-8 ${getRecommendationColor(results.recommendation)} text-white`}>
          <div className="flex items-center gap-4 mb-6">
            {getRecommendationIcon(results.recommendation)}
            <div>
              <h2 className="text-3xl font-bold">
                {results.recommendation === 'Yes' && 'Excellent Match!'}
                {results.recommendation === 'Maybe' && 'Promising Potential'}
                {results.recommendation === 'No' && 'Consider Alternatives'}
              </h2>
              <p className="text-lg opacity-90">
                Overall Confidence Score: {results.overallConfidence}/100
              </p>
            </div>
          </div>
          
          <div className="bg-white/20 rounded-lg p-4">
            <Progress value={results.overallConfidence} className="h-3 bg-white/30" />
          </div>
        </Card>

        {/* Score Breakdown */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <Card className="p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                <Users className="w-5 h-5 text-primary" />
              </div>
              <h3 className="font-semibold">Psychological Fit</h3>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-2xl font-bold">{results.psychFitScore}/100</span>
                <span className={`text-sm font-medium ${getScoreColor(results.psychFitScore)}`}>
                  {results.psychFitScore >= 85 ? 'Excellent' : 
                   results.psychFitScore >= 65 ? 'Good' : 'Needs Development'}
                </span>
              </div>
              <Progress value={results.psychFitScore} className="h-2" />
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center">
                <Target className="w-5 h-5 text-accent" />
              </div>
              <h3 className="font-semibold">Technical Readiness</h3>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-2xl font-bold">{results.techReadyScore}/100</span>
                <span className={`text-sm font-medium ${getScoreColor(results.techReadyScore)}`}>
                  {results.techReadyScore >= 80 ? 'Job Ready' : 
                   results.techReadyScore >= 60 ? 'Learning Phase' : 'Foundation Needed'}
                </span>
              </div>
              <Progress value={results.techReadyScore} className="h-2" />
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-success/10 rounded-lg flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-success" />
              </div>
              <h3 className="font-semibold">WISCAR Average</h3>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-2xl font-bold">
                  {Math.round(Object.values(results.wiscarScores).reduce((a, b) => a + b, 0) / 6)}/100
                </span>
                <span className={`text-sm font-medium ${getScoreColor(Math.round(Object.values(results.wiscarScores).reduce((a, b) => a + b, 0) / 6))}`}>
                  Framework Score
                </span>
              </div>
              <Progress value={Math.round(Object.values(results.wiscarScores).reduce((a, b) => a + b, 0) / 6)} className="h-2" />
            </div>
          </Card>
        </div>

        {/* WISCAR Breakdown */}
        <Card className="p-8 mb-8">
          <h3 className="text-2xl font-bold mb-6">WISCAR Framework Analysis</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Object.entries(results.wiscarScores).map(([key, score]) => (
              <div key={key} className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="font-medium capitalize">
                    {key === 'abilityToLearn' ? 'Ability to Learn' : 
                     key === 'realWorldFit' ? 'Real World Fit' : key}
                  </span>
                  <span className={`font-bold ${getScoreColor(score)}`}>{score}</span>
                </div>
                <Progress value={score} className="h-2" />
              </div>
            ))}
          </div>
        </Card>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Career Matches */}
          <Card className="p-6">
            <div className="flex items-center gap-3 mb-4">
              <Lightbulb className="w-5 h-5 text-primary" />
              <h3 className="text-xl font-bold">Career Matches</h3>
            </div>
            <div className="space-y-2">
              {results.careerMatches.map((career, index) => (
                <div key={index} className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-success" />
                  <span className="text-sm">{career}</span>
                </div>
              ))}
            </div>
          </Card>

          {/* Skill Gaps */}
          <Card className="p-6">
            <div className="flex items-center gap-3 mb-4">
              <Target className="w-5 h-5 text-accent" />
              <h3 className="text-xl font-bold">Areas for Development</h3>
            </div>
            <div className="space-y-2">
              {results.skillGaps.length > 0 ? (
                results.skillGaps.map((gap, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 text-warning" />
                    <span className="text-sm">{gap}</span>
                  </div>
                ))
              ) : (
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-success" />
                  <span className="text-sm">No major skill gaps identified!</span>
                </div>
              )}
            </div>
          </Card>
        </div>

        {/* Learning Path & Next Steps */}
        <div className="grid md:grid-cols-2 gap-8 mt-8">
          <Card className="p-6">
            <div className="flex items-center gap-3 mb-4">
              <BookOpen className="w-5 h-5 text-primary" />
              <h3 className="text-xl font-bold">Recommended Learning Path</h3>
            </div>
            <div className="space-y-3">
              {results.learningPath.map((path, index) => (
                <Badge key={index} variant="secondary" className="mr-2">
                  {path}
                </Badge>
              ))}
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center gap-3 mb-4">
              <ArrowRight className="w-5 h-5 text-accent" />
              <h3 className="text-xl font-bold">Next Steps</h3>
            </div>
            <div className="space-y-2">
              {results.nextSteps.map((step, index) => (
                <div key={index} className="flex items-start gap-2">
                  <span className="text-primary font-bold text-sm mt-1">{index + 1}.</span>
                  <span className="text-sm">{step}</span>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Action Buttons */}
        <div className="text-center mt-12">
          <Button
            onClick={onRestart}
            variant="outline"
            size="lg"
            className="px-8"
          >
            <RotateCcw className="w-4 h-4 mr-2" />
            Retake Assessment
          </Button>
        </div>
      </div>
    </div>
  );
}