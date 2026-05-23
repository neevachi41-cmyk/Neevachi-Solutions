import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronDown, User, LogOut, FileText } from 'lucide-react';
import { useClickOutside } from '../hooks/useClickOutside';

interface ProfileDropdownProps {
  userName: string;
  onLogout: () => void;
}

const ProfileDropdown = ({ userName, onLogout }: ProfileDropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useClickOutside(() => setIsOpen(false));

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 focus:outline-none"
      >
        <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white">
          {userName.charAt(0).toUpperCase()}
        </div>
        <span className="hidden md:inline text-sm font-medium text-gray-700">
          {userName}
        </span>
        <ChevronDown className={`h-4 w-4 text-gray-500 transition-transform ${isOpen ? 'transform rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50">
          <div className="px-4 py-2 border-b">
            <p className="text-sm text-gray-700">Welcome back!</p>
            <p className="text-sm font-medium text-gray-900 truncate">{userName}</p>
          </div>
          <Link
            to="/my-quotations"
            className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            onClick={() => setIsOpen(false)}
          >
            <FileText className="mr-3 h-5 w-5 text-gray-400" />
            My Quotations
          </Link>
          <Link
            to="/profile"
            className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            onClick={() => setIsOpen(false)}
          >
            <User className="mr-3 h-5 w-5 text-gray-400" />
            Profile
          </Link>
          <button
            onClick={() => {
              onLogout();
              setIsOpen(false);
            }}
            className="w-full text-left flex items-center px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
          >
            <LogOut className="mr-3 h-5 w-5 text-red-400" />
            Sign out
          </button>
        </div>
      )}
    </div>
  );
};

export default ProfileDropdown;
