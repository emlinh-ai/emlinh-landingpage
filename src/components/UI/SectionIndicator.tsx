import React from 'react';

interface SectionIndicatorProps {
  currentSection: number;
  totalSections: number;
  onSectionClick: (index: number) => void;
}

const SectionIndicator: React.FC<SectionIndicatorProps> = ({
  currentSection,
  totalSections,
  onSectionClick,
}) => {
  return (
    <div className="fixed right-8 top-1/2 transform -translate-y-1/2 z-30 space-y-4">
      {Array.from({ length: totalSections }, (_, index) => (
        <button
          key={index}
          onClick={() => onSectionClick(index)}
          className="group relative flex items-center justify-center w-12 h-12 transition-all duration-300"
          aria-label={`Go to section ${index + 1}`}
        >
          {/* Dot */}
          <div
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              currentSection === index
                ? 'bg-gradient-to-r from-blue-600 to-purple-600 scale-150'
                : 'bg-gray-300 group-hover:bg-gray-400'
            }`}
          />
          
          {/* Tooltip */}
          <div className="absolute right-full mr-4 px-3 py-1 bg-gray-800 text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap pointer-events-none">
            Section {index + 1}
          </div>
        </button>
      ))}
    </div>
  );
};

export default SectionIndicator;
