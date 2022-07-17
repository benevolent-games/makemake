
import {Suite, expect} from "cynic"
import {makePilot} from "./toolbox/path-finder/path-finder.js"
import {makeHexNavmesh} from "./toolbox/path-finder/utils/make-hex-navmesh.js"

export default <Suite>{
	// async "testing suite works"() {
	// 	expect(true).ok()
	// },
	pilot: {
		async "find a path"() {
			const pilot = makePilot({
				navmesh: makeHexNavmesh({
					size: [5, 5],
					scale: 2,
				})
			})
			const path = pilot.pathfind(0, 24)
			expect(path.length).equals(7)
		},
	},
}
