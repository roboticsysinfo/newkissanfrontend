import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Card, CardBody } from "react-bootstrap";
import api from "../../../utils/api";  // Make sure to import your API utility
import toast from "react-hot-toast";
import {jwtDecode} from "jwt-decode";  // Import jwt-decode

const ShopDetail = () => {
  const navigate = useNavigate();
  const [shopData, setShopData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const BASE_URL = `${process.env.REACT_APP_BASE_URL_PRIMARY}`;

  // Fetch shop details when component mounts
  useEffect(() => {
    const fetchShopDetails = async () => {
      const token = localStorage.getItem("token");
  
      if (!token) {
        toast.error("Token not found, please login.");
        navigate("/login");
        return;
      }
  
      try {
        const decodedToken = jwtDecode(token);
        const farmer_id = decodedToken.userId;
  
        if (!farmer_id) {
          toast.error("Farmer not found, please login.");
          return;
        }
  
        const response = await api.get(`/farmer-shop/${farmer_id}`);

        setShopData(response.data.data); // Access data from response.data.data
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching shop details", error);
        toast.error("Failed to load shop details.");
        setIsLoading(false);
      }
    };
  
    fetchShopDetails();
  }, [navigate]);
  



  // Handle Delete Shop
  const handleDeleteShop = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      toast.error("Token not found, please login.");
      navigate("/login");
      return;
    }

    try {
      // Decode token to get farmer_id
      const decodedToken = jwtDecode(token);
      const farmer_id = decodedToken.farmer_id;

      if (!farmer_id) {
        toast.error("Farmer not found, please login.");
        return;
      }

      await api.delete(`/shop/${farmer_id}`);
      toast.success("Shop deleted successfully.");
      navigate("/farmer/dashboard");
    } catch (error) {
      toast.error("Failed to delete shop.");
      console.error("Delete error:", error);
    }
  };

  return (
    <div className="container mt-5">
      <div className="row mt-20 align-items-center">
        <div className="col-lg-6 col-md-12 col-xs-12 col-sm-12">
          <h3>Shop Details</h3>
        </div>
        <div className="col-lg-6 col-md-12 col-xs-12 col-sm-12 text-end">
          <Link className="btn btn-success float-right" to="/farmer/shop/edit">
            Edit Shop Details
          </Link>
        </div>
      </div>

      <hr />

      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <Card>
          <CardBody>
            <div className="row">
              <div className="col-lg-12 col-md-12">
                <h4>{shopData?.shop_name || "No Shop Name"}</h4>
                <p>{shopData?.shop_description || "No description available"}</p>
                <p><strong>Location:</strong> {shopData?.shop_address || "N/A"}</p>
                <p><strong>Village:</strong> {shopData?.village_name || "N/A"}</p>
                <p><strong>Pricing Preference:</strong> {shopData?.pricing_preference || "N/A"}</p>
                <p><strong>Preferred Buyers:</strong> {shopData?.preferred_buyers || "N/A"}</p>
                <p><strong>State:</strong> {shopData?.state || "N/A"}</p>
                <p><strong>City/District:</strong> {shopData?.city_district || "N/A"}</p>
                <p><strong>Phone Number:</strong> {shopData?.phoneNumber || "N/A"}</p>
                <p><strong>WhatsApp Number:</strong> {shopData?.whatsappNumber || "N/A"}</p>

                <div>
                  {shopData?.shop_profile_image ? (
                    <img src={ BASE_URL + shopData?.shop_profile_image} alt="Shop Profile" style={{ width: "100px", height: "100px", objectFit: "cover" }} />
                  ) : (
                    <p>No profile image available</p>
                  )}
                  {shopData?.shop_cover_image ? (
                    <img src={BASE_URL + shopData?.shop_cover_image} alt="Shop Cover" style={{ width: "100%", height: "200px", objectFit: "cover" }} />
                  ) : (
                    <p>No cover image available</p>
                  )}
                </div>

                <div>
                  <h5>Shop Images:</h5>
                  {shopData?.shop_image?.length > 0 ? (
                    shopData?.shop_image.map((image, index) => (
                      <img key={index} src={BASE_URL + image} alt={`Shop Image ${index + 1}`} style={{ width: "100px", height: "100px", objectFit: "cover", marginRight: "10px" }} />
                    ))
                  ) : (
                    <p>No shop images available</p>
                  )}
                </div>

                <div className="mt-3">
                  <button onClick={handleDeleteShop} className="btn btn-danger">
                    Delete Shop
                  </button>
                </div>
              </div>
            </div>
          </CardBody>
        </Card>
      )}
    </div>
  );
};

export default ShopDetail;
