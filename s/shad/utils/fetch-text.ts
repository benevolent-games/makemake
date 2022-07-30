
export async function fetchText(url: string) {
	return fetch(url).then(r => r.text())
}
