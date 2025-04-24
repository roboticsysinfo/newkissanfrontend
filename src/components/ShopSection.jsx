import React, { useState, useEffect } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '../redux/slices/productSlice';
import { fetchCategories } from '../redux/slices/categorySlice'
import ProductPagination from './ProductPagination';
import { addToCart } from '../redux/slices/cartSlice';
import { toast } from "react-hot-toast"
import { Button } from 'react-bootstrap';
import RequestOrderModal from './RequestOrderModal';
import { setSelectedProduct } from "../redux/slices/productSlice";
import slugify from 'slugify';


const ShopSection = () => {

    const [showModal, setShowModal] = useState(false);

    const dispatch = useDispatch();

    const handleSubmit = (data) => {

        // Here, you can send the form data to the backend
    };


    // Products state
    const { data: products, status: productStatus } = useSelector(state => state.products);
    const [searchParams] = useSearchParams();


    // Categories state
    const { categories, status: categoryStatus, error: categoryError } = useSelector((state) => state.categories);

    const [grid, setGrid] = useState(false);
    const [active, setActive] = useState(false);

    const sidebarController = () => {
        setActive(!active);
    };

    // Fetch products when the component mounts
    useEffect(() => {
        const page = searchParams.get("page") || 1;
        if (productStatus === 'idle') {
            dispatch(fetchProducts({ page, limit: 10, search: '', filter: '' }));
        }
    }, [dispatch, productStatus, searchParams]);

    // Fetch categories when the component mounts
    useEffect(() => {
        if (categoryStatus === 'idle') {
            dispatch(fetchCategories());
        }
    }, [dispatch, categoryStatus]);

    // Handle loading and error states for products
    if (productStatus === 'loading') {
        return <div>Loading products...</div>;
    }
    if (productStatus === 'failed') {
        return <div>Error loading products</div>;
    }

    // Handle loading and error states for categories
    if (categoryStatus === 'loading') {
        return <p>Loading categories...</p>;
    }
    if (categoryStatus === 'failed') {
        return <p>Error: {categoryError}</p>;
    }

    const handleAddToCart = (productId) => {
        if (!productId) {
            console.error("❌ Error: Product ID is undefined!");
            return;
        }
        dispatch(addToCart({ productId, quantity: 1 }));

        toast.success("Product Added Successfully")
    };



    return (

        <>

            <section className="shop py-80">
                <div className={`side-overlay ${active && "show"}`}></div>
                <div className="container container-lg">
                    <div className="row">
                        {/* Sidebar Start */}
                        <div className="col-lg-3">
                            <div className={`shop-sidebar ${active && "active"}`}>
                                <button onClick={sidebarController}
                                    type="button"
                                    className="shop-sidebar__close d-lg-none d-flex w-32 h-32 flex-center border border-gray-100 rounded-circle hover-bg-main-600 position-absolute inset-inline-end-0 me-10 mt-8 hover-text-white hover-border-main-600"
                                >
                                    <i className="ph ph-x" />
                                </button>
                                <div className="shop-sidebar__box border border-gray-100 rounded-8 p-32 mb-32">
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

                                {/* <div className="shop-sidebar__box rounded-8">
                                    <img src="assets/images/thumbs/advertise-img1.png" alt="" />
                                </div> */}

                            </div>
                        </div>
                        {/* Sidebar End */}
                        {/* Content Start */}
                        <div className="col-lg-9">

                            {/* Top Start */}
                            <div className="flex-end gap-16 flex-wrap mb-40 ">

                                <div className="position-relative flex-align gap-16 flex-wrap">
                                    <div className="list-grid-btns flex-align gap-16">
                                        <button onClick={() => setGrid(true)}
                                            type="button"
                                            className={`w-44 h-44 flex-center border rounded-6 text-2xl list-btn border-gray-100 ${grid === true && "border-main-600 text-white bg-main-600"}`}
                                        >
                                            <i className="ph-bold ph-list-dashes" />
                                        </button>
                                        <button onClick={() => setGrid(false)}
                                            type="button"
                                            className={`w-44 h-44 flex-center border rounded-6 text-2xl grid-btn border-gray-100 ${grid === false && "border-main-600 text-white bg-main-600"}`}
                                        >
                                            <i className="ph ph-squares-four" />
                                        </button>
                                    </div>

                                </div>
                            </div>

                            {/* Top End */}
                            <div className={`list-grid-wrapper ${grid && 'list-view'}`}>
                                {products?.length > 0 ? (
                                    products.map((product) => {
                                        // ✅ Slugify product name
                                        const productSlug = slugify(product.name || "", { lower: true, strict: true });

                                        return (
                                            <div key={product._id} className="product-card h-100 p-16 border border-gray-100 hover-border-main-600 rounded-16 position-relative transition-2">
                                                <Link to={`/product/${productSlug}-${product._id}`} className="product-card__thumb flex-center rounded-8 bg-gray-50 position-relative">
                                                    <img
                                                        src={product.product_image ? `${process.env.REACT_APP_BASE_URL_PRIMARY}${product.product_image}` : 'https://placehold.co/100x100'}
                                                        alt={product.name}
                                                        className="w-auto max-w-unset"
                                                    />
                                                </Link>
                                                <div className="product-card__content mt-16">
                                                    <h6 className="title text-lg fw-semibold mt-12 mb-8">
                                                        <Link to={`/product/${productSlug}-${product._id}`} className="link text-line-2">
                                                            {product.name}
                                                        </Link>
                                                    </h6>
                                                    <div className="product-card__price my-20">
                                                        <span className="text-gray-400 text-md fw-semibold text-decoration-line-through">
                                                            Rs.{product.price_per_unit}
                                                        </span>
                                                        <span className="text-heading text-md fw-semibold">${product.quantity} /Qty</span>
                                                    </div>

                                                    <Button
                                                        className='btn btn-success btn-block w-100'
                                                        onClick={() => {
                                                            dispatch(setSelectedProduct(product)); // ✅ Redux me product set karo
                                                            setShowModal(true); // ✅ Modal open karo
                                                        }}
                                                    >
                                                        Request Order
                                                    </Button>
                                                </div>
                                            </div>
                                        );
                                    })
                                ) : (
                                    <p>No products found</p>
                                )}
                            </div>


                            {/* Pagination Start */}
                            <ProductPagination />
                            {/* Pagination End */}

                        </div>
                        {/* Content End */}
                    </div>
                </div>
            </section>

            <RequestOrderModal
                show={showModal}
                handleClose={() => setShowModal(false)}
                handleSubmit={handleSubmit}
            />

        </>

    )
}

export default ShopSection