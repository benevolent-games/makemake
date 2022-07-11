import { DirectionalLight } from "@babylonjs/core/Lights/directionalLight.js";
import { ShadowGenerator } from "@babylonjs/core/Lights/Shadows/shadowGenerator.js";
import { v3 } from "../../toolbox/v3.js";
export function setupLighting({ sun, shadows, theater: { scene, renderLoop }, }) {
    const deltaPosition = v3.multiplyBy(v3.normalize(v3.negate(sun.direction)), sun.distance);
    const light = new DirectionalLight("sunlight", v3.toBabylon(sun.direction), scene);
    light.intensity = sun.intensity;
    const shadowControl = {
        addCaster() { },
        removeCaster() { },
    };
    if (shadows) {
        const shadowGenerator = new ShadowGenerator(2048, light);
        shadowControl.addCaster = (mesh) => shadowGenerator.addShadowCaster(mesh);
        shadowControl.removeCaster = (mesh) => shadowGenerator.removeShadowCaster(mesh);
    }
    function setSunPositionToFollowCamera() {
        if (scene.activeCamera) {
            light.position.copyFrom(scene.activeCamera.globalPosition);
            light.position.addInPlaceFromFloats(...deltaPosition);
        }
    }
    renderLoop.add(setSunPositionToFollowCamera);
    return {
        shadowControl,
        dispose() {
            renderLoop.delete(setSunPositionToFollowCamera);
        },
    };
}
//# sourceMappingURL=lighting.js.map