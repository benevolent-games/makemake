import { Mesh } from "@babylonjs/core/Meshes/mesh.js";
import { ShadowControl } from "../lighting.js";
import { Randomly } from "../../../toolbox/randomly.js";
import { TerrainGenerator } from "../terrain-generator.js";
declare type Range = {
    min: number;
    max: number;
};
export interface TreeDetails {
    numberOfTrees: number;
    spaceBetweenTrees: number;
    maxTreePlantingAttempts: number;
    randomizationRanges: {
        scale: Range;
        heightAdjustment: Range;
    };
}
export declare function sprinkleTrees({ mapSize, randomly, treeBases, cliffSlopeFactor, shadowControl, terrainGenerator, treeDetails: { numberOfTrees, spaceBetweenTrees, randomizationRanges, maxTreePlantingAttempts, }, }: {
    treeDetails: TreeDetails;
    mapSize: number;
    randomly: Randomly;
    treeBases: Mesh[][];
    cliffSlopeFactor: number;
    shadowControl: ShadowControl;
    terrainGenerator: TerrainGenerator;
}): void;
export {};
