import React, { useState } from "react";
import { SidebarProvider, SidebarTrigger, Sidebar, SidebarContent, SidebarHeader, SidebarGroup, SidebarGroupLabel, SidebarGroupContent, SidebarFooter, SidebarMenu, SidebarMenuItem, SidebarMenuButton } from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Bell, Calendar, FileText, Home, Menu, MessageCircle, Plus, Search, Settings, Users } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { PageTransition } from "../transitions/PageTransition";
import { cn } from "@/lib/utils";

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  const location = useLocation();
  const [searchVisible, setSearchVisible] = useState(false);
  
  const navItems = [
    { 
      title: "Dashboard", 
      icon: Home, 
      path: "/dashboard",
      notifications: 0 
    },
    { 
      title: "Projects", 
      icon: FileText, 
      path: "/projects",
      notifications: 3 
    },
    { 
      title: "Calendar", 
      icon: Calendar, 
      path: "/calendar",
      notifications: 0 
    },
    { 
      title: "Messages", 
      icon: MessageCircle, 
      path: "/messages",
      notifications: 5 
    },
    { 
      title: "Clients", 
      icon: Users, 
      path: "/clients",
      notifications: 0 
    },
    { 
      title: "Documents", 
      icon: FileText, 
      path: "/documents",
      notifications: 0 
    },
  ];
  
  const bottomNavItems = [
    { 
      title: "Settings", 
      icon: Settings, 
      path: "/settings" 
    },
  ];

  return (
    <SidebarProvider>
      <div className="min-h-screen flex bg-gray-50 dark:bg-gray-900 overflow-hidden w-full">
        <Sidebar className="bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700">
          <SidebarHeader className="p-4 flex items-center border-b border-gray-100 dark:border-gray-700">
            <div className="flex items-center ml-2">
              <span className="text-xl font-bold text-crm-primary">Roofer</span>
              <span className="text-xl font-bold">App.com</span>
            </div>
          </SidebarHeader>
          <SidebarContent className="p-4">
            <SidebarGroup>
              <SidebarGroupLabel>Menu</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  {navItems.map((item) => (
                    <SidebarMenuItem key={item.path}>
                      <SidebarMenuButton
                        asChild
                        isActive={location.pathname === item.path}
                        className={cn(
                          "flex justify-between w-full py-3",
                          location.pathname === item.path ? "text-crm-primary" : ""
                        )}
                      >
                        <Link to={item.path} className="flex items-center justify-between w-full">
                          <div className="flex items-center">
                            <item.icon className="h-5 w-5 mr-3" />
                            <span>{item.title}</span>
                          </div>
                          {item.notifications > 0 && (
                            <Badge variant="default" className="bg-crm-primary text-white">
                              {item.notifications}
                            </Badge>
                          )}
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
            
            <Separator className="my-6" />
            
            <SidebarGroup>
              <SidebarGroupLabel>Projects</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  <Button variant="outline" className="w-full flex items-center justify-start">
                    <Plus className="h-4 w-4 mr-2" />
                    New Project
                  </Button>
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
            
            <Separator className="my-6" />
            
            <SidebarGroup>
              <SidebarMenu>
                {bottomNavItems.map((item) => (
                  <SidebarMenuItem key={item.path}>
                    <SidebarMenuButton
                      asChild
                      isActive={location.pathname === item.path}
                      className={cn(
                        "flex items-center py-3",
                        location.pathname === item.path ? "text-crm-primary" : ""
                      )}
                    >
                      <Link to={item.path} className="flex items-center">
                        <item.icon className="h-5 w-5 mr-3" />
                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroup>
          </SidebarContent>
          <SidebarFooter className="p-4 border-t border-gray-200 dark:border-gray-700">
            <div className="flex items-center">
              <Avatar>
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>JD</AvatarFallback>
              </Avatar>
              <div className="ml-3">
                <p className="text-sm font-medium">John Doe</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">Project Manager</p>
              </div>
            </div>
          </SidebarFooter>
        </Sidebar>
        
        <div className="flex-1 flex flex-col overflow-hidden">
          <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 py-4 px-6 flex items-center justify-between">
            <div className="flex items-center">
              <SidebarTrigger>
                <Button variant="ghost" size="icon" className="mr-2">
                  <Menu className="h-5 w-5" />
                </Button>
              </SidebarTrigger>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input 
                  type="text" 
                  placeholder="Search..."
                  className="pl-10 pr-4 py-2 rounded-full bg-gray-100 dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-crm-primary w-64 text-sm"
                />
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="icon" className="relative">
                <Bell className="h-5 w-5" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
              </Button>
              <Avatar className="h-8 w-8">
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>JD</AvatarFallback>
              </Avatar>
            </div>
          </header>
          
          <main className="flex-1 overflow-y-auto p-6 bg-gray-50 dark:bg-gray-900">
            <PageTransition>
              {children}
            </PageTransition>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};
