
import {Navmesh} from "../../pilot/types.js"
import {Theater} from "../theater/theater.js"
import {UtilityLayerRenderer} from "@babylonjs/core/Rendering/utilityLayerRenderer.js"
import {MeshBuilder} from "@babylonjs/core/Meshes/meshBuilder.js"
import {Mesh} from "@babylonjs/core/Meshes/mesh.js"
import {VertexData} from "@babylonjs/core/Meshes/mesh.vertexData.js"
import {StandardMaterial} from "@babylonjs/core/Materials/standardMaterial.js"
import {Color3} from "@babylonjs/core/Maths/math.color.js"
import {Matrix, Vector3} from "@babylonjs/core/Maths/math.js"
import {spawnBox} from "../hand/spawn-box.js"
import {V3, v3} from "../../toolbox/v3.js"
import {Scene} from "@babylonjs/core/scene.js"

export function visualizeNavmesh({navmesh, theater}: {
		navmesh: Navmesh
		theater: Theater
	}) {
	const layer = new UtilityLayerRenderer(theater.scene)
	const scene = theater.scene
	const {traversable, pathable} = navmesh
	drawTraversableArea({traversable, theater})
	drawPathableNodes({pathable, scene})
}

function drawPathableNodes({
		scene,
		pathable: {beacons, edges},
	}: {
		scene: Scene
		pathable: Navmesh["pathable"]
	}) {

	const offset: V3 = [0, 3, 0]

	// draw a box on each beacon
	{
		const box = spawnBox({
			size: 2,
			color: [1, 1, 1],
			position: [0, 0, 0],
			scene,
			unlit: true,
		})
		const matrices = beacons
			.filter(b => !!b)
			.map(p => Matrix.Translation(...v3.add(p, offset)))
		box.thinInstanceAdd(matrices)
	}

	// draw lines along edges
	{
		const lines: Vector3[][] = []
		for (const [index, connected] of edges.entries()) {
			if (connected) {
				for (const connection of connected) {
					const from = new Vector3(...v3.add(beacons[index], offset))
					const to = new Vector3(...v3.add(beacons[connection], offset))
					lines.push([from, to])
				}
			}
		}
		const lineSystem = MeshBuilder.CreateLineSystem("lines", {
			lines,
			useVertexAlpha: false,
		}, scene)
		lineSystem.color = new Color3(0.5, 1, 1)
	}
}

function drawTraversableArea({
		theater,
		traversable: {vertices, triangles},
	}: {
		theater: Theater
		traversable: Navmesh["traversable"]
	}) {

	const mesh = new Mesh("navmesh_traversable", theater.scene)

	const positions: number[] = []
	const indices: number[] = []
	for (let i = 0; i < triangles.length; i++) {
		const [vi1, vi2, vi3] = triangles[i]
		const v1 = vertices[vi1]
		const v2 = vertices[vi2]
		const v3 = vertices[vi3]
		let i2 = i * 3
		positions.push(...v1, ...v2, ...v3)
		indices.push(i2)
	}

	const data = new VertexData()
	data.positions = positions
	data.indices = indices
	data.applyToMesh(mesh, false)

	const material = new StandardMaterial("hello")
	material.diffuseColor = new Color3(1, 1, 1)
	material.ambientColor = new Color3(1, 1, 1)
	material.disableLighting = true
	material.wireframe = true
	material.zOffset = 100
	mesh.material = material

	return mesh
}

