// AdminNavbar.jsx
import React from "react";
import { Navbar, Nav, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const AdminNavbar = () => {

  const navigate = useNavigate();

  const onLogout = () => {
    // Clear the token and user role from localStorage
    localStorage.removeItem("token");
    localStorage.removeItem("userRole");
    localStorage.removeItem("farmerName");
    
    navigate("/admin/login"); // redirect to '/admin/login'
  };

  // Get the userRole from localStorage
  const userRole = localStorage.getItem("userRole");

  return (
    <Navbar bg="dark" variant="dark" className="px-3">
      <Navbar.Brand href="/">Admin Dashboard</Navbar.Brand>
      <Nav className="ms-auto">
        <Navbar.Text className="me-3">Welcome, {userRole}</Navbar.Text>
        <Button variant="outline-light" onClick={onLogout}>
          Logout
        </Button>
      </Nav>
    </Navbar>
  );
};

export default AdminNavbar;
