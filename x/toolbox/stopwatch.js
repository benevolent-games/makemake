export function stopwatch() {
    const start = Date.now();
    return () => Date.now() - start;
}
export function measure(fun) {
    const getTime = stopwatch();
    fun();
    return getTime();
}
export function logtime(label, fun) {
    const time = measure(fun);
    console.log("⏱️ " + label + ": " + time.toFixed(0) + "ms");
}
//# sourceMappingURL=stopwatch.js.map