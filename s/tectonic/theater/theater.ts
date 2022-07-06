
import {Scene} from "@babylonjs/core/scene.js"
import {makeCursorRig} from "./cursor/cursor-rig.js"
import {Engine} from "@babylonjs/core/Engines/engine.js"
import {Color3, Color4} from "@babylonjs/core/Maths/math.color.js"

export type Theater = ReturnType<typeof setupTheater>

export function setupTheater({container}: {
		container: HTMLElement
	}) {

	const canvas = document.createElement("canvas")
	container.appendChild(canvas)
	function resizeCanvas() {
		const {width, height} = canvas.getBoundingClientRect()
		canvas.width = width
		canvas.height = height
	}
	window.addEventListener("resize", resizeCanvas)
	resizeCanvas()

	const cursor = makeCursorRig(canvas)
	container.appendChild(cursor.display)

	const engine = new Engine(canvas, true)
	;(<any>window).engine = engine

	const scene = new Scene(engine)
	scene.clearColor = new Color4(0, 0, 0, 0)
	scene.ambientColor = new Color3(0.005, 0.005, 0.005)

	const renderLoop = new Set<() => void>()

	engine.runRenderLoop(() => {
		for (const routine of renderLoop)
			routine()
		scene.render()
	})

	return {
		scene,
		engine,
		canvas,
		renderLoop,
	}
}
