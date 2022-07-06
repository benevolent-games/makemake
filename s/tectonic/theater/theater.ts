
import {Scene} from "@babylonjs/core/scene.js"
import {Engine} from "@babylonjs/core/Engines/engine.js"
import {Color3, Color4} from "@babylonjs/core/Maths/math.color.js"

export type Theater = ReturnType<typeof makeTheater>

export function makeTheater() {
	const canvas = document.createElement("canvas")
	canvas.className = "theater"

	const engine = new Engine(canvas, true)
	const scene = new Scene(engine)
	scene.clearColor = new Color4(0, 0, 0, 0)
	scene.ambientColor = new Color3(0.005, 0.005, 0.005)
	;(<any>window).engine = engine

	const renderLoop = new Set<() => void>()

	return {
		canvas,
		scene,
		engine,
		renderLoop,
		onresize() {
			const {width, height} = canvas.getBoundingClientRect()
			canvas.width = width
			canvas.height = height
		},
		startRendering() {
			engine.runRenderLoop(() => {
				for (const routine of renderLoop)
					routine()
				scene.render()
			})
		},
		stopRendering() {
			engine.stopRenderLoop()
		},
	}
}
