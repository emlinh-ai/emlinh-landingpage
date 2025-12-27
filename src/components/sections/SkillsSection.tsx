import React from 'react';
import { Youtube, MessageCircle, Users } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const SkillsSection: React.FC = () => {
  const { t } = useTranslation();

  return (
    <section className="min-h-screen flex items-center justify-center p-8">
      <div className="max-w-2xl space-y-8">
        <h2 className="text-5xl font-bold text-gray-800 mb-8">
          {t('skills.title')}
        </h2>
        
        <div className="grid grid-cols-1 gap-6">
          <div className="bg-white/70 backdrop-blur-md rounded-lg p-6 border border-gray-200 shadow-sm hover:bg-white/80 transition">
            <div className="flex items-center gap-4 mb-4">
              <Youtube className="w-8 h-8 text-red-500" />
              <h3 className="text-xl font-semibold text-gray-800">{t('skills.items.youtube.title')}</h3>
            </div>
            <p className="text-gray-600">
              {t('skills.items.youtube.description')}
            </p>
          </div>

          <div className="bg-white/70 backdrop-blur-md rounded-lg p-6 border border-gray-200 shadow-sm hover:bg-white/80 transition">
            <div className="flex items-center gap-4 mb-4">
              <MessageCircle className="w-8 h-8 text-blue-500" />
              <h3 className="text-xl font-semibold text-gray-800">{t('skills.items.facebook.title')}</h3>
            </div>
            <p className="text-gray-600">
              {t('skills.items.facebook.description')}
            </p>
          </div>

          <div className="bg-white/70 backdrop-blur-md rounded-lg p-6 border border-gray-200 shadow-sm hover:bg-white/80 transition">
            <div className="flex items-center gap-4 mb-4">
              <Users className="w-8 h-8 text-green-500" />
              <h3 className="text-xl font-semibold text-gray-800">{t('skills.items.chat.title')}</h3>
            </div>
            <p className="text-gray-600">
              {t('skills.items.chat.description')}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;
