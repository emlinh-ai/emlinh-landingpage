import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { Text } from '@react-three/drei';

interface ZodiacCircleProps {
  position?: [number, number, number];
  scale?: number;
  radius?: number;
}

const ZodiacCircle: React.FC<ZodiacCircleProps> = ({ 
  position = [0, 0, 0], 
  scale = 1,
  radius = 3 
}) => {
  const groupRef = useRef<THREE.Group>(null);
  const ringRef = useRef<THREE.Group>(null);

  // Zodiac signs with their symbols
  const zodiacSigns = useMemo(() => [
    { symbol: '♈', name: 'Aries', angle: 0 },
    { symbol: '♉', name: 'Taurus', angle: 30 },
    { symbol: '♊', name: 'Gemini', angle: 60 },
    { symbol: '♋', name: 'Cancer', angle: 90 },
    { symbol: '♌', name: 'Leo', angle: 120 },
    { symbol: '♍', name: 'Virgo', angle: 150 },
    { symbol: '♎', name: 'Libra', angle: 180 },
    { symbol: '♏', name: 'Scorpio', angle: 210 },
    { symbol: '♐', name: 'Sagittarius', angle: 240 },
    { symbol: '♑', name: 'Capricorn', angle: 270 },
    { symbol: '♒', name: 'Aquarius', angle: 300 },
    { symbol: '♓', name: 'Pisces', angle: 330 }
  ], []);

  // Create glowing ring material
  const ringMaterial = useMemo(() => {
    return new THREE.MeshPhongMaterial({
      color: 0xffd700,
      emissive: 0xffd700,
      emissiveIntensity: 0.3,
      transparent: true,
      opacity: 0.8,
      side: THREE.DoubleSide
    });
  }, []);

  // Create inner circle material
  const innerMaterial = useMemo(() => {
    return new THREE.MeshPhongMaterial({
      color: 0x8b00ff,
      emissive: 0x8b00ff,
      emissiveIntensity: 0.2,
      transparent: true,
      opacity: 0.6,
      side: THREE.DoubleSide
    });
  }, []);

  // Create star particles for mystical effect
  const stars = useMemo(() => {
    const starGeometry = new THREE.BufferGeometry();
    const starCount = 200;
    const positions = new Float32Array(starCount * 3);
    
    // Create a seeded random function for consistency
    const random = (seed: number) => {
      const x = Math.sin(seed) * 10000;
      return x - Math.floor(x);
    };
    
    for (let i = 0; i < starCount; i++) {
      const angle = (i / starCount) * Math.PI * 2;
      const r = radius + (random(i * 10) - 0.5) * 0.5;
      const height = (random(i * 20) - 0.5) * 0.5;
      
      positions[i * 3] = Math.cos(angle) * r;
      positions[i * 3 + 1] = height;
      positions[i * 3 + 2] = Math.sin(angle) * r;
    }
    
    starGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    
    const starMaterial = new THREE.PointsMaterial({
      color: 0xffffff,
      size: 0.02,
      transparent: true,
      opacity: 0.8,
      blending: THREE.AdditiveBlending
    });
    
    return new THREE.Points(starGeometry, starMaterial);
  }, [radius]);

  // Animation
  useFrame((state) => {
    if (!groupRef.current || !ringRef.current || !stars) return;
    
    const time = state.clock.getElapsedTime();
    
    // Rotate the entire zodiac circle
    groupRef.current.rotation.y = time * 0.1;
    
    // Rotate inner ring in opposite direction
    ringRef.current.rotation.y = -time * 0.2;
    ringRef.current.rotation.z = Math.sin(time * 0.5) * 0.1;
    
    // Animate stars - clone to avoid direct mutation
    const starsClone = stars.clone();
    starsClone.rotation.y = time * 0.15;
    const starsMaterial = starsClone.material as THREE.PointsMaterial;
    starsMaterial.opacity = 0.6 + Math.sin(time * 2) * 0.2;
  });

  return (
    <group ref={groupRef} position={position} scale={scale}>
      {/* Outer ring */}
      <mesh>
        <torusGeometry args={[radius, 0.05, 16, 100]} />
        <primitive object={ringMaterial} />
      </mesh>
      
      {/* Inner rotating ring */}
      <group ref={ringRef}>
        <mesh>
          <torusGeometry args={[radius * 0.8, 0.03, 16, 100]} />
          <primitive object={innerMaterial} />
        </mesh>
      </group>
      
      {/* Zodiac signs */}
      {zodiacSigns.map((sign, index) => {
        const angle = (sign.angle * Math.PI) / 180;
        const x = Math.cos(angle) * radius;
        const z = Math.sin(angle) * radius;
        
        return (
          <group key={index} position={[x, 0, z]}>
            {/* Zodiac symbol */}
            <Text
              position={[0, 0.2, 0]}
              fontSize={0.3}
              color="#ffd700"
              anchorX="center"
              anchorY="middle"
              font="/fonts/helvetiker_regular.typeface.json"
            >
              {sign.symbol}
            </Text>
            
            {/* Small glowing orb for each sign */}
            <mesh position={[0, 0, 0]}>
              <sphereGeometry args={[0.05, 16, 16]} />
              <meshPhongMaterial
                color={0xffd700}
                emissive={0xffd700}
                emissiveIntensity={0.5}
              />
            </mesh>
            
            {/* Connecting lines to center */}
            <mesh>
              <cylinderGeometry args={[0.01, 0.01, radius * 0.8, 8]} />
              <meshPhongMaterial
                color={0x8b00ff}
                transparent
                opacity={0.3}
                emissive={0x8b00ff}
                emissiveIntensity={0.1}
              />
            </mesh>
          </group>
        );
      })}
      
      {/* Central mystical orb */}
      <mesh position={[0, 0, 0]}>
        <sphereGeometry args={[0.2, 32, 32]} />
        <meshPhongMaterial
          color={0xff00ff}
          emissive={0xff00ff}
          emissiveIntensity={0.8}
          transparent
          opacity={0.9}
        />
      </mesh>
      
      {/* Mystical particles */}
      <primitive object={stars} />
      
      {/* Energy beams */}
      {[0, 60, 120, 180, 240, 300].map((angle, index) => {
        const rad = (angle * Math.PI) / 180;
        return (
          <mesh key={index} rotation={[0, rad, 0]}>
            <cylinderGeometry args={[0.02, 0.02, radius * 2, 8]} />
            <meshPhongMaterial
              color={0x00ffff}
              transparent
              opacity={0.4}
              emissive={0x00ffff}
              emissiveIntensity={0.3}
            />
          </mesh>
        );
      })}
    </group>
  );
};

export default ZodiacCircle;
