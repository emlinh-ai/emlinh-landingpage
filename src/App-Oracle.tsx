import React, { Suspense, useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import { Environment, ContactShadows } from '@react-three/drei';
import { Globe, Sparkles } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import CustomVRMModelSimple from './components/CustomVRMModel-Simple';
import ScrollIndicatorOracle from './components/ScrollIndicator-Oracle';
import type { VRMModelRef } from '@emlinh/vrm-character-controller';

// Đăng ký GSAP plugins
gsap.registerPlugin(ScrollTrigger);

const AppOracle: React.FC = () => {
  const sceneRef = useRef<VRMModelRef | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const vrmUrl = '/models/emlinh-v2.vrm';
  
  // GSAP Timeline cho 4 scenes
  useGSAP(() => {
    // Scene 0: Dormant (0-25%)
    gsap.to('.scene-0 .text-initializing', {
      opacity: 0,
      scale: 2,
      duration: 1,
      scrollTrigger: {
        trigger: '.scene-0',
        start: '20% top',
        end: '30% top',
        scrub: 1,
      }
    });

    // Scene 1: Awakening (25-50%)
    gsap.from('.scene-1 .headline-emlinh', {
      y: 100,
      opacity: 0,
      duration: 1.5,
      scrollTrigger: {
        trigger: '.scene-1',
        start: 'top center',
        end: '30% center',
        scrub: 1,
      }
    });

    // Scene 2: Intelligence (50-75%)
    gsap.from('.scene-2 .tech-item', {
      x: -100,
      opacity: 0,
      duration: 0.8,
      stagger: 0.2,
      scrollTrigger: {
        trigger: '.scene-2',
        start: 'top center',
        end: '40% center',
        scrub: 1,
      }
    });

    // Scene 3: Oracle (75-100%)
    gsap.from('.scene-3 .text-destiny', {
      scale: 0.5,
      opacity: 0,
      duration: 2,
      scrollTrigger: {
        trigger: '.scene-3',
        start: 'top center',
        end: '30% center',
        scrub: 1,
      }
    });

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  const LanguageSwitcher = () => {
    const { i18n } = useTranslation();
    
    const toggleLanguage = () => {
      const newLang = i18n.language === 'vi' ? 'en' : 'vi';
      i18n.changeLanguage(newLang);
    };
    
    return (
      <button
        onClick={toggleLanguage}
        className="fixed top-6 right-6 z-50 flex items-center gap-2 bg-black/30 backdrop-blur-md hover:bg-black/50 px-4 py-2 rounded-full font-medium transition border border-white/10 text-white"
      >
        <Globe className="w-4 h-4" />
        {i18n.language === 'vi' ? 'EN' : 'VI'}
      </button>
    );
  };

  return (
    <div ref={containerRef} className="min-h-screen bg-black text-white overflow-hidden">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 flex justify-between items-center p-6">
        <div className="flex items-center gap-2">
          <Sparkles className="w-6 h-6 text-cyan-400" />
          <span className="text-xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
            EM LINH AI
          </span>
        </div>
      </nav>

      {/* Scene 0: Dormant */}
      <section className="scene-0 min-h-screen relative flex items-center justify-center bg-gradient-to-b from-black via-blue-950/20 to-black">
        <div className="absolute inset-0">
          <div className="text-initializing text-6xl font-mono text-cyan-400/50 tracking-widest animate-pulse text-center">
            INITIALIZING...
          </div>
        </div>
        
        <div className="relative z-10 w-full h-[600px] max-w-4xl mx-auto">
          <Canvas camera={{ position: [0, 0, 6], fov: 50 }}>
            {/* Scene 0 Lighting - Rim light xanh đậm */}
            <ambientLight intensity={0.1} />
            <spotLight
              position={[0, 5, 5]}
              angle={0.3}
              penumbra={1}
              intensity={0}
              color="#0080ff"
            />
            <spotLight
              position={[-5, 2, 0]}
              angle={0.5}
              penumbra={1}
              intensity={0.5}
              color="#004080"
            />
            
            <Suspense fallback={null}>
              <CustomVRMModelSimple
                ref={sceneRef}
                vrmUrl={vrmUrl}
                positions={[0, 1, 0]}
              />
              <Environment preset="night" background={false} />
            </Suspense>
            
            <ContactShadows position={[0, 0, 0]} opacity={0.3} scale={10} blur={3} far={4} />
          </Canvas>
        </div>
      </section>

      {/* Scene 1: Awakening */}
      <section className="scene-1 min-h-screen relative flex items-center justify-center bg-gradient-to-b from-black via-purple-950/20 to-black">
        <div className="relative z-10 text-center">
          <h1 className="headline-emlinh text-7xl font-bold mb-4 bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
            EM LINH AI
          </h1>
          <p className="text-2xl text-gray-300 mb-8">
            The Digital Oracle Has Awakened
          </p>
        </div>
        
        <div className="absolute inset-0 w-full h-[600px] max-w-4xl mx-auto">
          <Canvas camera={{ position: [0, 1.4, 3.5], fov: 50 }}>
            {/* Scene 1 Lighting - Trắng lạnh */}
            <ambientLight intensity={0.3} />
            <spotLight
              position={[0, 5, 5]}
              angle={0.3}
              penumbra={1}
              intensity={2}
              color="#ffffff"
            />
            <directionalLight position={[10, 10, 5]} intensity={1} color="#e0e7ff" />
            
            <Suspense fallback={null}>
              <CustomVRMModelSimple
                ref={sceneRef}
                vrmUrl={vrmUrl}
                positions={[0, 1, 0]}
              />
              <Environment preset="city" background={false} />
            </Suspense>
            
            <ContactShadows position={[0, 0, 0]} opacity={0.4} scale={10} blur={2.5} far={4} />
          </Canvas>
        </div>
      </section>

      {/* Scene 2: Intelligence */}
      <section className="scene-2 min-h-screen relative flex items-center justify-center bg-gradient-to-b from-black via-cyan-950/20 to-black">
        <div className="relative z-10 text-center">
          <h2 className="text-6xl font-bold mb-6 text-cyan-400">
            The Intelligence
          </h2>
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            {['Gemini 2.5', 'Qwen TTS', 'Latency < 200ms', 'Neural Network'].map((tech, i) => (
              <div key={i} className="tech-item px-6 py-3 bg-cyan-400/10 border border-cyan-400/30 rounded-full text-cyan-300 font-mono">
                {tech}
              </div>
            ))}
          </div>
        </div>
        
        <div className="absolute inset-0 w-full h-[600px] max-w-4xl mx-auto">
          <Canvas camera={{ position: [2, 1.4, 3.5], fov: 50 }}>
            {/* Scene 2 Lighting - Cyberpunk */}
            <ambientLight intensity={0.4} />
            <spotLight
              position={[5, 5, 5]}
              angle={0.3}
              penumbra={1}
              intensity={2.5}
              color="#00ffff"
            />
            <pointLight position={[-5, 3, 0]} intensity={1} color="#8b5cf6" />
            
            <Suspense fallback={null}>
              <CustomVRMModelSimple
                ref={sceneRef}
                vrmUrl={vrmUrl}
                positions={[0, 1, 0]}
              />
              <Environment preset="sunset" background={false} />
            </Suspense>
            
            <ContactShadows position={[0, 0, 0]} opacity={0.5} scale={12} blur={2} far={4} />
          </Canvas>
        </div>
      </section>

      {/* Scene 3: Oracle */}
      <section className="scene-3 min-h-screen relative flex items-center justify-center bg-gradient-to-b from-purple-950 via-black to-indigo-950">
        <div className="relative z-10 text-center">
          <h2 className="text-destiny text-6xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-yellow-400 bg-clip-text text-transparent">
            DESTINY DECODED
          </h2>
          <p className="text-2xl text-purple-300 mb-8">
            The Astrology Oracle
          </p>
        </div>
        
        <div className="absolute inset-0 w-full h-[600px] max-w-4xl mx-auto">
          <Canvas camera={{ position: [0, 0.5, 7], fov: 60 }}>
            {/* Scene 3 Lighting - Mystical */}
            <ambientLight intensity={0.2} />
            <spotLight
              position={[0, 10, 5]}
              angle={0.5}
              penumbra={1}
              intensity={3}
              color="#fbbf24"
            />
            <pointLight position={[5, 0, 0]} intensity={2} color="#a855f7" />
            <pointLight position={[-5, 0, 0]} intensity={2} color="#3b82f6" />
            
            <Suspense fallback={null}>
              <CustomVRMModelSimple
                ref={sceneRef}
                vrmUrl={vrmUrl}
                positions={[0, 1, 0]}
              />
              <Environment preset="dawn" background={false} />
            </Suspense>
            
            <ContactShadows position={[0, 0, 0]} opacity={0.6} scale={15} blur={3} far={4} />
          </Canvas>
        </div>
      </section>

      <ScrollIndicatorOracle />
      <LanguageSwitcher />
    </div>
  );
};

export default AppOracle;
