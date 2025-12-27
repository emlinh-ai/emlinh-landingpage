/* eslint-disable react-hooks/purity */
/* eslint-disable react-hooks/refs */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/immutability */
import React, { Suspense, useRef, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { ScrollControls, Environment, ContactShadows, Text, Float } from '@react-three/drei';
import { VRMModel } from '@emlinh/vrm-character-controller';
import { registerAnimation } from '@emlinh/vrm-character-controller';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
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

// VRM Proxy for GSAP animation
class VRMProxy {
  private vrmRef: React.RefObject<VRMModelRef | null>;
  public neckRotationX = 0.5;
  public blinkValue = 1;
  public happyValue = 0;
  public handRaise = 0;
  public fingerWiggle = 0;
  public mysteriousValue = 0;

  constructor(vrmRef: React.RefObject<VRMModelRef | null>) {
    this.vrmRef = vrmRef;
  }

  updateValues() {
    if (!this.vrmRef.current) return;
    
    // Update VRM bones and expressions
    // This would need to be implemented based on VRM 3.0 API
    // For now, we'll use the proxy values in GSAP timeline
  }
}

// Scene 0: Dormant
function Scene0({ vrmProxy }: { vrmProxy: VRMProxy }) {
  const textRef = useRef<THREE.Mesh>(null);
  
  useEffect(() => {
    // Set initial dormant state
    vrmProxy.neckRotationX = 0.5;
    vrmProxy.blinkValue = 1;
    vrmProxy.happyValue = 0;
    vrmProxy.updateValues();
  }, [vrmProxy]);

  return (
    <group>
      {/* VRM Model */}
      <VRMModel
        vrmUrl="emlinh-v2.vrm"
        positions={[0, -1, 0]}
      />
      
      {/* INITIALIZING Text */}
      <Text
        ref={textRef}
        position={[0, 2, -2]}
        fontSize={3}
        color="#111111"
        anchorX="center"
        anchorY="middle"
      >
        INITIALIZING
      </Text>
    </group>
  );
}

// Scene 1: Awakening
function Scene1({ vrmProxy }: { vrmProxy: VRMProxy }) {
  const headlineRef = useRef<THREE.Mesh>(null);
  const subtextRef = useRef<THREE.Mesh>(null);

  // TODO: Use vrmProxy for VRM animations when implemented
  void vrmProxy; // Suppress unused warning

  return (
    <group>
      <VRMModel
        vrmUrl="emlinh-v2.vrm"
        positions={[0, -1, 0]}
      />
      
      {/* I AM LINH */}
      <Text
        ref={headlineRef}
        position={[-4, 1, 0]}
        fontSize={2}
        color="#ffffff"
        anchorX="left"
        anchorY="middle"
      >
        I AM LINH
      </Text>
      
      <Text
        ref={subtextRef}
        position={[-4, 0, 0]}
        fontSize={0.6}
        color="#cccccc"
        anchorX="left"
        anchorY="middle"
        maxWidth={8}
      >
        A digital soul born from algorithms and stars.
      </Text>
    </group>
  );
}

// Scene 2: Intelligence
function Scene2({ vrmProxy }: { vrmProxy: VRMProxy }) {
  const titleRef = useRef<THREE.Mesh>(null);
  const itemsRef = useRef<THREE.Mesh[]>([]);
  
  // TODO: Use vrmProxy for VRM animations when implemented
  void vrmProxy; // Suppress unused warning
  
  // Floating data blocks
  const dataBlocks = Array.from({ length: 15 }, (_, _i) => ({
    position: [
      (Math.random() - 0.5) * 12,
      (Math.random() - 0.5) * 10,
      (Math.random() - 0.5) * 6
    ] as [number, number, number],
    rotation: Math.random() * Math.PI * 2,
    scale: 0.1 + Math.random() * 0.2
  }));

  return (
    <group>
      <VRMModel
        vrmUrl="emlinh-v2.vrm"
        positions={[0, -1, 0]}
      />
      
      <Text
        ref={titleRef}
        position={[-4, 2, 0]}
        fontSize={1.5}
        color="#00ffff"
        anchorX="left"
        anchorY="middle"
      >
        COGNITIVE SPEED
      </Text>
      
      {['Gemini 2.5 Brain', 'Qwen TTS Flash', 'Latency < 200ms'].map((text, i) => (
        <Text
          key={i}
          ref={(el) => { if (el) itemsRef.current[i] = el; }}
          position={[-4, 1 - i * 0.7, 0]}
          fontSize={0.5}
          color="#88ccff"
          anchorX="left"
          anchorY="middle"
        >
          • {text}
        </Text>
      ))}
      
      {/* Floating Data Blocks */}
      {dataBlocks.map((block, i) => (
        <Float
          key={i}
          speed={0.5 + Math.random()}
          rotationIntensity={0.3}
          floatIntensity={0.3}
        >
          <mesh position={block.position} rotation={[0, 0, block.rotation]} scale={block.scale}>
            <boxGeometry args={[1, 1, 1]} />
            <meshStandardMaterial color="#00ffff" opacity={0.2} transparent />
          </mesh>
        </Float>
      ))}
    </group>
  );
}

// Scene 3: Oracle
function Scene3({ vrmProxy }: { vrmProxy: VRMProxy }) {
  const headlineRef = useRef<THREE.Mesh>(null);
  const bodyRef = useRef<THREE.Mesh>(null);
  const zodiacRef = useRef<THREE.Group>(null);
  
  // TODO: Use vrmProxy for VRM animations when implemented
  void vrmProxy; // Suppress unused warning

  // Create zodiac circle
  const createZodiacRing = () => {
    const points = [];
    const segments = 64;
    for (let i = 0; i <= segments; i++) {
      const angle = (i / segments) * Math.PI * 2;
      points.push(new THREE.Vector3(
        Math.cos(angle) * 3,
        Math.sin(angle) * 3,
        0
      ));
    }
    return new THREE.BufferGeometry().setFromPoints(points);
  };

  return (
    <group>
      <VRMModel
        vrmUrl="emlinh-v2.vrm"
        positions={[0, -1, 0]}
      />
      
      <Text
        ref={headlineRef}
        position={[-4, 2, 0]}
        fontSize={1.8}
        color="#ffd700"
        anchorX="left"
        anchorY="middle"
      >
        DESTINY DECODED
      </Text>
      
      <Text
        ref={bodyRef}
        position={[-4, 0.5, 0]}
        fontSize={0.5}
        color="#ffcc88"
        anchorX="left"
        anchorY="middle"
        maxWidth={8}
      >
        Luận giải 900+ lá số Tử Vi mẫu.\nGiải mã vận mệnh thông qua trí tuệ nhân tạo.
      </Text>
      
      {/* Zodiac Circle */}
      <group ref={zodiacRef} position={[0, 0, -2]}>
        <line>
          <bufferGeometry attach="geometry" {...createZodiacRing()} />
          <lineBasicMaterial color="#ffd700" opacity={0.6} transparent />
        </line>
        
        {/* Zodiac symbols */}
        {['♈', '♉', '♊', '♋', '♌', '♍', '♎', '♏', '♐', '♑', '♒', '♓'].map((sign, i) => {
          const angle = (i / 12) * Math.PI * 2;
          return (
            <Text
              key={i}
              position={[
                Math.cos(angle) * 3,
                Math.sin(angle) * 3,
                0
              ]}
              fontSize={0.4}
              color="#ffffff"
              anchorX="center"
              anchorY="middle"
            >
              {sign}
            </Text>
          );
        })}
      </group>
    </group>
  );
}

// Main Experience with GSAP
function Experience() {
  const vrmRef = useRef<VRMModelRef | null>(null);
  const vrmProxy = useRef(new VRMProxy(vrmRef));
  const scene0Ref = useRef<THREE.Group>(null);
  const scene1Ref = useRef<THREE.Group>(null);
  const scene2Ref = useRef<THREE.Group>(null);
  const scene3Ref = useRef<THREE.Group>(null);
  
  // GSAP Timeline
  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: "body",
        start: "top top",
        end: "bottom bottom",
        scrub: 1,
      }
    });

    // Scene 0: Dormant state
    tl.to(vrmProxy.current, {
      neckRotationX: 0.5,
      blinkValue: 1,
      duration: 0.1,
    }, 0);

    // Scene 1: Awakening (0% -> 30%)
    if (scene0Ref.current) {
      tl.to(scene0Ref.current.position, { z: -3, duration: 0.3 }, 0);
    }
    if (scene1Ref.current) {
      tl.to(scene1Ref.current.position, { z: 0, duration: 0.3 }, 0);
    }
    
    // Camera animation
    tl.to("camera", {
      z: 3.5,
      y: 1.4,
      duration: 0.3,
    }, 0);
    
    // VRM animations
    tl.to(vrmProxy.current, {
      neckRotationX: 0,
      blinkValue: 0,
      happyValue: 0.4,
      duration: 0.3,
      onUpdate: () => vrmProxy.current.updateValues(),
    }, 0);
    
    // Text animations
    tl.to(".scene0-text", {
      scale: 3,
      opacity: 0,
      duration: 0.3,
    }, 0);
    
    tl.from(".scene1-headline", {
      x: -100,
      opacity: 0,
      duration: 0.2,
    }, 0.1);
    
    tl.from(".scene1-subtext", {
      y: 50,
      opacity: 0,
      duration: 0.2,
    }, 0.2);

    // Scene 2: Intelligence (30% -> 65%)
    if (scene1Ref.current) {
      tl.to(scene1Ref.current.position, { z: -3, duration: 0.35 }, 0.3);
    }
    if (scene2Ref.current) {
      tl.to(scene2Ref.current.position, { z: 0, duration: 0.35 }, 0.3);
    }
    
    // Camera orbit
    tl.to("camera", {
      x: 2,
      z: 5,
      duration: 0.35,
    }, 0.3);
    
    // VRM hand gesture
    tl.to(vrmProxy.current, {
      handRaise: 1,
      fingerWiggle: 1,
      duration: 0.35,
      onUpdate: () => vrmProxy.current.updateValues(),
    }, 0.3);
    
    // Tech list animation
    tl.from(".scene2-item", {
      x: -50,
      opacity: 0,
      stagger: 0.1,
      duration: 0.2,
    }, 0.4);

    // Scene 3: Oracle (65% -> 100%)
    if (scene2Ref.current) {
      tl.to(scene2Ref.current.position, { z: -3, duration: 0.35 }, 0.65);
    }
    if (scene3Ref.current) {
      tl.to(scene3Ref.current.position, { z: 0, duration: 0.35 }, 0.65);
    }
    
    // Camera pull back
    tl.to("camera", {
      x: 0,
      y: 0.5,
      z: 7,
      duration: 0.35,
    }, 0.65);
    
    // VRM mystical pose
    tl.to(vrmProxy.current, {
      handRaise: 0,
      mysteriousValue: 1,
      duration: 0.35,
      onUpdate: () => vrmProxy.current.updateValues(),
    }, 0.65);
    
    // Zodiac circle
    tl.from(".zodiac-circle", {
      opacity: 0,
      rotation: Math.PI * 2,
      duration: 0.5,
    }, 0.7);
    
    // Final text
    tl.from(".scene3-headline", {
      scale: 0.5,
      opacity: 0,
      duration: 0.3,
    }, 0.75);

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <ScrollControls pages={3} damping={0.2}>
      <group>
        {/* Scene 0 */}
        <group ref={scene0Ref} position={[0, 0, 0]}>
          <Scene0 vrmProxy={vrmProxy.current} />
        </group>
        
        {/* Scene 1 */}
        <group ref={scene1Ref} position={[0, 0, 3]}>
          <Scene1 vrmProxy={vrmProxy.current} />
        </group>
        
        {/* Scene 2 */}
        <group ref={scene2Ref} position={[0, 0, 6]}>
          <Scene2 vrmProxy={vrmProxy.current} />
        </group>
        
        {/* Scene 3 */}
        <group ref={scene3Ref} position={[0, 0, 9]}>
          <Scene3 vrmProxy={vrmProxy.current} />
        </group>
      </group>
    </ScrollControls>
  );
}

// Main App
const AppStoryFixed: React.FC = () => {
  const { i18n } = useTranslation();
  
  const toggleLanguage = () => {
    const newLang = i18n.language === 'vi' ? 'en' : 'vi';
    i18n.changeLanguage(newLang);
  };

  return (
    <div className="relative w-full h-screen bg-black overflow-hidden">
      <Canvas
        camera={{ position: [0, 0, 6], fov: 50 }}
        gl={{ antialias: true }}
        className="w-full h-full"
      >
        <color attach="background" args={['#000000']} />
        
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
      <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 text-white/60 text-sm animate-pulse">
        ↓ Scroll to awaken the oracle ↓
      </div>
    </div>
  );
};

export default AppStoryFixed;
