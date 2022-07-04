
import {ArcRotateCamera} from "@babylonjs/core/Cameras/arcRotateCamera.js"

import {v3} from "../../toolbox/v3.js"
import {Theater} from "../theater/theater.js"

export function makeAerialCamera({theater}: {theater: Theater}) {
	const circle = 2 * Math.PI
	const camera = new ArcRotateCamera(
		"cam",
		circle / 6,
		circle / 6,
		50,
		v3.toBabylon([0, 5, 0]),
		theater.scene,
	)
	camera.attachControl(theater.canvas, true)
	return camera
}
