import { Scene } from "@babylonjs/core/scene.js";
import { Engine } from "@babylonjs/core/Engines/engine.js";
export declare type Theater = ReturnType<typeof makeTheater>;
export declare function makeTheater(): {
    canvas: HTMLCanvasElement;
    scene: Scene;
    engine: Engine;
    renderLoop: Set<() => void>;
    onresize(): void;
    start(): void;
    stop(): void;
};
