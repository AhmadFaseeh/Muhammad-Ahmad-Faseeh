"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

type Props = { particleCount?: number };

export function HeroScene({ particleCount }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      55,
      el.clientWidth / Math.max(el.clientHeight, 1),
      0.1,
      200,
    );
    camera.position.set(0, 0, 14);

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: "high-performance",
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(el.clientWidth, el.clientHeight);
    renderer.setClearColor(0x000000, 0);
    el.appendChild(renderer.domElement);

    const isNarrow = window.matchMedia("(max-width: 768px)").matches;
    const count = particleCount ?? (isNarrow ? 800 : 3000);
    const positions = new Float32Array(count * 3);
    const base = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const ix = i * 3;
      positions[ix] = base[ix] = (Math.random() - 0.5) * 32;
      positions[ix + 1] = base[ix + 1] = (Math.random() - 0.5) * 22;
      positions[ix + 2] = base[ix + 2] = (Math.random() - 0.5) * 16;
    }

    const pGeo = new THREE.BufferGeometry();
    pGeo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    const pMat = new THREE.PointsMaterial({
      color: 0x00f5ff,
      size: 0.045,
      transparent: true,
      opacity: 0.72,
      depthWrite: false,
      sizeAttenuation: true,
    });
    const points = new THREE.Points(pGeo, pMat);
    scene.add(points);

    const knot = new THREE.Mesh(
      new THREE.TorusKnotGeometry(1.15, 0.32, 140, 18),
      new THREE.MeshBasicMaterial({
        color: 0x00f5ff,
        wireframe: true,
        transparent: true,
        opacity: 0.88,
      }),
    );
    knot.position.set(-2.2, 0.4, -2);
    scene.add(knot);

    const wireMat = new THREE.MeshBasicMaterial({
      color: 0xffb627,
      wireframe: true,
      transparent: true,
      opacity: 0.32,
    });
    const floaters: THREE.Mesh[] = [];
    const igeo = new THREE.IcosahedronGeometry(0.32, 0);
    const tgeo = new THREE.TetrahedronGeometry(0.38, 0);
    for (let i = 0; i < 10; i++) {
      const mesh = new THREE.Mesh(i % 2 === 0 ? igeo : tgeo, wireMat);
      mesh.position.set(
        (Math.random() - 0.5) * 16,
        (Math.random() - 0.5) * 10,
        (Math.random() - 0.5) * 8 - 3,
      );
      mesh.userData.phase = Math.random() * Math.PI * 2;
      floaters.push(mesh);
      scene.add(mesh);
    }

    const mouse = { x: 0, y: 0, active: false };
    const onMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
      mouse.active = true;
    };
    const onLeave = () => {
      mouse.active = false;
    };

    el.addEventListener("mousemove", onMove);
    el.addEventListener("mouseleave", onLeave);

    const clock = new THREE.Clock();
    let rafId = 0;
    const posAttr = pGeo.getAttribute("position") as THREE.BufferAttribute;
    const arr = posAttr.array as Float32Array;

    const animate = () => {
      rafId = requestAnimationFrame(animate);
      const t = clock.getElapsedTime();
      knot.rotation.x = t * 0.14;
      knot.rotation.y = t * 0.2;

      const mx = mouse.active ? mouse.x * 14 : 0;
      const my = mouse.active ? mouse.y * 9 : 0;
      const repelR = 4.2;

      for (let i = 0; i < count; i++) {
        const ix = i * 3;
        const bx = base[ix];
        const by = base[ix + 1];
        const bz = base[ix + 2];
        let x = arr[ix];
        let y = arr[ix + 1];
        let z = arr[ix + 2];

        const dx = x - mx;
        const dy = y - my;
        const dist = Math.hypot(dx, dy) + 0.001;
        if (dist < repelR && mouse.active) {
          const f = ((repelR - dist) / repelR) * 0.28;
          x += (dx / dist) * f;
          y += (dy / dist) * f;
        }
        x += (bx - x) * 0.035;
        y += (by - y) * 0.035;
        z += (bz - z) * 0.02 + Math.sin(t * 0.8 + i * 0.01) * 0.002;

        arr[ix] = x;
        arr[ix + 1] = y;
        arr[ix + 2] = z;
      }
      posAttr.needsUpdate = true;

      floaters.forEach((m, i) => {
        const ph = m.userData.phase as number;
        m.rotation.x += 0.004 + i * 0.0002;
        m.rotation.y += 0.003;
        m.position.y += Math.sin(t * 0.6 + ph) * 0.003;
      });

      renderer.render(scene, camera);
    };
    animate();

    const onResize = () => {
      camera.aspect = el.clientWidth / Math.max(el.clientHeight, 1);
      camera.updateProjectionMatrix();
      renderer.setSize(el.clientWidth, el.clientHeight);
    };
    window.addEventListener("resize", onResize);

    return () => {
      cancelAnimationFrame(rafId);
      el.removeEventListener("mousemove", onMove);
      el.removeEventListener("mouseleave", onLeave);
      window.removeEventListener("resize", onResize);
      el.removeChild(renderer.domElement);
      renderer.dispose();
      pGeo.dispose();
      pMat.dispose();
      knot.geometry.dispose();
      (knot.material as THREE.Material).dispose();
      igeo.dispose();
      tgeo.dispose();
      wireMat.dispose();
    };
  }, [particleCount]);

  return <div ref={containerRef} className="absolute inset-0 z-0" />;
}
