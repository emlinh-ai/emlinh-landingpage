import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
import type { VRMModelRef } from '@emlinh/vrm-character-controller';

// Register GSAP plugins
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);
}

interface UseSectionScrollProps {
  totalSections: number;
  vrmRef: React.RefObject<VRMModelRef>;
  greetingCompleted: boolean;
  playScrollSound: () => void;
}

interface UseSectionScrollReturn {
  currentSection: number;
  scrollToSection: (sectionIndex: number) => void;
  goToNextSection: () => void;
  goToPrevSection: () => void;
}

export const useSectionScroll = ({
  totalSections,
  vrmRef: _vrmRef,
  greetingCompleted: _greetingCompleted,
  playScrollSound,
}: UseSectionScrollProps): UseSectionScrollReturn => {
  const [currentSection, setCurrentSection] = useState(0);
  const sectionsRef = useRef<HTMLElement[]>([]);
  const isScrollingRef = useRef(false);

  // Scroll to specific section with full screen snap
  const scrollToSection = (sectionIndex: number) => {
    if (sectionIndex < 0 || sectionIndex >= totalSections || isScrollingRef.current) {
      return;
    }

    isScrollingRef.current = true;
    playScrollSound();
    
    const targetY = sectionIndex * window.innerHeight;
    
    gsap.to(window, {
      duration: 1,
      scrollTo: { y: targetY, offsetY: 0 },
      ease: 'power2.inOut',
      onComplete: () => {
        isScrollingRef.current = false;
        setCurrentSection(sectionIndex);
      }
    });
  };

  // Go to next section
  const goToNextSection = () => {
    scrollToSection(currentSection + 1);
  };

  // Go to previous section
  const goToPrevSection = () => {
    scrollToSection(currentSection - 1);
  };

  // Setup scroll triggers for full screen sections
  useEffect(() => {
    // Get all sections
    sectionsRef.current = Array.from(document.querySelectorAll('section')) as HTMLElement[];
    
    // Disable normal scroll
    document.body.style.overflow = 'hidden';
    
    // Create ScrollTrigger for each section based on scroll position
    const triggers = sectionsRef.current.map((section, index) => {
      return ScrollTrigger.create({
        trigger: section,
        start: 'top top',
        end: 'bottom top',
        scrub: true,
        onUpdate: (self) => {
          // Update current section based on scroll progress
          const progress = self.progress;
          if (progress > 0.5) {
            setCurrentSection(Math.min(index + 1, totalSections - 1));
          } else {
            setCurrentSection(index);
          }
        }
      });
    });

    // Cleanup
    return () => {
      triggers.forEach(trigger => trigger.kill());
      document.body.style.overflow = '';
    };
  }, [totalSections]);

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case 'ArrowDown':
        case 'PageDown':
        case ' ':
          e.preventDefault();
          goToNextSection();
          break;
        case 'ArrowUp':
        case 'PageUp':
          e.preventDefault();
          goToPrevSection();
          break;
        case 'Home':
          e.preventDefault();
          scrollToSection(0);
          break;
        case 'End':
          e.preventDefault();
          scrollToSection(totalSections - 1);
          break;
        // Number keys for direct navigation
        case '1':
        case '2':
        case '3':
        case '4':
          e.preventDefault();
          const sectionIndex = parseInt(e.key) - 1;
          if (sectionIndex < totalSections) {
            scrollToSection(sectionIndex);
          }
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentSection, totalSections]);

  // Handle wheel/touch events for snap scrolling
  useEffect(() => {
    let wheelTimeout: number;
    let touchStartY = 0;
    let isScrolling = false;

    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      
      if (isScrolling || isScrollingRef.current) return;
      
      clearTimeout(wheelTimeout);
      wheelTimeout = setTimeout(() => {
        if (Math.abs(e.deltaY) > 10) {
          isScrolling = true;
          if (e.deltaY > 0) {
            goToNextSection();
          } else {
            goToPrevSection();
          }
          setTimeout(() => {
            isScrolling = false;
          }, 1000);
        }
      }, 50);
    };

    const handleTouchStart = (e: TouchEvent) => {
      touchStartY = e.touches[0].clientY;
    };

    const handleTouchEnd = (e: TouchEvent) => {
      if (isScrolling || isScrollingRef.current) return;
      
      const touchEndY = e.changedTouches[0].clientY;
      const diff = touchStartY - touchEndY;
      
      if (Math.abs(diff) > 50) {
        isScrolling = true;
        if (diff > 0) {
          goToNextSection();
        } else {
          goToPrevSection();
        }
        setTimeout(() => {
          isScrolling = false;
        }, 1000);
      }
    };

    window.addEventListener('wheel', handleWheel, { passive: false });
    window.addEventListener('touchstart', handleTouchStart, { passive: false });
    window.addEventListener('touchend', handleTouchEnd, { passive: false });

    return () => {
      clearTimeout(wheelTimeout);
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchend', handleTouchEnd);
    };
  }, [currentSection, totalSections]);

  return {
    currentSection,
    scrollToSection,
    goToNextSection,
    goToPrevSection,
  };
};
