
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { FileIcon, FileTextIcon, FolderIcon, GridIcon, ListIcon, PlusIcon, SearchIcon, UploadIcon } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

interface Document {
  id: string;
  name: string;
  type: "pdf" | "image" | "doc" | "xls" | "folder";
  size?: string;
  project?: string;
  updatedAt: Date;
  updatedBy: {
    id: string;
    name: string;
    avatar?: string;
  };
  shared?: boolean;
}

const Documents = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  
  // Sample documents data
  const allDocuments: Document[] = [
    {
      id: "1",
      name: "Kitchen Renovation Plans",
      type: "pdf",
      size: "4.2 MB",
      project: "Kitchen Renovation",
      updatedAt: new Date(2023, 6, 12),
      updatedBy: {
        id: "1",
        name: "Alex Smith",
        avatar: "https://i.pravatar.cc/150?img=1",
      },
      shared: true,
    },
    {
      id: "2",
      name: "Material Specifications",
      type: "doc",
      size: "1.8 MB",
      project: "Kitchen Renovation",
      updatedAt: new Date(2023, 6, 10),
      updatedBy: {
        id: "2",
        name: "Sarah Johnson",
        avatar: "https://i.pravatar.cc/150?img=2",
      },
    },
    {
      id: "3",
      name: "Client Photos",
      type: "folder",
      project: "Bathroom Remodel",
      updatedAt: new Date(2023, 6, 8),
      updatedBy: {
        id: "3",
        name: "Tom Wilson",
        avatar: "https://i.pravatar.cc/150?img=3",
      },
    },
    {
      id: "4",
      name: "Budget Spreadsheet",
      type: "xls",
      size: "0.9 MB",
      project: "Roof Replacement",
      updatedAt: new Date(2023, 6, 15),
      updatedBy: {
        id: "4",
        name: "Emma Davis",
        avatar: "https://i.pravatar.cc/150?img=4",
      },
      shared: true,
    },
    {
      id: "5",
      name: "Kitchen Layout",
      type: "image",
      size: "2.6 MB",
      project: "Kitchen Renovation",
      updatedAt: new Date(2023, 6, 14),
      updatedBy: {
        id: "5",
        name: "Michael Brown",
        avatar: "https://i.pravatar.cc/150?img=5",
      },
    },
    {
      id: "6",
      name: "Contract Agreement",
      type: "pdf",
      size: "3.1 MB",
      project: "Bathroom Remodel",
      updatedAt: new Date(2023, 6, 9),
      updatedBy: {
        id: "6",
        name: "Jessica Lee",
        avatar: "https://i.pravatar.cc/150?img=6",
      },
    },
    {
      id: "7",
      name: "Project Templates",
      type: "folder",
      updatedAt: new Date(2023, 6, 5),
      updatedBy: {
        id: "1",
        name: "Alex Smith",
        avatar: "https://i.pravatar.cc/150?img=1",
      },
    },
    {
      id: "8",
      name: "Installation Guide",
      type: "pdf",
      size: "5.7 MB",
      project: "Roof Replacement",
      updatedAt: new Date(2023, 6, 7),
      updatedBy: {
        id: "3",
        name: "Tom Wilson",
        avatar: "https://i.pravatar.cc/150?img=3",
      },
    },
    {
      id: "9",
      name: "Before and After Photos",
      type: "image",
      size: "7.2 MB",
      project: "Living Room Makeover",
      updatedAt: new Date(2023, 6, 16),
      updatedBy: {
        id: "2",
        name: "Sarah Johnson",
        avatar: "https://i.pravatar.cc/150?img=2",
      },
      shared: true,
    },
  ];
  
  const filteredDocuments = allDocuments.filter(doc => 
    doc.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (doc.project && doc.project.toLowerCase().includes(searchQuery.toLowerCase()))
  );
  
  const recentDocuments = [...filteredDocuments].sort((a, b) => 
    b.updatedAt.getTime() - a.updatedAt.getTime()
  ).slice(0, 5);
  
  const sharedDocuments = filteredDocuments.filter(doc => doc.shared);
  
  const getFileIcon = (type: string) => {
    const iconClasses = "w-10 h-10";
    
    switch (type) {
      case "pdf":
        return <FileTextIcon className={cn(iconClasses, "text-red-500")} />;
      case "doc":
        return <FileTextIcon className={cn(iconClasses, "text-blue-500")} />;
      case "xls":
        return <FileTextIcon className={cn(iconClasses, "text-green-500")} />;
      case "image":
        return <FileIcon className={cn(iconClasses, "text-purple-500")} />;
      case "folder":
        return <FolderIcon className={cn(iconClasses, "text-yellow-500")} />;
      default:
        return <FileIcon className={cn(iconClasses, "text-gray-500")} />;
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Documents</h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1">
            Manage your files and folders
          </p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" className="flex items-center">
            <UploadIcon className="mr-2 h-4 w-4" />
            Upload
          </Button>
          <Button className="flex items-center bg-crm-primary hover:bg-crm-primary/90">
            <PlusIcon className="mr-2 h-4 w-4" />
            New Folder
          </Button>
        </div>
      </div>
      
      <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
        <div className="relative w-full md:w-80">
          <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input 
            type="text" 
            placeholder="Search documents..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)} 
            className="pl-10 rounded-lg"
          />
        </div>
        <div className="flex gap-2">
          <Button
            variant={viewMode === "grid" ? "default" : "outline"}
            size="icon"
            onClick={() => setViewMode("grid")}
            className={viewMode === "grid" ? "bg-crm-primary hover:bg-crm-primary/90" : ""}
          >
            <GridIcon className="h-4 w-4" />
          </Button>
          <Button
            variant={viewMode === "list" ? "default" : "outline"}
            size="icon"
            onClick={() => setViewMode("list")}
            className={viewMode === "list" ? "bg-crm-primary hover:bg-crm-primary/90" : ""}
          >
            <ListIcon className="h-4 w-4" />
          </Button>
        </div>
      </div>
      
      <Tabs defaultValue="all" className="w-full">
        <TabsList className="mb-6">
          <TabsTrigger value="all">All Files</TabsTrigger>
          <TabsTrigger value="recent">Recent</TabsTrigger>
          <TabsTrigger value="shared">Shared</TabsTrigger>
        </TabsList>
        
        <TabsContent value="all" className="mt-0">
          {viewMode === "grid" ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
              {filteredDocuments.map((doc) => (
                <Card key={doc.id} className="cursor-pointer hover:shadow-md transition-shadow overflow-hidden">
                  <div className="p-6 flex flex-col items-center text-center">
                    {getFileIcon(doc.type)}
                    <h3 className="font-medium mt-3 mb-1 text-gray-900 dark:text-white line-clamp-1">
                      {doc.name}
                    </h3>
                    {doc.project && (
                      <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">
                        {doc.project}
                      </p>
                    )}
                    <div className="flex items-center mt-2 text-xs text-gray-500 dark:text-gray-400">
                      <span>{doc.size || "-"}</span>
                      <span className="mx-2">•</span>
                      <span>{format(doc.updatedAt, "MMM d, yyyy")}</span>
                    </div>
                  </div>
                  <div className="px-4 py-3 bg-gray-50 dark:bg-gray-800 flex items-center justify-between">
                    <div className="flex items-center">
                      <Avatar className="h-6 w-6 mr-2">
                        <AvatarImage src={doc.updatedBy.avatar} />
                        <AvatarFallback className="text-[10px]">
                          {doc.updatedBy.name.split(" ").map(n => n[0]).join("")}
                        </AvatarFallback>
                      </Avatar>
                      <span className="text-xs">{doc.updatedBy.name}</span>
                    </div>
                    {doc.shared && (
                      <Badge variant="outline" className="text-xs px-1 py-0">Shared</Badge>
                    )}
                  </div>
                </Card>
              ))}
            </div>
          ) : (
            <div className="rounded-lg border border-gray-200 dark:border-gray-800 overflow-hidden">
              <div className="bg-gray-50 dark:bg-gray-800 px-6 py-4 text-sm font-medium grid grid-cols-12 gap-4">
                <div className="col-span-6">Name</div>
                <div className="col-span-2">Size</div>
                <div className="col-span-2">Modified</div>
                <div className="col-span-2">Modified By</div>
              </div>
              <div>
                {filteredDocuments.map((doc, i) => (
                  <div 
                    key={doc.id} 
                    className={cn(
                      "px-6 py-4 grid grid-cols-12 gap-4 items-center hover:bg-gray-50 dark:hover:bg-gray-800/50 cursor-pointer",
                      i !== filteredDocuments.length - 1 && "border-b border-gray-200 dark:border-gray-700"
                    )}
                  >
                    <div className="col-span-6 flex items-center">
                      <div className="mr-3">
                        {getFileIcon(doc.type)}
                      </div>
                      <div>
                        <p className="font-medium text-gray-900 dark:text-white">{doc.name}</p>
                        {doc.project && (
                          <p className="text-xs text-gray-500 dark:text-gray-400">
                            {doc.project}
                          </p>
                        )}
                      </div>
                      {doc.shared && (
                        <Badge variant="outline" className="ml-3 text-xs">Shared</Badge>
                      )}
                    </div>
                    <div className="col-span-2 text-gray-600 dark:text-gray-300">
                      {doc.size || "-"}
                    </div>
                    <div className="col-span-2 text-gray-600 dark:text-gray-300">
                      {format(doc.updatedAt, "MMM d, yyyy")}
                    </div>
                    <div className="col-span-2 flex items-center">
                      <Avatar className="h-7 w-7 mr-2">
                        <AvatarImage src={doc.updatedBy.avatar} />
                        <AvatarFallback className="text-xs">
                          {doc.updatedBy.name.split(" ").map(n => n[0]).join("")}
                        </AvatarFallback>
                      </Avatar>
                      <span className="text-sm text-gray-600 dark:text-gray-300">
                        {doc.updatedBy.name.split(" ")[0]}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="recent" className="mt-0">
          {viewMode === "grid" ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
              {recentDocuments.map((doc) => (
                <Card key={doc.id} className="cursor-pointer hover:shadow-md transition-shadow overflow-hidden">
                  <div className="p-6 flex flex-col items-center text-center">
                    {getFileIcon(doc.type)}
                    <h3 className="font-medium mt-3 mb-1 text-gray-900 dark:text-white line-clamp-1">
                      {doc.name}
                    </h3>
                    {doc.project && (
                      <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">
                        {doc.project}
                      </p>
                    )}
                    <div className="flex items-center mt-2 text-xs text-gray-500 dark:text-gray-400">
                      <span>{doc.size || "-"}</span>
                      <span className="mx-2">•</span>
                      <span>{format(doc.updatedAt, "MMM d, yyyy")}</span>
                    </div>
                  </div>
                  <div className="px-4 py-3 bg-gray-50 dark:bg-gray-800 flex items-center justify-between">
                    <div className="flex items-center">
                      <Avatar className="h-6 w-6 mr-2">
                        <AvatarImage src={doc.updatedBy.avatar} />
                        <AvatarFallback className="text-[10px]">
                          {doc.updatedBy.name.split(" ").map(n => n[0]).join("")}
                        </AvatarFallback>
                      </Avatar>
                      <span className="text-xs">{doc.updatedBy.name}</span>
                    </div>
                    {doc.shared && (
                      <Badge variant="outline" className="text-xs px-1 py-0">Shared</Badge>
                    )}
                  </div>
                </Card>
              ))}
            </div>
          ) : (
            <div className="rounded-lg border border-gray-200 dark:border-gray-800 overflow-hidden">
              <div className="bg-gray-50 dark:bg-gray-800 px-6 py-4 text-sm font-medium grid grid-cols-12 gap-4">
                <div className="col-span-6">Name</div>
                <div className="col-span-2">Size</div>
                <div className="col-span-2">Modified</div>
                <div className="col-span-2">Modified By</div>
              </div>
              <div>
                {recentDocuments.map((doc, i) => (
                  <div 
                    key={doc.id} 
                    className={cn(
                      "px-6 py-4 grid grid-cols-12 gap-4 items-center hover:bg-gray-50 dark:hover:bg-gray-800/50 cursor-pointer",
                      i !== recentDocuments.length - 1 && "border-b border-gray-200 dark:border-gray-700"
                    )}
                  >
                    <div className="col-span-6 flex items-center">
                      <div className="mr-3">
                        {getFileIcon(doc.type)}
                      </div>
                      <div>
                        <p className="font-medium text-gray-900 dark:text-white">{doc.name}</p>
                        {doc.project && (
                          <p className="text-xs text-gray-500 dark:text-gray-400">
                            {doc.project}
                          </p>
                        )}
                      </div>
                      {doc.shared && (
                        <Badge variant="outline" className="ml-3 text-xs">Shared</Badge>
                      )}
                    </div>
                    <div className="col-span-2 text-gray-600 dark:text-gray-300">
                      {doc.size || "-"}
                    </div>
                    <div className="col-span-2 text-gray-600 dark:text-gray-300">
                      {format(doc.updatedAt, "MMM d, yyyy")}
                    </div>
                    <div className="col-span-2 flex items-center">
                      <Avatar className="h-7 w-7 mr-2">
                        <AvatarImage src={doc.updatedBy.avatar} />
                        <AvatarFallback className="text-xs">
                          {doc.updatedBy.name.split(" ").map(n => n[0]).join("")}
                        </AvatarFallback>
                      </Avatar>
                      <span className="text-sm text-gray-600 dark:text-gray-300">
                        {doc.updatedBy.name.split(" ")[0]}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="shared" className="mt-0">
          {viewMode === "grid" ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
              {sharedDocuments.map((doc) => (
                <Card key={doc.id} className="cursor-pointer hover:shadow-md transition-shadow overflow-hidden">
                  <div className="p-6 flex flex-col items-center text-center">
                    {getFileIcon(doc.type)}
                    <h3 className="font-medium mt-3 mb-1 text-gray-900 dark:text-white line-clamp-1">
                      {doc.name}
                    </h3>
                    {doc.project && (
                      <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">
                        {doc.project}
                      </p>
                    )}
                    <div className="flex items-center mt-2 text-xs text-gray-500 dark:text-gray-400">
                      <span>{doc.size || "-"}</span>
                      <span className="mx-2">•</span>
                      <span>{format(doc.updatedAt, "MMM d, yyyy")}</span>
                    </div>
                  </div>
                  <div className="px-4 py-3 bg-gray-50 dark:bg-gray-800 flex items-center justify-between">
                    <div className="flex items-center">
                      <Avatar className="h-6 w-6 mr-2">
                        <AvatarImage src={doc.updatedBy.avatar} />
                        <AvatarFallback className="text-[10px]">
                          {doc.updatedBy.name.split(" ").map(n => n[0]).join("")}
                        </AvatarFallback>
                      </Avatar>
                      <span className="text-xs">{doc.updatedBy.name}</span>
                    </div>
                    <Badge variant="outline" className="text-xs px-1 py-0">Shared</Badge>
                  </div>
                </Card>
              ))}
            </div>
          ) : (
            <div className="rounded-lg border border-gray-200 dark:border-gray-800 overflow-hidden">
              <div className="bg-gray-50 dark:bg-gray-800 px-6 py-4 text-sm font-medium grid grid-cols-12 gap-4">
                <div className="col-span-6">Name</div>
                <div className="col-span-2">Size</div>
                <div className="col-span-2">Modified</div>
                <div className="col-span-2">Modified By</div>
              </div>
              <div>
                {sharedDocuments.map((doc, i) => (
                  <div 
                    key={doc.id} 
                    className={cn(
                      "px-6 py-4 grid grid-cols-12 gap-4 items-center hover:bg-gray-50 dark:hover:bg-gray-800/50 cursor-pointer",
                      i !== sharedDocuments.length - 1 && "border-b border-gray-200 dark:border-gray-700"
                    )}
                  >
                    <div className="col-span-6 flex items-center">
                      <div className="mr-3">
                        {getFileIcon(doc.type)}
                      </div>
                      <div>
                        <p className="font-medium text-gray-900 dark:text-white">{doc.name}</p>
                        {doc.project && (
                          <p className="text-xs text-gray-500 dark:text-gray-400">
                            {doc.project}
                          </p>
                        )}
                      </div>
                      <Badge variant="outline" className="ml-3 text-xs">Shared</Badge>
                    </div>
                    <div className="col-span-2 text-gray-600 dark:text-gray-300">
                      {doc.size || "-"}
                    </div>
                    <div className="col-span-2 text-gray-600 dark:text-gray-300">
                      {format(doc.updatedAt, "MMM d, yyyy")}
                    </div>
                    <div className="col-span-2 flex items-center">
                      <Avatar className="h-7 w-7 mr-2">
                        <AvatarImage src={doc.updatedBy.avatar} />
                        <AvatarFallback className="text-xs">
                          {doc.updatedBy.name.split(" ").map(n => n[0]).join("")}
                        </AvatarFallback>
                      </Avatar>
                      <span className="text-sm text-gray-600 dark:text-gray-300">
                        {doc.updatedBy.name.split(" ")[0]}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Documents;
