import {cap} from "../../../toolbox/numpty.js"

export function makeCursorRig(container: HTMLElement) {
	const display = document.createElement("div")
	display.className = "cursor-display"

	const margin = 3

	const cursor = document.createElement("div")
	cursor.className = "cursor"
	cursor.style.position = "absolute"
	cursor.style.top = "0"
	cursor.style.left = "0"
	cursor.style.background = "white"
	cursor.style.width = "10px"
	cursor.style.height = "10px"
	cursor.style.overflow = "hidden"
	display.appendChild(cursor)

	const cursorPosition = {
		top: 0,
		left: 0,
	}

	function isPointerLocked() {
		return document.pointerLockElement === container
	}

	function renderCursorPosition() {
		const {width, height} = container.getBoundingClientRect()
		cursorPosition.top = cap(cursorPosition.top, 0 + margin, height - margin)
		cursorPosition.left = cap(cursorPosition.left, 0 + margin, width - margin)
		cursor.style.top = `${cursorPosition.top}px`
		cursor.style.left = `${cursorPosition.left}px`
	}

	container.onmousemove = event => {
		if (isPointerLocked()) {
			const {movementX, movementY} = event
			cursorPosition.top += movementY
			cursorPosition.left += movementX
		}
		else {
			cursorPosition.top = event.offsetY
			cursorPosition.left = event.offsetX
		}
		renderCursorPosition()
	}

	container.onclick = event => {
		if (!isPointerLocked())
			container.requestPointerLock()
	}

	return {display}
}
