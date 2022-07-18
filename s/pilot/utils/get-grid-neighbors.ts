
import {v2, V2} from "../../toolbox/v2.js"
import {inBounds} from "./in-bounds.js"

export function getGridNeighbors(
		vertex: V2,
		size: V2,
		directions: V2[],
	) {
	return directions
		.map(direction => v2.add(vertex, direction))
		.filter(v => inBounds(v, size))
}
