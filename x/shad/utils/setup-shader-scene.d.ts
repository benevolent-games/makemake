import { Scene } from "@babylonjs/core/scene.js";
import { Engine } from "@babylonjs/core/Engines/engine.js";
import { ArcRotateCamera } from "@babylonjs/core/Cameras/arcRotateCamera.js";
export declare function setupShaderScene(): {
    canvas: HTMLCanvasElement;
    engine: Engine;
    scene: Scene;
    camera: ArcRotateCamera;
    renderloop: Set<() => void>;
};
