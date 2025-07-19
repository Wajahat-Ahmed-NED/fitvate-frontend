import React, { useState } from 'react';
import { Search, AlertCircle, CheckCircle, XCircle, Clock } from 'lucide-react';
import { ApiIssue } from '../../types';
import { clsx } from 'clsx';

export const IssueTracker: React.FC = () => {
  const [requestId, setRequestId] = useState('');
  const [selectedIssue, setSelectedIssue] = useState<ApiIssue | null>(null);

  const [issues] = useState<ApiIssue[]>([
    {
      id: '1',
      requestId: 'req_123456789',
      endpoint: '/api/exercises',
      method: 'POST',
      statusCode: 500,
      errorMessage: 'Internal Server Error - Plan description too long',
      requestData: {
        planName: 'My Workout Plan',
        planDescription: 'A very long description that exceeds the character limit...',
        exercises: [{ name: 'Push-ups', sets: 3, reps: 10 }]
      },
      responseData: {
        error: 'Internal Server Error',
        message: 'Plan description exceeds maximum length'
      },
      timestamp: '2024-01-20T10:30:00Z',
    },
    {
      id: '2',
      requestId: 'req_987654321',
      endpoint: '/api/exercises',
      method: 'POST',
      statusCode: 500,
      errorMessage: 'Duplicate exercise in same day',
      requestData: {
        dayId: 'day_123',
        exercises: [
          { name: 'Squats', sets: 3, reps: 15 },
          { name: 'Squats', sets: 3, reps: 15 }
        ]
      },
      responseData: {
        error: 'Duplicate Exercise',
        message: 'Cannot add same exercise twice in one day'
      },
      timestamp: '2024-01-20T11:45:00Z',
    },
  ]);

  const handleSearch = () => {
    const issue = issues.find(i => i.requestId === requestId);
    setSelectedIssue(issue || null);
  };

  const getStatusIcon = (statusCode: number) => {
    if (statusCode >= 200 && statusCode < 300) {
      return <CheckCircle className="w-5 h-5 text-green-500" />;
    } else if (statusCode >= 400 && statusCode < 500) {
      return <AlertCircle className="w-5 h-5 text-yellow-500" />;
    } else {
      return <XCircle className="w-5 h-5 text-red-500" />;
    }
  };

  const getStatusColor = (statusCode: number) => {
    if (statusCode >= 200 && statusCode < 300) {
      return 'bg-green-100 text-green-800';
    } else if (statusCode >= 400 && statusCode < 500) {
      return 'bg-yellow-100 text-yellow-800';
    } else {
      return 'bg-red-100 text-red-800';
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Issue Tracker</h2>
        <p className="text-gray-600">Track and analyze API request/response issues</p>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Search by Request ID</h3>
        <div className="flex space-x-3">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Enter request ID (e.g., req_123456789)"
              value={requestId}
              onChange={(e) => setRequestId(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <button
            onClick={handleSearch}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Search
          </button>
        </div>
      </div>

      {selectedIssue && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Issue Details</h3>
            <div className="flex items-center space-x-2">
              {getStatusIcon(selectedIssue.statusCode)}
              <span className={clsx(
                'px-2 py-1 text-xs font-medium rounded-full',
                getStatusColor(selectedIssue.statusCode)
              )}>
                {selectedIssue.statusCode}
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div>
              <h4 className="font-medium text-gray-900 mb-3">Request Information</h4>
              <div className="space-y-3">
                <div>
                  <label className="text-sm font-medium text-gray-600">Request ID</label>
                  <p className="text-sm text-gray-900 font-mono bg-gray-50 px-2 py-1 rounded">
                    {selectedIssue.requestId}
                  </p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-600">Endpoint</label>
                  <p className="text-sm text-gray-900 font-mono bg-gray-50 px-2 py-1 rounded">
                    {selectedIssue.method} {selectedIssue.endpoint}
                  </p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-600">Timestamp</label>
                  <p className="text-sm text-gray-900">
                    {new Date(selectedIssue.timestamp).toLocaleString()}
                  </p>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-600">Error Message</label>
                  <p className="text-sm text-red-600 bg-red-50 px-2 py-1 rounded">
                    {selectedIssue.errorMessage}
                  </p>
                </div>
              </div>
            </div>

            <div>
              <h4 className="font-medium text-gray-900 mb-3">Request Data</h4>
              <div className="bg-gray-50 rounded-lg p-4">
                <pre className="text-sm text-gray-800 overflow-x-auto">
                  {JSON.stringify(selectedIssue.requestData, null, 2)}
                </pre>
              </div>
            </div>
          </div>

          <div className="mt-6">
            <h4 className="font-medium text-gray-900 mb-3">Response Data</h4>
            <div className="bg-gray-50 rounded-lg p-4">
              <pre className="text-sm text-gray-800 overflow-x-auto">
                {JSON.stringify(selectedIssue.responseData, null, 2)}
              </pre>
            </div>
          </div>
        </div>
      )}

      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">Recent Issues</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Request ID
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Endpoint
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Error
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Time
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {issues.map((issue) => (
                <tr
                  key={issue.id}
                  className="hover:bg-gray-50 cursor-pointer"
                  onClick={() => setSelectedIssue(issue)}
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <code className="text-sm text-gray-900 bg-gray-100 px-2 py-1 rounded">
                      {issue.requestId}
                    </code>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center space-x-2">
                      <span className="text-xs bg-gray-200 text-gray-700 px-2 py-1 rounded">
                        {issue.method}
                      </span>
                      <span className="text-sm text-gray-900">{issue.endpoint}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center space-x-2">
                      {getStatusIcon(issue.statusCode)}
                      <span className={clsx(
                        'px-2 py-1 text-xs font-medium rounded-full',
                        getStatusColor(issue.statusCode)
                      )}>
                        {issue.statusCode}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-900 max-w-xs truncate">
                      {issue.errorMessage}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(issue.timestamp).toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};