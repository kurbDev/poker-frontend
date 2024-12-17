"use client"; // Mark this as a client-side component in Next.js

import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import Card from "./Card";

const SceneComponent = () => {
  const mountRef = useRef(null); // Reference to the mount point
  const cards = []; // Store Card instances

  useEffect(() => {
    // Check if the mount ref exists
    if (!mountRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.set(0, 2, 5);

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    mountRef.current.appendChild(renderer.domElement);

    // OrbitControls for camera
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;

    // Lighting
    const light = new THREE.HemisphereLight(0xffffff, 0x444444, 1);
    light.position.set(0, 20, 0);
    scene.add(light);

    // Clock for animations
    const clock = new THREE.Clock();

    // Load cards
    

    // Handle window resize
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener("resize", handleResize);

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);
      const deltaTime = clock.getDelta();

      // Update all cards' animations
      cards.forEach((card) => {
        card.update(deltaTime);
      });

      controls.update();
      renderer.render(scene, camera);
    };

    animate();

    // Cleanup on unmount
    return () => {
      window.removeEventListener("resize", handleResize);
      mountRef.current.removeChild(renderer.domElement);
      renderer.dispose();
    };
  }, []);

  return <div ref={mountRef} style={{ width: "100vw", height: "100vh" }} />;
};

export default SceneComponent;
