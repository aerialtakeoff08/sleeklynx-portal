
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Layout } from "./components/layout/Layout";
import Dashboard from "./pages/Dashboard";
import Projects from "./pages/Projects";
import CalendarPage from "./pages/Calendar";
import Documents from "./pages/Documents";
import Settings from "./pages/Settings";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          <Route 
            path="/dashboard" 
            element={
              <Layout>
                <Dashboard />
              </Layout>
            } 
          />
          <Route 
            path="/projects" 
            element={
              <Layout>
                <Projects />
              </Layout>
            } 
          />
          <Route 
            path="/calendar" 
            element={
              <Layout>
                <CalendarPage />
              </Layout>
            } 
          />
          <Route 
            path="/documents" 
            element={
              <Layout>
                <Documents />
              </Layout>
            } 
          />
          <Route 
            path="/settings" 
            element={
              <Layout>
                <Settings />
              </Layout>
            } 
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
