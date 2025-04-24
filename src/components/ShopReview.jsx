
import { Link } from 'react-router-dom'
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteReview, fetchReviewsbyShopId, submitReview } from "../redux/slices/reviewSlice";
import { useParams } from "react-router-dom";
import { FaRegTrashAlt } from "react-icons/fa";
import toast from 'react-hot-toast';
import moment from 'moment'

const ShopReview = () => {

    const dispatch = useDispatch();
    const { reviews, loading, error } = useSelector((state) => state.reviews);

    const { slug } = useParams(); // Get Shop Id From URL
    const slugParts = slug.split('-');
    const shopId = slugParts[slugParts.length - 1]; // last part productId 

    const user = JSON.parse(localStorage.getItem("user"));
    const userId = user?.id;


    const overallRating = reviews?.length
        ? reviews.reduce((acc, review) => acc + review.rating, 0) / reviews.length
        : 0;



    const [rating, setRating] = useState("");
    const [comment, setComment] = useState("");

    useEffect(() => {
        dispatch(fetchReviewsbyShopId(shopId));
    }, [dispatch, , shopId]);


    const handleSubmit = (e) => {
        e.preventDefault();
        if (!userId) {
            alert("Please login to submit a review.");
            return;
        }
        dispatch(submitReview({ shop_id: shopId, userId, rating, comment }));
        setRating("");
        setComment("");
    };

    const handleDelete = (reviewId) => {
        if (window.confirm("Are you sure you want to delete this review?")) {
            dispatch(deleteReview(reviewId));
            toast.success("Review Delete Successfully")
        }

    };



    return (
        <>

            <hr />

            <div className='container'>

                <div className="row g-4">

                    <div className="col-lg-8">
                        <h6 className="mb-24">Reviews</h6>
                        {loading && <p>Loading...</p>}
                        {error && <p className="text-danger">{error}</p>}
                        {reviews?.length > 0 ? (
                            reviews.map((review, index) => (
                                <div key={index} className="d-flex align-items-start gap-24 pb-44 border-bottom border-gray-100 mb-44">

                                    <div className="flex-grow-1 review-card">
                                        <div className="flex-between align-items-start gap-8">
                                            <div>
                                                <h6 className="mb-12 text-md">{review.user_id?.name}</h6>
                                                <div className="flex-align gap-8">
                                                    {[...Array(review.rating)].map((_, i) => (
                                                        <span key={i} className="text-15 fw-medium text-warning-600 d-flex">
                                                            <i className="ph-fill ph-star" />
                                                        </span>
                                                    ))}
                                                </div>
                                            </div>
                                            <span className="text-gray-800 text-xs">{moment(review.createdAt).format("DD MMM YYYY, h:mm A")}</span>
                                        </div>
                                        <h6 className="mb-14 text-md mt-10">{review.title}</h6>
                                        <p className="text-gray-700">{review.comment}</p>
                                        <div className="flex-align gap-20 mt-10">
                                            {review.user_id?._id === userId && (
                                                <button
                                                    className="flex-align gap-12 text-red-700 hover-text-danger-600"
                                                    onClick={() => handleDelete(review._id)}
                                                >
                                                    <FaRegTrashAlt /> Delete
                                                </button>
                                            )}

                                        </div>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <p>No reviews yet.</p>
                        )}

                        <div className="mt-56">
                            <h6 className="mb-24">Write a Review</h6>
                            <hr />

                            <div className="mt-32">

                                {userId ? (
                                    <>

                                        <form onSubmit={handleSubmit}>
                                            <div className="mb-32">
                                                <label htmlFor="rating" className="text-neutral-600 mb-8">Rating</label>
                                                <select id="rating" className="common-input rounded-8" value={rating} onChange={(e) => setRating(e.target.value)}>
                                                    <option value="">Select Rating</option>
                                                    {[1, 2, 3, 4, 5].map((star) => (
                                                        <option key={star} value={star}>{"⭐".repeat(star)}</option>
                                                    ))}
                                                </select>
                                            </div>

                                            <div className="mb-32">
                                                <label htmlFor="desc" className="text-neutral-600 mb-8">Review Content</label>
                                                <textarea className="common-input rounded-8" id="desc" value={comment} onChange={(e) => setComment(e.target.value)} />
                                            </div>
                                            <button type="submit" className="btn btn-main rounded-pill">Submit Review</button>
                                        </form>

                                    </>


                                ) : (
                                    <p className="text-danger">Please <Link to="/login">login</Link> to submit a review.</p>
                                )}



                            </div>
                        </div>
                    </div>

                    <div className="col-lg-4">
                        <div className="ms-xxl-5">
                            <h6 className="mb-24">Customers Feedback</h6>
                            <div className="d-flex flex-wrap gap-44">
                                <div className="border border-gray-100 rounded-8 px-40 py-52 flex-center flex-column flex-shrink-0 text-center">
                                    <h2 className="mb-6 text-main-600">
                                        {overallRating ? overallRating : "0.0"}
                                    </h2>

                                    <div className="flex-center gap-8">
                                        <span className="text-15 fw-medium text-warning-600 d-flex">
                                            <i className="ph-fill ph-star" />
                                        </span>
                                        <span className="text-15 fw-medium text-warning-600 d-flex">
                                            <i className="ph-fill ph-star" />
                                        </span>
                                        <span className="text-15 fw-medium text-warning-600 d-flex">
                                            <i className="ph-fill ph-star" />
                                        </span>
                                        <span className="text-15 fw-medium text-warning-600 d-flex">
                                            <i className="ph-fill ph-star" />
                                        </span>
                                        <span className="text-15 fw-medium text-warning-600 d-flex">
                                            <i className="ph-fill ph-star" />
                                        </span>
                                    </div>
                                    <span className="mt-16 text-gray-500">
                                        Overall Rating
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>

            <hr />

        </>
    )
}

export default ShopReview