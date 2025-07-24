import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Login } from './components/Auth/Login';
import { ProtectedRoute } from './components/Auth/ProtectedRoute';
import { Sidebar } from './components/Layout/Sidebar';
import { Header } from './components/Layout/Header';
import { Dashboard } from './components/Dashboard/Dashboard';
import { UserManagement } from './components/Users/UserManagement';
import { ArticleManagement } from './components/Articles/ArticleManagement';
import { IssueTracker } from './components/Issues/IssueTracker';
import { Settings } from './components/Settings/Settings';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Navigate to="/dashboard" replace />} />
        <Route
          path="/*"
          element={
            <ProtectedRoute>
              <div className="flex h-screen bg-gray-50">
                <Sidebar />
                <div className="flex-1 flex flex-col overflow-hidden">
                  <Header />
                  <main className="flex-1 overflow-y-auto bg-gray-50">
                    <Routes>
                      <Route path="/dashboard" element={<Dashboard />} />
                      <Route path="/users" element={<UserManagement />} />
                      <Route path="/articles" element={<ArticleManagement />} />
                      <Route path="/analytics" element={<Dashboard />} />
                      <Route path="/issues" element={<IssueTracker />} />
                      <Route path="/settings" element={<Settings />} />
                    </Routes>
                  </main>
                </div>
              </div>
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;