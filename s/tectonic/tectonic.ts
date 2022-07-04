
import "@babylonjs/core/Materials/standardMaterial.js"
import "@babylonjs/loaders/glTF/2.0/index.js"
import "@babylonjs/core/Lights/Shadows/index.js"

import {easing} from "../toolbox/easing.js"
import {makeGround} from "./landscape/ground.js"
import {setupLighting} from "./landscape/lighting.js"
import {makeRandomToolkit} from "../toolbox/randomly.js"
import {makeAerialCamera} from "./aerial/aerial-camera.js"
import {sprinkleProps} from "./landscape/sprinkle-props.js"
import {setupTheater as setupTheater} from "./theater/theater.js"
import {makeTerrainGenerator} from "./landscape/terrain-generator.js"

export async function makeRtsWorld({container}: {
		container: HTMLElement
	}) {

	const theater = setupTheater({container})
	const mapSize = 1000
	const cliffSlopeFactor = 0.4
	const randomly = makeRandomToolkit()

	makeAerialCamera({theater})

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
		theater,
		mapSize,
		resolution: 512,
		terrainGenerator,
		cliffSlopeFactor,
		normalStrength: 1,
		groundShaderUrl: "https://dl.dropbox.com/s/may8ifijik7mwms/terrainShader2.json",
	})

	const {shadowControl} = setupLighting({
		theater,
		sun: {
			direction: [-1, -1, -1],
			distance: 100,
			intensity: 1.5,
		},
		shadows: undefined,
	})

	await sprinkleProps({
		theater,
		mapSize,
		randomly,
		shadowControl,
		cliffSlopeFactor,
		terrainGenerator,
		treeDetails: {
			numberOfTrees: 1_000,
			spaceBetweenTrees: 7,
			maxTreePlantingAttempts: 50_000,
			randomizationRanges: {
				scale: {min: 0.5, max: 1.5},
				heightAdjustment: {min: -1, max: 5},
			},
		},
	})
}
