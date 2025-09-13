import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, Tooltip } from 'recharts';
import { TrendingUp, Calendar } from 'lucide-react';

interface MoodEntry {
  date: string;
  mood: number;
  label: string;
}

interface MoodTrendsProps {
  moodHistory: MoodEntry[];
}

const MoodTrends: React.FC<MoodTrendsProps> = ({ moodHistory }) => {
  // Generate sample data if no history exists
  const sampleData: MoodEntry[] = [
    { date: '2024-01-01', mood: 4, label: 'Good' },
    { date: '2024-01-02', mood: 3, label: 'Okay' },
    { date: '2024-01-03', mood: 5, label: 'Excellent' },
    { date: '2024-01-04', mood: 4, label: 'Good' },
    { date: '2024-01-05', mood: 2, label: 'Not Great' },
    { date: '2024-01-06', mood: 3, label: 'Okay' },
    { date: '2024-01-07', mood: 4, label: 'Good' },
  ];

  const data = moodHistory.length > 0 ? moodHistory : sampleData;
  const averageMood = data.reduce((sum, entry) => sum + entry.mood, 0) / data.length;
  const trend = data.length > 1 ? data[data.length - 1].mood - data[0].mood : 0;

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-card border border-border rounded-lg p-3 shadow-card-custom">
          <p className="text-sm font-medium">{formatDate(label)}</p>
          <p className="text-sm text-primary">
            Mood: {data.label} ({data.mood}/5)
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <Card className="shadow-card-custom bg-gradient-card border-0 animate-slide-up">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2 text-xl font-semibold text-foreground">
          <TrendingUp className="w-5 h-5" />
          <span>Mood Trends</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {/* Stats */}
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center p-4 bg-primary/5 rounded-lg">
              <div className="text-2xl font-bold text-primary">
                {averageMood.toFixed(1)}
              </div>
              <div className="text-sm text-muted-foreground">Average Mood</div>
            </div>
            <div className="text-center p-4 bg-secondary/5 rounded-lg">
              <div className="flex items-center justify-center space-x-1">
                <span className={`text-2xl font-bold ${trend >= 0 ? 'text-wellness-positive' : 'text-wellness-warm'}`}>
                  {trend > 0 ? '+' : ''}{trend.toFixed(1)}
                </span>
                <TrendingUp className={`w-4 h-4 ${trend >= 0 ? 'text-wellness-positive' : 'text-wellness-warm rotate-180'}`} />
              </div>
              <div className="text-sm text-muted-foreground">Trend</div>
            </div>
          </div>

          {/* Chart */}
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={data} margin={{ top: 5, right: 5, left: 5, bottom: 5 }}>
                <XAxis 
                  dataKey="date" 
                  axisLine={false}
                  tickLine={false}
                  tickFormatter={formatDate}
                  tick={{ fontSize: 12, fill: 'hsl(var(--muted-foreground))' }}
                />
                <YAxis 
                  domain={[1, 5]}
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 12, fill: 'hsl(var(--muted-foreground))' }}
                />
                <Tooltip content={<CustomTooltip />} />
                <Line 
                  type="monotone" 
                  dataKey="mood" 
                  stroke="hsl(var(--primary))"
                  strokeWidth={3}
                  dot={{ fill: 'hsl(var(--primary))', strokeWidth: 2, r: 5 }}
                  activeDot={{ r: 7, stroke: 'hsl(var(--primary))', strokeWidth: 2 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          <div className="flex items-center space-x-2 text-sm text-muted-foreground">
            <Calendar className="w-4 h-4" />
            <span>Tracking {data.length} day{data.length !== 1 ? 's' : ''}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default MoodTrends;