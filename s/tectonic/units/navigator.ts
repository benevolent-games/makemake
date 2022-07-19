
import {Matrix} from "@babylonjs/core/Maths/math.js"

import {V3} from "../../toolbox/v3.js"
import {Theater} from "../theater/theater.js"
import {spawnBox} from "../hand/spawn-box.js"
import {loop2d} from "../../toolbox/loop2d.js"
import {TerrainGenerator} from "../landscape/terrain-generator.js"
import {V2} from "../../toolbox/v2.js"
import {Navmesh} from "../../pilot/types.js"
import {getGridNeighbors} from "../../pilot/utils/get-grid-neighbors.js"
import {directionality} from "../../pilot/utils/directionality.js"
import {indexForCoordinates} from "../../pilot/utils/index-for-coordinates.js"

function hexpoint([x, y]: V2) {
	const isOddRow = (y % 2) === 1
	const offsetX = isOddRow
		? x + 0.5
		: x
	return <V2>[offsetX, y]
}

function generateHexagonalNavmeshForTerrain({
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
		if (isHexagonTraversable) {
			beacons[index] = [hexagonCenter[0], height, hexagonCenter[1]]
			const neighbors = getGridNeighbors(extentpoint, extent, directionality.hexagonal)
			edges[index] = neighbors
				.map(coordinates => indexForCoordinates(coordinates, columns))
				.filter(neighborIndex => hexagons[neighborIndex])
		}
	})

	return {
		traversable: {vertices, triangles},
		pathable: {beacons, edges},
	}
}

export function makeNavigator({
		mapSize, resolution, theater, cliffSlopeFactor, terrainGenerator,
	}: {
		mapSize: number
		theater: Theater
		resolution: number
		cliffSlopeFactor: number
		terrainGenerator: TerrainGenerator
	}) {

	const halfMap = mapSize / 2
	const chunkSize = mapSize / resolution

	const navmesh = generateHexagonalNavmeshForTerrain({
		extent: [resolution, resolution],
		cliffSlopeFactor,
		terrainGenerator,
		resolve2d: ([x, y]) => {
			const nx = (x * chunkSize) - halfMap
			const ny = (y * chunkSize) - halfMap
			return [nx, ny]
		},
	})

	const box = spawnBox({
		size: 1,
		color: [1, 1, 1],
		position: [0, 0, 0],
		scene: theater.scene,
		unlit: true,
	})

	const matrices = navmesh.pathable.beacons
		.filter(b => !!b)
		.map(p => Matrix.Translation(...p))
	
	box.thinInstanceAdd(matrices)
}
