export interface UniformSpec {
    type: "float";
    name: string;
}
export interface UniformData {
    [name: string]: any;
}
export interface ShaderSpec {
    vertexShaderUrl: string;
    fragmentShaderUrl: string;
    textures: {
        [key: string]: string;
    };
    uniformSpecs: UniformSpec[];
    uniformData: UniformData;
}
export declare const ControlPanel: import("@chasemoskal/magical/x/view/types").View<[{
    rebuildMaterial: (spec: ShaderSpec) => Promise<void>;
    setUniformData: (data: UniformData) => void;
}]>;
export declare function createControlPanelElement({ rebuildMaterial, setUniformData }: {
    rebuildMaterial: (spec: ShaderSpec) => Promise<void>;
    setUniformData: (data: UniformData) => void;
}): {
    element: HTMLDivElement;
};
