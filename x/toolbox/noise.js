import SimplexNoise from "simplex-noise/dist/esm/simplex-noise.js";
export function prepareNoise(seed) {
    const generator = new SimplexNoise(seed);
    return {
        noise2d(x, y) {
            return generator.noise2D(x, y);
        },
    };
}
//# sourceMappingURL=noise.js.map