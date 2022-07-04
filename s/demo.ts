
import "@babylonjs/core/Materials/standardMaterial.js"

import {Scene} from "@babylonjs/core/scene.js"
import {Engine} from "@babylonjs/core/Engines/engine.js"
import {Color3, Color4} from "@babylonjs/core/Maths/math.color.js"

import {makeRtsWorld} from "./tectonic/tectonic.js"

void async function() {
	const demo = document.querySelector<HTMLElement>(".demo")!
	const canvas = document.createElement("canvas")
	demo.appendChild(canvas)

	const engine = new Engine(canvas, true)
	const scene = new Scene(engine)
	scene.clearColor = new Color4(0, 0, 0, 0)
	scene.ambientColor = new Color3(0.005, 0.005, 0.005)
	const renderLoop = new Set<() => void>()

	await makeRtsWorld({scene, canvas, renderLoop})

	engine.runRenderLoop(() => {
		for (const routine of renderLoop)
			routine()
		scene.render()
	})
}()
