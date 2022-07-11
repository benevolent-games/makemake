export declare type Easing = (x: number) => number;
export declare const easing: {
    linear(x: number): number;
    sine(x: number): number;
    quadratic(x: number): number;
    cubic(x: number): number;
    quart(x: number): number;
    exponential(x: number): number;
    circular(x: number): number;
};
