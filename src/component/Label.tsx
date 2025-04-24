'use client';

import { Html } from '@react-three/drei';
import { useRouter } from 'next/navigation';

interface LabelProps {
  position: [number, number, number];
  text: string;
}

export default function Label({ position, text }: LabelProps) {
  const router = useRouter();

  return (
    <Html position={position} center>
      <div
        onClick={() => router.push('/')}
        style={{
          display: 'flex',
          justifyContent: 'center',
          background: 'rgba(255, 255, 255, 0.473)',
          padding: '8px 8px',
          width: '200px',
          borderRadius: '4px',
          cursor: 'pointer',
        }}
      >
        {text}
      </div>
    </Html>
  );
}
