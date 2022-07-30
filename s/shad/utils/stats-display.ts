
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
