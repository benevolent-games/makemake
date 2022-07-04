
import {V2} from "../toolbox/v2.js"
import {V3, v3} from "../toolbox/v3.js"

import {SimplexNoise} from "simplex-noise/dist/esm/simplex-noise.js"

import "@babylonjs/loaders/glTF/2.0/index.js"
import "@babylonjs/core/Lights/Shadows/index.js"

import {Scene} from "@babylonjs/core/scene.js"
import {Mesh} from "@babylonjs/core/Meshes/mesh.js"
import {FloatArray} from "@babylonjs/core/types.js"
import {easing, Easing} from "../toolbox/easing.js"
import {loadGlb} from "../toolbox/babylon/load-glb.js"
import {Color3} from "@babylonjs/core/Maths/math.color.js"
import {loadShader} from "../toolbox/babylon/load-shader.js"
import {VertexBuffer} from "@babylonjs/core/Buffers/buffer.js"
import {MeshBuilder} from "@babylonjs/core/Meshes/meshBuilder.js"
import {VertexData} from "@babylonjs/core/Meshes/mesh.vertexData.js"
import {PBRMaterial} from "@babylonjs/core/Materials/PBR/pbrMaterial.js"
import {ArcRotateCamera} from "@babylonjs/core/Cameras/arcRotateCamera.js"
import {DirectionalLight} from "@babylonjs/core/Lights/directionalLight.js"
import {Vector3} from "@babylonjs/core/Maths/math.js"
import {pseudoRandomTools, randomSeed} from "../toolbox/random.js"
import {ShadowGenerator} from "@babylonjs/core/Lights/Shadows/shadowGenerator.js"
import {AbstractMesh} from "@babylonjs/core/Meshes/abstractMesh.js"
import {GroundMesh} from "@babylonjs/core/Meshes/groundMesh.js"

export interface ArenaSpecification {
	size: V2
	heights: number[]
}

export interface BasicOptions {
	canvas: HTMLCanvasElement
	scene: Scene
}

export async function makeRtsWorld(options: BasicOptions) {
	const mapSize = 1000

	const aerial = await makeAerialCamera(options)

	const seed = Math.random()
	const randomTools = pseudoRandomTools(randomSeed())

	const terrainGenerator = prepareTerrainGenerator({
		seed,
		treeDensityScale: 200,
		layers: [
			{
				scale: 400,
				amplitude: 35,
				ease: easing.linear,
			},
			{
				scale: 300,
				amplitude: 25,
				ease: x => easing.exponential(x - 0.2),
			},
			{
				scale: 200,
				amplitude: 15,
				ease: easing.linear,
			},
			{
				scale: 72,
				amplitude: 5,
				ease: easing.linear,
			},
			{
				scale: 11,
				amplitude: 0.8,
				ease: easing.linear,
			},
		],
	})

	const terrain = await makeTerrain({
		...options,
		mapSize,
		terrainGenerator,
		cliffSlopeFactor: 0.4,
		groundShaderUrl: "https://dl.dropbox.com/s/may8ifijik7mwms/terrainShader2.json",
	})
	const props = await loadGlb(
		options.scene,
		"https://dl.dropbox.com/s/9p0k1aacrcy8c9q/forestAssetPack2.glb",
	)
	const ambientColor = new Color3(1, 1, 1)

	// terrain.sun.shadowMinZ = 100
	// terrain.sun.shadowMaxZ = 500
	// const shadowGenerator = new ShadowGenerator(1024, terrain.sun)
	const shadowSet = new Set<AbstractMesh>()

	for (const material of props.materials) {
		if (material instanceof PBRMaterial)
			material.ambientColor = ambientColor
	}
	const leaves = <PBRMaterial>props.materials.find(m => m.name === "treeleaves")!
	// console.log(leaves)
	leaves.alphaCutOff = 0.35
	leaves.subSurface.isTranslucencyEnabled = true
	leaves.subSurface.translucencyIntensity = 0.8
	// console.log(leaves.alphaCutOff)
	// leaves.alphaMode = Material.MATERIAL_ALPHABLEND
	// const tex = <Texture>leaves.getActiveTextures()[0]
	// console.log(tex.anisotropicFilteringLevel)
	// console.log(tex)
	// console.log(props.meshes.map(m => m.name))
	const tree1 = <Mesh[]>props.meshes.filter(m => m.name.startsWith("tree1"))
	// console.log(props.materials.map(m => m.name))
	
	// hide all base meshes
	for (const mesh of props.meshes)
		mesh.isVisible = false

	const [tree1a, tree1b] = tree1

	for (let index = 0; index < 5000; index += 1) {
		const x = (randomTools.random() * mapSize) - (mapSize / 2)
		const y = (randomTools.random() * mapSize) - (mapSize / 2)
		const density = terrainGenerator.sampleTreeDensity(x, y)
		const alive = randomTools.random() < density
		if (alive) {
			const height = terrainGenerator.sampleHeight(x, y)
			const position = v3.toBabylon([x, height, y])
			const a = tree1a.createInstance("tree1a_" + index)
			const b = tree1b.createInstance("tree1b_" + index)
			shadowSet.add(a).add(b)
			a.setAbsolutePosition(position)
			b.setAbsolutePosition(position)
		}
	}

	// shadowGenerator.bias = 0.0001;
	// shadowGenerator.bias = 0.001;
	// shadowGenerator.normalBias = 0.02;
	// terrain.sun.shadowMaxZ = 50
	// terrain.sun.shadowMinZ = 200
	// shadowGenerator.useBlurExponentialShadowMap = true;
	// shadowGenerator.useCloseExponentialShadowMap = true;

	// shadowGenerator.forceBackFacesOnly = true
	// shadowGenerator.useContactHardeningShadow = true;
	// shadowGenerator.contactHardeningLightSizeUVRatio = 0.05;
	// shadowGenerator.setDarkness(0.5);
	terrain.sun.position = v3.toBabylon(
		v3.multiplyBy(
			v3.normalize(v3.negate(v3.fromBabylon(terrain.sun.direction))),
			100
		)
	)
	// shadowGenerator.addShadowCaster(terrain.ground)
	// for (const caster of shadowSet)
	// 	shadowGenerator.addShadowCaster(caster)
	// terrain.ground.receiveShadows = true
}

