import { forwardRef, useImperativeHandle, useState, useEffect, useMemo } from 'react';
import { useGLTF } from '@react-three/drei';
import { VRMLoaderPlugin } from '@pixiv/three-vrm';
import { VRMAnimationLoaderPlugin } from '@pixiv/three-vrm-animation';
import { useVrmBlink } from '@emlinh/vrm-character-controller';
import { useVrmLookAt } from '@emlinh/vrm-character-controller';
import { useVrmAnimationLoader } from '@emlinh/vrm-character-controller';
import { useVrmAnimationPlayer } from '@emlinh/vrm-character-controller';
import { useVrmExpression } from '@emlinh/vrm-character-controller';
import { useIdleAnimationSelector } from '@emlinh/vrm-character-controller';
import { getAnimationById } from '@emlinh/vrm-character-controller';
import type { VRMModelRef } from '@emlinh/vrm-character-controller';

interface CustomVRMModelProps {
  vrmUrl: string;
  positions?: [number, number, number];
  onLoadComplete?: () => void;
  onAnimationEnd?: () => void;
  onLoopAboutToRepeat?: () => void;
  onReadyToTalk?: () => void;
}

const CustomVRMModel = forwardRef<VRMModelRef, CustomVRMModelProps>(
  (
    {
      vrmUrl,
      positions = [0, 0, 0],
      onLoadComplete,
      onAnimationEnd,
      onLoopAboutToRepeat,
      onReadyToTalk,
    },
    ref
  ) => {
    const [isAnimating, setIsAnimating] = useState(false);
    const [isModelReady, setIsModelReady] = useState(false);
    const [hasPlayedGreeting, setHasPlayedGreeting] = useState(false);
    const [hasTransitionedToIdle, setHasTransitionedToIdle] = useState(false);
    const [currentAnimationCategory, setCurrentAnimationCategory] = useState<
      'idle' | 'talking' | 'gesture' | 'emotion' | null
    >(null);

    const { scene, userData } = useGLTF(
      vrmUrl,
      'https://www.gstatic.com/draco/versioned/decoders/1.5.6/',
      undefined,
      (loader: any) => {
        loader.register((parser: any) => new VRMLoaderPlugin(parser));
        loader.register((parser: any) => new VRMAnimationLoaderPlugin(parser));
      }
    );
    const vrm = userData.vrm;

    const {
      loadAnimation,
      getLoadedAnimation,
      preloadedAnimations,
      preloadError,
      isCriticalAnimationReady,
    } = useVrmAnimationLoader(vrm);

    const { getNextIdleAnimation, setCurrentIdle, getInitialIdle } = useIdleAnimationSelector();

    const defaultClip = useMemo(() => {
      return getLoadedAnimation('standingIdle') || null;
    }, [getLoadedAnimation, preloadedAnimations]);

    const handleAnimationComplete = () => {
      if (!hasTransitionedToIdle) {
        setHasPlayedGreeting(true);
        setHasTransitionedToIdle(true);

        const initialIdleId = getInitialIdle() || 'standingIdle';

        loadAnimation(initialIdleId)
          .then((idleClip) => {
            if (idleClip) {
              playAnimation(idleClip, true);
              setCurrentIdle(initialIdleId);
              setCurrentAnimationCategory('idle');

              if (onReadyToTalk) {
                onReadyToTalk();
              }
            }
          })
          .catch(console.error);
      } else {
        const nextIdleId = getNextIdleAnimation() || getInitialIdle() || 'standingIdle';
        loadAnimation(nextIdleId)
          .then((idleClip) => {
            if (idleClip) {
              playAnimation(idleClip, true, 0.6);
              setCurrentIdle(nextIdleId);
              setCurrentAnimationCategory('idle');
            }
          })
          .catch(console.error);
      }

      if (onAnimationEnd) {
        onAnimationEnd();
      }
    };

    const handleLoopAboutToRepeat = async () => {
      if (currentAnimationCategory === 'idle') {
        const nextIdleId = getNextIdleAnimation();
        if (nextIdleId) {
          const nextIdleClip = await loadAnimation(nextIdleId);
          if (nextIdleClip) {
            playAnimation(nextIdleClip, true, 1.5);
            setCurrentIdle(nextIdleId);
            setCurrentAnimationCategory('idle');
          }
        }
      }

      if (onLoopAboutToRepeat) {
        onLoopAboutToRepeat();
      }
    };

    const { playAnimation } = useVrmAnimationPlayer({
      vrm,
      defaultClip,
      onAnimationComplete: handleAnimationComplete,
      transitionDuration: 0.5,
      onLoopAboutToRepeat: handleLoopAboutToRepeat,
      loopPreventionThreshold: 2.0,
    });

    const { currentExpression, setCurrentExpression } = useVrmExpression({
      vrm,
      emotion: 'neutral',
    });

    useEffect(() => {
      if (vrm && preloadedAnimations.length > 0 && !isModelReady) {
        setIsModelReady(true);
        if (onLoadComplete) {
          onLoadComplete();
        }
      }
    }, [vrm, preloadedAnimations.length, isModelReady, onLoadComplete]);

    useEffect(() => {
      if (!isModelReady || hasPlayedGreeting) return;

      const greetingClip = getLoadedAnimation('greeting');
      if (greetingClip) {
        playAnimation(greetingClip, false);
      } else {
        setHasPlayedGreeting(true);
        setHasTransitionedToIdle(true);
      }
    }, [isModelReady, hasPlayedGreeting]);

    const startTalkingAnimation = () => {
      setIsAnimating(true);
    };

    const stopTalkingAnimation = () => {
      setIsAnimating(false);
      setCurrentExpression('neutral');
    };

    const playAnimationById = async (
      animationId: string,
      shouldLoop?: boolean,
      transitionDuration?: number
    ) => {
      const animDef = getAnimationById(animationId);

      let clip = await loadAnimation(animationId);

      if (!clip && animationId !== 'standingIdle') {
        console.warn(`⚠️ Animation "${animationId}" failed to load, falling back to standingIdle`);
        clip = await loadAnimation('standingIdle');
      }

      if (clip) {
        const isIdleAnimation = animDef?.category === 'idle';
        const loop = shouldLoop !== undefined ? shouldLoop : isIdleAnimation;

        playAnimation(clip, loop, transitionDuration);

        if (animDef?.category) {
          setCurrentAnimationCategory(animDef.category);
        }
      }
    };

    useImperativeHandle(ref, () => ({
      startTalking: startTalkingAnimation,
      stopTalking: stopTalkingAnimation,
      isAnimating,
      currentExpression,
      playAnimationById,
      getLoadedAnimation,
      isModelReady,
      preloadError,
      isCriticalAnimationReady,
    }));

    useVrmBlink(vrm);

    useVrmLookAt(vrm, {
      enabled: true,
      smoothness: 0.1,
    });

    return (
      <group position={positions}>
        <primitive object={scene} />
      </group>
    );
  }
);

CustomVRMModel.displayName = 'CustomVRMModel';

export default CustomVRMModel;
