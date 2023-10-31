import { useRef, useEffect, useState } from 'react';
import * as THREE from 'three';
import { useRoute, useLocation } from 'wouter';
import { useFrame } from '@react-three/fiber';
import { easing } from 'maath';
import Frame from './frame';
const GOLDENRATIO = 1.61803398875;

function Frames({
  images,
  q = new THREE.Quaternion(),
  p = new THREE.Vector3(),
}) {
  const [isDefaultPosition, setDefaultPosition] = useState(true);
  const [showImage, setShowImage] = useState(true);

  useEffect(() => {
    // set showImage based on isDefaultPosition
    setShowImage(isDefaultPosition);
  }, [isDefaultPosition]);

  const ref = useRef();
  const clicked = useRef();
  const [, params] = useRoute('/item/:id');
  const [, setLocation] = useLocation();
  useEffect(() => {
    clicked.current = ref.current.getObjectByName(params?.id);
    if (clicked.current) {
      clicked.current.parent.updateWorldMatrix(true, true);
      clicked.current.parent.localToWorld(p.set(0, GOLDENRATIO / 2, 1.25));
      clicked.current.parent.getWorldQuaternion(q);
    } else {
      p.set(0, 0, 5.5);
      q.identity();
    }
  });
  useFrame((state, dt) => {
    if (isDefaultPosition) {
      p.set(0, 0, 5.5);
    }
    easing.damp3(state.camera.position, p, 0.4, dt);
  });
  return (
    <group
      ref={ref}
      onClick={e => {
        e.stopPropagation();
        if (clicked.current === e.object) {
          setDefaultPosition(!isDefaultPosition);
          clicked.current = null; // Clear the reference
          p.set(0, 0, 5.5);
        } else {
          setDefaultPosition(false);
          setLocation('/item/' + e.object.name);
          clicked.current = e.object;
        }
      }}
      onPointerMissed={() => setLocation('/')}
    >
      {images.map(
        (props, i) => <Frame key={i} {...props} showImage={showImage}  setShowImage={setShowImage}  /> /* prettier-ignore */
      )}
    </group>
  );
}

export default Frames;
