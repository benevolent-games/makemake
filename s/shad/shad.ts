
import "@babylonjs/core/Materials/standardMaterial.js"

import {Vector3} from "@babylonjs/core/Maths/math.js"
import {Color3} from "@babylonjs/core/Maths/math.color.js"
import {MeshBuilder} from "@babylonjs/core/Meshes/meshBuilder.js"
import {StandardMaterial} from "@babylonjs/core/Materials/standardMaterial.js"

import {nap} from "../toolbox/nap.js"
import {fetchText} from "./utils/fetch-text.js"
import {makeStatsDisplay} from "./utils/stats-display.js"
import {setupShaderScene} from "./utils/setup-shader-scene.js"
import {makeShaderMaterial} from "./utils/make-shader-material.js"
import {createControlPanelElement} from "./utils/control-panel.js"

const {canvas, engine, scene, renderloop} = setupShaderScene()
;(<any>window).engine = engine
const zone = <HTMLDivElement>document.querySelector(".zone")!
zone.append(canvas)
engine.resize()
window.addEventListener("resize", () => engine.resize())

const cube = MeshBuilder.CreateBox("box", {size: 20}, scene)
const material = new StandardMaterial("mat", scene)
material.diffuseColor = new Color3(0.8, 0.8, 0.8)
material.ambientColor = new Color3(1, 1, 1)
cube.material = material

const stats = makeStatsDisplay()
zone.append(stats.element)
void function displayFramerate() {
	stats.setFramerate(engine.getFps())
	requestAnimationFrame(displayFramerate)
}()

let disposePreviousShader = () => {}

const controlPanel = createControlPanelElement({
	async rebuildMaterial(spec) {
		const [vertex, fragment] = await Promise.all([
			fetchText(spec.vertexShaderUrl + "?q=" + Date.now()),
			fetchText(spec.fragmentShaderUrl + "?q=" + Date.now()),
		])
		const sources = {vertex, fragment}
		const {material, dispose} = makeShaderMaterial({scene, spec, sources})
		function update() {
			const cameraPosition = scene.activeCamera
				? scene.activeCamera.globalPosition
				: new Vector3(0, 0, 0)
			material.setVector3("cameraPosition", cameraPosition)
			material.setFloat("time", Date.now() % 1_000_000)
		}
		renderloop.add(update)
		cube.material = material
		disposePreviousShader()
		disposePreviousShader = () => {
			renderloop.delete(update)
			dispose()
		}
		return nap(1000)
	},
	setUniformData(data) {
		console.log("TODO set uniform data")
	},
})
zone.append(controlPanel.element)
