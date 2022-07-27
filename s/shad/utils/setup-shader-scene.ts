
import {Scene} from "@babylonjs/core/scene.js"
import {Vector3} from "@babylonjs/core/Maths/math.js"
import {Engine} from "@babylonjs/core/Engines/engine.js"
import {Color4, Color3} from "@babylonjs/core/Maths/math.color.js"
import {ArcRotateCamera} from "@babylonjs/core/Cameras/arcRotateCamera.js"
import {DirectionalLight} from "@babylonjs/core/Lights/directionalLight.js"

export function setupShaderScene() {
	const canvas = document.createElement("canvas")
	const engine = new Engine(canvas, true)
	const scene = new Scene(engine, {
		useGeometryUniqueIdsMap: true,
		useMaterialMeshMap: true,
	})

	scene.clearColor = new Color4(0.03, 0.03, 0.03, 1)
	scene.ambientColor = new Color3(0.005, 0.005, 0.005)

	const camera = new ArcRotateCamera(
		"cam",
		0,
		Math.PI / 4,
		100,
		new Vector3(0, 0, 0),
	)

	const sunlight = new DirectionalLight(
		"sunlight",
		new Vector3(-0.9, -1.2, -1),
		scene,
	)

	const backlight = new DirectionalLight(
		"backlight",
		new Vector3(1.1, 0.9, 1.2),
		scene,
	)

	sunlight.intensity = 1.5
	backlight.intensity = 0.2

	camera.attachControl(canvas)
	engine.runRenderLoop(() => scene.render())

	return {canvas, engine, scene, camera}
}
