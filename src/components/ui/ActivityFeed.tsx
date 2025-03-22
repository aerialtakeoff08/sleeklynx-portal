
import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "./Card";
import { 
  AlertCircleIcon, 
  CheckCircleIcon, 
  FileTextIcon, 
  MessageSquareIcon, 
  UserPlusIcon 
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface ActivityItem {
  id: string;
  type: "message" | "document" | "client" | "task" | "alert";
  user: {
    name: string;
    avatar?: string;
  };
  action: string;
  target: string;
  time: string;
  isNew?: boolean;
}

interface ActivityFeedProps {
  activities: ActivityItem[];
  className?: string;
}

export const ActivityFeed: React.FC<ActivityFeedProps> = ({ 
  activities,
  className
}) => {
  const getActivityIcon = (type: string) => {
    switch (type) {
      case "message":
        return (
          <div className="p-2 rounded-full bg-blue-100 text-crm-primary dark:bg-blue-900/30">
            <MessageSquareIcon className="w-4 h-4" />
          </div>
        );
      case "document":
        return (
          <div className="p-2 rounded-full bg-purple-100 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400">
            <FileTextIcon className="w-4 h-4" />
          </div>
        );
      case "client":
        return (
          <div className="p-2 rounded-full bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400">
            <UserPlusIcon className="w-4 h-4" />
          </div>
        );
      case "task":
        return (
          <div className="p-2 rounded-full bg-yellow-100 text-yellow-600 dark:bg-yellow-900/30 dark:text-yellow-400">
            <CheckCircleIcon className="w-4 h-4" />
          </div>
        );
      case "alert":
        return (
          <div className="p-2 rounded-full bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400">
            <AlertCircleIcon className="w-4 h-4" />
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <Card className={cn("", className)}>
      <CardHeader>
        <CardTitle>Recent Activity</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-5">
          {activities.map((activity, index) => (
            <div 
              key={activity.id} 
              className={cn(
                "flex items-start space-x-4 animate-scale-in",
                `animate-delay-${index * 100}`,
                activity.isNew && "relative"
              )}
            >
              {activity.isNew && (
                <div className="absolute left-0 top-0 w-2 h-2 bg-crm-primary rounded-full transform -translate-x-4 animate-pulse"></div>
              )}
              
              {getActivityIcon(activity.type)}
              
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Avatar className="h-6 w-6 mr-2">
                      <AvatarImage src={activity.user.avatar} alt={activity.user.name} />
                      <AvatarFallback className="text-xs bg-crm-gray-400 text-white">
                        {activity.user.name.split(" ").map(n => n[0]).join("")}
                      </AvatarFallback>
                    </Avatar>
                    <p className="text-sm font-medium text-gray-900 dark:text-white">
                      {activity.user.name}
                    </p>
                  </div>
                  <span className="text-xs text-gray-500 dark:text-gray-400">
                    {activity.time}
                  </span>
                </div>
                <p className="mt-1 text-sm text-gray-600 dark:text-gray-300 truncate">
                  {activity.action} <span className="font-medium">{activity.target}</span>
                </p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
