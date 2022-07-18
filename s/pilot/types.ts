
import {V3} from "../toolbox/v3.js"

export interface Navmesh {
	traversable: {
		vertices: V3[]
		triangles: V3[]
	}
	pathable: {
		beacons: V3[]
		edges: number[][]
	}
}
