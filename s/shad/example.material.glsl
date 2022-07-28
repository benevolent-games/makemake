
precision highp float;

attribute vec2 uv;
attribute vec3 normal;
attribute vec3 position;

uniform float time;
uniform mat4 world;
uniform mat4 worldViewProjection;

varying vec2 v_uv;
varying vec3 v_position;
varying vec4 v_worldPosition;

void main(void) {
	gl_Position = worldViewProjection * vec4(position, 1.0);
	v_uv = uv;
	v_position = position;
	v_worldPosition = world * vec4(position, 1.0);
}

////////////////////////////////
////////////////////////////////

precision highp float;

uniform float time;
uniform vec3 cameraPosition;

uniform sampler2D myTexture;

varying vec2 v_uv;
varying vec3 v_position;
varying vec4 v_worldPosition;

void main(void) {
	vec3 direction = normalize(cameraPosition - v_worldPosition.xyz);
	vec4 tex = texture2D(myTexture, v_uv);
	vec3 color = direction * tex.xyz;
	float strobe = mod(time, 3000.0) / 3000.0;
	gl_FragColor = vec4(color + (strobe * 0.5), 1.0);
}
