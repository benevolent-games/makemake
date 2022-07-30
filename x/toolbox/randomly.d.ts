export declare type Random = () => number;
export interface Randomly {
    random(): number;
    randomSelect<T>(stuff: T[]): T;
    randomBoolean(percentChanceOfTrue: number): boolean;
    randomBetween(min: number, max: number): number;
}
export declare function makeRandomToolkit(seed?: number): Randomly;
