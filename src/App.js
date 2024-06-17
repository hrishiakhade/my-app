import React, { useEffect, useState } from 'react';
import './App.css'; // Custom styles
import SegmentedCircularProgressBar from './SegmentedCircularProgressBar';

const App = () => {
  const [amount, setAmount] = useState(380.99);
  const increasedAmount = 50.99;
  const [showAnimation, setShowAnimation] = useState(false);

  useEffect(() => {
    if (showAnimation) {
      const timer = setTimeout(() => {
        setShowAnimation(false);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [showAnimation]);

  const handleShowAnimationClick = () => {
    setShowAnimation(true);
    setAmount(prevAmount => prevAmount + increasedAmount);
  };

  return (
    <div className="app" >
      <SegmentedCircularProgressBar
        size={308}
        totalAmount={amount}
        showAnimation={showAnimation}
        increasedAmount={increasedAmount.toFixed(2)}
      />
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
