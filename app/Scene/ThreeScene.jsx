"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

export default function ThreeScene() {
  const mountRef = useRef(null);

  useEffect(() => {
    const mount = mountRef.current;

    // Scene, Camera, Renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      mount.clientWidth / mount.clientHeight,
      0.1,
      1000
    );
    camera.position.set(0, 10, 30);

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(mount.clientWidth, mount.clientHeight);
    mount.appendChild(renderer.domElement);

    // Orbit Controls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.6);
    directionalLight.position.set(10, 15, 5);
    scene.add(directionalLight);

    // Loaders
    const gltfLoader = new GLTFLoader();
    const textureLoader = new THREE.TextureLoader();

    // Card Images
    const cardImages = [];
    const ranks = [
      "ace", "2", "3", "4", "5", "6", "7", "8", "9", "10", "jack", "queen", "king"
    ];
    const suits = ["spades", "hearts", "diamonds", "clubs"];

    for (const rank of ranks) {
      for (const suit of suits) {
        cardImages.push(`/cards/updated_images/${rank}_of_${suit}.png`);
      }
    }

    gltfLoader.load("/Scene/Models/poker_card_model.gltf", function (gltf) {
      const originalCard = gltf.scene;
    
      ranks.forEach((rank, rIndex) => {
        suits.forEach((suit, sIndex) => {
          const card = originalCard.clone();
    
          card.traverse(function (child) {
            if (child.isMesh) {
              if (child.name === "Cube") {
                // Load the card texture dynamically
                const texture = textureLoader.load(`/cards/updated_images/${rank}_of_${suit}.png`);
                child.material.map = texture;
                child.material.map.needsUpdate = true;
              }
            }
          });
    
          // Position the card
          card.position.set(rIndex * 15, -sIndex * 20, 0);
          scene.add(card);
          console.log("Scene children: ", scene.children, " index: ", )
        });
      });
    });
    

    // Animation Loop
    function animate() {
      controls.update();
      renderer.render(scene, camera);
      requestAnimationFrame(animate);
    }
    animate();

    // Cleanup
    return () => {
      mount.removeChild(renderer.domElement);
    };
  }, []);

  return <div ref={mountRef} style={{ width: "100%", height: "100vh" }} />;
}
