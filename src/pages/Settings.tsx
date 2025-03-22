
import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/Card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { SaveIcon, UserIcon, KeyIcon, BellIcon, ShieldIcon, MonitorIcon } from "lucide-react";

const Settings = () => {
  // Profile form
  const profileForm = useForm({
    defaultValues: {
      name: "John Doe",
      email: "john.doe@example.com",
      title: "Project Manager",
      phone: "(555) 123-4567",
      bio: "Experienced project manager with over 10 years in the construction industry.",
    },
  });
  
  // Notification form
  const notificationForm = useForm({
    defaultValues: {
      emailNotifications: true,
      projectUpdates: true,
      taskReminders: true,
      projectComments: true,
      teamMessages: true,
      marketingEmails: false,
    },
  });
  
  // Security form
  const securityForm = useForm({
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  });

  // Appearance form  
  const appearanceForm = useForm({
    defaultValues: {
      theme: "light",
      compactView: false,
      animationsEnabled: true,
    },
  });

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
        <p className="text-gray-500 dark:text-gray-400 mt-1">
          Manage your account settings and preferences
        </p>
      </div>
      
      <Tabs defaultValue="profile" className="w-full">
        <TabsList className="mb-6">
          <TabsTrigger value="profile">Profile</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
          <TabsTrigger value="appearance">Appearance</TabsTrigger>
        </TabsList>
        
        {/* Profile Tab */}
        <TabsContent value="profile" className="mt-0 space-y-6">
          <Card>
            <CardHeader>
              <div className="flex flex-col md:flex-row gap-6 items-start md:items-center">
                <Avatar className="w-20 h-20 border-2 border-white shadow">
                  <AvatarImage src="https://github.com/shadcn.png" />
                  <AvatarFallback>JD</AvatarFallback>
                </Avatar>
                <div>
                  <CardTitle>Profile Information</CardTitle>
                  <CardDescription className="mt-1">
                    Update your personal information and profile settings
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Form {...profileForm}>
                <form onSubmit={profileForm.handleSubmit(console.log)} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      control={profileForm.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Full Name</FormLabel>
                          <FormControl>
                            <Input placeholder="John Doe" {...field} />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={profileForm.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email Address</FormLabel>
                          <FormControl>
                            <Input placeholder="john.doe@example.com" {...field} />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={profileForm.control}
                      name="title"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Job Title</FormLabel>
                          <FormControl>
                            <Input placeholder="Project Manager" {...field} />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={profileForm.control}
                      name="phone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Phone Number</FormLabel>
                          <FormControl>
                            <Input placeholder="(555) 123-4567" {...field} />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  <FormField
                    control={profileForm.control}
                    name="bio"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Bio</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="Tell us about yourself" 
                            rows={4}
                            {...field} 
                          />
                        </FormControl>
                        <FormDescription>
                          Brief description for your profile.
                        </FormDescription>
                      </FormItem>
                    )}
                  />
                  
                  <div className="flex justify-end">
                    <Button type="submit" className="bg-crm-primary hover:bg-crm-primary/90">
                      <SaveIcon className="mr-2 h-4 w-4" />
                      Save Changes
                    </Button>
                  </div>
                </form>
              </Form>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Notifications Tab */}
        <TabsContent value="notifications" className="mt-0 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Notification Preferences</CardTitle>
              <CardDescription>
                Manage how you receive notifications and updates
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...notificationForm}>
                <form onSubmit={notificationForm.handleSubmit(console.log)} className="space-y-6">
                  <FormField
                    control={notificationForm.control}
                    name="emailNotifications"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                        <div className="space-y-0.5">
                          <FormLabel className="text-base">Email Notifications</FormLabel>
                          <FormDescription>
                            Receive email notifications for important updates
                          </FormDescription>
                        </div>
                        <FormControl>
                          <Switch
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  
                  <div className="border rounded-lg divide-y">
                    <FormField
                      control={notificationForm.control}
                      name="projectUpdates"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-center justify-between p-4">
                          <div className="space-y-0.5">
                            <FormLabel>Project Updates</FormLabel>
                            <FormDescription>
                              Get notified about project status changes
                            </FormDescription>
                          </div>
                          <FormControl>
                            <Switch
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={notificationForm.control}
                      name="taskReminders"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-center justify-between p-4">
                          <div className="space-y-0.5">
                            <FormLabel>Task Reminders</FormLabel>
                            <FormDescription>
                              Receive reminders for upcoming and overdue tasks
                            </FormDescription>
                          </div>
                          <FormControl>
                            <Switch
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={notificationForm.control}
                      name="projectComments"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-center justify-between p-4">
                          <div className="space-y-0.5">
                            <FormLabel>Project Comments</FormLabel>
                            <FormDescription>
                              Get notified when someone comments on your projects
                            </FormDescription>
                          </div>
                          <FormControl>
                            <Switch
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={notificationForm.control}
                      name="teamMessages"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-center justify-between p-4">
                          <div className="space-y-0.5">
                            <FormLabel>Team Messages</FormLabel>
                            <FormDescription>
                              Receive notifications for direct messages
                            </FormDescription>
                          </div>
                          <FormControl>
                            <Switch
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={notificationForm.control}
                      name="marketingEmails"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-center justify-between p-4">
                          <div className="space-y-0.5">
                            <FormLabel>Marketing Emails</FormLabel>
                            <FormDescription>
                              Receive updates about new features and promotions
                            </FormDescription>
                          </div>
                          <FormControl>
                            <Switch
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  <div className="flex justify-end">
                    <Button type="submit" className="bg-crm-primary hover:bg-crm-primary/90">
                      <SaveIcon className="mr-2 h-4 w-4" />
                      Save Preferences
                    </Button>
                  </div>
                </form>
              </Form>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Security Tab */}
        <TabsContent value="security" className="mt-0 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Security Settings</CardTitle>
              <CardDescription>
                Update your password and security preferences
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...securityForm}>
                <form onSubmit={securityForm.handleSubmit(console.log)} className="space-y-6">
                  <div className="space-y-4">
                    <FormField
                      control={securityForm.control}
                      name="currentPassword"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Current Password</FormLabel>
                          <FormControl>
                            <Input 
                              type="password" 
                              placeholder="••••••••" 
                              {...field} 
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={securityForm.control}
                      name="newPassword"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>New Password</FormLabel>
                          <FormControl>
                            <Input 
                              type="password" 
                              placeholder="••••••••" 
                              {...field} 
                            />
                          </FormControl>
                          <FormDescription>
                            Password must be at least 8 characters long
                          </FormDescription>
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={securityForm.control}
                      name="confirmPassword"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Confirm New Password</FormLabel>
                          <FormControl>
                            <Input 
                              type="password" 
                              placeholder="••••••••" 
                              {...field} 
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  <div className="flex justify-end">
                    <Button type="submit" className="bg-crm-primary hover:bg-crm-primary/90">
                      <KeyIcon className="mr-2 h-4 w-4" />
                      Update Password
                    </Button>
                  </div>
                </form>
              </Form>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Two-Factor Authentication</CardTitle>
              <CardDescription>
                Add an extra layer of security to your account
              </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col md:flex-row items-start justify-between gap-6">
              <div className="space-y-2">
                <h4 className="font-medium text-lg">Protect your account</h4>
                <p className="text-gray-500 dark:text-gray-400">
                  Two-factor authentication adds an additional layer of security to your
                  account by requiring more than just a password to sign in.
                </p>
              </div>
              <Button variant="outline">
                <ShieldIcon className="mr-2 h-4 w-4" />
                Enable 2FA
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Appearance Tab */}
        <TabsContent value="appearance" className="mt-0 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Appearance Settings</CardTitle>
              <CardDescription>
                Customize how the application looks and behaves
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...appearanceForm}>
                <form onSubmit={appearanceForm.handleSubmit(console.log)} className="space-y-6">
                  <div className="space-y-4">
                    <FormField
                      control={appearanceForm.control}
                      name="theme"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Theme</FormLabel>
                          <div className="grid grid-cols-3 gap-4 pt-2">
                            <div 
                              className={cn(
                                "flex flex-col items-center gap-2 rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground cursor-pointer",
                                field.value === "light" && "border-crm-primary"
                              )}
                              onClick={() => field.onChange("light")}
                            >
                              <div className="w-full bg-white rounded-md border border-gray-200 aspect-video" />
                              <span className="text-center font-medium">Light</span>
                            </div>
                            
                            <div 
                              className={cn(
                                "flex flex-col items-center gap-2 rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground cursor-pointer",
                                field.value === "dark" && "border-crm-primary"
                              )}
                              onClick={() => field.onChange("dark")}
                            >
                              <div className="w-full bg-gray-800 rounded-md border border-gray-700 aspect-video" />
                              <span className="text-center font-medium">Dark</span>
                            </div>
                            
                            <div 
                              className={cn(
                                "flex flex-col items-center gap-2 rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground cursor-pointer",
                                field.value === "system" && "border-crm-primary"
                              )}
                              onClick={() => field.onChange("system")}
                            >
                              <div className="w-full bg-gradient-to-r from-white to-gray-800 rounded-md border border-gray-200 aspect-video" />
                              <span className="text-center font-medium">System</span>
                            </div>
                          </div>
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={appearanceForm.control}
                      name="compactView"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                          <div className="space-y-0.5">
                            <FormLabel className="text-base">Compact View</FormLabel>
                            <FormDescription>
                              Display more content with reduced spacing
                            </FormDescription>
                          </div>
                          <FormControl>
                            <Switch
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={appearanceForm.control}
                      name="animationsEnabled"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                          <div className="space-y-0.5">
                            <FormLabel className="text-base">Enable Animations</FormLabel>
                            <FormDescription>
                              Show animations and transitions throughout the interface
                            </FormDescription>
                          </div>
                          <FormControl>
                            <Switch
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  <div className="flex justify-end">
                    <Button type="submit" className="bg-crm-primary hover:bg-crm-primary/90">
                      <MonitorIcon className="mr-2 h-4 w-4" />
                      Save Appearance
                    </Button>
                  </div>
                </form>
              </Form>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Settings;
