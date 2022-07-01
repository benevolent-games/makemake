
import "@babylonjs/core/Materials/standardMaterial.js"

import {Scene} from "@babylonjs/core/scene.js"
import {Engine} from "@babylonjs/core/Engines/engine.js"
import {Color4} from "@babylonjs/core/Maths/math.color.js"
import {Vector3} from "@babylonjs/core/Maths/math.vector.js"
import {MeshBuilder} from "@babylonjs/core/Meshes/meshBuilder.js"
import {ArcRotateCamera} from "@babylonjs/core/Cameras/arcRotateCamera.js"
import {HemisphericLight} from "@babylonjs/core/Lights/hemisphericLight.js"

const demo = document.querySelector<HTMLElement>(".demo")!
const canvas = document.createElement("canvas")
demo.appendChild(canvas)

const engine = new Engine(canvas, true)
const scene = new Scene(engine)
scene.clearColor = new Color4(0, 0, 0, 0)

const circle = 2 * Math.PI
const camera = new ArcRotateCamera(
	"cam",
	circle / 6,
	circle / 6,
	2.5,
	Vector3.Zero(),
	scene,
)
camera.attachControl(canvas, true)
const light = new HemisphericLight("light", new Vector3(1, 0.67, 0), scene)
const box = MeshBuilder.CreateBox("box", {size: 1}, scene)
console.log("demo setup complete", {scene, engine, camera, light, box})

engine.runRenderLoop(() => scene.render())
