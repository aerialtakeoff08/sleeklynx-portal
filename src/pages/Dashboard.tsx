
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/Card";
import { MetricsGrid } from "@/components/ui/Metrics";
import { ProjectCard } from "@/components/ui/ProjectCard";
import { ActivityFeed } from "@/components/ui/ActivityFeed";
import { Button } from "@/components/ui/button";
import { FileUp, Plus } from "lucide-react";
import { 
  Bar, 
  BarChart, 
  CartesianGrid, 
  Legend, 
  ResponsiveContainer, 
  Tooltip, 
  XAxis, 
  YAxis 
} from "recharts";

const Dashboard = () => {
  // Sample data for charts
  const projectsData = [
    { name: "Jan", completed: 12, ongoing: 8 },
    { name: "Feb", completed: 19, ongoing: 7 },
    { name: "Mar", completed: 15, ongoing: 10 },
    { name: "Apr", completed: 18, ongoing: 12 },
    { name: "May", completed: 22, ongoing: 9 },
    { name: "Jun", completed: 25, ongoing: 11 },
  ];

  // Sample project data
  const projects = [
    {
      id: "1",
      title: "Kitchen Renovation",
      client: "Johnson Residence",
      status: "active" as const,
      progress: 68,
      dueDate: "Jul 15, 2023",
      team: [
        { id: "1", name: "Alex Smith", avatar: "https://i.pravatar.cc/150?img=1" },
        { id: "2", name: "Sarah Johnson", avatar: "https://i.pravatar.cc/150?img=2" },
        { id: "3", name: "Tom Wilson", avatar: "https://i.pravatar.cc/150?img=3" },
        { id: "4", name: "Emma Davis", avatar: "https://i.pravatar.cc/150?img=4" },
      ],
      documents: 12,
    },
    {
      id: "2",
      title: "Bathroom Remodel",
      client: "Smith Family",
      status: "pending" as const,
      progress: 25,
      dueDate: "Aug 30, 2023",
      team: [
        { id: "2", name: "Sarah Johnson", avatar: "https://i.pravatar.cc/150?img=2" },
        { id: "5", name: "Michael Brown", avatar: "https://i.pravatar.cc/150?img=5" },
      ],
      documents: 8,
    },
    {
      id: "3",
      title: "Roof Replacement",
      client: "Davis Property",
      status: "completed" as const,
      progress: 100,
      dueDate: "Jun 10, 2023",
      team: [
        { id: "1", name: "Alex Smith", avatar: "https://i.pravatar.cc/150?img=1" },
        { id: "3", name: "Tom Wilson", avatar: "https://i.pravatar.cc/150?img=3" },
        { id: "6", name: "Jessica Lee", avatar: "https://i.pravatar.cc/150?img=6" },
      ],
      documents: 15,
    },
  ];
  
  // Sample activity data
  const activities = [
    {
      id: "1",
      type: "message" as const,
      user: {
        name: "Alex Smith",
        avatar: "https://i.pravatar.cc/150?img=1",
      },
      action: "left a comment on",
      target: "Kitchen Renovation",
      time: "2m ago",
      isNew: true,
    },
    {
      id: "2",
      type: "document" as const,
      user: {
        name: "Sarah Johnson",
        avatar: "https://i.pravatar.cc/150?img=2",
      },
      action: "uploaded a new document to",
      target: "Bathroom Remodel",
      time: "1h ago",
      isNew: true,
    },
    {
      id: "3",
      type: "task" as const,
      user: {
        name: "Tom Wilson",
        avatar: "https://i.pravatar.cc/150?img=3",
      },
      action: "completed a task in",
      target: "Roof Replacement",
      time: "3h ago",
    },
    {
      id: "4",
      type: "client" as const,
      user: {
        name: "Emma Davis",
        avatar: "https://i.pravatar.cc/150?img=4",
      },
      action: "added a new client",
      target: "Parker Residence",
      time: "5h ago",
    },
    {
      id: "5",
      type: "alert" as const,
      user: {
        name: "System",
        avatar: "",
      },
      action: "deadline approaching for",
      target: "Kitchen Renovation",
      time: "1d ago",
    },
  ];

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1">
            Welcome back, here's what's happening with your projects today.
          </p>
        </div>
        <div className="flex space-x-3">
          <Button variant="outline" className="flex items-center">
            <FileUp className="mr-2 h-4 w-4" />
            Export
          </Button>
          <Button className="flex items-center bg-crm-primary hover:bg-crm-primary/90">
            <Plus className="mr-2 h-4 w-4" />
            New Project
          </Button>
        </div>
      </div>

      {/* Metrics */}
      <MetricsGrid />

      {/* Main content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left column */}
        <div className="lg:col-span-2 space-y-8">
          {/* Projects chart */}
          <Card>
            <CardHeader>
              <CardTitle>Project Overview</CardTitle>
              <CardDescription>Monthly completed vs ongoing projects</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={projectsData}
                    margin={{
                      top: 20,
                      right: 30,
                      left: 20,
                      bottom: 5,
                    }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: "rgba(255, 255, 255, 0.9)",
                        borderRadius: "0.5rem",
                        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
                        border: "none"
                      }} 
                    />
                    <Legend />
                    <Bar 
                      dataKey="completed" 
                      name="Completed" 
                      fill="#3B82F6" 
                      radius={[4, 4, 0, 0]} 
                    />
                    <Bar 
                      dataKey="ongoing" 
                      name="Ongoing" 
                      fill="#93C5FD" 
                      radius={[4, 4, 0, 0]} 
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* Recent Projects */}
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold">Recent Projects</h2>
              <Button variant="ghost" className="text-crm-primary hover:text-crm-primary/90">
                View all
              </Button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {projects.map((project, index) => (
                <ProjectCard
                  key={project.id}
                  project={project}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Right column */}
        <div className="space-y-8">
          <ActivityFeed activities={activities} />
          
          {/* Upcoming Deadlines */}
          <Card>
            <CardHeader>
              <CardTitle>Upcoming Deadlines</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {projects
                  .filter(p => p.status !== "completed")
                  .sort((a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime())
                  .slice(0, 3)
                  .map((project, index) => (
                    <div key={project.id} className="flex items-center p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                      <div className="flex-1">
                        <h4 className="font-medium text-gray-900 dark:text-white">{project.title}</h4>
                        <div className="flex items-center text-sm">
                          <span className="text-gray-500 dark:text-gray-400">{project.client}</span>
                          <span className="mx-2">•</span>
                          <span 
                            className={
                              new Date(project.dueDate) < new Date() 
                                ? "text-red-600 dark:text-red-400 font-medium" 
                                : "text-gray-500 dark:text-gray-400"
                            }
                          >
                            Due {project.dueDate}
                          </span>
                        </div>
                      </div>
                      <div className="w-12 h-12 rounded-full bg-blue-100 dark:bg-blue-900/20 flex items-center justify-center text-sm font-medium text-crm-primary">
                        {project.progress}%
                      </div>
                    </div>
                  ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
