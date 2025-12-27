import { forwardRef, useImperativeHandle, useState, useEffect } from 'react';
import { useGLTF } from '@react-three/drei';
import { VRMLoaderPlugin } from '@pixiv/three-vrm';
import { VRMAnimationLoaderPlugin } from '@pixiv/three-vrm-animation';
import * as THREE from 'three';
import type { VRMModelRef } from '@emlinh/vrm-character-controller';

interface CustomVRMModelProps {
  vrmUrl: string;
  positions?: [number, number, number];
  onLoadComplete?: () => void;
}

const CustomVRMModelSimple = forwardRef<VRMModelRef, CustomVRMModelProps>(
  (
    {
      vrmUrl,
      positions = [0, 0, 0],
      onLoadComplete,
    },
    ref
  ) => {
    const [isModelReady, setIsModelReady] = useState(false);
    const [loadError, setLoadError] = useState<string | null>(null);

    let scene: THREE.Object3D | undefined;
    let userData: { vrm?: unknown } = {};
    let hasError = false;

    try {
      const gltf = useGLTF(
        vrmUrl,
        'https://www.gstatic.com/draco/versioned/decoders/1.5.6/',
        undefined,
        (loader: { register: (parser: unknown) => unknown }) => {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          loader.register((parser: unknown) => new VRMLoaderPlugin(parser as any));
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          loader.register((parser: unknown) => new VRMAnimationLoaderPlugin(parser as any));
        }
      );
      scene = gltf.scene;
      userData = gltf.userData;
    } catch (error) {
      console.error('VRM Load Error:', error);
      hasError = true;
      setLoadError(`Failed to load VRM: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
    
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const vrm = userData?.vrm as any;

    useEffect(() => {
      if (hasError) {
        return;
      }
      
      if (vrm && !isModelReady) {
        setIsModelReady(true);
        setLoadError(null);
        if (onLoadComplete) {
          onLoadComplete();
        }
      }
    }, [vrm, isModelReady, onLoadComplete, hasError]);

    useImperativeHandle(ref, () => ({
      startTalking: () => {},
      stopTalking: () => {},
      isAnimating: false,
      currentExpression: 'neutral',
      playAnimationById: async () => {},
      getLoadedAnimation: () => null,
      isModelReady,
      preloadError: null,
      isCriticalAnimationReady: false,
    }));

    return (
      <group position={positions}>
        {loadError || !scene ? (
          <mesh>
            <boxGeometry args={[1, 2, 1]} />
            <meshStandardMaterial color={"#ef4444"} wireframe />
          </mesh>
        ) : (
          <primitive object={scene} />
        )}
      </group>
    );
  }
);

CustomVRMModelSimple.displayName = 'CustomVRMModelSimple';

export default CustomVRMModelSimple;
