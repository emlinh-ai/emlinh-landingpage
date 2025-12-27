import React from 'react';
import { Calendar, Star } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const FortuneSection: React.FC = () => {
  const { t } = useTranslation();

  return (
    <section className="min-h-screen flex items-center justify-center p-8">
      <div className="max-w-2xl space-y-8">
        <h2 className="text-5xl font-bold text-gray-800 mb-8">
          {t('fortune.title')}
        </h2>
        
        <div className="bg-gradient-to-r from-blue-100 to-purple-100 backdrop-blur-md rounded-lg p-8 border border-blue-200 shadow-sm">
          <div className="flex items-center gap-4 mb-6">
            <Calendar className="w-12 h-12 text-yellow-400" />
            <h3 className="text-2xl font-semibold text-blue-700">{t('fortune.card.title')}</h3>
          </div>
          
          <p className="text-lg text-gray-700 mb-6">
            {t('fortune.card.description')}
          </p>
          
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="bg-white/60 rounded-lg p-4">
              <Star className="w-6 h-6 text-cyan-400 mb-2" />
              <h4 className="font-semibold text-gray-800 mb-1">{t('fortune.card.overview.title')}</h4>
              <p className="text-sm text-gray-600">{t('fortune.card.overview.description')}</p>
            </div>
            <div className="bg-white/60 rounded-lg p-4">
              <Star className="w-6 h-6 text-purple-400 mb-2" />
              <h4 className="font-semibold text-gray-800 mb-1">{t('fortune.card.detail.title')}</h4>
              <p className="text-sm text-gray-600">{t('fortune.card.detail.description')}</p>
            </div>
          </div>
          
          <p className="text-gray-600">
            {t('fortune.card.conclusion')}
          </p>
        </div>
      </div>
    </section>
  );
};

export default FortuneSection;
