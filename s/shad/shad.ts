
import "@babylonjs/core/Materials/standardMaterial.js"

import {html, render} from "lit"
import {Scene} from "@babylonjs/core/scene.js"
import {Vector3} from "@babylonjs/core/Maths/math.js"
import {Engine} from "@babylonjs/core/Engines/engine.js"
import {MeshBuilder} from "@babylonjs/core/Meshes/meshBuilder.js"
import {Color3, Color4} from "@babylonjs/core/Maths/math.color.js"
import {Texture} from "@babylonjs/core/Materials/Textures/texture.js"
import {ShaderMaterial} from "@babylonjs/core/Materials/shaderMaterial.js"
import {ArcRotateCamera} from "@babylonjs/core/Cameras/arcRotateCamera.js"
import {DirectionalLight} from "@babylonjs/core/Lights/directionalLight.js"
import {StandardMaterial} from "@babylonjs/core/Materials/standardMaterial.js"

import {ControlPanel, ShaderSpec, UniformData} from "./control-panel.js"
import {nap} from "../toolbox/nap.js"

void async function main() {
	const {canvas, engine, scene} = setupShaderScene()
	;(<any>window).engine = engine
	const zone = <HTMLDivElement>document.querySelector(".zone")!
	zone.append(canvas)
	engine.resize()
	window.addEventListener("resize", () => engine.resize())

	const cube = MeshBuilder.CreateBox("box", {size: 20}, scene)
	const material = new StandardMaterial("mat", scene)
	material.diffuseColor = new Color3(0.8, 0.8, 0.8)
	material.ambientColor = new Color3(1, 1, 1)
	cube.material = material

	const stats = makeStatsDisplay()
	zone.append(stats.element)
	void function displayFramerate() {
		stats.setFramerate(engine.getFps())
		requestAnimationFrame(displayFramerate)
	}()

	let disposePreviousShader = () => {}

	const controlPanel = makeControlPanel({
		async rebuildMaterial(spec) {
			const sources = await loadMaterialShader(spec.shaderUrl + "?q=" + Date.now())
			const {material, dispose} = makeShaderMaterial({scene, spec, sources})
			cube.material = material
			disposePreviousShader()
			disposePreviousShader = dispose
			return nap(1000)
		},
		setUniformData(data) {
			console.log("TODO set uniform data")
		},
	})
	zone.append(controlPanel.element)
}()

export function makeShaderMaterial({scene, spec, sources}: {
		scene: Scene
		spec: ShaderSpec
		sources: {vertex: string, fragment: string}
	}) {
	const attributes = ["position", "normal", "uv", "time"]
	const uniforms = ["world", "worldView", "worldViewProjection", "view", "projection"]
	for (const {name} of spec.uniformSpecs)
		uniforms.push(name)
	const shaderSources = {vertexSource: sources.vertex, fragmentSource: sources.fragment}
	const material = new ShaderMaterial(
		"shader",
		scene,
		shaderSources,
		{attributes, uniforms},
	)
	function setUniformData(uniformData: UniformData) {
		for (const {name, type} of spec.uniformSpecs) {
			if (type === "float")
				material.setFloat(name, uniformData[name])
		}
	}
	setUniformData(spec.uniformData)
	for (const [name, url] of Object.entries(spec.textures)) {
		const texture = new Texture(url + "?q=" + Date.now(), scene)
		material.setTexture(name, texture)
	}
	return {
		material,
		setUniformData,
		dispose() {
			material.dispose()
		},
	}
}

export async function loadMaterialShader(url: string) {
	const source = await fetchText(url)
	const parts = source.split(/(?:\/{8,}.*\n){2,}/gm)
	if (parts.length !== 2)
		throw new Error(`failed material shader, expected 2 parts (got ${parts.length})`)
	const [vertex, fragment] = parts
	return {vertex, fragment}
}

export function makeControlPanel({rebuildMaterial, setUniformData}: {
		rebuildMaterial: (spec: ShaderSpec) => Promise<void>
		setUniformData: (data: UniformData) => void
	}) {
	const element = document.createElement("div")
	element.className = "controlpanel"
	render(html`
		${ControlPanel({
			rebuildMaterial,
			setUniformData,
		})}
	`, element)
	return {element}
}

export function makeStatsDisplay() {
	const element = document.createElement("div")
	element.className = "stats"
	element.innerHTML = `<p class="framerate">--</p>`
	const p = element.querySelector(".framerate")!
	return {
		element,
		setFramerate(value: number) {
			p.textContent = value.toFixed(0)
		},
	}
}

export function setupShaderScene() {
	const canvas = document.createElement("canvas")
	const engine = new Engine(canvas, true)
	const scene = new Scene(engine, {
		useGeometryUniqueIdsMap: true,
		useMaterialMeshMap: true,
	})

	scene.clearColor = new Color4(0.03, 0.03, 0.03, 1)
	scene.ambientColor = new Color3(0.005, 0.005, 0.005)

	const camera = new ArcRotateCamera("cam", 0, Math.PI / 4, 100, new Vector3(0, 0, 0))
	const sunlight = new DirectionalLight("sunlight", new Vector3(-0.9, -1.2, -1), scene)
	const backlight = new DirectionalLight("backlight", new Vector3(1.1, 0.9, 1.2), scene)
	sunlight.intensity = 1.5
	backlight.intensity = 0.2

	camera.attachControl(canvas)
	engine.runRenderLoop(() => scene.render())
	return {canvas, engine, scene, camera}
}

async function fetchText(url: string) {
	return fetch(url).then(r => r.text())
}
