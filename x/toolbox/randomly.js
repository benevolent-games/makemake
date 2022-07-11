export function makeRandomToolkit(seed = Math.random()) {
    seed = 999999 + Math.floor(seed * 999999);
    function random() {
        seed = Math.imul(48271, seed) | 0 % 2147483647;
        return (seed & 2147483647) / 2147483648;
    }
    random(); // discard first value
    return {
        random,
        randomSelect(stuff) {
            const index = Math.floor(random() * stuff.length);
            return stuff[index];
        },
        randomBoolean(percentChanceOfTrue) {
            return random() < (percentChanceOfTrue / 100);
        },
        randomBetween(min, max) {
            const range = max - min;
            const amount = random() * range;
            return min + amount;
        },
    };
}
//# sourceMappingURL=randomly.js.map