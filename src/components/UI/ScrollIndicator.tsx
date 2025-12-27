import React from 'react';
import { useTranslation } from 'react-i18next';

const ScrollIndicator: React.FC = () => {
  const { t } = useTranslation();
  
  return (
    <div className="fixed bottom-8 left-1/4 transform -translate-x-1/2 text-gray-600 text-sm animate-pulse z-20">
      {t('scrollIndicator')}
    </div>
  );
};

export default ScrollIndicator;
