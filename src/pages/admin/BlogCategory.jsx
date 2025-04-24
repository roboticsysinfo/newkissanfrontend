import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import DataTable from "react-data-table-component";
import { useDispatch, useSelector } from "react-redux";
import { fetchBlogCategories, addBlogCategory, deleteBlogCategory } from "../../redux/slices/blogCategorySlice";

const BlogCategory = () => {
    const { register, handleSubmit, reset } = useForm();
    const dispatch = useDispatch();

    const { blogcategories, loading } = useSelector((state) => state.blogCategory);

    // Fetch categories on component mount
    useEffectt(() => {
        dispatch(fetchBlogCategories());
    }, [dispatch]);

    const onSubmit = (data) => {
        dispatch(addBlogCategory(data));
        reset();
    };

    const handleDelete = (id) => {
        if (window.confirm("Are you sure you want to delete this category?")) {
            dispatch(deleteBlogCategory(id));
        }
    };

    const columns = [
        { name: "Category Name", selector: (row) => row.Blog_category_name, sortable: true },
        { name: "Created At", selector: (row) => new Date(row.createdAt).toLocaleDateString(), sortable: true },
        {
            name: "Actions",
            cell: (row) => (
                <button onClick={() => handleDelete(row._id)} className="btn btn-danger btn-sm">
                    Delete
                </button>
            ),
        },
    ];

    return (
        <div className="max-w-3xl mx-auto p-40 border rounded-lg bg-white">
            {/* Form for adding categories */}
            <h2 className="text-xl font-semibold mb-20">Add Blog Category</h2>
            <hr />
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-3 dflexinpugroup">
                <div className="form-group mb-30">
                    <label className="block text-sm font-medium">Category Name</label>
                    <input
                        {...register("Blog_category_name", { required: true })}
                        type="text"
                        className="w-full border rounded-lg form-control"
                        placeholder="Enter category name"
                        required
                    />
                </div>
                <button
                    type="submit"
                    className="btn btn-success"
                    disabled={loading}
                >
                    {loading ? "Adding..." : "Add Category"}
                </button>
            </form>

            <hr />

            {/* DataTable to show categories */}
            <div className="mt-6">
                <h2 className="text-xl font-semibold mb-4">Blog Categories</h2>
                <DataTable
                    columns={columns}
                    data={blogcategories}
                    progressPending={loading}
                    pagination
                    highlightOnHover
                />
            </div>
        </div>
    );
};

export default BlogCategory;
