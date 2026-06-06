import { useEffect, useState } from 'react';
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';

import { cn } from '@/lib/utils';
import { useClickOutside } from '@/hooks/useClickOutside';

import { ChevronDown, FileText, LogOut, Menu, Shield, User, X, Zap } from 'lucide-react';

const navItems = [
  { name: 'Home', path: '/' },
  { name: 'Shop', path: '/shop' },
  { name: 'Services', path: '/services' },
  { name: 'Projects', path: '/projects' },
  { name: 'Blogs', path: '/blogs' },
  { name: 'Get Quotes', path: '/quotes' },
  { name: 'About', path: '/about' },
  { name: 'Contact', path: '/contact' },
];

const ProfileDropdown = ({ userName, isAdmin }: { userName: string; isAdmin: boolean }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useClickOutside(() => setIsOpen(false));
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/login');
    window.location.reload();
  };

  return (
    <div className="relative ml-4" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 focus:outline-none"
        aria-label="User menu"
      >
        <div className="w-9 h-9 rounded-full bg-gradient-to-r from-blue-500 to-blue-600 flex items-center justify-center text-white">
          {userName.charAt(0).toUpperCase()}
        </div>
        <ChevronDown className={`h-4 w-4 text-gray-600 transition-transform ${isOpen ? 'transform rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-lg py-1 z-50 border border-gray-100">
          <div className="px-4 py-3 border-b border-gray-100">
            <p className="text-sm text-gray-500">Welcome back!</p>
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium text-gray-900 truncate">{userName}</p>
              {isAdmin && (
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                  Admin
                </span>
              )}
            </div>
          </div>
          <Link
            to="/my-quotations"
            className="flex items-center px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50"
            onClick={() => setIsOpen(false)}
          >
            <FileText className="mr-3 h-5 w-5 text-gray-400" />
            My Quotations
          </Link>
          <Link
            to="/profile"
            className="flex items-center px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50"
            onClick={() => setIsOpen(false)}
          >
            <User className="mr-3 h-5 w-5 text-gray-400" />
            My Profile
          </Link>
          {isAdmin && (
            <Link
              to="/admin"
              className="flex items-center px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50"
              onClick={() => setIsOpen(false)}
            >
              <Shield className="mr-3 h-5 w-5 text-gray-400" />
              Admin Dashboard
            </Link>
          )}
          <button
            onClick={() => {
              handleLogout();
              setIsOpen(false);
            }}
            className="w-full text-left flex items-center px-4 py-2.5 text-sm text-red-600 hover:bg-gray-50 border-t border-gray-100 mt-1"
          >
            <LogOut className="mr-3 h-5 w-5 text-red-400" />
            Sign out
          </button>
        </div>
      )}
    </div>
  );
};

export function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [user, setUser] = useState<{ name: string; isAdmin: boolean } | null>(null);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is logged in
    const userData = localStorage.getItem('user');
    if (userData) {
      try {
        const parsedUser = JSON.parse(userData);
        setUser(parsedUser);
      } catch (e) {
        console.error('Error parsing user data:', e);
      }
    }
  }, [location]);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/login');
    window.location.reload();
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 px-4 py-3 bg-white/95 backdrop-blur-md shadow-sm border-b border-gray-100">
      <div className="container mx-auto max-w-7xl">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <img
              src="/navbar logo.png"
              alt="Neevachi Solutions"
              className="w-32 h-auto object-contain"
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1">
            {navItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  cn(
                    "px-4 py-2 text-sm font-medium transition-colors duration-200 relative group",
                    isActive
                      ? "text-blue-600 font-semibold"
                      : "text-gray-600 hover:text-blue-600 hover:bg-primary/5"
                  )
                }
                onClick={(e) => {
                  e.currentTarget.blur();
                }}
              >
                {item.name}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-600 transition-all duration-300 group-hover:w-full"></span>
              </NavLink>
            ))}
            
            <div className="h-6 w-px bg-border mx-2"></div>
            
            {user ? (
              <div className="flex items-center">
                <ProfileDropdown userName={user.name} isAdmin={user.isAdmin} />
              </div>
            ) : (
              <>
                <NavLink
                  to="/login"
                  className="px-4 py-2 rounded-lg text-sm font-medium text-foreground/80 hover:text-primary hover:bg-primary/5 relative transition-colors duration-200"
                >
                  Login
                </NavLink>

                <NavLink
                  to="/register"
                  className="ml-2 px-4 py-2.5 rounded-lg text-sm font-medium bg-blue-600 hover:bg-blue-700 text-white relative transition-colors duration-200"
                >
                  <span className="flex items-center justify-center gap-1.5">
                    Get Started
                    <svg 
                      className="w-4 h-4" 
                      viewBox="0 0 24 24" 
                      fill="none"
                    >
                      <path 
                        d="M5 12H19M19 12L12 5M19 12L12 19" 
                        stroke="currentColor" 
                        strokeWidth="2" 
                        strokeLinecap="round" 
                        strokeLinejoin="round"
                      />
                    </svg>
                  </span>
                </NavLink>
              </>
            )}
          </nav>

          {/* Mobile menu button */}
          <button 
            className="md:hidden p-2 rounded-lg hover:bg-accent/10 text-foreground/80 hover:text-foreground transition-colors"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-100">
            <div className="px-2 pt-2 pb-4 space-y-1">
              {navItems.map((item) => (
                <NavLink
                  key={item.path}
                  to={item.path}
                  className={({ isActive }) =>
                    cn(
                      'block px-4 py-3 text-base font-medium rounded-lg transition-colors duration-200',
                      isActive
                        ? 'bg-blue-50 text-blue-600'
                        : 'text-gray-700 hover:bg-gray-50 hover:text-blue-600'
                    )
                  }
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item.name}
                </NavLink>
              ))}
              
              {user ? (
                <>
                  <div className="h-px bg-gray-200 my-2"></div>
                  <Link
                    to="/my-quotations"
                    className="block px-4 py-3 text-base font-medium text-gray-700 hover:bg-gray-50 rounded-lg"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    My Quotations
                  </Link>
                  <Link
                    to="/profile"
                    className="block px-4 py-3 text-base font-medium text-gray-700 hover:bg-gray-50 rounded-lg"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    My Profile
                  </Link>
                  {user.isAdmin && (
                    <Link
                      to="/admin"
                      className="block px-4 py-3 text-base font-medium text-purple-600 hover:bg-purple-50 rounded-lg"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      Admin Dashboard
                    </Link>
                  )}
                  <button
                    onClick={() => {
                      handleLogout();
                      setIsMobileMenuOpen(false);
                    }}
                    className="w-full text-left px-4 py-3 text-base font-medium text-red-600 hover:bg-red-50 rounded-lg"
                  >
                    Sign Out
                  </button>
                </>
              ) : (
                <>
                  <div className="h-px bg-gray-200 my-2"></div>
                  <Link
                    to="/login"
                    className="block px-4 py-3 text-base font-medium text-blue-600 hover:bg-blue-50 rounded-lg"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Login
                  </Link>
                  <Link
                    to="/register"
                    className="block w-full text-center px-4 py-3 text-base font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Get Started
                  </Link>
                </>
              )}
            </div>
        </div>
      )}
    </header>
  );
}
