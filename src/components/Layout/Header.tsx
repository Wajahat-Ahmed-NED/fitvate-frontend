import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Bell, User, LogOut } from 'lucide-react';
import { useAtomValue, useSetAtom } from 'jotai';
import { logoutAtom } from '../../store/auth';

export const Header: React.FC = () => {
  const location = useLocation();
  const logout = useSetAtom(logoutAtom);  
  const navigate = useNavigate();


  const getSectionTitle = (pathname: string) => {
    switch (pathname) {
      case '/':
      case '/dashboard':
        return 'Dashboard';
      case '/users':
        return 'User Management';
      case '/articles':
        return 'Article Management';
      case '/analytics':
        return 'Analytics';
      case '/issues':
        return 'Issue Tracker';
      case '/settings':
        return 'Settings';
      default:
        return 'Dashboard';
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <header className="bg-white shadow-sm border-b border-gray-200 px-6 py-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">{getSectionTitle(location.pathname)}</h1>
          <p className="text-gray-600 text-sm">Manage your fitness application</p>
        </div>
        
        <div className="flex items-center space-x-4">
          <button className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors">
            <Bell className="w-5 h-5" />
          </button>
          
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
              <User className="w-4 h-4 text-white" />
            </div>
            <div className="text-sm">
              <p className="font-medium text-gray-900">Admin User</p>
              <p className="text-gray-500">admin@example.com</p>
            </div>
          </div>
          
          <button 
            onClick={handleLogout} className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors">
            <LogOut className="w-5 h-5" />
          </button>
        </div>
      </div>
    </header>
  );
};