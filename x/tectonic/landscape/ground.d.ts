import { Theater } from "../theater/theater.js";
import { TerrainGenerator } from "./terrain-generator.js";
export declare function makeGround({ theater: { scene }, mapSize, resolution, normalStrength, groundShaderUrl, cliffSlopeFactor, terrainGenerator, }: {
    theater: Theater;
    mapSize: number;
    resolution: number;
    normalStrength: number;
    groundShaderUrl: string;
    cliffSlopeFactor: number;
    terrainGenerator: TerrainGenerator;
}): Promise<import("@babylonjs/core/Meshes/groundMesh.js").GroundMesh>;
