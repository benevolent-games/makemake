import { Cursor } from "../cursor/cursor.js";
import { Theater } from "../theater/theater.js";
export declare function makeWorldContainer(): {
    container: HTMLDivElement;
    wirePartsUpToDom({ cursor, theater }: {
        cursor: Cursor;
        theater: Theater;
    }): void;
};
