const { PI, cos, pow, sqrt } = Math;
export const easing = {
    linear(x) {
        return x;
    },
    sine(x) {
        return -(cos(PI * x) - 1) / 2;
    },
    quadratic(x) {
        return x < 0.5
            ? 2 * x * x
            : 1 - ((-2 * x + 2) ** 2) / 2;
    },
    cubic(x) {
        return x < 0.5
            ? 4 * x * x * x
            : 1 - ((-2 * x + 2) ** 3) / 2;
    },
    quart(x) {
        return x < 0.5
            ? 8 * x * x * x * x
            : 1 - ((((-2 * x) + 2) ** 4) / 2);
    },
    exponential(x) {
        return x === 0
            ? 0
            : x === 1
                ? 1
                : x < 0.5
                    ? (2 ** ((20 * x) - 10)) / 2
                    : (2 - (2 ** ((-20 * x) + 10))) / 2;
    },
    circular(x) {
        return x < 0.5
            ? (1 - sqrt(1 - pow(2 * x, 2))) / 2
            : (sqrt(1 - pow(-2 * x + 2, 2)) + 1) / 2;
    },
};
//# sourceMappingURL=easing.js.map