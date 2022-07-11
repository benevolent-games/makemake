import { makeRtsWorld } from "./tectonic/rts-world.js";
const world = makeRtsWorld();
document.body.appendChild(world.container);
document.body.appendChild(world.settings.element);
window.theater = world.theater;
world.initialize()
    .then(() => console.log("🗿 done"))
    .catch(error => console.error(error));
//# sourceMappingURL=demo.js.map