import { Theater } from "../theater/theater.js";
import { TerrainGenerator } from "../landscape/terrain-generator.js";
export declare function makeNavigator({ mapSize, resolution, theater, cliffSlopeFactor, terrainGenerator, }: {
    mapSize: number;
    theater: Theater;
    resolution: number;
    cliffSlopeFactor: number;
    terrainGenerator: TerrainGenerator;
}): {};
