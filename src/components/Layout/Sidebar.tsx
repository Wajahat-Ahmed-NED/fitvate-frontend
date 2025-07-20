import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { 
  Users, 
  FileText, 
  BarChart3, 
  AlertCircle, 
  Settings,
  Home,
  ChevronRight
} from 'lucide-react';
import { clsx } from 'clsx';

const menuItems = [
  { path: '/dashboard', label: 'Dashboard', icon: Home },
  { path: '/users', label: 'User Management', icon: Users },
  { path: '/articles', label: 'Articles', icon: FileText },
  { path: '/issues', label: 'Issues', icon: AlertCircle },
  { path: '/settings', label: 'Settings', icon: Settings },
];

export const Sidebar: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <div className="bg-gray-900 text-white w-64 min-h-screen p-4">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-blue-400">Admin Panel</h1>
        <p className="text-gray-400 text-sm mt-1">Fitness App Management</p>
      </div>
      
      <nav className="space-y-2">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;
          
          return (
            <button
              key={item.path}
              onClick={() => navigate(item.path)}
              className={clsx(
                'w-full flex items-center px-4 py-3 text-left rounded-lg transition-all duration-200',
                isActive
                  ? 'bg-blue-600 text-white shadow-lg'
                  : 'text-gray-300 hover:bg-gray-800 hover:text-white'
              )}
            >
              <Icon className="w-5 h-5 mr-3" />
              <span className="font-medium">{item.label}</span>
              {isActive && <ChevronRight className="w-4 h-4 ml-auto" />}
            </button>
          );
        })}
      </nav>
    </div>
  );
};