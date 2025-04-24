import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCategories } from '../redux/slices/categorySlice'; // Import the fetchCategories action
import Slider from 'react-slick';
import { Link } from 'react-router-dom';

const FeatureOne = () => {
    const dispatch = useDispatch();
    const { categories, status, error } = useSelector((state) => state.categories);

    useEffect(() => {
        if (status === 'idle') {
            dispatch(fetchCategories()); // Dispatch the fetchCategories action to load categories
        }
    }, [dispatch, status]);

    function SampleNextArrow(props) {
        const { className, onClick } = props;
        return (
            <button
                type="button"
                onClick={onClick}
                className={` ${className} slick-next slick-arrow flex-center rounded-circle bg-white text-xl hover-bg-main-600 hover-text-white transition-1`}
            >
                <i className="ph ph-caret-right" />
            </button>
        );
    }

    function SamplePrevArrow(props) {
        const { className, onClick } = props;
        return (
            <button
                type="button"
                onClick={onClick}
                className={`${className} slick-prev slick-arrow flex-center rounded-circle bg-white text-xl hover-bg-main-600 hover-text-white transition-1`}
            >
                <i className="ph ph-caret-left" />
            </button>
        );
    }

    const settings = {
        dots: false,
        arrows: true,
        infinite: true,
        autoPlay: true,
        speed: 1000,
        slidesToShow: 1,
        slidesToScroll: 1,
        initialSlide: 0,
        nextArrow: <SampleNextArrow />,
        prevArrow: <SamplePrevArrow />,
        responsive: [
            { breakpoint: 1699, settings: { slidesToShow: 9 } },
            { breakpoint: 1599, settings: { slidesToShow: 8 } },
            { breakpoint: 1399, settings: { slidesToShow: 6 } },
            { breakpoint: 992, settings: { slidesToShow: 5 } },
            { breakpoint: 768, settings: { slidesToShow: 4 } },
            { breakpoint: 575, settings: { slidesToShow: 3 } },
            { breakpoint: 424, settings: { slidesToShow: 2 } },
            { breakpoint: 359, settings: { slidesToShow: 1 } },
        ],
    };

    if (status === 'loading') {
        return <div>Loading...</div>;
    }

    if (status === 'failed') {
        return <div>Error: {error}</div>;
    }

    return (
        <div className="feature" id="featureSection">
            <div className="container container-lg">
                <div className="position-relative arrow-center">

                    <div className="flex-align">
                        <button
                            type="button"
                            id="feature-item-wrapper-prev"
                            className="slick-prev slick-arrow flex-center rounded-circle bg-white text-xl hover-bg-main-600 hover-text-white transition-1"
                        >
                            <i className="ph ph-caret-left" />
                        </button>
                        <button
                            type="button"
                            id="feature-item-wrapper-next"
                            className="slick-next slick-arrow flex-center rounded-circle bg-white text-xl hover-bg-main-600 hover-text-white transition-1"
                        >
                            <i className="ph ph-caret-right" />
                        </button>
                    </div>

                    <div className="feature-item-wrapper">
                        <Slider {...settings}>
                            {categories.map((category) => (
                                <div key={category._id} className="feature-item text-center">
                                    <div className="feature-item__thumb rounded-circle">
                                        <Link to={`/category/${category._id}`} className="w-100 h-100 flex-center">
                                            <img src={category.category_image ? `${process.env.REACT_APP_BASE_URL_SECONDARY}${category.category_image}` : 'https://placehold.co/100x100'} alt={category.name}
                                                width={100}
                                                height={100}
                                            />
                                        </Link>
                                    </div>
                                    <div className="feature-item__content mt-16">
                                        <h6 className="text-lg mb-8">
                                            <Link to={`/category/${category._id}`} className="text-inherit">
                                                {category.name}
                                            </Link>
                                        </h6>
                                        <span className="text-sm text-gray-400">{category.productCount || 0} Products</span>
                                    </div>
                                </div>
                            ))}
                        </Slider>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FeatureOne;
