import React, { useEffect, useState } from 'react';
import './App.css'; // Custom styles
import InfoIcon from './assets/infoIcon.png';
import ProfilePicture from './assets/profilePicture.png';
import CategoryGrouping from './components/CategoryGroupings';
import Popup from './components/Popup';
import CreditPopup from './components/creditPopup';
import { categories } from './constants/index';

const SegmentedCircularProgressBar = ({ size, totalAmount, showAnimation, increasedAmount }) => {
  const strokeWidth = 20;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;

  const [fadeOpacity, setFadeOpacity] = useState(0);
  const [displayedAmount, setDisplayedAmount] = useState(totalAmount);
  const [textColor, setTextColor] = useState('#1C3665');
  const [showPopup, setShowPopup] = useState(false);
  const [showCreditPopup, setShowCreditPopup] = useState(false);

  const [selectedSegment, setSelectedSegment] = useState(null);
  const [selectedSegmentAmount, setSelectedSegmentAmount] = useState(0);


  const handleDeselectSegment = () => {
    setSelectedSegment(null);
    setSelectedSegmentAmount(null);
  };


  // Effect to manage opacity transition for the top layer circle
  useEffect(() => {
    if (showAnimation) {

      setShowCreditPopup(true);

      const timer = setTimeout(() => {
        setShowCreditPopup(false);

        setFadeOpacity(1);
        setTextColor('#00AA11');
        const timer = setTimeout(() => {
          setFadeOpacity(0);
          setTextColor('#1C3665');
        }, 2000);

        return () => clearTimeout(timer);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [showAnimation]);

  // Effect to handle smooth amount change
  useEffect(() => {
    if (showAnimation && !showCreditPopup) {
      const stepTime = 50;
      const steps = 20;
      const increment = (totalAmount - displayedAmount) / steps;
      let currentStep = 0;

      const interval = setInterval(() => {
        setDisplayedAmount(prev => {
          if (currentStep < steps) {
            currentStep++;
            return prev + increment;
          }
          clearInterval(interval);
          return totalAmount;
        });
      }, stepTime);

      return () => clearInterval(interval);
    }
  }, [showAnimation, totalAmount, displayedAmount, showCreditPopup]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (event.target.closest('.circular-progress-container')) return;
      handleDeselectSegment();
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [handleDeselectSegment]);


  // Function to calculate segment paths
  const calculateSegmentPaths = () => {
    let startOffset = 0;

    return categories.map((segment, index) => {
      const segmentLength = (segment.percentage / 100) * circumference;
      const dashArray = `${segmentLength} ${circumference - segmentLength}`;
      const strokeDashoffset = -startOffset;
      startOffset += segmentLength;

      return (
        <circle
          key={index}
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={segment.color}
          strokeWidth={selectedSegment === index ? strokeWidth + 4 : strokeWidth}
          strokeDasharray={dashArray}
          strokeDashoffset={strokeDashoffset}
          onClick={() => handleCategoryClick(index)}
          style={{
            cursor: 'pointer',
            transition: 'stroke-dashoffset 0.5s ease, stroke-width 0.5s ease',
            pointerEvents: 'auto', // Ensure events can pass through the circle
          }}
        />
      );
    });
  };


  const handleCategoryClick = (index) => {
    setSelectedSegment(index);
    const segmentAmount = categories[index].percentage * displayedAmount / 100;
    setSelectedSegmentAmount(segmentAmount);
  };

  const RenderProfilePicture = () => {
    return (
      <svg
        width="100"
        height="100"
        viewBox="0 0 100 100"
        x="45%"
        y="20%"
      >
        {/* Define a clipPath to make the image circular */}
        <defs>
          <clipPath id="circleClip">
            <circle cx="20" cy="20" r="18" />
          </clipPath>
        </defs>

        {/* Render the circular border */}
        <circle
          cx="20"
          cy="20"
          r="18"
          stroke="#7DB3E7" // Adjust the border color as needed
          strokeWidth="2"
          fill="none"
        />

        {/* Render the profile picture */}
        <image
          href={ProfilePicture}
          x="2"
          y="2"
          width="36"
          height="36"
          clipPath="url(#circleClip)"
          style={{
            cursor: 'pointer',
            pointerEvents: 'auto',
          }}
        />
      </svg>
    )
  }

  return (
    <>
      <div className="circular-progress-card">
        <div className="circular-progress-container">
          <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} pointerEvents={'none'}>
            {/* Render colored segmented circles */}
            {calculateSegmentPaths()}

            {/* Render top layer circle for animation */}
            <circle
              cx={size / 2}
              cy={size / 2}
              r={radius}
              fill="none"
              stroke="#D3FFD7"
              strokeWidth={showAnimation ? strokeWidth + 1 : strokeWidth}
              opacity={fadeOpacity}
              style={{
                transition: 'opacity 0.5s ease',
                pointerEvents: 'none', // Ensure this circle does not intercept events
              }}
            />

            {/* Render Profile Picture */}
            <RenderProfilePicture />
            {/* Render text element showing total amount */}
            <text
              x="50%"
              y="45%"
              textAnchor="middle"
              dy=".3em"
              fontSize="36px"
              fontWeight="600"
              fill={textColor}
            >
              ${selectedSegmentAmount ? selectedSegmentAmount.toFixed(2) : displayedAmount.toFixed(2)}
            </text>

            {/* Render text element showing "Lifetime cashback earned" */}

            {fadeOpacity && !showCreditPopup ?
              <text
                x="50%"
                y="60%"
                textAnchor="middle"
                dy=".3em"
                fontSize="22px"
                fontWeight={600}
                fill="#00AA11"
              >
                <tspan fontWeight="400">+ </tspan>${increasedAmount}
              </text> :
              <text
                x="50%"
                y="60%"
                textAnchor="middle"
                dy=".3em"
                fontSize="12px"
                fontWeight={600}
                fill="#000"
              >
                {selectedSegmentAmount ?
                  <>
                    of{' '}
                    <tspan fontWeight="bold" fill="#3E3E3E">
                      ${displayedAmount.toFixed(2)}
                    </tspan>
                  </> : "Lifetime cashback earned"}
              </text>
            }

            <image
              href={InfoIcon}
              x="50%"
              y="75%"
              width="20"
              height="20"
              style={{ transform: 'translate(-10px, -10px)', cursor: 'pointer', pointerEvents: 'auto' }}
              onClick={() => setShowPopup(true)}
            />
          </svg>
        </div>

        <CategoryGrouping
          selectedSegment={selectedSegment}
        />
      </div>

      {showPopup && (
        <Popup
          title="Lifetime Cashback Earned"
          content="This is the total amount of cashback you have earned over time."
          subContent="This includes all cashback earned from all categories."
          onClose={() => setShowPopup(false)}
        />
      )}

      <CreditPopup
        amount={increasedAmount}
        showCreditPopup={showCreditPopup}
        showAnimation={showAnimation}
        onClose={() => setShowCreditPopup(false)}
      />

    </>
  );
};

export default SegmentedCircularProgressBar;
