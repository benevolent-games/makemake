export interface InputRecord {
    pressed: boolean;
    time: number;
}
export declare type InputTracker = ReturnType<typeof makeInputTracker>;
export declare function makeInputTracker(container: HTMLElement): {
    listeners: {
        keydown: Set<(event: KeyboardEvent) => void>;
        keyup: Set<(event: KeyboardEvent) => void>;
        mousedown: Set<(event: MouseEvent) => void>;
        mouseup: Set<(event: MouseEvent) => void>;
        wheel: Set<(event: WheelEvent) => void>;
    };
    get(name: string): InputRecord;
};
export declare function nameForMouseButton(button: number): "mouse_primary" | "mouse_tertiary" | "mouse_secondary" | "mouse_back" | "mouse_forward";
