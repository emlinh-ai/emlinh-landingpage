import React from 'react';
import { Youtube, MessageCircle, Instagram, Music } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const IntroductionSection: React.FC = () => {
  const { t } = useTranslation();
  const youtubeUrl = import.meta.env.VITE_YOUTUBE_URL || '#';
  const facebookUrl = import.meta.env.VITE_FACEBOOK_URL || '#';
  const instagramUrl = import.meta.env.VITE_INSTAGRAM_URL || '#';
  const tiktokUrl = import.meta.env.VITE_TIKTOK_URL || '#';

  return (
    <section className="min-h-screen flex items-center justify-center p-8">
      <div className="max-w-4xl w-full">
        {/* Main Content Layout */}
        <div className="flex flex-col md:flex-row items-center gap-12">
          {/* Avatar - Left Side */}
          <div className="flex-shrink-0">
            <div className="relative">
              <img 
                src="/images/emlinh-avatar-face.png" 
                alt="Em Linh Avatar"
                className="w-64 h-64 rounded-full shadow-2xl border-4 border-white/50"
              />
              <div className="absolute -bottom-2 -right-2 w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center">
                <span className="text-white text-2xl">✨</span>
              </div>
            </div>
          </div>

          {/* Content - Right Side */}
          <div className="flex-1 space-y-6 text-center md:text-left">
            {/* Name and Title */}
            <div className="space-y-2">
              <h1 className="text-6xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                {t('introduction.title')}
              </h1>
              <p className="text-3xl text-gray-700">
                {t('introduction.subtitle')}
              </p>
            </div>
            
            {/* Description */}
            <div className="space-y-3 text-gray-600">
              <p className="text-lg leading-relaxed">
                {t('introduction.description1')}
              </p>
              <p className="text-lg leading-relaxed">
                {t('introduction.description2')}
              </p>
            </div>

            {/* Features */}
            <div className="flex gap-4">
              <div className="bg-white/70 backdrop-blur-md rounded-lg p-4 border border-gray-200 shadow-sm">
                <h3 className="font-semibold text-blue-600 mb-2">🧠 {t('introduction.features.intelligence.title')}</h3>
                <p className="text-sm">{t('introduction.features.intelligence.description')}</p>
              </div>
              <div className="bg-white/70 backdrop-blur-md rounded-lg p-4 border border-gray-200 shadow-sm">
                <h3 className="font-semibold text-purple-600 mb-2">🎭 {t('introduction.features.expression.title')}</h3>
                <p className="text-sm">{t('introduction.features.expression.description')}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Social Links - Bottom */}
        <div className="flex flex-wrap gap-4 justify-center md:justify-start mt-12">
          <a
            href={facebookUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-full font-medium transition shadow-lg hover:shadow-xl"
          >
            <MessageCircle className="w-5 h-5" />
            {t('introduction.social.facebook')}
          </a>
          <a
            href={youtubeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-full font-medium transition shadow-lg hover:shadow-xl"
          >
            <Youtube className="w-5 h-5" />
            {t('introduction.social.youtube')}
          </a>
          <a
            href={instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white px-6 py-3 rounded-full font-medium transition shadow-lg hover:shadow-xl"
          >
            <Instagram className="w-5 h-5" />
            {t('introduction.social.instagram')}
          </a>
          <a
            href={tiktokUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 bg-black hover:bg-gray-800 text-white px-6 py-3 rounded-full font-medium transition shadow-lg hover:shadow-xl"
          >
            <Music className="w-5 h-5" />
            {t('introduction.social.tiktok')}
          </a>
        </div>
      </div>
    </section>
  );
};

export default IntroductionSection;
