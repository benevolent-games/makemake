export declare type Noise2d = (x: number, y: number) => number;
export declare function prepareNoise(seed: number): {
    noise2d: Noise2d;
};
