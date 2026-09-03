"use client";

import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";

interface HeroCoreSceneProps {
  activeChapter?: string;
}

export function HeroCoreScene({ activeChapter = "chapter-hero" }: HeroCoreSceneProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [hasWebGL, setHasWebGL] = useState(true);
  const activeChapterRef = useRef(activeChapter);

  useEffect(() => {
    activeChapterRef.current = activeChapter;
  }, [activeChapter]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Check WebGL availability
    let glAvailable = true;
    try {
      const canvas = document.createElement("canvas");
      const gl = canvas.getContext("webgl") || canvas.getContext("experimental-webgl");
      if (!gl) {
        glAvailable = false;
      }
    } catch {
      glAvailable = false;
    }

    if (!glAvailable) {
      setTimeout(() => setHasWebGL(false), 0);
      return;
    }

    // Three.js Scene Setup
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x07080c, 0.04);

    const camera = new THREE.PerspectiveCamera(
      45,
      window.innerWidth / window.innerHeight,
      0.1,
      100
    );
    camera.position.set(0, 0, 8.5);

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: true,
        powerPreference: "high-performance",
      });
    } catch {
      setTimeout(() => setHasWebGL(false), 0);
      return;
    }

    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.75));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;
    container.appendChild(renderer.domElement);

    // Group for the entire architectural core
    const coreGroup = new THREE.Group();
    scene.add(coreGroup);

    // 1. Inner Energy Reactor (Dual Octahedron)
    const innerGeom = new THREE.OctahedronGeometry(1.2, 0);
    const innerMat = new THREE.MeshBasicMaterial({
      color: 0xf59e0b,
      wireframe: true,
      transparent: true,
      opacity: 0.65,
    });
    const innerCore = new THREE.Mesh(innerGeom, innerMat);
    coreGroup.add(innerCore);

    const solidInnerGeom = new THREE.OctahedronGeometry(0.85, 0);
    const solidInnerMat = new THREE.MeshStandardMaterial({
      color: 0x1a160d,
      roughness: 0.2,
      metalness: 0.9,
      emissive: 0xf59e0b,
      emissiveIntensity: 0.25,
    });
    const solidInner = new THREE.Mesh(solidInnerGeom, solidInnerMat);
    coreGroup.add(solidInner);

    // 2. Floating Fragmented Monolith Panels (Outer Exoskeleton)
    const panelCount = 14;
    const panels: THREE.Mesh[] = [];
    const panelMaterial = new THREE.MeshStandardMaterial({
      color: 0x0e121a,
      metalness: 0.85,
      roughness: 0.35,
    });
    const edgeMaterial = new THREE.LineBasicMaterial({
      color: 0x06b6d4,
      transparent: true,
      opacity: 0.5,
    });

    const panelGroup = new THREE.Group();
    coreGroup.add(panelGroup);

    for (let i = 0; i < panelCount; i++) {
      const angle = (i / panelCount) * Math.PI * 2;
      const radius = 2.1 + (i % 2) * 0.35;
      const height = 0.5 + (i % 3) * 0.3;
      const width = 0.6;
      const depth = 0.12;

      const pGeom = new THREE.BoxGeometry(width, height, depth);
      const panel = new THREE.Mesh(pGeom, panelMaterial);

      const pX = Math.cos(angle) * radius;
      const pY = ((i % 5) - 2) * 0.6;
      const pZ = Math.sin(angle) * radius;

      panel.position.set(pX, pY, pZ);
      panel.lookAt(0, pY, 0);

      // Edge line outline for high-tech blueprint feel
      const edges = new THREE.EdgesGeometry(pGeom);
      const line = new THREE.LineSegments(edges, edgeMaterial);
      panel.add(line);

      panelGroup.add(panel);
      panels.push(panel);
    }

    // 3. Telemetry Orbital Rings
    const ringGeom = new THREE.RingGeometry(2.8, 2.82, 64);
    const ringMat = new THREE.MeshBasicMaterial({
      color: 0x252e3d,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.6,
    });
    const ring1 = new THREE.Mesh(ringGeom, ringMat);
    ring1.rotation.x = Math.PI / 2.3;
    coreGroup.add(ring1);

    const ringGeom2 = new THREE.RingGeometry(3.3, 3.32, 64);
    const ringMat2 = new THREE.MeshBasicMaterial({
      color: 0xf59e0b,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.3,
    });
    const ring2 = new THREE.Mesh(ringGeom2, ringMat2);
    ring2.rotation.x = -Math.PI / 3;
    coreGroup.add(ring2);

    // 4. Data Constellation Particles
    const particleCount = 120;
    const particleGeom = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount * 3; i += 3) {
      positions[i] = (Math.random() - 0.5) * 14;
      positions[i + 1] = (Math.random() - 0.5) * 14;
      positions[i + 2] = (Math.random() - 0.5) * 10;
    }
    particleGeom.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    const particleMat = new THREE.PointsMaterial({
      color: 0x38bdf8,
      size: 0.05,
      transparent: true,
      opacity: 0.5,
    });
    const particles = new THREE.Points(particleGeom, particleMat);
    scene.add(particles);

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
    scene.add(ambientLight);

    const amberLight = new THREE.PointLight(0xf59e0b, 3.5, 12);
    amberLight.position.set(0, 0, 0);
    scene.add(amberLight);

    const cyanLight = new THREE.DirectionalLight(0x06b6d4, 1.8);
    cyanLight.position.set(5, 6, 6);
    scene.add(cyanLight);

    const rimLight = new THREE.DirectionalLight(0xffffff, 0.8);
    rimLight.position.set(-6, -4, -4);
    scene.add(rimLight);

    // Pointer Tracking
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = (e.clientX / window.innerWidth) * 2 - 1;
      mouseY = -(e.clientY / window.innerHeight) * 2 + 1;
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });

    // Window Resize Handler
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener("resize", handleResize);

    // Camera & Core Choreography State
    let currentCamX = 0;
    let currentCamY = 0;
    let currentCamZ = 8.5;
    let currentCoreX = 0;
    let currentCoreY = 0;
    let currentCoreScale = 1.0;
    let currentExpansion = 1.0;

    // Animation Loop
    let animationFrameId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      // Lerp mouse interaction
      targetX += (mouseX - targetX) * 0.05;
      targetY += (mouseY - targetY) * 0.05;

      // Determine chapter-based choreography targets
      const chapter = activeChapterRef.current;
      let targetCamX = 0;
      let targetCamY = 0;
      let targetCamZ = 8.5;
      let targetCoreX = 0;
      let targetCoreY = 0;
      let targetCoreScale = 1.0;
      let targetExpansion = 1.0;
      let particleSpeed = 0.02;

      switch (chapter) {
        case "chapter-hero":
          targetCamX = 0;
          targetCamY = 0;
          targetCamZ = 8.5;
          targetCoreX = 0;
          targetCoreY = 0;
          targetCoreScale = 1.0;
          targetExpansion = 1.0;
          particleSpeed = 0.02;
          break;
        case "chapter-builder":
          // Exploded blueprint view: panels expand outward, illustrating concurrency and systems engineering
          targetCamX = 0.35;
          targetCamY = -0.3;
          targetCamZ = 7.4;
          targetCoreX = -0.25;
          targetCoreY = -0.1;
          targetCoreScale = 1.08;
          targetExpansion = 2.4;
          particleSpeed = 0.04;
          break;
        case "chapter-architect":
          // Core shifts to right side, framing project cards on the left
          targetCamX = 0;
          targetCamY = 0.2;
          targetCamZ = 7.8;
          targetCoreX = 2.3;
          targetCoreY = 0.2;
          targetCoreScale = 0.95;
          targetExpansion = 1.7;
          particleSpeed = 0.03;
          break;
        case "chapter-human":
          // Core shifts left, constellation expands to represent community nodes
          targetCamX = -0.5;
          targetCamY = -0.2;
          targetCamZ = 8.0;
          targetCoreX = -2.2;
          targetCoreY = 0;
          targetCoreScale = 0.95;
          targetExpansion = 1.8;
          particleSpeed = 0.05;
          break;
        case "chapter-beyond":
          // Deep space warp sensation
          targetCamX = 0;
          targetCamY = 0;
          targetCamZ = 6.8;
          targetCoreX = 0;
          targetCoreY = 0;
          targetCoreScale = 1.15;
          targetExpansion = 1.4;
          particleSpeed = 0.09;
          break;
        case "chapter-faq":
        case "chapter-contact":
          // Convergence into singularity
          targetCamX = 0;
          targetCamY = 0.4;
          targetCamZ = 8.2;
          targetCoreX = 0;
          targetCoreY = 0.4;
          targetCoreScale = 1.0;
          targetExpansion = 0.95;
          particleSpeed = 0.02;
          break;
        default:
          break;
      }

      // Smooth lerp camera position
      currentCamX += (targetCamX - currentCamX) * 0.035;
      currentCamY += (targetCamY - currentCamY) * 0.035;
      currentCamZ += (targetCamZ - currentCamZ) * 0.035;
      camera.position.set(currentCamX, currentCamY, currentCamZ);

      // Smooth lerp core group position and scale
      currentCoreX += (targetCoreX - currentCoreX) * 0.035;
      currentCoreY += (targetCoreY - currentCoreY) * 0.035;
      currentCoreScale += (targetCoreScale - currentCoreScale) * 0.035;
      coreGroup.position.set(currentCoreX, currentCoreY, 0);
      coreGroup.scale.set(currentCoreScale, currentCoreScale, currentCoreScale);

      // Smooth lerp panel expansion
      currentExpansion += (targetExpansion - currentExpansion) * 0.035;

      // Rotation reacts to cursor and time
      coreGroup.rotation.y = elapsedTime * 0.15 + targetX * 0.6;
      coreGroup.rotation.x = Math.sin(elapsedTime * 0.2) * 0.08 - targetY * 0.4;

      // Floating Fragmented Monolith Panels with chapter expansion
      panels.forEach((p, idx) => {
        const baseRadius = 2.1 + (idx % 2) * 0.35;
        const angle = (idx / panelCount) * Math.PI * 2 + elapsedTime * 0.08;
        const r = baseRadius * currentExpansion;
        p.position.x = Math.cos(angle) * r;
        p.position.z = Math.sin(angle) * r;
        p.rotation.y += 0.005 * (idx % 2 === 0 ? 1 : -1);
      });

      // Reactor pulsation
      const pulse = 1 + Math.sin(elapsedTime * 2.5) * 0.07;
      innerCore.scale.set(pulse, pulse, pulse);
      innerCore.rotation.y = -elapsedTime * 0.35;
      innerCore.rotation.z = elapsedTime * 0.2;

      solidInner.rotation.x = elapsedTime * 0.25;
      solidInner.rotation.y = elapsedTime * 0.3;

      // Rings dynamic tilt
      ring1.rotation.z = elapsedTime * 0.12;
      ring2.rotation.z = -elapsedTime * 0.18;

      // Particles drift with chapter speed
      particles.rotation.y = elapsedTime * particleSpeed;

      renderer.render(scene, camera);
    };

    animate();

    // Clean up on unmount
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);

      // Dispose Three.js resources
      innerGeom.dispose();
      innerMat.dispose();
      solidInnerGeom.dispose();
      solidInnerMat.dispose();
      panelMaterial.dispose();
      edgeMaterial.dispose();
      ringGeom.dispose();
      ringMat.dispose();
      ringGeom2.dispose();
      ringMat2.dispose();
      particleGeom.dispose();
      particleMat.dispose();

      panels.forEach((p) => {
        p.geometry.dispose();
      });

      renderer.dispose();
      if (renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 w-full h-screen pointer-events-none z-0 overflow-hidden"
      aria-hidden="true"
    >
      {!hasWebGL && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          {/* High-fidelity SVG Blueprint Mandala Fallback */}
          <div className="relative w-80 h-80 rounded-full border border-amber-500/20 animate-spin" style={{ animationDuration: "35s" }}>
            <div className="absolute inset-4 rounded-full border border-dashed border-cyan-500/30 animate-spin" style={{ animationDuration: "20s", animationDirection: "reverse" }} />
            <div className="absolute inset-12 rounded-full border border-amber-500/40 flex items-center justify-center">
              <div className="w-16 h-16 border-2 border-amber-500 rotate-45 animate-pulse" />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
