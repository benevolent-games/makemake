
# 👨‍✈️ benevolent pilot

*pathfinding system for web games*

🕹️ [live demo](https://makemake.benevolent.games/pilot/)  

🗺️ find shortest paths between points  
🧗 negotiate complex terrain and obstacles  
🐢 consider speed penalties like steep slopes, mud, etc  
⛰️ use a navmesh from [terrarium](../terrarium), or make your own  
✏️ "living paths" update dynamically as obstacles change  
🪜 even works in fully 3d environments  
🧵 multi-threaded with web-workers  

👼 a [benevolent.games](https://benevolent.games/) project  
🗿 part of the [makemake](https://github.com/benevolent-games/makemake) codebase  
💖 free and open source, just for you

<br/>

## how to use pilot for pathfinding in your web games

1. create a pilot (using a [terrarium](../terrarium/) navmesh)
    ```js
    import "https://makemake.benevolent.games/setup.js"
    import {makePilot, Shapes} from "@benevolent/makemake/x/pilot.js"

    // create a pilot
    const pilot = await makePilot({

      // let's use a navmesh from a terrarium terrain
      navmesh: terrarium.navmesh,
    })
    ```

2. add an obstacle (which paths must avoid)

    ```js
    const obstacle = await pilot.addObstacle({
      position: [0, 0, 0],
      shape: {
        type: Shapes.Sphere,
        radius: 10,
      },
    })

    // move the obstacle
    await obstacle.updatePosition([1, 0, 0])
    ```

3. find the path between two points

    ```js
    const path = await pilot.findPath({
      to: [0, 0, 10],
      from: [0, 0, -10],
    })

    // log the path to the console:
    console.log(path.debug)
      // path has 10 points:
      //  - [0, 0, -10]
      //  - [0, 0, -8]
      // [...]
    ```

4. create a more advanced "living path"  
    (which magically updates around new obstacles)
    ```js
    // create a path between two points
    const livingPath = await pilot.createLivingPath({
      to: [0, 0, 10],
      getCurrentPosition: () => [0, 0, -10],
    })

    // move the obstacle
    await obstacle.updatePosition([1, 0, 1])

    // wait for the living path to recalculate
    // around the obstacle
    await livingPath.waitForUpdates

    // log the path to the console:
    console.log(path.debug)
    ```

5. cleanup stuff when we're done

    ```js
    // dispose of the obstacle we created
    await obstacle.dispose()

    // dispose of the living path
    await livingPath.dispose()

    // dispose of everything under this pilot (faster)
    await pilot.dispose()
    ```
