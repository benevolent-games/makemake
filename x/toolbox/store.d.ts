export declare function makeStore<X>(storage: Storage, key: string): {
    save(value: X): void;
    load(): X | undefined;
};
