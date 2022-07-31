
import {WebGpuError} from "./errors.js"

export async function setupWebGpu() {
	if (!navigator.gpu)
		throw new WebGpuError("browser does not support webgpu")

	const adapter = await navigator.gpu.requestAdapter()
	if (!adapter)
		throw new WebGpuError("adapter not available")

	const device = await adapter.requestDevice()
	if (!device)
		throw new WebGpuError("device not available")

	device.lost.then(() => {
		throw new WebGpuError("device lost")
	})

	const canvas = document.createElement("canvas")
	const context = canvas.getContext("webgpu")!
	if (!context)
		throw new WebGpuError("canvas context not available")

	return {
		adapter,
		device,
		canvas,
		context,
	}
}
