"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Float } from "@react-three/drei";
import { useMemo, useRef } from "react";
import * as THREE from "three";

function FlowField() {
  const materialRef = useRef<THREE.ShaderMaterial>(null);

  const material = useMemo(
    () =>
      new THREE.ShaderMaterial({
        transparent: true,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
        uniforms: {
          uTime: { value: 0 },
          uColorA: { value: new THREE.Color("#00D4FF") },
          uColorB: { value: new THREE.Color("#6C2BFF") },
        },
        vertexShader: `
          uniform float uTime;
          varying vec2 vUv;
          varying float vWave;

          void main() {
            vUv = uv;
            vec3 pos = position;
            float wave = sin((pos.x * 1.7) + uTime * 0.9) * 0.22;
            wave += cos((pos.y * 2.1) - uTime * 0.7) * 0.18;
            pos.z += wave;
            vWave = wave;
            gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
          }
        `,
        fragmentShader: `
          uniform vec3 uColorA;
          uniform vec3 uColorB;
          varying vec2 vUv;
          varying float vWave;

          void main() {
            float scan = smoothstep(0.02, 0.0, abs(fract(vUv.y * 18.0 + vWave * 0.45) - 0.5));
            float edge = 1.0 - smoothstep(0.12, 0.58, distance(vUv, vec2(0.5)));
            vec3 color = mix(uColorB, uColorA, vUv.x + vWave);
            float alpha = (0.08 + scan * 0.28) * edge;
            gl_FragColor = vec4(color, alpha);
          }
        `,
      }),
    []
  );

  useFrame(({ clock }) => {
    if (materialRef.current) {
      materialRef.current.uniforms.uTime.value = clock.elapsedTime;
    }
  });

  return (
    <mesh rotation={[-0.8, 0, 0.1]} position={[0, -0.32, -0.4]}>
      <planeGeometry args={[7.6, 4.2, 96, 72]} />
      <primitive ref={materialRef} attach="material" object={material} />
    </mesh>
  );
}

function Rings() {
  const groupRef = useRef<THREE.Group>(null);

  useFrame(({ clock }) => {
    if (!groupRef.current) return;
    groupRef.current.rotation.y = clock.elapsedTime * 0.18;
    groupRef.current.rotation.z = Math.sin(clock.elapsedTime * 0.4) * 0.08;
  });

  return (
    <group ref={groupRef}>
      {[1.8, 2.35, 2.85].map((radius, index) => (
        <mesh key={radius} rotation={[Math.PI / 2, index * 0.42, index * 0.2]}>
          <torusGeometry args={[radius, 0.006, 8, 160]} />
          <meshBasicMaterial
            color={index === 1 ? "#6C2BFF" : "#00D4FF"}
            transparent
            opacity={0.34 - index * 0.06}
            blending={THREE.AdditiveBlending}
          />
        </mesh>
      ))}
    </group>
  );
}

function LightCore() {
  const coreRef = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    if (!coreRef.current) return;
    const scale = 1 + Math.sin(clock.elapsedTime * 1.8) * 0.07;
    coreRef.current.scale.setScalar(scale);
  });

  return (
    <Float speed={2.4} rotationIntensity={0.8} floatIntensity={0.7}>
      <mesh ref={coreRef}>
        <icosahedronGeometry args={[0.52, 2]} />
        <meshBasicMaterial
          color="#C0C0C0"
          wireframe
          transparent
          opacity={0.64}
          blending={THREE.AdditiveBlending}
        />
      </mesh>
    </Float>
  );
}

export default function AetherScene() {
  return (
    <Canvas
      dpr={[1, 1.7]}
      camera={{ position: [0, 0.18, 5.1], fov: 46 }}
      gl={{ alpha: true, antialias: true, powerPreference: "high-performance" }}
      className="pointer-events-none"
    >
      <ambientLight intensity={0.55} />
      <FlowField />
      <Rings />
      <LightCore />
    </Canvas>
  );
}
