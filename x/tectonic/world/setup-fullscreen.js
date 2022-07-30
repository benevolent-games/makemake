export function setupFullscreenHandler(container) {
    return function (event) {
        if (event.key === "F" && event.ctrlKey) {
            if (document.fullscreenElement === container)
                document.exitFullscreen();
            else
                container.requestFullscreen();
        }
    };
}
//# sourceMappingURL=setup-fullscreen.js.map