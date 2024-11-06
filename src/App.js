import React, { useState } from "react";
import "./App.css";
import Header from "./Header";
import StudioSearch from "./StudioSearch";
import CategoryFilter from "./CategoryFilter";
import Footer from "./Footer";
import StudioListing from "./StudioListing";
import LoginPopup from "./LoginPopup";

function App() {
  const [selectedCategory, setSelectedCategory] = useState("All");

  return (
    <React.Fragment className="body_fragment">
      <Header />
      <StudioSearch />
      <CategoryFilter onCategoryChange={setSelectedCategory} />
      <StudioListing selectedCategory={selectedCategory} />
      <Footer />
    </React.Fragment>
  );
}

export default App;
