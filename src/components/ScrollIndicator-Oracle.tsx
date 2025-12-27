import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

const ScrollIndicatorOracle: React.FC = () => {
  const indicatorRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const arrowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!indicatorRef.current || !textRef.current || !arrowRef.current) return;

    // Initial animation
    gsap.fromTo(indicatorRef.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 1, delay: 2 }
    );

    // Continuous bounce animation for arrow
    gsap.to(arrowRef.current, {
      y: 8,
      duration: 1.5,
      repeat: -1,
      yoyo: true,
      ease: "power1.inOut"
    });

    // Fade out on scroll
    const handleScroll = () => {
      const scrollY = window.scrollY;
      if (scrollY > 100) {
        gsap.to(indicatorRef.current, {
          opacity: 0,
          duration: 0.3
        });
      } else {
        gsap.to(indicatorRef.current, {
          opacity: 1,
          duration: 0.3
        });
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToNext = () => {
    const nextSection = document.querySelector('.scene-1');
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div
      ref={indicatorRef}
      className="fixed bottom-8 left-1/2 transform -translate-x-1/2 z-50 cursor-pointer"
      onClick={scrollToNext}
    >
      <div className="flex flex-col items-center gap-2 text-white/60 hover:text-white transition-colors">
        <div ref={textRef} className="text-sm font-medium tracking-wider">
          SCROLL TO AWAKEN
        </div>
        <div ref={arrowRef} className="w-6 h-10 flex justify-center">
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M12 5L12 19M12 19L6 13M12 19L18 13"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </div>
    </div>
  );
};

export default ScrollIndicatorOracle;
