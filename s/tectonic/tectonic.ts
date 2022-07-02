
import {V2} from "../toolbox/v2.js"
import {V3, v3} from "../toolbox/v3.js"

import SimplexNoise from "simplex-noise/dist/esm/simplex-noise.js"

import {Scene} from "@babylonjs/core/scene.js"
import {Mesh} from "@babylonjs/core/Meshes/mesh.js"
import {FloatArray} from "@babylonjs/core/types.js"
import {Color3} from "@babylonjs/core/Maths/math.color.js"
import {VertexBuffer} from "@babylonjs/core/Buffers/buffer.js"
import {MeshBuilder} from "@babylonjs/core/Meshes/meshBuilder.js"
import {VertexData} from "@babylonjs/core/Meshes/mesh.vertexData.js"
import {PBRMaterial} from "@babylonjs/core/Materials/PBR/pbrMaterial.js"
import {ArcRotateCamera} from "@babylonjs/core/Cameras/arcRotateCamera.js"
import {DirectionalLight} from "@babylonjs/core/Lights/directionalLight.js"

export interface ArenaSpecification {
	size: V2
	heights: number[]
}

export interface BasicOptions {
	canvas: HTMLCanvasElement
	scene: Scene
}

export async function makeRtsWorld(options: BasicOptions) {
	const seed = Math.random()
	const aerial = await makeAerialCamera(options)
	const terrain = await generateTerrain({...options, seed})
}

export async function makeAerialCamera({scene, canvas}: BasicOptions) {
	const circle = 2 * Math.PI
	const camera = new ArcRotateCamera(
		"cam",
		circle / 6,
		circle / 6,
		10,
		v3.toBabylon([0, 5, 0]),
		scene,
	)
	camera.attachControl(canvas, true)
}

export async function generateTerrain({
		seed,
		scene,
	}: BasicOptions & {seed: number}) {

	const sunDirection = v3.toBabylon([-2, -1, -1])
	const sun = new DirectionalLight("light", sunDirection, scene)
	sun.intensity = 2

	const ground = makeGround({
		scene,
		size: 50,
		resolution: 20,
		wireframe: false,
	})

	const seed2 = (seed + 0.5) % 1

	morphTerrainRandomly({
		ground,
		big: {
			generator: new SimplexNoise(seed),
			scale: 20,
			amplitude: 2,
		},
		small: {
			generator: new SimplexNoise(seed2),
			scale: 5,
			amplitude: 0.5,
		},
	})

	return {ground, light: sun}
}

////////
////////
////////

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
	}, scene);
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

type NoiseDetail = {
	generator: SimplexNoise
	scale: number
	amplitude: number
}

function morphTerrainRandomly({ground, big, small}: {
		ground: Mesh
		big: NoiseDetail
		small: NoiseDetail
	}) {

	function noise({generator, scale, amplitude}: NoiseDetail, x: number, y: number) {
		return generator.noise2D(x / scale, y / scale) * amplitude
	}

	function displace(x: number, y: number, z: number): V3 {
		const factorA = noise(big, x, z)
		const factorB = noise(small, x, z)
		const factor = factorA + factorB
		return [x, y + factor, z]
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
