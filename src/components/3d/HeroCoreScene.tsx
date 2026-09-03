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

    // Pointer and Scroll Tracking
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;
    let scrollY = typeof window !== "undefined" ? window.scrollY : 0;
    let smoothScrollY = scrollY;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = (e.clientX / window.innerWidth) * 2 - 1;
      mouseY = -(e.clientY / window.innerHeight) * 2 + 1;
    };

    const handleScroll = () => {
      scrollY = window.scrollY;
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("scroll", handleScroll, { passive: true });

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

    // Animation Loop with modern THREE.Timer
    let animationFrameId: number;
    const timer = new THREE.Timer();

    const animate = (timestamp?: number) => {
      animationFrameId = requestAnimationFrame(animate);
      timer.update(timestamp);
      const elapsedTime = timer.getElapsed();

      // Lerp mouse interaction
      targetX += (mouseX - targetX) * 0.05;
      targetY += (mouseY - targetY) * 0.05;

      // Smooth lerp scroll progress
      smoothScrollY += (scrollY - smoothScrollY) * 0.08;
      const docHeight = (typeof document !== "undefined" ? document.documentElement.scrollHeight - window.innerHeight : 3000) || 3000;
      const scrollRatio = Math.min(Math.max(smoothScrollY / docHeight, 0), 1);

      // Determine chapter-based choreography targets
      const isMobile = typeof window !== "undefined" ? window.innerWidth < 768 : false;
      const chapter = activeChapterRef.current;
      let targetCamX = 0;
      let targetCamY = 0;
      let targetCamZ = 8.5;
      let targetCoreX = 0;
      let targetCoreY = 0;
      let targetCoreScale = 1.0;
      let targetExpansion = 1.0;
      let particleSpeed = 0.02;
      let targetEmissive = 0.3;
      let targetLightIntensity = 3.5;

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
          targetEmissive = 0.3;
          targetLightIntensity = 3.5;
          break;
        case "chapter-builder":
          // DYNAMIC CONCURRENCY DISASSEMBLY: Core explodes outward, decoupling rings, threads & monolithic subsystems
          targetCamX = 0.2;
          targetCamY = -0.15;
          targetCamZ = 7.4;
          targetCoreX = isMobile ? 0 : -0.2;
          targetCoreY = -0.1;
          targetCoreScale = 1.08;
          targetExpansion = 2.85; // Dramatic physical explosion outward
          particleSpeed = 0.045;
          targetEmissive = 0.42;
          targetLightIntensity = 4.2;
          break;
        case "chapter-architect":
          // ARCHITECTURAL FRAMING: Core slides right, framing pipeline blueprints & distributed labs on the left
          targetCamX = 0;
          targetCamY = 0.1;
          targetCamZ = 8.2;
          targetCoreX = isMobile ? 0 : 2.7;
          targetCoreY = 0.15;
          targetCoreScale = 0.85;
          targetExpansion = 1.5;
          particleSpeed = 0.03;
          targetEmissive = 0.32;
          targetLightIntensity = 3.6;
          break;
        case "chapter-human":
          // Core shifts left, constellation expands to represent community nodes
          targetCamX = -0.3;
          targetCamY = -0.1;
          targetCamZ = 8.2;
          targetCoreX = isMobile ? 0 : -2.2;
          targetCoreY = 0;
          targetCoreScale = 0.85;
          targetExpansion = 1.6;
          particleSpeed = 0.05;
          targetEmissive = 0.3;
          targetLightIntensity = 3.5;
          break;
        case "chapter-beyond":
          // Deep space warp sensation
          targetCamX = 0;
          targetCamY = 0;
          targetCamZ = 7.2;
          targetCoreX = 0;
          targetCoreY = 0;
          targetCoreScale = 1.05;
          targetExpansion = 1.3;
          particleSpeed = 0.08;
          targetEmissive = 0.38;
          targetLightIntensity = 4.0;
          break;
        case "chapter-faq":
          targetCamX = 0;
          targetCamY = 0.2;
          targetCamZ = 8.2;
          targetCoreX = 0;
          targetCoreY = 0.2;
          targetCoreScale = 0.9;
          targetExpansion = 1.2;
          particleSpeed = 0.025;
          targetEmissive = 0.35;
          targetLightIntensity = 3.8;
          break;
        case "chapter-contact":
          // ELEGANT AMBER SINGULARITY: Radiant, condensed core with clean geometric clearances, perfectly centered
          targetCamX = 0;
          targetCamY = 0.05;
          targetCamZ = 8.5;
          targetCoreX = 0;
          targetCoreY = 0.05; // Centered gracefully between the dispatch console and editorial text
          targetCoreScale = 0.85; // Clean, prominent architectural scale
          targetExpansion = 0.78; // Gracefully condensed formation with zero geometry clipping
          particleSpeed = 0.035; // Gentle atmospheric constellation drift
          targetEmissive = 0.65; // Rich glowing metallic amber core
          targetLightIntensity = 4.8;
          break;
        default:
          break;
      }

      // Smooth expansion lerp: in builder chapter, scroll wheel provides dynamic interactive boost
      const scrollBoost = chapter === "chapter-builder" ? Math.min(scrollRatio * 1.5, 0.55) : 0;
      const finalExpansionTarget = targetExpansion + scrollBoost;
      currentExpansion += (finalExpansionTarget - currentExpansion) * 0.055;

      // Smooth lerp camera position directly to chapter targets
      currentCamX += (targetCamX - currentCamX) * 0.045;
      currentCamY += (targetCamY - currentCamY) * 0.045;
      currentCamZ += (targetCamZ - currentCamZ) * 0.045;
      camera.position.set(currentCamX, currentCamY, currentCamZ);

      // Smooth lerp core group position and scale
      currentCoreX += (targetCoreX - currentCoreX) * 0.04;
      currentCoreY += (targetCoreY - currentCoreY) * 0.04;
      currentCoreScale += (targetCoreScale - currentCoreScale) * 0.04;
      coreGroup.position.set(currentCoreX, currentCoreY, 0);
      coreGroup.scale.set(currentCoreScale, currentCoreScale, currentCoreScale);

      // Lerp emissive and light intensities for dimensional glowing effect
      solidInnerMat.emissiveIntensity += (targetEmissive - solidInnerMat.emissiveIntensity) * 0.05;
      amberLight.intensity += (targetLightIntensity - amberLight.intensity) * 0.05;

      // Rotation reacts to cursor, time, and scroll with majestic cinematic rate
      const coreSpinRate = chapter === "chapter-builder" ? 0.18 : 0.15;
      coreGroup.rotation.y = elapsedTime * coreSpinRate + targetX * 0.6;
      coreGroup.rotation.x = Math.sin(elapsedTime * 0.2) * 0.08 - targetY * 0.4;

      // Floating Fragmented Monolith Panels with Chapter Choreography
      panels.forEach((p, idx) => {
        const baseRadius = 2.1 + (idx % 2) * 0.35;
        const spinSpeed = chapter === "chapter-builder" ? 0.06 : 0.08;
        const angle = (idx / panelCount) * Math.PI * 2 + elapsedTime * spinSpeed;
        const r = baseRadius * currentExpansion;
        p.position.x = Math.cos(angle) * r;
        p.position.y = (((idx % 5) - 2) * 0.6) * Math.max(currentExpansion, 0.75);
        p.position.z = Math.sin(angle) * r;

        // Reset local rotations each frame to prevent accumulating erratic tilt angles
        p.rotation.x = 0;
        p.rotation.z = 0;

        // Scale panels slightly in contact chapter so geometry never clips or collides
        const pScale = chapter === "chapter-contact" ? 0.82 : 1.0;
        p.scale.set(pScale, pScale, pScale);

        // Dynamic panel orientation per chapter narrative
        if (chapter === "chapter-builder") {
          // Exploded CAD disassembly orientation: panels face radially outward with blueprint edges
          p.lookAt(p.position.x * 2, p.position.y, p.position.z * 2);
          p.rotation.z = Math.sin(elapsedTime * 1.5 + idx) * 0.15;
        } else {
          // Standard upright architectural telemetry orbit
          p.lookAt(0, p.position.y * 0.3, 0);
          p.rotation.y += 0.005 * (idx % 2 === 0 ? 1 : -1);
        }
      });

      // Reactor pulsation and layer dynamics
      const pulseRate = chapter === "chapter-contact" ? 3.2 : 2.5;
      const pulseAmp = chapter === "chapter-builder" ? 0.14 : 0.07;
      const pulse = 1 + Math.sin(elapsedTime * pulseRate) * pulseAmp;

      if (chapter === "chapter-builder") {
        // Disassembly: inner wireframe shell expands outward to expose inner core
        const layerSep = 1 + (currentExpansion - 1) * 0.18;
        innerCore.scale.set(pulse * layerSep, pulse * layerSep, pulse * layerSep);
        innerCore.rotation.y = -elapsedTime * 0.45;
        innerCore.rotation.z = elapsedTime * 0.3;
      } else if (chapter === "chapter-contact") {
        // Condensed singularity: compact golden reactor diamond
        innerCore.scale.set(0.9 * pulse, 0.9 * pulse, 0.9 * pulse);
        innerCore.rotation.y = -elapsedTime * 0.45;
        innerCore.rotation.z = elapsedTime * 0.3;
      } else {
        innerCore.scale.set(pulse, pulse, pulse);
        innerCore.rotation.y = -elapsedTime * 0.35;
        innerCore.rotation.z = elapsedTime * 0.2;
      }

      solidInner.rotation.x = elapsedTime * (chapter === "chapter-contact" ? 0.35 : 0.25);
      solidInner.rotation.y = elapsedTime * (chapter === "chapter-contact" ? 0.45 : 0.3);

      // Telemetry Rings: 3D Dimensional Tilts with zero edge-on flattening
      const ringScale = chapter === "chapter-contact"
        ? 0.75
        : (chapter === "chapter-builder" ? 0.85 + currentExpansion * 0.25 : 1.0);

      ring1.scale.set(ringScale, ringScale, ringScale);
      ring2.scale.set(ringScale * 1.15, ringScale * 1.15, ringScale * 1.15);

      ring1.rotation.x = (Math.PI / 2.3) + (chapter === "chapter-builder" ? (currentExpansion - 1) * 0.15 : 0);
      ring2.rotation.x = (-Math.PI / 3) - (chapter === "chapter-builder" ? (currentExpansion - 1) * 0.2 : 0);
      ring1.rotation.z = elapsedTime * (chapter === "chapter-contact" ? 0.2 : (chapter === "chapter-builder" ? 0.2 : 0.12));
      ring2.rotation.z = -elapsedTime * (chapter === "chapter-contact" ? 0.25 : (chapter === "chapter-builder" ? 0.28 : 0.18));

      // Constellation particles speed
      particles.rotation.y = elapsedTime * particleSpeed;

      renderer.render(scene, camera);
    };

    animate();

    // Clean up on unmount
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("scroll", handleScroll);
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

      timer.dispose?.();
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
