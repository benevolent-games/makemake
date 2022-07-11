import { Color3 } from "@babylonjs/core/Maths/math.color.js";
import { PBRMaterial } from "@babylonjs/core/Materials/PBR/pbrMaterial.js";
import { loadGlb } from "../../toolbox/babylon/load-glb.js";
import { sprinkleTrees } from "./sprinkling/trees.js";
export async function sprinkleProps({ theater: { scene }, mapSize, randomly, treeDetails, shadowControl, cliffSlopeFactor, terrainGenerator, forestAssetsUrl, }) {
    const assets = await loadGlb(scene, forestAssetsUrl);
    // hide all base meshes
    for (const mesh of assets.meshes)
        mesh.isVisible = false;
    // enable ambient color from scene
    const ambientColor = new Color3(1, 1, 1);
    for (const material of assets.materials) {
        if (material instanceof PBRMaterial)
            material.ambientColor = ambientColor;
    }
    // adjust the leaves material
    const leaves = assets.materials.find(m => m.name === "treeleaves");
    leaves.alphaCutOff = 0.45;
    leaves.subSurface.isTranslucencyEnabled = true;
    leaves.subSurface.translucencyIntensity = 0.8;
    sprinkleTrees({
        mapSize,
        randomly,
        shadowControl,
        terrainGenerator,
        cliffSlopeFactor,
        treeDetails,
        treeBases: [
            assets.meshes.filter(m => m.name.startsWith("tree1")),
            assets.meshes.filter(m => m.name.startsWith("tree2")),
        ],
    });
}
//# sourceMappingURL=sprinkle-props.js.map