import React, { useState, useEffect, useRef } from 'react';
import './App.css'; // Custom styles
import SegmentedCircularProgressBar from './SegmentedCircularProgressBar';
import CreditPopup from './components/creditPopup';

const App = () => {
  const [amount, setAmount] = useState(380.99);
  const increasedAmount = 50.99;
  const [showAnimation, setShowAnimation] = useState(false);
  const [selectedSegment, setSelectedSegment] = useState(null);
  const [selectedSegmentAmount, setSelectedSegmentAmount] = useState(0);

  const appRef = useRef(null);

  const categories = [
    { name: 'Style & Trends', percentage: 25, color: '#FF5733' }, // Red
    { name: 'Tech & Gadgets', percentage: 35, color: '#33FF57' }, // Green
    { name: 'Taste & Treats', percentage: 20, color: '#3357FF' }, // Blue
    { name: 'Self Care Essentials', percentage: 20, color: '#FF33A1' } // Pink
  ];

  useEffect(() => {
    if (showAnimation) {
      const timer = setTimeout(() => {
        setShowAnimation(false);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [showAnimation]);

  const handleShowAnimationClick = () => {
    setSelectedSegment(null);
    setSelectedSegmentAmount(null);
    setShowAnimation(true);
    setAmount(prevAmount => prevAmount + increasedAmount);
  };

  const handleCategoryClick = (index) => {
    setSelectedSegment(index);
    const segmentAmount = categories[index].percentage * amount / 100;
    setSelectedSegmentAmount(segmentAmount);
  };

  const handleDeselectSegment = () => {
    setSelectedSegment(null);
    setSelectedSegmentAmount(null);
  };


  return (
    <div className="app" ref={appRef}>
      <div className="circular-progress-container">
        <SegmentedCircularProgressBar
          size={308}
          segments={categories}
          totalAmount={amount}
          showAnimation={showAnimation}
          selectedSegment={selectedSegment}
          segmentAmount={selectedSegmentAmount}
          increasedAmount={increasedAmount.toFixed(2)}
          setSelectedSegment={handleCategoryClick}
          onDeselectSegment={handleDeselectSegment}
        />
      </div>
      <div className="categories">
        {categories.map((category, index) => (
          <div
            key={index}
            className={`category-item ${selectedSegment === index ? 'selected' : ''}`}
            style={{ color: category.color }}
          >
            ● {category.name}
          </div>
        ))}
      </div>
      <button
        className="increase-amount-button"
        onClick={handleShowAnimationClick}
      >
        Show Animation
      </button>

    </div>
  );
};

export default App;
