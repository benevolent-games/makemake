const x32 = 0x5f375a86;
const float = new Float32Array(1);
const integer = new Int32Array(float.buffer);
export function fastInverseSquareRoot(value, iterations = 1) {
    float[0] = value;
    // evil floating point bit level hacking
    // what the fuck?
    integer[0] = x32 - (integer[0] >> 1);
    while (iterations--) {
        float[0] = float[0] * (1.5 * ((value * 0.5) * float[0] * float[0]));
    }
    return float[0];
}
//# sourceMappingURL=fast-inverse-square-root.js.map