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
    const camera = new THREE.PerspectiveCamera(
      75,
      mount.clientWidth / mount.clientHeight,
      0.1,
      1000
    );
    camera.position.set(0, 10, 30);

    // Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(mount.clientWidth, mount.clientHeight);
    renderer.shadowMap.enabled = true;
    mount.appendChild(renderer.domElement);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;

    // Lighting
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
        color: 0x8b4513, // Brown color
        normalMap: textureLoader.load("/Scene/Textures/desk_normal.png"),
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
    const cardsGroup = new THREE.Group();
    const mixers = [];

    gltfLoader.load("/Scene/Models/poker_card_model.gltf", (gltf) => {
      const originalCard = gltf.scene;
      const animations = gltf.animations;

      ranks.forEach((rank, rIndex) => {
        suits.forEach((suit, sIndex) => {
          const card = originalCard.clone(true);

          card.position.set(rIndex * 15, 0, -sIndex * 20);

          card.traverse(function (child) {
            if (child.isMesh && child.name === "Cube") {
              const texture = textureLoader.load(`/cards/updated_images/${rank}_of_${suit}.png`);

              // Check if the child is a SkinnedMesh or normal mesh and set material accordingly
              if (child.isSkinnedMesh) {
                child.material = new THREE.MeshBasicMaterial({
                  map: texture,
                  skinning: true, // Enable skinning for SkinnedMesh
                });
              } else {
                child.material = new THREE.MeshBasicMaterial({
                  map: texture,
                  skinning: false, // Disable skinning for regular meshes
                });
              }
            }
          });

          const mixer = new THREE.AnimationMixer(card);
          const cardUpAction = mixer.clipAction(animations.find((clip) => clip.name === "CardUp"));
          
          console.log("CardUp found: ", cardUpAction);

          if (cardUpAction) {
            cardUpAction.setLoop(THREE.LoopOnce); 
            cardUpAction.clampWhenFinished = true;
            cardUpAction.play();
          }

          mixers.push(mixer);
          cardsGroup.add(card);
        });
      });

      scene.add(cardsGroup);
    });

    textureLoader.load("/Scene/Textures/height.png", (heightmap) => {
      const planeGeometry = new THREE.PlaneGeometry(20, 20, 256, 256);
      planeGeometry.rotateX(-Math.PI / 2);

      const planeMaterial = new THREE.MeshStandardMaterial({
        color: 0x88cc88,
        displacementMap: heightmap, 
        displacementScale: 5,
        wireframe: false,
      });

      const heightmapPlane = new THREE.Mesh(planeGeometry, planeMaterial);
      heightmapPlane.position.set(0, 0, -50);
      heightmapPlane.castShadow = true;
      heightmapPlane.receiveShadow = true;

      scene.add(heightmapPlane);
    });

    const boxGeometry = new THREE.BoxGeometry(3, 3, 3);
    const boxMaterial = new THREE.MeshStandardMaterial({ color: 0x00ff00 });
    const box = new THREE.Mesh(boxGeometry, boxMaterial);
    box.position.set(10, 0, -30); 
    box.castShadow = true;
    box.receiveShadow = true;

    scene.add(box);

    function animate() {
      controls.update(); 
      box.rotation.x += 0.01;
      box.rotation.y += 0.01;

      mixers.forEach((mixer) => mixer.update(clock.getDelta()));

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
