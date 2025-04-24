import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import Slider from 'react-slick';
import { fetchBanners } from '../redux/slices/bannersSlice';

const BannerOne = () => {
    const dispatch = useDispatch();
    const { banners, status } = useSelector((state) => state.banners);

    useEffect(() => {
        dispatch(fetchBanners());
    }, [dispatch]);

    function SampleNextArrow(props) {
        const { className, onClick } = props;
        return (
            <button
                type="button" onClick={onClick}
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
        autoPlay: true,
        infinite: true,
        speed: 1500,
        slidesToShow: 1,
        slidesToScroll: 1,
        initialSlide: 0,
        nextArrow: <SampleNextArrow />,
        prevArrow: <SamplePrevArrow />,   
    };

    return (
        <div className="banner">
            <div className="container container-lg">
                <div className="banner-item rounded-24 overflow-hidden position-relative arrow-center">
                    <a
                        href="#featureSection"
                        className="scroll-down w-84 h-84 text-center flex-center bg-main-600 rounded-circle border border-5 text-white border-white position-absolute start-50 translate-middle-x bottom-0 hover-bg-main-800"
                    >
                        <span className="icon line-height-0">
                            <i className="ph ph-caret-double-down" />
                        </span>
                    </a>
                    <div className="banner-slider">
                        {status === 'loading' ? (
                            <p>Loading...</p>
                        ) : (
                            <Slider {...settings}>
                                {banners.map((banner) => (
                                    <div key={banner.id} className="banner-slider__item">
                                        <div className="banner-slider__inner flex-between position-relative">
                                            <div className="banner-item__content">
                                                <h1 className="banner-item__title bounce">{banner.title}</h1>
                                                <Link
                                                    to={`/category/${banner.category}` || "/shop"}
                                                    className="btn btn-main d-inline-flex align-items-center rounded-pill gap-8"
                                                >
                                                    Explore Shop
                                                    <span className="icon text-xl d-flex">
                                                        <i className="ph ph-shopping-cart-simple" />
                                                    </span>
                                                </Link>
                                            </div>
                                            <div className="banner-item__thumb">
                                                <img src={`${process.env.REACT_APP_BASE_URL_SECONDARY}${banner.banner_image}`} alt={banner.title} />
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </Slider>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BannerOne;
