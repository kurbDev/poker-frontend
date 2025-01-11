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
    camera.position.set(0, 10, 20);

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

    const cardModels = [];
    const cardImages = []; // List of card image URLs

    // Populate card image names
    const ranks = [
      "ace",
      "2",
      "3",
      "4",
      "5",
      "6",
      "7",
      "8",
      "9",
      "10",
      "jack",
      "queen",
      "king",
    ];
    const suits = ["spades", "hearts", "diamonds", "clubs"];
    for (const rank of ranks) {
      for (const suit of suits) {
        cardImages.push(`/cards/images/${rank}_of_${suit}.gif`);
      }
    }

    // Load the Desk
    gltfLoader.load(
      "/Scene/Models/desk.glb",
      (gltf) => {
        const desk = gltf.scene;
        desk.scale.set(5, 5, 5); // Adjust the scale if necessary
        desk.position.set(0, -2, 0); // Adjust the position to be under the cards
        scene.add(desk);
      },
      undefined,
      (error) => console.error("Error loading desk:", error)
    );

    // Load the Card Model
    gltfLoader.load(
      "/Scene/Models/poker_card_raw.gltf",
      (gltf) => {
        const originalCard = gltf.scene;

        // Load the textures for each card and clone the model
        cardImages.forEach((image, i) => {
          // Clone the model
          const card = originalCard.clone();

          // Apply texture to the card
          const texture = textureLoader.load(image);
          const material = new THREE.MeshBasicMaterial({ map: texture });

          // Traverse the model and apply the texture to the appropriate mesh
          card.traverse((child) => {
            if (child.isMesh) {
              child.material = material;
            }
          });

          // Position the cards in a grid-like layout
          const row = Math.floor(i / 13);
          const col = i % 13;
          card.position.set(col * 1.5 - 9, row * -2 + 4, 0.1);

          // Add rotation animation
          const speed = 0.01;
          card.tick = () => {
            card.rotation.y += speed;
          };

          cardModels.push(card);
          scene.add(card);
        });

        // Animation loop
        const animate = () => {
          requestAnimationFrame(animate);

          cardModels.forEach((card) => {
            if (card.tick) card.tick();
          });

          controls.update();
          renderer.render(scene, camera);
        };
        animate();
      },
      undefined,
      (error) => console.error("Error loading poker card:", error)
    );

    // Cleanup
    return () => {
      mount.removeChild(renderer.domElement);
    };
  }, []);

  return <div ref={mountRef} style={{ width: "100%", height: "100vh" }} />;
}
