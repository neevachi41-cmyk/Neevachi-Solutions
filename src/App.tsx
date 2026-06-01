import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { Toaster } from '@/components/ui/toaster';
import { Toaster as Sonner } from '@/components/ui/sonner';
import { TooltipProvider } from '@/components/ui/tooltip';

import { AuthProvider, useAuth } from '@/contexts/AuthContext';

import { Layout } from './components/Layout';
import { ScrollToTop } from './components/ScrollToTop';

import About from './pages/About';
import AllProjects from './pages/AllProjects';
import Blogs from './pages/Blogs';
import CategoryPage from './pages/CategoryPage';
import Contact from './pages/Contact';
import Index from './pages/Index';
import Login from './pages/Login';
import NotFound from './pages/NotFound';
import ProductDetail from './pages/ProductDetail';
import ProjectDetailTemp from './pages/ProjectDetailTemp';
import Projects from './pages/Projects';
import Quotes from './pages/Quotes';
import Register from './pages/Register';
import Services from './pages/Services';
import Shop from './pages/Shop';
import Workflow from './pages/Workflow';
import AdminDashboard from './pages/AdminDashboard';
import SliderUpdatesAdmin from './pages/SliderUpdatesAdmin';

const queryClient = new QueryClient();

// Protected Route Component
const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();
  
  if (loading) {
    return <div>Loading...</div>; // Or a loading spinner
  }
  
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  
  return <>{children}</>;
};

const App: React.FC = () => {
  return (
    <React.StrictMode>
      <QueryClientProvider client={queryClient}>
        <Router>
          <AuthProvider>
            <TooltipProvider>
              <Toaster />
              <Sonner />
              <ScrollToTop />
              <Routes>
                {/* Public routes with layout */}
                <Route element={<Layout />}>
                  <Route path="/" element={<Index />} />
                  <Route path="/services" element={<Services />} />
                  <Route path="/workflow" element={<Workflow />} />
                  <Route path="/projects" element={<Projects />} />
                  <Route path="/projects/:projectId" element={<ProjectDetailTemp />} />
                  <Route path="/blogs" element={<Blogs />} />
                  <Route path="/quotes" element={<Quotes />} />
                  <Route path="/about" element={<About />} />
                  <Route path="/contact" element={<Contact />} />
                  <Route path="/shop" element={<Shop />} />
                  <Route path="/shop/category/:categoryId" element={<CategoryPage />} />
                  <Route path="/shop/product/:productId" element={<ProductDetail />} />
                  <Route path="/all-projects" element={<AllProjects />} />
                  
                  {/* Protected routes */}
                  <Route path="/admin" element={
                    <ProtectedRoute>
                      <AdminDashboard />
                    </ProtectedRoute>
                  } />
                  <Route path="/admin/slider-updates" element={
                    <ProtectedRoute>
                      <SliderUpdatesAdmin />
                    </ProtectedRoute>
                  } />
                  
                  <Route path="*" element={<NotFound />} />
                </Route>
                
                {/* Auth routes without layout */}
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
              </Routes>
            </TooltipProvider>
          </AuthProvider>
        </Router>
      </QueryClientProvider>
    </React.StrictMode>
  );
};

export default App;
