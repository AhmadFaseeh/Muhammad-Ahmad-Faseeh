"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

export function SkillsBackground() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(60, el.clientWidth / Math.max(el.clientHeight, 1), 0.1, 200);
    camera.position.set(0, 0, 18);

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: false, powerPreference: "high-performance" });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    renderer.setSize(el.clientWidth, el.clientHeight);
    renderer.setClearColor(0x000000, 0);
    el.appendChild(renderer.domElement);

    const isNarrow = window.matchMedia("(max-width: 768px)").matches;

    // Node positions for clusters
    const clusters = [
      { color: 0x00f5ff, center: [-5, 2, -2], count: isNarrow ? 3 : 6 },   // backend cyan
      { color: 0xffb627, center: [5, 2, -1],  count: isNarrow ? 3 : 5 },   // frontend amber
      { color: 0x00e676, center: [-4, -3, 0], count: isNarrow ? 3 : 5 },   // data green
      { color: 0xa78bfa, center: [4, -3, -1], count: isNarrow ? 2 : 4 },   // ai purple
      { color: 0x666677, center: [0, 0, -3],  count: isNarrow ? 2 : 4 },   // devops gray
    ];

    const allNodes: { mesh: THREE.Mesh; cluster: number; basePos: THREE.Vector3 }[] = [];
    const allLines: THREE.Line[] = [];

    clusters.forEach((cl, ci) => {
      const mat = new THREE.MeshBasicMaterial({ color: cl.color, wireframe: true, transparent: true, opacity: 0.25 });
      const nodes: THREE.Mesh[] = [];

      for (let i = 0; i < cl.count; i++) {
        const geo = i % 2 === 0 ? new THREE.OctahedronGeometry(0.22) : new THREE.IcosahedronGeometry(0.18, 0);
        const m = new THREE.Mesh(geo, mat);
        const angle = (i / cl.count) * Math.PI * 2;
        const r = 1.8 + Math.random() * 0.5;
        const bp = new THREE.Vector3(
          cl.center[0] + Math.cos(angle) * r,
          cl.center[1] + Math.sin(angle) * r,
          cl.center[2] + (Math.random() - 0.5) * 2,
        );
        m.position.copy(bp);
        m.userData.phase = Math.random() * Math.PI * 2;
        m.userData.speed = 0.25 + Math.random() * 0.3;
        scene.add(m);
        nodes.push(m);
        allNodes.push({ mesh: m, cluster: ci, basePos: bp.clone() });
      }

      // Connection lines within cluster
      const lineMat = new THREE.LineBasicMaterial({ color: cl.color, transparent: true, opacity: 0.12 });
      for (let i = 0; i < nodes.length - 1; i++) {
        const pts = [nodes[i].position.clone(), nodes[i + 1].position.clone()];
        const lineGeo = new THREE.BufferGeometry().setFromPoints(pts);
        const line = new THREE.Line(lineGeo, lineMat);
        scene.add(line);
        allLines.push(line);
      }
    });

    const clock = new THREE.Clock();
    let rafId = 0;

    const animate = () => {
      rafId = requestAnimationFrame(animate);
      const t = clock.getElapsedTime();

      allNodes.forEach(({ mesh, basePos }) => {
        const ph = mesh.userData.phase as number;
        const sp = mesh.userData.speed as number;
        mesh.position.x = basePos.x + Math.sin(t * sp + ph) * 0.4;
        mesh.position.y = basePos.y + Math.cos(t * sp * 0.7 + ph) * 0.35;
        mesh.rotation.x += 0.005;
        mesh.rotation.y += 0.007;
      });

      // Update lines
      let lineIdx = 0;
      clusters.forEach((cl) => {
        const clusterNodes = allNodes.filter((n) => n.cluster === clusters.indexOf(cl));
        for (let i = 0; i < clusterNodes.length - 1; i++) {
          const line = allLines[lineIdx++];
          if (!line) continue;
          const posAttr = line.geometry.getAttribute("position") as THREE.BufferAttribute;
          const arr = posAttr.array as Float32Array;
          arr[0] = clusterNodes[i].mesh.position.x;
          arr[1] = clusterNodes[i].mesh.position.y;
          arr[2] = clusterNodes[i].mesh.position.z;
          arr[3] = clusterNodes[i + 1].mesh.position.x;
          arr[4] = clusterNodes[i + 1].mesh.position.y;
          arr[5] = clusterNodes[i + 1].mesh.position.z;
          posAttr.needsUpdate = true;
        }
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
      window.removeEventListener("resize", onResize);
      el.removeChild(renderer.domElement);
      renderer.dispose();
    };
  }, []);

  return <div ref={containerRef} className="pointer-events-none fixed inset-0 z-0 opacity-60" aria-hidden />;
}
