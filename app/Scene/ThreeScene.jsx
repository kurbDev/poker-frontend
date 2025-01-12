"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { clone } from "three/examples/jsm/utils/SkeletonUtils";

export default function ThreeScene() {
  const mountRef = useRef(null);

  useEffect(() => {
    const mount = mountRef.current;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, mount.clientWidth / mount.clientHeight, 0.1, 1000);
    camera.position.set(0, 10, 30);

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(mount.clientWidth, mount.clientHeight);
    renderer.shadowMap.enabled = true;
    mount.appendChild(renderer.domElement);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.6);
    directionalLight.position.set(10, 15, 5);
    directionalLight.castShadow = true; 
    scene.add(directionalLight);

    const gltfLoader = new GLTFLoader();
    const textureLoader = new THREE.TextureLoader();

    gltfLoader.load("/Scene/Models/desk.glb", function (gltf) {
      const desk = gltf.scene;

      desk.scale.set(15, 15, 15); 
      desk.position.set(0, -15, 0);
      desk.castShadow = true;
      desk.receiveShadow = true;

      const deskMaterial = new THREE.MeshStandardMaterial({
        color: 0x8B4513, // Brown color
        normalMap: textureLoader.load("/Scene/Textures/desk_normal.png"),
        // displacementMap: textureLoader.load("/Scene/Textures/desk_height.png"),
        displacementScale: 0.1,
      });

      desk.traverse((child) => {
        if (child.isMesh) {
          child.material = deskMaterial;
          child.castShadow = true;
          child.receiveShadow = true;
        }
      });

      scene.add(desk);
    });

    const ranks = [
      "ace", "2", "3", "4", "5", "6", "7", "8", "9", "10", "jack", "queen", "king",
    ];
    const suits = ["spades", "hearts", "diamonds", "clubs"];

    gltfLoader.load("/Scene/Models/poker_card_model.gltf", function (gltf) {
      const originalCard = gltf.scene;
      ranks.forEach((rank, rIndex) => {
        suits.forEach((suit, sIndex) => {
          const card = originalCard.clone(true);

          card.matrix.identity();
          card.position.set(rIndex * 15, -sIndex * 20, 0);
          card.updateMatrix();

          card.traverse(function (child) {
            if (child.isMesh && child.name === "Cube") {
              const texture = textureLoader.load(`/cards/updated_images/${rank}_of_${suit}.png`);
              child.material = new THREE.MeshStandardMaterial({ map: texture });

              child.matrix.identity();
              child.position.set(rIndex * 15, -sIndex * 20, 0);
              child.updateMatrix();
            }
          });

          scene.add(card);
        });
      });
    });

    function animate() {
      controls.update();
      renderer.render(scene, camera);
      requestAnimationFrame(animate);
    }
    animate();

    return () => {
      mount.removeChild(renderer.domElement);
    };
  }, []);

  return <div ref={mountRef} style={{ width: "100%", height: "100vh" }} />;
}
