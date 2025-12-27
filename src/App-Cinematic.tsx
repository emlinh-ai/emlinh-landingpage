import React, { useEffect, useState, useRef, useCallback } from 'react';
import { registerAnimation } from '@emlinh/vrm-character-controller';
import { useTranslation } from 'react-i18next';
import type { VRMModelRef } from '@emlinh/vrm-character-controller';
import Navigation from './components/Navigation';
import CharacterCanvas from './components/3D/CharacterCanvas';
import LoadingOverlay from './components/LoadingOverlay';
import IntroductionSection from './components/sections/IntroductionSection';
import SkillsSection from './components/sections/SkillsSection';
import FortuneSection from './components/sections/FortuneSection';
import ContactSection from './components/sections/ContactSection';
import FooterSection from './components/sections/FooterSection';
import ScrollIndicator from './components/UI/ScrollIndicator';
import SectionIndicator from './components/UI/SectionIndicator';
import CustomCursor from './components/UI/CustomCursor';
import { useSectionScroll } from './hooks/useSectionScroll';
import { useAudioManager } from './hooks/useAudioManager';
import { useDebouncedCallback } from './hooks/useDebounce';

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
  id: 'dance',
  name: 'Arms Hip Hop Dance',
  type: 'fbx',
  path: '/animations/fbx/Arms Hip Hop Dance.fbx',
  category: 'gesture',
  preload: true,
});

registerAnimation({
  id: 'greeting',
  name: 'VRMA_02',
  type: 'vrma',
  path: '/animations/vrma/VRMA_02.vrma',
  category: 'gesture',
  preload: true,
  startFrame: 50
});

// Main App
const AppCinematic: React.FC = () => {
  const { i18n } = useTranslation();
  const [isLoading, setIsLoading] = useState(true);
  const [greetingCompleted, setGreetingCompleted] = useState(false);
  const vrmRef = useRef<VRMModelRef | null>(null);
  const vrmUrl = 'emlinh-v2.vrm';
  
  // Audio manager
  const {
    isAudioEnabled,
    isFirstInteraction,
    isDanceMode,
    volume,
    initAudio,
    playScrollSound,
    handleFirstInteraction,
    toggleAudio,
    muteAudio,
    updateVolume,
  } = useAudioManager();
  
  // Canvas click handler
  const handleCanvasClick = useCallback(() => {
    if (isFirstInteraction) {
      console.log('Canvas directly clicked, playing music');
      handleFirstInteraction();
    }
  }, [isFirstInteraction, handleFirstInteraction]);

  // Debounced canvas click handler (500ms)
  const debouncedCanvasClick = useDebouncedCallback(handleCanvasClick, 500);

  // Canvas double click handler
  const handleCanvasDoubleClick = useCallback(() => {
    if (!isFirstInteraction && isAudioEnabled) {
      console.log('Canvas double clicked, muting music');
      muteAudio();
    }
  }, [isFirstInteraction, isAudioEnabled, muteAudio]);

  // Initialize audio on mount
  useEffect(() => {
    initAudio();
  }, [initAudio]);
  
  // Global click handler for first interaction
  const handleGlobalClick = useCallback((e: MouseEvent) => {
    // Only play music if click is in canvas area (right half of screen)
    if (e.clientX > window.innerWidth / 2) {
      console.log('Canvas clicked, playing music');
      handleFirstInteraction();
    }
  }, [handleFirstInteraction]);

  // Debounced global click handler (500ms)
  const debouncedGlobalClick = useDebouncedCallback(handleGlobalClick, 500);

  useEffect(() => {
    // Only add listener if it's first interaction
    if (isFirstInteraction) {
      document.addEventListener('click', debouncedGlobalClick, { once: true });
      
      return () => {
        document.removeEventListener('click', debouncedGlobalClick);
      };
    }
  }, [isFirstInteraction, debouncedGlobalClick]);
  
  // Use custom scroll hook
  const { currentSection, scrollToSection } = useSectionScroll({
    totalSections: 4,
    vrmRef: vrmRef as React.RefObject<VRMModelRef>,
    greetingCompleted,
    playScrollSound,
  });
  
  // Handle VRM animation based on dance mode
  useEffect(() => {
    if (vrmRef.current && vrmRef.current.playAnimationById && greetingCompleted) {
      if (isDanceMode) {
        // Play dance animation when in dance mode
        console.log('Playing dance animation');
        vrmRef.current.playAnimationById('dance', true);
      } else {
        // Play idle animation when not in dance mode
        console.log('Playing idle animation');
        vrmRef.current.playAnimationById('idle', true);
      }
    }
  }, [isDanceMode, greetingCompleted]);

  // Handle VRM load
  useEffect(() => {
    // VRMModel component already handles greeting animation internally
    // We just need to handle the loading state
  }, [isLoading]);

  const toggleLanguage = () => {
    const newLang = i18n.language === 'vi' ? 'en' : 'vi';
    i18n.changeLanguage(newLang);
  };

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <LoadingOverlay isLoading={isLoading} />
      
      <Navigation 
        onLanguageToggle={toggleLanguage}
        currentLanguage={i18n.language}
        isAudioEnabled={isAudioEnabled}
        onAudioToggle={toggleAudio}
        volume={volume}
        onVolumeChange={updateVolume}
      />

      <CharacterCanvas 
        vrmUrl={vrmUrl}
        vrmRef={vrmRef as React.RefObject<VRMModelRef>}
        setIsLoading={setIsLoading}
        setGreetingCompleted={setGreetingCompleted}
        onCanvasClick={debouncedCanvasClick}
        onCanvasDoubleClick={handleCanvasDoubleClick}
      />

      {/* Scrollable Content - Left Side */}
      <div className="relative w-1/2 min-h-screen">
        <IntroductionSection />
        <SkillsSection />
        <FortuneSection />
        <ContactSection />
      </div>

      <ScrollIndicator />
      
      <SectionIndicator 
        currentSection={currentSection}
        totalSections={4}
        onSectionClick={scrollToSection}
      />
      
      <CustomCursor 
        isAudioEnabled={isAudioEnabled}
        isFirstInteraction={isFirstInteraction}
      />
      
      <FooterSection />
    </div>
  );
};

export default AppCinematic;
