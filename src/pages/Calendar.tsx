import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { ChevronLeft, ChevronRight, Plus } from "lucide-react";
import { format, addDays, isSameDay } from "date-fns";

const CalendarPage = () => {
  const [date, setDate] = useState<Date>(new Date());
  const [view, setView] = useState<"month" | "week" | "day">("month");
  
  // Sample events data
  const events = [
    {
      id: 1,
      title: "Roof Inspection",
      date: new Date(),
      time: "10:00 AM - 11:30 AM",
      type: "inspection",
      client: "Johnson Residence"
    },
    {
      id: 2,
      title: "Material Delivery",
      date: addDays(new Date(), 2),
      time: "9:00 AM - 10:00 AM",
      type: "delivery",
      client: "Smith Commercial"
    },
    {
      id: 3,
      title: "Roof Repair",
      date: addDays(new Date(), 3),
      time: "1:00 PM - 5:00 PM",
      type: "repair",
      client: "Williams Property"
    },
    {
      id: 4,
      title: "Client Meeting",
      date: addDays(new Date(), 1),
      time: "3:00 PM - 4:00 PM",
      type: "meeting",
      client: "Davis Construction"
    },
    {
      id: 5,
      title: "Team Briefing",
      date: new Date(),
      time: "8:30 AM - 9:30 AM",
      type: "internal",
      client: "Internal"
    }
  ];
  
  // Filter events for the selected date
  const todayEvents = events.filter(event => 
    isSameDay(event.date, date)
  );
  
  // Get badge color based on event type
  const getEventBadgeColor = (type: string) => {
    switch(type) {
      case "inspection":
        return "bg-blue-100 text-blue-800 dark:bg-blue-800 dark:text-blue-100";
      case "delivery":
        return "bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100";
      case "repair":
        return "bg-orange-100 text-orange-800 dark:bg-orange-800 dark:text-orange-100";
      case "meeting":
        return "bg-purple-100 text-purple-800 dark:bg-purple-800 dark:text-purple-100";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-100";
    }
  };
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Calendar</h1>
          <p className="text-gray-500 dark:text-gray-400">Manage your schedule and appointments</p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Add Event
        </Button>
      </div>
      
      <Card>
        <CardHeader className="pb-3">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="icon" onClick={() => setDate(prev => addDays(prev, -1))}>
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="icon" onClick={() => setDate(prev => addDays(prev, 1))}>
                <ChevronRight className="h-4 w-4" />
              </Button>
              <Button variant="outline" onClick={() => setDate(new Date())}>
                Today
              </Button>
              <h2 className="text-xl font-semibold">{format(date, 'MMMM yyyy')}</h2>
            </div>
            <Tabs value={view} onValueChange={(v) => setView(v as "month" | "week" | "day")}>
              <TabsList>
                <TabsTrigger value="month">Month</TabsTrigger>
                <TabsTrigger value="week">Week</TabsTrigger>
                <TabsTrigger value="day">Day</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-7 gap-6">
            <div className="md:col-span-5">
              <Calendar
                mode="single"
                selected={date}
                onSelect={(date) => date && setDate(date)}
                className="rounded-md border"
              />
            </div>
            <div className="md:col-span-2">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">
                    {format(date, 'EEEE, MMMM d, yyyy')}
                  </CardTitle>
                  <CardDescription>
                    {todayEvents.length} events scheduled
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {todayEvents.length > 0 ? (
                    <div className="space-y-3">
                      {todayEvents.map(event => (
                        <div key={event.id} className="p-3 rounded-lg border bg-card hover:bg-accent transition-colors">
                          <div className="flex justify-between items-start">
                            <div>
                              <h3 className="font-medium">{event.title}</h3>
                              <p className="text-sm text-gray-500 dark:text-gray-400">{event.time}</p>
                              <p className="text-sm text-gray-500 dark:text-gray-400">{event.client}</p>
                            </div>
                            <Badge className={getEventBadgeColor(event.type)}>
                              {event.type}
                            </Badge>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-6 text-gray-500 dark:text-gray-400">
                      <p>No events scheduled for today</p>
                      <Button variant="link" className="mt-2">
                        <Plus className="mr-1 h-3 w-3" />
                        Add Event
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Upcoming Events</CardTitle>
          <CardDescription>Your schedule for the next 7 days</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {events
              .filter(event => event.date > new Date())
              .sort((a, b) => a.date.getTime() - b.date.getTime())
              .slice(0, 5)
              .map(event => (
                <div key={event.id} className="flex justify-between items-center p-3 rounded-lg border">
                  <div>
                    <h3 className="font-medium">{event.title}</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {format(event.date, 'EEEE, MMMM d')} • {event.time}
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{event.client}</p>
                  </div>
                  <Badge className={getEventBadgeColor(event.type)}>
                    {event.type}
                  </Badge>
                </div>
              ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CalendarPage;
