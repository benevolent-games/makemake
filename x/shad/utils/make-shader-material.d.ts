import { Scene } from "@babylonjs/core/scene.js";
import { ShaderMaterial } from "@babylonjs/core/Materials/shaderMaterial.js";
import { ShaderSpec, UniformData } from "./control-panel.js";
export declare function makeShaderMaterial({ scene, spec, sources }: {
    scene: Scene;
    spec: ShaderSpec;
    sources: {
        vertex: string;
        fragment: string;
    };
}): {
    material: ShaderMaterial;
    setUniformData: (uniformData: UniformData) => void;
    dispose(): void;
};
