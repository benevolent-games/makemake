export function makeStatsDisplay() {
    const element = document.createElement("div");
    element.className = "stats";
    element.innerHTML = `<p class="framerate">--</p>`;
    const p = element.querySelector(".framerate");
    return {
        element,
        setFramerate(value) {
            p.textContent = value.toFixed(0);
        },
    };
}
//# sourceMappingURL=stats-display.js.map