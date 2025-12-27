import React, { useEffect, useState, useRef } from 'react';
import { useTranslation } from 'react-i18next';

interface CustomCursorProps {
  isAudioEnabled: boolean;
  isFirstInteraction: boolean;
}

const CustomCursor: React.FC<CustomCursorProps> = ({ 
  isAudioEnabled,
  isFirstInteraction
}) => {
  const { t } = useTranslation();
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isClicked, setIsClicked] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const [isOverCanvas, setIsOverCanvas] = useState(false);
  const cursorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const updatePosition = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      
      // Check if cursor is over canvas area (right half of screen)
      const isOverRightHalf = e.clientX > window.innerWidth / 2;
      setIsOverCanvas(isOverRightHalf);
    };

    const handleMouseDown = () => {
      setIsClicked(true);
      // Only trigger interaction if clicking in canvas area
      if (isOverCanvas) {
        // This will be handled by the global click handler in App-Cinematic
      }
    };
    const handleMouseUp = () => setIsClicked(false);
    const handleMouseEnter = () => setIsHidden(false);
    const handleMouseLeave = () => setIsHidden(true);

    window.addEventListener('mousemove', updatePosition);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('mouseenter', handleMouseEnter);
    document.addEventListener('mouseleave', handleMouseLeave);

    // Add custom cursor styles
    const style = document.createElement('style');
    style.textContent = `
      * {
        cursor: none !important;
      }
      a, button, input, textarea, select {
        cursor: none !important;
      }
    `;
    document.head.appendChild(style);

    return () => {
      window.removeEventListener('mousemove', updatePosition);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('mouseenter', handleMouseEnter);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.head.removeChild(style);
    };
  }, []);

  // Only show tooltip on canvas area
  const shouldShowLabel = isOverCanvas;
  const labelText = isFirstInteraction 
    ? t('nav.clickToPlay') 
    : isAudioEnabled 
      ? t('nav.doubleClickToMute')
      : t('nav.clickToPlay');

  return (
    <div
      ref={cursorRef}
      className={`fixed pointer-events-none z-[9999] transition-transform duration-75 ${
        isHidden ? 'opacity-0' : 'opacity-100'
      }`}
      style={{
        left: position.x,
        top: position.y,
        transform: `translate(-50%, -50%) scale(${isClicked ? 0.8 : 1})`,
      }}
    >
      {/* Outer circle */}
      <div className="relative">
        <div className={`w-8 h-8 rounded-full border-2 transition-all duration-200 ${
          isAudioEnabled 
            ? 'border-blue-500 bg-blue-500/10' 
            : 'border-gray-400 bg-gray-400/10'
        }`} />
        
        {/* Inner dot */}
        <div className={`absolute top-1/2 left-1/2 w-1.5 h-1.5 rounded-full -translate-x-1/2 -translate-y-1/2 transition-colors duration-200 ${
          isAudioEnabled ? 'bg-blue-500' : 'bg-gray-400'
        }`} />
        
        {/* Tooltip */}
        {shouldShowLabel && (
          <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 px-3 py-1 bg-gray-800 text-white text-xs rounded-lg whitespace-nowrap">
            {labelText}
          </div>
        )}
      </div>
    </div>
  );
};

export default CustomCursor;
