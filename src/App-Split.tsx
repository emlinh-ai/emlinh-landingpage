import React, { Suspense, useState, useEffect, useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import { Environment, ContactShadows } from '@react-three/drei';
import { VRMModel } from '@emlinh/vrm-character-controller';
import { registerAnimation } from '@emlinh/vrm-character-controller';
import { Globe, Sparkles, Play, Pause } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import type { VRMModelRef } from '@emlinh/vrm-character-controller';

// Register animations
registerAnimation({
  id: 'idle',
  name: 'Standing Idle',
  type: 'fbx',
  path: '/animations/fbx/Standing Idle.fbx',
  category: 'idle',
  preload: true,
});

registerAnimation({
  id: 'talking',
  name: 'Normal Talking',
  type: 'fbx',
  path: '/animations/fbx/Normal Talking.fbx',
  category: 'talking',
  preload: true,
});

registerAnimation({
  id: 'gesture',
  name: 'Hand Gesture Talk',
  type: 'fbx',
  path: '/animations/fbx/Hand Gesture Talk Fast.fbx',
  category: 'gesture',
  preload: true,
});

registerAnimation({
  id: 'explaining',
  name: 'Talk Explanation',
  type: 'fbx',
  path: '/animations/fbx/Talk Explaination.fbx',
  category: 'talking',
  preload: true,
});

registerAnimation({
  id: 'confident',
  name: 'Confidence Talking',
  type: 'fbx',
  path: '/animations/fbx/Confidence Talking.fbx',
  category: 'talking',
  preload: true,
});

const AppSplit: React.FC = () => {
  const { i18n } = useTranslation();
  const [currentAnimation, setCurrentAnimation] = useState('idle');
  const [isPlaying, setIsPlaying] = useState(false);
  const vrmUrl = 'emlinh-v2.vrm';
  const vrmRef = useRef<VRMModelRef>(null);

  // Animation cycle
  useEffect(() => {
    const animations = ['idle', 'talking', 'gesture', 'explaining', 'confident'];
    let index = 0;

    const interval = setInterval(() => {
      if (isPlaying) {
        index = (index + 1) % animations.length;
        setCurrentAnimation(animations[index]);
      }
    }, 3000); // Change animation every 3 seconds

    return () => clearInterval(interval);
  }, [isPlaying]);

  const toggleLanguage = () => {
    const newLang = i18n.language === 'vi' ? 'en' : 'vi';
    i18n.changeLanguage(newLang);
  };

  const playAnimation = (animationId: string) => {
    setCurrentAnimation(animationId);
    if (vrmRef.current && vrmRef.current.playAnimationById) {
      vrmRef.current.playAnimationById(animationId, true);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white overflow-hidden">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 flex justify-between items-center p-6 bg-black/20 backdrop-blur-md">
        <div className="flex items-center gap-2">
          <Sparkles className="w-6 h-6 text-cyan-400" />
          <span className="text-xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
            EM LINH AI
          </span>
        </div>
        <button
          onClick={toggleLanguage}
          className="flex items-center gap-2 bg-black/30 backdrop-blur-md hover:bg-black/50 px-4 py-2 rounded-full font-medium transition border border-white/10 text-white"
        >
          <Globe className="w-4 h-4" />
          {i18n.language === 'vi' ? 'EN' : 'VI'}
        </button>
      </nav>

      {/* Main Content - Split Layout */}
      <div className="flex min-h-screen pt-20">
        {/* Left Side - Content */}
        <div className="w-1/2 flex items-center justify-center p-8">
          <div className="max-w-2xl space-y-8">
            {/* Header */}
            <div className="space-y-4">
              <h1 className="text-6xl font-bold bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                EM LINH AI
              </h1>
              <p className="text-2xl text-gray-300">
                Digital Oracle & AI Assistant
              </p>
            </div>

            {/* Description */}
            <div className="space-y-4 text-gray-300">
              <p className="text-lg leading-relaxed">
                Chào mừng đến với thế giới AI tương tác 3D! Tôi là Em Linh, 
                trợ lý AI thông minh với khả năng giao tiếp tự nhiên và biểu cảm đa dạng.
              </p>
              <p className="text-lg leading-relaxed">
                Với công nghệ VRM tiên tiến, tôi có thể diễn đạt cảm xúc và 
                tương tác với bạn một cách chân thực nhất.
              </p>
            </div>

            {/* Features */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white/10 backdrop-blur-md rounded-lg p-4 border border-white/20">
                <h3 className="font-semibold text-cyan-400 mb-2">🧠 Trí tuệ nhân tạo</h3>
                <p className="text-sm">Gemini 2.5 powered</p>
              </div>
              <div className="bg-white/10 backdrop-blur-md rounded-lg p-4 border border-white/20">
                <h3 className="font-semibold text-purple-400 mb-2">🎭 Biểu cảm đa dạng</h3>
                <p className="text-sm">20+ animations</p>
              </div>
              <div className="bg-white/10 backdrop-blur-md rounded-lg p-4 border border-white/20">
                <h3 className="font-semibold text-pink-400 mb-2">🗣️ Tương tác tự nhiên</h3>
                <p className="text-sm">Real-time responses</p>
              </div>
              <div className="bg-white/10 backdrop-blur-md rounded-lg p-4 border border-white/20">
                <h3 className="font-semibold text-yellow-400 mb-2">⚡ Low latency</h3>
                <p className="text-sm">&lt;200ms response</p>
              </div>
            </div>

            {/* Animation Controls */}
            <div className="bg-white/10 backdrop-blur-md rounded-lg p-6 border border-white/20">
              <h3 className="font-semibold text-lg mb-4">Animation Controls</h3>
              <div className="flex items-center gap-4 mb-4">
                <button
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="flex items-center gap-2 bg-cyan-500 hover:bg-cyan-600 px-4 py-2 rounded-lg transition"
                >
                  {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                  {isPlaying ? 'Pause' : 'Play'} Auto
                </button>
                <span className="text-sm text-gray-400">
                  Current: <span className="text-cyan-400 font-medium">{currentAnimation}</span>
                </span>
              </div>
              <div className="grid grid-cols-3 gap-2">
                {['idle', 'talking', 'gesture', 'explaining', 'confident'].map((anim) => (
                  <button
                    key={anim}
                    onClick={() => playAnimation(anim)}
                    className={`px-3 py-2 rounded text-sm transition ${
                      currentAnimation === anim
                        ? 'bg-purple-500 text-white'
                        : 'bg-white/10 hover:bg-white/20 text-gray-300'
                    }`}
                  >
                    {anim.charAt(0).toUpperCase() + anim.slice(1)}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Right Side - 3D Character */}
        <div className="w-1/2 relative">
          <div className="absolute inset-0 bg-gradient-to-l from-purple-900/20 to-transparent" />
          <div className="h-full flex items-center justify-center">
            <div className="w-full h-[600px] max-w-2xl">
              <Canvas 
                camera={{ position: [0, 1.2, 3], fov: 40 }}
                className="w-full h-full"
              >
                {/* Lighting */}
                <ambientLight intensity={0.4} />
                <directionalLight 
                  position={[5, 5, 5]} 
                  intensity={1} 
                  color="#e0e7ff" 
                />
                <spotLight
                  position={[0, 8, 2]}
                  angle={0.3}
                  penumbra={1}
                  intensity={2}
                  color="#ffffff"
                />
                <pointLight 
                  position={[-5, 3, 0]} 
                  intensity={0.5} 
                  color="#a855f7" 
                />
                
                {/* VRM Character */}
                <Suspense fallback={null}>
                  <VRMModel
                    ref={vrmRef}
                    vrmUrl={vrmUrl}
                    positions={[0, -1, 0]}
                    isAudioPlaying={currentAnimation !== 'idle'}
                  />
                  <Environment preset="city" background={false} />
                </Suspense>
                
                {/* Ground */}
                <ContactShadows 
                  position={[0, 0, 0]} 
                  opacity={0.4} 
                  scale={10} 
                  blur={2} 
                  far={4} 
                />
              </Canvas>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AppSplit;
