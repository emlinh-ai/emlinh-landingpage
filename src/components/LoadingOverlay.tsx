import React from 'react';
import { Loader2 } from 'lucide-react';

interface LoadingOverlayProps {
  isLoading: boolean;
}

const LoadingOverlay: React.FC<LoadingOverlayProps> = ({ isLoading }) => {
  if (!isLoading) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/90 backdrop-blur-sm">
      <div className="text-center space-y-6">
        {/* Avatar Image */}
        <div className="relative">
          <img 
            src="/images/emlinh-avatar-face.png" 
            alt="Em Linh Avatar"
            className="w-32 h-32 mx-auto rounded-full shadow-lg animate-pulse"
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <Loader2 className="w-12 h-12 animate-spin text-blue-600" />
          </div>
        </div>
        
        <div className="space-y-2">
          <p className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Đang tải Em Linh...
          </p>
          <p className="text-sm text-gray-500">Vui lòng đợi giây lát</p>
        </div>
      </div>
    </div>
  );
};

export default LoadingOverlay;
