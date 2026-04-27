import React, { useState } from "react";

const RoomImageSlider = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Guard clause: if no images, show fallback
  if (!images || images.length === 0) {
    return <p>No images available</p>;
  }

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  return (
    <div className="image-slider">
      <button onClick={handlePrev}>&#10094;</button>
      <img
        src={images[currentIndex].image}
        alt={images[currentIndex].caption || "Room"}
        className="slider-image"
      />
      <button onClick={handleNext}>&#10095;</button>
    </div>
  );
};

export default RoomImageSlider;
