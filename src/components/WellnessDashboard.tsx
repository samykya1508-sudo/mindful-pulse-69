import React, { useState } from 'react';
import { Calendar, Heart, TrendingUp, User } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import MoodCheckIn from './MoodCheckIn';
import WellnessRecommendations from './WellnessRecommendations';
import MoodTrends from './MoodTrends';
import wellnessHero from '@/assets/wellness-hero.jpg';

interface MoodData {
  mood: string;
  level: number;
  note: string;
  timestamp: Date;
}

const WellnessDashboard = () => {
  const [moodHistory, setMoodHistory] = useState<any[]>([]);
  const [currentMoodLevel, setCurrentMoodLevel] = useState<number>(3);
  const [todayCheckedIn, setTodayCheckedIn] = useState(false);

  const handleMoodSubmit = (moodData: MoodData) => {
    const newEntry = {
      date: moodData.timestamp.toISOString().split('T')[0],
      mood: moodData.level,
      label: moodData.mood,
    };
    
    setMoodHistory(prev => [...prev, newEntry]);
    setCurrentMoodLevel(moodData.level);
    setTodayCheckedIn(true);
  };

  const stats = [
    {
      title: 'Current Streak',
      value: '7 days',
      icon: <Calendar className="w-5 h-5" />,
      color: 'text-wellness-positive',
    },
    {
      title: 'Wellness Score',
      value: '8.2/10',
      icon: <Heart className="w-5 h-5" />,
      color: 'text-wellness-calm',
    },
    {
      title: 'Progress',
      value: '+15%',
      icon: <TrendingUp className="w-5 h-5" />,
      color: 'text-wellness-warm',
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="relative h-64 overflow-hidden">
        <img 
          src={wellnessHero} 
          alt="Wellness Hero" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-wellness/80 flex items-center justify-center">
          <div className="text-center text-white space-y-2">
            <h1 className="text-3xl md:text-4xl font-bold">
              Student Wellness Monitor
            </h1>
            <p className="text-lg opacity-90">
              Track your mental health journey with daily check-ins
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 space-y-8">
        {/* Welcome Message */}
        <div className="text-center space-y-2">
          <h2 className="text-2xl font-semibold text-foreground">
            Welcome back! {todayCheckedIn ? "You've checked in today 🎉" : "Ready for your daily check-in?"}
          </h2>
          <p className="text-muted-foreground">
            {todayCheckedIn 
              ? "Great job staying consistent with your wellness journey!"
              : "Take a moment to reflect on how you're feeling today."
            }
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {stats.map((stat, index) => (
            <Card key={index} className="shadow-card-custom bg-gradient-card border-0 animate-slide-up" style={{ animationDelay: `${index * 100}ms` }}>
              <CardContent className="p-6 text-center">
                <div className={`inline-flex p-3 rounded-full bg-primary/10 ${stat.color} mb-3`}>
                  {stat.icon}
                </div>
                <div className="text-2xl font-bold text-foreground mb-1">
                  {stat.value}
                </div>
                <div className="text-sm text-muted-foreground">
                  {stat.title}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column */}
          <div className="space-y-8">
            {!todayCheckedIn && (
              <MoodCheckIn onMoodSubmit={handleMoodSubmit} />
            )}
            <WellnessRecommendations moodLevel={currentMoodLevel} />
          </div>

          {/* Right Column */}
          <div className="space-y-8">
            <MoodTrends moodHistory={moodHistory} />
            
            {/* Quick Access Card */}
            <Card className="shadow-card-custom bg-gradient-card border-0 animate-slide-up">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold text-foreground mb-4">
                  Quick Access
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  <button className="p-4 bg-primary/5 hover:bg-primary/10 rounded-lg transition-colors text-left">
                    <Heart className="w-5 h-5 text-primary mb-2" />
                    <div className="text-sm font-medium">Crisis Support</div>
                    <div className="text-xs text-muted-foreground">24/7 helpline</div>
                  </button>
                  <button className="p-4 bg-secondary/5 hover:bg-secondary/10 rounded-lg transition-colors text-left">
                    <User className="w-5 h-5 text-secondary mb-2" />
                    <div className="text-sm font-medium">Find Counselor</div>
                    <div className="text-xs text-muted-foreground">Professional help</div>
                  </button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Footer Message */}
        <div className="text-center py-8">
          <p className="text-muted-foreground">
            Remember: It's okay to not be okay. Your mental health matters. 💙
          </p>
        </div>
      </div>
    </div>
  );
};

export default WellnessDashboard;