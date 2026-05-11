import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuthStore } from '../store/useAuthStore';
import { UserRole } from '../types/auth';

interface Props {
  allowedRoles?: UserRole[];
}

export const ProtectedRoute = ({ allowedRoles }: Props) => {
  const { isAuthenticated, user } = useAuthStore();
  const location = useLocation();

  // 1. Not logged in? Redirect to login but save where they were trying to go
  if (!isAuthenticated || !user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // 2. Worker logic: Must change password first
  if (user.needsPasswordChange && location.pathname !== '/change-password') {
    return <Navigate to="/change-password" replace />;
  }

  // 3. Verification logic: Must verify OTP first
  if (!user.isVerified && location.pathname !== '/verify-otp') {
    return <Navigate to="/verify-otp" replace />;
  }

  // 4. Permission logic: Check roles
  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return <Navigate to="/unauthorized" replace />;
  }

  // If all clear, render the child routes
  return <Outlet />;
};
