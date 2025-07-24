import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAtomValue } from 'jotai';
import { isAuthenticatedAtom } from '../../store/auth';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
    const isAuthenticated = useAtomValue(isAuthenticatedAtom);

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
};