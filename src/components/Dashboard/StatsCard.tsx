import React from 'react';
import { DivideIcon as LucideIcon } from 'lucide-react';
import { clsx } from 'clsx';

interface StatsCardProps {
  title: string;
  value: string | number;
  change?: string;
  changeType?: 'positive' | 'negative' | 'neutral';
  icon: LucideIcon;
  color: 'blue' | 'green' | 'yellow' | 'purple' | 'red';
}

const colorClasses = {
  blue: 'bg-blue-500 text-blue-100',
  green: 'bg-green-500 text-green-100',
  yellow: 'bg-yellow-500 text-yellow-100',
  purple: 'bg-purple-500 text-purple-100',
  red: 'bg-red-500 text-red-100',
};

const changeColorClasses = {
  positive: 'text-green-600',
  negative: 'text-red-600',
  neutral: 'text-gray-600',
};

export const StatsCard: React.FC<StatsCardProps> = ({
  title,
  value,
  change,
  changeType = 'neutral',
  icon: Icon,
  color,
}) => {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <p className="text-sm font-medium text-gray-600 mb-1">{title}</p>
          <p className="text-3xl font-bold text-gray-900">{value}</p>
          {change && (
            <p className={clsx('text-sm font-medium mt-1', changeColorClasses[changeType])}>
              {change}
            </p>
          )}
        </div>
        <div className={clsx('p-3 rounded-lg', colorClasses[color])}>
          <Icon className="w-6 h-6" />
        </div>
      </div>
    </div>
  );
};