import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ProtectedRoute } from "./layouts/ProtectedRoute";

import LoginPage from "./pages/LoginPage";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* --- PUBLIC ROUTES --- */}
        <Route path="/login" element={<LoginPage />} />
        <Route
          path="/unauthorized"
          element={<div>You don't have access to this page.</div>}
        />

        {/* --- AUTHENTICATED ROUTES (General) --- */}
        <Route element={<ProtectedRoute />}>
          {/* Forced Steps */}
          <Route
            path="/change-password"
            element={<div>Please Change Your Password</div>}
          />
          <Route path="/verify-otp" element={<div>Verify Your Account</div>} />

          {/* Default Dashboard (Logic inside could redirect based on role) */}
          <Route path="/dashboard" element={<div>General Dashboard</div>} />
        </Route>

        {/* --- ROLE-SPECIFIC ROUTES --- */}

        {/* Dispatcher Only */}
        <Route
          element={
            <ProtectedRoute allowedRoles={["DISPATCHER", "SYSTEM_ADMIN"]} />
          }
        >
          <Route
            path="/fleet-management"
            element={<div>Dispatcher Control Panel</div>}
          />
        </Route>

        {/* Driver Only */}
        <Route element={<ProtectedRoute allowedRoles={["DRIVER"]} />}>
          <Route path="/my-routes" element={<div>Driver Delivery List</div>} />
        </Route>

        {/* Seller Only */}
        <Route element={<ProtectedRoute allowedRoles={["SELLER"]} />}>
          <Route
            path="/inventory/shipments"
            element={<div>Seller Shipment Portal</div>}
          />
        </Route>

        {/* Client Only */}
        <Route element={<ProtectedRoute allowedRoles={["CLIENT"]} />}>
          <Route
            path="/track-my-package"
            element={<div>Client Tracking View</div>}
          />
        </Route>

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
