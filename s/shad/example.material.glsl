
precision highp float;

// Attributes
attribute vec3 position;
attribute vec2 uv;

// Uniforms
uniform mat4 worldViewProjection;

// Normal
varying vec2 vUV;

void main(void) {
	gl_Position = worldViewProjection * vec4(position, 1.0);
	vUV = uv;
}

////////////////////////////////
////////////////////////////////

precision mediump float;

varying vec2 vUV;
uniform sampler2D myTexture;

void main(void) {
	gl_FragColor = texture2D(myTexture, vUV);
	// gl_FragColor = vec4(1.0, 0.8, 1.0, 1.0);
}
