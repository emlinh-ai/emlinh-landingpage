import { useState, useRef, useCallback } from 'react';

export const useAudioManager = () => {
  const [isAudioEnabled, setIsAudioEnabled] = useState(false);
  const [isFirstInteraction, setIsFirstInteraction] = useState(true);
  const [isDanceMode, setIsDanceMode] = useState(false);
  const [volume, setVolume] = useState(0.4);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const danceMusicRef = useRef<HTMLAudioElement | null>(null);

  // Initialize audio
  const initAudio = useCallback(() => {
    if (!audioRef.current) {
      audioRef.current = new Audio('/audio/little-bell-14606.mp3');
      audioRef.current.volume = 0.3;
      audioRef.current.preload = 'auto';
    }
    if (!danceMusicRef.current) {
      danceMusicRef.current = new Audio('/audio/dance-music.mp3');
      danceMusicRef.current.volume = volume;
      danceMusicRef.current.loop = true;
      danceMusicRef.current.preload = 'auto';
    }
  }, [volume]);

  // Play scroll sound
  const playScrollSound = useCallback(() => {
    if (isAudioEnabled && !isFirstInteraction && audioRef.current) {
      // Clone and play to allow overlapping sounds
      const sound = audioRef.current.cloneNode() as HTMLAudioElement;
      sound.volume = 0.3;
      sound.play().catch(() => {
        // Ignore errors if audio is blocked
      });
    }
  }, [isAudioEnabled, isFirstInteraction]);

  // Handle first interaction
  const handleFirstInteraction = useCallback(() => {
    if (isFirstInteraction) {
      console.log('First interaction detected');
      setIsFirstInteraction(false);
      // Enable audio
      setIsAudioEnabled(true);
      
      // Try to play a silent sound to unlock audio
      const silentAudio = new Audio('data:audio/wav;base64,UklGRigAAABXQVZFZm10IBAAAAAAQAEAAEAfAAAQAQABAAgAZGF0YQAAAAA=');
      silentAudio.play().catch(() => {});
      
      // Play dance music immediately after first interaction
      setTimeout(() => {
        console.log('Attempting to play dance music');
        if (danceMusicRef.current) {
          danceMusicRef.current.play().then(() => {
            console.log('Dance music started successfully');
            setIsDanceMode(true);
          }).catch((error) => {
            console.error('Failed to play dance music:', error);
          });
        }
      }, 100);
      
      // Return a promise that resolves when silent audio is done
      return Promise.resolve();
    }
    return Promise.resolve();
  }, [isFirstInteraction]);

  // Stop dance music
  const stopDanceMusic = useCallback(() => {
    if (danceMusicRef.current && isDanceMode) {
      danceMusicRef.current.pause();
      danceMusicRef.current.currentTime = 0;
      setIsDanceMode(false);
    }
  }, [isDanceMode]);

  // Play dance music
  const playDanceMusic = useCallback(() => {
    if (isAudioEnabled && danceMusicRef.current) {
      // Play dance music
      danceMusicRef.current.play().then(() => {
        setIsDanceMode(true);
      }).catch(() => {
        // Ignore errors if audio is blocked
      });
    }
  }, [isAudioEnabled]);

  // Toggle audio
  const toggleAudio = useCallback(() => {
    const newState = !isAudioEnabled;
    setIsAudioEnabled(newState);
    
    if (newState) {
      // If enabling audio, play dance music
      if (danceMusicRef.current) {
        danceMusicRef.current.play().then(() => {
          setIsDanceMode(true);
        }).catch(() => {
          // Ignore errors if audio is blocked
        });
      }
    } else {
      // If disabling audio, stop dance music
      stopDanceMusic();
    }
  }, [isAudioEnabled, stopDanceMusic]);

  // Update volume
  const updateVolume = useCallback((newVolume: number) => {
    setVolume(newVolume);
    if (danceMusicRef.current) {
      danceMusicRef.current.volume = newVolume;
    }
  }, []);

  return {
    isAudioEnabled,
    isFirstInteraction,
    isDanceMode,
    volume,
    initAudio,
    playScrollSound,
    handleFirstInteraction,
    toggleAudio,
    playDanceMusic,
    stopDanceMusic,
    updateVolume,
  };
};
