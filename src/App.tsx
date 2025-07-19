import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Sidebar } from './components/Layout/Sidebar';
import { Header } from './components/Layout/Header';
import { Dashboard } from './components/Dashboard/Dashboard';
import { UserManagement } from './components/Users/UserManagement';
import { ArticleManagement } from './components/Articles/ArticleManagement';
import { IssueTracker } from './components/Issues/IssueTracker';

function App() {
  return (
    <Router>
      <div className="flex h-screen bg-gray-50">
        <Sidebar />
        <div className="flex-1 flex flex-col overflow-hidden">
          <Header />
          <main className="flex-1 overflow-y-auto bg-gray-50">
            <Routes>
              <Route path="/" element={<Navigate to="/dashboard" replace />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/users" element={<UserManagement />} />
              <Route path="/articles" element={<ArticleManagement />} />
              <Route path="/analytics" element={<Dashboard />} />
              <Route path="/issues" element={<IssueTracker />} />
            </Routes>
          </main>
        </div>
      </div>
    </Router>
  );
}

export default App;