
import {Mesh} from "@babylonjs/core/Meshes/mesh.js"
import {Color3} from "@babylonjs/core/Maths/math.color.js"
import {PBRMaterial} from "@babylonjs/core/Materials/PBR/pbrMaterial.js"

import {v3} from "../../toolbox/v3.js"
import {BasicOptions} from "../types.js"
import {ShadowControl} from "./lighting.js"
import {Randomly} from "../../toolbox/randomly.js"
import {TerrainGenerator} from "./terrain-generator.js"
import {loadGlb} from "../../toolbox/babylon/load-glb.js"

export async function sprinkleProps({
		scene,
		mapSize,
		randomly,
		shadowControl,
		terrainGenerator,
	}: BasicOptions & {
		mapSize: number
		randomly: Randomly
		shadowControl: ShadowControl
		terrainGenerator: TerrainGenerator
	}) {

	const assets = await loadGlb(
		scene,
		"https://dl.dropbox.com/s/9p0k1aacrcy8c9q/forestAssetPack2.glb",
	)

	// hide all base meshes
	for (const mesh of assets.meshes)
		mesh.isVisible = false

	// enable ambient color from scene
	const ambientColor = new Color3(1, 1, 1)
	for (const material of assets.materials) {
		if (material instanceof PBRMaterial)
			material.ambientColor = ambientColor
	}

	// adjust the leaves material
	const leaves = <PBRMaterial>assets.materials.find(m => m.name === "treeleaves")!
	leaves.alphaCutOff = 0.45
	leaves.subSurface.isTranslucencyEnabled = true
	leaves.subSurface.translucencyIntensity = 0.8

	// spawn trees
	const tree1 = <Mesh[]>assets.meshes.filter(m => m.name.startsWith("tree1"))
	const [tree1a, tree1b] = tree1
	for (let index = 0; index < 5000; index += 1) {
		const x = (randomly.random() * mapSize) - (mapSize / 2)
		const y = (randomly.random() * mapSize) - (mapSize / 2)
		const density = terrainGenerator.sampleTreeDensity(x, y)
		const alive = randomly.random() < density
		if (alive) {
			const height = terrainGenerator.sampleHeight(x, y)
			const position = v3.toBabylon([x, height, y])
			const a = tree1a.createInstance("tree1a_" + index)
			const b = tree1b.createInstance("tree1b_" + index)
			shadowControl.addCaster(a)
			shadowControl.addCaster(b)
			a.setAbsolutePosition(position)
			b.setAbsolutePosition(position)
		}
	}
}
