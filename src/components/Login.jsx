import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import api from "../utils/api"; // Ensure this path is correct

const Login = () => {
    const [formData, setFormData] = useState({ email: "", password: "" });
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
    
        try {
            const response = await api.post("/auth/customer_login", formData);
            
            // Save token, userRole, and full user details in localStorage
            localStorage.setItem("token", response.data.token);
            localStorage.setItem("userRole", response.data.userRole);
            localStorage.setItem("user", JSON.stringify(response.data.user)); // 👈 Storing full user object
    
            toast.success("Login successful");
    
            // Redirect based on role
            if (response.data.userRole === "customer") {
                navigate("/account");
            } else {
                navigate("/login"); // Change this if needed for other roles
            }
        } catch (error) {
            toast.error(error.response?.data?.message || "Login failed");
        } finally {
            setLoading(false);
        }
    };
    

    return (
        <section className="account py-80">
            <div className="container container-lg">
                <form onSubmit={handleSubmit}>
                    <div className="row justify-content-center gy-4">
                        <div className="col-xl-6 pe-xl-5">
                            <div className="border border-gray-100 hover-border-main-600 transition-1 rounded-16 px-24 py-40 h-100">
                                <h6 className="text-xl mb-32">Login</h6>
                                <div className="mb-24">
                                    <label htmlFor="email" className="text-neutral-900 text-lg mb-8 fw-medium">
                                        Email Address <span className="text-danger">*</span>
                                    </label>
                                    <input
                                        type="email"
                                        className="common-input"
                                        id="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        placeholder="Enter Email"
                                        required
                                    />
                                </div>
                                <div className="mb-24">
                                    <label htmlFor="password" className="text-neutral-900 text-lg mb-8 fw-medium">
                                        Password <span className="text-danger">*</span>
                                    </label>
                                    <input
                                        type="password"
                                        className="common-input"
                                        id="password"
                                        name="password"
                                        value={formData.password}
                                        onChange={handleChange}
                                        placeholder="Enter Password"
                                        required
                                    />
                                </div>
                                <div className="mb-24 mt-48">
                                    <button type="submit" className="btn btn-main py-18 px-40" disabled={loading}>
                                        {loading ? (
                                            <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                                        ) : (
                                            "Log in"
                                        )}
                                    </button>
                                </div>
                                <div className="mt-48">
                                    <Link to="/forgot-password" className="text-danger-600 text-sm fw-semibold hover-text-decoration-underline">
                                        Forgot your password?
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </section>
    );
};

export default Login;
