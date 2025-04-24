import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Card, CardBody } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { updateShop } from "../../../redux/slices/shopSlice"; // Import your Redux action
import toast from "react-hot-toast";
import Select from "react-select";
import api from "../../../utils/api"
import { jwtDecode } from 'jwt-decode';

const UpdateShop = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading, error, success } = useSelector((state) => state.shop); // Access shop slice state

  const [shopData, setShopData] = useState({
    shop_name: "",
    shop_description: "",
    pricing_preference: "fixed_price",
    preferred_buyers: "retail_customers",
    village_name: "",
    shop_profile_image: null,
    shop_cover_image: null,
    shop_image: [],
    shop_address: "",
    phoneNumber: "",
    state: "",
    city_district: "",
    whatsappNumber: "",
  });

  const [states, setStates] = useState([]);
  const [districts, setDistricts] = useState([]);

  useEffect(() => {
    const fetchStates = async () => {
      try {
        const response = await api.get("/states-cities"); // Replace with your actual endpoint
        setStates(response.data || []);
      } catch (error) {
        toast.error("Error fetching states.");
      }
    };

    fetchStates();
  }, []);

  const handleStateChange = (selectedState) => {
    setShopData({ ...shopData, state: selectedState.label, city_district: "" });
    const selected = states.find((state) => state.state === selectedState.label);
    if (selected) {
      setDistricts(selected.districts.map((district) => ({ label: district, value: district })));
    } else {
      setDistricts([]); // Reset districts if no state is found
    }
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files) {
      if (name === "shop_image") {
        setShopData({ ...shopData, [name]: [...files] });
      } else {
        setShopData({ ...shopData, [name]: files[0] });
      }
    } else {
      setShopData({ ...shopData, [name]: value });
    }
  };


  const handleSubmit = (e) => {
    e.preventDefault();

    // Retrieve the token from localStorage
    const token = localStorage.getItem("token"); // Replace with your actual token key in localStorage

    if (!token) {
      toast.error("Token not found, please login.");
      return;
    }

    try {
      // Decode the JWT token
      const decodedToken = jwtDecode(token);

      // Extract the userId from the decoded token (assuming the userId is in the token payload)
      const farmer_id = decodedToken.userId; // Use 'userId' instead of 'farmerId'

      if (!farmer_id) {
        toast.error("Farmer ID not found in token.");
        return;
      }

      // Create FormData to handle file uploads
      const formDataObj = new FormData();
      formDataObj.append("shop_name", shopData.shop_name);
      formDataObj.append("shop_description", shopData.shop_description);
      formDataObj.append("shop_location", shopData.shop_location);
      formDataObj.append("pricing_preference", shopData.pricing_preference);
      formDataObj.append("preferred_buyers", shopData.preferred_buyers);
      formDataObj.append("village_name", shopData.village_name);
      formDataObj.append("shop_address", shopData.shop_address);
      formDataObj.append("phoneNumber", shopData.phoneNumber);
      formDataObj.append("whatsappNumber", shopData.whatsappNumber);
      formDataObj.append("state", shopData.state);
      formDataObj.append("city_district", shopData.city_district);
      formDataObj.append("farmer_id", farmer_id);

      // If files are provided, append them to the shopData
      if (shopData.shop_profile_image) {
        formDataObj.append("shop_profile_image", shopData.shop_profile_image);
      }
      if (shopData.shop_cover_image) {
        formDataObj.append("shop_cover_image", shopData.shop_cover_image);
      }
      if (shopData.shop_image && shopData.shop_image.length > 0) {
        shopData.shop_image.forEach((file) => {
          formDataObj.append("shop_image", file);
        });
      }

      // Send the formData to the server using API call
      dispatch(updateShop(formDataObj));


    } catch (error) {
      toast.error("Error decoding token.");
    }
  };


  useEffect(() => {
    if (success) {
      toast.success("Shop created successfully!");
      navigate("/farmer/dashboard");
    }
    if (error) {
      toast.error(error.message || "Something went wrong.");
    }
  }, [success, error, navigate]);

  return (
    <div className="container mt-5">
      <div className="row mt-20 align-items-center">
        <div className="col-lg-6 col-md-12 col-xs-12 col-sm-12">
          <h3>Update Shop Detail</h3>
        </div>
        <div className="col-lg-6 col-md-12 col-xs-12 col-sm-12 text-end">
          <Link className="btn btn-success float-right" to="shop-details">View Shop Details</Link>
        </div>
      </div>

      <hr />

      <Card>
        <CardBody className="p-60">
          <form onSubmit={handleSubmit} encType="multipart/form-data">
            <div className="mb-20">
              <label className="form-label">Shop Name</label>
              <input
                type="text"
                className="form-control"
                name="shop_name"
                value={shopData.shop_name}
                onChange={handleChange}
                required
              />
            </div>

            <div className="mb-20">
              <label className="form-label">Shop Address</label>
              <input
                type="text"
                className="form-control"
                name="shop_address"
                value={shopData.shop_address}
                onChange={handleChange}
                required
              />
            </div>

            <div className="row">

              <div className="col-lg-4">
                <div className="mb-20">
                  <label className="form-label">State</label>
                  <Select
                    options={states.map((state) => ({
                      label: state.state,
                      value: state._id,
                    }))}
                    onChange={handleStateChange}
                    placeholder="Select State"
                    required
                  />
                </div>
              </div>

              <div className="col-lg-4">
                <div className="mb-20">
                  <label className="form-label">City/District</label>
                  <Select
                    options={districts}
                    onChange={(selectedDistrict) =>
                      setShopData({ ...shopData, city_district: selectedDistrict.label }) // Update `shopData.city_district` with the district name
                    }
                    placeholder="Select District"
                    value={
                      shopData.city_district
                        ? { label: shopData.city_district, value: shopData.city_district }
                        : null // Match the selected district's value format
                    }
                    isDisabled={!districts.length}
                    required
                  />
                </div>
              </div>


              <div className="col-lg-4 col-md-12 col-sm-12">
                <div className="mb-20">
                  <label className="form-label">Village (Optional)</label>
                  <input
                    type="text"
                    className="form-control"
                    name="village_name"
                    value={shopData.village_name}
                    onChange={handleChange}
                  />
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col-lg-6 col-xs-12 col-sm-12">
                <div className="mb-20">
                  <label className="form-label">Phone Number</label>
                  <input
                    type="text"
                    className="form-control"
                    name="phoneNumber"
                    value={shopData.phoneNumber}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="col-lg-6 col-xs-12 col-sm-12">
                <div className="mb-20">
                  <label className="form-label">Whatsapp Number</label>
                  <input
                    type="text"
                    className="form-control"
                    name="whatsappNumber"
                    value={shopData.whatsappNumber}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col-lg-6 col-xs-12 col-sm-12">
                <div className="mb-20">
                  <label className="form-label">Pricing Preference</label>
                  <select
                    className="form-control"
                    name="pricing_preference"
                    value={shopData.pricing_preference}
                    onChange={handleChange}
                    required
                  >
                    <option value="fixed_price">Fixed Price</option>
                    <option value="negotiation_price">Negotiated Price</option>
                  </select>
                </div>
              </div>
              <div className="col-lg-6 col-xs-12 col-sm-12">
                <div className="mb-20">
                  <label className="form-label">Preferred Buyers</label>
                  <select
                    className="form-control"
                    name="preferred_buyers"
                    value={shopData.preferred_buyers}
                    onChange={handleChange}
                    required
                  >
                    <option value="retail_customers">Retail Customers</option>
                    <option value="wholesalers">Wholesalers</option>
                    <option value="restaurants">Restaurants</option>
                    <option value="hotels">Hotels</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="mb-20">
              <label className="form-label">Shop Description</label>
              <textarea
                className="form-control"
                name="shop_description"
                value={shopData.shop_description}
                onChange={handleChange}
                required
              />
            </div>

            <div className="row">
              <div className="col-lg-12 col-xs-12 col-sm-12">
                <div className="mb-20">
                  <label className="form-label">Shop Profile Image</label>
                  <input
                    type="file"
                    id="shop_profile_image"
                    className="form-control"
                    name="shop_profile_image"
                    onChange={handleChange}
                    
                  />
                </div>
              </div>
              <div className="col-lg-12 col-xs-12 col-sm-12">
                <div className="mb-20">
                  <label className="form-label">Shop Cover Image</label>
                  <input
                    type="file"
                    id="shop_cover_image"
                    className="form-control"
                    name="shop_cover_image"
                    onChange={handleChange}
                    
                  />
                </div>
              </div>
              <div className="col-lg-12 col-xs-12 col-sm-12">
                <div className="mb-20">
                  <label className="form-label">Shop Images (Max 5)</label>
                  <input
                    type="file"
                    className="form-control"
                    name="shop_image"
                    id="shop_image"
                    onChange={handleChange}
                    multiple
                    
                  />
                </div>
              </div>
            </div>

            <button type="submit" className="btn btn-success w-100">
              Add Shop
            </button>
          </form>
        </CardBody>
      </Card>
    </div>
  );
};

export default UpdateShop;
