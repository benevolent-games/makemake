import { Scene } from "@babylonjs/core/scene.js";
import { V3 } from "../../toolbox/v3.js";
export declare function spawnBox({ scene, size, position, color, unlit, }: {
    scene: Scene;
    size: number;
    position: V3;
    color: V3;
    unlit: boolean;
}): import("@babylonjs/core/Meshes/mesh.js").Mesh;
