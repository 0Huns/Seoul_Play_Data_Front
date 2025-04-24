'use client';

import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment } from '@react-three/drei';
import dynamic from 'next/dynamic';
import Label from './Label';

// 동적 import (SSR 방지)
const StoreModel = dynamic(() => import('@/component/StoreModel'), { ssr: false });

export default function Background() {
  return (
    <div className="w-full h-full bg-[#bcd8ea] flex justify-center items-center">
      <Canvas camera={{ position: [5, 1.5, 0], fov: 50 }} style={{ width: '100%', height: '100%' }}>
        <ambientLight intensity={1} />
        <directionalLight position={[5, 5, 5]} intensity={1} />
        <Environment preset="city" />
        <OrbitControls
          target={[0, 1, 0]}
          enableRotate={true}
          enableZoom={false}
          enablePan={true}
          minAzimuthAngle={Math.PI / 2 - 0.1}
          maxAzimuthAngle={Math.PI / 2 + 0.1}
          minPolarAngle={Math.PI / 3}
          maxPolarAngle={Math.PI / 1.6}
          mouseButtons={{
            RIGHT: undefined,
            LEFT: 0,
            MIDDLE: 1,
          }}
        />
        <Label position={[0, 2, 0]} text="Seoul-Play" />
        <StoreModel scale={0.8} />
      </Canvas>
    </div>
  );
}
