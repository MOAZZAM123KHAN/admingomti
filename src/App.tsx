import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Patients from "./pages/Patients";
import PatientDetail from "./pages/PatientDetail";
import Appointments from "./pages/Appointments";
import TodaysAppointments from "./pages/TodaysAppointments";
import WalkInPatient from "./pages/WalkInPatient";
import Blogs from "./pages/Blogs";
import BlogEditor from "./pages/BlogEditor";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/login" element={<Login />} />
            
            <Route path="/" element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            } />
            
            <Route path="/patients" element={
              <ProtectedRoute>
                <Patients />
              </ProtectedRoute>
            } />
            
            <Route path="/patients/:id" element={
              <ProtectedRoute>
                <PatientDetail />
              </ProtectedRoute>
            } />
            
            <Route path="/appointments" element={
              <ProtectedRoute>
                <Appointments />
              </ProtectedRoute>
            } />
            
            <Route path="/appointments/today" element={
              <ProtectedRoute>
                <TodaysAppointments />
              </ProtectedRoute>
            } />
            
            <Route path="/walk-in" element={
              <ProtectedRoute>
                <WalkInPatient />
              </ProtectedRoute>
            } />
            
            <Route path="/blogs" element={
              <ProtectedRoute>
                <Blogs />
              </ProtectedRoute>
            } />
            
            <Route path="/blogs/new" element={
              <ProtectedRoute>
                <BlogEditor />
              </ProtectedRoute>
            } />
            
            <Route path="/blogs/:id/edit" element={
              <ProtectedRoute>
                <BlogEditor />
              </ProtectedRoute>
            } />
            
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
