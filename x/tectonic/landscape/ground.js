import { VertexBuffer } from "@babylonjs/core/Buffers/buffer.js";
import { MeshBuilder } from "@babylonjs/core/Meshes/meshBuilder.js";
import { VertexData } from "@babylonjs/core/Meshes/mesh.vertexData.js";
import { loadShader } from "../../toolbox/babylon/load-shader.js";
export async function makeGround({ theater: { scene }, mapSize, resolution, normalStrength, groundShaderUrl, cliffSlopeFactor, terrainGenerator, }) {
    const ground = MeshBuilder.CreateGround("ground", {
        width: mapSize,
        height: mapSize,
        subdivisions: resolution,
        updatable: true,
    }, scene);
    morphGround({ ground, terrainGenerator });
    const shader = await loadShader({
        scene,
        url: groundShaderUrl,
        label: "groundshader",
    });
    shader.assignInputs({
        // cliffSlopeFactor,
        traversable: cliffSlopeFactor,
        normalStrength,
        textureFrequency: 6,
        grassiness: 2,
        noiseFrequency: 40,
    });
    ground.material = shader.material;
    return ground;
}
function morphGround({ ground, terrainGenerator }) {
    function displace(x, y, z) {
        return [x, y + terrainGenerator.sampleHeight(x, z), z];
    }
    const positions = ground.getVerticesData(VertexBuffer.PositionKind);
    const newPositions = [];
    for (let vertexIndex = 0; vertexIndex < positions.length; vertexIndex += 3) {
        const x = positions[vertexIndex];
        const y = positions[vertexIndex + 1];
        const z = positions[vertexIndex + 2];
        const newxyz = displace(x, y, z);
        newPositions.push(...newxyz);
    }
    ground.setVerticesData(VertexBuffer.PositionKind, newPositions);
    const normals = [];
    VertexData.ComputeNormals(newPositions, ground.getIndices(), normals);
    ground.setVerticesData(VertexBuffer.NormalKind, normals);
}
//# sourceMappingURL=ground.js.map