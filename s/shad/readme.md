
# 🐟 benevolent shad

*webgl glsl shader development laboratory*

🕹️ [makemake.benevolent.games/shad](https://makemake.benevolent.games/shad)  

how to use shad:

1. make a directory on your machine, named `shader` or something
1. download [example.material.glsl](./example.material.glsl) into the directory
1. also put any textures you want in there
1. open a terminal in that directory
1. run an http-server for that directory with terminal command `npx http-server --cors`
1. browse to the web app: [makemake.benevolent.games/shad](https://makemake.benevolent.games/shad)
1. insert your local link `http://localhost:8080/example.material.glsl`
1. you can insert similar links for your textures
1. click `rebuild material`
1. edit your `example.material.glsl`, save, and hit `rebuild material` -- repeat until your shader is pretty

know this:

- shad uses a silly `.material.glsl` format which sandwiches together the vertex and fragment shader.
- they are separated by two lines full of slashes (each line at least 8 consecutive slashes followed by any characters).
