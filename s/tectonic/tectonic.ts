
import "@babylonjs/loaders/glTF/2.0/index.js"
import "@babylonjs/core/Lights/Shadows/index.js"

import {BasicOptions} from "./types.js"
import {easing} from "../toolbox/easing.js"
import {makeGround} from "./landscape/ground.js"
import {setupLighting} from "./landscape/lighting.js"
import {makeRandomToolkit} from "../toolbox/randomly.js"
import {makeAerialCamera} from "./aerial/aerial-camera.js"
import {sprinkleProps} from "./landscape/sprinkle-props.js"
import {makeTerrainGenerator} from "./landscape/terrain-generator.js"

export async function makeRtsWorld(options: BasicOptions) {
	const mapSize = 1000
	const randomly = makeRandomToolkit()

	makeAerialCamera(options)

	const terrainGenerator = makeTerrainGenerator({
		randomly,
		treeDensityScale: 200,
		layers: [
			{scale: 400, amplitude: 35, ease: easing.linear},
			{scale: 300, amplitude: 25, ease: x => easing.exponential(x - 0.2)},
			{scale: 200, amplitude: 15, ease: easing.linear},
			{scale: 72, amplitude: 5, ease: easing.linear},
			{scale: 11, amplitude: 0.8, ease: easing.linear},
		],
	})

	await makeGround({
		...options,
		mapSize,
		resolution: 256,
		terrainGenerator,
		normalStrength: 1,
		cliffSlopeFactor: 0.4,
		groundShaderUrl: "https://dl.dropbox.com/s/may8ifijik7mwms/terrainShader2.json",
	})

	const {shadowControl} = setupLighting({
		...options,
		sun: {
			direction: [-1, -1, -1],
			distance: 100,
			intensity: 1.5,
		},
		shadows: undefined,
	})

	await sprinkleProps({
		...options,
		mapSize,
		randomly,
		shadowControl,
		terrainGenerator,
	})
}
