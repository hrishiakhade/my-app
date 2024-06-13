import React, { useState, useEffect } from 'react';
import './App.css'; // Custom styles
import SegmentedCircularProgressBar from './SegmentedCircularProgressBar';
import SegmentedCircularText from './SegmentedCircularTextAnim';

const App = () => {
  const [amount, setAmount] = useState(380.99);
  const increasedAmount = 50.99;
  const [showAnimation, setShowAnimation] = useState(false);

  const categories = [
    { name: 'Style & Trends', percentage: 25, color: '#FF5733' }, // Red
    { name: 'Tech & Gadgets', percentage: 35, color: '#33FF57' }, // Green
    { name: 'Taste & Treats', percentage: 20, color: '#3357FF' }, // Blue
    { name: 'Self Care Essentials', percentage: 20, color: '#FF33A1' } // Pink
  ];

  // Effect to handle clearing animation after 2 seconds
  useEffect(() => {
    if (showAnimation) {
      const timer = setTimeout(() => {
        setShowAnimation(false);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [showAnimation]);

  const handleShowAnimationClick = () => {
    setShowAnimation(true);
    setAmount(prevAmount => prevAmount + increasedAmount);
  };

  return (
    <div className="app">
      <div className="circular-progress-container">
        {/* <SegmentedCircularProgressBar
          size={308}
          segments={categories} // Pass all categories to always render
          totalAmount={amount}
          showAnimation={showAnimation}
        /> */}
        <SegmentedCircularText
          size={308}
          segments={categories} // Pass all categories to always render
          totalAmount={amount}
          showAnimation={showAnimation}
        />
        <div className="increase-amount">+ ${increasedAmount.toFixed(2)}</div>
      </div>
      <div className="categories">
        <ul>
          {categories.map((category, index) => (
            <li key={index} style={{ color: category.color }}>
              ● {category.name} ({category.percentage}%)
            </li>
          ))}
        </ul>
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
