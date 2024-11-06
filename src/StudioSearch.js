import React from 'react';
import { MapPin, Calendar, ChevronDown } from 'lucide-react';

const StudioSearch = () => {
  return (
    <div className="header-container">
    <div className="header-content">
      <h1 className="title">Studios</h1>
      
      <div className="search-controls">
        {/* Location Input */}
        <div className="input-container">
          {/* <MapPin className="icon" /> */}
          <input
            type="text"
            placeholder="Location"
            className="location-input"
          />
        </div>

        {/* Date Picker */}
        <div className="input-container">
          <input
            type="date"
            className="date-input"
            placeholder="Select Date"
          />
          <Calendar className="icon calendar-icon" />
        </div>

        {/* Start Time */}
        <div className="input-container">
          <select className="time-input">
            <option value="">Start Time</option>
          </select>
          <ChevronDown className="icon chevron-icon" />
        </div>

        {/* End Time */}
        <div className="input-container">
          <select className="time-input">
            <option value="">End Time</option>
          </select>
          <ChevronDown className="icon chevron-icon" />
        </div>
      </div>
    </div>
  </div>
  );
};

export default StudioSearch;