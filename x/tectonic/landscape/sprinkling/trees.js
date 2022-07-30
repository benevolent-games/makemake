import { Vector3 } from "@babylonjs/core/Maths/math.js";
import { v3 } from "../../../toolbox/v3.js";
export function sprinkleTrees({ mapSize, randomly, treeBases, cliffSlopeFactor, shadowControl, terrainGenerator, treeDetails: { numberOfTrees, spaceBetweenTrees, randomizationRanges, maxTreePlantingAttempts, }, }) {
    function between(range) {
        return randomly.randomBetween(range.min, range.max);
    }
    const treePositions = [];
    let attempts = 0;
    while (treePositions.length < numberOfTrees) {
        attempts += 1;
        if (attempts > maxTreePlantingAttempts) {
            console.error("failed to plant trees, too many failed attempts");
            break;
        }
        const x = (randomly.random() * mapSize) - (mapSize / 2);
        const z = (randomly.random() * mapSize) - (mapSize / 2);
        const density = terrainGenerator.sampleTreeDensity(x, z);
        const slope = terrainGenerator.sampleSlope(x, z);
        const probability = slope < cliffSlopeFactor
            ? density
            : 0;
        const alive = randomly.random() < probability;
        if (alive) {
            const position = [x, terrainGenerator.sampleHeight(x, z), z];
            const tooCloseToAnotherTree = treePositions.some(p => v3.distance(p, position) < spaceBetweenTrees);
            if (!tooCloseToAnotherTree)
                treePositions.push(position);
        }
    }
    let count = 0;
    for (const [x, y, z] of treePositions) {
        const scale = between(randomizationRanges.scale);
        const height = between(randomizationRanges.heightAdjustment);
        const position2 = v3.toBabylon([x, y + height, z]);
        const meshes = randomly.randomSelect(treeBases);
        for (const mesh of meshes) {
            const instance = mesh.createInstance("tree_" + (count++));
            shadowControl.addCaster(instance);
            instance.setAbsolutePosition(position2);
            instance.rotate(Vector3.Up(), randomly.random() * (Math.PI * 2));
            instance.scaling = new Vector3(scale, scale, scale);
        }
    }
}
//# sourceMappingURL=trees.js.map