import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { Environment, ContactShadows, OrbitControls } from '@react-three/drei';
import { VRMModel } from '@emlinh/vrm-character-controller';
import type { VRMModelRef } from '@emlinh/vrm-character-controller';

interface CharacterCanvasProps {
  vrmUrl: string;
  vrmRef: React.RefObject<VRMModelRef>;
  setIsLoading: (loading: boolean) => void;
  setGreetingCompleted: (completed: boolean) => void;
}

const CharacterCanvas: React.FC<CharacterCanvasProps> = ({
  vrmUrl,
  vrmRef,
  setIsLoading,
  setGreetingCompleted,
}) => {
  return (
    <div className="fixed right-0 top-0 w-1/2 h-screen z-10">
      <Canvas
        camera={{ position: [0, 0.8, 2.5], fov: 35 }}
        gl={{ antialias: true, alpha: true }}
        className="w-full h-full"
      >
        {/* Transparent background to show gradient */}
        <color attach="background" args={['transparent']} />
        
        <SceneLighting />
        
        <CharacterModel 
          vrmUrl={vrmUrl}
          vrmRef={vrmRef}
          onLoadComplete={() => {
            setTimeout(() => {
              setIsLoading(false);
            }, 500);
          }}
          onReadyToTalk={() => {
            setGreetingCompleted(true);
          }}
        />
        
        <Ground />
        
        <CameraControls />
      </Canvas>
    </div>
  );
};

// Component for lighting
const SceneLighting: React.FC = () => {
  return (
    <>
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
    </>
  );
};

// Component for VRM model
interface CharacterModelProps {
  vrmUrl: string;
  vrmRef: React.RefObject<VRMModelRef>;
  onLoadComplete: () => void;
  onReadyToTalk: () => void;
}

const CharacterModel: React.FC<CharacterModelProps> = ({
  vrmUrl,
  vrmRef,
  onLoadComplete,
  onReadyToTalk,
}) => {
  return (
    <Suspense fallback={null}>
      <VRMModel
        ref={vrmRef}
        vrmUrl={vrmUrl}
        positions={[0, -1.2, 0]}
        onLoadComplete={onLoadComplete}
        onReadyToTalk={onReadyToTalk}
      />
      <Environment preset="city" background={false} />
    </Suspense>
  );
};

// Component for ground/shadows
const Ground: React.FC = () => {
  return (
    <ContactShadows 
      position={[0, 0, 0]} 
      opacity={0.4} 
      scale={10} 
      blur={2} 
      far={4} 
    />
  );
};

// Component for camera controls
const CameraControls: React.FC = () => {
  return (
    <OrbitControls 
      enablePan={false}
      enableZoom={false}
      minPolarAngle={Math.PI / 4}
      maxPolarAngle={Math.PI / 2.5}
    />
  );
};

export default CharacterCanvas;
