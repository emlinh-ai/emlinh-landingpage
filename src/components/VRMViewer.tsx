import React, { useRef, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment } from '@react-three/drei';
import { VRMViewer } from '@emlinh/vrm-character-controller';

interface VRMViewerComponentProps {
  vrmUrl?: string;
  width?: number;
  height?: number;
  enableControls?: boolean;
  enableEnvironment?: boolean;
}

export const VRMViewerComponent: React.FC<VRMViewerComponentProps> = ({
  vrmUrl,
  width = 800,
  height = 600,
  enableControls = true,
  enableEnvironment = true,
}) => {
  const [currentVrmUrl, setCurrentVrmUrl] = useState<string>(vrmUrl || '');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && file.name.endsWith('.vrm')) {
      const url = URL.createObjectURL(file);
      setCurrentVrmUrl(url);
    }
  };

  const handleUrlChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentVrmUrl(event.target.value);
  };

  return (
    <div className="vrm-viewer-container">
      <div className="vrm-controls mb-4">
        <div className="flex flex-col gap-4">
          <div>
            <label className="block text-sm font-medium mb-2">
              Upload VRM File:
            </label>
            <input
              ref={fileInputRef}
              type="file"
              accept=".vrm"
              onChange={handleFileUpload}
              className="block w-full text-sm text-gray-500
                file:mr-4 file:py-2 file:px-4
                file:rounded-full file:border-0
                file:text-sm file:font-semibold
                file:bg-blue-50 file:text-blue-700
                hover:file:bg-blue-100"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-2">
              Or enter VRM URL:
            </label>
            <input
              type="text"
              value={currentVrmUrl}
              onChange={handleUrlChange}
              placeholder="https://example.com/model.vrm"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
      </div>

      <div 
        className="vrm-canvas border border-gray-300 rounded-lg overflow-hidden"
        style={{ width, height }}
      >
        <Canvas
          camera={{ position: [0, 1.5, 3], fov: 50 }}
          shadows
        >
          <ambientLight intensity={0.5} />
          <directionalLight
            position={[5, 5, 5]}
            intensity={1}
            castShadow
            shadow-mapSize-width={2048}
            shadow-mapSize-height={2048}
          />
          
          {enableEnvironment && (
            <Environment preset="sunset" background />
          )}
          
          {currentVrmUrl && (
            <VRMViewer
              vrmUrl={currentVrmUrl.startsWith('blob:') || currentVrmUrl.startsWith('http') 
                ? currentVrmUrl 
                : currentVrmUrl.replace(/^.*\//, '') // Extract filename for local files
              }
              position={[0, 1.25, 0]}
              lightIntensity={1}
            />
          )}
          
          {enableControls && (
            <OrbitControls
              enablePan={true}
              enableZoom={true}
              enableRotate={true}
              minDistance={1}
              maxDistance={10}
              maxPolarAngle={Math.PI / 2}
            />
          )}
        </Canvas>
      </div>

      {!currentVrmUrl && (
        <div className="text-center py-8 text-gray-500">
          Please upload a VRM file or enter a VRM URL to display the 3D model
        </div>
      )}
    </div>
  );
};

export default VRMViewerComponent;
