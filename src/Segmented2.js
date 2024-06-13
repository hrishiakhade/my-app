import React, { useState, useEffect } from 'react';

const SegmentedCircularProgressBar = ({ size, segments, totalAmount, showAnimation }) => {
  const strokeWidth = 20;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;

  const [fillOffset, setFillOffset] = useState(circumference);
  const [resetAnimation, setResetAnimation] = useState(false);

  // Effect to manage animation of background circle
  useEffect(() => {
    if (showAnimation) {
      let progress = 0;
      const interval = setInterval(() => {
        progress += 0.01; // Adjust speed of animation by changing increment value
        setFillOffset(circumference * (1 - progress)); // Update fill offset to create animation effect

        if (progress >= 1) {
          clearInterval(interval); // Stop animation when progress reaches 100%
          setTimeout(() => setResetAnimation(true), 2000); // Set reset animation flag after 2 seconds
        }
      }, 10); // Adjust interval for smoother animation

      return () => clearInterval(interval); // Clean up interval on component unmount
    }
  }, [showAnimation, circumference]);

  // Effect to reset animation
  useEffect(() => {
    if (resetAnimation) {
      setTimeout(() => {
        setFillOffset(circumference); // Reset fill offset to original state
        setResetAnimation(false); // Reset animation flag
      }, 500); // Adjust delay before reset
    }
  }, [resetAnimation, circumference]);

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

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      {/* Render segmented circles */}
      {calculateSegmentPaths()}

      {/* Render animated background circle */}
      <circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        fill="none"
        stroke="#D3FFD7"
        strokeWidth={strokeWidth}
        strokeDasharray={circumference}
        strokeDashoffset={fillOffset}
        style={{
          transition: 'stroke-dashoffset 0.5s ease',
        }}
      />

      {/* Render text element showing total amount */}
      <text
        x="50%"
        y="50%"
        textAnchor="middle"
        dy=".3em"
        fontSize="50px"
        fontWeight="600"
        fill={showAnimation ? '#00AA11' : '#000'}
      >
        ${totalAmount.toFixed(2)}
      </text>
    </svg>
  );
};

export default SegmentedCircularProgressBar;
