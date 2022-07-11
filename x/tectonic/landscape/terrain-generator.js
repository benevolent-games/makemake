import { v3 } from "../../toolbox/v3.js";
import { prepareNoise } from "../../toolbox/noise.js";
export function makeTerrainGenerator({ randomly, layers, treeDensityScale, }) {
    const seed = randomly.random();
    const maxAmplitude = layers
        .reduce((previous, current) => previous + current.amplitude, 0);
    const halfAmplitude = maxAmplitude / 2;
    const { noise2d } = prepareNoise(seed);
    const offsetBetweenEachLayer = 100000;
    function sampleHeight(x, y) {
        let factor = 0;
        layers.forEach(({ scale, amplitude, ease }, index) => {
            const offset = index * offsetBetweenEachLayer;
            const rawNoise = noise2d(offset + (x / scale), offset + (y / scale));
            const noise = (rawNoise + 1) / 2;
            factor += ease(noise) * amplitude;
        });
        return factor - halfAmplitude;
    }
    function sampleNormal(x, z) {
        const offset = 0.5;
        const point_base = [x, sampleHeight(x, z), z];
        const point_north = [x, sampleHeight(x, z + offset), z + offset];
        const point_west = [x - offset, sampleHeight(x - offset, z), z];
        const vector_north = v3.normalize(v3.subtract(point_north, point_base));
        const vector_west = v3.normalize(v3.subtract(point_west, point_base));
        const surface_normal = v3.normalize(v3.cross(vector_west, vector_north));
        return surface_normal;
    }
    const up = [0, 1, 0];
    function sampleSlope(x, y) {
        const normal = sampleNormal(x, y);
        const dot = v3.dot(normal, up);
        return Math.acos(dot);
    }
    function sampleTreeDensity(x, y) {
        const offset = -696969;
        return noise2d(offset + (x / treeDensityScale), offset + (y / treeDensityScale));
    }
    return {
        sampleHeight,
        sampleNormal,
        sampleSlope,
        sampleTreeDensity,
    };
}
//# sourceMappingURL=terrain-generator.js.map