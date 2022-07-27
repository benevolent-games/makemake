
import {html} from "lit"
import {view} from "@chasemoskal/magical/x/view/view.js"
import {css} from "@chasemoskal/magical/x/camel-css/camel-css-lit.js"

export interface UniformSpec {
	type: "float"
	name: string
}

export interface UniformData {
	[name: string]: any
}

export interface ShaderSpec {
	shaderUrl: string
	textures: {[key: string]: string}
	uniformSpecs: UniformSpec[]
	uniformData: UniformData
}

export const ControlPanel = view(use => ({rebuildMaterial}: {
		rebuildMaterial: (spec: ShaderSpec) => Promise<void>
		setUniformData: (data: UniformData) => void
	}) => {

	const [isLoading, setIsLoading] = use.state(false)
	const [isPanelOpen, setIsPanelOpen] = use.state(false)
	const [shaderUrl, setShaderUrl] = use.state("/s/shad/example.material.glsl")
	const [textures, setTextures] = use.state({myTexture: "https://i.imgur.com/O86pwOD.png"} as {[key: string]: string})
	const [uniformSpecs, setUniformSpecs] = use.state([])
	const [uniformData, setUniformData] = use.state({} as UniformData)
	const [draftTexture, setDraftTexture] = use.state({
		name: "",
		url: "",
	})

	async function triggerRebuild() {
		if (isLoading)
			return
		try {
			setIsLoading(true)
			await rebuildMaterial({
				shaderUrl,
				textures,
				uniformSpecs,
				uniformData,
			})
		}
		finally {
			setIsLoading(false)
		}
	}

	use.setup(() => {
		triggerRebuild()
		return () => {}
	})

	function togglePanel() {
		setIsPanelOpen(!isPanelOpen)
	}

	return html`
		<button @click=${togglePanel}>
			${isPanelOpen ? "hide settings" : "settings"}
		</button>
		${isPanelOpen ? html`
			<div class=shaderbuilder>
				<label>
					<span>
						shader url (like <a part=link target=_blank href="/s/shad/example.material.glsl">example.material.glsl</a>)
					</span>
					<input type="text" value="${shaderUrl}" @change=${(event: InputEvent) => {
						const {value} = event.target as HTMLInputElement
						setShaderUrl(value)
					}}/>
				</label>
				<ul class=textures>
					${Object.entries(textures).map(([name, url], index) => html`
						<li data-index="${index}">
							<button class=trash @click=${() => {
								const copy = {...textures}
								delete copy[name]
								setTextures(copy)
							}}>❌</button>
							<img alt="" src="${url}"/>
							<code>${name}</code>
							<a part=link target=_blank href="${url}">${url}</a>
						</li>
					`)}
				</ul>
				<div class=textureinput>
					<p>add a new texture</p>
					<input type="text" placeholder="texture name" value="${draftTexture.name}" @change=${(event: InputEvent) => {
						const {value} = event.target as HTMLInputElement
						setDraftTexture({...draftTexture, name: value})
					}}/>
					<input type="text" placeholder="texture url" value="${draftTexture.url}" @change=${(event: InputEvent) => {
						const {value} = event.target as HTMLInputElement
						setDraftTexture({...draftTexture, url: value})
					}}/>
					<button @click=${() => {
						if (draftTexture.name && draftTexture.url)
							setTextures({...textures, [draftTexture.name]: draftTexture.url})
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
	`
})

ControlPanel.shadow = true
ControlPanel.css = css`

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
	background: #333;
	color: #ccc;
	border: 1px solid #444a;
	padding: 0.2em 0.3em;
	border-radius: 0.3em;
}

.shaderbuilder {
	font-family: monospace;
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
	}
	.trash:hover {
		opacity: 1;
	}
	.rebuild {
		display: block;
		margin-top: 2em;
		margin-left: auto;
	}
}

`
