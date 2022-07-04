
import {NoiseLayer} from "../types.js"
import {Randomly} from "../../toolbox/randomly.js"
import {prepareNoise} from "../../toolbox/noise.js"

export type TerrainGenerator = ReturnType<typeof makeTerrainGenerator>

export function makeTerrainGenerator({
		randomly, layers, treeDensityScale,
	}: {
		randomly: Randomly
		layers: NoiseLayer[]
		treeDensityScale: number
	}) {

	const seed = randomly.random()

	const maxAmplitude = layers
		.reduce((previous, current) => previous + current.amplitude, 0)

	const halfAmplitude = maxAmplitude / 2

	const {noise2d} = prepareNoise(seed)
	const offsetBetweenEachLayer = 100_000

	function sampleHeight(x: number, y: number) {
		let factor = 0
		layers.forEach(({scale, amplitude, ease}, index) => {
			const offset = index * offsetBetweenEachLayer
			const rawNoise = noise2d(
				offset + (x / scale),
				offset + (y / scale),
			)
			const noise = (rawNoise + 1) / 2
			factor += ease(noise) * amplitude
		})
		return factor - halfAmplitude
	}

	function sampleTreeDensity(x: number, y: number) {
		const offset = -696969
		return noise2d(
			offset + (x / treeDensityScale),
			offset + (y / treeDensityScale),
		)
	}

	return {sampleHeight, sampleTreeDensity}
}
