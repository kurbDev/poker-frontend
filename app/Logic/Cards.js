import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import * as THREE from 'three';
class Card {
    #number;
    #symbol;
    #model;
    #mixer;

    constructor(number, symbol, modelPath, scene){
        this.#number = number;
        this.#symbol = symbol; 

        this.#loadModel(modelPath, scene)
    }

    
    #loadModel(modelPath, scene) {
        const loader = new GLTFLoader();
        loader.load(modelPath, (gltf) => {
            this.#model = gltf.scene;
            scene.add(this.#model);

            if (gltf.animations && gltf.animations.length > 0) {
                this.#mixer = new THREE.AnimationMixer(this.#model);
                gltf.animations.forEach((clip) => {
                    const action = this.#mixer.clipAction(clip);
                    action.play();
                });
            }
        }, undefined, (error) => {
            console.error("Error loading model:", error);
        });
    }

    update(deltaTime) {
        if (this.#mixer) {
            this.#mixer.update(deltaTime);
        }
    }

}

export default Card;