
import {V2} from "../v2.js"
import {v3, V3} from "../v3.js"
import {range} from "../range.js"
import {loop2d} from "../loop2d.js"
import {Navmesh} from "./types.js"

export function makePilot({navmesh}: {
		navmesh: Navmesh
	}) {

	function get(map: Map<number, number>, index: number) {
		return map.get(index) ?? Infinity
	}

	function lowest(open: Set<number>, f: Map<number, number>) {
		let result = Infinity
		for (const index of open) {
			if (get(f, index) <= result)
				result = index
		}
		return result
	}

	function reconstructPath(cameFrom: Map<number, number>, current: number) {
		const path: number[] = []
		while (true) {
			path.unshift(current)
			const parent = cameFrom.get(current)
			if (parent === undefined)
				break
			current = parent
		}
		return path
	}

	const {beacons, edges} = navmesh.pathable

	function pathfind(start: number, goal: number) {
		function heuristicCostToGoal(index: number) {
			return v3.distance(beacons[index], beacons[goal])
		}

		// sets and map to keep state about each node
		const openFrontier = new Set<number>([start])
		const parents = new Map<number, number>()
		const gCostOfPathSoFar = new Map<number, number>()
		const fTotalCost = new Map<number, number>()

		// initialize starting node
		gCostOfPathSoFar.set(start, 0)
		fTotalCost.set(start, heuristicCostToGoal(start))

		// keep looping until we reach the goal
		while (openFrontier.size > 0) {
			const current = lowest(openFrontier, fTotalCost)

			if (current === goal)
				return reconstructPath(parents, goal)

			openFrontier.delete(current)
			const neighbors = edges[current].filter(i => !openFrontier.has(i))

			for (const neighbor of neighbors) {
				const previousCostOfPath = get(gCostOfPathSoFar, current)
				const costOfStep = v3.distance(beacons[current], beacons[neighbor])
				const tentativeCost = previousCostOfPath + costOfStep
				if (tentativeCost < get(gCostOfPathSoFar, neighbor)) {
					parents.set(neighbor, current)
					gCostOfPathSoFar.set(neighbor, tentativeCost)
					fTotalCost.set(neighbor, tentativeCost + heuristicCostToGoal(neighbor))
					openFrontier.add(neighbor)
				}
			}
		}

		return []
	}

	return {pathfind}

	// function findPath({to, from}: {
	// 		to: V2
	// 		from: V2
	// 	}) {

	// 	const start = grid[to[0]][to[1]]
	// 	const end = grid[from[0]][from[1]]

	// 	let openSet: Spot[] = [start]
	// 	const closedSet: Spot[] = []
	// 	const path: Spot[] = []

	// 	while (openSet.length > 0) {

	// 		//
	// 		let winner = 0
	// 		for (let [index, spot] of openSet.entries()) {
	// 			if (spot.f < openSet[winner].f) {
	// 				winner = index
	// 			}
	// 		}

	// 		let current = openSet[winner]

	// 		if (current === end) {
	// 			let temp = current
	// 			path.push(temp)
	// 			while (temp.previous) {
	// 				path.push(temp.previous)
	// 				temp = temp.previous
	// 			}

	// 			return path
	// 				.reverse()
	// 				.map(({i, j}) => [i, j])
	// 		}

	// 		openSet = openSet.filter((spot) => spot !== current)
	// 		closedSet.push(current)

	// 		const neighbors = current.neighbors;
	// 		for (let i = 0; i < neighbors.length; i++) {
	// 			let neighbor = neighbors[i]
	// 			if (!closedSet.includes(neighbor)) {
	// 				const tempG = current.g + 1

	// 				let newPath = false
	// 				if (openSet.includes(neighbor)) {
	// 					if (tempG < neighbor.g) {
	// 						neighbor.g = tempG
	// 						newPath = true
	// 					}
	// 				} else {
	// 					neighbor.g = tempG
	// 					newPath = true
	// 					openSet.push(neighbor)
	// 				}

	// 				if (newPath) {
	// 					neighbor.h = heuristic([neighbor.i, neighbor.j], [end.i, end.j])
	// 					neighbor.f = neighbor.g + neighbor.h
	// 					neighbor.previous = current
	// 				}
	// 			}
	// 		}
	// 	}

	// 	return []
	// }

	// return {findPath}
}
