import { Matrix } from "@babylonjs/core/Maths/math.js";
import { v3 } from "../../toolbox/v3.js";
export function makeHand({ theater, cursor, ground }) {
    return {
        pickPointOnGround() {
            const { x, y } = cursor.getCoordinates();
            const ray = theater.scene.createPickingRay(x, y, Matrix.Identity(), theater.scene.activeCamera);
            const fastCheck = true;
            const info = ray.intersectsMesh(ground, fastCheck);
            return info.hit
                ? v3.fromBabylon(info.pickedPoint)
                : undefined;
        }
    };
}
//# sourceMappingURL=hand.js.map