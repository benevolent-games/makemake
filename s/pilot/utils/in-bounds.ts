
import {V2} from "../../toolbox/v2.js"

export function inBounds([x, y]: V2, [columns, rows]: V2) {
	const xGood = (x >= 0) && (x < columns)
	const yGood = (y >= 0) && (y < rows)
	return xGood && yGood
}
