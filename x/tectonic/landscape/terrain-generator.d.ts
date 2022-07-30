import { NoiseLayer } from "../types.js";
import { v3 } from "../../toolbox/v3.js";
import { Randomly } from "../../toolbox/randomly.js";
export declare type TerrainGenerator = ReturnType<typeof makeTerrainGenerator>;
export declare function makeTerrainGenerator({ randomly, layers, treeDensityScale, }: {
    randomly: Randomly;
    layers: NoiseLayer[];
    treeDensityScale: number;
}): {
    sampleHeight: (x: number, y: number) => number;
    sampleNormal: (x: number, z: number) => v3.V3;
    sampleSlope: (x: number, y: number) => number;
    sampleTreeDensity: (x: number, y: number) => number;
};
