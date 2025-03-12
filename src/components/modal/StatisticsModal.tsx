import React from 'react';
import { X } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

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

interface StatisticsModalProps {
  metric: MetricData;
  isOpen: boolean;
  onClose: () => void;
}

export default function StatisticsModal({ metric, isOpen, onClose }: StatisticsModalProps) {
  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <div 
        className="bg-white rounded-xl w-full max-w-2xl animate-fade-in shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between p-4 border-b">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-vektrus-blue/10 rounded-lg">
              {metric.icon}
            </div>
            <div>
              <h2 className="text-xl font-semibold text-vektrus-gray-dark">{metric.title} Statistics</h2>
              <p className="text-sm text-gray-600">Last 7 days performance</p>
            </div>
          </div>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onClose();
            }}
            className="p-2 text-gray-600 hover:text-gray-900 rounded-full hover:bg-gray-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6">
          <div className="grid grid-cols-3 gap-4 mb-6">
            {Object.entries(metric.details).map(([key, value]) => (
              <div key={key} className="bg-gray-50 p-4 rounded-lg">
                <p className="text-sm text-gray-600 capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}</p>
                <p className="text-lg font-semibold mt-1">{value}</p>
              </div>
            ))}
          </div>

          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={metric.chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Line 
                  type="monotone" 
                  dataKey="value" 
                  stroke="#00B8D9" 
                  strokeWidth={2}
                  dot={{ fill: '#00B8D9', strokeWidth: 2 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}