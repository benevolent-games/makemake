
# ⛰️ benevolent's terrarium

*an outdoor world generator for babylonjs web games*

![image of terrarium](https://dl.dropbox.com/s/nzgvtr3jybog7k0/terrarium.jpg)

🕹️ [live demo](https://makemake.benevolent.games/terrarium/)  

⛰️ landscapes of procedurally infinite size  
🌳 trees, grasses, and shrubbery  
🌞 sky with day/night cycle, and weather  

🎲 randomly generate outdoor worlds  
🌱 seedable and repeatable  
💾 loads fast, less than 2 megabytes  
🧭 comes with navmesh for pathfinding  

💖 free and open source just for you  
👼 brought to you by [benevolent.games](https://benevolent.games/)  

## easy install into your babylonjs web game

```js
import "https://makemake.benevolent.games/setup.js"
import {makeTerrarium} from "@benevolent/makemake/x/terrarium.js"

const p = makeTerrarium.presets

const terrarium = await makeTerrarium({
  scene: myBabylonScene,
  seed: Math.random(),
  landscape: p.landscapes.seasideHills(),
  ecosystem: p.ecosystems.mediterranean(),
  sky: p.skies.sunny(),
  time: p.times.afternoon(),
})
```
