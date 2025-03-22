
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { ProjectCard } from "@/components/ui/ProjectCard";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { FilePlusIcon, FilterIcon, PlusIcon, SearchIcon, SlidersIcon } from "lucide-react";

const Projects = () => {
  const [searchQuery, setSearchQuery] = useState("");
  
  // Sample project data
  const allProjects = [
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
    {
      id: "4",
      title: "Deck Installation",
      client: "Thompson Family",
      status: "active" as const,
      progress: 45,
      dueDate: "Jul 28, 2023",
      team: [
        { id: "4", name: "Emma Davis", avatar: "https://i.pravatar.cc/150?img=4" },
        { id: "5", name: "Michael Brown", avatar: "https://i.pravatar.cc/150?img=5" },
      ],
      documents: 6,
    },
    {
      id: "5",
      title: "Living Room Makeover",
      client: "Garcia Residence",
      status: "pending" as const,
      progress: 10,
      dueDate: "Sep 15, 2023",
      team: [
        { id: "2", name: "Sarah Johnson", avatar: "https://i.pravatar.cc/150?img=2" },
        { id: "6", name: "Jessica Lee", avatar: "https://i.pravatar.cc/150?img=6" },
      ],
      documents: 4,
    },
    {
      id: "6",
      title: "Basement Finishing",
      client: "Wilson Property",
      status: "on-hold" as const,
      progress: 35,
      dueDate: "Oct 5, 2023",
      team: [
        { id: "1", name: "Alex Smith", avatar: "https://i.pravatar.cc/150?img=1" },
        { id: "3", name: "Tom Wilson", avatar: "https://i.pravatar.cc/150?img=3" },
        { id: "5", name: "Michael Brown", avatar: "https://i.pravatar.cc/150?img=5" },
      ],
      documents: 9,
    },
    {
      id: "7",
      title: "Window Replacement",
      client: "Brown Residence",
      status: "completed" as const,
      progress: 100,
      dueDate: "Jun 22, 2023",
      team: [
        { id: "4", name: "Emma Davis", avatar: "https://i.pravatar.cc/150?img=4" },
        { id: "6", name: "Jessica Lee", avatar: "https://i.pravatar.cc/150?img=6" },
      ],
      documents: 7,
    },
    {
      id: "8",
      title: "Exterior Painting",
      client: "Martinez Family",
      status: "active" as const,
      progress: 75,
      dueDate: "Jul 8, 2023",
      team: [
        { id: "1", name: "Alex Smith", avatar: "https://i.pravatar.cc/150?img=1" },
        { id: "2", name: "Sarah Johnson", avatar: "https://i.pravatar.cc/150?img=2" },
      ],
      documents: 5,
    },
  ];
  
  const filteredProjects = allProjects.filter(project => 
    project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    project.client.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  const activeProjects = filteredProjects.filter(p => p.status === "active");
  const pendingProjects = filteredProjects.filter(p => p.status === "pending");
  const completedProjects = filteredProjects.filter(p => p.status === "completed");
  const onHoldProjects = filteredProjects.filter(p => p.status === "on-hold");

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Projects</h1>
        <Button className="flex items-center bg-crm-primary hover:bg-crm-primary/90">
          <PlusIcon className="mr-2 h-4 w-4" />
          New Project
        </Button>
      </div>
      
      <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
        <div className="relative w-full md:w-80">
          <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input 
            type="text" 
            placeholder="Search projects..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)} 
            className="pl-10 rounded-lg"
          />
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" className="flex items-center">
            <FilterIcon className="mr-2 h-4 w-4" />
            Filter
          </Button>
          <Button variant="outline" size="sm" className="flex items-center">
            <SlidersIcon className="mr-2 h-4 w-4" />
            Sort
          </Button>
        </div>
      </div>
      
      <Tabs defaultValue="all" className="w-full">
        <TabsList className="mb-6">
          <TabsTrigger value="all">All Projects ({filteredProjects.length})</TabsTrigger>
          <TabsTrigger value="active">Active ({activeProjects.length})</TabsTrigger>
          <TabsTrigger value="pending">Pending ({pendingProjects.length})</TabsTrigger>
          <TabsTrigger value="completed">Completed ({completedProjects.length})</TabsTrigger>
          <TabsTrigger value="on-hold">On Hold ({onHoldProjects.length})</TabsTrigger>
        </TabsList>
        
        <TabsContent value="all" className="mt-0">
          {filteredProjects.length === 0 ? (
            <Card className="flex flex-col items-center justify-center p-12 text-center">
              <FilePlusIcon className="h-12 w-12 text-gray-400 mb-4" />
              <CardTitle className="text-xl mb-2">No projects found</CardTitle>
              <p className="text-gray-500 dark:text-gray-400 mb-6">
                {searchQuery ? "Try a different search term or clear your filters." : "Get started by creating your first project."}
              </p>
              <Button className="bg-crm-primary hover:bg-crm-primary/90">
                <PlusIcon className="mr-2 h-4 w-4" />
                New Project
              </Button>
            </Card>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {filteredProjects.map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="active" className="mt-0">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {activeProjects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="pending" className="mt-0">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {pendingProjects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="completed" className="mt-0">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {completedProjects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="on-hold" className="mt-0">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {onHoldProjects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Projects;
