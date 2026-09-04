"use client";

import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";

interface HeroCoreSceneProps {
  activeChapter?: string;
}

/**
 * ARCHITECTURAL MONOLITH 3D STATE MACHINE
 *
 * Implements the 8-state narrative engine:
 * STATE 01 — IDLE: Organic breathing movement, subtle metallic glints.
 * STATE 02 — POINTER: Damped cursor response with physical spring mechanics.
 * STATE 03 — SCROLL: Camera begins descending with 3/4 perspective initiation.
 * STATE 04 — ENGINEER: Monolith locks into crystalline columnar structural alignment.
 * STATE 05 — BUILDER: Plates separate into modular subsystems (concurrency / ERP).
 * STATE 06 — ARCHITECT: Reorients to frame distributed system blueprints on the left.
 * STATE 07 — HUMAN: Transforms into an interconnected constellation node network.
 * STATE 08 — FINAL: Reconverges into a unified, stable monolithic monument.
 */
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

    // 1. WebGL Support Test
    let glAvailable = true;
    try {
      const canvas = document.createElement("canvas");
      const gl = canvas.getContext("webgl2") || canvas.getContext("webgl") || canvas.getContext("experimental-webgl");
      if (!gl) glAvailable = false;
    } catch {
      glAvailable = false;
    }

    if (!glAvailable) {
      setTimeout(() => setHasWebGL(false), 0);
      return;
    }

    // 2. Hardware / Device Tiering
    const isMobile = window.innerWidth < 768;
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const maxDPR = isMobile ? 1.25 : Math.min(window.devicePixelRatio, 1.75);

    // 3. Scene, Camera, Fog Setup
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x07090e, 0.038);

    const camera = new THREE.PerspectiveCamera(
      42,
      window.innerWidth / window.innerHeight,
      0.1,
      100
    );
    camera.position.set(0, 0, 8.5);

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({
        antialias: !isMobile,
        alpha: true,
        powerPreference: "high-performance",
      });
    } catch {
      setTimeout(() => setHasWebGL(false), 0);
      return;
    }

    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(maxDPR);
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.15;
    container.appendChild(renderer.domElement);

    // 4. Architectural Monolith Group
    const coreGroup = new THREE.Group();
    scene.add(coreGroup);

    // CENTRAL REACTOR CORE (Dual Prismatic Monolith)
    const innerCoreGeom = new THREE.OctahedronGeometry(1.15, 0);
    const innerWireMat = new THREE.MeshBasicMaterial({
      color: 0xf59e0b,
      wireframe: true,
      transparent: true,
      opacity: 0.55,
    });
    const innerCoreWire = new THREE.Mesh(innerCoreGeom, innerWireMat);
    coreGroup.add(innerCoreWire);

    const solidCoreGeom = new THREE.OctahedronGeometry(0.82, 0);
    const solidCoreMat = new THREE.MeshStandardMaterial({
      color: 0x11141c,
      roughness: 0.18,
      metalness: 0.92,
      emissive: 0xf59e0b,
      emissiveIntensity: 0.28,
    });
    const solidCore = new THREE.Mesh(solidCoreGeom, solidCoreMat);
    coreGroup.add(solidCore);

    // FLOATING FRAGMENTED MONOLITH PANELS (15 Architectural Exoskeleton Monoliths)
    const panelCount = 15;
    const panels: THREE.Mesh[] = [];
    const panelMat = new THREE.MeshStandardMaterial({
      color: 0x0c1017,
      metalness: 0.9,
      roughness: 0.25,
      transparent: true,
      opacity: 0.42,
    });
    const edgeMat = new THREE.LineBasicMaterial({
      color: 0x06b6d4,
      transparent: true,
      opacity: 0.65,
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
      const panel = new THREE.Mesh(pGeom, panelMat);

      const pX = Math.cos(angle) * radius;
      const pY = ((i % 5) - 2) * 0.6;
      const pZ = Math.sin(angle) * radius;

      panel.position.set(pX, pY, pZ);
      panel.lookAt(0, pY, 0);

      // Blueprint edge lines
      const edges = new THREE.EdgesGeometry(pGeom);
      const edgeLine = new THREE.LineSegments(edges, edgeMat);
      panel.add(edgeLine);

      panelGroup.add(panel);
      panels.push(panel);
    }

    // TELEMETRY ORBITAL RINGS
    const ring1Geom = new THREE.RingGeometry(2.7, 2.72, isMobile ? 32 : 64);
    const ring1Mat = new THREE.MeshBasicMaterial({
      color: 0x06b6d4,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.45,
    });
    const ring1 = new THREE.Mesh(ring1Geom, ring1Mat);
    ring1.rotation.x = Math.PI / 2.3;
    coreGroup.add(ring1);

    const ring2Geom = new THREE.RingGeometry(3.25, 3.27, isMobile ? 32 : 64);
    const ring2Mat = new THREE.MeshBasicMaterial({
      color: 0xf59e0b,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.28,
    });
    const ring2 = new THREE.Mesh(ring2Geom, ring2Mat);
    ring2.rotation.x = -Math.PI / 2.8;
    coreGroup.add(ring2);

    // ATMOSPHERIC DATA PARTICLES
    const particleCount = isMobile ? 40 : 120;
    const particleGeom = new THREE.BufferGeometry();
    const posArray = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount * 3; i += 3) {
      posArray[i] = (Math.random() - 0.5) * 12;
      posArray[i + 1] = (Math.random() - 0.5) * 12;
      posArray[i + 2] = (Math.random() - 0.5) * 8;
    }
    particleGeom.setAttribute("position", new THREE.BufferAttribute(posArray, 3));
    const particleMat = new THREE.PointsMaterial({
      color: 0x38bdf8,
      size: isMobile ? 0.04 : 0.045,
      transparent: true,
      opacity: 0.45,
    });
    const particles = new THREE.Points(particleGeom, particleMat);
    scene.add(particles);

    // 5. Lighting Architecture
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.45);
    scene.add(ambientLight);

    const amberLight = new THREE.PointLight(0xf59e0b, 3.2, 11);
    amberLight.position.set(0, 0, 0);
    scene.add(amberLight);

    const cyanLight = new THREE.DirectionalLight(0x38bdf8, 1.6);
    cyanLight.position.set(5, 5, 6);
    scene.add(cyanLight);

    const rimLight = new THREE.DirectionalLight(0xffffff, 0.75);
    rimLight.position.set(-6, -4, -4);
    scene.add(rimLight);

    const targetRing1Color = new THREE.Color(0x06b6d4);
    const targetCyanLightColor = new THREE.Color(0x38bdf8);

    // 6. Pointer, Velocity & Scroll Tracking
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;
    let scrollY = window.scrollY || 0;
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

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener("resize", handleResize);

    // 7. Choreography Target States
    let currentCamX = 0;
    let currentCamY = 0;
    let currentCamZ = 8.5;
    let currentCoreX = 0;
    let currentCoreY = 0;
    let currentCoreScale = 1.0;
    let currentExpansion = 1.0;

    // 8. Animation Loop
    let animationFrameId: number;
    const timer = new THREE.Timer();
    let isPageVisible = !document.hidden;

    const handleVisibilityChange = () => {
      isPageVisible = !document.hidden;
      if (isPageVisible) {
        timer.update();
      }
    };
    document.addEventListener("visibilitychange", handleVisibilityChange);

    const animate = (timestamp?: number) => {
      animationFrameId = requestAnimationFrame(animate);

      if (!isPageVisible) return;

      timer.update(timestamp);
      const elapsedTime = timer.getElapsed();

      // If user prefers reduced motion, lock to an elegant static isometric composition
      if (prefersReducedMotion) {
        camera.position.set(0, 0, 8.5);
        coreGroup.position.set(0, 0, 0);
        coreGroup.scale.set(1.0, 1.0, 1.0);
        coreGroup.rotation.set(0.12, 0.35, 0);
        renderer.render(scene, camera);
        return;
      }

      // Smooth pointer lerp with physical damping
      targetX += (mouseX - targetX) * 0.045;
      targetY += (mouseY - targetY) * 0.045;

      smoothScrollY += (scrollY - smoothScrollY) * 0.07;
      const docHeight = Math.max(document.documentElement.scrollHeight - window.innerHeight, 1000);
      const scrollRatio = Math.min(Math.max(smoothScrollY / docHeight, 0), 1);

      // STATE MACHINE TARGET VALUES
      const chapter = activeChapterRef.current;
      let targetCamX = 0;
      let targetCamY = 0;
      let targetCamZ = 8.5;
      let targetCoreX = 0;
      let targetCoreY = 0;
      let targetCoreScale = 1.0;
      let targetExpansion = 1.0;
      let particleSpeed = 0.02;
      let targetEmissive = 0.28;
      let targetLightIntensity = 3.2;
      let targetRing1Hex = 0x06b6d4;
      let targetLightHex = 0x38bdf8;

      switch (chapter) {
        case "chapter-hero": {
          // STATE 01 (IDLE) / STATE 02 (POINTER) / STATE 03 (SCROLL) / STATE 04 (ENGINEER)
          const heroScroll = Math.min(smoothScrollY / (window.innerHeight || 800), 1);
          targetCamX = heroScroll * 0.3;
          targetCamY = -heroScroll * 0.35;
          targetCamZ = 9.0 - heroScroll * 0.5;
          targetExpansion = 1.0 + heroScroll * 0.25;
          // Clean architectural framing: Monolith sits on right half on desktop, left side dedicated to typography
          targetCoreX = isMobile ? 0 : 2.05;
          targetCoreY = isMobile ? 0.25 : 0;
          targetCoreScale = isMobile ? 0.72 : 0.95;
          particleSpeed = 0.02 + heroScroll * 0.015;
          targetEmissive = 0.32 + heroScroll * 0.08;
          targetLightIntensity = 3.4;
          break;
        }

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
          // ARCHITECTURAL FRAMING: Core slides right, framing pipeline blueprints on the left
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
          // Constellation expands, core shifts left to represent community node network
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
          targetRing1Hex = 0x10b981;
          targetLightHex = 0x34d399;
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
          targetCoreY = 0.05;
          targetCoreScale = 0.85;
          targetExpansion = 0.78;
          particleSpeed = 0.035;
          targetEmissive = 0.65;
          targetLightIntensity = 4.8;
          break;

        default:
          break;
      }

      // STATE 03 (SCROLL): Dynamic interactive boost in builder chapter
      const scrollBoost = chapter === "chapter-builder" ? Math.min(scrollRatio * 1.5, 0.55) : 0;
      const finalExpansion = targetExpansion + scrollBoost;
      currentExpansion += (finalExpansion - currentExpansion) * 0.055;

      // Smooth Camera & Core Position Lerp
      currentCamX += (targetCamX - currentCamX) * 0.045;
      currentCamY += (targetCamY - currentCamY) * 0.045;
      currentCamZ += (targetCamZ - currentCamZ) * 0.045;
      camera.position.set(currentCamX, currentCamY, currentCamZ);

      currentCoreX += (targetCoreX - currentCoreX) * 0.04;
      currentCoreY += (targetCoreY - currentCoreY) * 0.04;
      currentCoreScale += (targetCoreScale - currentCoreScale) * 0.04;
      coreGroup.position.set(currentCoreX, currentCoreY, 0);
      coreGroup.scale.set(currentCoreScale, currentCoreScale, currentCoreScale);

      // Emissive and Lighting Lerp
      solidCoreMat.emissiveIntensity += (targetEmissive - solidCoreMat.emissiveIntensity) * 0.05;
      amberLight.intensity += (targetLightIntensity - amberLight.intensity) * 0.05;
      targetRing1Color.setHex(targetRing1Hex);
      targetCyanLightColor.setHex(targetLightHex);
      ring1Mat.color.lerp(targetRing1Color, 0.04);
      cyanLight.color.lerp(targetCyanLightColor, 0.04);

      // Rotation reacts to cursor, time, and active chapter
      const coreSpin = chapter === "chapter-builder" ? 0.18 : 0.14;
      coreGroup.rotation.y = elapsedTime * coreSpin + targetX * 0.6;
      coreGroup.rotation.x = Math.sin(elapsedTime * 0.2) * 0.08 - targetY * 0.4;

      // Floating Architectural Plates Animation
      panels.forEach((p, idx) => {
        const baseRadius = 2.1 + (idx % 2) * 0.35;
        const spinSpeed = chapter === "chapter-builder" ? 0.06 : 0.08;
        const angle = (idx / panelCount) * Math.PI * 2 + elapsedTime * spinSpeed;
        const r = baseRadius * currentExpansion;

        p.position.x = Math.cos(angle) * r;
        p.position.y = (((idx % 5) - 2) * 0.6) * Math.max(currentExpansion, 0.75);
        p.position.z = Math.sin(angle) * r;

        // Reset local rotations each frame to prevent accumulating tilt angles
        p.rotation.x = 0;
        p.rotation.z = 0;

        const pScale = chapter === "chapter-contact" ? 0.82 : 1.0;
        p.scale.set(pScale, pScale, pScale);

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
        const layerSep = 1 + (currentExpansion - 1) * 0.18;
        innerCoreWire.scale.set(pulse * layerSep, pulse * layerSep, pulse * layerSep);
        innerCoreWire.rotation.y = -elapsedTime * 0.45;
        innerCoreWire.rotation.z = elapsedTime * 0.3;
      } else if (chapter === "chapter-contact") {
        innerCoreWire.scale.set(0.9 * pulse, 0.9 * pulse, 0.9 * pulse);
        innerCoreWire.rotation.y = -elapsedTime * 0.45;
        innerCoreWire.rotation.z = elapsedTime * 0.3;
      } else {
        innerCoreWire.scale.set(pulse, pulse, pulse);
        innerCoreWire.rotation.y = -elapsedTime * 0.35;
        innerCoreWire.rotation.z = elapsedTime * 0.2;
      }

      solidCore.rotation.x = elapsedTime * (chapter === "chapter-contact" ? 0.35 : 0.25);
      solidCore.rotation.y = elapsedTime * (chapter === "chapter-contact" ? 0.45 : 0.3);

      // Telemetry Rings: 3D Dimensional Tilts with dynamic decoupling
      const ringScale = chapter === "chapter-contact"
        ? 0.75
        : (chapter === "chapter-builder" ? 0.85 + currentExpansion * 0.25 : 1.0);

      ring1.scale.set(ringScale, ringScale, ringScale);
      ring2.scale.set(ringScale * 1.15, ringScale * 1.15, ringScale * 1.15);

      ring1.rotation.x = (Math.PI / 2.3) + (chapter === "chapter-builder" ? (currentExpansion - 1) * 0.15 : 0);
      ring2.rotation.x = (-Math.PI / 3) - (chapter === "chapter-builder" ? (currentExpansion - 1) * 0.2 : 0);
      ring1.rotation.z = elapsedTime * (chapter === "chapter-contact" ? 0.2 : (chapter === "chapter-builder" ? 0.2 : 0.12));
      ring2.rotation.z = -elapsedTime * (chapter === "chapter-contact" ? 0.25 : (chapter === "chapter-builder" ? 0.28 : 0.18));

      // Particles
      particles.rotation.y = elapsedTime * particleSpeed;

      renderer.render(scene, camera);
    };

    animate();

    // 9. Thorough Cleanup and Memory Disposal
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
      document.removeEventListener("visibilitychange", handleVisibilityChange);

      innerCoreGeom.dispose();
      innerWireMat.dispose();
      solidCoreGeom.dispose();
      solidCoreMat.dispose();
      panelMat.dispose();
      edgeMat.dispose();
      ring1Geom.dispose();
      ring1Mat.dispose();
      ring2Geom.dispose();
      ring2Mat.dispose();
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
          <div className="relative w-72 h-72 rounded-full border border-amber-500/20 animate-spin" style={{ animationDuration: "35s" }}>
            <div className="absolute inset-4 rounded-full border border-dashed border-cyan-500/30 animate-spin" style={{ animationDuration: "20s", animationDirection: "reverse" }} />
            <div className="absolute inset-12 rounded-full border border-amber-500/35 flex items-center justify-center">
              <div className="w-14 h-14 border-2 border-amber-500 rotate-45 animate-pulse" />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
