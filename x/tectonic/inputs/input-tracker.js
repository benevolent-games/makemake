export function makeInputTracker(container) {
    const values = {};
    const listeners = {
        keydown: new Set(),
        keyup: new Set(),
        mousedown: new Set(),
        mouseup: new Set(),
        wheel: new Set(),
    };
    container.addEventListener("keydown", event => {
        values[event.key.toLowerCase()] = stampForPressed(true);
        for (const listener of listeners.keydown)
            listener(event);
    });
    container.addEventListener("keyup", event => {
        values[event.key.toLowerCase()] = stampForPressed(false);
        for (const listener of listeners.keyup)
            listener(event);
    });
    container.addEventListener("mousedown", event => {
        values[nameForMouseButton(event.button)] = stampForPressed(true);
        for (const listener of listeners.mousedown)
            listener(event);
    });
    window.addEventListener("mouseup", event => {
        values[nameForMouseButton(event.button)] = stampForPressed(false);
        for (const listener of listeners.mouseup)
            listener(event);
    });
    container.addEventListener("wheel", event => {
        for (const listener of listeners.wheel)
            listener(event);
    });
    container.oncontextmenu = event => {
        event.preventDefault();
        return false;
    };
    return {
        listeners,
        get(name) {
            return values[name]
                ?? { pressed: false, time: Date.now() };
        },
    };
}
export function nameForMouseButton(button) {
    switch (button) {
        case 0: return "mouse_primary";
        case 1: return "mouse_tertiary";
        case 2: return "mouse_secondary";
        case 3: return "mouse_back";
        case 4: return "mouse_forward";
        default:
            throw new Error(`unknown mouse event button "${button}"`);
    }
}
function stampForPressed(pressed) {
    return { pressed, time: Date.now() };
}
//# sourceMappingURL=input-tracker.js.map