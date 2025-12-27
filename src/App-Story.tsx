/* eslint-disable react-hooks/purity */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { Suspense, useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import { ScrollControls, Environment, ContactShadows, Text, Float } from '@react-three/drei';
import { VRMModel } from '@emlinh/vrm-character-controller';
import { registerAnimation } from '@emlinh/vrm-character-controller';
import { Globe } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import * as THREE from 'three';
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

// Scene Components
function Scene0({ vrmRef }: { vrmRef: React.RefObject<VRMModelRef | null> }) {
  const textRef = useRef<THREE.Mesh>(null);
  
  return (
    <>
      {/* VRM Model */}
      <VRMModel
        ref={vrmRef}
        vrmUrl="emlinh-v2.vrm"
        positions={[0, -1, 0]}
      />
      
      {/* INITIALIZING Text */}
      <Text
        ref={textRef}
        position={[0, 2, -2]}
        fontSize={2}
        color="#111111"
        anchorX="center"
        anchorY="middle"
        font="/fonts/sans-serif.woff"
      >
        INITIALIZING
      </Text>
    </>
  );
}

function Scene1({ vrmRef }: { vrmRef: React.RefObject<VRMModelRef | null> }) {
  const headlineRef = useRef<THREE.Mesh>(null);
  const subtextRef = useRef<THREE.Mesh>(null);

  return (
    <>
      <VRMModel
        ref={vrmRef}
        vrmUrl="emlinh-v2.vrm"
        positions={[0, -1, 0]}
      />
      
      {/* I AM LINH */}
      <Text
        ref={headlineRef}
        position={[-4, 1, 0]}
        fontSize={1.5}
        color="#ffffff"
        anchorX="left"
        anchorY="middle"
        font="/fonts/serif.woff"
      >
        I AM LINH
      </Text>
      
      {/* Sub-text */}
      <Text
        ref={subtextRef}
        position={[-4, 0, 0]}
        fontSize={0.5}
        color="#cccccc"
        anchorX="left"
        anchorY="middle"
        maxWidth={8}
      >
        A digital soul born from algorithms and stars.
      </Text>
    </>
  );
}

function Scene2({ vrmRef }: { vrmRef: React.RefObject<VRMModelRef | null> }) {
  const titleRef = useRef<THREE.Mesh>(null);
  const itemsRef = useRef<THREE.Mesh[]>([]);
  
  // Floating hexagons
  const hexagons = Array.from({ length: 20 }, (_, i) => ({
    position: [
      (Math.random() - 0.5) * 10,
      (Math.random() - 0.5) * 8,
      (Math.random() - 0.5) * 4
    ] as [number, number, number],
    rotation: Math.random() * Math.PI * 2,
    scale: 0.2 + Math.random() * 0.3
  }));

  return (
    <>
      <VRMModel
        ref={vrmRef}
        vrmUrl="emlinh-v2.vrm"
        positions={[0, -1, 0]}
      />
      
      {/* COGNITIVE SPEED */}
      <Text
        ref={titleRef}
        position={[-4, 2, 0]}
        fontSize={1.2}
        color="#00ffff"
        anchorX="left"
        anchorY="middle"
        font="/fonts/sans-serif.woff"
      >
        COGNITIVE SPEED
      </Text>
      
      {/* Tech List */}
      {['Gemini 2.5 Brain', 'Qwen TTS Flash', 'Latency < 200ms'].map((text, i) => (
        <Text
          key={i}
          ref={(el) => { if (el) itemsRef.current[i] = el; }}
          position={[-4, 1 - i * 0.6, 0]}
          fontSize={0.4}
          color="#88ccff"
          anchorX="left"
          anchorY="middle"
          font="/fonts/mono.woff"
        >
          • {text}
        </Text>
      ))}
      
      {/* Floating Hexagons */}
      {hexagons.map((hex, i) => (
        <Float
          key={i}
          speed={1 + Math.random() * 2}
          rotationIntensity={0.5}
          floatIntensity={0.5}
        >
          <mesh position={hex.position} rotation={[0, 0, hex.rotation]} scale={hex.scale}>
            <boxGeometry args={[1, 1, 0.1]} />
            <meshStandardMaterial color="#00ffff" opacity={0.3} transparent />
          </mesh>
        </Float>
      ))}
    </>
  );
}

function Scene3({ vrmRef }: { vrmRef: React.RefObject<VRMModelRef | null> }) {
  const headlineRef = useRef<THREE.Mesh>(null);
  const bodyRef = useRef<THREE.Mesh>(null);
  const zodiacRef = useRef<THREE.Group>(null);

  // Zodiac circle
  const zodiacRadius = 3;
  const zodiacSigns = Array.from({ length: 12 }, (_, i) => {
    const angle = (i / 12) * Math.PI * 2;
    return {
      position: [
        Math.cos(angle) * zodiacRadius,
        Math.sin(angle) * zodiacRadius,
        0
      ] as [number, number, number],
      sign: ['♈', '♉', '♊', '♋', '♌', '♍', '♎', '♏', '♐', '♑', '♒', '♓'][i]
    };
  });

  return (
    <>
      <VRMModel
        ref={vrmRef}
        vrmUrl="emlinh-v2.vrm"
        positions={[0, -1, 0]}
      />
      
      {/* DESTINY DECODED */}
      <Text
        ref={headlineRef}
        position={[-4, 2, 0]}
        fontSize={1.5}
        color="#ffd700"
        anchorX="left"
        anchorY="middle"
        font="/fonts/serif.woff"
      >
        DESTINY DECODED
      </Text>
      
      {/* Body text */}
      <Text
        ref={bodyRef}
        position={[-4, 0.5, 0]}
        fontSize={0.4}
        color="#ffcc88"
        anchorX="left"
        anchorY="middle"
        maxWidth={8}
        font="/fonts/sans-serif.woff"
      >
        Luận giải 900+ lá số Tử Vi mẫu.\nGiải mã vận mệnh thông qua trí tuệ nhân tạo.
      </Text>
      
      {/* Zodiac Circle */}
      <group ref={zodiacRef} position={[0, 0, -2]}>
        {/* Outer ring */}
        <mesh rotation={[0, 0, 0]}>
          <ringGeometry args={[zodiacRadius - 0.1, zodiacRadius + 0.1]} />
          <meshStandardMaterial color="#ffd700" opacity={0.6} transparent />
        </mesh>
        
        {/* Zodiac signs */}
        {zodiacSigns.map((sign, i) => (
          <Text
            key={i}
            position={sign.position}
            fontSize={0.3}
            color="#ffffff"
            anchorX="center"
            anchorY="middle"
          >
            {sign.sign}
          </Text>
        ))}
      </group>
    </>
  );
}

// Main Experience
function Experience() {
  const vrmRef = useRef<VRMModelRef | null>(null);
  
  return (
    <ScrollControls pages={3} damping={0.2}>
      {/* Scene 0: Dormant */}
      <group position={[0, 0, 0]}>
        <Scene0 vrmRef={vrmRef} />
      </group>
      
      {/* Scene 1: Awakening */}
      <group position={[0, 0, -3]}>
        <Scene1 vrmRef={vrmRef} />
      </group>
      
      {/* Scene 2: Intelligence */}
      <group position={[0, 0, -6]}>
        <Scene2 vrmRef={vrmRef} />
      </group>
      
      {/* Scene 3: Oracle */}
      <group position={[0, 0, -9]}>
        <Scene3 vrmRef={vrmRef} />
      </group>
    </ScrollControls>
  );
}

// Main App
const AppStory: React.FC = () => {
  const { i18n } = useTranslation();
  
  const toggleLanguage = () => {
    const newLang = i18n.language === 'vi' ? 'en' : 'vi';
    i18n.changeLanguage(newLang);
  };

  return (
    <div className="relative w-full h-screen bg-black overflow-hidden">
      {/* Canvas */}
      <Canvas
        camera={{ position: [0, 0, 6], fov: 50 }}
        gl={{ antialias: true }}
        className="w-full h-full"
      >
        <color attach="background" args={['#000000']} />
        
        {/* Lighting changes per scene will be handled in components */}
        <ambientLight intensity={0.2} />
        
        <Suspense fallback={null}>
          <Experience />
          <Environment preset="night" background={false} />
        </Suspense>
        
        <ContactShadows position={[0, -1, 0]} opacity={0.3} />
      </Canvas>
      
      {/* Language Switcher */}
      <button
        onClick={toggleLanguage}
        className="fixed top-6 right-6 z-50 flex items-center gap-2 bg-black/50 backdrop-blur-md hover:bg-black/70 px-4 py-2 rounded-full font-medium transition border border-white/20 text-white"
      >
        <Globe className="w-4 h-4" />
        {i18n.language === 'vi' ? 'EN' : 'VI'}
      </button>
      
      {/* Scroll Indicator */}
      <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 text-white/60 text-sm">
        Scroll to experience
      </div>
    </div>
  );
};

export default AppStory;
