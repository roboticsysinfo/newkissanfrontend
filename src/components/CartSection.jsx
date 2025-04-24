import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { fetchCart, removeFromCart } from '../redux/slices/cartSlice';
import { useDispatch, useSelector } from 'react-redux';
import toast from 'react-hot-toast';
import { FaIndianRupeeSign } from "react-icons/fa6";

const CartSection = () => {
    const dispatch = useDispatch();
    const { cartItems, status, error } = useSelector((state) => state.cart);

    useEffect(() => {
        dispatch(fetchCart());
    }, [dispatch]);

    const handleRemove = (id) => {
        dispatch(removeFromCart(id));
        toast.success("❌ Product removed from cart!");
    };

    if (status === "loading") return <p>Loading...</p>;
    if (status === "failed") return <p>Error: {error}</p>;

    return (
        <section className="cart py-80">
            <div className="container container-lg">
                <div className="row gy-4">
                    <div className="col-xl-9 col-lg-8">
                        <div className="cart-table border border-gray-100 rounded-8 px-40 py-48">
                            <div className="overflow-x-auto scroll-sm scroll-sm-horizontal">
                                <table className="table style-three">
                                    <thead>
                                        <tr>
                                            <th className="h6 mb-0 text-lg fw-bold">Delete</th>
                                            <th className="h6 mb-0 text-lg fw-bold">Product Name</th>
                                            <th className="h6 mb-0 text-lg fw-bold">Price</th>
                                            <th className="h6 mb-0 text-lg fw-bold">Quantity</th>
                                            <th className="h6 mb-0 text-lg fw-bold">Subtotal</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {cartItems.length > 0 ? (
                                            cartItems.map((item) => (
                                                <tr key={item._id}>
                                                    <td>
                                                        <button
                                                            type="button"
                                                            className="remove-tr-btn flex-align gap-12 hover-text-danger-600"
                                                            onClick={() => handleRemove(item._id)}
                                                        >
                                                            <i className="ph ph-x-circle text-2xl d-flex" />
                                                            Remove
                                                        </button>
                                                    </td>
                                                    <td>
                                                        <div className="table-product d-flex align-items-center gap-24">
                                                            <Link
                                                                to={`/product/${item._id}`}
                                                                className="table-product__thumb border border-gray-100 rounded-8 flex-center"
                                                            >
                                                                <img
                                                                    src={item.product?.product_image ? `${process.env.REACT_APP_BASE_URL_SECONDARY}${item.product?.product_image}` : 'https://placehold.co/100x100'}
                                                                    alt={item?.product?.name || "Product Image"}
                                                                />

                                                            </Link>
                                                            <div className="table-product__content text-start">
                                                                <h6 className="title text-lg fw-semibold mb-8">
                                                                    <Link
                                                                        to={`/product/${item._id}`}
                                                                        className="link text-line-2"
                                                                        tabIndex={0}
                                                                    >
                                                                        {item.product?.name}
                                                                    </Link>
                                                                </h6>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <span className="text-lg h6 mb-0 fw-semibold"><FaIndianRupeeSign />{item.product?.price_per_unit}</span>
                                                    </td>
                                                    <td>
                                                        <span className="text-lg h6 mb-0 fw-semibold">{item.quantity}</span>
                                                    </td>
                                                    <td>
                                                        <span className="text-lg h6 mb-0 fw-semibold"><FaIndianRupeeSign />{item.product?.price_per_unit * item.quantity}</span>
                                                    </td>
                                                </tr>
                                            ))
                                        ) : (
                                            <tr>
                                                <td colSpan="5" className="text-center">
                                                    <p>Your cart is empty.</p>
                                                </td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                    <div className="col-xl-3 col-lg-4">
                        <div className="cart-sidebar border border-gray-100 rounded-8 px-24 py-40">
                            <h6 className="text-xl mb-32">Cart Totals</h6>
                            <div className="bg-color-three rounded-8 p-24">
                                <div className="mb-32 flex-between gap-8">
                                    <span className="text-gray-900 font-heading-two">Subtotal</span>
                                    <span className="text-gray-900 fw-semibold">
                                        <FaIndianRupeeSign />{cartItems.reduce((total, item) => total + item.product?.price_per_unit * item.quantity, 0)}
                                    </span>
                                </div>
                            </div>
                            <Link
                                to="/checkout"
                                className="btn btn-main mt-40 py-18 w-100 rounded-8"
                            >
                                Confirm Order
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default CartSection;