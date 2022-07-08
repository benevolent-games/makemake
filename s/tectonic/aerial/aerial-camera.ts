
import {ArcRotateCamera} from "@babylonjs/core/Cameras/arcRotateCamera.js"

import {V3, v3} from "../../toolbox/v3.js"
import {Cursor} from "../cursor/cursor.js"
import {InputTracker} from "../inputs/input-tracker.js"
import {Theater} from "../theater/theater.js"

const circle = 2 * Math.PI

export function makeAerialCamera({theater, cursor, inputs}: {
		theater: Theater
		cursor: Cursor
		inputs: InputTracker
	}) {
	
	const camera = new ArcRotateCamera(
		"cam",
		0.25 * circle,
		0.15 * circle,
		100,
		v3.toBabylon([0, 0, 0]),
		theater.scene,
	)

	cursor.listeners.mousemove.add(({movementX, movementY}) => {
		const m1 = inputs.get("mouse_primary").pressed
		const m2 = inputs.get("mouse_secondary").pressed
		const m3 = inputs.get("mouse_tertiary").pressed
		if (m1 || m2 || m3) {
			camera.target.x += movementX / 2
			camera.target.z -= movementY / 2
		}
	})

	return camera
}
