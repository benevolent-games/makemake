
precision highp float;

uniform sampler2D myTexture;

uniform float time;
uniform vec3 cameraPosition;

varying vec2 vUv;
varying vec3 vNormal;
varying vec3 vPosition;
varying vec4 vWorldPosition;

#define PI2 6.28318530718
#define LOOP_MILLISECONDS 2000.0

void main(void) {
	vec3 direction = normalize(cameraPosition - vWorldPosition.xyz);

	vec4 tex = texture2D(myTexture, vUv);
	float timeloop = mod(time, LOOP_MILLISECONDS) / LOOP_MILLISECONDS;
	float strobe = (sin(timeloop * PI2) + 1.0) / 2.0;
	vec3 democolor = (
		mix(direction, tex.xyz, 0.5)
		+ (strobe * 0.5)
	);

	gl_FragColor = vec4(democolor, 1.0);
}
