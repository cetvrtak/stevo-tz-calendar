import React from 'react';
import './Navigation.scss';

interface NavigationProps {
    selectedDot: number;
    dots: number;
    handleDotSelection: Function;
}
  
const Navigation: React.FC<NavigationProps> = ({ selectedDot, dots, handleDotSelection }) => {
    return (
        <div className="navigation">
            <span className="navigation-text">0{selectedDot + 1} / 0{dots}</span>

            <div className="navigation-arrows">
                <svg
                    opacity={selectedDot === 0 ? "0.500000" : "1"}
                    onClick={() => selectedDot > 0 && handleDotSelection((selectedDot - 1))}
                    width="50.000000"
                    height="50.000000"
                    viewBox="0 0 50 50"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg">
                    
                    <circle id="Ellipse 335" r="25.000000" transform="matrix(-1 0 0 1 25 25)" fill="#FFFFFF" fillOpacity="0"/>
                    <circle id="Ellipse 335" r="24.500000" transform="matrix(-1 0 0 1 25 25)" stroke="#42567A" strokeOpacity="0.500000" strokeWidth="1.000000"/>
                    <path id="Vector 2" d="M27.49 18.75L21.24 25L27.49 31.25" stroke="#42567A" strokeOpacity="1.000000" strokeWidth="2.000000"/>
                </svg>

                <svg
                    opacity={selectedDot === dots - 1 ? "0.500000" : "1"}
                    onClick={() => selectedDot < dots - 1 && handleDotSelection((selectedDot + 1))}
                    width="50.000000"
                    height="50.000000"
                    viewBox="0 0 50 50"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg">
                    
                    <circle id="Ellipse 335" cx="25.000000" cy="25.000000" r="25.000000" fill="#FFFFFF" fillOpacity="0"/>
                    <circle id="Ellipse 335" cx="25.000000" cy="25.000000" r="24.500000" stroke="#42567A" strokeOpacity="0.500000" strokeWidth="1.000000"/>
                    <path id="Vector 2" d="M22.5 18.75L28.75 25L22.5 31.25" stroke="#42567A" strokeOpacity="1.000000" strokeWidth="2.000000"/>
                </svg>
            </div>
        </div>
    )
}

export default Navigation;