import React, { Suspense, useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import { Environment } from '@react-three/drei';
import { Globe, Sparkles } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import CustomVRMModelSimple from './components/CustomVRMModel-Simple';
import type { VRMModelRef } from '@emlinh/vrm-character-controller';

const App: React.FC = () => {
  const sceneRef = useRef<VRMModelRef | null>(null);
  const vrmUrl = '/models/emlinh-v2.vrm';

  const LanguageSwitcher = () => {
    const { i18n } = useTranslation();
    
    const toggleLanguage = () => {
      const newLang = i18n.language === 'vi' ? 'en' : 'vi';
      i18n.changeLanguage(newLang);
    };
    
    return (
      <button
        onClick={toggleLanguage}
        className="flex items-center gap-2 bg-black/30 backdrop-blur-md hover:bg-black/50 px-4 py-2 rounded-full font-medium transition border border-white/10 text-white"
      >
        <Globe className="w-4 h-4" />
        {i18n.language === 'vi' ? 'EN' : 'VI'}
      </button>
    );
  };

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden">
      {/* --- Navigation --- */}
      <nav className="fixed top-0 left-0 right-0 z-50 flex justify-between items-center p-6">
        <div className="flex items-center gap-2">
          <Sparkles className="w-6 h-6 text-cyan-400" />
          <span className="text-xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
            EM LINH AI
          </span>
        </div>
        <LanguageSwitcher />
      </nav>

      {/* --- Main Scene --- */}
      <section className="min-h-screen relative flex items-center justify-center">
        <div className="relative z-10 text-center">
          <h1 className="text-7xl font-bold mb-4 bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
            EM LINH AI
          </h1>
          <p className="text-2xl text-gray-300 mb-8">
            The Digital Oracle Has Awakened
          </p>
          
          <div className="h-[600px] w-full max-w-4xl mx-auto">
            <Canvas camera={{ position: [0, 1.4, 3.5], fov: 50 }}>
              <ambientLight intensity={0.3} />
              <directionalLight position={[10, 10, 5]} intensity={1} color="#e0e7ff" />
              
              <Suspense fallback={null}>
                <CustomVRMModelSimple
                  ref={sceneRef}
                  vrmUrl={vrmUrl}
                  positions={[0, 1, 0]}
                />
                <Environment preset="city" background={false} />
              </Suspense>
            </Canvas>
          </div>
        </div>
      </section>
    </div>
  );
};

export default App;
