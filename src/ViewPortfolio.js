import React from "react";

const ViewPortfolio = ({ studioData, onClose }) => {
  return (
    <div className="portfolio-popup-overlay_view">
      {/* <div className="portfolio-popup"> */}
      <div className="popup-content_view">
        <h3>View Studio</h3>
        {/* <button className="close-btn_view" onClick={onClose}>
          x
        </button> */}
        <img
          src={studioData?.base64WithMimeType}
          alt="Studio"
          className="popup-image_view"
        />
        <h2 className="popup-title_view">{studioData?.name}</h2>
        <p className="popup-description_view">{studioData?.description}</p>
        <div className="popup-details_view">
          <p>Location: {studioData?.location}</p>
          <p>Rating: {studioData?.rating}</p>
          <p>
            Equipment:{" "}
            {studioData?.availability ? "Available" : "Not Available"}
          </p>
          <p>Pricing: ₹ {studioData?.pricing} / hr</p>
        </div>
        <button className="book-now-btn" onClick={onClose}>
          Book Now
        </button>
      </div>
      {/* </div> */}
    </div>
  );
};

export default ViewPortfolio;
