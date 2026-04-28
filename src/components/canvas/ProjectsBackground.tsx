"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

export function ProjectsBackground() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(55, el.clientWidth / Math.max(el.clientHeight, 1), 0.1, 200);
    camera.position.z = 12;
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, powerPreference: "high-performance" });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(el.clientWidth, el.clientHeight);
    renderer.setClearColor(0x000000, 0);
    el.appendChild(renderer.domElement);

    const lines: THREE.Line[] = [];
    const makeLine = (pts: THREE.Vector3[], color: number) => {
      const g = new THREE.BufferGeometry().setFromPoints(pts);
      const m = new THREE.LineBasicMaterial({ color, transparent: true, opacity: 0.4 });
      const l = new THREE.Line(g, m);
      lines.push(l);
      scene.add(l);
    };
    for (let i = 0; i < 18; i++) {
      const z0 = (i - 8) * 0.5;
      const a = new THREE.Vector3(-14, (Math.sin(i) * 3) / 1.2, z0);
      const b = new THREE.Vector3(14, (Math.cos(i * 0.6) * 2.5) / 1.2, z0 + 0.4);
      makeLine([a, b], i % 2 ? 0xffb627 : 0x00f5ff);
    }

    const clock = new THREE.Clock();
    let raf = 0;
    const tick = () => {
      raf = requestAnimationFrame(tick);
      const t = clock.getElapsedTime();
      lines.forEach((ln, i) => {
        ln.position.x = Math.sin(t * 0.15 + i * 0.1) * 0.3;
        ln.position.y = Math.cos(t * 0.2 + i * 0.08) * 0.2;
      });
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
      lines.forEach((ln) => {
        ln.geometry.dispose();
        (ln.material as THREE.Material).dispose();
      });
    };
  }, []);

  return <div ref={containerRef} className="pointer-events-none fixed inset-0 z-0" />;
}
