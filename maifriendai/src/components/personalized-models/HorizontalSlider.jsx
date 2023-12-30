import React from 'react';
import MaifriendComponents from './MaifriendComponents'; 
import './horizontalSlider.css'

const HorizontalSlider = ({ items }) => {
  return (
    <div className="horizontal-slider">
      <div className="card-container">
        {items.map((item) => (
          <MaifriendComponents key={item.itemId} {...item} />
        ))}
      </div>
    </div>
  );
};
 
export default HorizontalSlider;
