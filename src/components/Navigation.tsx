import React from 'react';
import { Globe, Sparkles } from 'lucide-react';

interface NavigationProps {
  onLanguageToggle: () => void;
  currentLanguage: string;
}

const Navigation: React.FC<NavigationProps> = ({ onLanguageToggle, currentLanguage }) => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex justify-between items-center p-6 bg-white/70 backdrop-blur-md shadow-lg">
      <div className="flex items-center gap-2">
        <Sparkles className="w-6 h-6 text-cyan-400" />
        <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          EM LINH AI
        </span>
      </div>
      <button
        onClick={onLanguageToggle}
        className="flex items-center gap-2 bg-white/80 backdrop-blur-md hover:bg-white/90 px-4 py-2 rounded-full font-medium transition border border-gray-200 text-gray-700 hover:cursor-pointer"
      >
        <Globe className="w-4 h-4" />
        {currentLanguage === 'vi' ? 'EN' : 'VI'}
      </button>
    </nav>
  );
};

export default Navigation;
