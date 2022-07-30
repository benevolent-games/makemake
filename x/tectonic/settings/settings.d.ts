export interface Settings {
    useOperatingSystemCursor: boolean;
}
export declare function makeSettings(): {
    writable: Settings;
    readable: Settings;
    element: HTMLDivElement;
    onSettingsChange: Set<(settings: Settings) => void>;
};
