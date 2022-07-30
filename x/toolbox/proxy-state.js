export function proxyState(data, onChange) {
    const readable = proxyReadable(data);
    const writable = proxyWritable(data, () => onChange(readable));
    return { readable, writable };
}
function isObject(x) {
    return x !== null && typeof x === "object";
}
function proxyReadable(data) {
    return new Proxy(data, {
        get(target, key) {
            const value = target[key];
            return isObject(value)
                ? proxyReadable(value)
                : value;
        },
        set(target, key, value) {
            throw new Error(`cannot set "${key}" on immutable readable data`);
        },
    });
}
function proxyWritable(data, onChange) {
    return new Proxy(data, {
        get(target, key) {
            const value = target[key];
            return isObject(value)
                ? proxyWritable(value, onChange)
                : value;
        },
        set(target, key, value) {
            target[key] = value;
            onChange();
            return true;
        },
    });
}
//# sourceMappingURL=proxy-state.js.map