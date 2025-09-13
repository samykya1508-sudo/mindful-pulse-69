import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Heart, Brain, Activity, Sun } from 'lucide-react';

interface Recommendation {
  id: string;
  title: string;
  description: string;
  type: 'mindfulness' | 'exercise' | 'social' | 'selfcare';
  duration: string;
  icon: React.ReactNode;
}

const recommendations: Record<number, Recommendation[]> = {
  5: [
    {
      id: '1',
      title: 'Gratitude Journaling',
      description: 'Write down three things you\'re grateful for today',
      type: 'mindfulness',
      duration: '5 mins',
      icon: <Heart className="w-4 h-4" />,
    },
    {
      id: '2',
      title: 'Share Your Joy',
      description: 'Connect with a friend and share something positive',
      type: 'social',
      duration: '10 mins',
      icon: <Sun className="w-4 h-4" />,
    },
  ],
  4: [
    {
      id: '3',
      title: 'Mindful Breathing',
      description: 'Take 10 deep breaths and focus on the present moment',
      type: 'mindfulness',
      duration: '5 mins',
      icon: <Brain className="w-4 h-4" />,
    },
    {
      id: '4',
      title: 'Light Exercise',
      description: 'Take a short walk or do some gentle stretching',
      type: 'exercise',
      duration: '15 mins',
      icon: <Activity className="w-4 h-4" />,
    },
  ],
  3: [
    {
      id: '5',
      title: 'Progressive Relaxation',
      description: 'Practice muscle relaxation techniques',
      type: 'mindfulness',
      duration: '10 mins',
      icon: <Brain className="w-4 h-4" />,
    },
    {
      id: '6',
      title: 'Self-Care Activity',
      description: 'Do something nurturing for yourself',
      type: 'selfcare',
      duration: '20 mins',
      icon: <Heart className="w-4 h-4" />,
    },
  ],
  2: [
    {
      id: '7',
      title: 'Guided Meditation',
      description: 'Follow a calming meditation session',
      type: 'mindfulness',
      duration: '15 mins',
      icon: <Brain className="w-4 h-4" />,
    },
    {
      id: '8',
      title: 'Reach Out',
      description: 'Connect with someone you trust',
      type: 'social',
      duration: '30 mins',
      icon: <Heart className="w-4 h-4" />,
    },
  ],
  1: [
    {
      id: '9',
      title: 'Professional Support',
      description: 'Consider speaking with a counselor or therapist',
      type: 'selfcare',
      duration: 'As needed',
      icon: <Heart className="w-4 h-4" />,
    },
    {
      id: '10',
      title: 'Crisis Resources',
      description: 'Access immediate support if needed',
      type: 'selfcare',
      duration: 'Immediate',
      icon: <Sun className="w-4 h-4" />,
    },
  ],
};

const typeColors = {
  mindfulness: 'bg-wellness-calm/10 text-wellness-calm border-wellness-calm/20',
  exercise: 'bg-wellness-positive/10 text-wellness-positive border-wellness-positive/20',
  social: 'bg-wellness-warm/10 text-wellness-warm border-wellness-warm/20',
  selfcare: 'bg-primary/10 text-primary border-primary/20',
};

interface WellnessRecommendationsProps {
  moodLevel: number;
}

const WellnessRecommendations: React.FC<WellnessRecommendationsProps> = ({ moodLevel }) => {
  const currentRecommendations = recommendations[moodLevel] || recommendations[3];

  return (
    <Card className="shadow-card-custom bg-gradient-card border-0 animate-slide-up">
      <CardHeader>
        <CardTitle className="text-xl font-semibold text-foreground">
          Personalized Recommendations
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {currentRecommendations.map((rec, index) => (
            <div
              key={rec.id}
              className="p-4 rounded-lg border border-border/50 hover:border-primary/30 transition-all duration-300 hover:shadow-card-custom cursor-pointer group"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0 p-2 rounded-full bg-primary/10 text-primary group-hover:bg-primary/20 transition-colors">
                  {rec.icon}
                </div>
                <div className="flex-1 space-y-2">
                  <div className="flex items-center justify-between">
                    <h3 className="font-medium text-foreground group-hover:text-primary transition-colors">
                      {rec.title}
                    </h3>
                    <span className="text-sm text-muted-foreground">
                      {rec.duration}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {rec.description}
                  </p>
                  <Badge variant="outline" className={typeColors[rec.type]}>
                    {rec.type}
                  </Badge>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default WellnessRecommendations;