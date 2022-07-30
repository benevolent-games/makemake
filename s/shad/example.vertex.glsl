
precision highp float;

attribute vec2 uv;
attribute vec3 normal;
attribute vec3 position;

uniform float time;
uniform mat4 world;
uniform mat4 worldViewProjection;

varying vec2 vUv;
varying vec3 vNormal;
varying vec3 vPosition;
varying vec4 vWorldPosition;

void main(void) {
	vUv = uv;
	vNormal = normal;
	vPosition = position;
	vWorldPosition = world * vec4(position, 1.0);
	gl_Position = worldViewProjection * vec4(position, 1.0);
}
