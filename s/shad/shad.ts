
import "@babylonjs/core/Materials/standardMaterial.js"

import {Scene} from "@babylonjs/core/scene.js"
import {Engine} from "@babylonjs/core/Engines/engine.js"
import {Color3, Color4} from "@babylonjs/core/Maths/math.color.js"
import {ArcRotateCamera} from "@babylonjs/core/Cameras/arcRotateCamera.js"
import {Vector3} from "@babylonjs/core/Maths/math.js"
import {MeshBuilder} from "@babylonjs/core/Meshes/meshBuilder.js"
import {StandardMaterial} from "@babylonjs/core/Materials/standardMaterial.js"
import {DirectionalLight} from "@babylonjs/core/Lights/directionalLight.js"

void async function main() {

	const canvas = document.createElement("canvas")
	canvas.className = "theater"

	const engine = new Engine(canvas, true)

	const scene = new Scene(engine, {
		useGeometryUniqueIdsMap: true,
		useMaterialMeshMap: true,
	})

	scene.clearColor = new Color4(0, 0, 0, 1)
	scene.ambientColor = new Color3(0.005, 0.005, 0.005)
	;(<any>window).engine = engine

	const camera = new ArcRotateCamera("cam", 0, Math.PI / 4, 100, new Vector3(0, 0, 0))
	const cube = MeshBuilder.CreateBox("box", {size: 20}, scene)
	const material = new StandardMaterial("mat", scene)
	material.diffuseColor = new Color3(0.8, 0.8, 0.8)
	material.ambientColor = new Color3(1, 1, 1)
	cube.material = material

	const sunlight = new DirectionalLight("sunlight", new Vector3(-0.9, -1.2, -1), scene)
	const backlight = new DirectionalLight("backlight", new Vector3(1.1, 0.9, 1.2), scene)
	sunlight.intensity = 1.5
	backlight.intensity = 0.2

	camera.attachControl(canvas)

	const lz = <HTMLDivElement>document.querySelector(".lz")!
	lz.append(canvas)

	engine.runRenderLoop(() => scene.render())
	engine.resize()
	window.addEventListener("resize", () => engine.resize())

	const framerate = document.querySelector(".framerate")!

	function displayFramerate() {
		framerate.textContent = engine.getFps().toFixed(0)
		requestAnimationFrame(displayFramerate)
	}

	displayFramerate()
}()
