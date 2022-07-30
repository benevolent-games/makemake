import { ArcRotateCamera } from "@babylonjs/core/Cameras/arcRotateCamera.js";
import { Cursor } from "../cursor/cursor.js";
import { Theater } from "../theater/theater.js";
import { InputTracker } from "../inputs/input-tracker.js";
export declare function makeAerialCamera({ theater, cursor, inputs, mapSize, radius, sensitivity, sampleHeight, }: {
    theater: Theater;
    cursor: Cursor;
    inputs: InputTracker;
    mapSize: number;
    radius: {
        min: number;
        max: number;
        initial: number;
    };
    sensitivity: {
        wheel: number;
    };
    sampleHeight: (x: number, y: number) => number;
}): ArcRotateCamera;
