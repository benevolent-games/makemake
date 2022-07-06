
import "@babylonjs/core/Materials/standardMaterial.js"
import "@babylonjs/loaders/glTF/2.0/index.js"
import "@babylonjs/core/Lights/Shadows/index.js"

import {easing} from "../toolbox/easing.js"
import {makeCursor} from "./cursor/cursor.js"
import {makeGround} from "./landscape/ground.js"
import {makeTheater} from "./theater/theater.js"
import {setupLighting} from "./landscape/lighting.js"
import {makeRandomToolkit} from "../toolbox/randomly.js"
import {makeAerialCamera} from "./aerial/aerial-camera.js"
import {sprinkleProps} from "./landscape/sprinkle-props.js"
import {cursorIconBeta} from "./cursor/icons/cursor-icon-beta.js"
import {makeTerrainGenerator} from "./landscape/terrain-generator.js"

export function makeRtsWorld() {
	const container = document.createElement("div")
	container.className = "container"

	const theater = makeTheater()

	const cursor = makeCursor({
		insetBoundary: 5,
		icon: cursorIconBeta(),
		onLocked: () => container.setAttribute("data-locked", ""),
		onUnlocked: () => container.removeAttribute("data-locked"),
	})

	container.append(theater.canvas, cursor.canvas)
	container.onclick = cursor.lock
	container.onmousemove = cursor.onmousemove
	container.onresize = () => {
		cursor.onresize()
		theater.onresize()
	}
	setTimeout(container.onresize, 0)

	container.onkeydown = event => {
		if (event.key === "F" && event.ctrlKey) {
			if (document.fullscreenElement === container)
				document.exitFullscreen()
			else
				container.requestFullscreen()
		}
	}

	return {
		container,
		async initialize() {
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
				resolution: 256,
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
				forestAssetsUrl: "https://dl.dropbox.com/s/9p0k1aacrcy8c9q/forestAssetPack2.glb",
				treeDetails: {
					numberOfTrees: 256,
					spaceBetweenTrees: 7,
					maxTreePlantingAttempts: 50_000,
					randomizationRanges: {
						scale: {min: 0.5, max: 1.5},
						heightAdjustment: {min: -1, max: 5},
					},
				},
			})

			theater.startRendering()
		},
	}
}
