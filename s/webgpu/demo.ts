
import {compute} from "./internal/compute.js"
import {setupWebGpu} from "./internal/setup-web-gpu.js"

const zone = document.querySelector(".zone")!

try {
	const details = await setupWebGpu()
	zone.append(details.canvas)
	await compute(details)
}
catch (error: any) {
	console.error(error)
	zone.textContent = error?.message ?? "unknown error"
	zone.setAttribute("data-error", "")
}
