import React, { useEffect, useState } from "react";
import axios from "axios";

const AddPhotoStudioForm = ({ studioData, onClose }) => {
  const [formData, setFormData] = useState({
    studioName: "",
    location: "",
    description: "",
    pricing: "",
    availability: "",
    contactInfo: "",
    photo: null,
  });
  const [loading, setLoading] = useState(false);
  const [errMsg, setErrMsg] = useState("");

  const categories = [
    "All",
    "Photo Studios",
    "Conference Room",
    "Dance Studio",
    "Recording Studio",
    "Film Studio",
    "Corporate Events",
  ];

  useEffect(() => {
    if (studioData) {
      setFormData({
        studioName: studioData.name,
        location: studioData.location,
        description: studioData.description,
        pricing: studioData.pricing,
        category: studioData.category,
        availability: studioData.availability,
        contactInfo: studioData.contactInfo,
        photo: studioData.photo || null,
      });
    }
  }, [studioData]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "photo") {
      setFormData({
        ...formData,
        [name]: files[0],
      });
    } else if (name === "availability") {
      setFormData({
        ...formData,
        [name]: value === "true", // Convert string to Boolean
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  console.log(formData, "formData=======");

  const refreshAccessToken = async () => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_USER_DOMAIN_API}/refresh-token`,
        {
          refreshToken: localStorage.getItem("refreshToken"),
        }
      );
      const newAccessToken = response.data.accessToken;
      localStorage.setItem("accessToken", newAccessToken);
      handleSubmit();
      return newAccessToken;
    } catch (error) {
      console.error("Failed to refresh token:", error);
      // Handle token refresh failure (e.g., logout the user)
      return null;
    }
  };

  const handleSubmit = async (e) => {
    setErrMsg("");
    const isAuthenticated =
      !!localStorage.getItem("accessToken") ||
      !!localStorage.getItem("refreshToken");
    if (!isAuthenticated) {
      return setErrMsg("Please login");
    }
    let response;
    setLoading(true);

    e.preventDefault();
    const apiUrl = studioData
      ? `${process.env.REACT_APP_STUDIO_DOMAIN_API}/studios/${studioData._id}`
      : `${process.env.REACT_APP_STUDIO_DOMAIN_API}/studios`;

    const data = new FormData();
    data.append("name", formData.studioName);
    data.append("location", formData.location);
    data.append("category", formData.category);
    data.append("description", formData.description);
    data.append("pricing", formData.pricing);
    data.append("availability", formData.availability);
    data.append("contactInfo", formData.contactInfo);
    data.append("rating", studioData ? studioData.rating : 0);
    if (formData.photo) {
      data.append("photo", formData.photo);
    }
    try {
      const accessToken = localStorage.getItem("accessToken");

      const config = {
        headers: {
          Authorization: `Bearer ${accessToken}`, // Set the token in the Authorization header
          "Content-Type": "multipart/form-data", // Important for file uploads
        },
      };
      if (studioData) {
        response = await axios.put(apiUrl, data, config);
        onClose();
      } else {
        response = await axios.post(apiUrl, data, config);
        onClose();
      }
      setErrMsg("");
      window.location.reload();
    } catch (error) {
      if (error?.status == 403) {
        refreshAccessToken();
      }
      console.error("Error saving studio:", error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="add-photo-studio-form">
      <h2> {`${studioData ? "Update" : "Add"} Photo Studio`}</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="studioName">Studio Name</label>
          <input
            type="text"
            id="studioName"
            name="studioName"
            value={formData.studioName}
            onChange={handleChange}
            placeholder="Enter studio name"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="location">Location</label>
          <input
            type="text"
            id="location"
            name="location"
            value={formData.location}
            onChange={handleChange}
            placeholder="Enter location"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Enter description"
            rows="4"
            required
          ></textarea>
        </div>

        <div className="form-group">
          <label htmlFor="pricing">Pricing</label>
          <input
            type="number"
            id="pricing"
            name="pricing"
            value={formData.pricing}
            onChange={handleChange}
            placeholder="Enter pricing details"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="category">Category</label>
          <select
            id="category"
            name="category"
            value={formData.category}
            onChange={handleChange}
            required
          >
            <option value="">Select Category</option>
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="availability">Equipment Availability</label>
          <select
            id="availability"
            name="availability"
            value={formData.availability}
            onChange={handleChange}
            required
          >
            <option value="">Select Availability</option>
            <option value="true">Available</option>
            <option value="false">Not Available</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="contactInfo">Contact Information</label>
          <input
            type="text"
            id="contactInfo"
            name="contactInfo"
            value={formData.contactInfo}
            onChange={handleChange}
            placeholder="Enter contact information"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="photo">Upload Photo</label>
          <input
            type="file"
            id="photo"
            name="photo"
            accept="image/*"
            onChange={handleChange}
          />
        </div>
        {errMsg && <p className="error-message">{errMsg}</p>}

        <button type="submit" className="submit-button" disabled={loading}>
          {loading ? (
            <div className="loader"></div>
          ) : (
            `${studioData ? "Update" : "Add"} Studio`
          )}
        </button>
      </form>
    </div>
  );
};

export default AddPhotoStudioForm;
