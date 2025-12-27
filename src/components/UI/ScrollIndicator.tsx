import React from 'react';

const ScrollIndicator: React.FC = () => {
  return (
    <div className="fixed bottom-8 left-1/4 transform -translate-x-1/2 text-gray-600 text-sm animate-pulse z-20">
      Scroll để khám phá ↓
    </div>
  );
};

export default ScrollIndicator;
