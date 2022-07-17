
import {loop2d, loop2d2} from "../../loop2d.js"
import {range} from "../../range.js"
import {v2, V2} from "../../v2.js"
import {V3} from "../../v3.js"
import {Navmesh} from "../types.js"
import {indexForCoordinates} from "./index-for-coordinates.js"
import {directionality} from "./directionality.js"
import {getGridNeighbors} from "./get-grid-neighbors.js"
import {inBounds} from "./in-bounds.js"

export function makeHexNavmesh({size, scale}: {
		size: V2
		scale: number // distance between hexagons (2 makes integer offset)
	}): Navmesh {

	const [columns, rows] = size
	const gridcount = columns * rows

	const hexagons: boolean[][] = range(columns)
		.map(() => range(rows)
			.map(() => true))

	const oddRowOffset = scale / 2

	const vertices: V3[] = []
	const triangles: V3[] = []

	const beacons: V3[] = Array(gridcount)
	const edges: number[][] = Array(gridcount)

	loop2d2(size, ([x, y], index) => {
		const isOddRow = (y % 2) === 1
		const scaledX = isOddRow
			? oddRowOffset + (x * scale)
			: x * scale
		const scaledY = y * scale
		beacons[index] = [scaledX, scaledY, 0]
		const neighbors = getGridNeighbors(
			[x, y],
			size,
			directionality.hexagonal,
		)
		edges[index] = neighbors.map(coordinates => indexForCoordinates(coordinates, columns))
	})

	return {
		traversable: {
			vertices,
			triangles,
		},
		pathable: {
			beacons,
			edges,
		},
	}
}
