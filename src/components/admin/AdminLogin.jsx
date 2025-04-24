import React, { useState } from "react";
import toast from "react-hot-toast";
import { Card, CardBody } from "react-bootstrap";
import api from '../../utils/api';
import { useNavigate } from 'react-router-dom';

const AdminLogin = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post("/admin/login", formData);

      // Store token and user role in localStorage
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('userRole', 'admin'); // Directly store 'admin' as a string

      toast.success("Admin Login successful!");
      navigate('/admin/dashboard');
    } catch (error) {
      toast.error(error.response?.data?.message || "Admin Login failed");
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-lg-5 col-lg-5 col-sm-12">
          <Card className="mt-20">
            <CardBody>
              <h2 className="text-center">Admin Login</h2>
              <form onSubmit={handleSubmit}>
                <div className="mb-10">
                  <label className="form-label">Email</label>
                  <input
                    type="email"
                    className="form-control"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    placeholder="Email Address"
                  />
                </div>
                <div className="mb-10">
                  <label className="form-label">Password</label>
                  <input
                    type="password"
                    className="form-control"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                    placeholder="Password"
                  />
                </div>
                <button type="submit" className="btn mt-20 btn-primary w-100">
                  Login
                </button>
              </form>
            </CardBody>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
