
// import {V2} from "../../v2.js"
// import {v3, V3} from "../../v3.js"
// import {Navmesh} from "../types.js"
// import {loop2d} from "../../loop2d.js"
// import {directionality} from "./directionality.js"
// import {getGridNeighbors} from "./get-grid-neighbors.js"
// import {coordinateToIndex} from "./index-for-coordinates.js"

// export function makeGridNavmesh({size}: {size: V2}): Navmesh {
// 	const [columns, rows] = size
// 	const gridcount = columns * rows
	
// 	// initialize positions of vertices
// 	const vertices: V3[] = Array(gridcount)
// 	loop2d(columns, rows, (x, y, index) => {
// 		vertices[index] = [x, y, 0]
// 	})

// 	// TODO skin traversable vertices with triangles
// 	const triangles: V3[] = []

// 	// initialize quads and edges between them
// 	const pathable = (() => {
// 		const quadColumns = columns - 1
// 		const quadRows = rows - 1
// 		const quadCount = quadColumns * quadRows
// 		const beacons: V3[] = Array(quadCount)
// 		const edges: number[][] = Array(quadCount)
// 		loop2d(quadColumns, quadRows, (x, y, index) => {
// 			const topLeftVertex = vertices[index]
// 			const beacon = v3.add(topLeftVertex, [0.5, -0.5, 0])
// 			beacons[index] = beacon
// 		})
// 		loop2d(quadColumns, quadRows, (x, y, index) => {
// 			const neighbors = getGridNeighbors(
// 				[x, y],
// 				[quadColumns, quadRows],
// 				directionality.octinal
// 			)
// 			edges[index] = neighbors.map(coordinateToIndex)
// 		})
// 		return {beacons, edges}
// 	})()

// 	return {
// 		traversable: {vertices, triangles},
// 		pathable,
// 	}
// }
