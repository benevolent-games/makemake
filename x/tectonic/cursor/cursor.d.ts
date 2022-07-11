import { CursorIcon } from "./cursor-types.js";
import { Settings } from "../settings/settings.js";
export declare type Cursor = ReturnType<typeof makeCursor>;
export declare function makeCursor({ settings, insetBoundary, icon: { image: iconImage, offset: { top: iconOffsetTop, left: iconOffsetLeft, }, }, onLocked, onUnlocked, }: {
    icon: CursorIcon;
    settings: Settings;
    insetBoundary: number;
    onLocked(): void;
    onUnlocked(): void;
}): {
    canvas: HTMLCanvasElement;
    isLocked: () => boolean;
    listeners: {
        mousemove: Set<(event: MouseEvent) => void>;
    };
    lock(): void;
    onresize: () => void;
    onmousemove(event: MouseEvent): void;
    getCoordinates(): {
        canvasWidth: number;
        canvasHeight: number;
        x: number;
        y: number;
    };
};
