
import "@babylonjs/core/Materials/standardMaterial.js"

import {Color3} from "@babylonjs/core/Maths/math.color.js"
import {MeshBuilder} from "@babylonjs/core/Meshes/meshBuilder.js"
import {StandardMaterial} from "@babylonjs/core/Materials/standardMaterial.js"

import {nap} from "../toolbox/nap.js"
import {makeStatsDisplay} from "./utils/stats-display.js"
import {setupShaderScene} from "./utils/setup-shader-scene.js"
import {makeShaderMaterial} from "./utils/make-shader-material.js"
import {createControlPanelElement} from "./utils/control-panel.js"
import {loadCustomMaterialShader} from "./utils/load-custom-material-shader.js"

const {canvas, engine, scene} = setupShaderScene()
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
		const sources = await loadCustomMaterialShader(spec.shaderUrl + "?q=" + Date.now())
		const {material, dispose} = makeShaderMaterial({scene, spec, sources})
		cube.material = material
		disposePreviousShader()
		disposePreviousShader = dispose
		return nap(1000)
	},
	setUniformData(data) {
		console.log("TODO set uniform data")
	},
})
zone.append(controlPanel.element)
