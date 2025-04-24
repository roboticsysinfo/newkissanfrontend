import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import api from '../utils/api'; // Ensure this path is correct

const Register = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        phoneNumber: '',
        address: '',
    });
    const [loading, setLoading] = useState(false); // Loading state
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true); // Show spinner when registration starts

        try {
            const response = await api.post('/auth/customer_register', formData);
            toast.success('Registration successful! Please log in.');
            navigate('/login'); // Redirect to login page after successful registration
        } catch (error) {
            toast.error(error.response?.data?.message || 'Registration failed');
        } finally {
            setLoading(false); // Hide spinner when request completes
        }
    };

    return (
        <section className="account py-80">
            <div className="container container-lg">
                <form onSubmit={handleSubmit}>
                    <div className="row justify-content-center gy-4">
                        {/* Register Card Start */}
                        <div className="col-xl-6">
                            <div className="border border-gray-100 hover-border-main-600 transition-1 rounded-16 px-24 py-40">
                                <h6 className="text-xl mb-32">Register</h6>
                                
                                <div className="mb-24">
                                    <label htmlFor="name" className="text-neutral-900 text-lg mb-8 fw-medium">
                                        Name <span className="text-danger">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        className="common-input"
                                        id="name"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        placeholder="Enter your name"
                                        required
                                    />
                                </div>

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
                                        placeholder="Enter Email Address"
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

                                <div className="mb-24">
                                    <label htmlFor="phoneNumber" className="text-neutral-900 text-lg mb-8 fw-medium">
                                        Phone Number <span className="text-danger">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        className="common-input"
                                        id="phoneNumber"
                                        name="phoneNumber"
                                        value={formData.phoneNumber}
                                        onChange={handleChange}
                                        placeholder="Enter Phone Number"
                                        required
                                    />
                                </div>

                                <div className="mb-24">
                                    <label htmlFor="address" className="text-neutral-900 text-lg mb-8 fw-medium">
                                        Address <span className="text-danger">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        className="common-input"
                                        id="address"
                                        name="address"
                                        value={formData.address}
                                        onChange={handleChange}
                                        placeholder="Enter Address"
                                        required
                                    />
                                </div>

                                <div className="my-48">
                                    <p className="text-gray-500">
                                        Your personal data will be used to process your order, support your experience throughout this website, and for other purposes
                                        described in our{' '}
                                        <Link to="#" className="text-main-600 text-decoration-underline">
                                            privacy policy
                                        </Link>.
                                    </p>
                                </div>

                                <div className="mt-48">
                                    <button type="submit" className="btn btn-main py-18 px-40" disabled={loading}>
                                        {loading ? (
                                            <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                                        ) : (
                                            'Register'
                                        )}
                                    </button>
                                </div>
                            </div>
                        </div>
                        {/* Register Card End */}
                    </div>
                </form>
            </div>
        </section>
    );
};

export default Register;
