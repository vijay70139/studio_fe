// StudioListing.jsx
import React, { useEffect, useState } from "react";
import { MapPin, Star, Heart, Settings, Clock, Edit } from "lucide-react";
import axios from "axios";
import AddPhotoStudioForm from "./AddPhotoStudioForm";
import ViewPortfolio from "./ViewPortfolio";

const StudioListing = ({ selectedCategory }) => {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedStudio, setSelectedStudio] = useState(null);
  const [isEditFormVisible, setIsEditFormVisible] = useState(false);
  const [isViewPortfolio, setIsViewPortfolio] = useState(false);
  console.log(selectedCategory, "selectedCategory=======");
  const handlePopupClose = () => setIsEditFormVisible(false);
  const handleViewPopupClose = () => setIsViewPortfolio(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_STUDIO_DOMAIN_API}/studios`
        );
        setData(response.data);
        setFilteredData(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    setFilteredData(
      selectedCategory === "All"
        ? data
        : data.filter((item) => item.category === selectedCategory)
    );
  }, [selectedCategory]);

  console.log(filteredData, "filteredData==========");

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
      // fetchData();
      return newAccessToken;
    } catch (error) {
      console.error("Failed to refresh token:", error);
      return null;
    }
  };

  const handleEdit = (studio) => {
    setSelectedStudio(studio);
    setIsEditFormVisible(true);
  };

  const handlePortfolio = (studio) => {
    setSelectedStudio(studio);
    setIsViewPortfolio(true);
  };

  if (loading) {
    return <p>Loading...</p>;
  }
  return (
    <div className="studio-container">
      <div className="sidebar">
        <div className="filter-container">
          <div className="filter-section">
            <div className="search-filters">
              <input
                type="text"
                placeholder="Location"
                className="location-input"
              />
              <div className="date-time-container">
                <input
                  type="date"
                  className="date-input"
                  placeholder="Select Date"
                />
              </div>
              <div className="time-container">
                <select className="time-input">
                  <option>Start Time</option>
                </select>
                <select className="time-input">
                  <option>End Time</option>
                </select>
              </div>
            </div>
            <div className="filter-group">
              <div className="filter-header">
                <span>Price</span>
                <button className="reset-btn">Reset</button>
              </div>
            </div>

            <div className="filter-group">
              <div className="filter-header">
                <span>Ratings</span>
                <button className="reset-btn">Reset</button>
              </div>
            </div>

            <div className="filter-group">
              <div className="filter-header">
                <span>Amenities</span>
                <button className="reset-btn">Reset</button>
              </div>
            </div>

            <div className="filter-group">
              <div className="filter-header">
                <span>Equipment</span>
                <button className="reset-btn">Reset</button>
              </div>
              <div className="checkbox-group">
                <label className="checkbox-label">
                  <input type="checkbox" />
                  Camera Setup
                </label>
                <label className="checkbox-label">
                  <input type="checkbox" />
                  Lighting
                </label>
                <label className="checkbox-label">
                  <input type="checkbox" />
                  Backdrops
                </label>
                <label className="checkbox-label">
                  <input type="checkbox" />
                  Grip Equipment
                </label>
                <label className="checkbox-label">
                  <input type="checkbox" />
                  Sound Equipment
                </label>
                <label className="checkbox-label">
                  <input type="checkbox" />
                  Editing Equipment
                </label>
                <label className="checkbox-label">
                  <input type="checkbox" />
                  Props and Furniture
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="studio-grid">
        {filteredData?.length
          ? filteredData.map((item) => (
              <div key={item} className="studio-card">
                <div className="card-layout">
                  <div className="card-image-container">
                    <img
                      src={item?.base64WithMimeType}
                      alt="Studio"
                      className="card-image"
                    />
                    <button className="favorite-btn">
                      <Heart className="heart-icon" />
                    </button>
                    <div
                      className="edit-icon-container"
                      onClick={() => handleEdit(item)}
                    >
                      <Edit className="edit-icon" size={20} />
                    </div>
                    {/* <div className="time-badge">
                  <Clock className="clock-icon" />
                  14:00 - 16:00
                </div> */}
                  </div>
                  <div className="card-content">
                    <div className="card-header">
                      <h3 className="studio-title">{item?.name}</h3>
                    </div>
                    <p className="studio-description">{item?.description}</p>
                    <div className="studio-details">
                      <div className="location-rating">
                        <MapPin className="icon" />
                        <span className="location-address">
                          {item?.location}
                        </span>
                        <div className="rating">
                          <Star className="star-icon" />
                          <span>{item?.rating}</span>
                        </div>
                      </div>
                      <div className="equipment-info">
                        <Settings className="icon" />
                        <span className="location-address">
                          {item?.availability && "Equipment Available"}
                        </span>
                      </div>
                      <div className="price-info">
                        <span>{`₹ ${item?.pricing}/hr`}</span>
                      </div>
                    </div>
                    <div className="card-actions">
                      <button
                        className="portfolio-btn"
                        onClick={() => handlePortfolio(item)}
                      >
                        View Portfolio
                      </button>
                      <button className="book-btn">{`₹ ${item?.pricing}/hr`}</button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          : "No data found"}
      </div>
      {isEditFormVisible && (
        <div className="popup-overlay">
          <div className="popup-content">
            <button className="close-button" onClick={handlePopupClose}>
              ×
            </button>
            <AddPhotoStudioForm
              studioData={selectedStudio}
              onClose={() => setIsEditFormVisible(false)}
            />
          </div>
        </div>
      )}
      {isViewPortfolio && (
        <div className="popup-overlay">
          <div className="popup-content_view">
            <ViewPortfolio
              studioData={selectedStudio}
              onClose={() => setIsViewPortfolio(false)}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default StudioListing;
