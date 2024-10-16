import React, { useEffect, useState, useRef } from 'react';
import gsap from 'gsap';
import { MotionPathPlugin } from 'gsap/MotionPathPlugin';
import './YearCircle.scss';
import Navigation from '../components/Navigation';

const data = [
  {
    title: 'Музика',
    fromYear: 1969,
    toYear: 1977,
    events: [
      {
        year: 1969,
        desc: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Placeat repellat delectus assumenda!',
      },
      {
        year: 1970,
        desc: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Unde illo ipsa neque cumque? Reiciendis aspernatur sunt nulla, delectus minima officiis modi provident sequi et officia porro, vitae eaque dolore maiores.',
      },
      {
        year: 1972,
        desc: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Inventore id corrupti, ex consequatur ad ipsum sint hic laborum.',
      },
      {
        year: 1975,
        desc: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
      },
      {
        year: 1977,
        desc: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorem ab saepe corporis delectus voluptatum, libero voluptate, blanditiis velit, cum nulla reprehenderit?',
      },
    ]
  },
  {
    title: 'Кино',
    fromYear: 1987,
    toYear: 1991,
    events: [
      {
        year: 1987,
        desc: 'Хищник/Predator, США (реж. Джон Мактирнан)',
      },
      {
        year: 1988,
        desc: 'Кто подставил кролика Роджера/Who Framed Roger Rabbit, США (реж. Роберт Земекис)',
      },
      {
        year: 1989,
        desc: 'Назад в будущее 2/Back to the Future 2, США (реж. Роберт Земекис)',
      },
    ]
  },
  {
    title: 'Литература',
    fromYear: 1992,
    toYear: 1997,
    events: [
      {
        year: 1992,
        desc: 'Нобеловская премия по литературе - Дерек Уолкотт, "За блестящий образец карибского эпоса в 64 разделах"',
      }
    ]
  },
  {
    title: 'Балет',
    fromYear: 1919,
    toYear: 1965,
    events: [
      {
        year: 1919,
        desc: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Tempora voluptatem eos cumque perspiciatis officia laborum quo quae dolorum consectetur delectus.',
      }
    ]
  },
  {
    title: 'Исскуство',
    fromYear: 2012,
    toYear: 2022,
    events: [
      {
        year: 2012,
        desc: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Sapiente eveniet beatae velit natus recusandae tempora modi rerum. Maiores, ipsum.',
      },
      {
        year: 2016,
        desc: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Odit ullam, at a nesciunt est excepturi explicabo natus, similique quo facilis, earum quae!',
      },
      {
        year: 2020,
        desc: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
      },
    ]
  },
  {
    title: 'Наука',
    fromYear: 1932,
    toYear: 2024,
    events: [
      {
        year: 1932,
        desc: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellat, hic laudantium fugiat maxime incidunt deserunt, odit quis qui, recusandae vero possimus sapiente cumque aspernatur!',
      }
    ]
  },
]

gsap.registerPlugin(MotionPathPlugin);

const YearCircle: React.FC = () => {
  const radius = 268;
  const dots = 6;
  const startAngle = -60; // Start at -60 degrees to place dot #1 at the top right

  // State to track the currently selected dot (initially dot #1, which is index 0)
  const [selectedDot, setSelectedDot] = useState(0);
  const previousDotRef = useRef<number>(0);
  const hasBeenRendered = useRef<Boolean>(false);
  const dotRefs = useRef<(SVGGElement | null)[]>([]); // Allow null for refs

  // Helper function to generate SVG arc path between two points on the circle
  const generateArcPath = (slotIndex: number) => {
    const currentAngle = startAngle + ((slotIndex + dots) % dots) * (360 / dots);
    const nextAngle = (currentAngle - (selectedDot - previousDotRef.current) * (360 / dots)) % 360;

    const startRadians = (currentAngle * Math.PI) / 180;
    const endRadians = (nextAngle * Math.PI) / 180;

    const startX = radius * Math.cos(startRadians) + 300;
    const startY = radius * Math.sin(startRadians) + 300;
    const endX = radius * Math.cos(endRadians) + 300;
    const endY = radius * Math.sin(endRadians) + 300;

    const invertedArc = (currentAngle - nextAngle + 360) % 360 > 180 ? 1 : 0;

    // Create the SVG path for the arc
    return `M ${startX},${startY} A ${radius},${radius} 0 0 ${invertedArc} ${endX},${endY}`;
  };

  const slotsData =  Array.from({ length: dots }, (_, i) => {
      const angle = startAngle + ((i + dots) % dots) * (360 / dots);
      const radians = (angle * Math.PI) / 180;
      const x = radius * Math.cos(radians) + 300; // Adjusted for SVG center
      const y = radius * Math.sin(radians) + 300; // Adjusted for SVG center

      const path = generateArcPath(i);

      return { x, y, path };
  });

  // Animate the dots to move to their new positions along the circle using GSAP MotionPath
  const spin = () => {
    const previousDot = previousDotRef.current;
    dotRefs.current.forEach((dotRef, index) => {
      if (dotRef) { // Check if dotRef is not null
        const slotIndex = (index - previousDot + dots) % dots;
        
        gsap.to(dotRef, {
          duration: 1,
          motionPath: {
            path: slotsData[slotIndex].path,
            align: "self",
            alignOrigin: [0.5, 0.5],
          },
          ease: "power1.inOut", // Smooth easing
        });
      }
    });
  };
  

  useEffect(() => {
    if (hasBeenRendered.current) {
      // Animate when selectedDot changes
      spin();

      // Update the previous dot value after animation
      previousDotRef.current = selectedDot;
    } else {
      hasBeenRendered.current = true;
    }
  }, [selectedDot]);

  // Handle dot click and update selected dot
  const handleDotClick = (index: number) => {
    setSelectedDot(index);
  };

  return (
    <div className="year-circle-container">
      {/* From Year */}
      <div className="year-text from-year">{data[selectedDot].fromYear}</div>

      {/* Circle and Dots */}
      <svg className="circle-svg" width="600" height="600">
        {/* Circle */}
        <circle cx="300" cy="300" r={radius} stroke="rgb(66, 86, 122, 0.2)" strokeWidth="1" fill="none" />

        {/* Dots around the circle */}
        {slotsData.map((data, index) => (
          <g
            key={index}
            ref={(el) => (dotRefs.current[index] = el)} // Save each dot reference
            onClick={() => handleDotClick(index)} // Update selected dot on click
          >
            {/* Dot */}
            <circle
              className={`dot ${selectedDot === index ? 'selected' : ''}`}
              cx={data.x}
              cy={data.y}
              r={selectedDot === index ? 28 : 3}
              fill={selectedDot === index ? 'rgb(244, 245, 249)' : 'black'}
              style={{ cursor: 'pointer' }} // Smooth transition for dot position and size
            />
            {/* Dot Index (1-based) */}
            <text
              x={data.x}
              y={data.y}
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
      <div className="year-text to-year">{data[selectedDot].toYear}</div>

      {/* Navigation */}
      <Navigation selectedDot={selectedDot} dots={dots} handleDotSelection={setSelectedDot} />
    </div>
  );
};

export default YearCircle;
