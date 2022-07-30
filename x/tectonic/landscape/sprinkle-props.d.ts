import { ShadowControl } from "./lighting.js";
import { Theater } from "../theater/theater.js";
import { Randomly } from "../../toolbox/randomly.js";
import { TerrainGenerator } from "./terrain-generator.js";
import { TreeDetails } from "./sprinkling/trees.js";
export declare function sprinkleProps({ theater: { scene }, mapSize, randomly, treeDetails, shadowControl, cliffSlopeFactor, terrainGenerator, forestAssetsUrl, }: {
    theater: Theater;
    mapSize: number;
    randomly: Randomly;
    shadowControl: ShadowControl;
    cliffSlopeFactor: number;
    terrainGenerator: TerrainGenerator;
    treeDetails: TreeDetails;
    forestAssetsUrl: string;
}): Promise<void>;
