import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
import * as THREE from 'three';

function ParticleField() {
  const ref = useRef();
  
  const positions = useMemo(() => {
    const positions = new Float32Array(3000 * 3);
    for (let i = 0; i < 3000; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 10;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 10;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 10;
    }
    return positions;
  }, []);

  useFrame((state) => {
    if (ref.current) {
      const t = state.clock.getElapsedTime();

      ref.current.rotation.y = t * 0.05;
      ref.current.rotation.x = Math.sin(t * 0.1) * 0.1;
    }
  });

  return (
    <Points ref={ref} positions={positions} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent
        color="#8B5CF6"
        size={0.015}
        sizeAttenuation={true}
        depthWrite={false}
        opacity={0.6}
      />
    </Points>
  );
}

function FloatingBlob({ position, color, scale = 1 }) {
  const mesh = useRef();
  const initialPos = useMemo(() => position, [position]);
  
  useFrame((state) => {
    if (mesh.current) {
      const t = state.clock.getElapsedTime();
      mesh.current.position.x = initialPos[0] + Math.sin(t * 0.3) * 0.5;
      mesh.current.position.y = initialPos[1] + Math.cos(t * 0.4) * 0.3;
      mesh.current.scale.setScalar(scale + Math.sin(t * 0.5) * 0.1);
    }
  });

  return (
    <mesh ref={mesh} position={position}>
      <sphereGeometry args={[1, 32, 32]} />
      <meshStandardMaterial
        color={color}
        transparent
        opacity={0.15}
        roughness={0.2}
        metalness={0.8}
      />
    </mesh>
  );
}

export default function BackgroundSystem() {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none">
      <div className="absolute inset-0 bg-background" />
      <div className="absolute inset-0 bg-aurora" />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background/80" />
      
      <Canvas camera={{ position: [0, 0, 5], fov: 75 }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} color="#8B5CF6" />
        <pointLight position={[-10, -10, 10]} intensity={0.5} color="#06B6D4" />
        
        <ParticleField />
        
        <FloatingBlob position={[3, 2, -2]} color="#8B5CF6" scale={0.8} />
        <FloatingBlob position={[-3, -1, -1]} color="#06B6D4" scale={0.6} />
        <FloatingBlob position={[2, -2, -3]} color="#EC4899" scale={0.5} />
      </Canvas>
      
      <div className="noise-overlay" />
    </div>
  );
}