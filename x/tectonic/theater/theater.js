import { Scene } from "@babylonjs/core/scene.js";
import { Engine } from "@babylonjs/core/Engines/engine.js";
import { Color3, Color4 } from "@babylonjs/core/Maths/math.color.js";
export function makeTheater() {
    const canvas = document.createElement("canvas");
    canvas.className = "theater";
    const engine = new Engine(canvas, true);
    const scene = new Scene(engine, {
        useGeometryUniqueIdsMap: true,
        useMaterialMeshMap: true,
    });
    scene.clearColor = new Color4(62 / 255, 129 / 255, 186 / 255, 1);
    scene.ambientColor = new Color3(0.005, 0.005, 0.005);
    window.engine = engine;
    const renderLoop = new Set();
    return {
        canvas,
        scene,
        engine,
        renderLoop,
        onresize() {
            const { width, height } = canvas.getBoundingClientRect();
            canvas.width = width;
            canvas.height = height;
            engine.resize();
        },
        start() {
            engine.runRenderLoop(() => {
                for (const routine of renderLoop)
                    routine();
                scene.render();
            });
        },
        stop() {
            engine.stopRenderLoop();
        },
    };
}
//# sourceMappingURL=theater.js.map