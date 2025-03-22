
import React, { useState } from "react";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { CalendarIcon, ChevronLeftIcon, ChevronRightIcon, ClockIcon, FilterIcon, MapPinIcon, PlusIcon } from "lucide-react";
import { format, startOfDay, addDays, isToday, isSameDay, parseISO } from "date-fns";
import { cn } from "@/lib/utils";

interface Event {
  id: string;
  title: string;
  date: Date;
  startTime: string;
  endTime: string;
  location?: string;
  type: "meeting" | "site-visit" | "deadline" | "appointment";
  project?: string;
  attendees: {
    id: string;
    name: string;
    avatar?: string;
  }[];
}

const CalendarPage = () => {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [view, setView] = useState<"day" | "schedule">("schedule");
  
  // Sample event data
  const events: Event[] = [
    {
      id: "1",
      title: "Project Kickoff",
      date: addDays(startOfDay(new Date()), 1),
      startTime: "09:00 AM",
      endTime: "10:30 AM",
      location: "Conference Room A",
      type: "meeting",
      project: "Kitchen Renovation",
      attendees: [
        { id: "1", name: "Alex Smith", avatar: "https://i.pravatar.cc/150?img=1" },
        { id: "2", name: "Sarah Johnson", avatar: "https://i.pravatar.cc/150?img=2" },
        { id: "3", name: "Tom Wilson", avatar: "https://i.pravatar.cc/150?img=3" },
      ],
    },
    {
      id: "2",
      title: "Initial Site Assessment",
      date: startOfDay(new Date()),
      startTime: "11:00 AM",
      endTime: "12:30 PM",
      location: "Johnson Residence",
      type: "site-visit",
      project: "Kitchen Renovation",
      attendees: [
        { id: "1", name: "Alex Smith", avatar: "https://i.pravatar.cc/150?img=1" },
        { id: "4", name: "Emma Davis", avatar: "https://i.pravatar.cc/150?img=4" },
      ],
    },
    {
      id: "3",
      title: "Material Selection Meeting",
      date: addDays(startOfDay(new Date()), 2),
      startTime: "02:00 PM",
      endTime: "03:30 PM",
      location: "Design Studio",
      type: "appointment",
      project: "Bathroom Remodel",
      attendees: [
        { id: "2", name: "Sarah Johnson", avatar: "https://i.pravatar.cc/150?img=2" },
        { id: "5", name: "Michael Brown", avatar: "https://i.pravatar.cc/150?img=5" },
        { id: "6", name: "Jessica Lee", avatar: "https://i.pravatar.cc/150?img=6" },
      ],
    },
    {
      id: "4",
      title: "Project Deadline",
      date: addDays(startOfDay(new Date()), 5),
      startTime: "11:59 PM",
      endTime: "11:59 PM",
      type: "deadline",
      project: "Roof Replacement",
      attendees: [
        { id: "1", name: "Alex Smith", avatar: "https://i.pravatar.cc/150?img=1" },
        { id: "3", name: "Tom Wilson", avatar: "https://i.pravatar.cc/150?img=3" },
      ],
    },
    {
      id: "5",
      title: "Client Consultation",
      date: startOfDay(new Date()),
      startTime: "03:00 PM",
      endTime: "04:00 PM",
      location: "Virtual Meeting",
      type: "meeting",
      project: "Living Room Makeover",
      attendees: [
        { id: "2", name: "Sarah Johnson", avatar: "https://i.pravatar.cc/150?img=2" },
        { id: "6", name: "Jessica Lee", avatar: "https://i.pravatar.cc/150?img=6" },
      ],
    },
    {
      id: "6",
      title: "Team Sync",
      date: startOfDay(new Date()),
      startTime: "09:30 AM",
      endTime: "10:00 AM",
      location: "Conference Room B",
      type: "meeting",
      attendees: [
        { id: "1", name: "Alex Smith", avatar: "https://i.pravatar.cc/150?img=1" },
        { id: "2", name: "Sarah Johnson", avatar: "https://i.pravatar.cc/150?img=2" },
        { id: "3", name: "Tom Wilson", avatar: "https://i.pravatar.cc/150?img=3" },
        { id: "4", name: "Emma Davis", avatar: "https://i.pravatar.cc/150?img=4" },
        { id: "5", name: "Michael Brown", avatar: "https://i.pravatar.cc/150?img=5" },
      ],
    },
  ];
  
  const filteredEvents = events.filter(event => 
    isSameDay(event.date, selectedDate)
  );
  
  const getEventTypeColor = (type: string) => {
    switch (type) {
      case "meeting":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300";
      case "site-visit":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300";
      case "deadline":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300";
      case "appointment":
        return "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300";
    }
  };
  
  // Custom day render function to show event indicators
  const renderDay = (day: Date) => {
    const eventsOnDay = events.filter(event => isSameDay(event.date, day));
    const hasEvents = eventsOnDay.length > 0;
    
    return (
      <div className="relative w-full h-full flex items-center justify-center">
        <div 
          className={cn(
            "w-9 h-9 flex items-center justify-center rounded-full",
            isToday(day) && "bg-crm-primary text-white font-bold"
          )}
        >
          {format(day, "d")}
        </div>
        {hasEvents && (
          <div className="absolute bottom-1 flex gap-1 justify-center">
            {eventsOnDay.slice(0, 3).map((event, i) => (
              <div 
                key={i}
                className={cn(
                  "w-1.5 h-1.5 rounded-full",
                  event.type === "meeting" && "bg-blue-500",
                  event.type === "site-visit" && "bg-green-500",
                  event.type === "deadline" && "bg-red-500",
                  event.type === "appointment" && "bg-purple-500"
                )}
              />
            ))}
            {eventsOnDay.length > 3 && (
              <div className="w-1.5 h-1.5 rounded-full bg-gray-400" />
            )}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Calendar</h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1">
            Manage your schedule and appointments
          </p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" className="flex items-center">
            <FilterIcon className="mr-2 h-4 w-4" />
            Filter
          </Button>
          <Button className="flex items-center bg-crm-primary hover:bg-crm-primary/90">
            <PlusIcon className="mr-2 h-4 w-4" />
            New Event
          </Button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-7 gap-8">
        {/* Calendar Widget */}
        <Card className="lg:col-span-3">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle>Calendar</CardTitle>
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="icon" className="h-8 w-8">
                <ChevronLeftIcon className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="icon" className="h-8 w-8">
                <ChevronRightIcon className="h-4 w-4" />
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <Calendar 
              mode="single"
              selected={selectedDate}
              onSelect={(date) => date && setSelectedDate(date)}
              className="w-full"
              components={{
                DayContent: ({ day }) => renderDay(day),
              }}
            />
          </CardContent>
        </Card>
        
        {/* Events for selected day */}
        <Card className="lg:col-span-4">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle>
                {isToday(selectedDate) ? "Today's Schedule" : format(selectedDate, "MMMM d, yyyy")}
              </CardTitle>
              <Tabs defaultValue="schedule" onValueChange={(v) => setView(v as "day" | "schedule")}>
                <TabsList>
                  <TabsTrigger value="schedule">Schedule</TabsTrigger>
                  <TabsTrigger value="day">Day</TabsTrigger>
                </TabsList>
              </Tabs>
            </div>
          </CardHeader>
          <CardContent>
            {filteredEvents.length === 0 ? (
              <div className="py-12 flex flex-col items-center justify-center text-center">
                <CalendarIcon className="h-12 w-12 text-gray-400 mb-4" />
                <h3 className="text-lg font-medium mb-1">No events scheduled</h3>
                <p className="text-gray-500 dark:text-gray-400 mb-6">
                  {isToday(selectedDate) ? "You're free today!" : `No events for ${format(selectedDate, "MMMM d")}`}
                </p>
                <Button className="bg-crm-primary hover:bg-crm-primary/90">
                  <PlusIcon className="mr-2 h-4 w-4" />
                  Add Event
                </Button>
              </div>
            ) : (
              <div className="space-y-4">
                {filteredEvents
                  .sort((a, b) => {
                    const timeA = a.startTime;
                    const timeB = b.startTime;
                    return timeA.localeCompare(timeB);
                  })
                  .map((event) => (
                    <div 
                      key={event.id}
                      className="p-4 rounded-lg border border-gray-200 dark:border-gray-700 hover:shadow-md transition-shadow"
                    >
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h3 className="font-medium">{event.title}</h3>
                          {event.project && (
                            <p className="text-sm text-gray-500 dark:text-gray-400">
                              {event.project}
                            </p>
                          )}
                        </div>
                        <Badge className={cn("capitalize", getEventTypeColor(event.type))}>
                          {event.type.replace("-", " ")}
                        </Badge>
                      </div>
                      
                      <div className="space-y-2 mt-3">
                        <div className="flex items-center text-sm text-gray-600 dark:text-gray-300">
                          <ClockIcon className="h-4 w-4 mr-2 text-gray-500 dark:text-gray-400" />
                          {event.startTime} - {event.endTime}
                        </div>
                        
                        {event.location && (
                          <div className="flex items-center text-sm text-gray-600 dark:text-gray-300">
                            <MapPinIcon className="h-4 w-4 mr-2 text-gray-500 dark:text-gray-400" />
                            {event.location}
                          </div>
                        )}
                        
                        <div className="flex items-center pt-2">
                          <div className="flex -space-x-2 mr-3">
                            {event.attendees.slice(0, 4).map((attendee) => (
                              <Avatar key={attendee.id} className="border-2 border-white dark:border-gray-800 w-7 h-7">
                                <AvatarImage src={attendee.avatar} alt={attendee.name} />
                                <AvatarFallback className="text-xs bg-crm-primary text-white">
                                  {attendee.name.split(" ").map(n => n[0]).join("")}
                                </AvatarFallback>
                              </Avatar>
                            ))}
                            {event.attendees.length > 4 && (
                              <div className="flex items-center justify-center w-7 h-7 rounded-full bg-gray-100 dark:bg-gray-700 border-2 border-white dark:border-gray-800 text-xs font-medium">
                                +{event.attendees.length - 4}
                              </div>
                            )}
                          </div>
                          <span className="text-xs text-gray-500 dark:text-gray-400">
                            {event.attendees.length} {event.attendees.length === 1 ? "attendee" : "attendees"}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CalendarPage;
