
import React from "react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "./Card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { CalendarIcon, CheckCircleIcon, ClockIcon, FileIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface ProjectCardProps {
  project: {
    id: string;
    title: string;
    client: string;
    status: "pending" | "active" | "completed" | "on-hold";
    progress: number;
    dueDate: string;
    team: {
      id: string;
      name: string;
      avatar?: string;
    }[];
    documents: number;
    className?: string;
  };
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300";
      case "active":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300";
      case "completed":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300";
      case "on-hold":
        return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300";
    }
  };

  return (
    <Card
      isHoverable={true}
      className="overflow-hidden animate-scale-in"
    >
      <CardHeader className="pb-0">
        <div className="flex justify-between items-start">
          <CardTitle>{project.title}</CardTitle>
          <Badge className={cn("capitalize", getStatusColor(project.status))}>
            {project.status.replace("-", " ")}
          </Badge>
        </div>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{project.client}</p>
      </CardHeader>
      <CardContent className="mt-6">
        <div className="space-y-4">
          <div>
            <div className="flex justify-between text-sm mb-1">
              <span className="text-gray-500 dark:text-gray-400">Progress</span>
              <span className="font-medium">{project.progress}%</span>
            </div>
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
              <div
                className="bg-crm-primary h-2 rounded-full transition-all duration-500 ease-in-out"
                style={{ width: `${project.progress}%` }}
              ></div>
            </div>
          </div>
          
          <div className="flex items-center text-gray-500 dark:text-gray-400 text-sm">
            <CalendarIcon className="w-4 h-4 mr-2" />
            <span>Due: {project.dueDate}</span>
          </div>
          
          <div className="flex items-center text-gray-500 dark:text-gray-400 text-sm">
            <FileIcon className="w-4 h-4 mr-2" />
            <span>{project.documents} documents</span>
          </div>
        </div>
      </CardContent>
      <CardFooter className="border-t border-gray-100 dark:border-gray-800 pt-4">
        <div className="flex -space-x-2">
          {project.team.map((member) => (
            <Avatar key={member.id} className="border-2 border-white dark:border-gray-800 w-8 h-8">
              <AvatarImage src={member.avatar} alt={member.name} />
              <AvatarFallback className="text-xs bg-crm-primary text-white">
                {member.name.split(" ").map(n => n[0]).join("")}
              </AvatarFallback>
            </Avatar>
          ))}
          {project.team.length > 3 && (
            <div className="flex items-center justify-center w-8 h-8 rounded-full bg-gray-100 dark:bg-gray-700 border-2 border-white dark:border-gray-800 text-xs font-medium">
              +{project.team.length - 3}
            </div>
          )}
        </div>
        <div className="flex items-center text-sm">
          {project.status === "completed" ? (
            <div className="flex items-center text-green-600 dark:text-green-400">
              <CheckCircleIcon className="w-4 h-4 mr-1" />
              <span>Completed</span>
            </div>
          ) : (
            <div className="flex items-center text-gray-500 dark:text-gray-400">
              <ClockIcon className="w-4 h-4 mr-1" />
              <span>In progress</span>
            </div>
          )}
        </div>
      </CardFooter>
    </Card>
  );
};
