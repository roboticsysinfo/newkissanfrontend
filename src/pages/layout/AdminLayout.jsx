import React from "react";
import { Outlet } from "react-router-dom";
import AdminSidebar from "../../components/admin/AdminSidebar";
import AdminNavbar from "../../components/admin/AdminNavbar";

const AdminLayout = () => {
  return (
    <div className="d-flex">
      {/* Sidebar */}
      <AdminSidebar />

      {/* Main Content */}
      <div className="flex-grow-1">
        <AdminNavbar />
        <div className="container mt-60">
          {/* Child Routes Render Here */}
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;
