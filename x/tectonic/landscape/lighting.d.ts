import { AbstractMesh } from "@babylonjs/core/Meshes/abstractMesh.js";
import { V3 } from "../../toolbox/v3.js";
import { Theater } from "../theater/theater.js";
export interface ShadowControl {
    addCaster(mesh: AbstractMesh): void;
    removeCaster(mesh: AbstractMesh): void;
}
export declare function setupLighting({ sun, shadows, theater: { scene, renderLoop }, }: {
    theater: Theater;
    sun: {
        direction: V3;
        distance: number;
        intensity: number;
    };
    shadows: undefined | {
        softness: number;
    };
}): {
    shadowControl: ShadowControl;
    dispose(): void;
};
