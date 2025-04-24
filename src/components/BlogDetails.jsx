import React, { useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { fetchBlogById, fetchBlogs } from '../redux/slices/blogSlice';
import { useDispatch, useSelector } from 'react-redux';
import { fetchBlogCategories } from '../redux/slices/blogCategorySlice';
import axiosInstance from '../utils/axiosInstance';
import { Helmet } from 'react-helmet-async';

const BlogDetails = () => {

    const { slug } = useParams();
    const dispatch = useDispatch();

    const { blogDetails, blogloading, blogError } = useSelector((state) => state.blogs);
    const { blogcategories, } = useSelector((state) => state.blogCategory);
    const { blogs, } = useSelector((state) => state.blogs);

    const slugParts = slug.split('-'); 
    const blogId = slugParts[slugParts.length - 1]; // last part productId 



    useEffect(() => {
        dispatch(fetchBlogById(blogId));
        dispatch(fetchBlogs());
        dispatch(fetchBlogCategories());
    }, [dispatch]);


    useEffect(() => {
        const increaseViewCount = async () => {
            const viewedBlogs = JSON.parse(localStorage.getItem("viewedBlogs")) || [];

            if (!viewedBlogs.includes(blogId)) {
                try {
                    await axiosInstance.put(`/blog/view/${blogId}`);

                    // Local Storage me blog ID store kar lo
                    localStorage.setItem("viewedBlogs", JSON.stringify([...viewedBlogs, blogId]));
                } catch (error) {
                    console.error("Error increasing view count:", error);
                }
            }
        };

        increaseViewCount();
    }, [blogId]);

    // Show loading state
    if (blogloading) return <p>Loading...</p>;

    // Show error state
    if (blogError) return <p className="text-red-500">Error: {blogError}</p>;

    // Show when blog details are still null
    if (!blogDetails) return <p>No blog details found.</p>;


    return (

        <>

            {/* SEO Meta Tags */}
            <Helmet>
                <title>{blogDetails.metaTitle}</title>
                <meta name="description" content={blogDetails.metaDescription} />
                <meta name="keywords" content={blogDetails.metaKeywords} />
                <meta property="og:title" content={blogDetails.metaTitle} />
                <meta property="og:description" content={blogDetails.metaDescription} />
                <meta property="og:type" content="website" />
            </Helmet>

            <section className="blog-details py-80">

                <div className="container container-lg">
                    <div className="row gy-5">
                        <div className="col-lg-8 pe-xl-4">
                            <div className="blog-item-wrapper">
                                <div className="blog-item">
                                    <img
                                        src={`${process.env.REACT_APP_BASE_URL_PRIMARY}${blogDetails.blog_image}`}
                                        alt={blogDetails.imageAltText || "Blog Image"}
                                        className="cover-img rounded-16"
                                    />
                                    <div className="blog-item__content mt-24">
                                        <span className="bg-main-50 text-main-600 py-4 px-24 rounded-8 mb-16">
                                            {blogDetails.blog_category?.Blog_category_name}
                                        </span>

                                        <div className='dflexinpugroup my-20'>

                                            <div className="flex-align flex-wrap gap-8">
                                                <span className="text-lg text-main-600">
                                                    <i className="ph ph-calendar-dots" />
                                                </span>
                                                <span className="text-sm text-gray-500">
                                                    <Link
                                                        
                                                        className="text-gray-500 hover-text-main-600"
                                                    >
                                                        {new Date(blogDetails.createdAt).toDateString()}
                                                    </Link>
                                                </span>
                                            </div>

                                            <div className="flex-align flex-wrap gap-8">
                                                <span className="text-lg text-main-600">
                                                    <i className="ph ph-eye" />
                                                </span>
                                                <span className="text-sm text-gray-500">
                                                    <Link
                                                        to={`/blog/${blogDetails._id}`}
                                                        className="text-gray-500 hover-text-main-600"
                                                    >
                                                        {blogDetails.blog_views || 0} View
                                                    </Link>
                                                </span>
                                            </div>

                                        </div>

                                        <h4 className="mb-24">
                                            {blogDetails.blog_title}
                                        </h4>

                                        <div dangerouslySetInnerHTML={{ __html: blogDetails.blog_content || "No content available" }} />


                                    </div>
                                </div>
                            </div>

                            <div className="my-48">
                                <span className="border-bottom border-gray-100 d-block" />
                            </div>

                        </div>
                        <div className="col-lg-4 ps-xl-4">
                            {/* Search Start */}
                            <div className="blog-sidebar border border-gray-100 rounded-8 p-32 mb-40">
                                <h6 className="text-xl mb-32 pb-32 border-bottom border-gray-100">
                                    Search Here
                                </h6>
                                <form action="#">
                                    <div className="input-group">
                                        <input
                                            type="text"
                                            className="form-control common-input bg-color-three"
                                            placeholder="Searching..."
                                        />
                                        <button
                                            type="submit"
                                            className="btn btn-main text-2xl h-56 w-56 flex-center text-2xl input-group-text"
                                        >
                                            <i className="ph ph-magnifying-glass" />
                                        </button>
                                    </div>
                                </form>
                            </div>
                            {/* Search End */}

                            {/* Recent Post Start */}

                            <div className="blog-sidebar border border-gray-100 rounded-8 p-32 mb-40">
                                <h6 className="text-xl mb-32 pb-32 border-bottom border-gray-100">
                                    Recent Blogs
                                </h6>

                                {blogs.map((blog) => (

                                    <div key={blog._id} className="d-flex align-items-center flex-sm-nowrap flex-wrap gap-24 mb-16">
                                        <Link
                                            to={`/blog/${blog._id}`}
                                            className="w-100 h-100 rounded-4 overflow-hidden w-120 h-120 flex-shrink-0"
                                        >
                                            <img
                                                src={`${process.env.REACT_APP_BASE_URL_PRIMARY}${blog.blog_image}` || "https://via.placeholder.com/300"}
                                                alt={blog.imageAltText || "Blog Image"}
                                                className="cover-img"
                                            />
                                        </Link>

                                        <div className="flex-grow-1">
                                            <h6 className="text-lg">
                                                <Link to={`/blog/${blog._id}`} className="">
                                                    {blog.blog_title}
                                                </Link>
                                            </h6>
                                            <div className="flex-align flex-wrap gap-8">
                                                <span className="text-lg text-main-600">
                                                    <i className="ph ph-calendar-dots" />
                                                </span>
                                                <span className="text-sm text-gray-500">
                                                    <Link

                                                        className="text-gray-500 hover-text-main-600"
                                                    >
                                                        {new Date(blog.createdAt).toDateString()}
                                                    </Link>
                                                </span>
                                            </div>
                                        </div>
                                    </div>

                                ))}

                            </div>
                            {/* Recent Post End */}

                            {/* Category Start */}
                            <div className="blog-sidebar border border-gray-100 rounded-8 p-32 mb-40">

                                <h6 className="text-xl mb-32 pb-32 border-bottom border-gray-100">
                                    Blog Categories
                                </h6>

                                {blogcategories.length > 0 ? (
                                    <ul>
                                        {blogcategories.map((blogCategory) => (
                                            <li key={blogCategory.id} className="mb-16">
                                                <Link
                                                    to={`/blogs/category/${blogCategory.slug}`} // Dynamic Link for category filter
                                                    className="flex-between gap-8 text-gray-700 border border-gray-100 rounded-4 p-4 ps-16 hover-border-main-600 hover-text-main-600"
                                                >
                                                    <span>{blogCategory.Blog_category_name}</span>
                                                    <span className="w-40 h-40 flex-center rounded-4 bg-main-50 text-main-600">
                                                        <i className="ph ph-arrow-right" />
                                                    </span>
                                                </Link>
                                            </li>
                                        ))}
                                    </ul>
                                ) : (
                                    <p className="text-gray-500">No categories found.</p>
                                )}



                            </div>
                            {/* Category End */}

                        </div>
                    </div>
                </div>
            </section>


        </>



    )
}

export default BlogDetails