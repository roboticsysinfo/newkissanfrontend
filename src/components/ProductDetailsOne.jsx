import React, { useState } from 'react'
import { FaIndianRupeeSign } from 'react-icons/fa6';
import { useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import RequestOrderModal from './RequestOrderModal';
import { Button } from 'react-bootstrap';

const ProductDetailsOne = () => {

    const [showModal, setShowModal] = useState(false);
    const { slug } = useParams(); // Get Product Id From URL

    const slugParts = slug.split('-'); 
    const productId = slugParts[slugParts.length - 1]; // last part productId 


    const { data: products } = useSelector(
        (state) => state.products
    );

    const product = products.find((item) => item._id.toString() === productId);
    

    const handleSubmit = (data) => {

        // Here, you can send the form data to the backend
    };

    // increment & decrement
    const [quantity, setQuantity] = useState(1);
    const incrementQuantity = () => setQuantity(quantity + 1);
    const decrementQuantity = () =>
        setQuantity(quantity > 1 ? quantity - 1 : quantity);


    return (
        <>
            <section className="product-details py-80">
                <div className="container container-lg">
                    <div className="row gy-4">
                        <div className="col-lg-12">
                            <div className="row gy-4">
                                <div className="col-xl-4">
                                    <div className="product-details__left">
                                        <div className="product-details__thumb-slider border border-gray-100 rounded-16">
                                            <div className="">
                                                <div className="product-details__thumb flex-center h-100">
                                                    <img src={product?.product_image || "default-image.png"} alt="Main Product" />
                                                </div>
                                            </div>
                                        </div>

                                    </div>
                                </div>
                                <div className="col-xl-8">
                                    <div className="product-details__content">
                                        <h5 className="mb-12">{product?.name}</h5>
                                        <span className="mt-32 pt-32 text-gray-700 border-top border-gray-100 d-block" />
                                        <p className="text-gray-700">
                                            {product?.description}
                                        </p>
                                        <div className="mt-32 flex-align flex-wrap gap-32">
                                            <div className="flex-align gap-8">
                                                <h4 className="mb-0"><FaIndianRupeeSign />{product?.price_per_unit}</h4>
                                            </div>
                                        </div>
                                        <span className="mt-32 pt-32 text-gray-700 border-top border-gray-100 d-block" />

                                        <span className="text-gray-900 d-block mb-8">Quantity:</span>
                                        <div className="flex-between gap-16 flex-wrap">
                                            <div className="flex-align flex-wrap gap-16">
                                                <div className="border border-gray-100 rounded-pill py-9 px-16 flex-align">
                                                    <button onClick={decrementQuantity}
                                                        type="button"
                                                        className="quantity__minus p-4 text-gray-700 hover-text-main-600 flex-center"
                                                    >
                                                        <i className="ph ph-minus" />
                                                    </button>
                                                    <input
                                                        type="number"
                                                        className="quantity__input border-0 text-center w-32"
                                                        value={quantity} readOnly
                                                    />
                                                    <button onClick={incrementQuantity}
                                                        type="button"
                                                        className="quantity__plus p-4 text-gray-700 hover-text-main-600 flex-center"
                                                    >
                                                        <i className="ph ph-plus" />
                                                    </button>
                                                </div>

                                                <Button variant="success" onClick={() => setShowModal(true)}>
                                                    Request Product
                                                </Button>

                                            </div>

                                        </div>

                                        <span className="mt-32 pt-32 text-gray-700 border-top border-gray-100 d-block" />

                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                    <div className="pt-80">
                        <div className="product-dContent border rounded-24">
                            <div className="product-dContent__header border-bottom border-gray-100 flex-between flex-wrap gap-16">
                                <ul
                                    className="nav common-tab nav-pills mb-3"
                                    id="pills-tab"
                                    role="tablist"
                                >
                                    <li className="nav-item" role="presentation">
                                        <button
                                            className="nav-link active"
                                            id="pills-description-tab"
                                            data-bs-toggle="pill"
                                            data-bs-target="#pills-description"
                                            type="button"
                                            role="tab"
                                            aria-controls="pills-description"
                                            aria-selected="true"
                                        >
                                            Description
                                        </button>
                                    </li>
                                </ul>
                            </div>
                            <div className="product-dContent__box">
                                <div className="tab-content show" id="pills-tabContent">

                                    <div
                                        className="tab-pane fade show active"
                                        id="pills-description"
                                        role="tabpanel"
                                        aria-labelledby="pills-description-tab"
                                        tabIndex={0}
                                    >
                                        <div className="mb-40">
                                            <h6 className="mb-24">Product Description</h6>
                                            {product.description}
                                        </div>

                                    </div>

                                </div>
                            </div>
                        </div>
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

export default ProductDetailsOne