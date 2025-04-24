import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom'
import { fetchSiteDetails } from '../redux/slices/siteDeatilsSlice';
import { Spinner } from 'react-bootstrap';
import { createHelpSupport } from '../redux/slices/customerHelpSupportSlice';

const Contact = () => {

    const dispatch = useDispatch();
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: ""
    });

    const { loading, successMessage, error } = useSelector((state) => state.customerHelpSupport);
    const { data: siteDetails, siteDetailsLoading, siteDetailsError } = useSelector((state) => state.siteDetails);


    useEffect(() => {
        dispatch(fetchSiteDetails());
    }, [dispatch]);

    if (siteDetailsLoading) return <Spinner style={{ margin: "auto" }} variant='success' />
    if (siteDetailsError) return <p>siteDetailsError: {siteDetailsError}</p>;


    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.id]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(createHelpSupport(formData));
    };



    return (
        <section className="contact py-80">
            <div className="container container-lg">

                <div className="row">
                    <div className='col-lg-12 col-xs-12 text-center'>
                        <h1 className='page_heading mb-60'>Contact Us - Kissan Growth: Your Local Farm Marketplace</h1>
                    </div>
                </div>

                <div className="row gy-5">
                    <div className="col-lg-8">
                        <div className="contact-box border border-gray-100 rounded-16 px-24 py-40">
                            <form action="#">

                                <h6 className="mb-20">Get in Touch with Us</h6>
                                <p>If you have any questions, concerns, or feedback, our team is here to assist you! We value your input and are committed to ensuring you have the best experience as a part of the Kissan Growth platform.</p>

                                <div className="row gy-4 mt-40">
                                    <div className="col-sm-6 col-xs-6">
                                        <label
                                            htmlFor="name"
                                            className="flex-align gap-4 text-sm font-heading-two text-gray-900 fw-semibold mb-4"
                                        >
                                            Full Name{" "}
                                            <span className="text-danger text-xl line-height-1">*</span>{" "}
                                        </label>
                                        <input
                                            type="text"
                                            className="common-input px-16"
                                            id="name"
                                            value={formData.name}
                                            onChange={handleChange}
                                            placeholder="Full name"
                                        />
                                    </div>
                                    <div className="col-sm-6 col-xs-6">
                                        <label
                                            htmlFor="email"
                                            className="flex-align gap-4 text-sm font-heading-two text-gray-900 fw-semibold mb-4"
                                        >
                                            Email Address{" "}
                                            <span className="text-danger text-xl line-height-1">*</span>{" "}
                                        </label>
                                        <input
                                            type="email"
                                            className="common-input px-16"
                                            id="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            placeholder="Email address"
                                        />
                                    </div>
                                    <div className="col-sm-6 col-xs-6">
                                        <label
                                            htmlFor="phone"
                                            className="flex-align gap-4 text-sm font-heading-two text-gray-900 fw-semibold mb-4"
                                        >
                                            Phone Number
                                            <span className="text-danger text-xl line-height-1">*</span>{" "}
                                        </label>
                                        <input
                                            type="number"
                                            className="common-input px-16"
                                            id="phone"
                                            value={formData.phone}
                                            onChange={handleChange}
                                            placeholder="Phone Number*"
                                        />
                                    </div>
                                    <div className="col-sm-6 col-xs-6">
                                        <label
                                            htmlFor="subject"
                                            className="flex-align gap-4 text-sm font-heading-two text-gray-900 fw-semibold mb-4"
                                        >
                                            Subject
                                            <span className="text-danger text-xl line-height-1">
                                                *
                                            </span>{" "}
                                        </label>
                                        <input
                                            type="text"
                                            className="common-input px-16"
                                            id="subject"
                                            value={formData.subject}
                                            onChange={handleChange}
                                            placeholder="Subject"
                                        />
                                    </div>
                                    <div className="col-sm-12">
                                        <label
                                            htmlFor="message"
                                            className="flex-align gap-4 text-sm font-heading-two text-gray-900 fw-semibold mb-4"
                                        >
                                            Message
                                            <span className="text-danger text-xl line-height-1">
                                                *
                                            </span>{" "}
                                        </label>
                                        <textarea
                                            className="common-input px-16"
                                            id="message"
                                            value={formData.message}
                                            onChange={handleChange}
                                            placeholder="Type your message"
                                            defaultValue={""}
                                        />
                                    </div>
                                    <div className="col-sm-12 mt-32">
                                        <button
                                            type="submit"
                                            className="btn btn-main py-18 px-32 rounded-8"
                                            onClick={handleSubmit}
                                        >
                                            Submit
                                        </button>
                                    </div>

                                    <div className='col-sm-12 mt-32'>

                                        {successMessage && <p className="text-success mt-3">{successMessage}</p>}
                                        {error && <p className="text-danger mt-3">{error}</p>}

                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                    <div className="col-lg-4">
                        <div className="contact-box border border-gray-100 rounded-16 px-24 py-40">
                            <h6 className="mb-48">Contact Information</h6>
                            <div className="flex-align gap-16 mb-16">
                                <span className="w-40 h-40 flex-center rounded-circle border border-gray-100 text-main-two-600 text-2xl flex-shrink-0">
                                    <i className="ph-fill ph-phone-call" />
                                </span>
                                <Link
                                    to="/tel:{siteDetails?.contactDetails?.phone}"
                                    className="text-md text-gray-900 hover-text-main-600"
                                >
                                    {siteDetails?.contactDetails?.phone ?? "Null"}

                                </Link>
                            </div>
                            <div className="flex-align gap-16 mb-16">
                                <span className="w-40 h-40 flex-center rounded-circle border border-gray-100 text-main-two-600 text-2xl flex-shrink-0">
                                    <i className="ph-fill ph-envelope" />
                                </span>
                                <Link
                                    to="/mailto:support24@marketpro.com"
                                    className="text-md text-gray-900 hover-text-main-600"
                                >
                                    {siteDetails?.contactDetails?.email}
                                </Link>
                            </div>
                            <div className="flex-align gap-16 mb-0">
                                <span className="w-40 h-40 flex-center rounded-circle border border-gray-100 text-main-two-600 text-2xl flex-shrink-0">
                                    <i className="ph-fill ph-map-pin" />
                                </span>
                                <span className="text-md text-gray-900 ">
                                    {siteDetails?.contactDetails?.address}
                                </span>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </section>

    )
}

export default Contact