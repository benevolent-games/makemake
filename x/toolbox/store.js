export function makeStore(storage, key) {
    return {
        save(value) {
            const data = JSON.stringify(value);
            storage.setItem(key, data);
        },
        load() {
            try {
                const data = storage.getItem(key);
                return data
                    ? JSON.parse(data)
                    : undefined;
            }
            catch (error) {
                return undefined;
            }
        },
    };
}
//# sourceMappingURL=store.js.map