
export async function loadCustomMaterialShader(url: string) {
	const source = await fetchText(url)
	const parts = source.split(/(?:\/{8,}.*\n){2,}/gm)
	if (parts.length !== 2)
		throw new Error(`failed material shader, expected 2 parts (got ${parts.length})`)
	const [vertex, fragment] = parts
	return {vertex, fragment}
}

async function fetchText(url: string) {
	return fetch(url).then(r => r.text())
}
