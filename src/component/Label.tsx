'use client';

import { Html } from '@react-three/drei';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import Logo from '../../public/images/PickOn_Logo.png';

interface LabelProps {
  position: [number, number, number];
}

export default function Label({ position }: LabelProps) {
  const router = useRouter();

  return (
    <Html position={position} center>
      <div
        onClick={() => router.push('/')}
        style={{
          display: 'flex',
          justifyContent: 'center',
          width: '100px',
          borderRadius: '4px',
          cursor: 'pointer',
        }}
      >
        <Image alt="logo" src={Logo} />
      </div>
    </Html>
  );
}
