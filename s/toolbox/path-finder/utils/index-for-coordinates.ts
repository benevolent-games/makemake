
import {V2} from "../../v2.js"

export function indexForCoordinates([x, y]: V2, columns: number) {
	return (columns * y) + x
}
