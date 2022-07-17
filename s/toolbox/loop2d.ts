import {V2} from "./v2.js"

export function loop2d(
		rx: number,
		ry: number,
		fun: (x: number, y: number, index: number) => void,
	) {
	let index = 0
	for (let x = 0; x < rx; x++)
		for (let y = 0; y < ry; y++)
			fun(x, y, index++)
}

export function loop2d2(
		[sizeX, sizeY]: V2,
		fun: (vector: V2, index: number) => void,
	) {
	let index = 0
	for (let y = 0; y < sizeY; y++)
		for (let x = 0; x < sizeX; x++)
			fun([x, y], index++)
}

