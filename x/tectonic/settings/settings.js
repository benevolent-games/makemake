import { html, render } from "lit";
import { makeStore } from "../../toolbox/store.js";
import { proxyState } from "../../toolbox/proxy-state.js";
export function makeSettings() {
    const store = makeStore(localStorage, "tectonic-settings");
    const onSettingsChange = new Set();
    const { writable, readable } = proxyState(store.load() ?? {
        useOperatingSystemCursor: false,
    }, settings => {
        renderSettings();
        for (const callback of onSettingsChange)
            callback(settings);
        store.save(settings);
    });
    const element = document.createElement("div");
    element.className = "settings";
    function renderSettings() {
        const result = html `
			<label data-setting="useOperatingSystemCursor">
				<input
					type="checkbox"
					?checked=${writable.useOperatingSystemCursor}
					@input=${(event) => {
            const input = event.target;
            writable.useOperatingSystemCursor = input.checked;
        }}
					/>
				<span>use operating system cursor</span>
			</label>
		`;
        render(result, element);
    }
    renderSettings();
    return {
        writable,
        readable,
        element,
        onSettingsChange,
    };
}
//# sourceMappingURL=settings.js.map