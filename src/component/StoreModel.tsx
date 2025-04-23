'use client';

import { useGLTF } from '@react-three/drei';
import { useRef, useMemo, JSX } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { Group, Box3, Vector3 } from 'three';

export default function StoreModel(props: JSX.IntrinsicElements['group']) {
  const group = useRef<Group>(null);
  const { scene } = useGLTF('/models/market.glb');
  const { mouse } = useThree();

  const centeredScene = useMemo(() => {
    const cloned = scene.clone();
    const box = new Box3().setFromObject(cloned);
    const center = new Vector3();
    box.getCenter(center);
    cloned.position.sub(center);
    cloned.position.y -= box.min.y;
    return cloned;
  }, [scene]);

  // 마우스에 따라 회전
  useFrame(() => {
    if (group.current) {
      const maxRotation = Math.PI / 20;
      group.current.rotation.y = mouse.x * maxRotation;
      group.current.rotation.z = -mouse.y * (Math.PI / 20);
    }
  });

  return (
    <group ref={group} {...props}>
      <primitive object={centeredScene} />
    </group>
  );
}
