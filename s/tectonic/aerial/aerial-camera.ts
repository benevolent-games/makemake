
import {ArcRotateCamera} from "@babylonjs/core/Cameras/arcRotateCamera.js"

import {v3} from "../../toolbox/v3.js"
import {Cursor} from "../cursor/cursor.js"
import {cap} from "../../toolbox/numpty.js"
import {Theater} from "../theater/theater.js"
import {InputTracker} from "../inputs/input-tracker.js"

const circle = 2 * Math.PI

export function makeAerialCamera({
		theater, cursor, inputs, mapSize, radius, sensitivity, sampleHeight,
	}: {
		theater: Theater
		cursor: Cursor
		inputs: InputTracker
		mapSize: number
		radius: {
			min: number
			max: number
			initial: number
		}
		sensitivity: {
			wheel: number
		}
		sampleHeight: (x: number, y: number) => number
	}) {

	let targetRadius = radius.initial
	let targetHeight = 0
	const minimumHeightOffGround = 10

	const camera = new ArcRotateCamera(
		"cam",
		0.25 * circle,
		0.15 * circle,
		targetRadius,
		v3.toBabylon([0, targetHeight, 0]),
		theater.scene,
	)

	inputs.listeners.wheel.add(({deltaY}) => {
		targetRadius += deltaY * sensitivity.wheel
		targetRadius = cap(targetRadius, radius.min, radius.max)
	})

	function updateTargetHeight() {
		targetHeight = sampleHeight(
			camera.globalPosition.x,
			camera.globalPosition.z,
		)
	}

	function smoothUpdateForCameraHeight() {
		const currentHeight = camera.target.y
		const difference = targetHeight - currentHeight
		const fractionOfDifference = difference * 0.1
		camera.target.y += fractionOfDifference
		const floor = sampleHeight(
			camera.globalPosition.x,
			camera.globalPosition.z,
		) + minimumHeightOffGround
		if (camera.globalPosition.y < floor) {
			const underneath = floor - camera.globalPosition.y
			camera.target.y += underneath
		}
	}

	function smoothUpdateForCameraZoom() {
		const difference = targetRadius - camera.radius
		const fractionOfDifference = difference * 0.1
		camera.radius += fractionOfDifference
	}

	updateTargetHeight()
	theater.renderLoop.add(smoothUpdateForCameraHeight)
	theater.renderLoop.add(smoothUpdateForCameraZoom)

	const boundaryA = -(mapSize / 2)
	const boundaryB = mapSize / 2
	cursor.listeners.mousemove.add(({movementX, movementY}) => {
		const m1 = inputs.get("mouse_primary").pressed
		const m2 = inputs.get("mouse_secondary").pressed
		const m3 = inputs.get("mouse_tertiary").pressed
		if (m1 || m2 || m3) {
			camera.target.x = cap(
				camera.target.x + (movementX * (camera.radius / 200)),
				boundaryA,
				boundaryB,
			)
			camera.target.z = cap(
				camera.target.z - (movementY * (camera.radius / 200)),
				boundaryA,
				boundaryB,
			)
			updateTargetHeight()
		}
	})

	return camera
}
