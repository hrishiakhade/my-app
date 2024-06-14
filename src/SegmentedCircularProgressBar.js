import React, { useEffect, useState } from 'react';

const SegmentedCircularProgressBar = ({ size, segments, totalAmount, showAnimation, selectedSegment, setSelectedSegment, segmentAmount, onDeselectSegment }) => {
  const strokeWidth = 20;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;

  const [fadeOpacity, setFadeOpacity] = useState(0);
  const [displayedAmount, setDisplayedAmount] = useState(totalAmount);
  const [textColor, setTextColor] = useState('#000');

  // Effect to manage opacity transition for the top layer circle
  useEffect(() => {
    if (showAnimation) {
      setFadeOpacity(1);
      setTextColor('#00AA11');
      const timer = setTimeout(() => {
        setFadeOpacity(0);
        setTextColor('#000');
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [showAnimation]);

  // Effect to handle smooth amount change
  useEffect(() => {
    if (showAnimation) {
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
  }, [showAnimation, totalAmount, displayedAmount]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (event.target.closest('.circular-progress-container')) return;
      onDeselectSegment();
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [onDeselectSegment]);

  // Function to calculate segment paths
  const calculateSegmentPaths = () => {
    let startOffset = 0;

    return segments.map((segment, index) => {
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
          onClick={() => setSelectedSegment(index)}
          style={{
            cursor: 'pointer',
            transition: 'stroke-dashoffset 0.5s ease, stroke-width 0.5s ease',
            pointerEvents: 'auto', // Ensure events can pass through the circle
          }}
        />
      );
    });
  };



  return (
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

      {/* Render text element showing total amount */}
      <text
        x="50%"
        y="45%"
        textAnchor="middle"
        dy=".3em"
        fontSize="30px"
        fontWeight="600"
        fill={textColor}
      >
        ${segmentAmount ? segmentAmount.toFixed(2) : displayedAmount.toFixed(2)}
      </text>

      {/* Render text element showing "Lifetime cashback earned" */}

      <text
        x="50%"
        y="55%"
        textAnchor="middle"
        dy=".3em"
        fontSize="16px"
        fill="#000"
      >
        {segmentAmount ?
          <>
            of{' '}
            <tspan fontWeight="bold" fill="#3E3E3E">
              ${displayedAmount.toFixed(2)}
            </tspan>
          </> : "Lifetime cashback earned"}
      </text>
    </svg>
  );
};

export default SegmentedCircularProgressBar;
