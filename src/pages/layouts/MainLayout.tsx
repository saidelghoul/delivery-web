import { useState } from "react";
import { Outlet } from "react-router-dom";
import { Sidebar } from "./Sidebar";
import { Navbar } from "./Navbar";
import { COLORS } from "../../constants/colors";

export const MainLayout = () => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div style={{
      display: "flex",
      minHeight: "100vh",
      background: COLORS.background,
      fontFamily: "'DM Sans', 'Segoe UI', sans-serif",
    }}>
      {/* Sidebar */}
      <Sidebar collapsed={collapsed} onToggle={() => setCollapsed(!collapsed)} />

      {/* Right side: navbar + page content */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column", minWidth: 0 }}>
        <Navbar onMenuToggle={() => setCollapsed(!collapsed)} sidebarCollapsed={collapsed} />

        {/* Page content */}
        <main style={{
          flex: 1,
          padding: "28px",
          overflowY: "auto",
        }}>
          <Outlet />
        </main>
      </div>
    </div>
  );
};