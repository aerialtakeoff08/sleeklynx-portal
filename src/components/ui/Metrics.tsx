
import React from "react";
import { Card } from "@/components/ui/card";
import { 
  ArrowDownIcon, 
  ArrowUpIcon, 
  BarChart2Icon, 
  DollarSignIcon, 
  FileTextIcon, 
  UsersIcon 
} from "lucide-react";
import { cn } from "@/lib/utils";

interface MetricCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  className?: string;
}

export const MetricCard: React.FC<MetricCardProps> = ({
  title,
  value,
  icon,
  trend,
  className
}) => {
  return (
    <Card className={cn("overflow-hidden animate-scale-in", className)}>
      <div className="flex justify-between items-start">
        <div>
          <p className="text-sm font-medium text-gray-500 dark:text-gray-400">{title}</p>
          <h3 className="text-2xl font-bold mt-1">{value}</h3>
          
          {trend && (
            <div className="flex items-center mt-1">
              <span 
                className={cn(
                  "text-xs font-medium flex items-center",
                  trend.isPositive 
                    ? "text-green-600 dark:text-green-400" 
                    : "text-red-600 dark:text-red-400"
                )}
              >
                {trend.isPositive ? (
                  <ArrowUpIcon className="w-3 h-3 mr-1" />
                ) : (
                  <ArrowDownIcon className="w-3 h-3 mr-1" />
                )}
                {Math.abs(trend.value)}%
              </span>
              <span className="text-xs text-gray-500 dark:text-gray-400 ml-1">vs last month</span>
            </div>
          )}
        </div>
        
        <div className="p-2 rounded-lg bg-blue-50 dark:bg-blue-900/20 text-crm-primary">
          {icon}
        </div>
      </div>
    </Card>
  );
};

export const MetricsGrid: React.FC = () => {
  const metrics = [
    {
      title: "Total Projects",
      value: 128,
      icon: <FileTextIcon className="w-5 h-5" />,
      trend: {
        value: 12,
        isPositive: true
      }
    },
    {
      title: "Active Clients",
      value: 42,
      icon: <UsersIcon className="w-5 h-5" />,
      trend: {
        value: 8,
        isPositive: true
      }
    },
    {
      title: "Revenue",
      value: "$38,291",
      icon: <DollarSignIcon className="w-5 h-5" />,
      trend: {
        value: 7,
        isPositive: true
      }
    },
    {
      title: "Completion Rate",
      value: "92%",
      icon: <BarChart2Icon className="w-5 h-5" />,
      trend: {
        value: 3,
        isPositive: true
      }
    }
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
      {metrics.map((metric, index) => (
        <MetricCard
          key={metric.title}
          {...metric}
          className={`animate-delay-${index * 100}`}
        />
      ))}
    </div>
  );
};
