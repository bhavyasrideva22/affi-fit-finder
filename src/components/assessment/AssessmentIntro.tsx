import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  TrendingUp, 
  DollarSign, 
  Users, 
  BarChart3, 
  Target,
  CheckCircle
} from "lucide-react";

interface AssessmentIntroProps {
  onStartAssessment: () => void;
}

export function AssessmentIntro({ onStartAssessment }: AssessmentIntroProps) {
  return (
    <div className="min-h-screen bg-gradient-subtle">
      <div className="container mx-auto px-4 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-6">
            <TrendingUp className="w-4 h-4" />
            Expert-Designed Assessment
          </div>
          
          <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-hero bg-clip-text text-transparent">
            Is Affiliate Marketing Specialist Right for You?
          </h1>
          
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
            A comprehensive, AI-powered assessment evaluating your suitability, readiness, 
            and career alignment for the Affiliate Marketing Specialist role.
          </p>
          
          <Button 
            size="lg" 
            className="bg-gradient-primary text-primary-foreground hover:shadow-medium transition-all duration-300 text-lg px-8 py-6 rounded-xl"
            onClick={onStartAssessment}
          >
            Start Assessment
            <Target className="w-5 h-5 ml-2" />
          </Button>
          
          <p className="text-sm text-muted-foreground mt-4">
            ⏱️ Takes 20-30 minutes • 💯 Scientifically validated • 🎯 Personalized results
          </p>
        </div>

        {/* What is Affiliate Marketing */}
        <Card className="p-8 mb-12 shadow-soft">
          <div className="flex items-start gap-4 mb-6">
            <div className="w-12 h-12 bg-gradient-primary rounded-xl flex items-center justify-center">
              <DollarSign className="w-6 h-6 text-primary-foreground" />
            </div>
            <div>
              <h2 className="text-2xl font-bold mb-2">What Is Affiliate Marketing?</h2>
              <p className="text-muted-foreground">
                A performance-based digital marketing model where affiliates promote products or services 
                and earn commissions for sales, leads, or clicks via unique tracking links.
              </p>
            </div>
          </div>
        </Card>

        {/* Career Paths */}
        <div className="mb-12">
          <h3 className="text-3xl font-bold text-center mb-8">Associated Career Paths</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { title: "Affiliate Marketing Specialist", salary: "$45K - $75K" },
              { title: "Affiliate Program Manager", salary: "$55K - $85K" },
              { title: "Affiliate Strategist", salary: "$60K - $90K" },
              { title: "SEO Affiliate Specialist", salary: "$50K - $80K" },
              { title: "Content Writer (Affiliate)", salary: "$40K - $65K" },
              { title: "High-ticket Affiliate Marketer", salary: "$70K - $120K+" }
            ].map((career, index) => (
              <Card key={index} className="p-6 hover:shadow-medium transition-all duration-300">
                <h4 className="font-semibold mb-2">{career.title}</h4>
                <Badge variant="secondary" className="text-sm">
                  {career.salary}
                </Badge>
              </Card>
            ))}
          </div>
        </div>

        {/* Key Traits */}
        <div className="mb-12">
          <h3 className="text-3xl font-bold text-center mb-8">Key Traits for Success</h3>
          <div className="grid md:grid-cols-2 gap-6">
            {[
              {
                icon: BarChart3,
                title: "Analytical Skills",
                description: "Strong data interpretation and performance optimization abilities"
              },
              {
                icon: Users,
                title: "Communication",
                description: "Excellent negotiation and relationship-building capabilities"
              },
              {
                icon: Target,
                title: "Content Creation",
                description: "Skill in SEO, copywriting, and digital marketing tools"
              },
              {
                icon: TrendingUp,
                title: "Technical Aptitude",
                description: "Comfortable with tracking, analytics, and marketing platforms"
              }
            ].map((trait, index) => (
              <Card key={index} className="p-6 flex items-start gap-4 hover:shadow-medium transition-all duration-300">
                <div className="w-10 h-10 bg-gradient-success rounded-lg flex items-center justify-center">
                  <trait.icon className="w-5 h-5 text-success-foreground" />
                </div>
                <div>
                  <h4 className="font-semibold mb-2">{trait.title}</h4>
                  <p className="text-sm text-muted-foreground">{trait.description}</p>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Assessment Features */}
        <Card className="p-8 bg-gradient-primary text-primary-foreground">
          <h3 className="text-2xl font-bold mb-6 text-center">What This Assessment Measures</h3>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-white/20 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8" />
              </div>
              <h4 className="font-semibold mb-2">Psychological Fit</h4>
              <p className="text-sm opacity-90">
                Personality traits, motivation, and work style alignment
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-white/20 rounded-xl flex items-center justify-center mx-auto mb-4">
                <BarChart3 className="w-8 h-8" />
              </div>
              <h4 className="font-semibold mb-2">Technical Readiness</h4>
              <p className="text-sm opacity-90">
                Current knowledge and aptitude for affiliate marketing tools
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-white/20 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Target className="w-8 h-8" />
              </div>
              <h4 className="font-semibold mb-2">WISCAR Framework</h4>
              <p className="text-sm opacity-90">
                Will, Interest, Skill, Cognitive ability, Adaptability, Real-world fit
              </p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}