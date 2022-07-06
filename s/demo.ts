
import {makeRtsWorld} from "./tectonic/rts-world.js"

const world = makeRtsWorld()

document.body.appendChild(world.container)
;(<any>window).theater = world.theater

world.initialize()
	.then(() => console.log("🗿 done"))
	.catch(error => console.error(error))
