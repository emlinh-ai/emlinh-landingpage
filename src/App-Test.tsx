import React, { Suspense, useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import CustomVRMModel from './components/CustomVRMModel';
import type { VRMModelRef } from '@emlinh/vrm-character-controller';

const SimpleApp: React.FC = () => {
  const sceneRef = useRef<VRMModelRef | null>(null);
  const vrmUrl = '/models/emlinh-vroid-1.1.vrm';

  return (
    <div className="min-h-screen bg-black">
      <div className="h-screen flex items-center justify-center">
        <Canvas camera={{ position: [0, 1.4, 3.5], fov: 50 }}>
          <ambientLight intensity={0.5} />
          <directionalLight position={[10, 10, 5]} intensity={1} />
          
          <Suspense fallback={null}>
            <CustomVRMModel
              ref={sceneRef}
              vrmUrl={vrmUrl}
              positions={[0, 1, 0]}
            />
          </Suspense>
        </Canvas>
      </div>
    </div>
  );
};

export default SimpleApp;
