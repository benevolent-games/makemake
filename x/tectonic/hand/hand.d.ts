import { GroundMesh } from "@babylonjs/core/Meshes/groundMesh.js";
import { V3 } from "../../toolbox/v3.js";
import { Cursor } from "../cursor/cursor.js";
import { Theater } from "../theater/theater.js";
export declare function makeHand({ theater, cursor, ground }: {
    cursor: Cursor;
    theater: Theater;
    ground: GroundMesh;
}): {
    pickPointOnGround(): V3 | undefined;
};
