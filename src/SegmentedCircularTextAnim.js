import React, { useEffect, useState } from 'react';
import { useSpring, animated } from '@react-spring/web';

const SegmentedCircularText = ({ size, segments, totalAmount, showAnimation }) => {
  const strokeWidth = 20;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;

  const [fadeOpacity, setFadeOpacity] = useState(0);

  // Spring for amount and text color
  const { animatedAmount, textColor } = useSpring({
    animatedAmount: totalAmount,
    textColor: showAnimation ? '#00AA11' : '#000',
    config: { duration: 500 },
  });

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
          strokeWidth={strokeWidth}
          strokeDasharray={dashArray}
          strokeDashoffset={strokeDashoffset}
          style={{
            transition: 'stroke-dashoffset 0.5s ease',
          }}
        />
      );
    });
  };

  // Effect to handle opacity transition when showAnimation changes
  useEffect(() => {
    if (showAnimation) {
      setFadeOpacity(1); // Fade in background circle
    } else {
      const timer = setTimeout(() => {
        setFadeOpacity(0); // Fade out background circle
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [showAnimation]);

  return (
    <div className="progress-bar-container">
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        {/* Render colored segmented circles */}
        {calculateSegmentPaths()}

        {/* Render background circle with opacity controlled by fadeOpacity */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="#D3FFD7"
          strokeWidth={strokeWidth}
          opacity={fadeOpacity}
          style={{
            transition: 'opacity 0.5s ease',
          }}
        />

        {/* Render text element showing total amount with animated color and value */}
        <animated.text
          x="50%"
          y="50%"
          textAnchor="middle"
          dy=".3em"
          fontSize="50px"
          fontWeight="600"
          fill={textColor}
        >
          {animatedAmount.to((val) => `$${val.toFixed(2)}`)}
        </animated.text>
      </svg>
    </div>
  );
};

export default SegmentedCircularText;
