import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchBanners, addBanner, updateBanner, deleteBanner } from "../../redux/slices/bannersSlice";
import { fetchCategories } from "../../redux/slices/categorySlice";

const BannerForm = () => {
    const dispatch = useDispatch();
    const { banners, status } = useSelector((state) => state.banners);
    const { categories } = useSelector((state) => state.categories);

    const [title, setTitle] = useState("");
    const [category, setCategory] = useState("");
    const [banner_image, setBannerImage] = useState(null);
    const [editBannerId, setEditBannerId] = useState(null); // Track if editing a banner

    useEffect(() => {
        dispatch(fetchBanners());
        dispatch(fetchCategories());
    }, [dispatch]);

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (!file) {
            console.error("❌ No file selected!");
            return;
        }
        setBannerImage(file); // Ensure image is being set
    };


    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!title || !category || !banner_image) {
            alert("⚠ All fields are required!");
            return;
        }

        const formData = new FormData();
        formData.append("title", title);
        formData.append("category", category);
        formData.append("banner_image", banner_image); // ✅ Changed field name


        if (editBannerId) {
            await dispatch(updateBanner({ bannerId: editBannerId, bannerData: formData }));
        } else {
            await dispatch(addBanner(formData));
        }

        setTitle("");
        setCategory("");
        setBannerImage(null);
        setEditBannerId(null);
    };

    const handleEdit = (banner) => {
        setTitle(banner.title);
        setCategory(banner.category);
        setEditBannerId(banner._id);
    };

    const handleDelete = (bannerId) => {
        if (window.confirm("Are you sure you want to delete this banner?")) {
            dispatch(deleteBanner(bannerId));
        }
    };

    return (
        <div className="p-40 border border-rounded">
            <h2 className="text-xl">{editBannerId ? "Edit Banner" : "Upload Banner"}</h2>
            <hr />
            <form onSubmit={handleSubmit} encType="multipart/form-data">
                <div className="form-group mb-30">
                    <label>Title:</label>
                    <input
                        className="form-control"
                        type="text"
                        value={title}
                        name="title"
                        onChange={(e) => setTitle(e.target.value)}
                        required
                    />
                </div>

                <div className="form-group mb-30">
                    <label>Category:</label>
                    <select
                        className="form-control"
                        value={category}
                        name="category"
                        onChange={(e) => setCategory(e.target.value)}
                        required
                    >
                        <option value="">Select Category</option>
                        {categories.map((cat) => (
                            <option key={cat._id} value={cat._id}>
                                {cat.name}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="form-group mb-30">
                    <label>Banner Image:</label>
                    <input className="form-control" type="file" name="banner_image" onChange={handleFileChange} required={!editBannerId} />
                </div>

                <button className="btn btn-primary" type="submit">
                    {editBannerId ? "Update Banner" : "Add Banner"}
                </button>
            </form>

            <hr />

            <h3 className="mt-40">Existing Banners</h3>

            <hr />

            <div class="table-responsive">
                <table className="table table-borderd table-striped">
                    <thead>
                        <tr>
                            <th>Banner Title</th>
                            <th>Banner Image</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {status === "loading" ? (
                            <p>Loading...</p>
                        ) : (
                            banners.map((banner) => (
                                <tr key={banner._id}>
                                    <td>{banner.title}</td>
                                    <td>
                                        <img src={`${process.env.REACT_APP_BASE_URL_SECONDARY}${banner.banner_image}`} alt={banner.title} width="100" />
                                    </td>
                                    <td>
                                        <button onClick={() => handleEdit(banner)}>Edit</button>
                                        <button onClick={() => handleDelete(banner._id)}>Delete</button>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>

        </div>
    );
};

export default BannerForm;
