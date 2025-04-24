import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";

const FarmerProfile = () => {
  // State for all sections
  const [basicInfo, setBasicInfo] = useState({
    name: "",
    email: "",
    phoneNumber: "",
    city: "",
    village: "",
    profilePhoto: null,
  });

  const [farmDetails, setFarmDetails] = useState({
    farmAddress: "",
    landSize: "",
    farmingType: "",
  });

  const [cropDetails, setCropDetails] = useState({
    cropsGrown: "",
    seasonalAvailability: "",
    fertilizersUsed: "",
  });

  // Handle change for each section
  const handleChange = (e, sectionSetter) => {
    const { name, value, type, files } = e.target;
    if (type === "file") {
      sectionSetter((prevState) => ({ ...prevState, [name]: files[0] }));
    } else {
      sectionSetter((prevState) => ({ ...prevState, [name]: value }));
    }
  };

  // Submit functions
  const handleBasicInfoSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    Object.keys(basicInfo).forEach((key) =>
      formData.append(key, basicInfo[key])
    );

    try {
      const response = await axios.post("/api/farmer/basic-info", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      toast.success(response.data.message);
    } catch (error) {
      toast.error("Failed to save basic information");
    }
  };

  const handleFarmDetailsSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/api/farmer/farm-details", farmDetails);
      toast.success(response.data.message);
    } catch (error) {
      toast.error("Failed to save farm details");
    }
  };

  const handleCropDetailsSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/api/farmer/crop-details", cropDetails);
      toast.success(response.data.message);
    } catch (error) {
      toast.error("Failed to save crop details");
    }
  };

  return (
    <div className="container my-5">
      <h1 className="text-center mb-4">Farmer Profile</h1>

      {/* Section 1: Basic Information */}
      <div className="card mb-4">
        <div className="card-header">Basic Information</div>
        <div className="card-body">
          <form onSubmit={handleBasicInfoSubmit}>
            <div className="row mb-3">
              <div className="col-md-6">
                <label className="form-label">Full Name</label>
                <input
                  type="text"
                  className="form-control"
                  name="name"
                  value={basicInfo.name}
                  onChange={(e) => handleChange(e, setBasicInfo)}
                  required
                />
              </div>
              <div className="col-md-6">
                <label className="form-label">Email</label>
                <input
                  type="email"
                  className="form-control"
                  name="email"
                  value={basicInfo.email}
                  onChange={(e) => handleChange(e, setBasicInfo)}
                  required
                />
              </div>
            </div>
            <div className="row mb-3">
              <div className="col-md-6">
                <label className="form-label">Phone Number</label>
                <input
                  type="tel"
                  className="form-control"
                  name="phoneNumber"
                  value={basicInfo.phoneNumber}
                  onChange={(e) => handleChange(e, setBasicInfo)}
                  required
                />
              </div>
              <div className="col-md-6">
                <label className="form-label">City</label>
                <input
                  type="text"
                  className="form-control"
                  name="city"
                  value={basicInfo.city}
                  onChange={(e) => handleChange(e, setBasicInfo)}
                  required
                />
              </div>
            </div>
            <div className="row mb-3">
              <div className="col-md-6">
                <label className="form-label">Village</label>
                <input
                  type="text"
                  className="form-control"
                  name="village"
                  value={basicInfo.village}
                  onChange={(e) => handleChange(e, setBasicInfo)}
                  required
                />
              </div>
              <div className="col-md-6">
                <label className="form-label">Profile Photo</label>
                <input
                  type="file"
                  className="form-control"
                  name="profilePhoto"
                  onChange={(e) => handleChange(e, setBasicInfo)}
                />
              </div>
            </div>
            <button type="submit" className="btn btn-primary w-100">
              Save Basic Information
            </button>
          </form>
        </div>
      </div>

      {/* Section 2: Farm Details */}
      <div className="card mb-4">
        <div className="card-header">Farm Details</div>
        <div className="card-body">
          <form onSubmit={handleFarmDetailsSubmit}>
            <div className="mb-3">
              <label className="form-label">Farm Address</label>
              <input
                type="text"
                className="form-control"
                name="farmAddress"
                value={farmDetails.farmAddress}
                onChange={(e) => handleChange(e, setFarmDetails)}
                required
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Land Size (in acres)</label>
              <input
                type="text"
                className="form-control"
                name="landSize"
                value={farmDetails.landSize}
                onChange={(e) => handleChange(e, setFarmDetails)}
                required
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Farming Type</label>
              <select
                className="form-select"
                name="farmingType"
                value={farmDetails.farmingType}
                onChange={(e) => handleChange(e, setFarmDetails)}
                required
              >
                <option value="">Select Farming Type</option>
                <option value="Organic">Organic</option>
                <option value="Conventional">Conventional</option>
              </select>
            </div>
            <button type="submit" className="btn btn-primary w-100">
              Save Farm Details
            </button>
          </form>
        </div>
      </div>

      {/* Section 3: Crop Details */}
      <div className="card mb-4">
        <div className="card-header">Crop Details</div>
        <div className="card-body">
          <form onSubmit={handleCropDetailsSubmit}>
            <div className="mb-3">
              <label className="form-label">Crops Grown</label>
              <input
                type="text"
                className="form-control"
                name="cropsGrown"
                value={cropDetails.cropsGrown}
                onChange={(e) => handleChange(e, setCropDetails)}
                required
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Seasonal Availability</label>
              <input
                type="text"
                className="form-control"
                name="seasonalAvailability"
                value={cropDetails.seasonalAvailability}
                onChange={(e) => handleChange(e, setCropDetails)}
                required
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Fertilizers Used</label>
              <input
                type="text"
                className="form-control"
                name="fertilizersUsed"
                value={cropDetails.fertilizersUsed}
                onChange={(e) => handleChange(e, setCropDetails)}
              />
            </div>
            <button type="submit" className="btn btn-primary w-100">
              Save Crop Details
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default FarmerProfile;
