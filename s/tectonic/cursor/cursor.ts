
import {cap} from "../../toolbox/numpty.js"
import {CursorIcon} from "./cursor-types.js"

export function makeCursor({
		icon: {
			image: iconImage,
			offset: {
				top: iconOffsetTop,
				left: iconOffsetLeft,
			},
		},
		insetBoundary,
		onLocked,
		onUnlocked,
	}: {
		icon: CursorIcon
		insetBoundary: number
		onLocked(): void
		onUnlocked(): void
	}) {

	const canvas = document.createElement("canvas")
	canvas.className = "cursor"
	const context = canvas.getContext("2d")!

	let canvasWidth = 100
	let canvasHeight = 100

	let positionLeft = insetBoundary
	let positionTop = insetBoundary

	function canvasDraw() {
		const x = positionLeft
		const y = positionTop
		context.clearRect(0, 0, canvasWidth, canvasHeight)
		if (isLocked()) {
			context.beginPath()
			context.arc(x, y, 7, 0, 2 * Math.PI, false)
			context.arc(x, y, 4, 0, 2 * Math.PI, false)
			context.strokeStyle = "#FFF8"
			context.lineWidth = 1
			context.stroke()
			context.drawImage(iconImage, x + iconOffsetLeft, y + iconOffsetTop)
		}
	}

	canvasDraw()

	function isLocked() {
		return document.pointerLockElement === canvas
	}

	function updateCursor() {
		positionTop = cap(positionTop, insetBoundary, canvasHeight - insetBoundary)
		positionLeft = cap(positionLeft, insetBoundary, canvasWidth - insetBoundary)
		canvasDraw()
	}

	document.addEventListener("pointerlockchange", () => {
		if (isLocked())
			onLocked()
		else
			onUnlocked()
	})

	function onresize() {
		let {width, height} = canvas.getBoundingClientRect()
		width = Math.floor(width)
		height = Math.floor(height)
		canvas.width = width
		canvas.height = height
		canvasWidth = width
		canvasHeight = height
		updateCursor()
	}

	window.addEventListener("resize", onresize)
	onresize()

	return {
		canvas,
		isLocked,
		lock() {
			if (!isLocked())
				canvas.requestPointerLock()
		},
		onresize,
		onmousemove(event: MouseEvent) {
			if (isLocked()) {
				positionTop += event.movementY
				positionLeft += event.movementX
			}
			else {
				positionTop = event.offsetY
				positionLeft = event.offsetX
			}
			updateCursor()
		},
	}
}
