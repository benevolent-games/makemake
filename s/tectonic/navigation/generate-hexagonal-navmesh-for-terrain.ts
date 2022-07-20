
import {V2} from "../../toolbox/v2.js"
import {V3} from "../../toolbox/v3.js"
import {Navmesh} from "../../pilot/types.js"
import {loop2d} from "../../toolbox/loop2d.js"
import {directionality} from "../../pilot/utils/directionality.js"
import {TerrainGenerator} from "../landscape/terrain-generator.js"
import {getGridNeighbors} from "../../pilot/utils/get-grid-neighbors.js"
import {indexForCoordinates} from "../../pilot/utils/index-for-coordinates.js"

export function generateHexagonalNavmeshForTerrain({
		extent, resolve2d, cliffSlopeFactor, terrainGenerator,
	}: {
		extent: V2
		resolve2d: (v: V2) => V2
		cliffSlopeFactor: number
		terrainGenerator: TerrainGenerator
	}): Navmesh {

	const [columns, rows] = extent
	const gridcount = columns * rows

	const hexagons: boolean[] = Array(gridcount).fill(false)

	const vertices: V3[] = []
	const triangles: V3[] = []

	const beacons: V3[] = Array(gridcount).fill(undefined)
	const edges: number[][] = Array(gridcount).fill(undefined)

	loop2d(extent, (extentpoint, index) => {
		const hexagonCoordinate = hexpoint(extentpoint)
		const hexagonCenter = resolve2d(hexagonCoordinate)
		const height = terrainGenerator.sampleHeight(...hexagonCenter)
		const slope = terrainGenerator.sampleSlope(...hexagonCenter)
		const isHexagonTraversable = slope < cliffSlopeFactor
		hexagons[index] = isHexagonTraversable
		if (isHexagonTraversable)
			beacons[index] = [hexagonCenter[0], height, hexagonCenter[1]]
	})

	loop2d(extent, (extentpoint, index) => {
		const isHexagonTraversable = hexagons[index]
		if (isHexagonTraversable) {
			const isOddRow = (extentpoint[1] % 2) === 1
			const neighbors = getGridNeighbors(
				extentpoint,
				extent,
				isOddRow
					? [
						[1, 0],
						[1, -1],
						[0, -1],
					]
					: [
						[1, 0],
						[0, -1],
						[-1, -1],
					],
			)
			edges[index] = neighbors
				.map(coordinates => indexForCoordinates(coordinates, columns))
				.filter(neighborIndex => hexagons[neighborIndex])
		}
	})

	// loop2d(extent, (extentpoint, index) => {
	// 	const hexagonCoordinate = hexpoint(extentpoint)
	// 	const hexagonCenter = resolve2d(hexagonCoordinate)
	// 	const height = terrainGenerator.sampleHeight(...hexagonCenter)
	// 	const slope = terrainGenerator.sampleSlope(...hexagonCenter)
	// 	const isHexagonTraversable = slope < cliffSlopeFactor
	// 	hexagons[index] = isHexagonTraversable
	// 	if (isHexagonTraversable) {
	// 		beacons[index] = [hexagonCenter[0], height, hexagonCenter[1]]
	// 		const isOddRow = (extent[1] % 2) === 1
	// 		const neighbors = getGridNeighbors(
	// 			extentpoint,
	// 			extent,
	// 			[[1, 0]],
	// 			// isOddRow
	// 			// 	? [
	// 			// 		[1, 0],
	// 			// 		[1, -1],
	// 			// 		[0, -1],
	// 			// 	]
	// 			// 	: [
	// 			// 		[1, 0],
	// 			// 		[0, -1],
	// 			// 		[-1, -1],
	// 			// 	],
	// 		)
	// 		edges[index] = neighbors
	// 			.map(coordinates => indexForCoordinates(coordinates, columns))
	// 			.filter(neighborIndex => hexagons[neighborIndex])
	// 		console.log("n!", index, edges[index])
	// 	}
	// })

	return {
		traversable: {vertices, triangles},
		pathable: {beacons, edges},
	}
}

function hexpoint([x, y]: V2) {
	const isOddRow = (y % 2) === 1
	const offsetX = isOddRow
		? x + 0.5
		: x
	return <V2>[offsetX, y]
}
