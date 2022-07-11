import "@babylonjs/core/Materials/standardMaterial.js";
import "@babylonjs/loaders/glTF/2.0/index.js";
import "@babylonjs/core/Lights/Shadows/index.js";
import "@babylonjs/core/Culling/ray.js";
export declare function makeRtsWorld(): {
    container: HTMLDivElement;
    settings: {
        writable: import("./settings/settings.js").Settings;
        readable: import("./settings/settings.js").Settings;
        element: HTMLDivElement;
        onSettingsChange: Set<(settings: import("./settings/settings.js").Settings) => void>;
    };
    theater: {
        canvas: HTMLCanvasElement;
        scene: import("@babylonjs/core/scene.js").Scene;
        engine: import("@babylonjs/core/Engines/engine.js").Engine;
        renderLoop: Set<() => void>;
        onresize(): void;
        start(): void;
        stop(): void;
    };
    cursor: {
        canvas: HTMLCanvasElement;
        isLocked: () => boolean;
        listeners: {
            mousemove: Set<(event: MouseEvent) => void>;
        };
        lock(): void;
        onresize: () => void;
        onmousemove(event: MouseEvent): void;
        getCoordinates(): {
            canvasWidth: number;
            canvasHeight: number;
            x: number;
            y: number;
        };
    };
    initialize(): Promise<void>;
};
