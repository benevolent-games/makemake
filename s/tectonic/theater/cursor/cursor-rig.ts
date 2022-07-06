
import {cap} from "../../../toolbox/numpty.js"
import {graphics} from "./graphics/cursor-graphics.js"

export function makeCursorRig(container: HTMLElement) {

	const display = document.createElement("canvas")
	display.className = "cursor-display"

	const margin = 3
	let left = margin
	let top = margin

	const graphic = graphics.beta()

	const context = display.getContext("2d")!
	function canvasDraw() {
		context.clearRect(0, 0, display.width, display.height)
		context.drawImage(
			graphic.image,
			left + graphic.offset.left,
			top + graphic.offset.top,
			32,
			32,
		)
	}
	function renderCanvas() {
		requestAnimationFrame(canvasDraw)
	}
	canvasDraw()

	function isPointerLocked() {
		return document.pointerLockElement === container
	}

	function updateCursor() {
		const {width, height} = container.getBoundingClientRect()
		top = cap(top, 0 + margin, height - margin)
		left = cap(left, 0 + margin, width - margin)
		renderCanvas()
	}

	container.onmousemove = event => {
		if (isPointerLocked()) {
			const {movementX, movementY} = event
			top += movementY
			left += movementX
		}
		else {
			top = event.offsetY
			left = event.offsetX
		}
		updateCursor()
	}

	container.onclick = event => {
		if (!isPointerLocked())
			container.requestPointerLock()
	}

	return {display}
}
