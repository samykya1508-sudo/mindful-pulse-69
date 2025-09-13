import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';

interface MoodData {
  mood: string;
  level: number;
  note: string;
  timestamp: Date;
}

const moodOptions = [
  { emoji: '😊', label: 'Excellent', value: 5, color: 'text-wellness-positive' },
  { emoji: '🙂', label: 'Good', value: 4, color: 'text-wellness-calm' },
  { emoji: '😐', label: 'Okay', value: 3, color: 'text-wellness-neutral' },
  { emoji: '🙁', label: 'Not Great', value: 2, color: 'text-wellness-warm' },
  { emoji: '😢', label: 'Difficult', value: 1, color: 'text-wellness-sad' },
];

interface MoodCheckInProps {
  onMoodSubmit: (mood: MoodData) => void;
}

const MoodCheckIn: React.FC<MoodCheckInProps> = ({ onMoodSubmit }) => {
  const [selectedMood, setSelectedMood] = useState<number | null>(null);
  const [note, setNote] = useState('');
  const { toast } = useToast();

  const handleSubmit = () => {
    if (selectedMood === null) {
      toast({
        title: "Please select a mood",
        description: "Choose how you're feeling today",
        variant: "destructive",
      });
      return;
    }

    const moodData: MoodData = {
      mood: moodOptions.find(m => m.value === selectedMood)?.label || '',
      level: selectedMood,
      note,
      timestamp: new Date(),
    };

    onMoodSubmit(moodData);
    
    toast({
      title: "Mood recorded!",
      description: "Thank you for checking in today",
    });

    // Reset form
    setSelectedMood(null);
    setNote('');
  };

  return (
    <Card className="shadow-card-custom bg-gradient-card border-0 animate-slide-up">
      <CardHeader>
        <CardTitle className="text-center text-xl font-semibold text-foreground">
          How are you feeling today?
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-5 gap-3">
          {moodOptions.map((mood) => (
            <Button
              key={mood.value}
              variant="ghost"
              className={`h-16 flex flex-col items-center justify-center space-y-1 rounded-xl transition-all duration-300 hover:scale-105 hover:shadow-wellness ${
                selectedMood === mood.value
                  ? 'bg-primary/10 ring-2 ring-primary animate-mood-bounce'
                  : 'hover:bg-primary/5'
              }`}
              onClick={() => setSelectedMood(mood.value)}
            >
              <span className="text-2xl">{mood.emoji}</span>
              <span className="text-xs font-medium">{mood.label}</span>
            </Button>
          ))}
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-foreground">
            What's on your mind? (Optional)
          </label>
          <Textarea
            placeholder="Share your thoughts, feelings, or what happened today..."
            value={note}
            onChange={(e) => setNote(e.target.value)}
            className="min-h-[80px] resize-none border-border/50 focus:border-primary transition-colors"
          />
        </div>

        <Button
          onClick={handleSubmit}
          className="w-full bg-gradient-wellness hover:shadow-hover-wellness transition-all duration-300 text-white font-medium"
          disabled={selectedMood === null}
        >
          Record My Mood
        </Button>
      </CardContent>
    </Card>
  );
};

export default MoodCheckIn;