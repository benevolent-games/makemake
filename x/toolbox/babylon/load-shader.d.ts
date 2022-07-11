import "@babylonjs/core/Materials/Node/Blocks/index.js";
import { Scene } from "@babylonjs/core/scene.js";
import { NodeMaterial } from "@babylonjs/core/Materials/Node/nodeMaterial.js";
export declare function loadShader({ url, scene, label }: {
    url: string;
    scene: Scene;
    label: string;
}): Promise<{
    material: NodeMaterial;
    assignTextures(textures: {
        [blockName: string]: string;
    }): any;
    assignInputs(inputs: {
        [blockName: string]: any;
    }): any;
}>;
