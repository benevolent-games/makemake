
import {setupWebGpu} from "./setup-web-gpu.js"
import {GPUBufferUsage, GPUMapMode} from "./gpu-flags.js"

export async function compute({
		adapter,
		canvas,
		context,
		device,
	}: Awaited<ReturnType<typeof setupWebGpu>>) {

	const data = new Int32Array([0, 1, 2, 3])

	const gpuInputBuffer = device.createBuffer({
		size: data.byteLength,
		mappedAtCreation: true,
		usage: GPUBufferUsage.MAP_WRITE | GPUBufferUsage.COPY_SRC,
	})
	new Int32Array(gpuInputBuffer.getMappedRange()).set(data)
	gpuInputBuffer.unmap()

	const gpuOutputBuffer = device.createBuffer({
		size: data.byteLength,
		mappedAtCreation: false,
		usage: GPUBufferUsage.COPY_DST | GPUBufferUsage.MAP_READ,
	})

	const copyEncoder = device.createCommandEncoder();
	copyEncoder.copyBufferToBuffer(
		gpuInputBuffer, 0,
		gpuOutputBuffer, 0,
		data.byteLength,
	)

	const copyCommands = copyEncoder.finish()
	device.queue.submit([copyCommands])

	await gpuOutputBuffer.mapAsync(GPUMapMode.READ)
	const copyArrayBuffer = gpuOutputBuffer.getMappedRange()
	console.log(new Int32Array(copyArrayBuffer))
}
