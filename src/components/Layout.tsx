import { Outlet } from 'react-router-dom';
import { motion } from 'framer-motion';

import { Footer } from './Footer';
import { Header } from './Header';

export function Layout() {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      {/* Fixed Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-sm border-b border-gray-100 shadow-sm">
        <Header />
      </header>
      
      {/* Main Content */}
      <div className="pt-24 flex-grow">
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
