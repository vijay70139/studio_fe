// CategoryFilter.jsx
import React, { useState } from "react";

const CategoryFilter = ({ onCategoryChange }) => {
  const [activeCategory, setActiveCategory] = useState("All");

  const categories = [
    "All",
    "Photo Studios",
    "Conference Room",
    "Dance Studio",
    "Recording Studio",
    "Film Studio",
    "Corporate Events",
  ];

  return (
    <div className="category-filter">
      {categories.map((category) => (
        <button
          key={category}
          className={`category-button ${activeCategory === category ? "active" : ""}`}
          onClick={() => {
            onCategoryChange(category);
            setActiveCategory(category);
          }}
        >
          {category}
        </button>
      ))}
    </div>
  );
};

export default CategoryFilter;
