import React, { useRef, useEffect, useState } from 'react';
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
import ScrollIndicator from './components/UI/ScrollIndicator';
import SectionIndicator from './components/UI/SectionIndicator';
import { useSectionScroll } from './hooks/useSectionScroll';

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
  
  // Define animations for each section
  const animations = ['idle', 'idle', 'idle', 'idle'];
  const totalSections = animations.length;
  
  // Use custom scroll hook
  const { currentSection, scrollToSection } = useSectionScroll({
    totalSections,
    vrmRef: vrmRef as React.RefObject<VRMModelRef>,
    greetingCompleted,
    animations,
  });

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
      />

      <CharacterCanvas 
        vrmUrl={vrmUrl}
        vrmRef={vrmRef as React.RefObject<VRMModelRef>}
        setIsLoading={setIsLoading}
        setGreetingCompleted={setGreetingCompleted}
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
        totalSections={totalSections}
        onSectionClick={scrollToSection}
      />
    </div>
  );
};

export default AppCinematic;
