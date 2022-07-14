let cols = 20
let rows = 20
const grid = new Array(cols)
let openSet: Spot[] = []
let closedSet: Spot[] = []
let start: Spot
let end: Spot
let path: Spot[] = []

function removeFromArray(arr: Spot[], elt: Spot) {
	return arr.filter((el) => el !== elt)
}

function heuristic(a: number[], b: number[]) {
	const euclideanDistance = Math.hypot(...a.map((k, i) => b[i] - a[i]))
	return euclideanDistance
}

// type CellSpot = {
// 	i: number
// 	j: number
// 	f: number
// 	g: number
// 	h: number
// 	neighbors: any[]
// 	previous: undefined | CellSpot
// }

class Spot {
	i: number = 0
	j: number = 0
	f: number = 0
	g: number = 0
	h: number = 0
	neighbors: Spot[] = []
	previous: undefined | Spot

	constructor(i: number, j: number) {
		this.i = i
		this.j = j
	}

	addNeighbors = (grid: any[]) => {
		const { i, j, neighbors } = this
		if (i < cols - 1) neighbors.push(grid[i + 1][j])
		if (i > 0) neighbors.push(grid[i - 1][j])
		if (j < rows - 1) neighbors.push(grid[i][j + 1])
		if (j > 0) neighbors.push(grid[i][j - 1])
		if (i > 0 && j > 0) neighbors.push(grid[i - 1][j - 1])
		if (i < cols - 1 && j > 0) neighbors.push(grid[i + 1][j - 1])
		if (i > 0 && j < rows - 1) neighbors.push(grid[i - 1][j + 1])
		if (i < cols - 1 && j < rows - 1) neighbors.push(grid[i + 1][j + 1])
	}
}

for (const [i, col] of grid.entries()) {
	grid[i] = new Array(rows)
}

for (const [i, col] of grid.entries()) {
	for (const [j, row] of col.entries()) {
		grid[i][j] = new Spot(i, j)
	}
}

for (const [i, col] of grid.entries()) {
	for (const [j, row] of col.entries()) {
		grid[i][j].addNeighbors(grid)
	}
}

start = grid[0][0]
end = grid[cols - 1][rows - 1]
openSet.push(start)

while (openSet.length > 0) {
	let winner = 0
	for (let [index, spot] of openSet.entries()) {
		if (spot.f < openSet[winner].f) {
			winner = index
		}
	}

	let current = openSet[winner]

	if (current === end) {
		let temp = current
		path.push(temp)
		while (temp.previous) {
			path.push(temp.previous)
			temp = temp.previous
		}

		console.log(path)
		console.log("DONE!!!")
	}

	openSet = openSet.filter((spot) => spot !== current)
	closedSet.push(current)

	const neighbors = current.neighbors;
	for (let i = 0; i < neighbors.length; i++) {
		let neighbor = neighbors[i]
		if (!closedSet.includes(neighbor)) {
			const tempG = current.g + 1

			let newPath = false
			if (openSet.includes(neighbor)) {
				if (tempG < neighbor.g) {
					neighbor.g = tempG
					newPath = true
				}
			} else {
				neighbor.g = tempG
				newPath = true
				openSet.push(neighbor)
			}

			if (newPath) {
				neighbor.h = heuristic([neighbor.i, neighbor.j], [end.i, end.j])
				neighbor.f = neighbor.g + neighbor.h
				neighbor.previous = current
			}
		}
	}
}

// console.log(grid)
