
import {makeRtsWorld} from "./tectonic/rts-world.js"

const world = makeRtsWorld()
document.body.appendChild(world.container)

world.initialize()
	.then(() => console.log("init complete"))
	.catch(error => console.error(error))
