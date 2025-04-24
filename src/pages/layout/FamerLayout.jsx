import React from "react";
import { Outlet } from "react-router-dom";
import FarmerAdminSidebar from "../../components/farmer/FamerAdminSidebar";
import FarmerAdminNavbar from "../../components/farmer/FarmerAdminNavbar";

const FarmerLayout = () => {
  return (
    <div className="d-flex">
      {/* Sidebar */}
      <FarmerAdminSidebar />

      {/* Main Content */}
      <div className="flex-grow-1">
        <FarmerAdminNavbar />
        <div className="container mt-4">
          {/* Child Routes Render Here */}
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default FarmerLayout;