export async function makeAerialCamera({scene, canvas}: BasicOptions) {
	const circle = 2 * Math.PI
	const camera = new ArcRotateCamera(
		"cam",
		circle / 6,
		circle / 6,
		50,
		v3.toBabylon([0, 5, 0]),
		scene,
	)
	camera.attachControl(canvas, true)
}

type TerrainGenerator = ReturnType<typeof prepareTerrainGenerator>

function prepareTerrainGenerator({
		seed, layers, treeDensityScale,
	}: {
		seed: number
		layers: NoiseLayer[]
		treeDensityScale: number
	}) {

	const maxAmplitude = layers
		.reduce((previous, current) => previous + current.amplitude, 0)

	const halfAmplitude = maxAmplitude / 2

	const {noise2d} = prepareSmartNoise(seed)
	const offsetBetweenEachLayer = 100_000

	function sampleHeight(x: number, y: number) {
		let factor = 0
		layers.forEach(({scale, amplitude, ease}, index) => {
			const offset = index * offsetBetweenEachLayer
			const rawNoise = noise2d(
				offset + (x / scale),
				offset + (y / scale),
			)
			const noise = (rawNoise + 1) / 2
			factor += ease(noise) * amplitude
		})
		return factor - halfAmplitude
	}

	function sampleTreeDensity(x: number, y: number) {
		const offset = -696969
		return noise2d(
			offset + (x / treeDensityScale),
			offset + (y / treeDensityScale),
		)
	}

	return {sampleHeight, sampleTreeDensity}
}

export async function makeTerrain({
		scene,
		mapSize,
		groundShaderUrl,
		cliffSlopeFactor,
		terrainGenerator,
	}: BasicOptions & {
		mapSize: number
		groundShaderUrl: string
		cliffSlopeFactor: number
		terrainGenerator: TerrainGenerator
	}) {

	const sunDirection = v3.toBabylon([-1, -1, -1])
	const sun = new DirectionalLight("light", sunDirection, scene)
	sun.intensity = 1.5

	const ground = makeGround({
		scene,
		size: mapSize,
		resolution: 500,
		wireframe: false,
	})

	morphGround({
		ground,
		terrainGenerator,
	})

	const shader = await loadShader({
		scene,
		url: groundShaderUrl,
		label: "groundshader",
	})
	shader.assignInputs({cliffSlopeFactor, normalStrength: 1})
	ground.material = shader.material

	return {ground, sun}
}

function makeGround({scene, size, resolution, wireframe}: {
		scene: Scene
		size: number
		resolution: number
		wireframe: boolean
	}) {
	const ground = MeshBuilder.CreateGround("ground", {
		width: size,
		height: size,
		subdivisions: resolution,
		updatable: true,
	}, scene)
	const material = new PBRMaterial("groundmaterial", scene)
	material.ambientColor = new Color3(1, 1, 1)
	material.albedoColor = new Color3(0.75, 0.61, 0.44)
	material.roughness = 1
	material.metallic = 0
	ground.material = material
	ground.material.wireframe = wireframe
	return ground
}

type Vertex = {
	position: V3
	normal: V3
}

type NoiseLayer = {
	scale: number
	amplitude: number
	ease: Easing
}

function prepareSmartNoise(seed: number) {
	const generator = new SimplexNoise(seed)
	return {
		noise2d(x: number, y: number) {
			return generator.noise2D(x, y)
		},
	}
}

function prepareDumbNoise(seed: number) {
	seed += 999_999
	const {sin, PI: pi} = Math
	const twitch = pi / 3
	const seedOffset = 999
	function wave(x: number) {
		return (sin(2 * x) + sin(pi * x) + 1) / 2
	}
	function noise1d(x: number) {
		x += seed * seedOffset
		return (wave(x) + wave((x * 0.11) + 666.6)) / 2
	}
	function noise2d(x: number, y: number) {
		return (
			noise1d(x) +
			noise1d(y) +
			noise1d(x + y)
		) / 3
	}
	return {noise1d, noise2d}
}

export type Noise2d = (x: number, y: number) => number

function morphGround({ground, terrainGenerator}: {
		ground: Mesh
		terrainGenerator: TerrainGenerator
	}) {

	function displace(x: number, y: number, z: number): V3 {
		return [x, y + terrainGenerator.sampleHeight(x, z), z]
	}

	const positions = ground.getVerticesData(VertexBuffer.PositionKind)!
	const newPositions: FloatArray = []
	for(let vertexIndex = 0; vertexIndex < positions.length; vertexIndex+= 3){
		const x = positions[vertexIndex]
		const y = positions[vertexIndex+ 1]
		const z = positions[vertexIndex+ 2]
		const newxyz = displace(x, y, z)
		newPositions.push(...newxyz)
	}

	ground.setVerticesData(VertexBuffer.PositionKind, newPositions)

	const normals: FloatArray = []
	VertexData.ComputeNormals(newPositions, ground.getIndices(), normals)
	ground.setVerticesData(VertexBuffer.NormalKind, normals)
}
