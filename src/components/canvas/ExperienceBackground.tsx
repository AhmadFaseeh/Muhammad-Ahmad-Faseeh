"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

export function ExperienceBackground() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(50, el.clientWidth / Math.max(el.clientHeight, 1), 0.1, 80);
    camera.position.set(4, 5, 10);
    camera.lookAt(0, 0, 0);
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, powerPreference: "high-performance" });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(el.clientWidth, el.clientHeight);
    renderer.setClearColor(0x000000, 0);
    el.appendChild(renderer.domElement);

    const grid = new THREE.GridHelper(34, 34, 0x00f5ff, 0x222233);
    const mat = grid.material as THREE.Material & { opacity?: number };
    mat.transparent = true;
    mat.opacity = 0.12;
    scene.add(grid);

    const clock = new THREE.Clock();
    let raf = 0;
    const tick = () => {
      raf = requestAnimationFrame(tick);
      const t = clock.getElapsedTime();
      grid.position.z = Math.sin(t * 0.08) * 0.4;
      grid.rotation.y = t * 0.02;
      renderer.render(scene, camera);
    };
    tick();

    const onResize = () => {
      camera.aspect = el.clientWidth / Math.max(el.clientHeight, 1);
      camera.updateProjectionMatrix();
      renderer.setSize(el.clientWidth, el.clientHeight);
    };
    window.addEventListener("resize", onResize);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
      el.removeChild(renderer.domElement);
      renderer.dispose();
      grid.geometry.dispose();
      const m = grid.material;
      if (Array.isArray(m)) m.forEach((x) => x.dispose());
      else m.dispose();
    };
  }, []);

  return <div ref={containerRef} className="pointer-events-none fixed inset-0 z-0" />;
}
