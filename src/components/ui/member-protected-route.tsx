import React from 'react';
import { Navigate } from 'react-router-dom';
import { useMember } from '@/integrations';

interface MemberProtectedRouteProps {
  children: React.ReactNode;
}

export function MemberProtectedRoute({ children }: MemberProtectedRouteProps) {
  const { isAuthenticated, isLoading } = useMember();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
}
