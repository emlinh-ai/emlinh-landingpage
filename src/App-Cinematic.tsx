import React, { Suspense, useRef, useEffect, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { Environment, ContactShadows, OrbitControls } from '@react-three/drei';
import { VRMModel } from '@emlinh/vrm-character-controller';
import { registerAnimation } from '@emlinh/vrm-character-controller';
import { Globe, Sparkles, Youtube, MessageCircle, Calendar, Mail, Code, Users, Star } from 'lucide-react';
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

// Main App
const AppCinematic: React.FC = () => {
  const { i18n } = useTranslation();
  const [currentSection, setCurrentSection] = useState(0);
  const vrmRef = useRef<VRMModelRef | null>(null);
  const vrmUrl = 'emlinh-v2.vrm';

  // Scroll detection
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;
      const section = Math.floor(scrollY / windowHeight);
      setCurrentSection(Math.min(section, 3));
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Change animation based on section
  useEffect(() => {
    if (vrmRef.current && vrmRef.current.playAnimationById) {
      const animations = ['idle', 'talking', 'idle', 'idle'];
      vrmRef.current.playAnimationById(animations[currentSection], true);
    }
  }, [currentSection]);

  const toggleLanguage = () => {
    const newLang = i18n.language === 'vi' ? 'en' : 'vi';
    i18n.changeLanguage(newLang);
  };

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Fixed 3D Character - Right Side */}
      <div className="fixed right-0 top-0 w-1/2 h-screen z-10">
        <Canvas
          camera={{ position: [0, 1.2, 3], fov: 40 }}
          gl={{ antialias: true }}
          className="w-full h-full"
        >
          <color attach="background" args={['#000000']} />
          
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
          
          {/* Camera Controls */}
          <OrbitControls 
            enablePan={false}
            enableZoom={false}
            minPolarAngle={Math.PI / 3}
            maxPolarAngle={Math.PI / 3}
          />
        </Canvas>
      </div>

      {/* Scrollable Content - Left Side */}
      <div className="relative w-1/2 min-h-screen">
        {/* Navigation */}
        <nav className="fixed top-0 left-0 right-1/2 z-50 flex justify-between items-center p-6 bg-black/20 backdrop-blur-md">
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

        {/* Section 1: Introduction */}
        <section className="min-h-screen flex items-center justify-center p-8">
          <div className="max-w-2xl space-y-8">
            <div className="space-y-4">
              <h1 className="text-6xl font-bold bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                EM LINH
              </h1>
              <p className="text-3xl text-gray-300">
                Digital Oracle & AI Assistant
              </p>
            </div>
            
            <div className="space-y-4 text-gray-300">
              <p className="text-lg leading-relaxed">
                Xin chào! Tôi là Em Linh, một trợ lý AI 3D thông minh với khả năng tương tác tự nhiên và biểu cảm đa dạng.
              </p>
              <p className="text-lg leading-relaxed">
                Được xây dựng trên công nghệ VRM tiên tiến, tôi có thể giao tiếp, giải đáp thắc mắc và mang đến trải nghiệm tương tác chân thực.
              </p>
            </div>

            <div className="flex gap-4">
              <div className="bg-white/10 backdrop-blur-md rounded-lg p-4 border border-white/20">
                <h3 className="font-semibold text-cyan-400 mb-2">🧠 Trí tuệ</h3>
                <p className="text-sm">Gemini 2.5 powered</p>
              </div>
              <div className="bg-white/10 backdrop-blur-md rounded-lg p-4 border border-white/20">
                <h3 className="font-semibold text-purple-400 mb-2">🎭 Biểu cảm</h3>
                <p className="text-sm">20+ animations</p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 2: Skills */}
        <section className="min-h-screen flex items-center justify-center p-8">
          <div className="max-w-2xl space-y-8">
            <h2 className="text-5xl font-bold text-white mb-8">
              Kỹ năng đặc biệt
            </h2>
            
            <div className="grid grid-cols-1 gap-6">
              <div className="bg-white/10 backdrop-blur-md rounded-lg p-6 border border-white/20 hover:bg-white/20 transition">
                <div className="flex items-center gap-4 mb-4">
                  <Youtube className="w-8 h-8 text-red-500" />
                  <h3 className="text-xl font-semibold text-white">Livestream YouTube</h3>
                </div>
                <p className="text-gray-300">
                  Tự động dẫn livestream, tương tác với bình luận và trả lời câu hỏi của người xem một cách thông minh.
                </p>
              </div>

              <div className="bg-white/10 backdrop-blur-md rounded-lg p-6 border border-white/20 hover:bg-white/20 transition">
                <div className="flex items-center gap-4 mb-4">
                  <MessageCircle className="w-8 h-8 text-blue-500" />
                  <h3 className="text-xl font-semibold text-white">Trả lời Facebook</h3>
                </div>
                <p className="text-gray-300">
                  Quản lý và trả lời tin nhắn Facebook, hỗ trợ chăm sóc khách hàng 24/7.
                </p>
              </div>

              <div className="bg-white/10 backdrop-blur-md rounded-lg p-6 border border-white/20 hover:bg-white/20 transition">
                <div className="flex items-center gap-4 mb-4">
                  <Users className="w-8 h-8 text-green-500" />
                  <h3 className="text-xl font-semibold text-white">Chat trực tiếp</h3>
                </div>
                <p className="text-gray-300">
                  Tích hợp chat ngay trên website, hỗ trợ người dùng với thời gian phản hồi dưới 200ms.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 3: Fortune Telling */}
        <section className="min-h-screen flex items-center justify-center p-8">
          <div className="max-w-2xl space-y-8">
            <h2 className="text-5xl font-bold text-white mb-8">
              Luận giải Tử Vi
            </h2>
            
            <div className="bg-gradient-to-r from-purple-900/50 to-blue-900/50 backdrop-blur-md rounded-lg p-8 border border-purple-500/30">
              <div className="flex items-center gap-4 mb-6">
                <Calendar className="w-12 h-12 text-yellow-400" />
                <h3 className="text-2xl font-semibold text-yellow-400">Xem Tử Vi AI</h3>
              </div>
              
              <p className="text-lg text-gray-200 mb-6">
                Với trí tuệ nhân tạo và kiến thức phong thủy sâu rộng, tôi có thể luận giải hơn 900+ lá số Tử Vi khác nhau.
              </p>
              
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-white/10 rounded-lg p-4">
                  <Star className="w-6 h-6 text-cyan-400 mb-2" />
                  <h4 className="font-semibold text-white mb-1">Tổng quan</h4>
                  <p className="text-sm text-gray-300">Phân tích vận mệnh cuộc đời</p>
                </div>
                <div className="bg-white/10 rounded-lg p-4">
                  <Star className="w-6 h-6 text-purple-400 mb-2" />
                  <h4 className="font-semibold text-white mb-1">Chi tiết</h4>
                  <p className="text-sm text-gray-300">Luận giải 12 cung hoàng đạo</p>
                </div>
              </div>
              
              <p className="text-gray-300">
                Đưa ra lời khuyên hữu ích về công danh, tài lộc, tình duyên và sức khỏe.
              </p>
            </div>
          </div>
        </section>

        {/* Section 4: Contact */}
        <section className="min-h-screen flex items-center justify-center p-8">
          <div className="max-w-2xl space-y-8">
            <h2 className="text-5xl font-bold text-white mb-8">
              Liên hệ phát triển
            </h2>
            
            <div className="bg-white/10 backdrop-blur-md rounded-lg p-8 border border-white/20">
              <div className="flex items-center gap-4 mb-6">
                <Code className="w-12 h-12 text-cyan-400" />
                <h3 className="text-2xl font-semibold text-white">Em Linh Development Team</h3>
              </div>
              
              <p className="text-lg text-gray-300 mb-6">
                Chúng tôi luôn sẵn sàng lắng nghe góp ý và phát triển Em Linh ngày càng thông minh hơn.
              </p>
              
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <Mail className="w-5 h-5 text-gray-400" />
                  <span className="text-gray-300">contact@emlinh.ai</span>
                </div>
                <div className="flex items-center gap-3">
                  <Globe className="w-5 h-5 text-gray-400" />
                  <span className="text-gray-300">www.emlinh.ai</span>
                </div>
              </div>
              
              <button className="mt-6 w-full bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-600 hover:to-purple-600 text-white font-semibold py-3 px-6 rounded-lg transition">
                Gửi tin nhắn cho đội ngũ
              </button>
            </div>
          </div>
        </section>
      </div>

      {/* Scroll Indicator */}
      <div className="fixed bottom-8 left-1/4 transform -translate-x-1/2 text-white/60 text-sm animate-pulse z-20">
        Scroll để khám phá ↓
      </div>
    </div>
  );
};

export default AppCinematic;
