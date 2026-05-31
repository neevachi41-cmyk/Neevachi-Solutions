import { Outlet } from 'react-router-dom';
import { motion } from 'framer-motion';

import { Footer } from './Footer';
import { Header } from './Header';
import LatestUpdatesSlider from './LatestUpdatesSlider';

export function Layout() {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      {/* Fixed Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-sm border-b border-gray-100 shadow-sm">
        <Header />
      </header>
      
      {/* Latest Updates Slider - Below Navbar */}
      <div className="pt-20">
        <LatestUpdatesSlider />
      </div>
      
      {/* Main Content */}
      <div className="flex-grow">
        <main>
          <Outlet />
        </main>
      </div>
      
      {/* Footer */}
      <footer>
        <Footer />
      </footer>
    </div>
  );
}
