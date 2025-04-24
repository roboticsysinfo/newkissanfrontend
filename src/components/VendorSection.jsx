import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { fetchCategories } from '../redux/slices/categorySlice';
import { Link, useNavigate } from 'react-router-dom';
import { fetchShops } from '../redux/slices/shopSlice';
import Select from "react-select";
import axiosInstance from '../utils/axiosInstance';
import slugify from 'slugify';

const VendorSection = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [districtOptions, setDistrictOptions] = useState([]); // Store formatted districts
    const [selectedDistrict, setSelectedDistrict] = useState(null); // Selected district

    // Categories state
    const { categories, status: categoryStatus, error: categoryError } = useSelector((state) => state.categories);
    // Access shops from Redux store
    const { shops = [], status, error } = useSelector((state) => state.shop);
    const { reviews } = useSelector((state) => state.reviews);

    console.log("shops", shops)


    const fetchDistricts = async () => {
        try {
            const response = await axiosInstance.get("/states-cities");

            // Extract and format districts properly
            const allDistricts = response.data.flatMap(state => state.districts); // Extract districts
            const formattedOptions = allDistricts.map(district => ({ value: district, label: district })); // Convert to object

            setDistrictOptions(formattedOptions);
        } catch (error) {
            console.error("Error fetching districts:", error);
        }
    };


    // Fetch categories when the component mounts
    useEffect(() => {
        if (categoryStatus === 'idle') {
            dispatch(fetchCategories());
        }
    }, [dispatch, categoryStatus]);

    useEffect(() => {
        // Dispatch the fetchShops action with the params for limiting results to 6
        dispatch(fetchShops({ page: 1, limit: 10 }));
    }, [dispatch]);

    useEffect(() => {
        fetchDistricts();
    }, []);

    // Handle loading and error states for categories
    if (categoryStatus === 'loading') {
        return <p>Loading categories...</p>;
    }
    if (categoryStatus === 'failed') {
        return <p>Error: {categoryError}</p>;
    }

    // Handle loading and error states for shops
    if (status === 'loading') return <div>Loading...</div>;
    if (status === 'failed') {
        return <div>Error: {error?.message || 'An error occurred'}</div>;
    }





    const handleLocation = () => {
        if (selectedDistrict) {
            navigate(`/shops/${selectedDistrict.value}`); // Redirect to URL with selected location
        }
    };

    return (
        <>
            <section className="vendor-two py-80">
                <div className="side-overlay false" />
                <div className="container container-lg">

                    <div className="row">
                        <div className="col-xl-3 col-lg-4">

                            <div className="shop-sidebar false">

                                <div className="border border-gray-50 rounded-8 p-24">
                                    <h6 className="text-xl border-bottom border-gray-100 pb-24 mb-24">
                                        Filter by Location
                                    </h6>
                                    <div className="d-flex flex-column gap-8">
                                        <div className="location-box bg-white flex-align gap-8 py-6 px-16 rounded-pill border border-gray-100">

                                            <Select
                                                options={districtOptions}
                                                value={selectedDistrict}
                                                onChange={setSelectedDistrict}
                                                placeholder="Select District/City"
                                                isSearchable
                                            />

                                            {/* Search Button with Icon */}

                                            <button
                                                type="button"
                                                onClick={handleLocation}
                                                className="bg-success text-white w-32 h-32 bg-main-600 rounded-circle"

                                            >
                                                <i className="ph ph-magnifying-glass" /> {/* Search Icon */}
                                            </button>
                                        </div>
                                    </div>
                                </div>

                                <button
                                    type="button"
                                    className="shop-sidebar__close d-lg-none d-flex w-32 h-32 flex-center border border-gray-100 rounded-circle hover-bg-main-600 position-absolute inset-inline-end-0 me-10 mt-8 hover-text-white hover-border-main-600"
                                >
                                    <i className="ph ph-x" />
                                </button>
                                <div className="d-flex flex-column gap-12 px-lg-0 px-3 py-lg-0 py-4">
                                    <div className="border border-gray-50 rounded-8 p-24">
                                        <h6 className="text-xl border-bottom border-gray-100 pb-24 mb-24">
                                            Product Category
                                        </h6>
                                        <ul className="max-h-540 overflow-y-auto scroll-sm">
                                            {categories.map((category) => (
                                                <li key={category._id} className="mb-24">
                                                    <Link
                                                        to={`/category/${category._id}`} // Assuming a route structure like /shop/categoryId
                                                        className="text-gray-900 hover-text-main-600"
                                                    >
                                                        {category.name} ({category.productCount || 0}) {/* Adjust if you have product counts */}
                                                    </Link>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>

                                </div>
                            </div>
                        </div>
                        <div className="col-xl-9 col-lg-8">

                            <div className="d-flex align-items-center justify-content-between flex-wrap mb-48 gap-16">
                                <form action="#" className="input-group w-100 max-w-418">
                                    <input
                                        type="text"
                                        className="form-control common-input rounded-start-3"
                                        placeholder="Searching..."
                                    />
                                    <button
                                        type="submit"
                                        className="input-group-text border-0 bg-main-600 rounded-end-3 text-white text-2xl hover-bg-main-two-700 px-24"
                                    >
                                        <i className="ph ph-magnifying-glass" />
                                    </button>
                                </form>
                            </div>

                            <div className="vendors-two-item-wrapper row false">
                                {shops.map((shop) => {
                                   
                                    const shopSlug = slugify(shop.shop_name || "", { lower: true, strict: true });

                                    return (
                                        <div className='col-lg-4 col-xs-12 col-sm-12' key={shop._id}>
                                            <div className="vendors-two-item rounded-12  overflow-hidden bg-color-three border border-neutral-50 hover-border-main-two-600 transition-2">
                                                <div className="vendors-two-item__top bg-overlay style-two position-relative">
                                                    <div className="vendors-two-item__thumbs h-210">
                                                        <img
                                                            src={`${process.env.REACT_APP_BASE_URL_PRIMARY}${shop.shop_cover_image}`} // Adjust to your image URL
                                                            alt={shop.shop_name}
                                                            className="cover-img"
                                                        />
                                                    </div>
                                                    <div className="position-absolute top-0 inset-inline-start-0 w-100 h-100 p-24 z-1 d-flex flex-column justify-content-between">
                                                        <div className="d-flex align-items-center justify-content-between">
                                                            <span className="w-80 h-80 flex-center bg-white rounded-circle flex-shrink-0">
                                                                <img src={`${process.env.REACT_APP_BASE_URL_PRIMARY}${shop.shop_profile_image}`} alt="Icon" />
                                                            </span>
                                                        </div>
                                                        <div className="mt-16">
                                                            <h6 className="text-white fw-semibold mb-12">
                                                                <Link to={`/shop/${shopSlug}-${shop._id}`}>
                                                                    {shop.shop_name}
                                                                </Link>
                                                            </h6>
                                                            <div className="flex-align gap-6">
                                                                
                                                                {/* Add Star Rating */}

                                                                <div className="flex-align gap-8">
                                                                    {[...Array(5)].map((_, index) => (
                                                                        <span key={index} className="text-15 fw-medium text-warning-600 d-flex">
                                                                            <i className="ph-fill ph-star" />
                                                                        </span>
                                                                    ))}
                                                                </div>

                                                                <span className="text-xs fw-medium text-white">
                                                                    {shop.averageRating ? shop.averageRating : "0.0"}
                                                                </span>

                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="vendors-two-item__content p-24 flex-grow-1">
                                                    <div className="d-flex flex-column gap-14">
                                                        <div className="flex-align gap-8">
                                                            <span className="flex-center text-main-two-600 text-2xl flex-shrink-0">
                                                                <i className="ph ph-map-pin-line" />
                                                            </span>
                                                            <p className="text-md text-gray-900">{shop.shop_address}</p>
                                                        </div>

                                                        <div className="flex-align gap-8">
                                                            <p className="line-clamp-text text-sm text-gray-900">{shop.shop_description}</p>
                                                        </div>
                                                    </div>
                                                    <Link
                                                        className="btn bg-success-700 hover-bg-success-600 text-white py-12 px-24 rounded-8 flex-center gap-8 fw-medium mt-24"
                                                        to={`/shop/${shopSlug}-${shop._id}`}
                                                    >
                                                        View Shop <i className="ph ph-arrow-right" />
                                                    </Link>
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>

                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default VendorSection;
