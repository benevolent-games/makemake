
import {V2} from "../../toolbox/v2.js"

export namespace directionality {
	export const cardinal: V2[] = [
		[ 0,  1], // north
		[ 1,  0], // east
		[ 0, -1], // south
		[-1,  0], // west
	]
	export const ordinal: V2[] = [
		[ 1,  1], // north-east
		[-1,  1], // north-west
		[ 1, -1], // south-east
		[-1, -1], // south-west
	]
	export const octinal: V2[] = [
		...cardinal,
		...ordinal,
	]
	// export function hexagonal2([x, y]: V2): V2[] {
	// 	const isOddRow = (y % 2) === 1
	// 	return isOddRow
	// 		? [
	// 			[]
	// 		]
	// 		: []
	// }
	// export const hexagonal: V2[] = [
	// 	// [0, 1],
	// 	// [1, 1],
	// 	// [1, 0],
	// 	[1, -1],
	// 	// [0, -1],
	// 	// [-1, 0],

	// 	// [-1,  1],
	// 	// [ 0,  1],
	// 	// [ 1,  0],
	// 	// [ 0, -1],
	// 	// [-1, -1],
	// 	// [-1,  0],
	// ]
}
