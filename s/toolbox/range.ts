
export function range(n: number) {
	const array = Array(n)
	for (let i = 0; i < n; i++)
		array[i] = i
	return array
}
