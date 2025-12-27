// src/App.tsx
import React, { Suspense, useState, useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import { Environment, ContactShadows } from '@react-three/drei';
import { Globe, Sparkles } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
// Note: The following imports are commented out due to R3F hooks issues
// They caused "Hooks can only be used within the Canvas component!" error
// TODO: Fix R3F hooks usage in these components and re-enable
// import SceneController from './components/SceneController';
// import ParticleField from './components/ParticleField';
// import ZodiacCircle from './components/ZodiacCircle';
import ScrollIndicator from './components/ScrollIndicator';
import CustomVRMModel from './components/CustomVRMModel';
import type { VRMModelRef } from '@emlinh/vrm-character-controller';

// Đăng ký GSAP plugins
gsap.registerPlugin(ScrollTrigger);

// --- Placeholder cho 3D Model ---
const ModelPlaceholder = () => {
  return (
    <mesh position={[0, 1, 0]}>
      <boxGeometry args={[1, 2, 1]} />
      <meshStandardMaterial color={"#0ea5e9"} wireframe />
    </mesh>
  );
};

// --- VRM Model Component với Scene Controller ---
const VRMCharacter = ({ url, sceneRef }: { url?: string; sceneRef: React.RefObject<VRMModelRef | null> }) => {
  if (!url) {
    return <ModelPlaceholder />;
  }
  
  return (
    <CustomVRMModel
      ref={sceneRef}
      vrmUrl={url}
      positions={[0, 1, 0]}
    />
  );
};

// --- Scene Text Component ---
const SceneText = ({ children, className, delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) => {
  const textRef = useRef<HTMLDivElement>(null);
  
  useGSAP(() => {
    if (textRef.current) {
      gsap.fromTo(textRef.current, 
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 1.5, delay }
      );
    }
  }, [delay]);
  
  return (
    <div ref={textRef} className={className}>
      {children}
    </div>
  );
};

// --- Language Switcher Component ---
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

function App() {
  const { t: _ } = useTranslation();
  const [vrmUrl] = useState<string>('/models/emlinh-v2.vrm');
  const sceneRef = useRef<VRMModelRef | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [, setCurrentScene] = useState(0);
  
  // GSAP Scroll Timeline
  useGSAP(() => {
    // Create main timeline
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top top',
        end: 'bottom bottom',
        scrub: 1,
        pin: true,
        onUpdate: (self) => {
          const progress = self.progress;
          if (progress < 0.25) setCurrentScene(0);
          else if (progress < 0.5) setCurrentScene(1);
          else if (progress < 0.75) setCurrentScene(2);
          else setCurrentScene(3);
        }
      }
    });
    
    // Scene transitions
    tl.to('.scene-section:nth-child(1) .text-6xl', {
      opacity: 0,
      scale: 2,
      duration: 0.5,
      ease: "power2.in"
    }, 0.2);
    
    tl.from('.scene-section:nth-child(2) .text-7xl', {
      opacity: 0,
      y: 100,
      duration: 1,
      ease: "power2.out"
    }, 0.3);
    
    tl.from('.scene-section:nth-child(3) .text-6xl', {
      opacity: 0,
      x: -100,
      duration: 1,
      ease: "power2.out"
    }, 0.5);
    
    tl.from('.scene-section:nth-child(4) .text-6xl', {
      opacity: 0,
      scale: 0.5,
      duration: 1,
      ease: "power2.out"
    }, 0.7);
    
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);
  
  return (
    <div ref={containerRef} className="min-h-screen bg-black text-white overflow-hidden">
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

      {/* --- Scene 0: Dormant --- */}
      <section className="scene-section min-h-screen relative flex items-center justify-center">
        <div className="absolute inset-0 bg-gradient-to-b from-black via-blue-950/20 to-black">
          {/* Stars moved inside Canvas */}
        </div>
        
        <div className="relative z-10 text-center">
          <div className="text-6xl font-mono text-cyan-400/50 mb-8 tracking-widest animate-pulse">
            INITIALIZING...
          </div>
          
          <div className="h-[600px] w-full max-w-4xl mx-auto">
            <Canvas camera={{ position: [0, 0, 6], fov: 50 }}>
              {/* <SceneController scene={0} vrmRef={sceneRef} /> */}
              
              {/* Scene 0 Lighting */}
              <ambientLight intensity={0.1} />
              <spotLight
                position={[0, 5, 5]}
                angle={0.3}
                penumbra={1}
                intensity={0}
                color="#00ffff"
              />
              <spotLight
                position={[-5, 2, 0]}
                angle={0.5}
                penumbra={1}
                intensity={0.5}
                color="#0080ff"
              />
              
              <Suspense fallback={null}>
                <VRMCharacter url={vrmUrl} sceneRef={sceneRef} />
                {/* <Environment preset="night" background={false} /> */}
                {/* Stars moved inside Canvas */}
                {/* <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} /> */}
              </Suspense>
              
              {/* <ContactShadows position={[0, 0, 0]} opacity={0.3} scale={10} blur={3} far={4} /> */}
            </Canvas>
          </div>
        </div>
      </section>

      {/* --- Scene 1: The Awakening --- */}
      <section className="scene-section min-h-screen relative flex items-center justify-center">
        <div className="absolute inset-0 bg-gradient-to-b from-black via-purple-950/20 to-black">
          {/* ParticleField moved inside Canvas */}
        </div>
        
        <div className="relative z-10 text-center">
          <SceneText delay={0.5}>
            <h1 className="text-7xl font-bold mb-4 bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              EM LINH AI
            </h1>
            <p className="text-2xl text-gray-300 mb-8">
              The Digital Oracle Has Awakened
            </p>
          </SceneText>
          
          <div className="h-[600px] w-full max-w-4xl mx-auto">
            <Canvas camera={{ position: [0, 1.4, 3.5], fov: 50 }}>
              {/* <SceneController scene={1} vrmRef={sceneRef} /> */}
              
              {/* Scene 1 Lighting */}
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
                <VRMCharacter url={vrmUrl} sceneRef={sceneRef} />
                <Environment preset="city" background={false} />
                {/* ParticleField moved inside Canvas */}
                {/* <ParticleField count={1000} color="#8b5cf6" /> */}
              </Suspense>
              
              <ContactShadows position={[0, 0, 0]} opacity={0.4} scale={10} blur={2.5} far={4} />
            </Canvas>
          </div>
        </div>
      </section>

      {/* --- Scene 2: The Intelligence --- */}
      <section className="scene-section min-h-screen relative flex items-center justify-center">
        <div className="absolute inset-0 bg-gradient-to-b from-black via-cyan-950/20 to-black">
          {/* ParticleField moved inside Canvas */}
        </div>
        
        <div className="relative z-10 text-center">
          <SceneText delay={0.3}>
            <h2 className="text-6xl font-bold mb-6 text-cyan-400">
              The Intelligence
            </h2>
            <div className="flex flex-wrap justify-center gap-4 mb-8">
              {['Gemini 2.5', 'Qwen TTS', 'Latency < 200ms', 'Neural Network'].map((tech, i) => (
                <div key={i} className="px-6 py-3 bg-cyan-400/10 border border-cyan-400/30 rounded-full text-cyan-300 font-mono">
                  {tech}
                </div>
              ))}
            </div>
          </SceneText>
          
          <div className="h-[600px] w-full max-w-4xl mx-auto">
            <Canvas camera={{ position: [2, 1.4, 3.5], fov: 50 }}>
              {/* <SceneController scene={2} vrmRef={sceneRef} /> */}
              
              {/* Scene 2 Lighting */}
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
                <VRMCharacter url={vrmUrl} sceneRef={sceneRef} />
                <Environment preset="sunset" background={false} />
                {/* ParticleField moved inside Canvas */}
                {/* <ParticleField count={2000} color="#06b6d4" /> */}
              </Suspense>
              
              <ContactShadows position={[0, 0, 0]} opacity={0.5} scale={12} blur={2} far={4} />
            </Canvas>
          </div>
        </div>
      </section>

      {/* --- Scene 3: The Astrology Oracle --- */}
      <section className="scene-section min-h-screen relative flex items-center justify-center">
        <div className="absolute inset-0 bg-gradient-to-b from-purple-950 via-black to-indigo-950">
          {/* ParticleField moved inside Canvas */}
        </div>
        
        <div className="relative z-10 text-center">
          <SceneText delay={0.3}>
            <h2 className="text-6xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-yellow-400 bg-clip-text text-transparent">
              DESTINY DECODED
            </h2>
            <p className="text-2xl text-purple-300 mb-8">
              The Astrology Oracle
            </p>
          </SceneText>
          
          <div className="h-[600px] w-full max-w-4xl mx-auto">
            <Canvas camera={{ position: [0, 0.5, 7], fov: 60 }}>
              {/* <SceneController scene={3} vrmRef={sceneRef} /> */}
              
              {/* Scene 3 Lighting */}
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
                <VRMCharacter url={vrmUrl} sceneRef={sceneRef} />
                {/* <ZodiacCircle position={[0, 2, -3]} scale={4} /> */}
                <Environment preset="dawn" background={false} />
                {/* ParticleField moved inside Canvas */}
                {/* <ParticleField count={3000} color="#a855f7" /> */}
              </Suspense>
              
              <ContactShadows position={[0, 0, 0]} opacity={0.6} scale={15} blur={3} far={4} />
            </Canvas>
          </div>
        </div>
      </section>
      
      {/* --- Scroll Indicator --- */}
      <ScrollIndicator />
    </div>
  );
}

export default App;