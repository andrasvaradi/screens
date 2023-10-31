import { useRef, useState } from 'react';
import * as THREE from 'three';
import { useCursor, Image, Text, useVideoTexture } from '@react-three/drei';
import { useRoute } from 'wouter';
import { useFrame } from '@react-three/fiber';
import { easing } from 'maath';
import getUuid from 'uuid-by-string';
const GOLDENRATIO = 1.61803398875;

function Frame({ url, c = new THREE.Color(), showImage, ...props }) {
  const image = useRef();
  const frame = useRef();
  const [, params] = useRoute('/item/:id');
  const [hovered, hover] = useState(false);

  const [rnd] = useState(() => Math.random());
  const name = getUuid(url);
  const isActive = params?.id === name;
  useCursor(hovered);
  // useFrame((state, dt) => {
  //   image.current.material.zoom = 2 + Math.sin(rnd * 10000 + state.clock.elapsedTime / 3) / 2
  //   easing.damp3(image.current.scale, [0.85 * (!isActive && hovered ? 0.85 : 1), 0.9 * (!isActive && hovered ? 0.905 : 1), 1], 0.1, dt)
  //   easing.dampC(frame.current.material.color, hovered ? 'orange' : 'white', 0.1, dt)
  // })

  useFrame((state, dt) => {
    if (image.current && image.current.material) {
      image.current.material.zoom =
        2 + Math.sin(rnd * 10000 + state.clock.elapsedTime / 3) / 2;
    }

    if (frame.current && frame.current.material) {
      console.log('here');
      easing.dampC(
        frame.current.material.color,
        hovered ? 'orange' : '#151515',
        0.1,
        dt
      );
    }

    if (image.current && image.current.scale) {
      easing.damp3(
        image.current.scale,
        [
          0.85 * (!isActive && hovered ? 0.85 : 1),
          0.9 * (!isActive && hovered ? 0.905 : 1),
          1,
        ],
        0.1,
        dt
      );
    }
  });

  function VideoMaterial({ url }) {
    const texture = useVideoTexture(url);
    return <meshBasicMaterial map={texture} toneMapped={false} />;
  }
  console.log(url.split('/').pop().slice(0, -4));

  return (
    <group {...props}>
      <mesh
        ref={frame}
        name={name}
        onPointerOver={e => (e.stopPropagation(), hover(true))}
        onPointerOut={() => hover(false)}
        scale={[1, GOLDENRATIO, 0.05]}
        position={[0, GOLDENRATIO / 2, 0]}
        rotation={[0, 0, Math.PI / 2]}
      >
        <boxGeometry />
        <meshStandardMaterial
          color="#151515"
          metalness={0.5}
          roughness={0.5}
          envMapIntensity={2}
        />
        <mesh
          ref={frame}
          raycast={() => null}
          scale={[0.9, 0.93, 0.9]}
          position={[0, 0, 0.2]}
        >
          <boxGeometry />
          <meshBasicMaterial toneMapped={false} fog={false} />
        </mesh>
        {showImage ? (
          <Image
            raycast={() => null}
            ref={image}
            position={[0, 0, 0.7]}
            url={props.imageUrl}
          />
        ) : (
          <mesh
            colorWrite="#151515"
            color="#151515"
            ref={image}
            raycast={() => null}
            position={[0, 0, 0.7]}
            rotation={[0, 0, -Math.PI / 2]}
          >
            <planeGeometry />
            <VideoMaterial url={url} color="#151515" />
          </mesh>
        )}
      </mesh>
      <Text
        maxWidth={0.1}
        anchorX="right"
        anchorY="top"
        position={[0.8, 1.4, 0]}
        fontSize={0.025}
      >
        {url.split('/').pop().slice(0, -4)}
      </Text>
    </group>
  );
}

export default Frame;
