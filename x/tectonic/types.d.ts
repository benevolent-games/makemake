import { V3 } from "../toolbox/v3.js";
import { V2 } from "../toolbox/v2.js";
import { Easing } from "../toolbox/easing.js";
export interface ArenaSpecification {
    size: V2;
    heights: number[];
}
export declare type Vertex = {
    position: V3;
    normal: V3;
};
export declare type NoiseLayer = {
    scale: number;
    amplitude: number;
    ease: Easing;
};
