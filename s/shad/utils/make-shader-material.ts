
import {Scene} from "@babylonjs/core/scene.js"
import {Vector3} from "@babylonjs/core/Maths/math.js"
import {Texture} from "@babylonjs/core/Materials/Textures/texture.js"
import {ShaderMaterial} from "@babylonjs/core/Materials/shaderMaterial.js"

import {ShaderSpec, UniformData} from "./control-panel.js"

export function makeShaderMaterial({scene, spec, sources}: {
		scene: Scene
		spec: ShaderSpec
		sources: {vertex: string, fragment: string}
	}) {

	const attributes = [
		"uv",
		"normal",
		"position",
	]

	const uniforms = [
		"time",
		"view",
		"world",
		"worldView",
		"projection",
		"worldViewProjection",

		"cameraPosition",

		...spec.uniformSpecs.map(s => s.name),
	]

	const shaderSources = {
		vertexSource: sources.vertex,
		fragmentSource: sources.fragment,
	}

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
