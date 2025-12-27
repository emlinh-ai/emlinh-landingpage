import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface ParticleFieldProps {
  count?: number;
  color?: string;
  size?: number;
  area?: number;
  speed?: number;
}

const ParticleField: React.FC<ParticleFieldProps> = ({ 
  count = 1000, 
  color = '#ffffff', 
  size = 0.02,
  area = 10,
  speed = 0.5
}) => {
  const meshRef = useRef<THREE.Points>(null);
  const lightRef = useRef<THREE.PointLight>(null);

  // Create particle positions and velocities
  const particles = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const velocities = new Float32Array(count * 3);
    
    // Create a seeded random function for consistency
    const random = (seed: number) => {
      const x = Math.sin(seed) * 10000;
      return x - Math.floor(x);
    };
    
    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      const seed = i * 1000; // Unique seed for each particle
      
      // Random position in a cube
      positions[i3] = (random(seed) - 0.5) * area;
      positions[i3 + 1] = (random(seed + 1) - 0.5) * area;
      positions[i3 + 2] = (random(seed + 2) - 0.5) * area;
      
      // Random velocity for movement
      velocities[i3] = (random(seed + 3) - 0.5) * speed;
      velocities[i3 + 1] = (random(seed + 4) - 0.5) * speed;
      velocities[i3 + 2] = (random(seed + 5) - 0.5) * speed;
    }
    
    return { positions, velocities };
  }, [count, area, speed]);

  // Create particle geometry with custom attributes
  const geometry = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(particles.positions, 3));
    geo.setAttribute('velocity', new THREE.BufferAttribute(particles.velocities, 3));
    
    // Add varying sizes for more organic look
    const sizes = new Float32Array(count);
    const random = (seed: number) => {
      const x = Math.sin(seed) * 10000;
      return x - Math.floor(x);
    };
    
    for (let i = 0; i < count; i++) {
      sizes[i] = random(i * 100) * size + size * 0.5;
    }
    geo.setAttribute('size', new THREE.BufferAttribute(sizes, 1));
    
    return geo;
  }, [particles.positions, particles.velocities, count, size]);

  // Create particle material
  const material = useMemo(() => {
    return new THREE.PointsMaterial({
      size: size,
      color: new THREE.Color(color),
      transparent: true,
      opacity: 0.8,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      vertexColors: false,
      sizeAttenuation: true
    });
  }, [color, size]);

  // Animation loop
  useFrame((state) => {
    if (!meshRef.current) return;

    const positions = meshRef.current.geometry.attributes.position.array as Float32Array;
    const velocities = meshRef.current.geometry.attributes.velocity.array as Float32Array;
    const time = state.clock.getElapsedTime();

    // Update particle positions
    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      
      // Move particles
      positions[i3] += velocities[i3] * 0.01;
      positions[i3 + 1] += velocities[i3 + 1] * 0.01;
      positions[i3 + 2] += velocities[i3 + 2] * 0.01;
      
      // Wrap around boundaries
      if (Math.abs(positions[i3]) > area / 2) {
        positions[i3] = -positions[i3];
      }
      if (Math.abs(positions[i3 + 1]) > area / 2) {
        positions[i3 + 1] = -positions[i3 + 1];
      }
      if (Math.abs(positions[i3 + 2]) > area / 2) {
        positions[i3 + 2] = -positions[i3 + 2];
      }
      
      // Add floating effect
      positions[i3 + 1] += Math.sin(time + i * 0.1) * 0.002;
    }

    meshRef.current.geometry.attributes.position.needsUpdate = true;
    
    // Rotate the entire particle field slowly
    meshRef.current.rotation.y = time * 0.05;
    meshRef.current.rotation.x = Math.sin(time * 0.1) * 0.1;

    // Pulse light intensity
    if (lightRef.current) {
      lightRef.current.intensity = 2 + Math.sin(time * 2) * 0.5;
    }
  });

  return (
    <>
      <points ref={meshRef} geometry={geometry} material={material} />
      <pointLight
        ref={lightRef}
        position={[0, 0, 0]}
        intensity={2}
        color={color}
        distance={20}
        decay={2}
      />
    </>
  );
};

export default ParticleField;
