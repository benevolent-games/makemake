import "@babylonjs/core/Materials/Node/Blocks/index.js";
import { Texture } from "@babylonjs/core/Materials/Textures/texture.js";
import { NodeMaterial } from "@babylonjs/core/Materials/Node/nodeMaterial.js";
export async function loadShader({ url, scene, label }) {
    const material = new NodeMaterial(label, scene, { emitComments: false });
    material.setToDefault();
    await material.loadAsync(url)
        .then(() => material.build(false));
    const shader = {
        material,
        assignTextures(textures) {
            const blocks = material.getTextureBlocks();
            for (const [blockName, texturePath] of Object.entries(textures)) {
                const block = blocks.find(b => b.name === blockName);
                if (!block)
                    console.error(`cannot find texture block "${blockName}" for node material "${material.name}"`);
                block.texture = new Texture(texturePath, scene, {
                    invertY: false,
                });
            }
            return shader;
        },
        assignInputs(inputs) {
            const blocks = material.getInputBlocks();
            for (const [name, value] of Object.entries(inputs)) {
                const block = blocks.find(b => b.name === name);
                if (block)
                    block.value = value;
                else
                    console.error(`cannot find input block "${name}" for shader (node material) "${material.name}"`);
            }
            return shader;
        },
    };
    return shader;
}
//# sourceMappingURL=load-shader.js.map