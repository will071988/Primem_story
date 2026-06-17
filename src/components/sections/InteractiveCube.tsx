"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

export default function InteractiveCube() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const w = container.clientWidth;
    const h = container.clientHeight;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, w / h, 0.1, 100);
    camera.position.set(3, 2, 5);

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
    });
    renderer.setSize(w, h);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.autoRotate = true;
    controls.autoRotateSpeed = 3;
    controls.enableZoom = false;
    controls.enablePan = false;
    controls.maxPolarAngle = Math.PI / 2;
    controls.minPolarAngle = 0;

    const group = new THREE.Group();

    const size = 1.4;

    const geometry = new THREE.BoxGeometry(size, size, size);

    const edges = new THREE.EdgesGeometry(geometry);
    const lineMat = new THREE.LineBasicMaterial({
      color: 0x00d4ff,
      transparent: true,
      opacity: 0.6,
    });
    const wireframe = new THREE.LineSegments(edges, lineMat);
    group.add(wireframe);

    const innerGeo = new THREE.BoxGeometry(size * 0.92, size * 0.92, size * 0.92);
    const innerMat = new THREE.MeshBasicMaterial({
      color: 0x6c2bff,
      wireframe: true,
      transparent: true,
      opacity: 0.15,
    });
    const inner = new THREE.Mesh(innerGeo, innerMat);
    group.add(inner);

    const positions = [
      [-1, -1, -1], [1, -1, -1], [1, -1, 1], [-1, -1, 1],
      [-1, 1, -1], [1, 1, -1], [1, 1, 1], [-1, 1, 1],
    ];

    const sphereMat = new THREE.MeshBasicMaterial({ color: 0x00d4ff });
    positions.forEach((pos) => {
      const sphere = new THREE.Mesh(
        new THREE.SphereGeometry(0.04, 8, 8),
        sphereMat
      );
      sphere.position.set(
        (pos[0] * size) / 2,
        (pos[1] * size) / 2,
        (pos[2] * size) / 2
      );
      group.add(sphere);
    });

    scene.add(group);

    const animate = () => {
      controls.update();
      renderer.render(scene, camera);
      requestAnimationFrame(animate);
    };
    animate();

    const resizeObserver = new ResizeObserver(() => {
      const cw = container.clientWidth;
      const ch = container.clientHeight;
      camera.aspect = cw / ch;
      camera.updateProjectionMatrix();
      renderer.setSize(cw, ch);
    });
    resizeObserver.observe(container);

    return () => {
      resizeObserver.disconnect();
      renderer.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="w-full h-full"
    />
  );
}
