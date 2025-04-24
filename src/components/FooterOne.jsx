import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom'
import { fetchSiteDetails } from '../redux/slices/siteDeatilsSlice';
import { Spinner } from 'react-bootstrap';

const FooterOne = () => {

    const dispatch = useDispatch();
    const { data: siteDetails, siteDetailsLoading, siteDetailsError } = useSelector((state) => state.siteDetails);

    useEffect(() => {
        dispatch(fetchSiteDetails());
    }, [dispatch]);

    if (siteDetailsLoading) return <Spinner variant='success' />;
    if (siteDetailsError) return <p>siteDetailsError: {siteDetailsError}</p>;

    return (
        <footer className="footer py-120">
            <img
                src="assets/images/bg/body-bottom-bg.png"
                alt="BG"
                className="body-bottom-bg"
            />
            <div className="container container-lg">
                <div className="row">

                    <div className="col-lg-4 col-xs-12 col-sm-12">

                        <div className="footer-item">
                            <div className="footer-item__logo">
                                <Link to="/">
                                    {" "}
                                    <img src={`${process.env.REACT_APP_BASE_URL_PRIMARY}${siteDetails?.siteLogo}`} alt="" />
                                </Link>
                            </div>
                            <p className="mb-24">
                                {siteDetails?.about?.footer_text}
                            </p>
                            <div className="flex-align gap-16 mb-16">
                                <span className="w-32 h-32 flex-center rounded-circle bg-main-600 text-white text-md flex-shrink-0">
                                    <i className="ph-fill ph-map-pin" />
                                </span>
                                <span className="text-md text-gray-900 ">
                                    {siteDetails?.contactDetails?.address}
                                </span>
                            </div>
                            <div className="flex-align gap-16 mb-16">
                                <span className="w-32 h-32 flex-center rounded-circle bg-main-600 text-white text-md flex-shrink-0">
                                    <i className="ph-fill ph-phone-call" />
                                </span>
                                <div className="flex-align gap-16 flex-wrap">
                                    <Link
                                        to="/tel:{siteDetails?.phone}"
                                        className="text-md text-gray-900 hover-text-main-600"
                                    >
                                        {siteDetails?.contactDetails?.phone}
                                    </Link>
                                </div>
                            </div>
                            <div className="flex-align gap-16 mb-16">
                                <span className="w-32 h-32 flex-center rounded-circle bg-main-600 text-white text-md flex-shrink-0">
                                    <i className="ph-fill ph-envelope" />
                                </span>
                                <Link
                                    to="/mailto:{siteDetails?.address}"
                                    className="text-md text-gray-900 hover-text-main-600"
                                >
                                    {siteDetails?.contactDetails?.email}
                                </Link>
                            </div>
                        </div>

                    </div>

                    <div className="col-lg-2 col-xs-12 col-sm-12">

                        <div className="footer-item">
                            <h6 className="footer-item__title">Quick Links</h6>
                            <ul className="footer-menu">
                                <li className="mb-16">
                                    <Link to="/farmer/register" className="text-gray-600 hover-text-main-600">
                                        Register as Farmer
                                    </Link>
                                </li>
                                <li className="mb-16">
                                    <Link to="/farmer/login" className="text-gray-600 hover-text-main-600">
                                        Login as Farmer
                                    </Link>
                                </li>
                                <li className="mb-16">
                                    <Link to="/about-us" className="text-gray-600 hover-text-main-600">
                                        About
                                    </Link>
                                </li>
                                <li className="mb-16">
                                    <Link to="/blogs" className="text-gray-600 hover-text-main-600">
                                        Blogs
                                    </Link>
                                </li>

                            </ul>
                        </div>

                    </div>

                    <div className="col-lg-3 col-xs-12 col-sm-12">

                        <div className="footer-item">
                            <h6 className="footer-item__title">Customer Support</h6>
                            <ul className="footer-menu">
                                <li className="mb-16">
                                    <Link to="/contact" className="text-gray-600 hover-text-main-600">
                                        Help Center
                                    </Link>
                                </li>
                                <li className="mb-16">
                                    <Link
                                        to="/contact"
                                        className="text-gray-600 hover-text-main-600"
                                    >
                                        Contact Us
                                    </Link>
                                </li>
                                <li className="mb-16">
                                    <Link
                                        to="/login"
                                        className="text-gray-600 hover-text-main-600"
                                    >
                                        Customer Login
                                    </Link>
                                </li>
                                <li className="mb-16">
                                    <Link
                                        to="/register"
                                        className="text-gray-600 hover-text-main-600"
                                    >
                                        Register as a Customer
                                    </Link>
                                </li>

                            </ul>
                        </div>

                    </div>

                    <div className="col-lg-3 col-xs-12 col-sm-12">

                        <div className="footer-item">
                            <h6 className="footer-item__title">Information</h6>
                            <ul className="footer-menu">

                                <li className="mb-16">
                                    <Link to="/term-and-conditions" className="text-gray-600 hover-text-main-600">
                                        Terms & Conditions
                                    </Link>
                                </li>

                                <li className="mb-16">
                                    <Link to="/privacy-policy" className="text-gray-600 hover-text-main-600">
                                        Privacy Policy
                                    </Link>
                                </li>

                            </ul>
                        </div>

                    </div>

                </div>
            </div>
        </footer>

    )
}

export default FooterOne