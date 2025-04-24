import React, { useEffect, useState } from 'react'
import { Helmet } from "react-helmet-async";
import { fetchSiteDetails } from '../redux/slices/siteDeatilsSlice';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom'

const About = () => {

    const dispatch = useDispatch();
    const { data: siteDetails, siteDetailsLoading, siteDetailsError } = useSelector((state) => state.siteDetails);

    useEffect(() => {
        dispatch(fetchSiteDetails());
    }, [dispatch]);

    if (siteDetailsLoading) return <p>Loading site details...</p>;
    if (siteDetailsError) return <p>siteDetailsError: {siteDetailsError}</p>;


    return (
        <>

            {/* SEO Meta Tags */}
            <Helmet>
                <title>Kissan Growth: Your Local Farm Marketplace!</title>
                <meta name="description" content="Discover Kissan Growth, India’s trusted local farm marketplace connecting local farmers and consumers. Buy fresh fruits, vegetables, dairy, and crops directly from farmers at fair prices—no middlemen. Support local agriculture today!" />
                <meta name="keywords" content="Kissan Growth, fresh produce, buy from farmers, organic fruits and vegetables, local farm marketplace, Indian farmers, dairy products, sustainable farming, support local agriculture, buy direct from farmers, farm fresh food, affordable produce, fair prices, India farm revolution, farm-to-table, no middlemen." />
                <meta property="og:title" content="Kissan Growth: Your Local Farm Marketplace!" />
                <meta property="og:description" content="Discover Kissan Growth, India’s trusted local farm marketplace connecting local farmers and consumers. Buy fresh fruits, vegetables, dairy, and crops directly from farmers at fair prices—no middlemen. Support local agriculture today!" />
                <meta property="og:keywords"  content="Kissan Growth, fresh produce, buy from farmers, organic fruits and vegetables, local farm marketplace, Indian farmers, dairy products, sustainable farming, support local agriculture, buy direct from farmers, farm fresh food, affordable produce, fair prices, India farm revolution, farm-to-table, no middlemen." />
                <meta property="og:type" content="website" />
            </Helmet>

            <div className='container my-60 py-40'>

                <h1 style={styles.heading}>{siteDetails?.about?.title || "No title"}</h1>
                <hr />
                <p>

                    <div className="page_content" dangerouslySetInnerHTML={{ __html: siteDetails?.about?.content || "No content available" }} />

                </p>

                <hr />

                <div className='row justify-content-center' >
                    <div className='dflexinpugroup justify-content-center mt-60'>
                        <Link className="btn btn-lg btn-success" to="/farmers">Find Farmer Shops</Link>
                        <Link className="btn btn-lg btn-success" to="/farmer/register">Register as Farmer</Link>
                    </div>
                </div>

            </div>

        </>
    )
}

const styles = {
    heading:{
        fontSize: 42,
        marginBottom: 30
    }
}

export default About