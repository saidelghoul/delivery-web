import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ProtectedRoute } from "./layouts/ProtectedRoute";
import { MainLayout } from "./pages/layouts/MainLayout";

// Public pages
import LandingPage from "./pages/public/Landingpage";

// Auth pages
import LoginPage from "./pages/auth/LoginPage";
import RegisterPage from "./pages/auth/RegisterPage";
import VerifyOTPPage from "./pages/auth/VerifyOTPPage";
import ForgotPasswordPage from "./pages/auth/Forgotpasswordpage";
import ResetPasswordPage from "./pages/auth/ResetPasswordPage";

// App pages
import DashboardPage from "./pages/core/DashboardPage";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* ── PUBLIC ── */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="/reset-password" element={<ResetPasswordPage />} />
        <Route path="/unauthorized" element={<div>You don't have access to this page.</div>} />

        {/* ── AUTHENTICATED (no layout — forced steps) ── */}
        <Route element={<ProtectedRoute />}>
          <Route path="/verify-otp" element={<VerifyOTPPage />} />
          <Route path="/change-password" element={<div>Change Password Page</div>} />
        </Route>

        {/* ── AUTHENTICATED (with MainLayout) ── */}
        <Route element={<ProtectedRoute />}>
          <Route element={<MainLayout />}>

            {/* All roles */}
            <Route path="/dashboard" element={<DashboardPage />} />

            {/* Admin + Dispatcher */}
            <Route element={<ProtectedRoute allowedRoles={["DISPATCHER", "SYSTEM_ADMIN"]} />}>
              <Route path="/fleet-management" element={<div>Fleet Management</div>} />
            </Route>

            {/* Admin only */}
            <Route element={<ProtectedRoute allowedRoles={["SYSTEM_ADMIN"]} />}>
              <Route path="/workers" element={<div>Workers Management</div>} />
            </Route>

            {/* Driver only */}
            <Route element={<ProtectedRoute allowedRoles={["DRIVER"]} />}>
              <Route path="/my-routes" element={<div>My Routes</div>} />
            </Route>

            {/* Seller only */}
            <Route element={<ProtectedRoute allowedRoles={["SELLER"]} />}>
              <Route path="/inventory/shipments" element={<div>Shipments</div>} />
            </Route>

            {/* Client only */}
            <Route element={<ProtectedRoute allowedRoles={["CLIENT"]} />}>
              <Route path="/track-my-package" element={<div>Track My Package</div>} />
            </Route>

          </Route>
        </Route>

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />

      </Routes>
    </BrowserRouter>
  );
}