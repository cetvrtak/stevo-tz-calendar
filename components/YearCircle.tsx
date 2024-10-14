import React, { useState } from 'react';
import './YearCircle.scss';

interface YearCircleProps {
  fromYear: number;
  toYear: number;
}

const YearCircle: React.FC<YearCircleProps> = ({ fromYear, toYear }) => {
  const radius = 268;
  const dots = 6;
  const startAngle = -60; // Start at 30 degrees to place dot #1 at the top right

  // State to track the currently selected dot (initially dot #1, which is index 0)
  const [selectedDot, setSelectedDot] = useState(0);

  // Generate dot positions on the circle using polar coordinates
  const dotPositions = Array.from({ length: dots }, (_, i) => {
    const angle = startAngle + (i * 360) / dots; // Rotate by -60 degrees
    const radians = (angle * Math.PI) / 180;
    const x = radius + radius * Math.cos(radians);
    const y = radius + radius * Math.sin(radians);
    return { x, y };
  });

  return (
    <div className="year-circle-container">
      {/* From Year */}
      <div className="year-text from-year">{fromYear}</div>

      {/* Circle and Dots */}
      <svg className="circle-svg" width="600" height="600">
        {/* Circle */}
        <circle cx="300" cy="300" r={radius} stroke="rgb(66, 86, 122, 0.2)" strokeWidth="1" fill="none" />

        {/* Center circle */}
        {/* <circle cx="300" cy="300" r="10" fill="black" /> */}

        {/* Dots around the circle */}
        {dotPositions.map((pos, index) => (
          <g key={index}>
            {/* Dot */}
            <circle
              className={`dot ${selectedDot === index ? 'selected' : ''}`} // Add 'selected' class if the dot is selected
              cx={pos.x + 32}
              cy={pos.y + 32}
              r={selectedDot === index ? 28 : 3} // Increase radius if selected
              fill={selectedDot === index ? 'rgb(244, 245, 249)' : 'black'} // Change color if selected
              onClick={() => setSelectedDot(index)} // Update selected dot on click
              style={{ cursor: 'pointer' }}
            />
            {/* Dot Index (1-based) */}
            <text
              x={pos.x + 32}
              y={pos.y + 32}
              textAnchor="middle"
              dominantBaseline="middle"
              fill="#42567A"
              fontSize="20px"
              fontWeight="400"
            >
              {index + 1}
            </text>
          </g>
        ))}
      </svg>

      {/* To Year */}
      <div className="year-text to-year">{toYear}</div>
    </div>
  );
};

export default YearCircle;
