import React from 'react';
import { Globe, Sparkles, Volume2, VolumeX, Volume1 } from 'lucide-react';
import { useTranslation } from 'react-i18next';

interface NavigationProps {
  onLanguageToggle: () => void;
  currentLanguage: string;
  isAudioEnabled: boolean;
  onAudioToggle: () => void;
  volume: number;
  onVolumeChange: (volume: number) => void;
}

const Navigation: React.FC<NavigationProps> = ({ 
  onLanguageToggle, 
  currentLanguage, 
  isAudioEnabled,
  onAudioToggle,
  volume,
  onVolumeChange
}) => {
  const { t } = useTranslation();
  
  const getVolumeIcon = () => {
    if (volume === 0 || !isAudioEnabled) return VolumeX;
    if (volume < 0.5) return Volume1;
    return Volume2;
  };
  
  const VolumeIcon = getVolumeIcon();
  
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex justify-between items-center p-6">
      <div className="flex items-center gap-2">
        <Sparkles className="w-6 h-6 text-cyan-400" />
        <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          EM LINH AI
        </span>
      </div>
      <div className="flex items-center gap-3">
        {/* Volume Slider Container */}
        <div 
          className={`flex items-center gap-2 bg-white/80 backdrop-blur-md rounded-full transition-all duration-300 ${
            isAudioEnabled ? 'px-3 py-2' : 'px-0 py-0 w-0 overflow-hidden'
          }`}
        >
          {isAudioEnabled && (
            <input
              type="range"
              min="0"
              max="1"
              step="0.1"
              value={volume}
              onChange={(e) => onVolumeChange(parseFloat(e.target.value))}
              className="w-24 h-1 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
              style={{
                background: `linear-gradient(to right, #3B82F6 0%, #3B82F6 ${volume * 100}%, #E5E7EB ${volume * 100}%, #E5E7EB 100%)`
              }}
            />
          )}
        </div>
        
        <button
          onClick={onAudioToggle}
          className={`flex items-center gap-2 backdrop-blur-md hover:bg-white/90 px-4 py-2 rounded-full font-medium transition border text-gray-700 hover:cursor-pointer group ${
            isAudioEnabled 
              ? 'bg-blue-100 border-blue-300 shadow-lg shadow-blue-200/50' 
              : 'bg-white/80 border-gray-200'
          }`}
          aria-label={isAudioEnabled ? t('nav.stopAndMute') : t('nav.playAndDance')}
          title={isAudioEnabled ? t('nav.stopAndMute') : t('nav.playAndDance')}
        >
          <VolumeIcon className={`w-4 h-4 ${isAudioEnabled ? 'text-blue-600' : 'text-gray-600'}`} />
        </button>
        <button
          onClick={onLanguageToggle}
          className="flex items-center gap-2 bg-white/80 backdrop-blur-md hover:bg-white/90 px-4 py-2 rounded-full font-medium transition border border-gray-200 text-gray-700 hover:cursor-pointer"
        >
          <Globe className="w-4 h-4" />
          {currentLanguage === 'vi' ? 'EN' : 'VI'}
        </button>
      </div>
    </nav>
  );
};

export default Navigation;
