import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ProtectedRoute } from "./layouts/ProtectedRoute";

// Auth Pages
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/Registerpage";
import VerifyOTPPage from "./pages/Verifyotppage";
import ForgotPasswordPage from "./pages/Forgotpasswordpage";
import ResetPasswordPage from "./pages/Resetpasswordpage";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* --- PUBLIC AUTH ROUTES --- */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="/reset-password" element={<ResetPasswordPage />} />

        <Route
          path="/unauthorized"
          element={<div>You don't have access to this page.</div>}
        />

        {/* --- AUTHENTICATED ROUTES (General) --- */}
        <Route element={<ProtectedRoute />}>
          {/* Forced steps — accessible before full auth */}
          <Route path="/verify-otp" element={<VerifyOTPPage />} />
          <Route
            path="/change-password"
            element={<div>Please Change Your Password</div>}
          />

          {/* Default dashboard */}
          <Route path="/dashboard" element={<div>General Dashboard</div>} />
        </Route>

        {/* --- ROLE-SPECIFIC ROUTES --- */}
        <Route
          element={<ProtectedRoute allowedRoles={["DISPATCHER", "SYSTEM_ADMIN"]} />}
        >
          <Route path="/fleet-management" element={<div>Dispatcher Control Panel</div>} />
        </Route>

        <Route element={<ProtectedRoute allowedRoles={["DRIVER"]} />}>
          <Route path="/my-routes" element={<div>Driver Delivery List</div>} />
        </Route>

        <Route element={<ProtectedRoute allowedRoles={["SELLER"]} />}>
          <Route path="/inventory/shipments" element={<div>Seller Shipment Portal</div>} />
        </Route>

        <Route element={<ProtectedRoute allowedRoles={["CLIENT"]} />}>
          <Route path="/track-my-package" element={<div>Client Tracking View</div>} />
        </Route>

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  );
}