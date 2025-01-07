import React, { useState } from 'react';
import { ChevronDown, ChevronUp, Users, Heart, BarChart2, Share2 } from 'lucide-react';
import StatisticsModal from '../modal/StatisticsModal';

interface MetricData {
  title: string;
  value: string;
  change: string;
  icon: React.ReactNode;
  isPositive: boolean;
  chartData: Array<{ name: string; value: number }>;
  details: {
    [key: string]: string;
  };
}

interface MetricCardProps {
  metric: MetricData;
  onClick: (metric: MetricData) => void;
}

const MetricCard = ({ metric, onClick }: MetricCardProps) => (
  <button 
    onClick={() => onClick(metric)}
    className="w-full bg-white p-4 rounded-lg border border-gray-100 hover:shadow-md transition-shadow cursor-pointer text-left"
  >
    <div className="flex items-start justify-between">
      <div className="flex items-center space-x-3">
        <div className="p-2 bg-vektrus-blue/10 rounded-lg">
          {metric.icon}
        </div>
        <div>
          <p className="text-sm text-gray-600">{metric.title}</p>
          <p className="text-xl font-semibold mt-1">{metric.value}</p>
        </div>
      </div>
      <div className={`text-sm ${metric.isPositive ? 'text-green-600' : 'text-red-600'}`}>
        {metric.change}
      </div>
    </div>
  </button>
);

export default function Statistics() {
  const [isExpanded, setIsExpanded] = useState(false);
  const [selectedMetric, setSelectedMetric] = useState<MetricData | null>(null);

  const metrics: MetricData[] = [
    {
      title: 'Reach',
      value: '24.5K',
      change: '+12.3%',
      icon: <Users className="w-5 h-5 text-vektrus-blue" />,
      isPositive: true,
      chartData: [
        { name: 'Mon', value: 4000 },
        { name: 'Tue', value: 3000 },
        { name: 'Wed', value: 2000 },
        { name: 'Thu', value: 2780 },
        { name: 'Fri', value: 1890 },
        { name: 'Sat', value: 2390 },
        { name: 'Sun', value: 3490 }
      ],
      details: {
        organic: '18.2K',
        paid: '6.3K',
        growth: '+15% vs last week'
      }
    },
    {
      title: 'Engagement',
      value: '2.1K',
      change: '+8.1%',
      icon: <Heart className="w-5 h-5 text-vektrus-blue" />,
      isPositive: true,
      chartData: [
        { name: 'Mon', value: 2400 },
        { name: 'Tue', value: 1398 },
        { name: 'Wed', value: 3800 },
        { name: 'Thu', value: 3908 },
        { name: 'Fri', value: 4800 },
        { name: 'Sat', value: 3800 },
        { name: 'Sun', value: 4300 }
      ],
      details: {
        likes: '1.5K',
        comments: '420',
        saves: '180'
      }
    },
    {
      title: 'Posts',
      value: '156',
      change: '+4.5%',
      icon: <BarChart2 className="w-5 h-5 text-vektrus-blue" />,
      isPositive: true,
      chartData: [
        { name: 'Mon', value: 20 },
        { name: 'Tue', value: 18 },
        { name: 'Wed', value: 25 },
        { name: 'Thu', value: 22 },
        { name: 'Fri', value: 28 },
        { name: 'Sat', value: 23 },
        { name: 'Sun', value: 20 }
      ],
      details: {
        scheduled: '45',
        published: '111',
        avgEngagement: '13.5%'
      }
    }
  ];

  const expandedMetrics = [
    ...metrics,
    {
      title: 'Shares',
      value: '845',
      change: '-2.3%',
      icon: <Share2 className="w-5 h-5 text-vektrus-blue" />,
      isPositive: false,
      chartData: [
        { name: 'Mon', value: 145 },
        { name: 'Tue', value: 132 },
        { name: 'Wed', value: 98 },
        { name: 'Thu', value: 110 },
        { name: 'Fri', value: 120 },
        { name: 'Sat', value: 115 },
        { name: 'Sun', value: 125 }
      ],
      details: {
        direct: '523',
        stories: '322',
        growth: '-5% vs last week'
      }
    }
  ];

  const handleMetricClick = (metric: MetricData) => {
    setSelectedMetric(metric);
  };

  return (
    <>
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-semibold text-gray-900">Statistics</h2>
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="p-1 hover:bg-gray-100 rounded-full transition-colors"
          >
            {isExpanded ? (
              <ChevronUp className="w-4 h-4 text-gray-600" />
            ) : (
              <ChevronDown className="w-4 h-4 text-gray-600" />
            )}
          </button>
        </div>

        <div className="space-y-3">
          {(isExpanded ? expandedMetrics : metrics.slice(0, 2)).map((metric, index) => (
            <MetricCard 
              key={index} 
              metric={metric}
              onClick={handleMetricClick}
            />
          ))}
        </div>
      </div>

      {selectedMetric && (
        <StatisticsModal
          metric={selectedMetric}
          isOpen={!!selectedMetric}
          onClose={() => setSelectedMetric(null)}
        />
      )}
    </>
  );
}