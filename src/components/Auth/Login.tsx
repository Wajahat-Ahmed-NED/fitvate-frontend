import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSetAtom } from 'jotai';
import { Eye, EyeOff, Lock, Mail, Shield } from 'lucide-react';
import { clsx } from 'clsx';
import { adminLogin } from '../../api/adminPanelAPI';
import { loginAtom } from '../../store/auth';

export const Login: React.FC = () => {
  const navigate = useNavigate();
  const login = useSetAtom(loginAtom);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    role: 'admin'
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      adminLogin(formData).then((res)=>{
        // console.log("res > ",res)
        const token = res?.data?.data?.token;
        if(token){
          localStorage.setItem('authToken', token);
          login({ token: token});
          // Redirect to dashboard
          setTimeout(() => {
            navigate('/dashboard');
          }, 1000);
        }
      })
      .catch((err)=>{
        setError(err?.data?.message || 'Login failed. Please try again.')
      })
    } catch (err) {
      setError('Network error. Please check your connection and try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-8">
        <div className="text-center mb-8">
          {/* <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-600 rounded-full mb-4">
            <Shield className="w-8 h-8 text-white" />
          </div> */}
          <h1 className="text-2xl font-bold text-gray-900 mb-2">FITVATE</h1>
          <p className="text-gray-600">Sign in to your account</p>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-red-600 text-sm">{error}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
              Email Address
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                placeholder="admin@example.com"
              />
            </div>
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
              Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type={showPassword ? 'text' : 'password'}
                id="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                required
                className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                placeholder="Enter your password"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
          </div>

          {/* <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                className="w-4 h-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700">
                Remember me
              </label>
            </div>
            <button
              type="button"
              className="text-sm text-blue-600 hover:text-blue-500 transition-colors"
            >
              Forgot password?
            </button>
          </div> */}

          <button
            type="submit"
            disabled={isLoading}
            className={clsx(
              'w-full py-3 px-4 rounded-lg font-medium transition-colors',
              isLoading
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-blue-600 hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2',
              'text-white'
            )}
          >
            {isLoading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>

        {/* <div className="mt-8 text-center">
          <p className="text-sm text-gray-600">
            Need help?{' '}
            <button className="text-blue-600 hover:text-blue-500 transition-colors">
              Contact Support
            </button>
          </p>
        </div> */}
      </div>
    </div>
  );
};