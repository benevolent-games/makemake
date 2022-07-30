import { html, render } from "lit";
import { view } from "@chasemoskal/magical/x/view/view.js";
import { css } from "@chasemoskal/magical/x/camel-css/camel-css-lit.js";
export const ControlPanel = view(use => ({ rebuildMaterial }) => {
    const [isLoading, setIsLoading] = use.state(false);
    const [isPanelOpen, setIsPanelOpen] = use.state(false);
    const [vertexShaderUrl, setVertexShaderUrl] = use.state("/s/shad/example.vertex.glsl");
    const [fragmentShaderUrl, setFragmentShaderUrl] = use.state("/s/shad/example.fragment.glsl");
    const [textures, setTextures] = use.state({ myTexture: "https://i.imgur.com/O86pwOD.png" });
    const [uniformSpecs, setUniformSpecs] = use.state([]);
    const [uniformData, setUniformData] = use.state({});
    const [draftTexture, setDraftTexture] = use.state({
        name: "",
        url: "",
    });
    async function triggerRebuild() {
        if (isLoading)
            return;
        try {
            setIsLoading(true);
            await rebuildMaterial({
                vertexShaderUrl,
                fragmentShaderUrl,
                textures,
                uniformSpecs,
                uniformData,
            });
        }
        catch (error) {
            console.error(error);
        }
        finally {
            setIsLoading(false);
        }
    }
    use.setup(() => {
        triggerRebuild();
        return () => { };
    });
    function togglePanel() {
        setIsPanelOpen(!isPanelOpen);
    }
    return html `
		<button @click=${togglePanel}>
			${isPanelOpen ? "hide settings" : "settings"}
		</button>
		${isPanelOpen ? html `
			<div class=shaderbuilder>
				<label>
					<span>
						vertex shader url (like <a part=link target=_blank href="/s/shad/example.vertex.glsl">example.vertex.glsl</a>)
					</span>
					<input
						type="text"
						value="${vertexShaderUrl}"
						@change=${(event) => {
        const { value } = event.target;
        setVertexShaderUrl(value);
    }}/>
				</label>
				<label>
					<span>
						fragment shader url (like <a part=link target=_blank href="/s/shad/example.fragment.glsl">example.fragment.glsl</a>)
					</span>
					<input
						type="text"
						value="${fragmentShaderUrl}"
						@change=${(event) => {
        const { value } = event.target;
        setFragmentShaderUrl(value);
    }}/>
				</label>
				<ul class=textures>
					${Object.entries(textures).map(([name, url], index) => html `
						<li data-index="${index}">
							<button class=trash @click=${() => {
        const copy = { ...textures };
        delete copy[name];
        setTextures(copy);
    }}>
									❌
							</button>
							<img alt="" src="${url}"/>
							<code>${name}</code>
							<a part=link target=_blank href="${url}">${url}</a>
						</li>
					`)}
				</ul>
				<div class=textureinput>
					<p>add a new texture</p>
					<input type="text" placeholder="texture name" value="${draftTexture.name}" @change=${(event) => {
        const { value } = event.target;
        setDraftTexture({ ...draftTexture, name: value });
    }}/>
					<input type="text" placeholder="texture url" value="${draftTexture.url}" @change=${(event) => {
        const { value } = event.target;
        setDraftTexture({ ...draftTexture, url: value });
    }}/>
					<button @click=${() => {
        if (draftTexture.name && draftTexture.url)
            setTextures({ ...textures, [draftTexture.name]: draftTexture.url });
    }}>add</button>
				</div>
				<button
					class=rebuild
					@click=${triggerRebuild}
					?disabled=${isLoading}>
						rebuild material
				</button>
			</div>
			<div class=uniforms>
			</div>
		` : null}
	`;
});
ControlPanel.shadow = true;
ControlPanel.css = css `

* {
	margin: 0;
	padding: 0;
	box-sizing: border-box;
}

ul, ol {
	list-style: none;
}

button, input {
	font-family: inherit;
}

button {
	color: inherit;
	background: transparent;
	border: 2px solid;
	border-radius: 0.3em;
	padding: 0.2em 0.5em;
	opacity: 0.7;
	^:hover { opacity: 1; }
	^:active { color: white; }
}

input {
	font-size: inherit;
	background: #333;
	color: #ccc;
	border: 1px solid #444a;
	padding: 0.2em 0.3em;
	border-radius: 0.3em;
}

.shaderbuilder {
	font-family: monospace;
	font-size: 0.8em;
	> * {
		margin-top: 1em;
	}
	label, label > * {
		display: block;
	}
	label input {
		width: 100%;
	}
	code {
		color: #0f0;
	}
	.textures {
		li {
			+ * {
				margin-top: 0.5em;
			}
			> * {
				vertical-align: middle;
			}
		}
		img {
			width: 2em;
			height: 2em;
		}
	}
	.trash {
		background: transparent;
		border: none;
		color: inherit;
		opacity: 0.7;
		^:hover {
			opacity: 1;
		}
	}
	.rebuild {
		display: block;
		margin-top: 2em;
		margin-left: auto;
	}
}

`;
export function createControlPanelElement({ rebuildMaterial, setUniformData }) {
    const element = document.createElement("div");
    element.className = "controlpanel";
    render(html `
		${ControlPanel({
        rebuildMaterial,
        setUniformData,
    })}
	`, element);
    return { element };
}
//# sourceMappingURL=control-panel.js.map