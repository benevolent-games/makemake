
import {v3} from "../../toolbox/v3.js"
import {BasicOptions} from "../types.js"
import {ArcRotateCamera} from "@babylonjs/core/Cameras/arcRotateCamera.js"

export function makeAerialCamera({scene, canvas}: BasicOptions) {
	const circle = 2 * Math.PI
	const camera = new ArcRotateCamera(
		"cam",
		circle / 6,
		circle / 6,
		50,
		v3.toBabylon([0, 5, 0]),
		scene,
	)
	camera.attachControl(canvas, true)
	return camera
}
