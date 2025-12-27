import React, { useEffect, useRef, useCallback } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { gsap } from 'gsap';
import type { VRMModelRef } from '@emlinh/vrm-character-controller';

interface SceneControllerProps {
  scene: number;
  vrmRef: React.RefObject<VRMModelRef>;
}

const SceneController: React.FC<SceneControllerProps> = ({ scene, vrmRef }) => {
  const { camera } = useThree();
  const animationStateRef = useRef({
    currentScene: -1,
    isTransitioning: false,
    animations: {
      0: 'dormant',      // Sleep/dormant state
      1: 'awakening',    // Head up, eyes open
      2: 'intelligence', // Hand gestures, tech mode
      3: 'mystic'        // Oracle pose, mystical
    }
  });

  // Scene 0: Dormant - Head down, eyes closed, standing still
  const applyDormantState = useCallback(() => {
    if (!vrmRef.current) return;
    
    const vrm = vrmRef.current;
    
    // Play idle animation but with custom pose
    vrm.playAnimationById('standingIdle', true, 1.0);
    
    // Set expression to neutral/closed
    // Note: Using currentExpression read-only property
    // Expression setting would need to be implemented in VRM controller
  }, [vrmRef]);

  // Scene 1: Awakening - Head up, eyes open, slight smile
  const applyAwakeningState = useCallback(() => {
    if (!vrmRef.current) return;
    
    const vrm = vrmRef.current;
    
    // Transition to more alert idle
    vrm.playAnimationById('standingIdle', true, 1.5);
    
    // Set happy/neutral expression
    // Note: Expression setting would need to be implemented in VRM controller
  }, [vrmRef]);

  // Scene 2: Intelligence - Hand gestures, interactive pose
  const applyIntelligenceState = useCallback(() => {
    if (!vrmRef.current) return;
    
    const vrm = vrmRef.current;
    
    // Try to load a talking/gesture animation first, fallback to idle
    const animations = ['talking', 'gesture', 'standingIdle'];
    const tryLoadAnimation = async (index: number) => {
      if (index >= animations.length) return;
      
      try {
        await vrm.playAnimationById(animations[index], true, 1.0);
      } catch {
        console.log(`Animation ${animations[index]} not available, trying next...`);
        tryLoadAnimation(index + 1);
      }
    };
    
    tryLoadAnimation(0);
    
    // Set focused/intelligent expression
    // Note: Expression setting would need to be implemented in VRM controller
  }, [vrmRef]);

  // Scene 3: Mystic - Oracle pose, hands forward, mystical
  const applyMysticState = useCallback(() => {
    if (!vrmRef.current) return;
    
    const vrm = vrmRef.current;
    
    // Play mystical pose animation
    vrm.playAnimationById('standingIdle', true, 1.5);
    
    // Set mystical expression
    // Note: Expression setting would need to be implemented in VRM controller
  }, [vrmRef]);

  // Camera animations for each scene
  const animateCamera = useCallback((targetScene: number) => {
    const cameraPositions = {
      0: { position: [0, 0, 6], fov: 50 },
      1: { position: [0, 1.4, 3.5], fov: 50 },
      2: { position: [2, 1.4, 3.5], fov: 50 },
      3: { position: [0, 0.5, 7], fov: 60 }
    };

    const target = cameraPositions[targetScene as keyof typeof cameraPositions];
    if (!target) return;

    gsap.to(camera.position, {
      x: target.position[0],
      y: target.position[1],
      z: target.position[2],
      duration: 2.0,
      ease: "power2.inOut"
    });

    gsap.to(camera, {
      fov: target.fov,
      duration: 2.0,
      ease: "power2.inOut",
      onUpdate: () => {
        camera.updateProjectionMatrix();
      }
    });
  }, [camera]);

  useEffect(() => {
    const state = animationStateRef.current;
    
    // Only trigger when scene actually changes
    if (state.currentScene !== scene && !state.isTransitioning) {
      state.isTransitioning = true;
      state.currentScene = scene;

      // Apply VRM animations based on scene
      setTimeout(() => {
        switch (scene) {
          case 0:
            applyDormantState();
            break;
          case 1:
            applyAwakeningState();
            break;
          case 2:
            applyIntelligenceState();
            break;
          case 3:
            applyMysticState();
            break;
        }
        state.isTransitioning = false;
      }, 300);

      // Animate camera
      animateCamera(scene);
    }
  }, [scene, applyDormantState, applyAwakeningState, applyIntelligenceState, applyMysticState, animateCamera]);

  // Continuous scene-specific updates
  useFrame(() => {
    if (!vrmRef.current) return;

    // Scene-specific continuous effects
    switch (scene) {
      case 0:
        // Dormant: Very subtle breathing
        break;
      case 1:
        // Awakening: Gentle head movement
        break;
      case 2:
        // Intelligence: Occasional hand gestures
        break;
      case 3:
        // Mystic: Floating/pulsing effect
        break;
    }
  });

  return null; // This component doesn't render anything
};

export default SceneController;
