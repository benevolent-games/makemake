import { MeshBuilder } from "@babylonjs/core/Meshes/meshBuilder.js";
import { Color3 } from "@babylonjs/core/Maths/math.color.js";
import { StandardMaterial } from "@babylonjs/core/Materials/standardMaterial.js";
// import {PBRMaterial} from "@babylonjs/core/Materials/PBR/pbrMaterial.js"
import { v3 } from "../../toolbox/v3.js";
export function spawnBox({ scene, size, position, color, unlit, }) {
    const box = MeshBuilder.CreateBox("box", { size }, scene);
    const material = new StandardMaterial("boxmaterial");
    if (unlit) {
        material.disableLighting = unlit;
        material.emissiveColor = new Color3(...color);
    }
    else {
        material.diffuseColor = new Color3(...color);
        material.ambientColor = new Color3(1, 1, 1);
    }
    material.zOffset = -10;
    // const material = new PBRMaterial("boxmaterial")
    // material.albedoColor = new Color3(1, 0, 0)
    // material.ambientColor = new Color3(1, 1, 1)
    box.material = material;
    box.position = v3.toBabylon(position);
    return box;
}
//# sourceMappingURL=spawn-box.js.map