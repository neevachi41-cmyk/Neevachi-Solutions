import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Analytics } from "@vercel/analytics/react"

import { Toaster } from '@/components/ui/toaster';
import { Toaster as Sonner } from '@/components/ui/sonner';
import { TooltipProvider } from '@/components/ui/tooltip';

import { AuthProvider, useAuth } from '@/contexts/AuthContext';

import { Layout } from './components/Layout';
import { ScrollToTop } from './components/ScrollToTop';
import ProtectedRoute from './components/ProtectedRoute';

import About from './pages/About';
import AllProjects from './pages/AllProjects';
import Blogs from './pages/Blogs';
import CategoryPage from './pages/CategoryPage';
import Contact from './pages/Contact';
import Index from './pages/Index';
import Login from './pages/Login';
import MyProjects from './pages/MyProjects';
import MyQuotations from './pages/MyQuotations';
import NotFound from './pages/NotFound';
import Profile from './pages/Profile';
import PcbQuotation from './pages/PcbQuotation';
import PrintingService from './pages/PrintingService';
import ProductDetail from './pages/ProductDetail';
import ProjectDetailTemp from './pages/ProjectDetailTemp';
import Projects from './pages/Projects';
import Quotes from './pages/Quotes';
import Register from './pages/Register';
import RequestCustomProduct from './pages/RequestCustomProduct';
import Services from './pages/Services';
import Shop from './pages/Shop';
import Workflow from './pages/Workflow';
import AdminDashboard from './pages/AdminDashboard';
import SliderUpdatesAdmin from './pages/SliderUpdatesAdmin';
import ServicesAdmin from './pages/ServicesAdmin';
import UsersAdmin from './pages/UsersAdmin';
import BlogAdmin from './pages/BlogAdmin';
import ContactAdmin from './pages/ContactAdmin';
import ProjectsAdmin from './pages/ProjectsAdmin';
import Unauthorized from './pages/Unauthorized';

const queryClient = new QueryClient();

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
              <Analytics />
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
                  <Route path="/printing-service" element={<PrintingService />} />
                  <Route path="/pcb-quotation" element={<PcbQuotation />} />
                  <Route path="/request-custom-product" element={<RequestCustomProduct />} />
                  
                  {/* Protected user routes */}
                  <Route path="/my-projects" element={<ProtectedRoute><MyProjects /></ProtectedRoute>} />
                  <Route path="/my-quotations" element={<ProtectedRoute><MyQuotations /></ProtectedRoute>} />
                  <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
                  
                  {/* Protected routes */}
                  <Route path="/admin" element={<ProtectedRoute allowedRoles={['admin']}><AdminDashboard /></ProtectedRoute>} />
                  <Route path="/admin/slider-updates" element={<ProtectedRoute allowedRoles={['admin']}><SliderUpdatesAdmin /></ProtectedRoute>} />
                  <Route path="/admin/services" element={<ProtectedRoute allowedRoles={['admin']}><ServicesAdmin /></ProtectedRoute>} />
                  <Route path="/admin/users" element={<ProtectedRoute allowedRoles={['admin']}><UsersAdmin /></ProtectedRoute>} />
                  <Route path="/admin/blog" element={<ProtectedRoute allowedRoles={['admin']}><BlogAdmin /></ProtectedRoute>} />
                  <Route path="/admin/contact" element={<ProtectedRoute allowedRoles={['admin']}><ContactAdmin /></ProtectedRoute>} />
                  <Route path="/admin/projects" element={<ProtectedRoute allowedRoles={['admin']}><ProjectsAdmin /></ProtectedRoute>} />
                  
                  <Route path="*" element={<NotFound />} />
                </Route>
                
                {/* Auth routes without layout */}
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/unauthorized" element={<Unauthorized />} />
              </Routes>
            </TooltipProvider>
          </AuthProvider>
        </Router>
      </QueryClientProvider>
    </React.StrictMode>
  );
};

export default App;
